import { useState } from 'react'

interface Props {
    onChange: (location: { lat: number, lon: number }) => void
}


export default function LocationInput({ onChange }: Props) {
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const handleBlur = () => onChange({ lat: Number(lat), lon: Number(lon) })
    const invalidLatLon = (Number(lat) < -90 || Number(lat) > 90 || Number(lon) < -180 || Number(lon) > 180)

    return (
        <div>
            <label>Latitude <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} onBlur={handleBlur} /></label>
            <label>Longitude <input type="number" value={lon} onChange={(e) => setLon(e.target.value)} onBlur={handleBlur} /></label>
            {invalidLatLon && <span>Invalid</span>}
        </div>
    )
}