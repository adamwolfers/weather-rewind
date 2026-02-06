import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest'
import DatePicker from './DatePicker'

const user = userEvent.setup()

describe('DatePicker', () => {
    it('calls onChange with selected date', async () => {
        const onChange = vi.fn()
        render(<DatePicker onChange={onChange} />)
        const input = screen.getByLabelText('Date')
        await user.clear(input)
        await user.type(input, '2024-06-15')
        expect(onChange).toHaveBeenCalledWith('2024-06-15')
    })

    it('disables future dates', () => {
        const onChange = vi.fn()
        render(<DatePicker onChange={onChange} />)
        const input = screen.getByLabelText('Date')
        expect(input).toHaveAttribute('max', new Date().toISOString().split('T')[0])
    })
})
