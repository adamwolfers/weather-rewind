import { useState, useEffect } from 'react'
import WeatherDisplay from './components/WeatherDisplay'
import { fetchWeather, type WeatherData } from './api/weather'

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    fetchWeather(47.9, -122.7, '2024-06-15')
    .then(setWeather)
  }, [])

  return (
    <main>
      {weather && <WeatherDisplay weather={weather} />}
    </main>
  )
}

export default App
