import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Home,
  Wrench,
  Users,
  ChevronRight,
  Upload,
  Zap,
  Target,
  TrendingDown,
} from "lucide-react";
import { motion } from "motion/react";

export function AIPropertyAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  const properties = [
    { id: "1", name: "123 King Street", units: 2, revenue: 4700 },
    { id: "2", name: "456 Queen Street West", units: 3, revenue: 6950 },
    { id: "3", name: "789 Bloor Street", units: 2, revenue: 6400 },
  ];

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const analysisResults = {
    overallScore: 88,
    profitability: 92,
    occupancyRisk: 15,
    marketPosition: 85,
    maintenanceEfficiency: 78,
    insights: [
      {
        type: "opportunity",
        title: "Rent Optimization Opportunity",
        description: "Market analysis shows you can increase rent by $150/month",
        impact: "+$1,800/year",
        priority: "high",
        action: "Increase rent on next renewal",
      },
      {
        type: "warning",
        title: "Kitchen Renovation ROI",
        description: "Kitchen upgrades could increase property value by 12%",
        impact: "+$18,000 value",
        priority: "medium",
        action: "Schedule renovation assessment",
      },
      {
        type: "risk",
        title: "Vacancy Risk Assessment",
        description: "Low risk of vacancy based on location and pricing",
        impact: "3% risk",
        priority: "low",
        action: "Maintain current strategy",
      },
      {
        type: "success",
        title: "Strong Tenant Quality",
        description: "Current tenants have excellent payment history",
        impact: "98% on-time rate",
        priority: "low",
        action: "Continue screening process",
      },
    ],
    metrics: [
      { label: "Profitability Score", value: 92, max: 100, color: "green" },
      { label: "Market Position", value: 85, max: 100, color: "indigo" },
      { label: "Maintenance Efficiency", value: 78, max: 100, color: "blue" },
      { label: "Vacancy Risk", value: 15, max: 100, color: "amber", inverse: true },
    ],
    recommendations: [
      {
        title: "Immediate Actions",
        items: [
          "Increase rent by $150 on Unit 4A renewal (March 2026)",
          "Schedule kitchen renovation quote for Unit 5A",
          "Update listing photos to reflect recent improvements",
        ],
      },
      {
        title: "3-Month Priorities",
        items: [
          "Install smart thermostats for energy savings",
          "Implement preventive HVAC maintenance plan",
          "Refresh common area paint and lighting",
        ],
      },
      {
        title: "Long-Term Strategy",
        items: [
          "Plan bathroom renovations for 2027",
          "Consider adding in-suite laundry",
          "Explore property expansion opportunities",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-4">
            <Sparkles className="size-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-900">AI-POWERED ANALYSIS</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Property Intelligence Analyzer
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get instant AI-powered insights on profitability, risk, and optimization opportunities
          </p>
        </motion.div>

        {!showResults ? (
          /* Selection & Upload Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Select Property to Analyze
              </h2>

              <div className="space-y-3 mb-8">
                {properties.map((property) => (
                  <button
                    key={property.id}
                    onClick={() => setSelectedProperty(property.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedProperty === property.id
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-slate-200 hover:border-indigo-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedProperty === property.id
                              ? "bg-indigo-600"
                              : "bg-slate-100"
                          }`}
                        >
                          <Home
                            className={`size-5 ${
                              selectedProperty === property.id
                                ? "text-white"
                                : "text-slate-600"
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{property.name}</h4>
                          <p className="text-sm text-slate-600">
                            {property.units} units • ${property.revenue.toLocaleString()}/mo
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`size-5 ${
                          selectedProperty === property.id ? "text-indigo-600" : "text-slate-400"
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedProperty || analyzing}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                    selectedProperty && !analyzing
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {analyzing ? (
                    <>
                      <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing Property...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-6" />
                      Run AI Analysis
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: TrendingUp, label: "Profitability Score" },
                { icon: Target, label: "Risk Assessment" },
                { icon: Zap, label: "Optimization Tips" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-4 text-center"
                >
                  <feature.icon className="size-6 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-700">{feature.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Results Screen */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Overall Score Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="size-6" />
                    <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
                      AI Property Score
                    </span>
                  </div>
                  <h2 className="text-6xl font-bold mb-2">{analysisResults.overallScore}/100</h2>
                  <p className="text-lg opacity-90">
                    {properties.find((p) => p.id === selectedProperty)?.name}
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="size-12" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="size-5" />
                <span>Excellent investment performance • Above market average</span>
              </div>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {analysisResults.metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="bg-white rounded-xl border border-slate-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-600">{metric.label}</span>
                    <span
                      className={`text-2xl font-bold ${
                        metric.color === "green"
                          ? "text-green-600"
                          : metric.color === "indigo"
                          ? "text-indigo-600"
                          : metric.color === "amber"
                          ? "text-amber-600"
                          : "text-blue-600"
                      }`}
                    >
                      {metric.value}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        metric.color === "green"
                          ? "bg-green-600"
                          : metric.color === "indigo"
                          ? "bg-indigo-600"
                          : metric.color === "amber"
                          ? "bg-amber-600"
                          : "bg-blue-600"
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-600">
                    <Sparkles className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">AI-Powered Insights</h3>
                    <p className="text-sm text-slate-600">
                      Actionable recommendations to maximize your returns
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {analysisResults.insights.map((insight, idx) => {
                  const Icon =
                    insight.type === "opportunity"
                      ? TrendingUp
                      : insight.type === "warning"
                      ? AlertCircle
                      : insight.type === "risk"
                      ? TrendingDown
                      : CheckCircle;

                  const bgColor =
                    insight.type === "opportunity"
                      ? "bg-green-50"
                      : insight.type === "warning"
                      ? "bg-amber-50"
                      : insight.type === "risk"
                      ? "bg-red-50"
                      : "bg-blue-50";

                  const iconColor =
                    insight.type === "opportunity"
                      ? "text-green-600"
                      : insight.type === "warning"
                      ? "text-amber-600"
                      : insight.type === "risk"
                      ? "text-red-600"
                      : "text-blue-600";

                  const borderColor =
                    insight.priority === "high"
                      ? "border-l-4 border-l-red-500"
                      : insight.priority === "medium"
                      ? "border-l-4 border-l-amber-500"
                      : "";

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className={`p-6 hover:bg-slate-50 transition-colors ${borderColor}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${bgColor}`}>
                          <Icon className={`size-6 ${iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-slate-900">{insight.title}</h4>
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                              {insight.impact}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm mb-3">{insight.description}</p>
                          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                            {insight.action}
                            <ChevronRight className="size-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {analysisResults.recommendations.map((rec, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">{rec.title}</h4>
                  <ul className="space-y-3">
                    {rec.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowResults(false)}
                className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
              >
                Analyze Another Property
              </button>
              <button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors">
                Download Full Report
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
