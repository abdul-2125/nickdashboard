import { useState } from 'react'

interface DateRangePickerProps {
  onDateRangeSelect: (start: string, end: string) => void
}

export default function DateRangePicker({ onDateRangeSelect }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleApply = () => {
    if (startDate && endDate) {
      onDateRangeSelect(startDate, endDate)
    }
  }

  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow flex gap-4 items-center">
      <label className="font-medium">Date Range:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border rounded px-3 py-2"
        aria-label="Start date"
      />
      <span>to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border rounded px-3 py-2"
        aria-label="End date"
      />
      <button
        onClick={handleApply}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply Range
      </button>
    </div>
  )
} 