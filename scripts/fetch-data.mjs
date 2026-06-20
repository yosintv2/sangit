#!/usr/bin/env node
/**
 * Downloads all 10 JSON parts from api.sgpostalcode.com,
 * merges and indexes the data, then writes:
 *
 *   data/by-postal.json              { [postal]: PostalRecord }
 *   data/by-district/XX.json         PostalRecord[]  (server-side, for SSG pages)
 *   data/roads-index.json            { [slug]: { name, count } }
 *   data/by-road/[slug].json         PostalRecord[]
 *   data/district-stats.json         [{ district, count }]
 *   data/postal-codes.json           string[] of all unique postal codes
 *   public/data/search-index.json    minified array for client-side Fuse.js
 *   public/data/postal/XX.json       { [postal]: PostalRecord } per district (client-side lookup)
 *   public/sitemap-postal-XX.xml     per-district postal sitemap (for Google indexing)
 *   public/sitemap-postal.xml        sitemap index referencing all district sitemaps
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const DATA_DIR = join(root, 'data')
const BY_DISTRICT_DIR = join(DATA_DIR, 'by-district')
const BY_ROAD_DIR = join(DATA_DIR, 'by-road')
const PUBLIC_DATA_DIR = join(root, 'public', 'data')
const PUBLIC_POSTAL_DIR = join(PUBLIC_DATA_DIR, 'postal')

mkdirSync(DATA_DIR, { recursive: true })
mkdirSync(BY_DISTRICT_DIR, { recursive: true })
mkdirSync(BY_ROAD_DIR, { recursive: true })
mkdirSync(PUBLIC_DATA_DIR, { recursive: true })
mkdirSync(PUBLIC_POSTAL_DIR, { recursive: true })

const BASE_URL = 'https://api.sgpostalcode.com'
const PARTS = 10

function roadToSlug(road) {
  return road
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function districtFromPostal(postal) {
  return postal.slice(0, 2)
}

async function fetchPart(n) {
  const url = `${BASE_URL}/buildings_part_${n}.json`
  console.log(`  Fetching part ${n}…`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

async function main() {
  console.log('=== SG Postal Code Data Fetch ===\n')

  // 1. Download all 10 parts
  const all = []
  for (let i = 1; i <= PARTS; i++) {
    const part = await fetchPart(i)
    all.push(...part)
  }
  console.log(`\nTotal records: ${all.length}`)

  // 2. Deduplicate by POSTAL (keep first occurrence); only valid 6-digit codes
  const byPostal = {}
  for (const rec of all) {
    const p = rec.POSTAL
    if (!p || !/^\d{6}$/.test(p)) continue
    if (!byPostal[p]) byPostal[p] = rec
  }
  const uniquePostals = Object.keys(byPostal)
  console.log(`Unique postal codes: ${uniquePostals.length}`)

  // 3. Group by district (server-side, for SSG district/road pages)
  const byDistrict = {}
  for (const rec of all) {
    if (!rec.POSTAL) continue
    const d = districtFromPostal(rec.POSTAL)
    if (!byDistrict[d]) byDistrict[d] = []
    byDistrict[d].push(rec)
  }
  console.log(`Districts found: ${Object.keys(byDistrict).sort().join(', ')}`)

  // 4. Split unique postal records by district for client-side lookup
  const byPostalByDistrict = {}
  for (const [postal, rec] of Object.entries(byPostal)) {
    const d = districtFromPostal(postal)
    if (!byPostalByDistrict[d]) byPostalByDistrict[d] = {}
    byPostalByDistrict[d][postal] = rec
  }

  // 5. Group by road slug
  const byRoad = {}
  const roadsIndex = {}
  for (const rec of all) {
    if (!rec.ROAD_NAME) continue
    const slug = roadToSlug(rec.ROAD_NAME)
    if (!byRoad[slug]) {
      byRoad[slug] = []
      roadsIndex[slug] = { name: rec.ROAD_NAME, slug, count: 0 }
    }
    byRoad[slug].push(rec)
    roadsIndex[slug].count++
  }
  console.log(`Unique roads: ${Object.keys(roadsIndex).length}`)

  // 6. Build minified search index (only fields needed by Fuse.js)
  const searchIndex = uniquePostals.map((p) => {
    const r = byPostal[p]
    return { p: r.POSTAL, s: r.SEARCHVAL || r.BUILDING, a: r.ADDRESS, r: r.ROAD_NAME, b: r.BLK_NO }
  })

  // 7. Write server-side files
  console.log('\nWriting server-side files…')

  writeFileSync(join(DATA_DIR, 'by-postal.json'), JSON.stringify(byPostal), 'utf-8')
  console.log('  data/by-postal.json')

  writeFileSync(join(DATA_DIR, 'postal-codes.json'), JSON.stringify(uniquePostals), 'utf-8')
  console.log('  data/postal-codes.json')

  for (const [district, records] of Object.entries(byDistrict)) {
    writeFileSync(join(BY_DISTRICT_DIR, `${district}.json`), JSON.stringify(records), 'utf-8')
  }
  console.log(`  data/by-district/*.json (${Object.keys(byDistrict).length} files)`)

  writeFileSync(join(DATA_DIR, 'roads-index.json'), JSON.stringify(roadsIndex), 'utf-8')
  console.log('  data/roads-index.json')

  for (const [slug, records] of Object.entries(byRoad)) {
    writeFileSync(join(BY_ROAD_DIR, `${slug}.json`), JSON.stringify(records), 'utf-8')
  }
  console.log(`  data/by-road/*.json (${Object.keys(byRoad).length} files)`)

  const districtStats = Object.entries(byDistrict)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([d, recs]) => ({ district: d, count: recs.length }))
  writeFileSync(join(DATA_DIR, 'district-stats.json'), JSON.stringify(districtStats), 'utf-8')
  console.log('  data/district-stats.json')

  // 8. Write client-side public files
  console.log('\nWriting client-side public files…')

  writeFileSync(join(PUBLIC_DATA_DIR, 'search-index.json'), JSON.stringify(searchIndex), 'utf-8')
  console.log('  public/data/search-index.json')

  // One JSON per district: { [postal]: PostalRecord } — fetched on demand by the postal lookup page
  for (const [district, records] of Object.entries(byPostalByDistrict)) {
    writeFileSync(join(PUBLIC_POSTAL_DIR, `${district}.json`), JSON.stringify(records), 'utf-8')
  }
  console.log(`  public/data/postal/*.json (${Object.keys(byPostalByDistrict).length} files)`)

  // 9. Write per-district postal sitemaps + sitemap index
  console.log('\nWriting postal sitemaps…')
  const BASE_SITE = 'https://www.sgpostalcode.com'
  const sortedDistricts = Object.keys(byPostalByDistrict).sort()
  const sitemapLastmod = new Date().toISOString().slice(0, 10)

  for (const district of sortedDistricts) {
    const codes = Object.keys(byPostalByDistrict[district])
    const urls = codes
      .map(code => `  <url><loc>${BASE_SITE}/postal/${district}/${code}/</loc><lastmod>${sitemapLastmod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`)
      .join('\n')
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
    writeFileSync(join(root, 'public', `sitemap-postal-${district}.xml`), xml, 'utf-8')
  }
  console.log(`  public/sitemap-postal-*.xml (${sortedDistricts.length} files)`)

  // Sitemap index referencing all per-district sitemaps
  const sitemapEntries = sortedDistricts
    .map(d => `  <sitemap><loc>${BASE_SITE}/sitemap-postal-${d}.xml</loc><lastmod>${sitemapLastmod}</lastmod></sitemap>`)
    .join('\n')
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</sitemapindex>`
  writeFileSync(join(root, 'public', 'sitemap-postal.xml'), indexXml, 'utf-8')
  console.log('  public/sitemap-postal.xml (sitemap index)')

  console.log('\n✓ Done!')
}

main().catch((err) => {
  console.error('ERROR:', err)
  process.exit(1)
})
