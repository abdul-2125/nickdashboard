-- Sales Dashboard Database Setup for Supabase

CREATE TABLE sales_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sales_rep text NOT NULL,
  total_appointments_booked integer NOT NULL DEFAULT 0,
  total_appointments_conducted integer NOT NULL DEFAULT 0,
  new_clients_closed integer NOT NULL DEFAULT 0,
  new_clients_closed_organic integer NOT NULL DEFAULT 0,
  total_new_clients_closed integer NOT NULL DEFAULT 0,
  total_rebuys integer NOT NULL DEFAULT 0,
  show_percentage decimal(5,2) NOT NULL DEFAULT 0,
  close_rate decimal(5,2) NOT NULL DEFAULT 0,
  new_client_revenue decimal(12,2) NOT NULL DEFAULT 0,
  rebuy_revenue decimal(12,2) NOT NULL DEFAULT 0,
  total_revenue decimal(12,2) NOT NULL DEFAULT 0,
  average_deal_size decimal(10,2) NOT NULL DEFAULT 0,
  report_date date NOT NULL DEFAULT CURRENT_DATE,
  date_range_start date NOT NULL DEFAULT CURRENT_DATE,
  date_range_end date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_sales_data_sales_rep ON sales_data(sales_rep);
CREATE INDEX idx_sales_data_report_date ON sales_data(report_date);
CREATE INDEX idx_sales_data_date_range ON sales_data(date_range_start, date_range_end);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE sales_data ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on sales_data" ON sales_data
FOR ALL USING (true) WITH CHECK (true); 