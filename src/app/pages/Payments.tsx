import { DollarSign, Download, TrendingUp, Users, Calendar } from "lucide-react";
import { PaymentCalendar } from "../components/PaymentCalendar";

export function Payments() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Payments & Revenue</h1>
          <p className="mt-2 text-slate-600">Track rent collection with AI-powered predictions</p>
        </div>

        <PaymentCalendar />
      </div>
    </div>
  );
}