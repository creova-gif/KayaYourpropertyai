import { motion } from "motion/react";
import { Calendar, DollarSign, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface Payment {
  id: string;
  tenant: string;
  unit: string;
  amount: number;
  dueDate: string;
  status: "paid" | "due-soon" | "overdue" | "upcoming";
  paidDate?: string;
}

export function PaymentCalendar() {
  const payments: Payment[] = [
    { id: "1", tenant: "Sarah Kim", unit: "4A", amount: 2300, dueDate: "2026-03-01", status: "paid", paidDate: "2026-03-01" },
    { id: "2", tenant: "Michael Patel", unit: "2B", amount: 1950, dueDate: "2026-03-01", status: "paid", paidDate: "2026-02-28" },
    { id: "3", tenant: "Emma Rodriguez", unit: "5A", amount: 2400, dueDate: "2026-03-01", status: "paid", paidDate: "2026-03-01" },
    { id: "4", tenant: "David Chen", unit: "3C", amount: 2100, dueDate: "2026-03-15", status: "due-soon" },
    { id: "5", tenant: "Lisa Park", unit: "1B", amount: 2250, dueDate: "2026-03-20", status: "overdue" },
    { id: "6", tenant: "John Smith", unit: "2A", amount: 2000, dueDate: "2026-04-01", status: "upcoming" },
    { id: "7", tenant: "Anna Wilson", unit: "6B", amount: 2350, dueDate: "2026-04-01", status: "upcoming" },
  ];

  const statusConfig = {
    paid: {
      icon: CheckCircle2,
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      label: "Paid"
    },
    "due-soon": {
      icon: Clock,
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      label: "Due Soon"
    },
    overdue: {
      icon: AlertTriangle,
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      label: "Overdue"
    },
    upcoming: {
      icon: Calendar,
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      label: "Upcoming"
    }
  };

  const groupedPayments = {
    paid: payments.filter(p => p.status === "paid"),
    "due-soon": payments.filter(p => p.status === "due-soon"),
    overdue: payments.filter(p => p.status === "overdue"),
    upcoming: payments.filter(p => p.status === "upcoming")
  };

  const totalPaid = groupedPayments.paid.reduce((sum, p) => sum + p.amount, 0);
  const totalDue = [...groupedPayments["due-soon"], ...groupedPayments.overdue].reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="size-6" />
            <span className="text-sm text-white/80">Collected</span>
          </div>
          <p className="text-3xl font-bold text-[#ffffff]">${totalPaid.toLocaleString()}</p>
          <p className="text-sm text-white/80 mt-1">{groupedPayments.paid.length} payments</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="size-6" />
            <span className="text-sm text-white/80">Outstanding</span>
          </div>
          <p className="text-3xl font-bold text-[#ffffff]">${totalDue.toLocaleString()}</p>
          <p className="text-sm text-white/80 mt-1">
            {groupedPayments["due-soon"].length + groupedPayments.overdue.length} payments
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="size-6" />
            <span className="text-sm text-white/80">Next Month</span>
          </div>
          <p className="text-3xl font-bold text-[#ffffff]">
            ${groupedPayments.upcoming.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
          </p>
          <p className="text-sm text-white/80 mt-1">{groupedPayments.upcoming.length} payments expected</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Payment Timeline</h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

          <div className="space-y-6">
            {Object.entries(groupedPayments).map(([status, items]) => {
              if (items.length === 0) return null;
              
              const config = statusConfig[status as keyof typeof statusConfig];
              const Icon = config.icon;

              return (
                <div key={status}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`relative z-10 p-2 rounded-full ${config.bg} border-2 ${config.border}`}>
                      <Icon className={`size-5 ${config.text}`} />
                    </div>
                    <h4 className="font-semibold text-slate-900">{config.label}</h4>
                  </div>

                  <div className="ml-16 space-y-3">
                    {items.map((payment, idx) => (
                      <motion.div
                        key={payment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className={`p-4 rounded-lg border-2 ${config.border} ${config.bg} cursor-pointer`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-semibold text-slate-900">{payment.tenant}</p>
                              <p className="text-sm text-slate-600">Unit {payment.unit}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900 text-lg">
                              ${payment.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-slate-500">
                              {payment.paidDate ? `Paid ${payment.paidDate}` : `Due ${payment.dueDate}`}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Predictive Alert */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100">
            <AlertTriangle className="size-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900 mb-2">⚠️ AI Payment Prediction</h3>
            <p className="text-sm text-amber-800 mb-3">
              Based on historical data, there's a 78% probability that Lisa Park (Unit 1B) will pay late this month. 
              Consider sending a friendly reminder 3 days before the due date.
            </p>
            <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-colors">
              Send Auto-Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
