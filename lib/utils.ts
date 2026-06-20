export function roadToSlug(road: string): string {
  return road
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function slugToRoad(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function districtFromPostal(postal: string): string {
  return postal.slice(0, 2)
}

export function formatAddress(record: {
  BLK_NO: string
  ROAD_NAME: string
  BUILDING: string
  POSTAL: string
}): string {
  const parts = []
  if (record.BLK_NO && record.BLK_NO !== '0') parts.push(`Block ${record.BLK_NO}`)
  if (record.ROAD_NAME) parts.push(record.ROAD_NAME)
  if (record.BUILDING && record.BUILDING !== record.ROAD_NAME)
    parts.push(record.BUILDING)
  parts.push(`Singapore ${record.POSTAL}`)
  return parts.join(', ')
}

export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// Singapore district name map (all districts found in data)
const DISTRICT_NAMES: Record<string, string> = {
  '01': 'Raffles Place, Cecil, Marina, People\'s Park',
  '02': 'Anson, Tanjong Pagar',
  '03': 'Queenstown, Tiong Bahru',
  '04': 'Telok Blangah, Harbourfront',
  '05': 'Pasir Panjang, Hong Leong Garden, Clementi New Town',
  '06': 'High Street, Beach Road (part)',
  '07': 'Middle Road, Golden Mile',
  '08': 'Little India',
  '09': 'Orchard, Cairnhill, River Valley',
  '10': 'Ardmore, Bukit Timah, Holland Road, Tanglin',
  '11': 'Watten Estate, Novena, Thomson',
  '12': 'Balestier, Toa Payoh, Serangoon',
  '13': 'Macpherson, Braddell',
  '14': 'Geylang, Eunos',
  '15': 'Katong, Joo Chiat, Amber Road',
  '16': 'Bedok, Upper East Coast, Eastwood, Kew Drive',
  '17': 'Loyang, Changi',
  '18': 'Tampines, Pasir Ris',
  '19': 'Serangoon Garden, Hougang, Ponggol',
  '20': 'Bishan, Ang Mo Kio',
  '21': 'Upper Bukit Timah, Clementi Park, Ulu Pandan',
  '22': 'Jurong',
  '23': 'Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang',
  '24': 'Lim Chu Kang, Tengah',
  '25': 'Kranji, Woodgrove, Woodlands',
  '26': 'Upper Thomson, Springleaf',
  '27': 'Yishun, Sembawang',
  '28': 'Seletar',
}

export function getDistrictName(district: string): string {
  return DISTRICT_NAMES[district] || `District ${district}`
}

export function googleMapsUrl(lat: string, lon: string, label: string): string {
  const q = encodeURIComponent(`${lat},${lon}`)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

export function appleMapsUrl(lat: string, lon: string, label: string): string {
  return `https://maps.apple.com/?ll=${lat},${lon}&q=${encodeURIComponent(label)}`
}

export function googleMapsEmbedUrl(lat: string, lon: string): string {
  return `https://maps.google.com/maps?q=${lat},${lon}&z=17&output=embed`
}
