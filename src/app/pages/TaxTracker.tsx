import { useState } from "react";
import { motion } from "motion/react";
import {
  Calculator,
  Download,
  Plus,
  TrendingUp,
  Receipt,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle2,
  Info,
  Building2,
  Wrench,
  CreditCard,
  Home,
  AlertCircle,
} from "lucide-react";

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  hst: number;
  vendor: string;
  property: string;
  receipta?: string;
  deductible: boolean;
}

const expenseCategories = [
  { id: "repairs", label: "Repairs & Maintenance", icon: Wrench, hstRate: 13 },
  { id: "utilities", label: "Utilities", icon: Building2, hstRate: 13 },
  { id: "insurance", label: "Insurance", icon: CheckCircle2, hstRate: 0 }, // Exempt
  { id: "property-tax", label: "Property Tax", icon: Home, hstRate: 0 }, // Exempt
  { id: "professional", label: "Professional Services", icon: FileText, hstRate: 13 },
  { id: "advertising", label: "Advertising", icon: TrendingUp, hstRate: 13 },
  { id: "interest", label: "Mortgage Interest", icon: DollarSign, hstRate: 0 }, // Exempt
  { id: "other", label: "Other", icon: Receipt, hstRate: 13 },
];

export function TaxTracker() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const expenses: Expense[] = [
    {
      id: "1",
      date: "2026-03-10",
      category: "repairs",
      description: "Plumbing repair - Unit 4A",
      amount: 450.00,
      hst: 58.50,
      vendor: "Quick Plumbing Services",
      property: "123 King St - Unit 4A",
      deductible: true,
    },
    {
      id: "2",
      date: "2026-03-08",
      category: "utilities",
      description: "Hydro - Common Areas",
      amount: 280.00,
      hst: 36.40,
      vendor: "Toronto Hydro",
      property: "123 King St",
      deductible: true,
    },
    {
      id: "3",
      date: "2026-03-05",
      category: "insurance",
      description: "Property Insurance - Q1",
      amount: 1200.00,
      hst: 0,
      vendor: "Intact Insurance",
      property: "All Properties",
      deductible: true,
    },
    {
      id: "4",
      date: "2026-03-01",
      category: "professional",
      description: "Accounting services - Annual filing",
      amount: 800.00,
      hst: 104.00,
      vendor: "Smith & Co. CPA",
      property: "All Properties",
      deductible: true,
    },
    {
      id: "5",
      date: "2026-02-28",
      category: "advertising",
      description: "Property listing - Unit 2C",
      amount: 150.00,
      hst: 19.50,
      vendor: "Realtor.ca",
      property: "123 King St - Unit 2C",
      deductible: true,
    },
  ];

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalHST = expenses.reduce((sum, exp) => sum + exp.hst, 0);
  const deductibleExpenses = expenses.filter(e => e.deductible).reduce((sum, exp) => sum + exp.amount, 0);
  const ytdExpenses = expenses.reduce((sum, exp) => sum + exp.amount + exp.hst, 0);

  // Calculate HST breakdown
  const hstByCategory = expenseCategories.map(cat => {
    const catExpenses = expenses.filter(e => e.category === cat.id);
    const total = catExpenses.reduce((sum, e) => sum + e.hst, 0);
    return { category: cat.label, amount: total, icon: cat.icon };
  }).filter(c => c.amount > 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Calculator className="size-8 text-[#0A0A0A]" />
              <h1 className="text-[48px] font-semibold text-[#0A0A0A] leading-tight tracking-tight">
                HST/GST Tracker
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="px-4 py-2 border border-black/[0.08] rounded-lg text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              >
                <option value={2026}>2026</option>
                <option value={2025}>2025</option>
                <option value={2024}>2024</option>
              </select>
              <button
                onClick={() => setShowAddExpense(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] text-white text-[14px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors"
              >
                <Plus className="size-4" />
                Add Expense
              </button>
            </div>
          </div>
          <p className="text-[14px] text-[#9CA3AF] font-normal">
            Track deductible expenses and HST/GST for Canadian tax compliance
          </p>
        </motion.div>

        {/* Tax Year Summary - Canadian Focus */}
        <div className="bg-gradient-to-br from-[#6366F1]/5 to-[#8B5CF6]/5 border border-[#6366F1]/20 rounded-xl p-8 mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-2">
                {selectedYear} Tax Year Summary
              </h3>
              <p className="text-[13px] text-[#6B7280]">
                HST/GST calculations for CRA reporting • Ontario rate: 13%
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-black/[0.04]">
              <CheckCircle2 className="size-5 text-[#22C55E]" />
              <span className="text-[13px] font-medium text-[#0A0A0A]">CRA Compliant</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-black/[0.04]">
              <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
                Total Expenses (Excl. Tax)
              </p>
              <h2 className="text-[32px] font-semibold text-[#0A0A0A] leading-none mb-1">
                ${totalExpenses.toLocaleString()}
              </h2>
              <p className="text-[11px] text-[#6B7280]">Before HST/GST</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-black/[0.04]">
              <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
                HST/GST Paid
              </p>
              <h2 className="text-[32px] font-semibold text-[#6366F1] leading-none mb-1">
                ${totalHST.toLocaleString()}
              </h2>
              <p className="text-[11px] text-[#6B7280]">Input Tax Credits</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-black/[0.04]">
              <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
                Deductible Expenses
              </p>
              <h2 className="text-[32px] font-semibold text-[#22C55E] leading-none mb-1">
                ${deductibleExpenses.toLocaleString()}
              </h2>
              <p className="text-[11px] text-[#6B7280]">CRA Line 8710-9200</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-black/[0.04]">
              <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
                YTD Total
              </p>
              <h2 className="text-[32px] font-semibold text-[#0A0A0A] leading-none mb-1">
                ${ytdExpenses.toLocaleString()}
              </h2>
              <p className="text-[11px] text-[#6B7280]">All expenses incl. tax</p>
            </div>
          </div>
        </div>

        {/* HST Breakdown by Category */}
        <div className="bg-white border border-black/[0.08] rounded-xl p-8 mb-8">
          <h3 className="text-[18px] font-semibold text-[#0A0A0A] mb-6">
            HST/GST Breakdown by Category
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hstByCategory.map((item, idx) => {
              const Icon = item.icon;
              const percentage = ((item.amount / totalHST) * 100).toFixed(0);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white">
                      <Icon className="size-5 text-[#6366F1]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#0A0A0A]">{item.category}</p>
                      <p className="text-[12px] text-[#6B7280]">{percentage}% of total HST</p>
                    </div>
                  </div>
                  <p className="text-[16px] font-semibold text-[#6366F1]">
                    ${item.amount.toFixed(2)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Expense List */}
        <div className="bg-white border border-black/[0.08] rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-black/[0.04] flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-[#0A0A0A]">
              Recent Expenses
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 border border-black/[0.08] text-[#6B7280] text-[13px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors">
              <Download className="size-4" />
              Export for CRA
            </button>
          </div>

          <div className="divide-y divide-black/[0.04]">
            {expenses.map((expense, idx) => {
              const category = expenseCategories.find(c => c.id === expense.category);
              const Icon = category?.icon || Receipt;
              
              return (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-6 py-4 hover:bg-[#F5F5F5] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="size-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                        <Icon className="size-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[15px] font-semibold text-[#0A0A0A] mb-1">
                          {expense.description}
                        </p>
                        <div className="flex items-center gap-4 text-[13px] text-[#9CA3AF]">
                          <span>{expense.vendor}</span>
                          <span>•</span>
                          <span>{expense.property}</span>
                          <span>•</span>
                          <span>{expense.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[16px] font-semibold text-[#0A0A0A]">
                          ${expense.amount.toFixed(2)}
                        </p>
                        <p className="text-[12px] text-[#6366F1]">
                          +${expense.hst.toFixed(2)} HST
                        </p>
                      </div>

                      {expense.deductible && (
                        <div className="px-3 py-1.5 bg-[#22C55E]/10 text-[#22C55E] text-[11px] font-medium rounded-full flex items-center gap-1">
                          <CheckCircle2 className="size-3" />
                          Deductible
                        </div>
                      )}

                      <button className="px-4 py-2 border border-black/[0.08] text-[#6B7280] text-[13px] font-medium rounded-lg hover:bg-white transition-colors">
                        <Receipt className="size-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CRA Tax Tips - Canadian Specific */}
        <div className="bg-gradient-to-br from-[#22C55E]/5 to-[#16A34A]/5 border border-[#22C55E]/20 rounded-xl p-8">
          <div className="flex items-start gap-3 mb-6">
            <Info className="size-6 text-[#22C55E] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-[18px] font-semibold text-[#0A0A0A] mb-2">
                CRA Deductible Expenses for Rental Properties
              </h3>
              <p className="text-[13px] text-[#6B7280] mb-4">
                Common deductions you can claim on your T776 Statement of Real Estate Rentals
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Advertising", line: "8710", desc: "Listing fees, signage, online ads" },
              { label: "Insurance", line: "8710", desc: "Property and liability insurance" },
              { label: "Interest & Bank Charges", line: "8710", desc: "Mortgage interest, loan fees" },
              { label: "Office Expenses", line: "8810", desc: "Supplies, software subscriptions" },
              { label: "Professional Fees", line: "8860", desc: "Legal, accounting, property management" },
              { label: "Management & Admin", line: "8871", desc: "Property management fees" },
              { label: "Repairs & Maintenance", line: "9200", desc: "Plumbing, electrical, cleaning" },
              { label: "Property Taxes", line: "9180", desc: "Municipal property tax" },
            ].map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-white rounded-lg border border-black/[0.04]"
              >
                <CheckCircle2 className="size-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[14px] font-semibold text-[#0A0A0A]">{tip.label}</p>
                    <span className="px-2 py-0.5 bg-[#6366F1]/10 text-[#6366F1] text-[10px] font-medium rounded">
                      Line {tip.line}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#6B7280]">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-[24px] font-semibold text-[#0A0A0A] mb-2">
                      Add New Expense
                    </h2>
                    <p className="text-[14px] text-[#6B7280]">
                      Track expenses for tax deductions and HST/GST credits
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddExpense(false)}
                    className="text-[#6B7280] hover:text-[#0A0A0A]"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                        Category
                      </label>
                      <select className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]">
                        <option value="">Select category...</option>
                        {expenseCategories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.label} ({cat.hstRate > 0 ? `${cat.hstRate}% HST` : 'HST Exempt'})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                      placeholder="e.g., Plumbing repair - Unit 4A"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                        Amount (before tax)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                        HST/GST Amount
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] bg-[#F5F5F5]"
                        placeholder="Auto-calculated"
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                      Vendor
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                      placeholder="e.g., Quick Plumbing Services"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                      Property
                    </label>
                    <select className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]">
                      <option value="">Select property...</option>
                      <option value="prop1">123 King St - Unit 4A</option>
                      <option value="prop2">123 King St - Unit 2C</option>
                      <option value="all">All Properties</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-lg">
                    <input
                      type="checkbox"
                      id="deductible"
                      className="size-5 rounded border-black/[0.08]"
                      defaultChecked
                    />
                    <label htmlFor="deductible" className="text-[14px] text-[#0A0A0A]">
                      This expense is tax deductible (CRA eligible)
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setShowAddExpense(false)}
                    className="flex-1 px-6 py-3 border border-black/[0.08] text-[#6B7280] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-6 py-3 bg-[#0A0A0A] text-white text-[14px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors">
                    Add Expense
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
