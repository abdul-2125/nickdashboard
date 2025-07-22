import { SalesData } from '@/types/sales'

interface SalesTableProps {
  data: SalesData[]
}

export default function SalesTable({ data }: SalesTableProps) {

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Sales Representatives Performance</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Rep</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointments</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Clients</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Show %</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close %</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rebuys</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Deal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((rep) => (
              <tr key={rep.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rep.sales_rep}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rep.total_appointments_booked} / {rep.total_appointments_conducted}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rep.total_new_clients_closed} ({rep.new_clients_closed_organic} organic)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rep.show_percentage.toFixed(1)}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rep.close_rate.toFixed(1)}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rep.total_rebuys}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  ${rep.average_deal_size.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  ${rep.total_revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
                </table>
      </div>
    </div>
  )
} 