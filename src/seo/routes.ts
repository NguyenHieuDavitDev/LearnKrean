import { getArticleById } from '../data/articles'
import { getQaById } from '../data/qa'
import { slugify } from './site'

export type Page = 'home' | 'about' | 'articles' | 'roadmap' | 'qa'

export type AppRoute = {
  page: Page
  aboutScrollTo?: 'top' | 'contact'
  articleId?: number
  roadmapId?: string
  qaId?: number
}

export function articlePath(id: number, title?: string) {
  const slug = title ? slugify(title) : ''
  return slug ? `/bai-viet/${id}-${slug}` : `/bai-viet/${id}`
}

export function roadmapPath(id: string) {
  return `/lo-trinh/${id}`
}

export function qaPath(id: number, title?: string) {
  const slug = title ? slugify(title) : ''
  return slug ? `/hoi-dap/${id}-${slug}` : `/hoi-dap/${id}`
}

export function buildPath(route: AppRoute): string {
  if (route.articleId != null) {
    const article = getArticleById(route.articleId)
    return articlePath(route.articleId, article?.title)
  }
  if (route.roadmapId != null) {
    return roadmapPath(route.roadmapId)
  }
  if (route.qaId != null) {
    const qa = getQaById(route.qaId)
    return qaPath(route.qaId, qa?.title)
  }
  switch (route.page) {
    case 'about':
      return route.aboutScrollTo === 'contact' ? '/gioi-thieu#contact' : '/gioi-thieu'
    case 'articles':
      return '/bai-viet'
    case 'roadmap':
      return '/lo-trinh'
    case 'qa':
      return '/hoi-dap'
    default:
      return '/'
  }
}

export function parsePath(pathname: string, hash: string): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/'

  const articleMatch = clean.match(/^\/bai-viet\/(\d+)(?:-[a-z0-9-]*)?$/i)
  if (articleMatch) {
    return { page: 'articles', articleId: Number(articleMatch[1]) }
  }
  if (clean === '/bai-viet') {
    return { page: 'articles' }
  }

  const roadmapMatch = clean.match(/^\/lo-trinh\/([a-z0-9-]+)$/i)
  if (roadmapMatch) {
    return { page: 'roadmap', roadmapId: roadmapMatch[1] }
  }
  if (clean === '/lo-trinh') {
    return { page: 'roadmap' }
  }

  const qaMatch = clean.match(/^\/hoi-dap\/(\d+)(?:-[a-z0-9-]*)?$/i)
  if (qaMatch) {
    return { page: 'qa', qaId: Number(qaMatch[1]) }
  }
  if (clean === '/hoi-dap') {
    return { page: 'qa' }
  }

  if (clean === '/gioi-thieu') {
    const scrollTo =
      hash === '#lien-he' || hash === '#contact' ? 'contact' : 'top'
    return { page: 'about', aboutScrollTo: scrollTo }
  }

  return { page: 'home' }
}

export function routeFromAppState(
  page: Page,
  opts: {
    aboutScrollTo?: 'top' | 'contact'
    articleId?: number | null
    roadmapId?: string | null
    qaId?: number | null
  },
): AppRoute {
  if (opts.articleId != null) {
    return { page: 'articles', articleId: opts.articleId }
  }
  if (opts.roadmapId != null) {
    return { page: 'roadmap', roadmapId: opts.roadmapId }
  }
  if (opts.qaId != null) {
    return { page: 'qa', qaId: opts.qaId }
  }
  if (page === 'about') {
    return { page: 'about', aboutScrollTo: opts.aboutScrollTo ?? 'top' }
  }
  return { page }
}
