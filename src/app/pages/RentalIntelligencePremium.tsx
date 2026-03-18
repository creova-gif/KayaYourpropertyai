import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
  Building2,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  LineChart,
  PieChart,
  Target,
  Zap,
  Brain,
} from "lucide-react";

interface MarketData {
  neighborhood: string;
  averageRent: number;
  rentChange: number;
  vacancyRate: number;
  demandScore: number;
  daysToLease: number;
  topAmenities: string[];
}

interface VacancyPrediction {
  unit: string;
  address: string;
  currentTenant: string;
  leaseEndDate: string;
  vacancyRisk: "low" | "medium" | "high";
  predictedVacantDays: number;
  suggestedAction: string;
}

interface PricingInsight {
  property: string;
  currentRent: number;
  marketRent: number;
  difference: number;
  percentDiff: number;
  recommendation: string;
}

export function RentalIntelligencePremium() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("Downtown Toronto");

  // Market Data
  const marketData: MarketData[] = [
    {
      neighborhood: "Downtown Toronto",
      averageRent: 2450,
      rentChange: 8.5,
      vacancyRate: 2.3,
      demandScore: 92,
      daysToLease: 12,
      topAmenities: ["Gym", "Parking", "In-suite Laundry"],
    },
    {
      neighborhood: "North York",
      averageRent: 2100,
      rentChange: 6.2,
      vacancyRate: 3.8,
      demandScore: 85,
      daysToLease: 18,
      topAmenities: ["Parking", "Balcony", "Pet-friendly"],
    },
    {
      neighborhood: "Etobicoke",
      averageRent: 1950,
      rentChange: 5.1,
      vacancyRate: 4.2,
      demandScore: 78,
      daysToLease: 22,
      topAmenities: ["Parking", "Storage", "Utilities Included"],
    },
    {
      neighborhood: "Scarborough",
      averageRent: 1750,
      rentChange: 7.3,
      vacancyRate: 5.1,
      demandScore: 72,
      daysToLease: 28,
      topAmenities: ["Parking", "Transit Access", "Affordable"],
    },
  ];

  // Vacancy Predictions
  const vacancyPredictions: VacancyPrediction[] = [
    {
      unit: "Unit 4A",
      address: "123 King St",
      currentTenant: "Sarah Kim",
      leaseEndDate: "2026-06-30",
      vacancyRisk: "low",
      predictedVacantDays: 8,
      suggestedAction: "Tenant likely to renew. Consider 3% increase.",
    },
    {
      unit: "Unit 2B",
      address: "456 Queen St",
      currentTenant: "Michael Patel",
      leaseEndDate: "2026-05-31",
      vacancyRisk: "medium",
      predictedVacantDays: 21,
      suggestedAction: "Contact tenant 90 days before lease end. Market rent +5%.",
    },
    {
      unit: "Unit 1C",
      address: "789 Bloor St",
      currentTenant: "Jason Lee",
      leaseEndDate: "2026-04-30",
      vacancyRisk: "high",
      predictedVacantDays: 45,
      suggestedAction: "Start pre-listing now. Budget for turnover costs.",
    },
  ];

  // Pricing Insights
  const pricingInsights: PricingInsight[] = [
    {
      property: "123 King St - Unit 4A",
      currentRent: 2300,
      marketRent: 2450,
      difference: 150,
      percentDiff: 6.5,
      recommendation: "Under market. Suggest +$150 at renewal.",
    },
    {
      property: "456 Queen St - Unit 2B",
      currentRent: 2100,
      marketRent: 2050,
      difference: -50,
      percentDiff: -2.4,
      recommendation: "Above market. Maintain current rate.",
    },
    {
      property: "789 Bloor St - Unit 1C",
      currentRent: 1950,
      marketRent: 2200,
      difference: 250,
      percentDiff: 12.8,
      recommendation: "Significantly under market. Increase +$200.",
    },
  ];

  // Tenant Demand Trends (Last 6 months)
  const demandTrends = [
    { month: "Oct", applications: 42, viewings: 125 },
    { month: "Nov", applications: 38, viewings: 110 },
    { month: "Dec", applications: 28, viewings: 85 },
    { month: "Jan", applications: 45, viewings: 140 },
    { month: "Feb", applications: 52, viewings: 165 },
    { month: "Mar", applications: 61, viewings: 185 },
  ];

  // Key Metrics
  const metrics = {
    portfolioValue: 2450000,
    monthlyRevenue: 24300,
    averageRent: 2025,
    totalUnits: 12,
    occupancyRate: 91.7,
    yoyGrowth: 7.8,
  };

  const selectedMarket = marketData.find(m => m.neighborhood === selectedNeighborhood) || marketData[0];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Brain className="size-8 text-[#0A7A52]" />
            <h1 className="text-[48px] font-normal text-[#0E0F0C] leading-tight tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>
              Rental Intelligence
            </h1>
          </div>
          <p className="text-[14px] text-[#767570] font-normal">
            AI-powered market insights • Real rent trends • Vacancy prediction
          </p>
        </motion.div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 lg:col-span-2"
          >
            <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-2">
              Portfolio Value
            </p>
            <h2 className="text-[36px] font-normal text-[#0E0F0C] leading-none mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              ${(metrics.portfolioValue / 1000000).toFixed(2)}M
            </h2>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-[#0A7A52]" />
              <span className="text-[13px] text-[#0A7A52]">+{metrics.yoyGrowth}% YoY</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 lg:col-span-2"
          >
            <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-2">
              Monthly Revenue
            </p>
            <h2 className="text-[36px] font-normal text-[#0E0F0C] leading-none mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              ${metrics.monthlyRevenue.toLocaleString()}
            </h2>
            <p className="text-[13px] text-[#767570]">{metrics.totalUnits} units</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 lg:col-span-2"
          >
            <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-2">
              Occupancy Rate
            </p>
            <h2 className="text-[36px] font-normal text-[#0A7A52] leading-none mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              {metrics.occupancyRate}%
            </h2>
            <p className="text-[13px] text-[#767570]">{Math.round(metrics.totalUnits * metrics.occupancyRate / 100)} of {metrics.totalUnits} occupied</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Market Insights - Large Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Market Comparison */}
            <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[28px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Market Comparison
                </h2>
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="px-4 py-2 border border-[rgba(0,0,0,0.07)] rounded-lg text-[14px] text-[#0E0F0C] focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 bg-white"
                >
                  {marketData.map(market => (
                    <option key={market.neighborhood} value={market.neighborhood}>
                      {market.neighborhood}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-[#F8F7F4] rounded-xl border border-[rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="size-5 text-[#767570]" />
                    <p className="text-[11px] text-[#767570] uppercase tracking-wider">Average Rent</p>
                  </div>
                  <p className="text-[36px] font-normal text-[#0E0F0C] mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    ${selectedMarket.averageRent}
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-[#0A7A52]" />
                    <span className="text-[13px] text-[#0A7A52]">+{selectedMarket.rentChange}% vs last year</span>
                  </div>
                </div>

                <div className="p-6 bg-[#F8F7F4] rounded-xl border border-[rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="size-5 text-[#767570]" />
                    <p className="text-[11px] text-[#767570] uppercase tracking-wider">Vacancy Rate</p>
                  </div>
                  <p className="text-[36px] font-normal text-[#0E0F0C] mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    {selectedMarket.vacancyRate}%
                  </p>
                  <p className="text-[13px] text-[#767570]">
                    {selectedMarket.vacancyRate < 3 ? 'Very tight market' : selectedMarket.vacancyRate < 5 ? 'Healthy market' : 'Tenant market'}
                  </p>
                </div>

                <div className="p-6 bg-[#F8F7F4] rounded-xl border border-[rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="size-5 text-[#767570]" />
                    <p className="text-[11px] text-[#767570] uppercase tracking-wider">Demand Score</p>
                  </div>
                  <p className="text-[36px] font-normal text-[#0E0F0C] mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    {selectedMarket.demandScore}
                  </p>
                  <p className="text-[13px] text-[#767570]">
                    {selectedMarket.demandScore >= 85 ? 'Very High' : selectedMarket.demandScore >= 70 ? 'High' : 'Moderate'} demand
                  </p>
                </div>

                <div className="p-6 bg-[#F8F7F4] rounded-xl border border-[rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="size-5 text-[#767570]" />
                    <p className="text-[11px] text-[#767570] uppercase tracking-wider">Avg Days to Lease</p>
                  </div>
                  <p className="text-[36px] font-normal text-[#0E0F0C] mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    {selectedMarket.daysToLease}
                  </p>
                  <p className="text-[13px] text-[#767570]">
                    {selectedMarket.daysToLease < 15 ? 'Fast' : selectedMarket.daysToLease < 25 ? 'Average' : 'Slow'} turnover
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-[#F8F7F4] to-white rounded-xl border border-[rgba(0,0,0,0.04)]">
                <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-3">Top In-Demand Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMarket.topAmenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white border border-[rgba(0,0,0,0.07)] rounded-full text-[13px] font-medium text-[#0E0F0C]"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Insights */}
            <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-8">
              <h2 className="text-[28px] font-normal text-[#0E0F0C] tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                AI Pricing Insights
              </h2>

              <div className="space-y-4">
                {pricingInsights.map((insight, idx) => (
                  <div key={idx} className="p-6 bg-[#F8F7F4] rounded-xl border border-[rgba(0,0,0,0.04)]">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-[16px] text-[#0E0F0C] mb-1">
                          {insight.property}
                        </h3>
                        <p className="text-[13px] text-[#767570]">{insight.recommendation}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                        insight.difference > 0 ? 'bg-[#F59E0B]/10 border border-[#F59E0B]/20' : 'bg-[#E5F4EE] border border-[#0A7A52]/20'
                      }`}>
                        {insight.difference > 0 ? (
                          <TrendingUp className="size-4 text-[#F59E0B]" />
                        ) : (
                          <TrendingDown className="size-4 text-[#0A7A52]" />
                        )}
                        <span className={`text-[12px] font-semibold ${
                          insight.difference > 0 ? 'text-[#F59E0B]' : 'text-[#0A7A52]'
                        }`}>
                          {insight.difference > 0 ? '+' : ''}{insight.percentDiff.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-1">Current Rent</p>
                        <p className="text-[20px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>${insight.currentRent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-1">Market Rent</p>
                        <p className="text-[20px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>${insight.marketRent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-1">Potential Gain</p>
                        <p className={`text-[20px] font-normal ${
                          insight.difference > 0 ? 'text-[#F59E0B]' : 'text-[#0A7A52]'
                        }`} style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                          {insight.difference > 0 ? '+' : ''}${Math.abs(insight.difference).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#E5F4EE] border border-[#0A7A52]/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Zap className="size-5 text-[#0A7A52] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[14px] text-[#0E0F0C] mb-1">Optimization Opportunity</p>
                    <p className="text-[13px] text-[#767570] leading-relaxed">
                      By adjusting rents to market rates, you could increase annual revenue by <span className="font-semibold text-[#0A7A52]">$4,800</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demand Trends */}
            <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-8">
              <h2 className="text-[28px] font-normal text-[#0E0F0C] tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Tenant Demand Trends
              </h2>

              <div className="space-y-6">
                {demandTrends.map((trend, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px] font-medium text-[#0E0F0C]">{trend.month} 2026</span>
                      <span className="text-[13px] text-[#767570]">{trend.applications} applications</span>
                    </div>
                    <div className="relative h-8 bg-[#F8F7F4] rounded-full overflow-hidden border border-[rgba(0,0,0,0.04)]">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0A7A52] to-[#0A7A52]/80 rounded-full"
                        style={{ width: `${(trend.applications / 70) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2">
                <TrendingUp className="size-5 text-[#0A7A52]" />
                <p className="text-[14px] text-[#767570]">
                  Applications increased <span className="font-semibold text-[#0A7A52]">45%</span> in the last 6 months
                </p>
              </div>
            </div>
          </div>

          {/* Vacancy Predictions - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 sticky top-24">
              <h2 className="text-[22px] font-normal text-[#0E0F0C] tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Vacancy Predictions
              </h2>

              <div className="space-y-4">
                {vacancyPredictions.map((prediction, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      prediction.vacancyRisk === 'low' ? 'bg-[#E5F4EE] border-[#0A7A52]/20' :
                      prediction.vacancyRisk === 'medium' ? 'bg-[#FEF3E2] border-[#F59E0B]/20' :
                      'bg-[#FEF2F2] border-[#EF4444]/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-[14px] text-[#0E0F0C]">{prediction.unit}</h3>
                        <p className="text-[12px] text-[#767570]">{prediction.address}</p>
                      </div>
                      {prediction.vacancyRisk === 'low' && <CheckCircle2 className="size-5 text-[#0A7A52]" />}
                      {prediction.vacancyRisk === 'medium' && <AlertTriangle className="size-5 text-[#F59E0B]" />}
                      {prediction.vacancyRisk === 'high' && <AlertTriangle className="size-5 text-[#EF4444]" />}
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#767570]">Lease Ends</span>
                        <span className="font-medium text-[#0E0F0C]">
                          {new Date(prediction.leaseEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#767570]">Vacancy Risk</span>
                        <span className={`font-medium capitalize ${
                          prediction.vacancyRisk === 'low' ? 'text-[#0A7A52]' :
                          prediction.vacancyRisk === 'medium' ? 'text-[#F59E0B]' :
                          'text-[#EF4444]'
                        }`}>
                          {prediction.vacancyRisk}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#767570]">Predicted Vacant</span>
                        <span className="font-medium text-[#0E0F0C]">{prediction.predictedVacantDays} days</span>
                      </div>
                    </div>

                    <p className="text-[12px] text-[#767570] leading-relaxed italic">
                      {prediction.suggestedAction}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.04)]">
                <div className="flex items-start gap-3 p-4 bg-[#F8F7F4] rounded-lg border border-[rgba(0,0,0,0.04)]">
                  <Brain className="size-5 text-[#0A7A52] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[13px] text-[#0E0F0C] mb-1">AI Prediction</p>
                    <p className="text-[12px] text-[#767570] leading-relaxed">
                      Based on historical data, tenant behavior, and market conditions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Markets Comparison */}
        <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-8">
          <h2 className="text-[28px] font-normal text-[#0E0F0C] tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Toronto Metro Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.07)]">
                  <th className="text-left py-4 px-4 text-[11px] text-[#767570] uppercase tracking-wider font-semibold">Neighborhood</th>
                  <th className="text-right py-4 px-4 text-[11px] text-[#767570] uppercase tracking-wider font-semibold">Avg Rent</th>
                  <th className="text-right py-4 px-4 text-[11px] text-[#767570] uppercase tracking-wider font-semibold">YoY Change</th>
                  <th className="text-right py-4 px-4 text-[11px] text-[#767570] uppercase tracking-wider font-semibold">Vacancy</th>
                  <th className="text-right py-4 px-4 text-[11px] text-[#767570] uppercase tracking-wider font-semibold">Demand</th>
                  <th className="text-right py-4 px-4 text-[11px] text-[#767570] uppercase tracking-wider font-semibold">Days to Lease</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((market, idx) => (
                  <tr key={idx} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F8F7F4] transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-[#767570]" />
                        <span className="font-medium text-[14px] text-[#0E0F0C]">{market.neighborhood}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-[14px] text-[#0E0F0C]">
                      ${market.averageRent}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <TrendingUp className="size-4 text-[#0A7A52]" />
                        <span className="font-medium text-[14px] text-[#0A7A52]">+{market.rentChange}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-[14px] text-[#0E0F0C]">
                      {market.vacancyRate}%
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-semibold text-[14px] ${
                        market.demandScore >= 85 ? 'text-[#0A7A52]' :
                        market.demandScore >= 70 ? 'text-[#F59E0B]' :
                        'text-[#767570]'
                      }`}>
                        {market.demandScore}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-[14px] text-[#0E0F0C]">
                      {market.daysToLease} days
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}