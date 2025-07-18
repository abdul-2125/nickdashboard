import { SalesData } from '@/types/sales'

interface MetricsCardsProps {
  data: SalesData[]
}

export default function MetricsCards({ data }: MetricsCardsProps) {
  if (data.length === 0) {
    return null
  }

  const teamTotal = data.find(row => row.sales_rep === 'TEAM TOTAL')
  
  const totals = teamTotal ? {
    appointments_booked: teamTotal.total_appointments_booked,
    appointments_conducted: teamTotal.total_appointments_conducted,
    new_clients: teamTotal.total_new_clients_closed,
    rebuys: teamTotal.total_rebuys,
    new_revenue: teamTotal.new_client_revenue,
    rebuy_revenue: teamTotal.rebuy_revenue,
    total_revenue: teamTotal.total_revenue,
    organic_clients: teamTotal.new_clients_closed_organic,
    avg_deal: teamTotal.average_deal_size
  } : data.reduce((acc, rep) => ({
    appointments_booked: acc.appointments_booked + rep.total_appointments_booked,
    appointments_conducted: acc.appointments_conducted + rep.total_appointments_conducted,
    new_clients: acc.new_clients + rep.total_new_clients_closed,
    rebuys: acc.rebuys + rep.total_rebuys,
    new_revenue: acc.new_revenue + rep.new_client_revenue,
    rebuy_revenue: acc.rebuy_revenue + rep.rebuy_revenue,
    total_revenue: acc.total_revenue + rep.total_revenue,
    organic_clients: acc.organic_clients + rep.new_clients_closed_organic,
    avg_deal: acc.avg_deal + rep.average_deal_size
  }), {
    appointments_booked: 0,
    appointments_conducted: 0,
    new_clients: 0,
    rebuys: 0,
    new_revenue: 0,
    rebuy_revenue: 0,
    total_revenue: 0,
    organic_clients: 0,
    avg_deal: 0
  })

  const showPercentage = teamTotal ? teamTotal.show_percentage : (totals.appointments_booked > 0 ? (totals.appointments_conducted / totals.appointments_booked) * 100 : 0)
  const closeRate = teamTotal ? teamTotal.close_rate : (totals.appointments_conducted > 0 ? (totals.new_clients / totals.appointments_conducted) * 100 : 0)

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Total Appointments</h3>
        <p className="text-3xl font-bold text-blue-600">{totals.appointments_booked}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">New Clients Closed</h3>
        <p className="text-3xl font-bold text-green-600">{totals.new_clients}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Show Rate</h3>
        <p className="text-3xl font-bold text-purple-600">{(showPercentage * 100).toFixed(1)}%</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
        <p className="text-3xl font-bold text-orange-600">${totals.total_revenue.toLocaleString()}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Rebuys</h3>
        <p className="text-3xl font-bold text-indigo-600">{totals.rebuys}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Rebuy Revenue</h3>
        <p className="text-3xl font-bold text-red-600">${totals.rebuy_revenue.toLocaleString()}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Appointments Conducted</h3>
        <p className="text-2xl font-bold text-blue-500">{totals.appointments_conducted}</p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Close Rate</h3>
        <p className="text-2xl font-bold text-green-500">{(closeRate * 100).toFixed(1)}%</p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Organic Clients</h3>
        <p className="text-2xl font-bold text-purple-500">{totals.organic_clients}</p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">New Client Revenue</h3>
        <p className="text-2xl font-bold text-orange-500">${totals.new_revenue.toLocaleString()}</p>
      </div>
      
             <div className="bg-gray-50 p-6 rounded-lg shadow">
         <h3 className="text-lg font-semibold text-gray-700">Conversion Rate</h3>
         <p className="text-2xl font-bold text-indigo-500">{totals.appointments_booked > 0 ? ((totals.new_clients / totals.appointments_booked) * 100).toFixed(1) : '0.0'}%</p>
       </div>
       
       <div className="bg-gray-50 p-6 rounded-lg shadow">
         <h3 className="text-lg font-semibold text-gray-700">Non-Organic Clients</h3>
         <p className="text-2xl font-bold text-red-500">{totals.new_clients - totals.organic_clients}</p>
       </div>
     </div>
     </>
  )
} 