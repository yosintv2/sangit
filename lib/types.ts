export type PostalRecord = {
  ADDRESS: string
  BLK_NO: string
  BUILDING: string
  LATITUDE: string
  LONGITUDE: string
  LONGTITUDE: string
  POSTAL: string
  ROAD_NAME: string
  SEARCHVAL: string
  X: string
  Y: string
}

export type SearchIndexEntry = {
  p: string // POSTAL
  s: string // SEARCHVAL
  a: string // ADDRESS
  r: string // ROAD_NAME
  b: string // BLK_NO
}

export type RoadIndexEntry = {
  name: string
  slug: string
  count: number
}

export type DistrictStat = {
  district: string
  count: number
}
