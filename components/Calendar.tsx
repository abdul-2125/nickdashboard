interface CalendarProps {
  dashboardData: any
  onDateSelect: (date: string) => void
}

export default function Calendar({ dashboardData, onDateSelect }: CalendarProps) {
  const availableDates = Object.keys(dashboardData)

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Dates</h2>
      <div className="grid grid-cols-7 gap-2">
        {availableDates.map(date => (
          <button
            key={date}
            onClick={() => onDateSelect(date)}
            className="p-2 text-sm bg-blue-50 hover:bg-blue-100 rounded border"
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  )
} 