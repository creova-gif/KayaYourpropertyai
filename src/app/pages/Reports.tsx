import { useState } from "react";
import { Download, FileText, Calendar, TrendingUp, DollarSign, Home, Users, Wrench, Filter, ChevronDown, Printer, Mail, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Report {
  id: string;
  name: string;
  description: string;
  category: 'financial' | 'occupancy' | 'maintenance' | 'compliance' | 'tenant';
  frequency: 'monthly' | 'quarterly' | 'annual' | 'custom';
  lastGenerated?: string;
  icon: any;
}

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const availableReports: Report[] = [
    {
      id: '1',
      name: 'Income Statement',
      description: 'Comprehensive revenue and expense breakdown',
      category: 'financial',
      frequency: 'monthly',
      lastGenerated: '2026-03-01',
      icon: DollarSign,
    },
    {
      id: '2',
      name: 'Occupancy Report',
      description: 'Current occupancy rates and vacancy trends',
      category: 'occupancy',
      frequency: 'monthly',
      lastGenerated: '2026-03-01',
      icon: Home,
    },
    {
      id: '3',
      name: 'Maintenance Summary',
      description: 'All maintenance requests, costs, and completion rates',
      category: 'maintenance',
      frequency: 'monthly',
      lastGenerated: '2026-02-28',
      icon: Wrench,
    },
    {
      id: '4',
      name: 'Tenant Turnover Analysis',
      description: 'Tenant retention, move-ins, and move-outs',
      category: 'tenant',
      frequency: 'quarterly',
      lastGenerated: '2026-01-01',
      icon: Users,
    },
    {
      id: '5',
      name: 'LTB Compliance Report',
      description: 'Track all LTB forms, notices, and compliance status',
      category: 'compliance',
      frequency: 'quarterly',
      icon: FileText,
    },
    {
      id: '6',
      name: 'Cash Flow Statement',
      description: 'Detailed cash inflows and outflows',
      category: 'financial',
      frequency: 'monthly',
      lastGenerated: '2026-03-01',
      icon: TrendingUp,
    },
    {
      id: '7',
      name: 'Rent Roll Report',
      description: 'Complete listing of all units, rents, and lease terms',
      category: 'financial',
      frequency: 'monthly',
      lastGenerated: '2026-03-01',
      icon: FileText,
    },
    {
      id: '8',
      name: 'Property Performance Dashboard',
      description: 'KPIs and metrics for each property',
      category: 'occupancy',
      frequency: 'monthly',
      lastGenerated: '2026-03-01',
      icon: Home,
    },
  ];

  const filteredReports = selectedCategory === 'all' 
    ? availableReports 
    : availableReports.filter(r => r.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'financial': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'occupancy': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'maintenance': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'compliance': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'tenant': return 'bg-pink-50 text-pink-700 border-pink-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Sample financial summary data
  const financialSummary = {
    totalRevenue: 124500,
    totalExpenses: 48200,
    netIncome: 76300,
    revenueChange: 8.4,
    expenseChange: -3.2,
    netIncomeChange: 12.1,
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.08)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 
                className="text-3xl text-[#0E0F0C] mb-2"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Reports & Analytics
              </h1>
              <p className="text-[#767570] text-sm">
                Generate comprehensive reports for your portfolio
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#767570] bg-white hover:bg-[#F8F7F4] border border-[rgba(0,0,0,0.08)] transition-colors">
                <Printer className="size-4" />
                Print All
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-[#0A7A52] hover:bg-[#085D3D] transition-colors shadow-lg shadow-[#0A7A52]/20">
                <Download className="size-4" />
                Export Reports
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#0A7A52] text-white shadow-lg shadow-[#0A7A52]/20'
                  : 'bg-white text-[#767570] hover:bg-[#F8F7F4] border border-[rgba(0,0,0,0.08)]'
              }`}
            >
              All Reports
            </button>
            <button
              onClick={() => setSelectedCategory('financial')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === 'financial'
                  ? 'bg-[#0A7A52] text-white shadow-lg shadow-[#0A7A52]/20'
                  : 'bg-white text-[#767570] hover:bg-[#F8F7F4] border border-[rgba(0,0,0,0.08)]'
              }`}
            >
              Financial
            </button>
            <button
              onClick={() => setSelectedCategory('occupancy')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === 'occupancy'
                  ? 'bg-[#0A7A52] text-white shadow-lg shadow-[#0A7A52]/20'
                  : 'bg-white text-[#767570] hover:bg-[#F8F7F4] border border-[rgba(0,0,0,0.08)]'
              }`}
            >
              Occupancy
            </button>
            <button
              onClick={() => setSelectedCategory('maintenance')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === 'maintenance'
                  ? 'bg-[#0A7A52] text-white shadow-lg shadow-[#0A7A52]/20'
                  : 'bg-white text-[#767570] hover:bg-[#F8F7F4] border border-[rgba(0,0,0,0.08)]'
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setSelectedCategory('compliance')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === 'compliance'
                  ? 'bg-[#0A7A52] text-white shadow-lg shadow-[#0A7A52]/20'
                  : 'bg-white text-[#767570] hover:bg-[#F8F7F4] border border-[rgba(0,0,0,0.08)]'
              }`}
            >
              Compliance
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Financial Summary Cards */}
        {(selectedCategory === 'all' || selectedCategory === 'financial') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#767570]">Total Revenue</span>
                <div className={`flex items-center gap-1 text-xs font-semibold ${
                  financialSummary.revenueChange >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {financialSummary.revenueChange >= 0 ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  {Math.abs(financialSummary.revenueChange)}%
                </div>
              </div>
              <div className="text-3xl font-bold text-[#0E0F0C] mb-1">
                ${financialSummary.totalRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-[#767570]">vs. last period</div>
            </div>

            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#767570]">Total Expenses</span>
                <div className={`flex items-center gap-1 text-xs font-semibold ${
                  financialSummary.expenseChange <= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {financialSummary.expenseChange >= 0 ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  {Math.abs(financialSummary.expenseChange)}%
                </div>
              </div>
              <div className="text-3xl font-bold text-[#0E0F0C] mb-1">
                ${financialSummary.totalExpenses.toLocaleString()}
              </div>
              <div className="text-xs text-[#767570]">vs. last period</div>
            </div>

            <div className="bg-gradient-to-br from-[#0A7A52] to-[#085D3D] rounded-2xl border border-[#0A7A52]/20 p-6 text-white shadow-lg shadow-[#0A7A52]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/80">Net Income</span>
                <div className="flex items-center gap-1 text-xs font-semibold text-white">
                  <ArrowUpRight className="size-3" />
                  {financialSummary.netIncomeChange}%
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">
                ${financialSummary.netIncome.toLocaleString()}
              </div>
              <div className="text-xs text-white/70">vs. last period</div>
            </div>
          </div>
        )}

        {/* Available Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.id}
                className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] p-6 hover:border-[#0A7A52]/30 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="p-3 rounded-xl bg-[#E5F4EE] group-hover:bg-[#0A7A52] transition-colors">
                    <Icon className="size-6 text-[#0A7A52] group-hover:text-white transition-colors" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[#0E0F0C] text-lg">
                        {report.name}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg border ${
                        getCategoryColor(report.category)
                      }`}>
                        {report.category}
                      </span>
                    </div>

                    <p className="text-sm text-[#767570] mb-4">
                      {report.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-[#767570]">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {report.frequency}
                        </div>
                        {report.lastGenerated && (
                          <div>
                            Last: {new Date(report.lastGenerated).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-[#F8F7F4] transition-colors text-[#767570]">
                          <Mail className="size-4" />
                        </button>
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#0A7A52] hover:bg-[#085D3D] transition-colors">
                          <Download className="size-4" />
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scheduled Reports */}
        <div className="mt-8 bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] p-6">
          <h2 
            className="text-xl text-[#0E0F0C] mb-4"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Scheduled Reports
          </h2>
          <p className="text-sm text-[#767570] mb-6">
            Automatically receive reports via email on a regular schedule
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[rgba(0,0,0,0.08)] bg-[#F8F7F4]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[#0E0F0C] text-sm mb-1">
                    Monthly Financial Summary
                  </h3>
                  <p className="text-xs text-[#767570]">
                    Sent on the 1st of each month
                  </p>
                </div>
                <button className="text-xs font-medium text-[#0A7A52] hover:text-[#085D3D]">
                  Edit
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-[rgba(0,0,0,0.08)] bg-[#F8F7F4] flex items-center justify-center">
              <button className="text-sm font-medium text-[#0A7A52] hover:text-[#085D3D]">
                + Schedule New Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
