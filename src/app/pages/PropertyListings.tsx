import { useState, useEffect } from "react";
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
  Heart,
  Share2,
  Phone,
  Mail,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Upload,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

type PropertyType = "residential" | "commercial" | "student";

interface Property {
  id: string;
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
  landlordId: string;
  featured: boolean;
  createdAt: string;
  contactEmail: string;
  contactPhone?: string;
  // Commercial specific
  businessType?: string[];
  leaseTerms?: string;
  // Stats
  views?: number;
  saved?: number;
}

export function PropertyListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<PropertyType | "all">("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedListings, setSavedListings] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"featured" | "priceAsc" | "priceDesc" | "date">("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Form state for creating new listing
  const [newListing, setNewListing] = useState<Partial<Property>>({
    title: "",
    type: "residential",
    address: "",
    city: "",
    province: "ON",
    rent: 0,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 0,
    available: "",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    amenities: [],
    description: "",
    landlord: "Your Company Name",
    contactEmail: "support@creova.one",
    contactPhone: "",
    featured: false,
  });

  // Load properties from backend
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2071350e/listings`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProperties(data.listings || []);
      } else {
        // Load mock data if backend fails
        loadMockData();
      }
    } catch (error) {
      console.error("Error loading properties:", error);
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    const mockProperties: Property[] = [
      {
        id: "1",
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
        landlordId: "landlord-1",
        featured: true,
        createdAt: new Date().toISOString(),
        contactEmail: "support@creova.one",
        contactPhone: "(416) 555-0100",
        views: 245,
        saved: 32,
      },
      {
        id: "2",
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
        description: "Perfect for students! Close to University of Toronto. Utilities included.",
        landlord: "Student Housing Co.",
        landlordId: "landlord-2",
        featured: false,
        createdAt: new Date().toISOString(),
        contactEmail: "support@creova.one",
        views: 128,
        saved: 18,
      },
      {
        id: "3",
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
        landlordId: "landlord-3",
        featured: true,
        createdAt: new Date().toISOString(),
        contactEmail: "support@creova.one",
        businessType: ["Retail", "Office", "Restaurant"],
        leaseTerms: "3-5 years",
        views: 189,
        saved: 24,
      },
      {
        id: "4",
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
        landlordId: "landlord-4",
        featured: true,
        createdAt: new Date().toISOString(),
        contactEmail: "support@creova.one",
        contactPhone: "(416) 555-0200",
        views: 412,
        saved: 67,
      },
    ];
    setProperties(mockProperties);
  };

  const handleCreateListing = async () => {
    try {
      const listing: Property = {
        ...newListing,
        id: Date.now().toString(),
        landlordId: "current-user", // This should come from auth context
        createdAt: new Date().toISOString(),
        views: 0,
        saved: 0,
      } as Property;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2071350e/listings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listing),
        }
      );

      if (response.ok) {
        await loadProperties();
        setShowCreateModal(false);
        resetForm();
      } else {
        // Fallback: add to local state
        setProperties([listing, ...properties]);
        setShowCreateModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      // Fallback: add to local state
      const listing: Property = {
        ...newListing,
        id: Date.now().toString(),
        landlordId: "current-user",
        createdAt: new Date().toISOString(),
        views: 0,
        saved: 0,
      } as Property;
      setProperties([listing, ...properties]);
      setShowCreateModal(false);
      resetForm();
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2071350e/listings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      setProperties(properties.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting listing:", error);
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  const toggleSave = (id: string) => {
    setSavedListings((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const resetForm = () => {
    setNewListing({
      title: "",
      type: "residential",
      address: "",
      city: "",
      province: "ON",
      rent: 0,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 0,
      available: "",
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
      amenities: [],
      description: "",
      landlord: "Your Company Name",
      contactEmail: "support@creova.one",
      contactPhone: "",
      featured: false,
    });
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = propertyTypeFilter === "all" || property.type === propertyTypeFilter;
    
    const matchesPrice = property.rent >= priceRange[0] && property.rent <= priceRange[1];

    return matchesSearch && matchesType && matchesPrice;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case "priceAsc":
        return a.rent - b.rent;
      case "priceDesc":
        return b.rent - a.rent;
      case "date":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const handleApply = (property: Property) => {
    setSelectedProperty(property);
    setShowApplicationModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A7A52] to-[#085D3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-4">
            <h1 
              className="text-4xl font-bold"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Find Your Perfect Space
            </h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-[#0A7A52] px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Plus className="size-5" />
              List Property
            </button>
          </div>
          <p 
            className="text-xl text-white/90 mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Browse residential, commercial, and student housing across Canada
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-xl p-4 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#767570]" />
                <input
                  type="text"
                  placeholder="Search by location, address, or property type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#D1D0CC] text-[#0E0F0C] focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <select
                value={propertyTypeFilter}
                onChange={(e) => setPropertyTypeFilter(e.target.value as PropertyType | "all")}
                className="px-4 py-3 rounded-lg border border-[#D1D0CC] text-[#0E0F0C] focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <option value="all">All Property Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="student">Student Housing</option>
              </select>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="bg-[#0A7A52] hover:bg-[#085D3D] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Filter className="size-5" />
                Filters
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-[#D1D0CC]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0E0F0C] mb-2">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="flex-1 px-3 py-2 border border-[#D1D0CC] rounded-lg"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="flex-1 px-3 py-2 border border-[#D1D0CC] rounded-lg"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[#767570]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="font-semibold text-[#0E0F0C]">{sortedProperties.length}</span> properties available
          </p>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-[#D1D0CC] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <option value="featured">Sort: Featured First</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="date">Newest First</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A7A52]"></div>
            <p className="mt-4 text-[#767570]">Loading properties...</p>
          </div>
        ) : (
          <>
            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl border border-[#D1D0CC] overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {property.featured && (
                      <div className="absolute top-3 left-3 bg-[#0A7A52] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="size-4 fill-current" />
                        Featured
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0E0F0C] px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {property.type}
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        onClick={() => toggleSave(property.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                          savedListings.has(property.id)
                            ? "bg-[#0A7A52] text-white"
                            : "bg-white/90 text-[#0E0F0C] hover:bg-white"
                        }`}
                      >
                        <Heart className={`size-4 ${savedListings.has(property.id) ? "fill-current" : ""}`} />
                      </button>
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#0E0F0C] hover:bg-white transition-all">
                        <Share2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 
                      className="text-lg font-semibold text-[#0E0F0C] mb-2 line-clamp-1"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-[#767570] text-sm mb-3">
                      <MapPin className="size-4" />
                      <span className="line-clamp-1">{property.address}, {property.city}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-[#767570]">
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
                          className="px-2 py-1 bg-[#F8F7F4] text-[#767570] text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {property.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-[#F8F7F4] text-[#767570] text-xs rounded-full">
                          +{property.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    {property.views && (
                      <div className="flex items-center gap-4 mb-3 text-xs text-[#767570]">
                        <span>{property.views} views</span>
                        <span>•</span>
                        <span>{property.saved} saved</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-[#D1D0CC]">
                      <div>
                        <p className="text-sm text-[#767570]">Monthly Rent</p>
                        <p 
                          className="text-2xl font-bold text-[#0A7A52]"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          ${property.rent.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleApply(property)}
                        className="bg-[#0A7A52] hover:bg-[#085D3D] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Apply Now
                        <ChevronRight className="size-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-[#767570]">
                        <Calendar className="size-4" />
                        <span>Available {property.available}</span>
                      </div>
                      
                      {/* Admin actions - shown only for demo */}
                      <button
                        onClick={() => handleDeleteListing(property.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedProperties.length === 0 && (
              <div className="text-center py-16">
                <Building2 className="size-16 text-[#D1D0CC] mx-auto mb-4" />
                <h3 
                  className="text-xl font-semibold text-[#0E0F0C] mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  No properties found
                </h3>
                <p className="text-[#767570]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Try adjusting your search filters
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#D1D0CC] flex items-center justify-between">
              <div>
                <h2 
                  className="text-2xl font-bold text-[#0E0F0C] mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Apply for Property
                </h2>
                <p className="text-[#767570]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {selectedProperty.title}
                </p>
              </div>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="p-2 hover:bg-[#F8F7F4] rounded-lg transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F8F7F4] rounded-lg border border-[#D1D0CC]">
                    <p className="text-sm text-[#767570] mb-1">Monthly Rent</p>
                    <p 
                      className="text-2xl font-bold text-[#0A7A52]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      ${selectedProperty.rent.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-[#F8F7F4] rounded-lg border border-[#D1D0CC]">
                    <p className="text-sm text-[#767570] mb-1">Available</p>
                    <p 
                      className="font-semibold text-[#0E0F0C]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {selectedProperty.available}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-6 p-4 bg-[#0A7A52]/5 rounded-lg border border-[#0A7A52]/20">
                <h4 className="font-semibold text-[#0E0F0C] mb-3">Contact Landlord</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="size-4 text-[#0A7A52]" />
                    <a href={`mailto:${selectedProperty.contactEmail}`} className="text-[#0A7A52] hover:underline">
                      {selectedProperty.contactEmail}
                    </a>
                  </div>
                  {selectedProperty.contactPhone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="size-4 text-[#0A7A52]" />
                      <a href={`tel:${selectedProperty.contactPhone}`} className="text-[#0A7A52] hover:underline">
                        {selectedProperty.contactPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-[#0E0F0C] mb-2">
                    To apply for this property, you'll need to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-[#767570]">
                      <div className="size-5 rounded-full bg-[#0A7A52]/10 text-[#0A7A52] flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      Create an account or sign in
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#767570]">
                      <div className="size-5 rounded-full bg-[#0A7A52]/10 text-[#0A7A52] flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      Complete your profile and upload documents
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#767570]">
                      <div className="size-5 rounded-full bg-[#0A7A52]/10 text-[#0A7A52] flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      Submit your application for review
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#0A7A52]/5 rounded-lg border border-[#0A7A52]/20">
                  <p className="text-sm text-[#0E0F0C]">
                    <strong>AI-Powered Screening:</strong> Your application will be reviewed by our AI
                    system within 24 hours. You'll receive instant feedback and updates.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 px-6 py-3 border border-[#D1D0CC] text-[#0E0F0C] rounded-lg font-medium hover:bg-[#F8F7F4] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cancel
                </button>
                <Link
                  to="/tenant/application"
                  state={{ property: selectedProperty }}
                  className="flex-1 px-6 py-3 bg-[#0A7A52] hover:bg-[#085D3D] text-white rounded-lg font-medium transition-colors text-center"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Continue to Application
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
            <div className="p-6 border-b border-[#D1D0CC] flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <h2 
                className="text-2xl font-bold text-[#0E0F0C]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Create New Listing
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-[#F8F7F4] rounded-lg transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Property Title</label>
                  <input
                    type="text"
                    value={newListing.title}
                    onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                    placeholder="Modern Downtown 2BR Condo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Property Type</label>
                  <select
                    value={newListing.type}
                    onChange={(e) => setNewListing({ ...newListing, type: e.target.value as PropertyType })}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="student">Student Housing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Monthly Rent ($)</label>
                  <input
                    type="number"
                    value={newListing.rent}
                    onChange={(e) => setNewListing({ ...newListing, rent: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                    placeholder="2500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Address</label>
                  <input
                    type="text"
                    value={newListing.address}
                    onChange={(e) => setNewListing({ ...newListing, address: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                    placeholder="123 Main Street"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">City</label>
                  <input
                    type="text"
                    value={newListing.city}
                    onChange={(e) => setNewListing({ ...newListing, city: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                    placeholder="Toronto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Province</label>
                  <select
                    value={newListing.province}
                    onChange={(e) => setNewListing({ ...newListing, province: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                  >
                    <option value="ON">Ontario</option>
                    <option value="BC">British Columbia</option>
                    <option value="AB">Alberta</option>
                    <option value="QC">Quebec</option>
                    <option value="MB">Manitoba</option>
                    <option value="SK">Saskatchewan</option>
                  </select>
                </div>

                {newListing.type === "residential" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Bedrooms</label>
                      <input
                        type="number"
                        value={newListing.bedrooms}
                        onChange={(e) => setNewListing({ ...newListing, bedrooms: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Bathrooms</label>
                      <input
                        type="number"
                        step="0.5"
                        value={newListing.bathrooms}
                        onChange={(e) => setNewListing({ ...newListing, bathrooms: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Square Feet</label>
                  <input
                    type="number"
                    value={newListing.sqft}
                    onChange={(e) => setNewListing({ ...newListing, sqft: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                    placeholder="950"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Available Date</label>
                  <input
                    type="text"
                    value={newListing.available}
                    onChange={(e) => setNewListing({ ...newListing, available: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                    placeholder="Apr 1, 2026"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Description</label>
                  <textarea
                    value={newListing.description}
                    onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                    placeholder="Describe your property..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={newListing.contactEmail}
                    onChange={(e) => setNewListing({ ...newListing, contactEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                    placeholder="support@creova.one"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Contact Phone (Optional)</label>
                  <input
                    type="tel"
                    value={newListing.contactPhone}
                    onChange={(e) => setNewListing({ ...newListing, contactPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D0CC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                    placeholder="(416) 555-0100"
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newListing.featured}
                      onChange={(e) => setNewListing({ ...newListing, featured: e.target.checked })}
                      className="rounded border-[#D1D0CC]"
                    />
                    <span className="text-sm text-[#0E0F0C]">Mark as featured listing</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#D1D0CC] bg-[#F8F7F4] rounded-b-2xl flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border border-[#D1D0CC] bg-white text-[#0E0F0C] rounded-lg font-medium hover:bg-white transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateListing}
                className="flex-1 px-6 py-3 bg-[#0A7A52] hover:bg-[#085D3D] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Check className="size-5" />
                Create Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
