interface DetailedTableProps {
  repsData: {
    [repName: string]: {
      apptsBooked: number
      apptsConducted: number
      newClients: number
      newClientsOrganic: number
      totalNewClients: number
      rebuys: number
      showRate: number
      closeRate: number
      newRevenue: number
      rebuyRevenue: number
      totalRevenue: number
      avgDealSize: number
    }
  }
}

export default function DetailedTable({ repsData }: DetailedTableProps) {
  if (Object.keys(repsData).length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Detailed Metrics - Custom Range</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales Rep</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appts Booked</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appts Conducted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">New Clients</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">New Clients (Organic)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total New Clients</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rebuys</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Show Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Close Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">New Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rebuy Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Deal Size</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(repsData).map(([name, data]) => (
              <tr key={name}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.apptsBooked}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.apptsConducted}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.newClients}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.newClientsOrganic}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.totalNewClients}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.rebuys}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.showRate.toFixed(2)}%</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.closeRate.toFixed(2)}%</td>
                <td className="px-6 py-4 whitespace-nowrap">${data.newRevenue.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">${data.rebuyRevenue.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">${data.totalRevenue.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">${data.avgDealSize.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 