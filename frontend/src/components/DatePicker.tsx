interface Props {
    onChange: (date: string) => void
}

export default function DatePicker({ onChange }: Props) {
    return (
        <div>
            <label>Date <input type="date" max={new Date().toISOString().split('T')[0]} onChange={(e) => onChange(e.target.value)} /></label>
        </div>
    )
}
