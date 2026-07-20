import { ARTICLES, ARTICLE_TOPICS } from './articles'
import { QA_QUESTIONS, getQaById } from './qa'
import { ROADMAPS } from './roadmaps'

export type SearchResultKind = 'article' | 'qa' | 'roadmap'

export type SearchResult = {
  id: string
  kind: SearchResultKind
  title: string
  subtitle: string
  /** Used for navigation */
  targetId: number | string
  /** Relevance 0–100 for ranking / UI */
  score?: number
}

type SearchField = {
  text: string
  /** Higher = more important (title > excerpt > body) */
  weight: number
}

type CatalogEntry = {
  id: string
  kind: SearchResultKind
  title: string
  subtitle: string
  targetId: number | string
  fields: SearchField[]
}

const KIND_LABEL: Record<SearchResultKind, string> = {
  article: 'Bài viết',
  qa: 'Hỏi đáp',
  roadmap: 'Lộ trình',
}

export function searchKindLabel(kind: SearchResultKind) {
  return KIND_LABEL[kind]
}

/** Chuẩn hóa tiếng Việt: bỏ dấu, đ→d, gộp khoảng trắng */
export function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(text: string) {
  return normalize(text).split(' ').filter(Boolean)
}

function levenshtein(a: string, b: string) {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  const rows = a.length + 1
  const cols = b.length + 1
  const prev = new Array<number>(cols)
  const curr = new Array<number>(cols)

  for (let j = 0; j < cols; j++) prev[j] = j

  for (let i = 1; i < rows; i++) {
    curr[0] = i
    const ca = a.charCodeAt(i - 1)
    for (let j = 1; j < cols; j++) {
      const cost = ca === b.charCodeAt(j - 1) ? 0 : 1
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost)
    }
    for (let j = 0; j < cols; j++) prev[j] = curr[j]
  }
  return prev[cols - 1]
}

/** Khoảng cách chỉnh sửa tối đa cho phép theo độ dài token */
function maxEditDistance(tokenLen: number) {
  if (tokenLen <= 2) return 0
  if (tokenLen <= 4) return 1
  if (tokenLen <= 7) return 2
  return 3
}

function wordFuzzyScore(token: string, word: string): number {
  if (!token || !word) return 0
  if (word === token) return 1
  if (word.startsWith(token)) return 0.92
  if (token.startsWith(word) && word.length >= 2) return 0.78
  if (word.includes(token) && token.length >= 2) return 0.72

  const maxDist = maxEditDistance(token.length)
  if (maxDist === 0) return 0
  if (Math.abs(word.length - token.length) > maxDist) return 0

  const dist = levenshtein(token, word)
  if (dist > maxDist) return 0
  return Math.max(0, 1 - dist / Math.max(token.length, word.length))
}

function bestTokenScore(token: string, hay: string): number {
  if (!token) return 0
  if (hay.includes(token)) {
    // Ưu tiên khớp nguyên từ / đầu từ
    if (hay.split(' ').some((w) => w === token)) return 1
    if (hay.split(' ').some((w) => w.startsWith(token))) return 0.95
    return 0.85
  }

  let best = 0
  for (const word of hay.split(' ')) {
    if (word.length < 2 && token.length > 2) continue
    best = Math.max(best, wordFuzzyScore(token, word))
    if (best >= 0.99) break
  }
  return best
}

/**
 * Điểm 0–1 cho một field. Tất cả token phải đạt ngưỡng tối thiểu (AND mềm).
 */
function scoreField(tokens: string[], fieldText: string): number {
  const hay = normalize(fieldText)
  if (!hay || !tokens.length) return 0

  const full = tokens.join(' ')
  if (hay === full) return 1
  if (hay.startsWith(full)) return 0.97
  if (hay.includes(full)) return 0.9

  const scores = tokens.map((t) => bestTokenScore(t, hay))
  const minScore = Math.min(...scores)
  // Bỏ qua nếu có token gần như không khớp
  if (minScore < 0.55) return 0

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  // Phạt nhẹ khi token yếu nhất thấp
  return avg * (0.7 + 0.3 * minScore)
}

