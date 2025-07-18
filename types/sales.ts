export interface SalesData {
  id?: string
  sales_rep: string
  total_appointments_booked: number
  total_appointments_conducted: number
  new_clients_closed: number
  new_clients_closed_organic: number
  total_new_clients_closed: number
  total_rebuys: number
  show_percentage: number
  close_rate: number
  new_client_revenue: number
  rebuy_revenue: number
  total_revenue: number
  average_deal_size: number
  report_date: string
  date_range_start: string
  date_range_end: string
}

export interface DateFilter {
  start: string
  end: string
}

export interface DateGroupedData {
  date: string
  records: SalesData[]
} 