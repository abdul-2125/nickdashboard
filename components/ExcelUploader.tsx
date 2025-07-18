import { useState } from 'react'
import { uploadSalesData } from '@/lib/api'

interface ExcelUploaderProps {
  onUploadSuccess: () => void
}

export default function ExcelUploader({ onUploadSuccess }: ExcelUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('reportDate', selectedDate)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        onUploadSuccess()
        alert('Data uploaded successfully!')
      } else {
        alert('Upload failed. Please try again.')
      }
    } catch (error) {
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Excel Data</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Report Date:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Upload an Excel file (.xlsx or .xls) with sales data
      </p>
    </div>
  )
} 