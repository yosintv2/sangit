import { readFileSync } from 'fs'
import path from 'path'
import type { PostalRecord, RoadIndexEntry, DistrictStat } from './types'

function dataPath(...parts: string[]) {
  return path.join(process.cwd(), 'data', ...parts)
}

// Module-level caches — parsed once per build worker
let _byPostal: Record<string, PostalRecord> | null = null
let _postalCodes: string[] | null = null
let _roadsIndex: Record<string, RoadIndexEntry> | null = null
let _districtStats: DistrictStat[] | null = null
const _districtCache: Record<string, PostalRecord[]> = {}
const _roadCache: Record<string, PostalRecord[]> = {}

export function getByPostal(): Record<string, PostalRecord> {
  if (!_byPostal) {
    _byPostal = JSON.parse(readFileSync(dataPath('by-postal.json'), 'utf-8'))
  }
  return _byPostal!
}

export function getRecord(postal: string): PostalRecord | null {
  return getByPostal()[postal] ?? null
}

export function getAllPostalCodes(): string[] {
  if (!_postalCodes) {
    _postalCodes = JSON.parse(readFileSync(dataPath('postal-codes.json'), 'utf-8'))
  }
  return _postalCodes!
}

export function getDistrictRecords(district: string): PostalRecord[] {
  if (!_districtCache[district]) {
    try {
      _districtCache[district] = JSON.parse(
        readFileSync(dataPath('by-district', `${district}.json`), 'utf-8')
      )
    } catch {
      _districtCache[district] = []
    }
  }
  return _districtCache[district]
}

export function getRoadRecords(slug: string): PostalRecord[] {
  if (!_roadCache[slug]) {
    try {
      _roadCache[slug] = JSON.parse(
        readFileSync(dataPath('by-road', `${slug}.json`), 'utf-8')
      )
    } catch {
      _roadCache[slug] = []
    }
  }
  return _roadCache[slug]
}

export function getRoadsIndex(): Record<string, RoadIndexEntry> {
  if (!_roadsIndex) {
    _roadsIndex = JSON.parse(
      readFileSync(dataPath('roads-index.json'), 'utf-8')
    )
  }
  return _roadsIndex!
}

export function getAllRoadSlugs(): string[] {
  return Object.keys(getRoadsIndex())
}

export function getDistrictStats(): DistrictStat[] {
  if (!_districtStats) {
    _districtStats = JSON.parse(
      readFileSync(dataPath('district-stats.json'), 'utf-8')
    )
  }
  return _districtStats!
}

export function getAllDistricts(): string[] {
  return getDistrictStats().map((d) => d.district)
}
