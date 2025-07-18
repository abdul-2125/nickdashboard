import { useState } from 'react'
import { SalesData } from '@/types/sales'

interface SalesTableProps {
  data: any[]
  isSingleDate: boolean
  aggregatedData: any[]
}

export default function SalesTable({ data, isSingleDate, aggregatedData }: SalesTableProps) {
  const [currentPage, setCurrentPage] = useState(0)
  
  const currentData = isSingleDate ? data : (data[currentPage]?.records || [])
  const totalPages = isSingleDate ? 1 : data.length
  const currentDate = isSingleDate ? null : data[currentPage]?.date
  
  const teamTotal = aggregatedData.find((row: any) => row.sales_rep === 'TEAM TOTAL')
  const aggregateTotals = teamTotal || aggregatedData.reduce((acc: any, rep: any) => ({
    total_appointments_booked: acc.total_appointments_booked + rep.total_appointments_booked,
    total_appointments_conducted: acc.total_appointments_conducted + rep.total_appointments_conducted,
    total_new_clients_closed: acc.total_new_clients_closed + rep.total_new_clients_closed,
    new_clients_closed_organic: acc.new_clients_closed_organic + rep.new_clients_closed_organic,
    total_rebuys: acc.total_rebuys + rep.total_rebuys,
    new_client_revenue: acc.new_client_revenue + rep.new_client_revenue,
    rebuy_revenue: acc.rebuy_revenue + rep.rebuy_revenue,
    total_revenue: acc.total_revenue + rep.total_revenue,
    show_percentage: acc.total_appointments_booked > 0 ? (acc.total_appointments_conducted / acc.total_appointments_booked) * 100 : 0,
    close_rate: acc.total_appointments_conducted > 0 ? (acc.total_new_clients_closed / acc.total_appointments_conducted) * 100 : 0,
    average_deal_size: acc.total_new_clients_closed > 0 ? acc.new_client_revenue / acc.total_new_clients_closed : 0
  }), {
    total_appointments_booked: 0,
    total_appointments_conducted: 0,
    total_new_clients_closed: 0,
    new_clients_closed_organic: 0,
    total_rebuys: 0,
    new_client_revenue: 0,
    rebuy_revenue: 0,
    total_revenue: 0
  })

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
            {currentData.filter((rep: any) => rep.sales_rep !== 'TEAM TOTAL').map((rep: any) => (
              <tr key={rep.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rep.sales_rep}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rep.total_appointments_booked} / {rep.total_appointments_conducted}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rep.total_new_clients_closed} ({rep.new_clients_closed_organic} organic)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(rep.show_percentage * 100).toFixed(1)}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(rep.close_rate * 100).toFixed(1)}%</td>
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
      
      {!isSingleDate && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Page {currentPage + 1} of {totalPages} - {currentDate ? new Date(currentDate).toLocaleDateString() : ''}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
                  </div>
        )}
        
        {!isSingleDate && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Aggregate Summary ({totalPages} days)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Appointments</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">New Clients</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Show %</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Close %</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Rebuys</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-4 py-2 text-sm font-medium">
                      {aggregateTotals.total_appointments_booked} / {aggregateTotals.total_appointments_conducted}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {aggregateTotals.total_new_clients_closed} ({aggregateTotals.new_clients_closed_organic} organic)
                    </td>
                    <td className="px-4 py-2 text-sm">{(aggregateTotals.show_percentage || 0).toFixed(1)}%</td>
                    <td className="px-4 py-2 text-sm">{(aggregateTotals.close_rate || 0).toFixed(1)}%</td>
                    <td className="px-4 py-2 text-sm">{aggregateTotals.total_rebuys}</td>
                    <td className="px-4 py-2 text-sm font-medium text-green-600">
                      ${aggregateTotals.total_revenue.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    )
  } 