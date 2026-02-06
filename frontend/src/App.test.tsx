import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'

vi.mock('./api/weather', () => ({
    fetchWeather: vi.fn(() => Promise.resolve({
        date: '2024-06-15',
        latitude: 47.9,
        longitude: -122.7,
        temperature_high: 72.0,
        temperature_low: 58.0,
        conditions: 'Sunny',
    })),
}))

describe('App', () => {
    it('fetches and displays weather on mount', async () => {
        render(<App />)

        await waitFor(() => {
            expect(screen.getByText(/72/)).toBeInTheDocument()
        })
    })
})
