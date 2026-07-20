import { ARTICLES } from '../data/articles'
import { ROADMAPS } from '../data/roadmaps'
import { QA_QUESTIONS } from '../data/qa'
import { articlePath, qaPath, roadmapPath } from './routes'

export type SitemapEntry = {
  path: string
  changefreq: 'daily' | 'weekly' | 'monthly'
  priority: number
}

export function getAllSitemapEntries(): SitemapEntry[] {
  const staticPages: SitemapEntry[] = [
    { path: '/', changefreq: 'daily', priority: 1 },
    { path: '/gioi-thieu', changefreq: 'monthly', priority: 0.9 },
    { path: '/bai-viet', changefreq: 'daily', priority: 0.9 },
    { path: '/lo-trinh', changefreq: 'weekly', priority: 0.9 },
    { path: '/hoi-dap', changefreq: 'daily', priority: 0.8 },
  ]

  const articles: SitemapEntry[] = ARTICLES.map((a) => ({
    path: articlePath(a.id, a.title),
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))

  const roadmaps: SitemapEntry[] = ROADMAPS.map((r) => ({
    path: roadmapPath(r.id),
    changefreq: 'monthly' as const,
    priority: 0.85,
  }))

  const qa: SitemapEntry[] = QA_QUESTIONS.map((q) => ({
    path: qaPath(q.id, q.title),
    changefreq: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...articles, ...roadmaps, ...qa]
}
