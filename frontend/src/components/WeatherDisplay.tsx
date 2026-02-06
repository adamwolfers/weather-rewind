import type { WeatherData } from '../api/weather'

interface Props {
    weather: WeatherData
}

export default function WeatherDisplay({ weather }: Props) {
    return (
        <div className="p-6 bg-white rounded-lg shadow max-w-sm">
            <p className="text-4xl font-bold">{weather.temperature_high}</p>
            <p className="text-gray-600">{weather.conditions}</p>
        </div>
    )
}
