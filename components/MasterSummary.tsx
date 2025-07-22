import { SalesData } from '@/types/sales'

interface MasterSummaryProps {
  data: SalesData[]
}

export default function MasterSummary({ data }: MasterSummaryProps) {
  if (data.length === 0) {
    return null
  }

  const masterRow = data[0] // Should be TEAM TOTAL row

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Master Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Appointments</h3>
          <p className="text-2xl font-bold text-blue-600">
            {masterRow.total_appointments_booked} / {masterRow.total_appointments_conducted}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium text-gray-500 uppercase">New Clients</h3>
          <p className="text-2xl font-bold text-green-600">{masterRow.total_new_clients_closed}</p>
          <p className="text-sm text-gray-500">({masterRow.new_clients_closed_organic} organic)</p>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Show Rate</h3>
          <p className="text-2xl font-bold text-purple-600">{masterRow.show_percentage.toFixed(1)}%</p>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Revenue</h3>
          <p className="text-2xl font-bold text-orange-600">${masterRow.total_revenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
} 