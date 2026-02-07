import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest'
import LocationInput from './LocationInput'

const user = userEvent.setup()

describe('LocationInput', () => {
    it('calls onChange with lat/lon values', async () => {
        const onChange = vi.fn()
        render(<LocationInput onChange={onChange} />)
        const inputLat = screen.getByLabelText('Latitude')
        const inputLon = screen.getByLabelText('Longitude')
        await user.clear(inputLat)
        await user.clear(inputLon)
        await user.type(inputLat, '47.9')
        await user.type(inputLon, '-122.7')
        await user.tab()
        expect(onChange).toHaveBeenCalledWith({ lat: 47.9, lon: -122.7 })
    })

    it('shows validation error for latitude less than -90', async () => {
        const onChange = vi.fn()
        render(<LocationInput onChange={onChange} />)
        const inputLat = screen.getByLabelText('Latitude')
        await user.clear(inputLat)
        await user.type(inputLat, '-100')
        expect(screen.getByText(/invalid/i)).toBeInTheDocument()
    })

    it('shows validation error for latitude greater than 90', async () => {
        const onChange = vi.fn()
        render(<LocationInput onChange={onChange} />)
        const inputLat = screen.getByLabelText('Latitude')
        await user.clear(inputLat)
        await user.type(inputLat, '100')
        expect(screen.getByText(/invalid/i)).toBeInTheDocument()
    })

    it('shows validation error for longitude less than -180', async () => {
        const onChange = vi.fn()
        render(<LocationInput onChange={onChange} />)
        const inputLon = screen.getByLabelText('Longitude')
        await user.clear(inputLon)
        await user.type(inputLon, '-200')
        expect(screen.getByText(/invalid/i)).toBeInTheDocument()
    })

    it('shows validation error for longitude greater than 180', async () => {
        const onChange = vi.fn()
        render(<LocationInput onChange={onChange} />)
        const inputLon = screen.getByLabelText('Longitude')
        await user.clear(inputLon)
        await user.type(inputLon, '200')
        expect(screen.getByText(/invalid/i)).toBeInTheDocument()
    })
})
