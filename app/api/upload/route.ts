import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Read the Excel file
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    // Get the selected date from form
    const reportDate = formData.get('reportDate') as string || new Date().toISOString().split('T')[0]

    // Transform data to match our schema
    const salesData = jsonData.map((row: any, rowIndex: number) => ({
      sales_rep: row['SALES REP'] || row['Sales Rep'] || '',
      total_appointments_booked: parseInt(row['Total Appointments Booked']) || 0,
      total_appointments_conducted: parseInt(row['Total Appointments Conducted']) || 0,
      new_clients_closed: parseInt(row['New Clients Closed']) || 0,
      new_clients_closed_organic: parseInt(row['New Clients Closed (Organic)']) || 0,
      total_new_clients_closed: parseInt(row['Total New Clients Closed']) || 0,
      total_rebuys: Math.floor(parseFloat(worksheet[`G${rowIndex + 2}`]?.v) || 0),
      show_percentage: parseFloat(row['Daily Show Percentage']?.toString().replace('%', '')) || 0,
      close_rate: parseFloat(row['Running Close Rate (Sit->Sale)']?.toString().replace('%', '')) || 0,
      new_client_revenue: parseFloat(row['NEW CLIENT REVENUE']?.toString().replace(/[$,]/g, '')) || 0,
      rebuy_revenue: parseFloat(row['REBUY REVENUE']?.toString().replace(/[$,]/g, '')) || 0,
      total_revenue: parseFloat(row['TOTAL REVENUE COLLECTED (NEW CLIENT + REBUY)']?.toString().replace(/[$,]/g, '')) || 0,
      average_deal_size: parseFloat(row['AVERAGE DEAL SIZE (NEW CLIENT SALES ONLY)']?.toString().replace(/[$,]/g, '')) || 0,
      report_date: reportDate,
      date_range_start: reportDate,
      date_range_end: reportDate
    }))

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('sales_data')
      .insert(salesData)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Data uploaded successfully', count: data.length })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 })
  }
} 