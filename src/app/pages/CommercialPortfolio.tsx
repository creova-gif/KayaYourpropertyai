import { useState } from "react";
import { Building2, Users, DollarSign, Plus, MapPin, TrendingUp, BarChart3, CheckCircle, Clock, AlertCircle, X, ChevronRight, Briefcase, Layers, FileText, ShoppingBag, Package, Store } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570",BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const inp:React.CSSProperties={width:"100%",padding:"10px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:"#fff",boxSizing:"border-box"};

type LeaseType = "gross" | "nnn" | "modified";
type PropertyClass = "A" | "B" | "C";
type UnitStatus = "leased" | "vacant" | "pending" | "holdover";

interface CommercialUnit {
  id: string;
  suite: string;
  type: "office" | "retail" | "warehouse" | "flex" | "ground-floor";
  sqft: number;
  monthlyRent: number;
  cam: number;
  leaseType: LeaseType;
  status: UnitStatus;
  tenant: string | null;
  tenantBiz: string | null;
  leaseStart: string | null;
  leaseEnd: string | null;
  availDate: string;
}

interface CommercialProperty {
  id: number;
  name: string;
  address: string;
  city: string;
  province: string;
  class: PropertyClass;
  totalSqft: number;
  yearBuilt: number;
  amenities: string[];
  units: CommercialUnit[];
}

