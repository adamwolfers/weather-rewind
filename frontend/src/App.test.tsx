import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest'
import App from './App'
import { fetchWeather } from './api/weather'

const user = userEvent.setup()

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
    it('displays weather result after submit', async () => {
        render(<App />)
        const inputSubmit = screen.getByRole('button')
        await user.click(inputSubmit)

        await waitFor(() => {
            expect(screen.getByText(/72/)).toBeInTheDocument()
        })
    })

    it('fetches new weather when user submits location + date', async () => {
        render(<App />)
        const inputLat = screen.getByLabelText('Latitude')
        const inputLon = screen.getByLabelText('Longitude')
        const inputDate = screen.getByLabelText('Date')
        const inputSubmit = screen.getByRole('button')
        await user.clear(inputLat)
        await user.clear(inputLon)
        await user.clear(inputDate)
        await user.type(inputLat, '47.9')
        await user.type(inputLon, '-122.7')
        await user.type(inputDate, '2024-06-16')
        await user.click(inputSubmit)
        expect(fetchWeather).toHaveBeenCalledWith(47.9, -122.7, '2024-06-16')
    })
})
