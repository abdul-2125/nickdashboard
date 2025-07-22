interface MetricsDisplayProps {
  data: {
    totalRevenue?: number
    apptsBooked?: number
    apptsConducted?: number
    newClients?: number
    rebuys?: number
  }
}

export default function MetricsDisplay({ data }: MetricsDisplayProps) {
  const {
    totalRevenue = 0,
    apptsBooked = 0,
    apptsConducted = 0,
    newClients = 0,
    rebuys = 0
  } = data

  const showRate = apptsBooked > 0 ? ((apptsConducted / apptsBooked) * 100).toFixed(1) : '0.0'

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
        <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Appointments Booked</h3>
        <p className="text-3xl font-bold text-blue-600">{apptsBooked}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Appointments Conducted</h3>
        <p className="text-3xl font-bold text-purple-600">{apptsConducted}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">New Clients</h3>
        <p className="text-3xl font-bold text-orange-600">{newClients}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Rebuys</h3>
        <p className="text-3xl font-bold text-red-600">{rebuys}</p>
        <p className="text-sm text-gray-500">Show Rate: {showRate}%</p>
      </div>
    </div>
  )
} 