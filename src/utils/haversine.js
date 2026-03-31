const EARTH_RADIUS_KM = 6371

/**
 * Converts degrees to radians.
 */
function toRad(deg) {
  return (deg * Math.PI) / 180
}

/**
 * Calculates the great-circle distance between two coordinates using the
 * Haversine formula.
 *
 * @param {number} lat1 - Latitude of point A
 * @param {number} lon1 - Longitude of point A
 * @param {number} lat2 - Latitude of point B
 * @param {number} lon2 - Longitude of point B
 * @returns {number} Distance in kilometres
 */
export function haversine(lat1, lon1, lat2, lon2) {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return EARTH_RADIUS_KM * c
}

/**
 * Formats a distance in km to a human-readable string.
 *
 * @param {number} km - Distance in kilometres
 * @returns {string} e.g. "450 m" or "3.2 km"
 */
export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}

/**
 * Filters an array of AR experiences by a radius from the user's position,
 * attaches a `distance` field, and sorts nearest-first.
 *
 * @param {Array}  data      - Array of AR experience objects with `location.lat` and `location.lng`
 * @param {number} userLat   - User latitude
 * @param {number} userLng   - User longitude
 * @param {number} radiusKm  - Filter radius in kilometres (default 5)
 * @returns {Array} Filtered and sorted array with `distance` (km) and `distanceLabel` attached
 */
export function filterByRadius(data, userLat, userLng, radiusKm = 5) {
  return data
    .map(item => {
      const distance = haversine(userLat, userLng, item.location.lat, item.location.lng)
      return { ...item, distance, distanceLabel: formatDistance(distance) }
    })
    .filter(item => item.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
}

/**
 * Returns a bearing label (N, NE, E, …) between two coordinates.
 *
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {string}
 */
export function getBearing(lat1, lon1, lat2, lon2) {
  const dLon = toRad(lon2 - lon1)
  const y = Math.sin(dLon) * Math.cos(toRad(lat2))
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon)
  const brng = (Math.atan2(y, x) * 180) / Math.PI
  const compass = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']
  return compass[Math.round(((brng + 360) % 360) / 45)]
}
