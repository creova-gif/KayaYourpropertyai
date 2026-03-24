import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  Home, Building, Building2, Layers, ChevronRight, ChevronLeft,
  Check, MapPin, BedDouble, Bath, SquareStack, Car, DollarSign,
  Calendar, Camera, Shield, Zap, Star, Wifi, Dumbbell, PawPrint,
  Wind, Flame, Tv, Package, Trees, Briefcase, Factory, Store
} from "lucide-react";

const G = "#0A7A52", GL = "#E5F4EE", BG = "#F8F7F4", TX = "#0E0F0C", MU = "#767570";
const BD = "rgba(0,0,0,0.07)";
const SERIF = "'Instrument Serif', Georgia, serif", SANS = "'DM Sans', system-ui, sans-serif";
const inp: CSSProperties = {
  width: "100%", padding: "11px 14px",
  border: `1px solid ${BD}`, borderRadius: 10,
  fontFamily: SANS, fontSize: 13, color: TX, outline: "none",
  background: "#fff", boxSizing: "border-box"
};
const label: CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700, color: MU,
  textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 6
};
const card: CSSProperties = {
  background: "#fff", border: `1px solid ${BD}`,
  borderRadius: 16, padding: 24
};

const COMMERCIAL_TYPES = ["office", "retail", "industrial", "mixed-use"];

const PROPERTY_TYPES = [
  { id: "condo", label: "Condo", sub: "High-rise unit in a complex", icon: Building2 },
  { id: "apartment", label: "Apartment", sub: "Purpose-built rental unit", icon: Building },
  { id: "house", label: "House", sub: "Detached or semi-detached", icon: Home },
  { id: "townhouse", label: "Townhouse", sub: "Multi-level row house", icon: Layers },
  { id: "basement", label: "Basement Suite", sub: "Lower-level unit", icon: SquareStack },
  { id: "office", label: "Office", sub: "Professional/commercial office space", icon: Briefcase },
  { id: "retail", label: "Retail", sub: "Storefront or retail unit", icon: Store },
  { id: "industrial", label: "Industrial", sub: "Warehouse or light industrial", icon: Factory },
  { id: "mixed-use", label: "Mixed-Use", sub: "Residential + commercial", icon: Building2 },
];

const AMENITIES = [
  { id: "parking", label: "Parking", icon: Car },
  { id: "laundry", label: "In-suite Laundry", icon: Package },
  { id: "gym", label: "Gym / Fitness", icon: Dumbbell },
  { id: "wifi", label: "Wi-Fi included", icon: Wifi },
  { id: "pet", label: "Pet Friendly", icon: PawPrint },
  { id: "ac", label: "Air Conditioning", icon: Wind },
  { id: "heat", label: "Heat included", icon: Flame },
  { id: "tv", label: "Cable / TV", icon: Tv },
  { id: "balcony", label: "Balcony / Patio", icon: Star },
  { id: "storage", label: "Storage Locker", icon: Package },
  { id: "concierge", label: "Concierge / Security", icon: Shield },
  { id: "backyard", label: "Backyard / Green Space", icon: Trees },
];

const STEPS = [
  "Property Type", "Location", "Details", "Amenities", "Pricing", "Review & Publish"
];

interface FormData {
  type: string;
  address: string; city: string; province: string; postalCode: string; unit: string;
  beds: number; baths: number; sqft: string; parking: number; floor: string;
  amenities: string[];
  title: string; description: string;
  rent: string; deposit: string; available: string; leaseType: string; petsAllowed: boolean;
  utilities: string[];
}

