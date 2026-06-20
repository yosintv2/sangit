import type { PostalRecord } from './types'

const R = 6371000 // Earth radius in metres

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}

export function haversineMetres(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function getNearby(
  records: PostalRecord[],
  lat: number,
  lon: number,
  currentPostal: string,
  radiusMetres = 500,
  limit = 12
): PostalRecord[] {
  const seen = new Set<string>()
  const results: { rec: PostalRecord; dist: number }[] = []

  for (const rec of records) {
    if (rec.POSTAL === currentPostal) continue
    if (seen.has(rec.POSTAL)) continue
    const rLat = parseFloat(rec.LATITUDE)
    const rLon = parseFloat(rec.LONGITUDE)
    if (isNaN(rLat) || isNaN(rLon)) continue
    const dist = haversineMetres(lat, lon, rLat, rLon)
    if (dist <= radiusMetres) {
      seen.add(rec.POSTAL)
      results.push({ rec, dist })
    }
  }

  return results
    .sort((a, b) => a.dist - b.dist)
    .slice(0, limit)
    .map((x) => x.rec)
}
