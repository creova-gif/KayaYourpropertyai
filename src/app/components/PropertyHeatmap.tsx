import { motion } from "motion/react";
import { Building2, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Property {
  id: string;
  name: string;
  risk: "low" | "medium" | "high";
  occupancy: number;
  units: number;
}

interface PropertyHeatmapProps {
  properties: Property[];
}

export function PropertyHeatmap({ properties }: PropertyHeatmapProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "from-green-400 to-emerald-600";
      case "medium": return "from-amber-400 to-orange-600";
      case "high": return "from-red-400 to-rose-600";
      default: return "from-slate-400 to-slate-600";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low": return CheckCircle2;
      case "medium": return AlertTriangle;
      case "high": return AlertTriangle;
      default: return Building2;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property, idx) => {
        const RiskIcon = getRiskIcon(property.risk);
        const gradient = getRiskColor(property.risk);

        return (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className="relative bg-white rounded-xl border-2 border-slate-200 p-6 cursor-pointer overflow-hidden group"
          >
            {/* Background Gradient on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

            {/* Content */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
                  <Building2 className="size-6 text-white" />
                </div>
                <RiskIcon className={`size-6 ${
                  property.risk === "low" ? "text-green-600" :
                  property.risk === "medium" ? "text-amber-600" :
                  "text-red-600"
                }`} />
              </div>

              <h3 className="font-semibold text-slate-900 mb-2">{property.name}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Occupancy</span>
                  <span className="font-semibold text-slate-900">{property.occupancy}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${property.occupancy}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className={`h-full bg-gradient-to-r ${gradient}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-sm text-slate-600">{property.units} units</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  property.risk === "low" ? "bg-green-100 text-green-700" :
                  property.risk === "medium" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {property.risk} risk
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
