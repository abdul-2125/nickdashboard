interface RepCardsProps {
  repsData: {
    [repName: string]: {
      revenue: number
      newClients: number
      showRate: number
      closeRate: number
    }
  }
}

export default function RepCards({ repsData }: RepCardsProps) {
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('')
  const getColor = (name: string) => {
    const colors = ['#4361ee', '#7209b7', '#4cc9f0']
    return colors[Object.keys(repsData).indexOf(name)] || '#4361ee'
  }

  if (Object.keys(repsData).length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow mb-8">
        <p className="text-gray-500 text-center">No rep data available for this date range.</p>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Sales Representatives - Custom Range</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(repsData).map(([repName, repData]) => (
          <div key={repName} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold mr-3"
                style={{backgroundColor: getColor(repName)}}
              >
                {getInitials(repName)}
              </div>
              <div>
                <h3 className="font-semibold">{repName}</h3>
                <p className="text-gray-600 text-sm">Sales Rep</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Revenue</p>
                <p className="font-semibold text-lg">${repData.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">New Clients</p>
                <p className="font-semibold text-lg">{repData.newClients}</p>
              </div>
              <div>
                <p className="text-gray-600">Show Rate</p>
                <p className="font-semibold text-blue-500">{repData.showRate.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-gray-600">Close Rate</p>
                <p className="font-semibold text-orange-500">{repData.closeRate.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 