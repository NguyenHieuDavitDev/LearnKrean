import { ARTICLES } from './articles'
import { QA_QUESTIONS } from './qa'

export type SearchResultKind = 'article' | 'qa'

export type SearchResult = {
  id: string
  kind: SearchResultKind
  title: string
  subtitle: string
  /** Used for navigation */
  targetId: number | string
}

const KIND_LABEL: Record<SearchResultKind, string> = {
  article: 'Bài viết',
  qa: 'Hỏi đáp',
}

export function searchKindLabel(kind: SearchResultKind) {
  return KIND_LABEL[kind]
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function searchCatalog(query: string, limit = 12): SearchResult[] {
  const q = normalize(query.trim())
  if (q.length < 1) return []

  const results: SearchResult[] = []

  for (const article of ARTICLES) {
    const hay = normalize(`${article.title} ${article.excerpt} ${article.author}`)
    if (hay.includes(q)) {
      results.push({
        id: `article-${article.id}`,
        kind: 'article',
        title: article.title,
        subtitle: article.author,
        targetId: article.id,
      })
    }
  }

  for (const qa of QA_QUESTIONS) {
    const hay = normalize(`${qa.title} ${qa.courseTag} ${qa.author}`)
    if (hay.includes(q)) {
      results.push({
        id: `qa-${qa.id}`,
        kind: 'qa',
        title: qa.title,
        subtitle: qa.courseTag,
        targetId: qa.id,
      })
    }
  }

  return results.slice(0, limit)
}
