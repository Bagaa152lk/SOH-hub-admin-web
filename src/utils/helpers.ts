export function getPolygonCenter(
  id: string,
  polygon: { lat: number; long: number }[]
) {
  if (!polygon || !Array.isArray(polygon) || polygon.length === 0) return null;

  const total = polygon.reduce(
    (acc, point) => ({
      lat: acc.lat + point.lat,
      lng: acc.lng + point.long,
    }),
    { lat: 0, lng: 0 }
  );

  return {
    id: id,
    lat: total.lat / polygon.length,
    lng: total.lng / polygon.length,
  };
}
export function getPolygonCentere(
  id: string,
  polygon: { lat: number; lng: number }[]
) {
  if (!polygon || !Array.isArray(polygon) || polygon.length === 0) return null;

  const total = polygon.reduce(
    (acc, point) => ({
      lat: acc.lat + point.lat,
      lng: acc.lng + point.lng,
    }),
    { lat: 0, lng: 0 }
  );

  return {
    id: id,
    lat: total.lat / polygon.length,
    lng: total.lng / polygon.length,
  };
}


export function createCustomMarkerIcon(letter: string, fillColor: string) {
  const svg = `
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="54" height="54" rx="27" fill="white" fillOpacity="0.16"/>
      <rect x="4" y="4" width="46" height="46" rx="23" fill="white" fillOpacity="0.16"/>
      <rect x="8" y="8" width="38" height="38" rx="19" fill="${fillColor}"/>
      <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"
        font-size="16" fill="white" font-family="Arial" font-weight="bold" fillOpacity="0.8">
        ${letter}
      </text>
    </svg>
  `;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    // scaledSize: new google.maps.Size(54, 54), // Removed window. prefix
    // anchor: new google.maps.Point(27, 27), // Removed window. prefix
  };
}
export function getRandomColor() {
  const colors = ["#00A870", "#FF5733", "#3366FF", "#FFC300", "#8E44AD"];
  return colors[Math.floor(Math.random() * colors.length)];
}
