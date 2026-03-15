export function generateDeliveryPath(start = { lat: 30.033, lng: 31.233 }, end = { lat: 30.040, lng: 31.250 }, steps = 20) {
    const path = [];
    const latStep = (end.lat - start.lat) / steps;
    const lngStep = (end.lng - start.lng) / steps;

    for (let i = 0; i <= steps; i++) {
        path.push({
            lat: +(start.lat + latStep * i).toFixed(6),
            lng: +(start.lng + lngStep * i).toFixed(6)
        });
    }
    return path;
}