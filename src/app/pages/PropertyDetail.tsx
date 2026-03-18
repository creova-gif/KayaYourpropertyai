import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Edit,
  Trash2,
  Plus,
  Bed,
  Bath,
  Ruler,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Camera,
  FileText,
  Wifi,
  Car,
  Zap,
  Wind,
  Droplet,
  Dog,
  Cigarette,
  Shield,
  Upload,
} from "lucide-react";

export function PropertyDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Mock property data - in production this would come from API/state
  const property = {
    id: 1,
    name: "King Street Residences",
    address: "123 King Street",
    city: "Toronto",
    province: "ON",
    postalCode: "M5H 1A1",
    country: "Canada",
    type: "Condo",
    propertyType: "Apartment",
    yearBuilt: 2018,
    totalUnits: 2,
    occupiedUnits: 1,
    description:
      "Modern luxury condo building in the heart of downtown Toronto. Features include state-of-the-art amenities, 24/7 concierge, and stunning city views.",
    amenities: [
      "24/7 Concierge",
      "Fitness Center",
      "Swimming Pool",
      "Rooftop Terrace",
      "Underground Parking",
      "Bicycle Storage",
      "Pet Friendly",
      "In-Suite Laundry",
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    units: [
      {
        id: 1,
        number: "4A",
        bedrooms: 2,
        bathrooms: 1,
        squareFeet: 950,
        floor: 4,
        rent: 2300,
        deposit: 2300,
        status: "occupied",
        tenant: "John Doe",
        leaseStart: "Jan 1, 2024",
        leaseEnd: "Dec 31, 2024",
        parking: true,
        parkingFee: 150,
        utilitiesIncluded: ["Heat", "Water"],
        petsAllowed: true,
        smokingAllowed: false,
        minIncome: 6900,
        creditScoreMin: 650,
        guarantorRequired: false,
      },
      {
        id: 2,
        number: "5A",
        bedrooms: 2,
        bathrooms: 1,
        squareFeet: 975,
        floor: 5,
        rent: 2400,
        deposit: 2400,
        status: "available",
        tenant: null,
        leaseStart: null,
        leaseEnd: null,
        parking: true,
        parkingFee: 150,
        utilitiesIncluded: ["Heat", "Water"],
        petsAllowed: true,
        smokingAllowed: false,
        minIncome: 7200,
        creditScoreMin: 650,
        guarantorRequired: false,
      },
    ],
    documents: [
      { name: "Property Deed", type: "Legal", uploadDate: "Jan 15, 2024" },
      { name: "Insurance Policy", type: "Insurance", uploadDate: "Feb 1, 2024" },
      { name: "Floor Plans", type: "Plans", uploadDate: "Dec 20, 2023" },
    ],
  };

  const totalRevenue = property.units
    .filter((u) => u.status === "occupied")
    .reduce((sum, u) => sum + u.rent, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/colorful/properties")}
            className="flex items-center gap-2 text-[#767570] hover:text-[#0E0F0C] mb-4 text-[13px] font-medium"
          >
            ← Back to Properties
          </button>
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Property Management</p>
          <h1 className="text-[48px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>123 King Street West</h1>
          <p className="mt-2 text-[14px] text-[#767570]">Multi-unit residential property overview and details</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-50">
                <Building2 className="size-5 text-indigo-600" />
              </div>
              <span className="text-sm text-slate-600">Total Units</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{property.totalUnits}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-50">
                <Users className="size-5 text-green-600" />
              </div>
              <span className="text-sm text-slate-600">Occupancy</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {Math.round((property.occupiedUnits / property.totalUnits) * 100)}%
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-50">
                <DollarSign className="size-5 text-purple-600" />
              </div>
              <span className="text-sm text-slate-600">Monthly Revenue</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-50">
                <Calendar className="size-5 text-amber-600" />
              </div>
              <span className="text-sm text-slate-600">Avg Lease Length</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">12 mo</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-6">
          <nav className="flex gap-8">
            {["overview", "units", "documents", "amenities"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Images */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Property Images</h3>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-medium transition-colors">
                  <Upload className="size-4" />
                  Upload Photos
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group">
                    <img src={img} alt={`Property ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-2 bg-white rounded-lg hover:bg-slate-100">
                        <Camera className="size-5 text-slate-900" />
                      </button>
                      <button className="p-2 bg-white rounded-lg hover:bg-slate-100">
                        <Trash2 className="size-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Description</h3>
              <p className="text-slate-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Property Type</span>
                  <span className="font-medium text-slate-900">{property.propertyType}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Year Built</span>
                  <span className="font-medium text-slate-900">{property.yearBuilt}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Total Units</span>
                  <span className="font-medium text-slate-900">{property.totalUnits}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Occupied Units</span>
                  <span className="font-medium text-slate-900">{property.occupiedUnits}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Units Tab */}
        {activeTab === "units" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">Units</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                <Plus className="size-5" />
                Add Unit
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {property.units.map((unit) => (
                <div key={unit.id} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-2">Unit {unit.number}</h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          unit.status === "occupied"
                            ? "bg-green-100 text-green-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {unit.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Edit className="size-5 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="size-5 text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Unit Specs */}
                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <Bed className="size-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">Bedrooms</p>
                        <p className="font-semibold text-slate-900">{unit.bedrooms}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="size-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">Bathrooms</p>
                        <p className="font-semibold text-slate-900">{unit.bathrooms}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="size-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">Sq Ft</p>
                        <p className="font-semibold text-slate-900">{unit.squareFeet}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Monthly Rent</span>
                      <span className="text-xl font-bold text-slate-900">
                        ${unit.rent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Security Deposit</span>
                      <span className="font-medium text-slate-900">${unit.deposit.toLocaleString()}</span>
                    </div>
                    {unit.parking && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Parking Fee</span>
                        <span className="font-medium text-slate-900">${unit.parkingFee}</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {unit.parking && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium flex items-center gap-1">
                        <Car className="size-3" />
                        Parking
                      </span>
                    )}
                    {unit.petsAllowed ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                        <Dog className="size-3" />
                        Pets OK
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium flex items-center gap-1">
                        <XCircle className="size-3" />
                        No Pets
                      </span>
                    )}
                    {!unit.smokingAllowed && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                        <Cigarette className="size-3" />
                        No Smoking
                      </span>
                    )}
                    {unit.utilitiesIncluded.map((utility, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                      >
                        {utility} Included
                      </span>
                    ))}
                  </div>

                  {/* Tenant Info */}
                  {unit.tenant && (
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="size-5 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600">Current Tenant</p>
                          <p className="font-semibold text-slate-900">{unit.tenant}</p>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600">
                        Lease: {unit.leaseStart} - {unit.leaseEnd}
                      </div>
                    </div>
                  )}

                  {/* Requirements */}
                  <div className="pt-4 border-t border-slate-200 mt-4">
                    <p className="text-sm font-medium text-slate-900 mb-2">Requirements</p>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p>Min Income: ${unit.minIncome.toLocaleString()}/month</p>
                      <p>Credit Score: {unit.creditScoreMin}+</p>
                      {unit.guarantorRequired && <p>Guarantor Required</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Property Documents</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                <Upload className="size-5" />
                Upload Document
              </button>
            </div>
            <div className="divide-y divide-slate-200">
              {property.documents.map((doc, idx) => (
                <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-indigo-50">
                        <FileText className="size-6 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{doc.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-600 mt-1">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>Uploaded {doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                        Download
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="size-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities Tab */}
        {activeTab === "amenities" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Building Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg"
                >
                  <CheckCircle className="size-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium text-slate-900">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}