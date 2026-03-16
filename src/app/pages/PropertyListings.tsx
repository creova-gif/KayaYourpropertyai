import { useState } from "react";
import { Link } from "react-router";
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Calendar,
  Home,
  Briefcase,
  Search,
  Filter,
  ChevronRight,
  Star,
  Wifi,
  Car,
  Dumbbell,
  Shield,
} from "lucide-react";

type PropertyType = "residential" | "commercial" | "student";

interface Property {
  id: number;
  title: string;
  type: PropertyType;
  address: string;
  city: string;
  province: string;
  rent: number;
  bedrooms?: number;
  bathrooms?: number;
  sqft: number;
  available: string;
  images: string[];
  amenities: string[];
  description: string;
  landlord: string;
  featured: boolean;
  // Commercial specific
  businessType?: string[];
  leaseTerms?: string;
}

export function PropertyListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<PropertyType | "all">("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const properties: Property[] = [
    {
      id: 1,
      title: "Modern Downtown 2BR Condo",
      type: "residential",
      address: "123 King Street West",
      city: "Toronto",
      province: "ON",
      rent: 2300,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 950,
      available: "Apr 1, 2026",
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
      amenities: ["Wifi", "Gym", "Parking", "24/7 Security"],
      description: "Beautiful modern condo in the heart of downtown Toronto. Walking distance to transit, shopping, and dining.",
      landlord: "Premium Properties Inc.",
      featured: true,
    },
    {
      id: 2,
      title: "Spacious Student Housing - Shared",
      type: "student",
      address: "456 College Avenue",
      city: "Toronto",
      province: "ON",
      rent: 850,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 450,
      available: "Sep 1, 2026",
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
      amenities: ["Wifi", "Utilities Included", "Study Room"],
      description: "Perfect for students! Close to University of Toronto and Ryerson. Utilities included.",
      landlord: "Student Housing Co.",
      featured: false,
    },
    {
      id: 3,
      title: "Prime Retail Space - Queen West",
      type: "commercial",
      address: "789 Queen Street West",
      city: "Toronto",
      province: "ON",
      rent: 4500,
      sqft: 1200,
      available: "May 1, 2026",
      images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
      amenities: ["High Traffic", "Corner Unit", "Parking"],
      description: "Prime retail location in trendy Queen West. Perfect for boutique, cafe, or office.",
      landlord: "Commercial Realty Group",
      featured: true,
      businessType: ["Retail", "Office", "Restaurant"],
      leaseTerms: "3-5 years",
    },
    {
      id: 4,
      title: "Luxury 3BR Penthouse",
      type: "residential",
      address: "100 Harbour Street",
      city: "Toronto",
      province: "ON",
      rent: 4200,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1600,
      available: "Apr 15, 2026",
      images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"],
      amenities: ["Gym", "Pool", "Concierge", "Parking", "Lake View"],
      description: "Stunning penthouse with panoramic lake views. Premium building with world-class amenities.",
      landlord: "Luxury Living Inc.",
      featured: true,
    },
    {
      id: 5,
      title: "Cozy 1BR Near Subway",
      type: "residential",
      address: "234 Yonge Street",
      city: "Toronto",
      province: "ON",
      rent: 1850,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      available: "Apr 1, 2026",
      images: ["https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"],
      amenities: ["Transit", "Laundry", "Bike Storage"],
      description: "Affordable 1BR apartment steps from Yonge-Bloor station. Perfect for young professionals.",
      landlord: "Metro Housing",
      featured: false,
    },
    {
      id: 6,
      title: "Professional Office Suite",
      type: "commercial",
      address: "555 Bay Street",
      city: "Toronto",
      province: "ON",
      rent: 6800,
      sqft: 2000,
      available: "Jun 1, 2026",
      images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"],
      amenities: ["Boardroom", "Reception", "Parking", "24/7 Access"],
      description: "Class A office space in the financial district. Fully equipped with modern amenities.",
      landlord: "Corporate Estates",
      featured: true,
      businessType: ["Professional Services", "Finance", "Tech"],
      leaseTerms: "5+ years",
    },
  ];

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = propertyTypeFilter === "all" || property.type === propertyTypeFilter;
    
    const matchesPrice = property.rent >= priceRange[0] && property.rent <= priceRange[1];

    return matchesSearch && matchesType && matchesPrice;
  });

  const handleApply = (property: Property) => {
    setSelectedProperty(property);
    setShowApplicationModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Space</h1>
          <p className="text-xl text-indigo-100 mb-8">
            Browse residential, commercial, and student housing across Ontario
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-xl p-4 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by location, address, or property type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={propertyTypeFilter}
                onChange={(e) => setPropertyTypeFilter(e.target.value as PropertyType | "all")}
                className="px-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Property Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="student">Student Housing</option>
              </select>

              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Filter className="size-5" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-slate-600">
            <span className="font-semibold text-slate-900">{filteredProperties.length}</span> properties available
          </p>
          <select className="px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Sort: Featured First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Available Date</option>
          </select>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {property.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="size-4 fill-current" />
                    Featured
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {property.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-1">
                  {property.title}
                </h3>
                
                <div className="flex items-center gap-1 text-slate-600 text-sm mb-3">
                  <MapPin className="size-4" />
                  <span className="line-clamp-1">{property.address}, {property.city}</span>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                  {property.bedrooms && (
                    <div className="flex items-center gap-1">
                      <Bed className="size-4" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-1">
                      <Bath className="size-4" />
                      <span>{property.bathrooms} bath</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Square className="size-4" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div>
                    <p className="text-sm text-slate-500">Monthly Rent</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${property.rent.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleApply(property)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    Apply Now
                    <ChevronRight className="size-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="size-4" />
                  <span>Available {property.available}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="size-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No properties found</h3>
            <p className="text-slate-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Apply for Property</h2>
              <p className="text-slate-600">{selectedProperty.title}</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex-1">
                    <p className="text-sm text-indigo-600 mb-1">Monthly Rent</p>
                    <p className="text-2xl font-bold text-indigo-900">
                      ${selectedProperty.rent.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-indigo-600 mb-1">Available</p>
                    <p className="font-semibold text-indigo-900">{selectedProperty.available}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    To apply for this property, you'll need to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="size-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      Create an account or sign in
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="size-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      Complete your profile and upload documents
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="size-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      Submit your application for review
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>AI-Powered Screening:</strong> Your application will be reviewed by our AI
                    system within 24 hours. You'll receive instant feedback and updates.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <Link
                  to="/tenant/application"
                  state={{ property: selectedProperty }}
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-center"
                >
                  Continue to Application
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
