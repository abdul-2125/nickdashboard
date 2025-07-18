'use client'

import { useState, useEffect } from 'react'
import { SalesData, DateGroupedData } from '@/types/sales'
import { fetchSalesData } from '@/lib/api'
import MetricsCards from '@/components/MetricsCards'
import SalesTable from '@/components/SalesTable'
import FilterControls from '@/components/FilterControls'
import ExcelUploader from '@/components/ExcelUploader'
import Charts from '@/components/Charts'

export default function Dashboard() {
  const [data, setData] = useState<SalesData[]>([])
  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState<any[]>([])
  const [isSingleDate, setIsSingleDate] = useState(true)
  
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]
  
  const [dateFilter, setDateFilter] = useState({ start: yesterdayStr, end: yesterdayStr })

  const groupDataByDate = (data: SalesData[]) => {
    const grouped: { [key: string]: SalesData[] } = {}
    data.forEach(record => {
      if (!grouped[record.report_date]) {
        grouped[record.report_date] = []
      }
      grouped[record.report_date].push(record)
    })
    return Object.entries(grouped).map(([date, records]) => ({ date, records }))
  }

  const aggregateDataByRep = (data: SalesData[]) => {
    const grouped = data.reduce((acc: any, record) => {
      const rep = record.sales_rep
      if (!acc[rep]) {
        acc[rep] = { ...record }
      } else {
        acc[rep].total_appointments_booked += record.total_appointments_booked
        acc[rep].total_appointments_conducted += record.total_appointments_conducted
        acc[rep].new_clients_closed += record.new_clients_closed
        acc[rep].new_clients_closed_organic += record.new_clients_closed_organic
        acc[rep].total_new_clients_closed += record.total_new_clients_closed
        acc[rep].total_rebuys += record.total_rebuys
        acc[rep].new_client_revenue += record.new_client_revenue
        acc[rep].rebuy_revenue += record.rebuy_revenue
        acc[rep].total_revenue += record.total_revenue
      }
      return acc
    }, {})
    
    return Object.values(grouped).map((rep: any) => ({
      ...rep,
      show_percentage: rep.total_appointments_booked > 0 ? (rep.total_appointments_conducted / rep.total_appointments_booked) * 100 : 0,
      close_rate: rep.total_appointments_conducted > 0 ? (rep.total_new_clients_closed / rep.total_appointments_conducted) * 100 : 0,
      average_deal_size: rep.total_new_clients_closed > 0 ? rep.new_client_revenue / rep.total_new_clients_closed : 0
    }))
  }

  const loadData = async () => {
    setLoading(true)
    const salesData = await fetchSalesData(dateFilter.start, dateFilter.end)
    
    const isSingleDateFilter = dateFilter.start === dateFilter.end
    let processedData, processedTableData

    if (isSingleDateFilter) {
      processedData = salesData.filter(row => row.report_date === dateFilter.start)
      processedTableData = processedData
    } else {
      processedData = aggregateDataByRep(salesData)
      processedTableData = groupDataByDate(salesData)
    }

    setData(processedData)
    setTableData(processedTableData)
    setIsSingleDate(isSingleDateFilter)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [dateFilter])

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading sales data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sales Dashboard</h1>
        
        <FilterControls 
          dateFilter={dateFilter} 
          onDateChange={setDateFilter}
        />
        
        <ExcelUploader onUploadSuccess={loadData} />
        
        <Charts data={data} />
        
        {data.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">No sales data available. Upload an Excel file to get started.</p>
          </div>
        ) : (
          <>
            <MetricsCards data={data} />
            <SalesTable data={tableData} isSingleDate={isSingleDate} aggregatedData={data} />
          </>
        )}
      </div>
    </div>
  )
} 