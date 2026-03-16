import { Building2, Home, Users, DollarSign, Plus, MapPin, Bed, Bath, Edit, Trash2, Eye, X, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Properties() {
  const navigate = useNavigate();
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showAddUnit, setShowAddUnit] = useState<number | null>(null);
  const [newProperty, setNewProperty] = useState({
    address: "",
    city: "",
    province: "ON",
    type: "Condo",
  });
  const [newUnit, setNewUnit] = useState({
    number: "",
    bedrooms: 1,
    bathrooms: 1,
    rent: 0,
  });

  const [properties, setProperties] = useState([
    {
      id: 1,
      address: "123 King Street",
      city: "Toronto",
      province: "ON",
      type: "Condo",
      units: [
        { number: "4A", bedrooms: 2, bathrooms: 1, rent: 2300, status: "occupied", tenant: "John Doe" },
        { number: "5A", bedrooms: 2, bathrooms: 1, rent: 2400, status: "available", tenant: null },
      ]
    },
    {
      id: 2,
      address: "456 Queen Street West",
      city: "Toronto",
      province: "ON",
      type: "Apartment Building",
      units: [
        { number: "1C", bedrooms: 3, bathrooms: 2, rent: 2800, status: "occupied", tenant: "Alice Smith" },
        { number: "2B", bedrooms: 1, bathrooms: 1, rent: 1950, status: "available", tenant: null },
        { number: "3A", bedrooms: 2, bathrooms: 1, rent: 2200, status: "occupied", tenant: "Bob Johnson" },
      ]
    },
    {
      id: 3,
      address: "789 Bloor Street",
      city: "Toronto",
      province: "ON",
      type: "Townhouse",
      units: [
        { number: "Unit 1", bedrooms: 3, bathrooms: 2.5, rent: 3200, status: "occupied", tenant: "Emma Wilson" },
        { number: "Unit 2", bedrooms: 3, bathrooms: 2.5, rent: 3200, status: "occupied", tenant: "David Lee" },
      ]
    },
  ]);

  const totalUnits = properties.reduce((sum, prop) => sum + prop.units.length, 0);
  const occupiedUnits = properties.reduce((sum, prop) => 
    sum + prop.units.filter(u => u.status === "occupied").length, 0
  );
  const monthlyRevenue = properties.reduce((sum, prop) => 
    sum + prop.units.filter(u => u.status === "occupied").reduce((s, u) => s + u.rent, 0), 0
  );

  const handleAddProperty = () => {
    if (!newProperty.address || !newProperty.city) return;
    
    const property = {
      id: properties.length + 1,
      ...newProperty,
      units: [],
    };
    
    setProperties([...properties, property]);
    setNewProperty({ address: "", city: "", province: "ON", type: "Condo" });
    setShowAddProperty(false);
  };

  const handleAddUnit = (propertyId: number) => {
    if (!newUnit.number || !newUnit.rent) return;
    
    setProperties(properties.map(prop => {
      if (prop.id === propertyId) {
        return {
          ...prop,
          units: [...prop.units, { ...newUnit, status: "available", tenant: null }]
        };
      }
      return prop;
    }));
    
    setNewUnit({ number: "", bedrooms: 1, bathrooms: 1, rent: 0 });
    setShowAddUnit(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Properties</h1>
            <p className="mt-2 text-slate-600">Manage your rental properties and units</p>
          </div>
          <button 
            onClick={() => navigate("/properties/add")}
            className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-200"
          >
            <Plus className="size-5" />
            Add Property
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-50">
                <Building2 className="size-5 text-indigo-600" />
              </div>
              <span className="text-sm text-slate-600">Total Properties</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{properties.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-50">
                <Home className="size-5 text-green-600" />
              </div>
              <span className="text-sm text-slate-600">Occupancy Rate</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {Math.round((occupiedUnits / totalUnits) * 100)}%
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-50">
                <DollarSign className="size-5 text-purple-600" />
              </div>
              <span className="text-sm text-slate-600">Monthly Revenue</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">${monthlyRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Properties List */}
        <div className="space-y-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{property.address}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="size-4" />
                      <span>{property.city}, {property.province}</span>
                      <span className="mx-2">•</span>
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium">
                        {property.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 mb-1">Units</p>
                    <p className="text-2xl font-bold text-slate-900">{property.units.length}</p>
                  </div>
                </div>
              </div>

              {/* Units Grid */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">Units</h4>
                  <button
                    onClick={() => setShowAddUnit(property.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-medium transition-colors"
                  >
                    <Plus className="size-4" />
                    Add Unit
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {property.units.map((unit) => (
                    <div
                      key={unit.number}
                      className={`p-4 rounded-lg border-2 ${
                        unit.status === "occupied"
                          ? "border-green-200 bg-green-50"
                          : "border-indigo-200 bg-indigo-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-900">{unit.number}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          unit.status === "occupied"
                            ? "bg-green-100 text-green-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}>
                          {unit.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Bed className="size-4" />
                          <span>{unit.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="size-4" />
                          <span>{unit.bathrooms}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Rent</span>
                        <span className="font-bold text-slate-900">${unit.rent.toLocaleString()}</span>
                      </div>

                      {unit.tenant && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="size-4 text-slate-400" />
                            <span className="text-slate-700">{unit.tenant}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Property Modal */}
      {showAddProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Add New Property</h2>
              <button
                onClick={() => setShowAddProperty(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="size-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Address *
                </label>
                <input
                  type="text"
                  value={newProperty.address}
                  onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={newProperty.city}
                    onChange={(e) => setNewProperty({ ...newProperty, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Toronto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Province *
                  </label>
                  <select
                    value={newProperty.province}
                    onChange={(e) => setNewProperty({ ...newProperty, province: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ON">Ontario</option>
                    <option value="BC">British Columbia</option>
                    <option value="AB">Alberta</option>
                    <option value="QC">Quebec</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Type *
                </label>
                <select
                  value={newProperty.type}
                  onChange={(e) => setNewProperty({ ...newProperty, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Condo">Condo</option>
                  <option value="Apartment Building">Apartment Building</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="House">House</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddProperty(false)}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProperty}
                disabled={!newProperty.address || !newProperty.city}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  newProperty.address && newProperty.city
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Add Property
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Unit Modal */}
      {showAddUnit !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Add New Unit</h2>
              <button
                onClick={() => setShowAddUnit(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="size-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Unit Number *
                </label>
                <input
                  type="text"
                  value={newUnit.number}
                  onChange={(e) => setNewUnit({ ...newUnit, number: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="4A"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bedrooms *
                  </label>
                  <select
                    value={newUnit.bedrooms}
                    onChange={(e) => setNewUnit({ ...newUnit, bedrooms: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="0">Studio</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bathrooms *
                  </label>
                  <select
                    value={newUnit.bathrooms}
                    onChange={(e) => setNewUnit({ ...newUnit, bathrooms: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="1">1 Bath</option>
                    <option value="1.5">1.5 Baths</option>
                    <option value="2">2 Baths</option>
                    <option value="2.5">2.5 Baths</option>
                    <option value="3">3+ Baths</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Rent *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <input
                    type="number"
                    value={newUnit.rent || ""}
                    onChange={(e) => setNewUnit({ ...newUnit, rent: parseInt(e.target.value) || 0 })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="2300"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddUnit(null)}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddUnit(showAddUnit)}
                disabled={!newUnit.number || !newUnit.rent}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  newUnit.number && newUnit.rent
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Add Unit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}