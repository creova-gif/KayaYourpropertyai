import { DollarSign, Download, Calendar, CheckCircle2, CreditCard, Clock } from "lucide-react";

export function TenantPayments() {
  const upcomingPayment = {
    amount: 2300,
    dueDate: "Apr 1, 2026",
    daysUntil: 18,
    autoPayEnabled: true
  };

  const paymentHistory = [
    { id: 1, date: "Mar 1, 2026", amount: 2300, status: "paid", method: "Auto-pay", receipt: true },
    { id: 2, date: "Feb 1, 2026", amount: 2300, status: "paid", method: "Auto-pay", receipt: true },
    { id: 3, date: "Jan 1, 2026", amount: 2300, status: "paid", method: "Auto-pay", receipt: true },
    { id: 4, date: "Dec 1, 2025", amount: 2300, status: "paid", method: "Manual", receipt: true },
    { id: 5, date: "Nov 1, 2025", amount: 2300, status: "paid", method: "Auto-pay", receipt: true },
  ];

  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Payments</h1>
          <p className="mt-2 text-slate-600">Manage rent payments and view transaction history</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-50">
                <DollarSign className="size-5 text-indigo-600" />
              </div>
              <span className="text-sm text-slate-600">Next Payment</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">${upcomingPayment.amount.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">Due in {upcomingPayment.daysUntil} days</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-green-50">
                <CheckCircle2 className="size-5 text-green-600" />
              </div>
              <span className="text-sm text-slate-600">Total Paid</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">${totalPaid.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">All payments current</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <CreditCard className="size-5 text-purple-600" />
              </div>
              <span className="text-sm text-slate-600">Auto-Pay</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {upcomingPayment.autoPayEnabled ? "Enabled" : "Disabled"}
            </p>
            <p className="text-xs text-purple-600 mt-1">Active</p>
          </div>
        </div>

        {/* Next Payment */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Upcoming Payment</h2>
              <p className="text-white/80 text-sm">Your next rent payment is scheduled</p>
            </div>
            <Calendar className="size-12 opacity-50" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-white/70 text-sm mb-1">Amount Due</p>
              <p className="text-4xl font-bold">${upcomingPayment.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Due Date</p>
              <p className="text-2xl font-semibold">{upcomingPayment.dueDate}</p>
              <p className="text-white/80 text-sm mt-1">{upcomingPayment.daysUntil} days remaining</p>
            </div>
          </div>
          {upcomingPayment.autoPayEnabled ? (
            <div className="flex items-center gap-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="size-5" />
              <span className="text-sm">Auto-pay is enabled. Payment will be processed automatically on the due date.</span>
            </div>
          ) : (
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-white/90 transition-colors">
              Pay Now
            </button>
          )}
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment Methods</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-indigo-200 bg-indigo-50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white">
                  <CreditCard className="size-6 text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">•••• •••• •••• 4242</p>
                  <p className="text-sm text-slate-600">Expires 12/27</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">Primary</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Auto-pay</span>
              </div>
            </div>
          </div>
          <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            + Add Payment Method
          </button>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Payment History</h2>
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">${payment.amount.toLocaleString()}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="size-3" />
                      <span>{payment.date}</span>
                      <span>•</span>
                      <span>{payment.method}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Paid
                  </span>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Download className="size-4 text-slate-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Payment Insights */}
        <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-green-100">
              <CheckCircle2 className="size-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Excellent Payment Record! 🎉</h3>
              <p className="text-sm text-green-800">
                You've made all {paymentHistory.length} payments on time. Keep it up! This helps build a strong rental history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
