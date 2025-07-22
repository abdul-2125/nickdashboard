'use client'

import { useState, useEffect } from 'react'
import { SalesData } from '@/types/sales'
import { fetchSalesData } from '@/lib/api'
import DateRangePicker from '@/components/DateTabs'
import MetricsDisplay from '@/components/MetricsDisplay'
import RepCards from '@/components/RepCards'
import ChartsSection from '@/components/ChartsSection'
import DetailedTable from '@/components/DetailedTable'
import ExcelUploader from '@/components/ExcelUploader'

export default function Dashboard() {
  const [allData, setAllData] = useState<SalesData[]>([])
  const [aggregatedData, setAggregatedData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({start: '', end: ''})

  const loadData = async () => {
    setLoading(true)
    const salesData = await fetchSalesData('', '')
    setAllData(salesData)
    setLoading(false)
  }

  const aggregateDataForRange = (start: string, end: string) => {
    const filtered = allData.filter(record => 
      record.report_date >= start && record.report_date <= end
    )
    
    const teamTotals = filtered.filter(r => r.sales_rep === 'TEAM TOTAL')
    const repData = filtered.filter(r => r.sales_rep !== 'TEAM TOTAL')
    
    // Aggregate team metrics
    const totalRevenue = teamTotals.reduce((sum, r) => sum + r.total_revenue, 0)
    const totalAppts = teamTotals.reduce((sum, r) => sum + r.total_appointments_booked, 0)
    const totalConducted = teamTotals.reduce((sum, r) => sum + r.total_appointments_conducted, 0)
    const totalClients = teamTotals.reduce((sum, r) => sum + r.total_new_clients_closed, 0)
    const totalRebuys = teamTotals.reduce((sum, r) => sum + r.total_rebuys, 0)
    
    // Aggregate rep data
    const repsAggregated: any = {}
    const repNames = Array.from(new Set(repData.map(r => r.sales_rep)))
    
    repNames.forEach(name => {
      const repRecords = repData.filter(r => r.sales_rep === name)
      repsAggregated[name] = {
        revenue: repRecords.reduce((sum, r) => sum + r.total_revenue, 0),
        newClients: repRecords.reduce((sum, r) => sum + r.total_new_clients_closed, 0),
                 showRate: (repRecords.reduce((sum, r) => sum + r.show_percentage, 0) / repRecords.length) * 100,
         closeRate: (repRecords.reduce((sum, r) => sum + r.close_rate, 0) / repRecords.length) * 100,
        apptsBooked: repRecords.reduce((sum, r) => sum + r.total_appointments_booked, 0),
        apptsConducted: repRecords.reduce((sum, r) => sum + r.total_appointments_conducted, 0),
        newClientsOrganic: repRecords.reduce((sum, r) => sum + r.new_clients_closed_organic, 0),
        totalNewClients: repRecords.reduce((sum, r) => sum + r.total_new_clients_closed, 0),
        rebuys: repRecords.reduce((sum, r) => sum + r.total_rebuys, 0),
        newRevenue: repRecords.reduce((sum, r) => sum + r.new_client_revenue, 0),
        rebuyRevenue: repRecords.reduce((sum, r) => sum + r.rebuy_revenue, 0),
        totalRevenue: repRecords.reduce((sum, r) => sum + r.total_revenue, 0),
        avgDealSize: repRecords.reduce((sum, r) => sum + r.average_deal_size, 0) / repRecords.length
      }
    })
    
    // Daily data for charts
    const dailyData = teamTotals.map(record => ({
      date: record.report_date,
      revenue: record.total_revenue
    }))
    
    setAggregatedData({
      totalRevenue,
      apptsBooked: totalAppts,
      apptsConducted: totalConducted,
      newClients: totalClients,
      rebuys: totalRebuys,
      reps: repsAggregated,
      dailyData
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (allData.length > 0 && dateRange.start && dateRange.end) {
      aggregateDataForRange(dateRange.start, dateRange.end)
    }
  }, [allData, dateRange])

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {dateRange.start && dateRange.end ? 
            `Custom Range Performance (${dateRange.start} - ${dateRange.end})` : 
            'Sales Dashboard'
          }
        </h1>

        <ExcelUploader onUploadSuccess={loadData} />
        
        <DateRangePicker onDateRangeSelect={(start, end) => setDateRange({start, end})} />

        {aggregatedData.totalRevenue > 0 && (
          <>
            <MetricsDisplay data={aggregatedData} />
            <ChartsSection dailyData={aggregatedData.dailyData} repsData={aggregatedData.reps} />
            <RepCards repsData={aggregatedData.reps} />
            <DetailedTable repsData={aggregatedData.reps} />
          </>
        )}
      </div>
    </div>
  )
} 