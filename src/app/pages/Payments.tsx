import { DollarSign, Download, TrendingUp, Users, Calendar } from "lucide-react";
import { PaymentCalendar } from "../components/PaymentCalendar";

export function Payments() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Financial Operations</p>
          <h1 className="text-[48px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>Payment Dashboard</h1>
          <p className="mt-2 text-[14px] text-[#767570]">Track and manage all your rental payments</p>
        </div>

        <PaymentCalendar />
      </div>
    </div>
  );
}