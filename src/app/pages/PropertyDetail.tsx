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
import { toast } from "sonner";

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
    <div className="min-h-screen bg-[#F8F7F4]">
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
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#E5F4EE]">
                <Building2 className="size-5 text-[#0A7A52]" />
              </div>
              <span className="text-sm text-[#767570]">Total Units</span>
            </div>
            <p className="text-3xl font-bold text-[#0E0F0C]">{property.totalUnits}</p>
          </div>

          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#E5F4EE]">
                <Users className="size-5 text-[#0A7A52]" />
              </div>
              <span className="text-sm text-[#767570]">Occupancy</span>
            </div>
            <p className="text-3xl font-bold text-[#0E0F0C]">
              {Math.round((property.occupiedUnits / property.totalUnits) * 100)}%
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#E5F4EE]">
                <DollarSign className="size-5 text-[#0A7A52]" />
              </div>
              <span className="text-sm text-[#767570]">Monthly Revenue</span>
            </div>
            <p className="text-3xl font-bold text-[#0E0F0C]">${totalRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#E5F4EE]">
                <Calendar className="size-5 text-[#0A7A52]" />
              </div>
              <span className="text-sm text-[#767570]">Avg Lease Length</span>
            </div>
            <p className="text-3xl font-bold text-[#0E0F0C]">12 mo</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[rgba(0,0,0,0.08)] mb-6">
          <nav className="flex gap-8">
            {["overview", "units", "documents", "amenities"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? "border-[#0A7A52] text-[#0A7A52]"
                    : "border-transparent text-[#767570] hover:text-[#0E0F0C]"
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
            <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#0E0F0C]">Property Images</h3>
                <button onClick={() => toast.info("Photo upload feature coming soon")} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#E5F4EE] hover:bg-[#D1EDE0] text-[#0A7A52] rounded-lg font-medium transition-colors">
                  <Upload className="size-4" />
                  Upload Photos
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group">
                    <img src={img} alt={`Property ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => toast.info("Photo viewer coming soon")} className="p-2 bg-white rounded-lg hover:bg-[#F8F7F4]">
                        <Camera className="size-5 text-[#0E0F0C]" />
                      </button>
                      <button onClick={() => toast.info("Delete photo")} className="p-2 bg-white rounded-lg hover:bg-[#F8F7F4]">
                        <Trash2 className="size-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] p-6">
              <h3 className="text-lg font-semibold text-[#0E0F0C] mb-4">Description</h3>
              <p className="text-[#0E0F0C] leading-relaxed">{property.description}</p>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] p-6">
              <h3 className="text-lg font-semibold text-[#0E0F0C] mb-4">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between py-3 border-b border-[rgba(0,0,0,0.06)]">
                  <span className="text-[#767570]">Property Type</span>
                  <span className="font-medium text-[#0E0F0C]">{property.propertyType}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[rgba(0,0,0,0.06)]">
                  <span className="text-[#767570]">Year Built</span>
                  <span className="font-medium text-[#0E0F0C]">{property.yearBuilt}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[rgba(0,0,0,0.06)]">
                  <span className="text-[#767570]">Total Units</span>
                  <span className="font-medium text-[#0E0F0C]">{property.totalUnits}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[rgba(0,0,0,0.06)]">
                  <span className="text-[#767570]">Occupied Units</span>
                  <span className="font-medium text-[#0E0F0C]">{property.occupiedUnits}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Units Tab */}
        {activeTab === "units" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#0E0F0C]">Units</h3>
              <button onClick={() => toast.info("Add unit feature coming soon")} className="flex items-center gap-2 px-4 py-2 bg-[#0A7A52] hover:bg-[#085D3D] text-white rounded-lg font-medium transition-colors">
                <Plus className="size-5" />
                Add Unit
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {property.units.map((unit) => (
                <div key={unit.id} className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-[#0E0F0C] mb-2">Unit {unit.number}</h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          unit.status === "occupied"
                            ? "bg-[#E5F4EE] text-[#0A7A52]"
                            : "bg-[#F8F7F4] text-[#767570]"
                        }`}
                      >
                        {unit.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toast.info(`Edit unit ${unit.number}`)} className="p-2 hover:bg-[#F8F7F4] rounded-lg transition-colors">
                        <Edit className="size-5 text-[#767570]" />
                      </button>
                      <button onClick={() => toast.info(`Delete unit ${unit.number}`)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="size-5 text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Unit Specs */}
                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-[rgba(0,0,0,0.06)]">
                    <div className="flex items-center gap-2">
                      <Bed className="size-5 text-[#767570]" />
                      <div>
                        <p className="text-sm text-[#767570]">Bedrooms</p>
                        <p className="font-semibold text-[#0E0F0C]">{unit.bedrooms}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="size-5 text-[#767570]" />
                      <div>
                        <p className="text-sm text-[#767570]">Bathrooms</p>
                        <p className="font-semibold text-[#0E0F0C]">{unit.bathrooms}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="size-5 text-[#767570]" />
                      <div>
                        <p className="text-sm text-[#767570]">Sq Ft</p>
                        <p className="font-semibold text-[#0E0F0C]">{unit.squareFeet}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#767570]">Monthly Rent</span>
                      <span className="text-xl font-bold text-[#0E0F0C]">
                        ${unit.rent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#767570]">Security Deposit</span>
                      <span className="font-medium text-[#0E0F0C]">${unit.deposit.toLocaleString()}</span>
                    </div>
                    {unit.parking && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#767570]">Parking Fee</span>
                        <span className="font-medium text-[#0E0F0C]">${unit.parkingFee}</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {unit.parking && (
                      <span className="px-2 py-1 bg-[#F8F7F4] text-[#767570] rounded text-xs font-medium flex items-center gap-1">
                        <Car className="size-3" />
                        Parking
                      </span>
                    )}
                    {unit.petsAllowed ? (
                      <span className="px-2 py-1 bg-[#E5F4EE] text-[#0A7A52] rounded text-xs font-medium flex items-center gap-1">
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
                      <span className="px-2 py-1 bg-[#E5F4EE] text-[#0A7A52] rounded text-xs font-medium flex items-center gap-1">
                        <Cigarette className="size-3" />
                        No Smoking
                      </span>
                    )}
                    {unit.utilitiesIncluded.map((utility, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#F8F7F4] text-[#767570] rounded text-xs font-medium"
                      >
                        {utility} Included
                      </span>
                    ))}
                  </div>

                  {/* Tenant Info */}
                  {unit.tenant && (
                    <div className="pt-4 border-t border-[rgba(0,0,0,0.06)]">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="size-5 text-[#767570]" />
                        <div>
                          <p className="text-sm text-[#767570]">Current Tenant</p>
                          <p className="font-semibold text-[#0E0F0C]">{unit.tenant}</p>
                        </div>
                      </div>
                      <div className="text-sm text-[#767570]">
                        Lease: {unit.leaseStart} - {unit.leaseEnd}
                      </div>
                    </div>
                  )}

                  {/* Requirements */}
                  <div className="pt-4 border-t border-[rgba(0,0,0,0.06)] mt-4">
                    <p className="text-sm font-medium text-[#0E0F0C] mb-2">Requirements</p>
                    <div className="space-y-1 text-sm text-[#767570]">
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
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)]">
            <div className="p-6 border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0E0F0C]">Property Documents</h3>
              <button onClick={() => toast.info("Document upload coming soon")} className="flex items-center gap-2 px-4 py-2 bg-[#0A7A52] hover:bg-[#085D3D] text-white rounded-lg font-medium transition-colors">
                <Upload className="size-5" />
                Upload Document
              </button>
            </div>
            <div className="divide-y divide-[rgba(0,0,0,0.06)]">
              {property.documents.map((doc, idx) => (
                <div key={idx} className="p-6 hover:bg-[#F8F7F4] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-[#E5F4EE]">
                        <FileText className="size-6 text-[#0A7A52]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0E0F0C]">{doc.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-[#767570] mt-1">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>Uploaded {doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toast.success(`${doc.name} downloaded`)} className="px-3 py-1.5 text-sm border border-[rgba(0,0,0,0.08)] rounded-lg hover:bg-[#F8F7F4] transition-colors text-[#767570]">
                        Download
                      </button>
                      <button onClick={() => toast.info(`Delete ${doc.name}`)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
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
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] p-6">
            <h3 className="text-lg font-semibold text-[#0E0F0C] mb-6">Building Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 border border-[rgba(0,0,0,0.08)] rounded-lg"
                >
                  <CheckCircle className="size-5 text-[#0A7A52] flex-shrink-0" />
                  <span className="font-medium text-[#0E0F0C]">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}