const PROPERTIES: CommercialProperty[] = [
  {
    id: 1,
    name: "King Street Commerce Centre",
    address: "123 King Street West",
    city: "Toronto",
    province: "ON",
    class: "A",
    totalSqft: 42000,
    yearBuilt: 2018,
    amenities: ["24/7 Security", "Underground Parking", "Gym", "Conference Rooms", "Rooftop Terrace", "EV Charging"],
    units: [
      { id: "u1", suite: "Suite 200", type: "office", sqft: 3200, monthlyRent: 8000, cam: 1440, leaseType: "nnn", status: "leased", tenant: "Maple Tech Inc.", tenantBiz: "Software Development", leaseStart: "2023-01-01", leaseEnd: "2026-12-31", availDate: "Jan 2027" },
      { id: "u2", suite: "Suite 300", type: "office", sqft: 4800, monthlyRent: 12000, cam: 2160, leaseType: "nnn", status: "leased", tenant: "Riverview Capital", tenantBiz: "Financial Services", leaseStart: "2022-06-01", leaseEnd: "2027-05-31", availDate: "Jun 2027" },
      { id: "u3", suite: "Suite 400", type: "office", sqft: 6000, monthlyRent: 15500, cam: 2700, leaseType: "nnn", status: "vacant", tenant: null, tenantBiz: null, leaseStart: null, leaseEnd: null, availDate: "Immediate" },
      { id: "u4", suite: "Ground Floor Retail A", type: "retail", sqft: 1800, monthlyRent: 7200, cam: 810, leaseType: "gross", status: "leased", tenant: "Pulse Coffee Roasters", tenantBiz: "Food & Beverage", leaseStart: "2023-03-01", leaseEnd: "2028-02-28", availDate: "Mar 2028" },
      { id: "u5", suite: "Ground Floor Retail B", type: "retail", sqft: 1200, monthlyRent: 4800, cam: 540, leaseType: "gross", status: "pending", tenant: "Saffron Kitchen", tenantBiz: "Restaurant", leaseStart: null, leaseEnd: null, availDate: "Apr 1, 2026" },
    ],
  },
  {
    id: 2,
    name: "Queensway Industrial Park",
    address: "890 Queensway East",
    city: "Mississauga",
    province: "ON",
    class: "B",
    totalSqft: 120000,
    yearBuilt: 2005,
    amenities: ["Dock-Level Loading", "Drive-In Doors", "3-Phase Power", "24/7 Access", "Yard Space", "Sprinkler System"],
    units: [
      { id: "w1", suite: "Bay A", type: "warehouse", sqft: 18000, monthlyRent: 22500, cam: 3600, leaseType: "nnn", status: "leased", tenant: "Ontario Logistics Co.", tenantBiz: "3PL / Warehousing", leaseStart: "2022-01-01", leaseEnd: "2026-12-31", availDate: "Jan 2027" },
      { id: "w2", suite: "Bay B", type: "warehouse", sqft: 18000, monthlyRent: 22500, cam: 3600, leaseType: "nnn", status: "leased", tenant: "GreenPack Solutions", tenantBiz: "Packaging & Distribution", leaseStart: "2023-07-01", leaseEnd: "2028-06-30", availDate: "Jul 2028" },
      { id: "w3", suite: "Bay C", type: "warehouse", sqft: 24000, monthlyRent: 28800, cam: 4800, leaseType: "nnn", status: "leased", tenant: "AutoParts North", tenantBiz: "Automotive Parts", leaseStart: "2021-04-01", leaseEnd: "2026-03-31", availDate: "Apr 2026" },
      { id: "w4", suite: "Bay D", type: "warehouse", sqft: 18000, monthlyRent: 21600, cam: 3600, leaseType: "nnn", status: "holdover", tenant: "Flex Storage Inc.", tenantBiz: "Self-Storage", leaseStart: "2020-01-01", leaseEnd: "2025-12-31", availDate: "Immediate" },
      { id: "w5", suite: "Flex Unit 1", type: "flex", sqft: 5000, monthlyRent: 7500, cam: 1000, leaseType: "modified", status: "vacant", tenant: null, tenantBiz: null, leaseStart: null, leaseEnd: null, availDate: "Immediate" },
    ],
  },
  {
    id: 3,
    name: "Rideau Commerce Plaza",
    address: "200 Rideau Street",
    city: "Ottawa",
    province: "ON",
    class: "B",
    totalSqft: 31000,
    yearBuilt: 2010,
    amenities: ["Underground Parking", "Concierge", "Board Rooms", "Bike Storage", "Food Court"],
    units: [
      { id: "o1", suite: "Suite 101", type: "office", sqft: 2200, monthlyRent: 5500, cam: 880, leaseType: "nnn", status: "leased", tenant: "FederalConsult Group", tenantBiz: "Government Consulting", leaseStart: "2024-01-01", leaseEnd: "2027-12-31", availDate: "Jan 2028" },
      { id: "o2", suite: "Suite 102", type: "office", sqft: 1800, monthlyRent: 4500, cam: 720, leaseType: "nnn", status: "vacant", tenant: null, tenantBiz: null, leaseStart: null, leaseEnd: null, availDate: "Immediate" },
      { id: "o3", suite: "Suite 200 — Full Floor", type: "office", sqft: 8800, monthlyRent: 19800, cam: 3520, leaseType: "nnn", status: "leased", tenant: "Clarity Health Services", tenantBiz: "Healthcare Technology", leaseStart: "2023-05-01", leaseEnd: "2028-04-30", availDate: "May 2028" },
      { id: "o4", suite: "Retail Row A", type: "retail", sqft: 1400, monthlyRent: 4200, cam: 560, leaseType: "gross", status: "leased", tenant: "The Daily Grind", tenantBiz: "Café", leaseStart: "2024-02-01", leaseEnd: "2027-01-31", availDate: "Feb 2027" },
    ],
  },
];

const TEAM = [
  { name: "Dominique Leblanc", role: "Portfolio Director", properties: [1, 2, 3], avatar: "DL" },
  { name: "Sarah Kim", role: "Leasing Manager", properties: [1, 3], avatar: "SK" },
  { name: "Marcus Osei", role: "Facilities Manager", properties: [2], avatar: "MO" },
  { name: "Priya Nair", role: "Property Accountant", properties: [1, 2, 3], avatar: "PN" },
];