export function ListProperty() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    type: "", address: "", city: "Toronto", province: "ON", postalCode: "", unit: "",
    beds: 1, baths: 1, sqft: "", parking: 0, floor: "",
    amenities: [],
    title: "", description: "",
    rent: "", deposit: "", available: "", leaseType: "12-month", petsAllowed: false,
    utilities: [],
  });

  const set = (field: keyof FormData, val: any) => setForm(f => ({ ...f, [field]: val }));
  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  const isCommercial = COMMERCIAL_TYPES.includes(form.type);

  const canProceed = () => {
    if (step === 0) return !!form.type;
    if (step === 1) return !!(form.address && form.city && form.postalCode);
    if (step === 2) return isCommercial ? !!(form.sqft && form.leaseType) : !!(form.beds && form.baths);
    if (step === 3) return true;
    if (step === 4) return !!(form.rent && form.available);
    return true;
  };

  const next = () => { if (canProceed()) setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const publish = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1600));
    setSubmitting(false);
    toast.success("Property listed!", {
      description: `${form.title || form.type + " in " + form.city} is now live on Kaya. Tenants can tour and apply directly.`
    });
    navigate("/app/properties");
  };

  const progress = ((step) / (STEPS.length - 1)) * 100;

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: SANS }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${BD}`, padding: "20px 24px 0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", cursor: "pointer", color: MU, fontSize: 13, display: "flex", alignItems: "center", gap: 5, padding: 0, fontFamily: SANS }}>
              <ChevronLeft size={15} /> Back
            </button>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 12, color: MU }}>Step {step + 1} of {STEPS.length}</span>
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 28, color: TX, margin: "0 0 4px", letterSpacing: "-0.5px" }}>
            List a Property
          </h1>
          <p style={{ fontSize: 13, color: MU, margin: "0 0 20px" }}>
            Create your native Kaya listing — tenants can tour, apply, and get verified directly.
          </p>
          {/* Step tabs */}
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => i < step && setStep(i)}
                style={{
                  padding: "10px 14px", border: "none", background: "none", cursor: i < step ? "pointer" : "default",
                  fontSize: 12, fontWeight: 600, fontFamily: SANS, whiteSpace: "nowrap",
                  color: i === step ? G : i < step ? TX : MU,
                  borderBottom: `2px solid ${i === step ? G : "transparent"}`,
                  transition: "all .15s"
                }}
              >
                {i < step && <Check size={11} style={{ marginRight: 4 }} />}{s}
              </button>
            ))}
          </div>
          {/* Progress bar */}
          <div style={{ height: 2, background: BD }}>
            <div style={{ height: 2, background: G, width: `${progress}%`, transition: "width .4s" }} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 24px 120px" }}>

        {/* ── Step 0: Property Type ── */}
        {step === 0 && (
          <div style={card}>
            <h2 style={{ fontFamily: SERIF, fontSize: 22, color: TX, margin: "0 0 4px" }}>What type of property?</h2>
            <p style={{ fontSize: 13, color: MU, margin: "0 0 20px" }}>This helps us set the right defaults for your listing.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
              {PROPERTY_TYPES.map(t => {
                const Icon = t.icon;
                const sel = form.type === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => set("type", t.id)}
                    style={{
                      padding: "18px 16px", border: `2px solid ${sel ? G : BD}`,
                      borderRadius: 12, background: sel ? GL : "#fff",
                      cursor: "pointer", textAlign: "left", transition: "all .15s",
                      fontFamily: SANS
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: sel ? G : BG, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                      <Icon size={18} color={sel ? "#fff" : MU} strokeWidth={2} />
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: sel ? G : TX, margin: "0 0 3px" }}>{t.label}</p>
                    <p style={{ fontSize: 11, color: MU, margin: 0 }}>{t.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Step 1: Location ── */}
        {step === 1 && (
          <div style={card}>
            <h2 style={{ fontFamily: SERIF, fontSize: 22, color: TX, margin: "0 0 4px" }}>Where is it located?</h2>
            <p style={{ fontSize: 13, color: MU, margin: "0 0 20px" }}>The exact address is shown only after a tenant books a tour.</p>
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12 }}>
                <div>
                  <label style={label}>Street Address *</label>
                  <input value={form.address} onChange={e => set("address", e.target.value)} placeholder="e.g. 123 King St W" style={inp} />
                </div>
                <div>
                  <label style={label}>Unit / Suite</label>
                  <input value={form.unit} onChange={e => set("unit", e.target.value)} placeholder="e.g. 4B" style={{ ...inp, width: 90 }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label style={label}>City *</label>
                  <select value={form.city} onChange={e => set("city", e.target.value)} style={inp}>
                    {["Toronto","Ottawa","Hamilton","Kitchener","London","Windsor","Mississauga","Brampton","Barrie","Kingston","Sudbury"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={label}>Province</label>
                  <input value={form.province} readOnly style={{ ...inp, background: BG, color: MU }} />
                </div>
                <div>
                  <label style={label}>Postal Code *</label>
                  <input value={form.postalCode} onChange={e => set("postalCode", e.target.value.toUpperCase())} placeholder="M5V 2T6" maxLength={7} style={inp} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: 14, padding: "12px 14px", background: GL, borderRadius: 10, display: "flex", gap: 8, alignItems: "center" }}>
              <MapPin size={14} color={G} />
              <p style={{ fontSize: 12, color: G, margin: 0 }}>
                Kaya uses OpenStreetMap to geocode your listing and calculate walk/transit scores automatically.
              </p>
            </div>
          </div>
        )}

        {/* ── Step 2: Property Details ── */}
        {step === 2 && (
          <div style={card}>
            <h2 style={{ fontFamily: SERIF, fontSize: 22, color: TX, margin: "0 0 4px" }}>Property details</h2>
            <p style={{ fontSize: 13, color: MU, margin: "0 0 20px" }}>
              {COMMERCIAL_TYPES.includes(form.type)
                ? "Commercial unit details — sqft, lease structure, and CAM information."
                : "Accurate details attract more qualified applicants."}
            </p>

            {COMMERCIAL_TYPES.includes(form.type) ? (
              <div style={{ display: "grid", gap: 14 }}>
                <div style={{ padding: "10px 14px", background: "#EBF2FB", border: "1px solid #BFDBFE", borderRadius: 10, fontSize: 12, color: "#1E5FA8" }}>
                  💼 Commercial listing — HST applies at 13%. This unit will appear on the commercial listings section of Kaya.
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={label}>Total Square Footage *</label>
                    <input value={form.sqft} onChange={e => set("sqft", e.target.value)} type="number" placeholder="e.g. 1400" style={inp} />
                  </div>
                  <div>
                    <label style={label}>Lease Type *</label>
                    <select value={form.leaseType} onChange={e => set("leaseType", e.target.value)} style={inp}>
                      <option value="">Select lease type</option>
                      <option value="NNN">NNN (Triple Net) — tenant pays CAM, taxes, insurance</option>
                      <option value="Gross">Gross Lease — fixed rent, landlord covers all</option>
                      <option value="Modified Gross">Modified Gross — negotiated split</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={label}>Annual Base Rent ($/sqft/yr) *</label>
                    <input value={form.rent} onChange={e => set("rent", e.target.value)} type="number" placeholder="e.g. 38" style={inp} />
                  </div>
                  <div>
                    <label style={label}>CAM Estimate ($/sqft/yr)</label>
                    <input value={form.deposit} onChange={e => set("deposit", e.target.value)} type="number" placeholder="e.g. 12 (for NNN)" style={inp} />
                  </div>
                  <div>
                    <label style={label}>Available Date *</label>
                    <input value={form.available} onChange={e => set("available", e.target.value)} type="date" style={inp} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={label}>Floor / Level</label>
                    <input value={form.floor} onChange={e => set("floor", e.target.value)} placeholder="e.g. Ground, 3rd floor" style={inp} />
                  </div>
                  <div>
                    <label style={label}>Dedicated Parking Stalls</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[0,1,2,3,4].map(n => (
                        <button key={n} onClick={() => set("parking", n)}
                          style={{ minWidth: 40, padding: "8px 10px", border: `1.5px solid ${form.parking === n ? G : BD}`,
                            borderRadius: 8, background: form.parking === n ? G : "#fff", color: form.parking === n ? "#fff" : MU,
                            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
                  {[
                    { l: "Bedrooms *", key: "beds" as const, min: 0, max: 6, labels: ["Studio","1","2","3","4","5","6+"] },
                    { l: "Bathrooms *", key: "baths" as const, min: 1, max: 4, labels: ["1","1.5","2","2.5","3","4"] },
                    { l: "Parking Spots", key: "parking" as const, min: 0, max: 4, labels: ["0","1","2","3","4"] },
                  ].map(({ l, key, min, max, labels }) => (
                    <div key={key}>
                      <label style={label}>{l}</label>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {Array.from({ length: max - min + 1 }).map((_, i) => {
                          const val = min + i;
                          const sel = (form as any)[key] === val;
                          return (
                            <button key={val} onClick={() => set(key, val)}
                              style={{
                                minWidth: 40, padding: "8px 10px", border: `1.5px solid ${sel ? G : BD}`,
                                borderRadius: 8, background: sel ? G : "#fff",
                                color: sel ? "#fff" : MU, fontSize: 12, fontWeight: 600,
                                cursor: "pointer", fontFamily: SANS
                              }}>
                              {labels[i]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={label}>Square Footage</label>
                    <input value={form.sqft} onChange={e => set("sqft", e.target.value)} type="number" placeholder="e.g. 850" style={inp} />
                  </div>
                  <div>
                    <label style={label}>Floor / Level</label>
                    <input value={form.floor} onChange={e => set("floor", e.target.value)} placeholder="e.g. 12th floor" style={inp} />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Step 3: Amenities ── */}
        {step === 3 && (
          <div style={card}>
            <h2 style={{ fontFamily: SERIF, fontSize: 22, color: TX, margin: "0 0 4px" }}>Amenities & features</h2>
            <p style={{ fontSize: 13, color: MU, margin: "0 0 20px" }}>Select everything that's included or available to tenants.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8, marginBottom: 20 }}>
              {AMENITIES.map(a => {
                const Icon = a.icon;
                const sel = form.amenities.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => set("amenities", toggle(form.amenities, a.id))}
                    style={{
                      padding: "12px 14px", border: `1.5px solid ${sel ? G : BD}`,
                      borderRadius: 10, background: sel ? GL : "#fff",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 9,
                      fontFamily: SANS, transition: "all .15s"
                    }}
                  >
                    <Icon size={15} color={sel ? G : MU} strokeWidth={2} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: sel ? G : TX }}>{a.label}</span>
                    {sel && <Check size={12} color={G} style={{ marginLeft: "auto" }} />}
                  </button>
                );
              })}
            </div>

            <div>
              <label style={label}>Listing Title</label>
              <input
                value={form.title}
                onChange={e => set("title", e.target.value)}
                placeholder={`e.g. Bright ${form.beds}BR ${form.type || "unit"} in ${form.city}`}
                style={inp}
              />
              <p style={{ fontSize: 11, color: MU, marginTop: 4 }}>This is the headline tenants see first.</p>
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={label}>Description</label>
              <textarea
                value={form.description}
                onChange={e => set("description", e.target.value)}
                rows={4}
                placeholder="Describe the property, neighbourhood, and anything special about the unit..."
                style={{ ...inp, resize: "vertical" }}
              />
            </div>
          </div>
        )}

        {/* ── Step 4: Pricing ── */}
        {step === 4 && (
          <div style={{ display: "grid", gap: 14 }}>
            <div style={card}>
              <h2 style={{ fontFamily: SERIF, fontSize: 22, color: TX, margin: "0 0 4px" }}>Pricing & availability</h2>
              <p style={{ fontSize: 13, color: MU, margin: "0 0 20px" }}>
                {isCommercial ? "Set the monthly base rent and occupancy date. HST applies to all commercial rents in Ontario." : "Set the rent and move-in date. Ontario landlord rules apply."}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={label}>{isCommercial ? "Monthly Base Rent (CAD) *" : "Monthly Rent (CAD) *"}</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: MU, fontSize: 13 }}>$</span>
                    <input value={form.rent} onChange={e => set("rent", e.target.value)} type="number" placeholder={isCommercial ? "5,800" : "2,200"} style={{ ...inp, paddingLeft: 26 }} />
                  </div>
                </div>
                <div>
                  <label style={label}>{isCommercial ? "Security Deposit (CAD)" : "Last Month's Deposit (CAD)"}</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: MU, fontSize: 13 }}>$</span>
                    <input value={form.deposit} onChange={e => set("deposit", e.target.value)} type="number" placeholder={isCommercial ? "17,400" : "Same as rent"} style={{ ...inp, paddingLeft: 26 }} />
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={label}>{isCommercial ? "Occupancy Date *" : "Available From *"}</label>
                  <input value={form.available} onChange={e => set("available", e.target.value)} type="date" min={new Date().toISOString().split("T")[0]} style={inp} />
                </div>
                <div>
                  <label style={label}>Lease Structure</label>
                  {isCommercial ? (
                    <select value={form.leaseType} onChange={e => set("leaseType", e.target.value)} style={inp}>
                      <option value="NNN">NNN (Triple Net)</option>
                      <option value="Gross">Gross Lease</option>
                      <option value="Modified Gross">Modified Gross</option>
                    </select>
                  ) : (
                    <select value={form.leaseType} onChange={e => set("leaseType", e.target.value)} style={inp}>
                      <option value="12-month">12-Month Fixed</option>
                      <option value="month-to-month">Month-to-Month</option>
                      <option value="6-month">6-Month Fixed</option>
                      <option value="furnished">Furnished (short-term)</option>
                    </select>
                  )}
                </div>
              </div>
              {!isCommercial && (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    onClick={() => set("petsAllowed", !form.petsAllowed)}
                    style={{
                      width: 40, height: 22, borderRadius: 11, border: "none",
                      background: form.petsAllowed ? G : "#D1D5DB",
                      cursor: "pointer", position: "relative", transition: "background .2s",
                      flexShrink: 0
                    }}
                  >
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%", background: "#fff",
                      position: "absolute", top: 3, left: form.petsAllowed ? 21 : 3,
                      transition: "left .2s"
                    }} />
                  </button>
                  <span style={{ fontSize: 13, color: TX, fontWeight: 500 }}>Pets allowed</span>
                </div>
              )}
            </div>

            {/* Legal note */}
            <div style={{ ...card, background: GL, border: `1px solid ${G}33` }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Shield size={16} color={G} style={{ flexShrink: 0, marginTop: 2 }} />
                {isCommercial ? (
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: "0 0 4px" }}>Commercial Leasing — Ontario</p>
                    <p style={{ fontSize: 12, color: "#085040", margin: 0, lineHeight: 1.6 }}>
                      The <strong>Residential Tenancies Act does not apply</strong> to commercial leases. Rent increases, notice periods, and lease terms are governed by the commercial lease agreement. <strong>HST (13%)</strong> applies to all base rent and additional rent (CAM/TMI). Kaya generates HST-compliant invoices automatically.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: "0 0 4px" }}>Ontario Rent Guidelines — 2024</p>
                    <p style={{ fontSize: 12, color: "#085040", margin: 0, lineHeight: 1.6 }}>
                      For units first occupied after Nov 15, 2018: <strong>no rent increase cap applies</strong> under the Residential Tenancies Act.
                      For older units: the 2024 guideline is <strong>2.5%</strong>. Kaya automatically applies the correct rules to your rent history.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 5: Review & Publish ── */}
        {step === 5 && (
          <div style={{ display: "grid", gap: 14 }}>
            {/* Preview card */}
            <div style={{ ...card, overflow: "hidden" }}>
              <div style={{ margin: "-24px -24px 20px", height: 140, background: `linear-gradient(135deg, #0C0D0A 0%, ${G}22 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 }}>
                {form.type === "house" ? "🏡" : form.type === "townhouse" ? "🏘" : form.type === "basement" ? "🏠" : "🏢"}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <h3 style={{ fontFamily: SERIF, fontSize: 20, color: TX, margin: "0 0 4px" }}>
                    {form.title || `${form.beds === 0 ? "Studio" : form.beds + "BR"} ${form.type || "unit"} in ${form.city}`}
                  </h3>
                  <p style={{ fontSize: 12, color: MU, margin: 0 }}>{form.address}{form.unit ? ` #${form.unit}` : ""}, {form.city}, {form.province}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: SERIF, fontSize: 26, color: TX, margin: 0 }}>${form.rent ? Number(form.rent).toLocaleString() : "—"}</p>
                  <p style={{ fontSize: 11, color: MU, margin: 0 }}>/mo CAD</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, fontSize: 12, color: MU, marginBottom: 12 }}>
                {isCommercial ? (
                  <>{form.sqft && <span>{form.sqft} sqft</span>}{form.sqft && <span>·</span>}<span style={{ fontWeight: 600 }}>{form.leaseType || "Commercial"}</span></>
                ) : (
                  <><span>{form.beds === 0 ? "Studio" : `${form.beds} bed`}</span><span>·</span><span>{form.baths} bath</span>{form.sqft && <><span>·</span><span>{form.sqft} sqft</span></>}</>
                )}
                <span>·</span><span style={{ color: G, fontWeight: 600 }}>Avail {form.available || "TBD"}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {form.amenities.slice(0, 5).map(a => {
                  const am = AMENITIES.find(x => x.id === a);
                  return am ? <span key={a} style={{ background: BG, color: MU, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{am.label}</span> : null;
                })}
                {form.amenities.length > 5 && <span style={{ background: BG, color: MU, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>+{form.amenities.length - 5} more</span>}
              </div>
            </div>

            {/* Checklist */}
            <div style={card}>
              <h3 style={{ fontFamily: SERIF, fontSize: 16, color: TX, margin: "0 0 14px" }}>Before you publish</h3>
              {[
                { label: "Property type selected", done: !!form.type },
                { label: "Address entered", done: !!(form.address && form.city && form.postalCode) },
                isCommercial
                  ? { label: "Size & lease type set", done: !!(form.sqft && form.leaseType) }
                  : { label: "Beds & baths set", done: !!(form.beds !== undefined && form.baths) },
                { label: "Rent price entered", done: !!form.rent },
                { label: "Availability date set", done: !!form.available },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: `1px solid ${BD}` }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: c.done ? G : BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {c.done ? <Check size={11} color="#fff" strokeWidth={3} /> : <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D1D5DB", display: "block" }} />}
                  </div>
                  <span style={{ fontSize: 13, color: c.done ? TX : MU }}>{c.label}</span>
                </div>
              ))}
            </div>

            {/* What happens next */}
            <div style={{ ...card, background: GL, border: `1px solid ${G}33` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <Zap size={15} color={G} />
                <h3 style={{ fontSize: 13, fontWeight: 700, color: G, margin: 0 }}>What happens after you publish</h3>
              </div>
              {[
                "Your listing is live on Kaya's Ontario rental network",
                "Tenants can book tours and submit AI-screened applications",
                "Kaya Verified tenants get priority matching to your listing",
                "Income verification and credit checks happen automatically",
                "You'll be notified within minutes of qualified applicants"
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                  <span style={{ fontSize: 10, color: G, fontWeight: 700, marginTop: 2, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontSize: 12, color: "#085040" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div
          className="fixed bottom-0 right-0 left-0 lg:left-[252px]"
          style={{
            background: "#fff", borderTop: `1px solid ${BD}`,
            padding: "16px 24px", display: "flex", gap: 10, justifyContent: "flex-end",
            zIndex: 10
          }}
        >
          {step > 0 && (
            <button onClick={prev} style={{
              padding: "11px 24px", background: BG, border: `1px solid ${BD}`,
              borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
              color: MU, fontFamily: SANS, display: "flex", alignItems: "center", gap: 6
            }}>
              <ChevronLeft size={14} /> Previous
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              disabled={!canProceed()}
              style={{
                padding: "11px 28px", background: canProceed() ? G : "#D1D5DB",
                border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700,
                cursor: canProceed() ? "pointer" : "not-allowed", color: "#fff",
                fontFamily: SANS, display: "flex", alignItems: "center", gap: 6
              }}>
              Continue <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={publish}
              disabled={submitting}
              style={{
                padding: "11px 32px", background: submitting ? MU : G,
                border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700,
                cursor: submitting ? "wait" : "pointer", color: "#fff", fontFamily: SANS
              }}>
              {submitting ? "Publishing…" : "🚀 Publish Listing"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
