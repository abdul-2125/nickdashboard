import { DateFilter } from '@/types/sales'

interface FilterControlsProps {
  dateFilter: DateFilter
  onDateChange: (filter: DateFilter) => void
}

export default function FilterControls({ dateFilter, onDateChange }: FilterControlsProps) {
  const handleQuickFilter = (days: number) => {
    const end = new Date().toISOString().split('T')[0]
    const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    onDateChange({ start, end })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">From:</label>
          <input
            type="date"
            value={dateFilter.start}
            onChange={(e) => onDateChange({ ...dateFilter, start: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">To:</label>
          <input
            type="date"
            value={dateFilter.end}
            onChange={(e) => onDateChange({ ...dateFilter, end: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => handleQuickFilter(7)}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
          >
            Past 7 Days
          </button>
          <button
            onClick={() => handleQuickFilter(30)}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
          >
            Past 30 Days
          </button>
        </div>
      </div>
    </div>
  )
} 