const LEASE_LABEL: Record<LeaseType, string> = { gross: "Gross Lease", nnn: "NNN", modified: "Modified Gross" };
const STATUS_CONFIG: Record<UnitStatus, { label: string; bg: string; color: string }> = {
  leased: { label: "Leased", bg: "#E5F4EE", color: G },
  vacant: { label: "Vacant", bg: "#FDECEA", color: "#C0392B" },
  pending: { label: "Pending", bg: "#FEF3C7", color: "#B45309" },
  holdover: { label: "Holdover", bg: "#EBF2FB", color: "#1E5FA8" },
};
const CLASS_CONFIG: Record<PropertyClass, { bg: string; color: string }> = {
  A: { bg: GL, color: G },
  B: { bg: "#EBF2FB", color: "#1E5FA8" },
  C: { bg: "#F3F0FF", color: "#6D28D9" },
};
const TYPE_ICON: Record<string, React.ComponentType<{size?:number;color?:string}>> = {
  office: Building2, retail: ShoppingBag, warehouse: Package, flex: Layers, "ground-floor": Store,
};

function Stat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 14, padding: "20px 22px" }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 8px" }}>{label}</p>
      <p style={{ fontFamily: SERIF, fontSize: 36, color: accent ? G : TX, lineHeight: 1, margin: 0 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: MU, margin: "4px 0 0" }}>{sub}</p>}
    </div>
  );
}

function InquireModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ company: "", contact: "", email: "", sqft: "", use: "", timeline: "0–3 months" });
  const [sent, setSent] = useState(false);
  const up = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (!form.company || !form.contact || !form.email) return;
    setSent(true);
  };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: 28, width: "100%", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.18)", maxHeight: "90vh", overflowY: "auto" }}>
        {!sent ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: SERIF, fontSize: 22, color: TX, margin: 0 }}>Commercial Inquiry</h3>
              <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: MU }}>✕</button>
            </div>
            {[{ label: "Company Name *", key: "company", ph: "Maple Tech Inc." }, { label: "Contact Name *", key: "contact", ph: "Jane Smith" }, { label: "Email *", key: "email", ph: "jane@company.com" }, { label: "Space Required (sqft)", key: "sqft", ph: "e.g. 3000" }].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 5 }}>{f.label}</label>
                <input value={(form as any)[f.key]} onChange={up(f.key)} placeholder={f.ph} style={inp} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 5 }}>Intended Use</label>
              <select value={form.use} onChange={up("use")} style={inp}>
                <option value="">Select use type</option>
                <option>Corporate Office</option>
                <option>Retail / Showroom</option>
                <option>Warehouse / Distribution</option>
                <option>Medical / Healthcare</option>
                <option>Technology / Startup</option>
                <option>Mixed Use</option>
              </select>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 5 }}>Desired Move-in</label>
              <select value={form.timeline} onChange={up("timeline")} style={inp}>
                {["0–3 months", "3–6 months", "6–12 months", "Flexible"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={onClose} style={{ flex: 1, padding: "11px", background: BG, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: MU }}>Cancel</button>
              <button onClick={submit} style={{ flex: 2, padding: "11px", background: TX, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#fff" }}>Send Inquiry</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom: 14 }}><CheckCircle size={44} color={G}/></div>
            <p style={{ fontFamily: SERIF, fontSize: 20, color: TX, marginBottom: 6 }}>Inquiry Sent!</p>
            <p style={{ fontSize: 13, color: MU }}>Our leasing team will contact you within 1 business day.</p>
            <button onClick={onClose} style={{ marginTop: 20, padding: "10px 28px", background: G, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AddPropertyModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: CommercialProperty) => void }) {
  const [form, setForm] = useState({ name: "", address: "", city: "", province: "ON", class: "B" as PropertyClass, sqft: "", yearBuilt: "" });
  const up = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (!form.name || !form.address || !form.city) return;
    onAdd({
      id: Date.now(),
      name: form.name,
      address: form.address,
      city: form.city,
      province: form.province,
      class: form.class,
      totalSqft: parseInt(form.sqft) || 0,
      yearBuilt: parseInt(form.yearBuilt) || new Date().getFullYear(),
      amenities: [],
      units: [],
    });
    onClose();
  };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: 28, width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontFamily: SERIF, fontSize: 22, color: TX, margin: 0 }}>Add Commercial Property</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: MU }}>✕</button>
        </div>
        {[{ label: "Property Name *", key: "name", ph: "King Street Commerce Centre" }, { label: "Street Address *", key: "address", ph: "123 King Street West" }, { label: "City *", key: "city", ph: "Toronto" }, { label: "Total Sqft", key: "sqft", ph: "42000" }, { label: "Year Built", key: "yearBuilt", ph: "2018" }].map(f => (
          <div key={f.key} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 5 }}>{f.label}</label>
            <input value={(form as any)[f.key]} onChange={up(f.key)} placeholder={f.ph} style={inp} />
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 5 }}>Province</label>
            <select value={form.province} onChange={up("province")} style={inp}>
              {["ON", "BC", "AB", "QC", "MB", "SK", "NS"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 5 }}>Building Class</label>
            <select value={form.class} onChange={up("class")} style={inp}>
              <option value="A">Class A</option>
              <option value="B">Class B</option>
              <option value="C">Class C</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", background: BG, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: MU }}>Cancel</button>
          <button onClick={submit} style={{ flex: 2, padding: "11px", background: G, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#fff" }}>Add Property</button>
        </div>
      </div>
    </div>
  );
}

