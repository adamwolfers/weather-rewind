import { render, screen } from '@testing-library/react'
import WeatherDisplay from './WeatherDisplay'

const mockWeather = {
    date: '2024-06-15',
    latitude: 47.9,
    longitude: -122.7,
    temperature_high: 72.0,
    temperature_low: 58.0,
    conditions: 'Sunny'
}

describe('WeatherDisplay', () => {
    it('renders temperature', () => {
        render(<WeatherDisplay weather={mockWeather} />)
        expect(screen.getByText(/72/)).toBeInTheDocument()
    })

    it('renders conditions', () => {
        render(<WeatherDisplay weather={mockWeather} />)
        expect(screen.getByText(/Sunny/)).toBeInTheDocument()
    })
})
