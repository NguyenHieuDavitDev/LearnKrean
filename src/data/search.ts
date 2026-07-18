import { DANH_SACH_KHOA_HOC } from './courses'
import { FLASHCARD_DECKS } from './flashcards'
import { ARTICLES } from './articles'
import { VIDEOS } from './videos'
import { QA_QUESTIONS } from './qa'

export type SearchResultKind = 'course' | 'flashcard' | 'article' | 'video' | 'qa'

export type SearchResult = {
  id: string
  kind: SearchResultKind
  title: string
  subtitle: string
  /** Used for navigation */
  targetId: number | string
}

const KIND_LABEL: Record<SearchResultKind, string> = {
  course: 'Khóa học',
  flashcard: 'Flashcard',
  article: 'Bài viết',
  video: 'Video',
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

  for (const course of DANH_SACH_KHOA_HOC) {
    const hay = normalize(
      `${course.title} ${course.summary} ${course.learnings.join(' ')} ${course.level}`,
    )
    if (hay.includes(q)) {
      results.push({
        id: `course-${course.id}`,
        kind: 'course',
        title: course.title,
        subtitle: `${course.level} · ${course.price}`,
        targetId: course.id,
      })
    }
  }

  for (const deck of FLASHCARD_DECKS) {
    const hay = normalize(`${deck.title} ${deck.description} ${deck.level}`)
    const cardHit = deck.cards.some(
      (c) =>
        normalize(c.korean).includes(q) ||
        normalize(c.meaning).includes(q) ||
        normalize(c.romanization).includes(q),
    )
    if (hay.includes(q) || cardHit) {
      results.push({
        id: `deck-${deck.id}`,
        kind: 'flashcard',
        title: deck.title,
        subtitle: `${deck.cards.length} thẻ · ${deck.level}`,
        targetId: deck.id,
      })
    }
  }

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

  for (const video of VIDEOS) {
    const hay = normalize(`${video.title} ${video.description} ${video.author}`)
    if (hay.includes(q)) {
      results.push({
        id: `video-${video.id}`,
        kind: 'video',
        title: video.title,
        subtitle: video.author,
        targetId: video.id,
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