export function CommercialPortfolio() {
  const [properties, setProperties] = useState<CommercialProperty[]>(PROPERTIES);
  const [activeTab, setActiveTab] = useState<"portfolio" | "leases" | "team">("portfolio");
  const [expanded, setExpanded] = useState<number | null>(1);
  const [showInquire, setShowInquire] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const totalSqft = properties.reduce((s, p) => s + p.totalSqft, 0);
  const totalUnits = properties.reduce((s, p) => s + p.units.length, 0);
  const leasedUnits = properties.flatMap(p => p.units).filter(u => u.status === "leased").length;
  const vacantUnits = properties.flatMap(p => p.units).filter(u => u.status === "vacant").length;
  const monthlyRevenue = properties.flatMap(p => p.units).filter(u => u.status === "leased").reduce((s, u) => s + u.monthlyRent + u.cam, 0);
  const occupancyRate = totalUnits > 0 ? Math.round((leasedUnits / totalUnits) * 100) : 0;
  const leasedSqft = properties.flatMap(p => p.units).filter(u => u.status === "leased").reduce((s, u) => s + u.sqft, 0);

  const allUnits = properties.flatMap(p => p.units.map(u => ({ ...u, propertyName: p.name, city: p.city })));
  const expiringSoon = allUnits.filter(u => {
    if (!u.leaseEnd) return false;
    const end = new Date(u.leaseEnd);
    const diff = (end.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 365;
  });

  const tabs = [
    { id: "portfolio" as const, label: "Portfolio", icon: Building2 },
    { id: "leases" as const, label: "Lease Tracker", icon: FileText },
    { id: "team" as const, label: "Team", icon: Users },
  ];

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: SANS }}>
      {/* Header */}
      <div style={{ marginBottom: 0 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", margin: "0 0 8px" }}>Commercial Real Estate</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: SERIF, fontSize: 44, color: TX, margin: "0 0 4px", lineHeight: 1, letterSpacing: "-1px" }}>
              Commercial <em style={{ color: G, fontStyle: "italic" }}>Portfolio</em>
            </h1>
            <p style={{ fontSize: 14, color: MU, margin: 0 }}>{properties.length} properties · Ontario Enterprise Management</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setShowInquire(true)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#fff", border: `1px solid ${BD}`, borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: TX }}
            >
              <Briefcase size={15} /> Tenant Inquiry
            </button>
            <button
              onClick={() => setShowAdd(true)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: G, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#fff" }}
            >
              <Plus size={15} /> Add Property
            </button>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12, margin: "24px 0" }}>
        <Stat label="Total Properties" value={`${properties.length}`} sub={`${properties.map(p => p.city).filter((c, i, a) => a.indexOf(c) === i).length} cities`} />
        <Stat label="Portfolio Sqft" value={`${(totalSqft / 1000).toFixed(0)}K`} sub={`${(leasedSqft / 1000).toFixed(0)}K leased`} accent />
        <Stat label="Occupancy" value={`${occupancyRate}%`} sub={`${leasedUnits} of ${totalUnits} units`} />
        <Stat label="Monthly Revenue" value={`$${(monthlyRevenue / 1000).toFixed(0)}K`} sub="Base + CAM" accent />
        <Stat label="Vacant Units" value={`${vacantUnits}`} sub={`${properties.flatMap(p => p.units).filter(u => u.status === "pending").length} pending`} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "#fff", border: `1px solid ${BD}`, borderRadius: 12, padding: 4, width: "fit-content", marginBottom: 24 }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 18px",
              background: activeTab === t.id ? G : "transparent",
              color: activeTab === t.id ? "#fff" : MU,
              border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s"
            }}
          >
            <t.icon size={14} />{t.label}
          </button>
        ))}
      </div>

      {/* Portfolio Tab */}
      {activeTab === "portfolio" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {properties.map(prop => {
            const propLeasedUnits = prop.units.filter(u => u.status === "leased").length;
            const propMonthly = prop.units.filter(u => u.status === "leased").reduce((s, u) => s + u.monthlyRent + u.cam, 0);
            const propOcc = prop.units.length > 0 ? Math.round((propLeasedUnits / prop.units.length) * 100) : 0;
            const isOpen = expanded === prop.id;
            const cc = CLASS_CONFIG[prop.class];
            return (
              <div key={prop.id} style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 16, overflow: "hidden" }}>
                {/* Property Header */}
                <div
                  onClick={() => setExpanded(isOpen ? null : prop.id)}
                  style={{ padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ background: cc.bg, color: cc.color, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.5px" }}>Class {prop.class}</span>
                      <span style={{ fontSize: 11, color: MU }}>Built {prop.yearBuilt}</span>
                    </div>
                    <h3 style={{ fontFamily: SERIF, fontSize: 22, color: TX, margin: "0 0 4px", lineHeight: 1.2 }}>{prop.name}</h3>
                    <p style={{ fontSize: 12, color: MU, margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={11} />{prop.address}, {prop.city}, {prop.province}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 24, alignItems: "center", flexShrink: 0 }}>
                    {[
                      ["Sqft", `${(prop.totalSqft / 1000).toFixed(0)}K`],
                      ["Units", prop.units.length],
                      ["Occupancy", `${propOcc}%`],
                      ["Monthly", `$${(propMonthly / 1000).toFixed(1)}K`],
                    ].map(([k, v]) => (
                      <div key={k} style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 2px" }}>{k}</p>
                        <p style={{ fontFamily: SERIF, fontSize: 18, color: TX, margin: 0 }}>{v}</p>
                      </div>
                    ))}
                    <ChevronRight size={18} color={MU} style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .2s" }} />
                  </div>
                </div>

                {/* Units */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${BD}`, padding: "20px 24px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                      {prop.amenities.map(a => (
                        <span key={a} style={{ background: BG, color: MU, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 500 }}>{a}</span>
                      ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 12 }}>
                      {prop.units.map(unit => {
                        const sc = STATUS_CONFIG[unit.status];
                        return (
                          <div key={unit.id} style={{ background: BG, borderRadius: 12, padding: "14px 16px", border: unit.status === "holdover" ? "1.5px solid #1E5FA844" : `1px solid ${BD}` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                                  {(()=>{const TI=TYPE_ICON[unit.type]||Building2;return<TI size={14} color={MU}/>;})()}
                                  <p style={{ fontSize: 14, fontWeight: 700, color: TX, margin: 0 }}>{unit.suite}</p>
                                </div>
                                <p style={{ fontSize: 11, color: MU, margin: 0 }}>{unit.sqft.toLocaleString()} sqft · {LEASE_LABEL[unit.leaseType]}</p>
                              </div>
                              <span style={{ background: sc.bg, color: sc.color, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{sc.label}</span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                              <div style={{ background: "#fff", borderRadius: 8, padding: "8px 10px" }}>
                                <p style={{ fontSize: 9, color: MU, margin: "0 0 2px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.4px" }}>Base Rent</p>
                                <p style={{ fontSize: 16, fontWeight: 700, color: TX, margin: 0 }}>${unit.monthlyRent.toLocaleString()}<span style={{ fontSize: 10, fontWeight: 400, color: MU }}>/mo</span></p>
                              </div>
                              <div style={{ background: "#fff", borderRadius: 8, padding: "8px 10px" }}>
                                <p style={{ fontSize: 9, color: MU, margin: "0 0 2px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.4px" }}>CAM Charges</p>
                                <p style={{ fontSize: 16, fontWeight: 700, color: MU, margin: 0 }}>${unit.cam.toLocaleString()}<span style={{ fontSize: 10, fontWeight: 400, color: MU }}>/mo</span></p>
                              </div>
                            </div>
                            {unit.tenant ? (
                              <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 10 }}>
                                <p style={{ fontSize: 12, fontWeight: 600, color: TX, margin: "0 0 2px" }}>{unit.tenant}</p>
                                <p style={{ fontSize: 11, color: MU, margin: "0 0 4px" }}>{unit.tenantBiz}</p>
                                <p style={{ fontSize: 10, color: MU, margin: 0 }}>
                                  Lease: {unit.leaseStart} → {unit.leaseEnd}
                                </p>
                              </div>
                            ) : (
                              <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 10 }}>
                                <p style={{ fontSize: 11, color: G, fontWeight: 600, margin: 0 }}>Available: {unit.availDate}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Lease Tracker Tab */}
      {activeTab === "leases" && (
        <div>
          {expiringSoon.length > 0 && (
            <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B44", borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
              <AlertCircle size={18} color="#B45309" />
              <p style={{ fontSize: 13, color: "#92400E", margin: 0, fontWeight: 500 }}>
                <strong>{expiringSoon.length} lease{expiringSoon.length > 1 ? "s" : ""}</strong> expiring within 12 months — begin renewal conversations early.
              </p>
            </div>
          )}
          <div style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 16, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${BD}` }}>
                  {["Property", "Suite", "Tenant", "Sqft", "Base Rent", "CAM", "Lease Type", "Expiry", "Status"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allUnits.map((u, i) => {
                  const sc = STATUS_CONFIG[u.status];
                  const isExpiring = u.leaseEnd && (() => {
                    const diff = (new Date(u.leaseEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                    return diff >= 0 && diff <= 365;
                  })();
                  return (
                    <tr key={u.id} style={{ borderBottom: i < allUnits.length - 1 ? `1px solid ${BD}` : "none", background: isExpiring ? "#FFFBEB" : "#fff" }}>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: TX, fontWeight: 500 }}>{u.propertyName}<br /><span style={{ color: MU, fontWeight: 400 }}>{u.city}</span></td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: TX }}>{u.suite}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12 }}>
                        {u.tenant ? (
                          <><span style={{ fontWeight: 600, color: TX }}>{u.tenant}</span><br /><span style={{ color: MU }}>{u.tenantBiz}</span></>
                        ) : <span style={{ color: MU }}>—</span>}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: TX }}>{u.sqft.toLocaleString()}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: TX }}>${u.monthlyRent.toLocaleString()}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: MU }}>${u.cam.toLocaleString()}</td>
                      <td style={{ padding: "12px 16px", fontSize: 11 }}>
                        <span style={{ background: BG, color: MU, padding: "3px 8px", borderRadius: 6, fontWeight: 500 }}>{LEASE_LABEL[u.leaseType]}</span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12 }}>
                        {u.leaseEnd ? (
                          <span style={{ color: isExpiring ? "#B45309" : TX, fontWeight: isExpiring ? 700 : 400 }}>
                            {isExpiring && "⚠ "}{u.leaseEnd}
                          </span>
                        ) : <span style={{ color: MU }}>—</span>}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: sc.bg, color: sc.color, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{sc.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary below table */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12, marginTop: 20 }}>
            {[
              { label: "Total Leases", value: `${allUnits.filter(u => u.status === "leased").length}`, icon: CheckCircle, color: G },
              { label: "Expiring < 12 mo", value: `${expiringSoon.length}`, icon: Clock, color: "#B45309" },
              { label: "Vacant / Available", value: `${allUnits.filter(u => u.status === "vacant").length}`, icon: AlertCircle, color: "#C0392B" },
              { label: "In Holdover", value: `${allUnits.filter(u => u.status === "holdover").length}`, icon: AlertCircle, color: "#1E5FA8" },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                <s.icon size={20} color={s.color} />
                <div>
                  <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 2px" }}>{s.label}</p>
                  <p style={{ fontFamily: SERIF, fontSize: 22, color: TX, margin: 0 }}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === "team" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14, marginBottom: 28 }}>
            {TEAM.map(m => (
              <div key={m.name} style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 14, padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: GL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: G, flexShrink: 0 }}>
                    {m.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: TX, margin: "0 0 2px" }}>{m.name}</p>
                    <p style={{ fontSize: 12, color: MU, margin: 0 }}>{m.role}</p>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 8px" }}>Manages</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {m.properties.map(pid => {
                      const prop = properties.find(p => p.id === pid);
                      return prop ? (
                        <div key={pid} style={{ background: BG, borderRadius: 8, padding: "6px 10px", fontSize: 11, color: TX }}>
                          {prop.name} · <span style={{ color: MU }}>{prop.city}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            ))}
            {/* Add member placeholder */}
            <button style={{ background: "#fff", border: `1.5px dashed ${BD}`, borderRadius: 14, padding: "20px 22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: MU, fontSize: 13, fontWeight: 600 }}>
              <Plus size={18} /> Invite Team Member
            </button>
          </div>

          {/* Access matrix */}
          <div style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${BD}` }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: 0 }}>Property Access Matrix</p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BD}` }}>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: MU, textTransform: "uppercase" }}>Team Member</th>
                    {properties.map(p => (
                      <th key={p.id} style={{ padding: "10px 16px", textAlign: "center", fontSize: 10, fontWeight: 700, color: MU, textTransform: "uppercase" }}>{p.name.split(" ").slice(0, 2).join(" ")}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TEAM.map((m, i) => (
                    <tr key={m.name} style={{ borderBottom: i < TEAM.length - 1 ? `1px solid ${BD}` : "none" }}>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: TX }}>{m.name}</td>
                      {properties.map(p => (
                        <td key={p.id} style={{ padding: "12px 16px", textAlign: "center" }}>
                          {m.properties.includes(p.id) ? (
                            <CheckCircle size={16} color={G} />
                          ) : (
                            <span style={{ color: "#E0DDD8", fontSize: 16 }}>—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showInquire && <InquireModal onClose={() => setShowInquire(false)} />}
      {showAdd && <AddPropertyModal onClose={() => setShowAdd(false)} onAdd={p => setProperties(prev => [...prev, p])} />}
    </div>
  );
}