function scoreEntry(tokens: string[], fields: SearchField[]): number {
  let best = 0
  let weighted = 0
  let weightSum = 0

  for (const field of fields) {
    const s = scoreField(tokens, field.text)
    if (s <= 0) continue
    best = Math.max(best, s)
    weighted += s * field.weight
    weightSum += field.weight
  }

  if (best <= 0 || weightSum === 0) return 0
  // Kết hợp điểm field tốt nhất và trung bình có trọng số
  return best * 0.55 + (weighted / weightSum) * 0.45
}

function topicLabel(topicId: string) {
  return ARTICLE_TOPICS.find((t) => t.id === topicId)?.label ?? topicId
}

function articleBodyText(article: (typeof ARTICLES)[number]) {
  return article.body
    .map((block) => {
      if (block.type === 'p' || block.type === 'emphasis') return block.text
      if (block.type === 'list') return block.items.join(' ')
      if (block.type === 'image') return `${block.caption} ${block.alt}`
      return ''
    })
    .join(' ')
}

let catalogCache: CatalogEntry[] | null = null

function buildCatalog(): CatalogEntry[] {
  const entries: CatalogEntry[] = []

  for (const article of ARTICLES) {
    entries.push({
      id: `article-${article.id}`,
      kind: 'article',
      title: article.title,
      subtitle: `${topicLabel(article.topic)} · ${article.author}`,
      targetId: article.id,
      fields: [
        { text: article.title, weight: 5 },
        { text: topicLabel(article.topic), weight: 2.5 },
        { text: article.excerpt, weight: 2 },
        { text: article.author, weight: 1.5 },
        { text: articleBodyText(article), weight: 1 },
      ],
    })
  }

  for (const qa of QA_QUESTIONS) {
    const detail = getQaById(qa.id)
    entries.push({
      id: `qa-${qa.id}`,
      kind: 'qa',
      title: qa.title,
      subtitle: qa.courseTag,
      targetId: qa.id,
      fields: [
        { text: qa.title, weight: 5 },
        { text: qa.courseTag, weight: 2.5 },
        { text: qa.author, weight: 1.5 },
        { text: detail?.lesson ?? '', weight: 2 },
        { text: detail?.content ?? '', weight: 1 },
      ],
    })
  }

  for (const roadmap of ROADMAPS) {
    const stepText = roadmap.steps.map((s) => `${s.title} ${s.desc} ${s.grammar}`).join(' ')
    entries.push({
      id: `roadmap-${roadmap.id}`,
      kind: 'roadmap',
      title: roadmap.title,
      subtitle: roadmap.textbook,
      targetId: roadmap.id,
      fields: [
        { text: roadmap.title, weight: 5 },
        { text: roadmap.shortTitle, weight: 4 },
        { text: roadmap.textbook, weight: 3 },
        { text: roadmap.description, weight: 2 },
        { text: roadmap.outcome, weight: 1.5 },
        { text: stepText, weight: 1 },
      ],
    })
  }

  return entries
}

function getCatalog() {
  if (!catalogCache) catalogCache = buildCatalog()
  return catalogCache
}

export function searchCatalog(query: string, limit = 12): SearchResult[] {
  const tokens = tokenize(query)
  if (!tokens.length) return []

  // Query quá ngắn: chỉ khớp chính xác / tiền tố để tránh nhiễu
  const strictShort = tokens.length === 1 && tokens[0].length < 2

  const ranked: SearchResult[] = []

  for (const entry of getCatalog()) {
    const raw = scoreEntry(tokens, entry.fields)
    if (raw <= 0) continue
    if (strictShort && raw < 0.85) continue
    // Ngưỡng tối thiểu cho fuzzy
    if (raw < 0.58) continue

    ranked.push({
      id: entry.id,
      kind: entry.kind,
      title: entry.title,
      subtitle: entry.subtitle,
      targetId: entry.targetId,
      score: Math.round(raw * 100),
    })
  }

  ranked.sort((a, b) => {
    const scoreDiff = (b.score ?? 0) - (a.score ?? 0)
    if (scoreDiff !== 0) return scoreDiff
    return a.title.localeCompare(b.title, 'vi')
  })

  return ranked.slice(0, limit)
}
