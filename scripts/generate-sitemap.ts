import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { getAllSitemapEntries } from '../src/seo/sitemap-data'
import { SITE_URL } from '../src/seo/site'

const entries = getAllSitemapEntries()

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.path}</loc>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(resolve(process.cwd(), 'dist/sitemap.xml'), xml, 'utf-8')
console.log(`Sitemap: ${entries.length} URLs → dist/sitemap.xml`)
