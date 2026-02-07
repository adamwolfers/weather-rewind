import { useState } from 'react'
import WeatherDisplay from './components/WeatherDisplay'
import { fetchWeather, type WeatherData } from './api/weather'
import LocationInput from './components/LocationInput'
import DatePicker from './components/DatePicker'

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [date, setDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchWeather(lat, lon, date)
    .then(setWeather)
  }

  return (
    <main>
      {weather && <WeatherDisplay weather={weather} />}
      <form onSubmit={handleSubmit}>
        <LocationInput onChange={({ lat, lon }) => { setLat(lat); setLon(lon); }} />
        <DatePicker onChange={setDate} />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default App
