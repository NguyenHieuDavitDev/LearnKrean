import { BRAND } from '../brand'

/** Đặt VITE_SITE_URL trong .env khi deploy (vd: https://tienghancohuyen.vn) */
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://tienghancohuyen.vn'

export const SITE = {
  name: BRAND.name,
  shortName: BRAND.shortName,
  company: BRAND.company,
  slogan: BRAND.slogan,
  url: SITE_URL,
  locale: 'vi_VN',
  language: 'vi',
  defaultTitle: `${BRAND.name} | Học tiếng Hàn, lộ trình TOPIK 1–6 tại Huế`,
  defaultDescription:
    `${BRAND.name} — đào tạo tiếng Hàn theo giáo trình Tiếng Hàn Tổng hợp dành cho người Việt. Lộ trình TOPIK 1–6, bài viết du học Hàn Quốc, tư vấn miễn phí tại ${BRAND.address}. Thuộc ${BRAND.company}.`,
  defaultKeywords:
    'học tiếng Hàn, TOPIK, du học Hàn Quốc, giáo trình tiếng Hàn, luyện thi TOPIK, học tiếng Hàn Huế, Cô Huyền Tiếng Hàn, Hangul, tiếng Hàn sơ cấp, tiếng Hàn trung cấp',
  ogImage: `${SITE_URL}/favicon.png`,
  phones: BRAND.phones,
  address: BRAND.address,
} as const

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function slugify(text: string, maxLength = 72) {
  const base = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return base.slice(0, maxLength).replace(/-+$/, '')
}
