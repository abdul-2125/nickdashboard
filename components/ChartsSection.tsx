import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

interface ChartsSectionProps {
  dailyData: Array<{date: string, revenue: number}>
  repsData: {[key: string]: {revenue: number, newClients: number}}
}

export default function ChartsSection({ dailyData, repsData }: ChartsSectionProps) {
  const lineData = {
    labels: dailyData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [{
      label: 'Revenue',
      data: dailyData.map(d => d.revenue),
      borderColor: '#4361ee',
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const barData = {
    labels: Object.keys(repsData),
    datasets: [
      {
        label: 'Revenue',
        data: Object.values(repsData).map(rep => rep.revenue),
        backgroundColor: '#4361ee'
      },
      {
        label: 'New Clients',
        data: Object.values(repsData).map(rep => rep.newClients),
        backgroundColor: '#4cc9f0'
      }
    ]
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
        <div className="h-64">
          <Line data={lineData} options={{responsive: true, maintainAspectRatio: false}} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Team Performance Comparison</h3>
        <div className="h-64">
          <Bar data={barData} options={{responsive: true, maintainAspectRatio: false}} />
        </div>
      </div>
    </div>
  )
} 