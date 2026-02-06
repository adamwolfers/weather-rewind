export interface WeatherData {
    date: string
    latitude: number
    longitude: number
    temperature_high: number
    temperature_low: number
    conditions: string
}

export async function fetchWeather(lat: number, lon: number, date: string): Promise<WeatherData> {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}&date=${date}`)
    return response.json()
}
