import { getArticleById } from '../data/articles'
import { getRoadmapById } from '../data/roadmaps'
import { getQaById } from '../data/qa'
import { absoluteUrl, SITE } from './site'
import { buildPath, type AppRoute } from './routes'

export type SeoPayload = {
  title: string
  description: string
  path: string
  keywords?: string
  type?: 'website' | 'article'
  image?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name'
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function removeJsonLd() {
  document.querySelectorAll('script[data-seo-jsonld]').forEach((node) => node.remove())
}

function injectJsonLd(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  removeJsonLd()
  const items = Array.isArray(data) ? data : [data]
  for (const item of items) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-jsonld', 'true')
    script.textContent = JSON.stringify(item)
    document.head.appendChild(script)
  }
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: absoluteUrl('/favicon.png'),
    description: SITE.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: 'Huế',
      addressCountry: 'VN',
    },
    telephone: SITE.phones.map((p) => p.replace(/\s/g, '')),
    parentOrganization: {
      '@type': 'Organization',
      name: SITE.company,
    },
  }
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.language,
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/bai-viet?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

function breadcrumbs(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function seoForRoute(route: AppRoute): SeoPayload {
  const path = buildPath(route)
  const base = [organizationSchema()]

  if (route.articleId != null) {
    const article = getArticleById(route.articleId)
    if (article) {
      const articlePath = buildPath({ page: 'articles', articleId: article.id })
      return {
        title: `${article.title} | ${SITE.shortName}`,
        description: article.excerpt,
        path: articlePath,
        keywords: `${SITE.defaultKeywords}, ${article.title}`,
        type: 'article',
        image: article.image,
        jsonLd: [
          ...base,
          breadcrumbs([
            { name: 'Trang chủ', path: '/' },
            { name: 'Bài viết', path: '/bai-viet' },
            { name: article.title, path: articlePath },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            image: [article.image],
            author: {
              '@type': 'Person',
              name: article.author,
            },
            publisher: {
              '@type': 'Organization',
              name: SITE.name,
              logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon.png') },
            },
            mainEntityOfPage: absoluteUrl(articlePath),
            inLanguage: SITE.language,
          },
        ],
      }
    }
  }

  if (route.roadmapId != null) {
    const roadmap = getRoadmapById(route.roadmapId)
    if (roadmap) {
      const rPath = buildPath({ page: 'roadmap', roadmapId: roadmap.id })
      return {
        title: `${roadmap.title} | Lộ trình TOPIK | ${SITE.shortName}`,
        description: roadmap.description,
        path: rPath,
        keywords: `${SITE.defaultKeywords}, ${roadmap.title}, ${roadmap.textbook}`,
        jsonLd: [
          ...base,
          breadcrumbs([
            { name: 'Trang chủ', path: '/' },
            { name: 'Lộ trình TOPIK', path: '/lo-trinh' },
            { name: roadmap.title, path: rPath },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: roadmap.title,
            description: roadmap.description,
            provider: { '@type': 'Organization', name: SITE.name },
            educationalLevel: roadmap.level,
            inLanguage: SITE.language,
            url: absoluteUrl(rPath),
          },
        ],
      }
    }
  }

  if (route.qaId != null) {
    const qa = getQaById(route.qaId)
    if (qa) {
      const qPath = buildPath({ page: 'qa', qaId: qa.id })
      const answerText = qa.comments.map((c) => c.content).join(' ')
      return {
        title: `${qa.title} | Hỏi đáp tiếng Hàn | ${SITE.shortName}`,
        description: answerText.slice(0, 160) || qa.content.slice(0, 160),
        path: qPath,
        keywords: `${SITE.defaultKeywords}, hỏi đáp tiếng Hàn, ${qa.courseTag}`,
        jsonLd: [
          ...base,
          breadcrumbs([
            { name: 'Trang chủ', path: '/' },
            { name: 'Hỏi đáp', path: '/hoi-dap' },
            { name: qa.title, path: qPath },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'QAPage',
            mainEntity: {
              '@type': 'Question',
              name: qa.title,
              text: qa.content || qa.title,
              answerCount: qa.comments.length,
              acceptedAnswer: qa.comments[0]
                ? {
                    '@type': 'Answer',
                    text: qa.comments[0].content,
                    author: { '@type': 'Person', name: qa.comments[0].author },
                  }
                : undefined,
            },
          },
        ],
      }
    }
  }

  switch (route.page) {
    case 'about':
      return {
        title: `Giới thiệu ${SITE.name} | Đào tạo tiếng Hàn tại Huế`,
        description: `${SITE.company} — ${SITE.slogan}. Giáo trình Tiếng Hàn Tổng hợp, lộ trình TOPIK 1–6, tư vấn miễn phí tại ${SITE.address}.`,
        path,
        keywords: `${SITE.defaultKeywords}, giới thiệu, ${SITE.company}, học tiếng Hàn Huế`,
        jsonLd: [
          ...base,
          websiteSchema(),
          breadcrumbs([
            { name: 'Trang chủ', path: '/' },
            { name: 'Giới thiệu', path: '/gioi-thieu' },
          ]),
        ],
      }
    case 'articles':
      return {
        title: `Bài viết học tiếng Hàn & du học Hàn Quốc | ${SITE.shortName}`,
        description:
          'Tổng hợp bài viết về từ vựng, ngữ pháp, TOPIK, văn hóa Hàn, du học, học phí trường đại học và cuộc sống sinh viên tại Hàn Quốc.',
        path,
        keywords: `${SITE.defaultKeywords}, bài viết tiếng Hàn, du học Hàn Quốc, văn hóa Hàn`,
        jsonLd: [
          ...base,
          breadcrumbs([
            { name: 'Trang chủ', path: '/' },
            { name: 'Bài viết', path: '/bai-viet' },
          ]),
        ],
      }
    case 'roadmap':
      return {
        title: `Lộ trình TOPIK 1–6 | Giáo trình chuẩn người Việt | ${SITE.shortName}`,
        description:
          'Lộ trình học TOPIK 1 đến TOPIK 6 bám sát bộ Tiếng Hàn Tổng hợp dành cho người Việt Nam — Sơ cấp, Trung cấp, Cao cấp, từng bài học cụ thể.',
        path,
        keywords: `${SITE.defaultKeywords}, lộ trình TOPIK, TOPIK 1, TOPIK 2, TOPIK 3, TOPIK 4, TOPIK 5, TOPIK 6`,
        jsonLd: [...base, websiteSchema()],
      }
    case 'qa':
      return {
        title: `Hỏi đáp tiếng Hàn | Ngữ pháp, TOPIK, giao tiếp | ${SITE.shortName}`,
        description:
          'Cộng đồng hỏi đáp tiếng Hàn: ngữ pháp, từ vựng, luyện thi TOPIK, giao tiếp và kinh nghiệm học tập thực tế.',
        path,
        keywords: `${SITE.defaultKeywords}, hỏi đáp tiếng Hàn, ngữ pháp tiếng Hàn`,
        jsonLd: [...base],
      }
    default:
      return {
        title: SITE.defaultTitle,
        description: SITE.defaultDescription,
        path: '/',
        keywords: SITE.defaultKeywords,
        jsonLd: [...base, websiteSchema()],
      }
  }
}

export function applySeo(payload: SeoPayload) {
  const url = absoluteUrl(payload.path)

  document.title = payload.title
  document.documentElement.lang = SITE.language

  setMeta('description', payload.description)
  setMeta('keywords', payload.keywords ?? SITE.defaultKeywords)
  setMeta('robots', payload.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
  setMeta('author', SITE.name)

  setMeta('og:title', payload.title, true)
  setMeta('og:description', payload.description, true)
  setMeta('og:type', payload.type ?? 'website', true)
  setMeta('og:url', url, true)
  setMeta('og:site_name', SITE.name, true)
  setMeta('og:locale', SITE.locale, true)
  setMeta('og:image', payload.image ?? SITE.ogImage, true)

  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', payload.title)
  setMeta('twitter:description', payload.description)
  setMeta('twitter:image', payload.image ?? SITE.ogImage)

  setLink('canonical', url)

  if (payload.jsonLd) {
    injectJsonLd(payload.jsonLd)
  } else {
    removeJsonLd()
    injectJsonLd(organizationSchema())
  }
}

export function applyRouteSeo(route: AppRoute) {
  applySeo(seoForRoute(route))
}
