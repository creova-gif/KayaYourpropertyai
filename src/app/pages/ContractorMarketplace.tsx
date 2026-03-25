import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Wrench,
  Star,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  CheckCircle,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Award,
  Plus,
} from "lucide-react";
import { MarketplaceAPI } from "../services/backend.service";
import { toast } from "sonner";

interface Contractor {
  id: string;
  name: string;
  trade: string;
  email: string;
  phone: string;
  licenseNumber?: string;
  serviceRadiusKm: number;
  priceRange: { min: number; max: number };
  verified: boolean;
  avgRating: number;
  jobsCompleted: number;
  responseTimeHours: number;
  subscriptionTier?: "basic" | "pro" | "enterprise";
  createdAt: string;
}

export function ContractorMarketplace() {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTrade, setFilterTrade] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const trades = [
    { value: "all", label: "All Trades" },
    { value: "plumbing", label: "Plumbing", icon: Wrench },
    { value: "electrical", label: "Electrical", icon: Wrench },
    { value: "hvac", label: "HVAC", icon: Wrench },
    { value: "general", label: "General", icon: Wrench },
    { value: "painting", label: "Painting", icon: Wrench },
    { value: "carpentry", label: "Carpentry", icon: Wrench },
  ];

  useEffect(() => {
    loadContractors();
  }, [filterTrade, verifiedOnly]);

  const loadContractors = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (filterTrade !== "all") filters.trade = filterTrade;
      if (verifiedOnly) filters.verified = true;

      const data = await MarketplaceAPI.contractors.getAll(filters);
      setContractors(data);
    } catch (error) {
      console.error("Failed to load contractors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContractors = contractors.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.trade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: contractors.length,
    verified: contractors.filter((c) => c.verified).length,
    avgRating: contractors.length > 0
      ? (contractors.reduce((sum, c) => sum + c.avgRating, 0) / contractors.length).toFixed(1)
      : "0.0",
    activeJobs: contractors.reduce((sum, c) => sum + c.jobsCompleted, 0),
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8F7F4" }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">
            Marketplace
          </p>
          <h1
            className="text-[48px] font-normal text-[#0E0F0C] tracking-tight mb-2"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              letterSpacing: "-1px",
            }}
          >
            Find Contractors
          </h1>
          <p className="text-[14px] text-[#767570] max-w-2xl">
            Browse verified contractors for property maintenance and repairs.
            All contractors are pre-screened and rated by landlords.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#F8F7F4] rounded-2xl border border-[#0A7A52]/10 p-6 hover:border-[#0A7A52]/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-[#0A7A52]/5">
                <Users className="size-5 text-[#0A7A52]" />
              </div>
              <span className="text-sm font-medium text-slate-600">
                Total Contractors
              </span>
            </div>
            <p className="text-3xl font-serif font-semibold text-slate-900">
              {stats.total}
            </p>
          </div>

          <div className="bg-[#F8F7F4] rounded-2xl border border-[#0A7A52]/10 p-6 hover:border-[#0A7A52]/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-50">
                <CheckCircle className="size-5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">
                Verified
              </span>
            </div>
            <p className="text-3xl font-serif font-semibold text-slate-900">
              {stats.verified}
            </p>
          </div>

          <div className="bg-[#F8F7F4] rounded-2xl border border-[#0A7A52]/10 p-6 hover:border-[#0A7A52]/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-50">
                <Star className="size-5 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">
                Avg Rating
              </span>
            </div>
            <p className="text-3xl font-serif font-semibold text-slate-900">
              {stats.avgRating}
              <span className="text-lg text-slate-500">/5.0</span>
            </p>
          </div>

          <div className="bg-[#F8F7F4] rounded-2xl border border-[#0A7A52]/10 p-6 hover:border-[#0A7A52]/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-blue-50">
                <Briefcase className="size-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">
                Jobs Completed
              </span>
            </div>
            <p className="text-3xl font-serif font-semibold text-slate-900">
              {stats.activeJobs}
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-[#F8F7F4] rounded-2xl border border-[#0A7A52]/10 p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#767570]" />
              <input
                type="text"
                placeholder="Search contractors by name or trade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#0A7A52]/20 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0A7A52] focus:border-[#0A7A52] hover:border-[#0A7A52]/40 transition-all text-sm font-medium text-slate-700"
              />
            </div>

            <div className="flex items-center gap-4">
              <Filter className="size-5 text-[#0A7A52]" />
              <select
                value={filterTrade}
                onChange={(e) => setFilterTrade(e.target.value)}
                className="px-4 py-2.5 border border-[#0A7A52]/20 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0A7A52] focus:border-[#0A7A52] hover:border-[#0A7A52]/40 transition-all text-sm font-medium text-slate-700"
              >
                {trades.map((trade) => (
                  <option key={trade.value} value={trade.value}>
                    {trade.label}
                  </option>
                ))}
              </select>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-[#0A7A52]/20 text-[#0A7A52] focus:ring-[#0A7A52]"
                />
                <span className="text-sm font-medium text-slate-700">
                  Verified Only
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Contractors Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#0A7A52] border-t-transparent"></div>
            <p className="mt-4 text-sm text-slate-600">Loading contractors...</p>
          </div>
        ) : filteredContractors.length === 0 ? (
          <div className="text-center py-12">
            <Users className="size-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No contractors found</p>
            <p className="text-sm text-slate-500 mt-2">
              Try adjusting your search filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContractors.map((contractor) => (
              <div
                key={contractor.id}
                className="bg-white rounded-2xl border border-[#0A7A52]/10 p-6 hover:border-[#0A7A52]/30 hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {contractor.name}
                      </h3>
                      {contractor.verified && (
                        <CheckCircle className="size-5 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#0A7A52]/5 text-[#0A7A52] border border-[#0A7A52]/20">
                        {contractor.trade}
                      </span>
                      {contractor.subscriptionTier && (
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                          contractor.subscriptionTier === 'enterprise'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : contractor.subscriptionTier === 'pro'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                          {contractor.subscriptionTier}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < Math.floor(contractor.avgRating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {contractor.avgRating.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({contractor.jobsCompleted} jobs)
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Clock className="size-4 text-slate-400" />
                    <span>
                      Responds in ~{contractor.responseTimeHours} hours
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="size-4 text-slate-400" />
                    <span>{contractor.serviceRadiusKm} km service radius</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <DollarSign className="size-4 text-slate-400" />
                    <span>
                      ${contractor.priceRange.min} - ${contractor.priceRange.max}
                      /hr
                    </span>
                  </div>
                  {contractor.licenseNumber && (
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Award className="size-4 text-slate-400" />
                      <span>License: {contractor.licenseNumber}</span>
                    </div>
                  )}
                </div>

                {/* Contact */}
                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="size-4 text-slate-400" />
                    <a
                      href={`tel:${contractor.phone}`}
                      className="text-[#0A7A52] hover:underline"
                    >
                      {contractor.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="size-4 text-slate-400" />
                    <a
                      href={`mailto:${contractor.email}`}
                      className="text-[#0A7A52] hover:underline truncate"
                    >
                      {contractor.email}
                    </a>
                  </div>
                </div>

                {/* Action Button */}
                <button onClick={() => toast.success(`Message sent to ${contractor.name}`)} className="w-full mt-4 px-4 py-2.5 bg-[#0A7A52] text-white rounded-xl font-medium hover:bg-[#085D3D] transition-colors">
                  Contact Contractor
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Register as Contractor CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#0A7A52] to-[#085D3D] rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl font-normal mb-3 text-[#ffffff]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Are you a contractor?
            </h2>
            <p className="text-white/90 mb-2 text-lg">
              Join KAYA's contractor marketplace and connect with property owners
              across Ontario.
            </p>
            <p className="text-white/80 text-sm mb-6">
              Subscription plans starting at $29/month • Get verified • Build your reputation • Accept jobs 24/7
            </p>
            
            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <h3 className="font-semibold text-lg mb-1 text-[#ffffff]">Basic</h3>
                <p className="text-3xl font-bold mb-2 text-[#fff5f5]">$29<span className="text-sm font-normal">/mo</span></p>
                <ul className="text-sm text-white/90 space-y-2 text-left">
                  <li>✓ Profile listing</li>
                  <li>✓ Contact requests</li>
                  <li>✓ Job notifications</li>
                  <li>✓ Basic analytics</li>
                </ul>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 border-2 border-white/40 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-[#0A7A52] rounded-full text-xs font-bold">
                  POPULAR
                </div>
                <h3 className="font-semibold text-lg mb-1 text-[#fff6f6]">Pro</h3>
                <p className="text-3xl font-bold mb-2 text-[#ffffff]">$79<span className="text-sm font-normal">/mo</span></p>
                <ul className="text-sm text-white/90 space-y-2 text-left">
                  <li>✓ Everything in Basic</li>
                  <li>✓ <strong>Verified badge</strong></li>
                  <li>✓ Featured placement</li>
                  <li>✓ Priority support</li>
                  <li>✓ Advanced analytics</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <h3 className="font-semibold text-lg mb-1 text-[#ffffff]">Enterprise</h3>
                <p className="text-3xl font-bold mb-2 text-[#fffefe]">$199<span className="text-sm font-normal">/mo</span></p>
                <ul className="text-sm text-white/90 space-y-2 text-left">
                  <li>✓ Everything in Pro</li>
                  <li>✓ Multiple team members</li>
                  <li>✓ API access</li>
                  <li>✓ White-label options</li>
                  <li>✓ Dedicated account manager</li>
                </ul>
              </div>
            </div>

            <button onClick={() => toast.success("Redirecting to contractor subscription plans…")} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0A7A52] rounded-xl font-semibold hover:bg-[#F8F7F4] transition-colors shadow-lg">
              <Plus className="size-5" />
              Start Your Contractor Subscription
            </button>
            <p className="text-white/70 text-xs mt-3">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}