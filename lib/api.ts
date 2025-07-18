import { SalesData } from '@/types/sales'

export async function fetchSalesData(startDate?: string, endDate?: string): Promise<SalesData[]> {
  try {
    const params = new URLSearchParams()
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    
    const url = `/api/sales-data${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Failed to fetch sales data')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching sales data:', error)
    return []
  }
}

export async function uploadSalesData(data: SalesData[]): Promise<boolean> {
  try {
    const response = await fetch('/api/sales-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.ok
  } catch (error) {
    console.error('Error uploading sales data:', error)
    return false
  }
} 