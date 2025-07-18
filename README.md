# Sales Dashboard

A simple sales performance dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📊 Sales performance metrics
- 📅 Date range filtering (7 days, 30 days, custom)
- 📋 Sales representative data table
- 🎯 Key performance indicators
- 📈 Visual charts (bar charts, pie charts)
- 💰 Complete revenue tracking (new client + rebuy)
- 🎯 Organic client tracking
- 💼 Average deal size metrics
- 📱 Responsive design

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase database:**
   - Create a new Supabase project
   - Run the SQL commands from `database/setup.sql` in your Supabase SQL editor
   - Copy your project URL and anon key

3. **Set up environment variables:**
   Create a `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

6. **Upload data:**
   Use the Excel upload feature to import your sales data with these column names:
   - SALES REP
   - Total Appointments Booked
   - Total Appointments Conducted
   - New Clients Closed
   - New Clients Closed (Organic)
   - Total New Clients Closed
   - Total Rebuys
   - Current Show Percentage
   - Current Close Rate (Sit->Sale)
   - NEW CLIENT REVENUE
   - REBUY REVENUE
   - TOTAL REVENUE COLLECTED (NEW CLIENT + REBUY)
   - AVERAGE DEAL SIZE (NEW CLIENT SALES ONLY)

## Current Status

✅ Basic dashboard structure  
✅ Dynamic data loading from Supabase  
✅ Metrics cards with calculations  
✅ Sales table with empty state  
✅ Date filtering  
✅ Excel upload functionality  
✅ API routes (GET/POST sales data, file upload)  
✅ Database schema and setup SQL  
✅ Visual charts (bar & pie charts)  
✅ Complete metrics display (rebuys, organic, avg deal)  
✅ Team total aggregation  
✅ Percentage calculations fixed  

## Technology Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Charts:** Recharts
- **File Processing:** xlsx

## Project Structure

```
app/
├── components/          # React components
├── lib/                # Utilities and config
├── types/              # TypeScript types
└── page.tsx            # Main dashboard
``` 