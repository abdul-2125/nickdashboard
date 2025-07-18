import { SalesData } from '@/types/sales'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface ChartsProps {
  data: SalesData[]
}

export default function Charts({ data }: ChartsProps) {
  const individualReps = data.filter(rep => rep.sales_rep !== 'TEAM TOTAL')
  
  const revenueData = individualReps.map(rep => ({
    name: rep.sales_rep,
    newRevenue: rep.new_client_revenue,
    rebuyRevenue: rep.rebuy_revenue,
    total: rep.total_revenue
  }))

  const teamTotal = data.find(row => row.sales_rep === 'TEAM TOTAL')
  const pieData = teamTotal ? [
    { name: 'New Client Revenue', value: teamTotal.new_client_revenue },
    { name: 'Rebuy Revenue', value: teamTotal.rebuy_revenue }
  ] : []

  const COLORS = ['#0088FE', '#00C49F']

  if (data.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Sales Rep</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Bar dataKey="newRevenue" fill="#8884d8" name="New Client" />
            <Bar dataKey="rebuyRevenue" fill="#82ca9d" name="Rebuy" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={(entry) => `${entry.name}: $${entry.value.toLocaleString()}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 