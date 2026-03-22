import { useState } from "react";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

const PROPERTIES = ["123 King St W", "456 Queen St W", "789 Bloor St W"];
const INSPECTION_TYPES = ["Move-In", "Move-Out", "Routine", "Annual"];

const CHECKLIST_ROOMS: { room: string; items: string[] }[] = [
  { room: "Living Room", items: ["Walls & Ceiling", "Flooring", "Windows & Blinds", "Lighting & Switches", "Electrical Outlets", "Baseboards"] },
  { room: "Kitchen", items: ["Appliances (Stove/Oven)", "Refrigerator", "Dishwasher", "Countertops", "Cabinets & Drawers", "Plumbing / Sink", "Exhaust Fan"] },
  { room: "Bathroom", items: ["Toilet & Tank", "Shower / Tub", "Vanity & Sink", "Grouting & Caulking", "Exhaust Ventilation", "Water Pressure"] },
  { room: "Bedroom(s)", items: ["Walls & Ceiling", "Flooring", "Closet Doors", "Windows", "Light Fixtures"] },
  { room: "Hallways & Entry", items: ["Front Door & Lock", "Hallway Flooring", "Storage Closet", "Smoke Detector", "Carbon Monoxide Detector"] },
  { room: "Exterior / Shared", items: ["Parking Spot", "Locker / Storage", "Balcony / Patio", "Common Areas", "Mailbox"] },
];

type CheckMap = Record<string, Record<string, boolean>>;

interface PastInspection {
  id: string;
  property: string;
  unit: string;
  type: string;
  date: string;
  inspector: string;
  condition: number;
  status: "Completed" | "Pending Review";
  notes?: string;
}

const pastInspections: PastInspection[] = [
  { id: "i1", property: "123 King St W", unit: "4A", type: "Move-In", date: "Mar 15, 2026", inspector: "Justin Mafie", condition: 9.1, status: "Completed", notes: "Unit in excellent condition. Minor scuff on living room wall noted." },
  { id: "i2", property: "456 Queen St W", unit: "2B", type: "Move-Out", date: "Mar 8, 2026", inspector: "Justin Mafie", condition: 7.4, status: "Completed", notes: "Bathroom grouting needs repair. Carpet stain in bedroom." },
  { id: "i3", property: "789 Bloor St W", unit: "1C", type: "Routine", date: "Feb 20, 2026", inspector: "Sarah Chen", condition: 8.8, status: "Completed" },
  { id: "i4", property: "123 King St W", unit: "3B", type: "Move-In", date: "Mar 22, 2026", inspector: "Justin Mafie", condition: 0, status: "Pending Review" },
];

function ConditionBadge({ score }: { score: number }) {
  if (score === 0) return <span style={{ fontSize: 10, fontWeight: 700, color: "#B45309", background: "#FEF3C7", borderRadius: 20, padding: "3px 10px" }}>Pending</span>;
  const color = score >= 9 ? G : score >= 7.5 ? "#B45309" : "#DC2626";
  const bg = score >= 9 ? GL : score >= 7.5 ? "#FEF3C7" : "#FEE2E2";
  return <span style={{ fontSize: 10, fontWeight: 700, color, background: bg, borderRadius: 20, padding: "3px 10px" }}>{score}/10</span>;
}

export function PropertyInspection() {
  const [property, setProperty] = useState("");
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("");
  const [inspector, setInspector] = useState("");
  const [checks, setChecks] = useState<CheckMap>(() => {
    const m: CheckMap = {};
    CHECKLIST_ROOMS.forEach(r => { m[r.room] = {}; r.items.forEach(it => { m[r.room][it] = false; }); });
    return m;
  });
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState<"new" | "history">("new");
  const [expandedInspection, setExpandedInspection] = useState<string | null>(null);

  const totalItems = CHECKLIST_ROOMS.reduce((s, r) => s + r.items.length, 0);
  const checkedItems = Object.values(checks).reduce((s, room) => s + Object.values(room).filter(Boolean).length, 0);
  const progress = Math.round((checkedItems / totalItems) * 100);

  function toggleCheck(room: string, item: string) {
    setChecks(prev => ({ ...prev, [room]: { ...prev[room], [item]: !prev[room][item] } }));
  }

  function handleSubmit() {
    if (!property || !unit || !type || !inspector) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (checkedItems < totalItems * 0.5) {
      toast.error("Please complete at least 50% of the checklist before submitting");
      return;
    }
    toast.success(`Inspection report submitted for ${property} — Unit ${unit}`);
    setProperty(""); setUnit(""); setType(""); setInspector(""); setNotes("");
    setChecks(() => {
      const m: CheckMap = {};
      CHECKLIST_ROOMS.forEach(r => { m[r.room] = {}; r.items.forEach(it => { m[r.room][it] = false; }); });
      return m;
    });
  }

  const kpis = [
    ["Inspections Done", "8"],
    ["Move-In Reports", "4"],
    ["Damage Claims", "2"],
    ["Avg Condition", "8.4/10"],
  ];

  return (
    <div style={{ fontFamily: SANS, background: BG, minHeight: "100vh", padding: "28px 32px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6 }}>Property Inspection</p>
        <h1 style={{ fontFamily: SERIF, fontSize: 36, color: TX, lineHeight: 1.05, margin: 0 }}>
          AI <em style={{ fontStyle: "italic" }}>Inspection</em>
        </h1>
        <p style={{ fontSize: 14, color: MU, marginTop: 8 }}>Document move-in, move-out, and routine inspections with AI-assisted condition scoring</p>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {kpis.map(([label, val]) => (
          <div key={label} style={{ ...cd, padding: "16px 20px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 6 }}>{label}</p>
            <p style={{ fontFamily: SERIF, fontSize: 28, color: TX, lineHeight: 1 }}>{val}</p>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "#fff", border: `1px solid ${BD}`, borderRadius: 10, overflow: "hidden", width: "fit-content" }}>
        {(["new", "history"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ padding: "9px 22px", fontFamily: SANS, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", background: activeTab === tab ? G : "transparent", color: activeTab === tab ? "#fff" : MU, transition: "all .2s" }}
          >
            {tab === "new" ? "New Inspection" : "Inspection History"}
          </button>
        ))}
      </div>

      {activeTab === "new" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16 }}>
          {/* Form */}
          <div style={{ ...cd, padding: 22 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: TX, marginBottom: 16 }}>Inspection Details</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Property", type: "select", value: property, onChange: setProperty, options: PROPERTIES, placeholder: "Select property..." },
                { label: "Unit", type: "text", value: unit, onChange: setUnit, placeholder: "e.g. 4A" },
                { label: "Inspection Type", type: "select", value: type, onChange: setType, options: INSPECTION_TYPES, placeholder: "Select type..." },
                { label: "Inspector Name", type: "text", value: inspector, onChange: setInspector, placeholder: "Your name" },
              ].map(f => (
                <div key={f.label}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 6 }}>{f.label}</p>
                  {f.type === "select" ? (
                    <select
                      value={f.value}
                      onChange={e => f.onChange(e.target.value)}
                      style={{ width: "100%", border: `1px solid ${BD}`, borderRadius: 9, padding: "9px 12px", fontFamily: SANS, fontSize: 12, color: f.value ? TX : MU, outline: "none", background: "#fff" }}
                    >
                      <option value="">{f.placeholder}</option>
                      {f.options!.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      value={f.value}
                      onChange={e => f.onChange(e.target.value)}
                      placeholder={f.placeholder}
                      style={{ width: "100%", border: `1px solid ${BD}`, borderRadius: 9, padding: "9px 12px", fontFamily: SANS, fontSize: 12, color: TX, outline: "none", boxSizing: "border-box" }}
                    />
                  )}
                </div>
              ))}
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 6 }}>Notes</p>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Additional observations..."
                  rows={3}
                  style={{ width: "100%", border: `1px solid ${BD}`, borderRadius: 9, padding: "9px 12px", fontFamily: SANS, fontSize: 12, color: TX, outline: "none", resize: "vertical", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Progress */}
            {checkedItems > 0 && (
              <div style={{ marginTop: 16, padding: 14, background: GL, borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: G }}>Checklist Progress</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: G }}>{checkedItems}/{totalItems}</span>
                </div>
                <div style={{ height: 5, background: "rgba(10,122,82,.15)", borderRadius: 4 }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: G, borderRadius: 4, transition: "width .3s" }} />
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              style={{ width: "100%", padding: "11px 0", background: G, color: "#fff", border: "none", borderRadius: 10, fontFamily: SANS, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 16 }}
            >
              Submit Inspection Report →
            </button>
          </div>

          {/* Checklist */}
          <div style={{ ...cd, padding: 22, maxHeight: 700, overflowY: "auto" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: TX, marginBottom: 16 }}>Inspection Checklist</p>
            {CHECKLIST_ROOMS.map(r => {
              const roomChecked = Object.values(checks[r.room]).filter(Boolean).length;
              const roomTotal = r.items.length;
              return (
                <div key={r.room} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: TX }}>{r.room}</p>
                    <span style={{ fontSize: 10, color: roomChecked === roomTotal ? G : MU, fontWeight: 600 }}>{roomChecked}/{roomTotal}</span>
                  </div>
                  {r.items.map(item => (
                    <label
                      key={item}
                      style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 7, cursor: "pointer" }}
                    >
                      <input
                        type="checkbox"
                        checked={checks[r.room][item]}
                        onChange={() => toggleCheck(r.room, item)}
                        style={{ width: 15, height: 15, accentColor: G }}
                      />
                      <span style={{ fontSize: 12, color: checks[r.room][item] ? MU : TX, textDecoration: checks[r.room][item] ? "line-through" : "none", transition: "all .15s" }}>{item}</span>
                      {checks[r.room][item] && <span style={{ fontSize: 10, color: G, marginLeft: "auto" }}>✓</span>}
                    </label>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pastInspections.map(insp => (
            <div key={insp.id} style={{ ...cd, overflow: "hidden" }}>
              <div
                onClick={() => setExpandedInspection(expandedInspection === insp.id ? null : insp.id)}
                style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: BG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                    {insp.type === "Move-In" ? "🏠" : insp.type === "Move-Out" ? "📦" : "📋"}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: TX }}>{insp.property}</span>
                      <span style={{ fontSize: 10, color: MU }}>Unit {insp.unit}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: MU, background: BG, border: `1px solid ${BD}`, borderRadius: 20, padding: "2px 9px" }}>{insp.type}</span>
                    </div>
                    <p style={{ fontSize: 11, color: MU }}>{insp.date} · Inspector: {insp.inspector}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <ConditionBadge score={insp.condition} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: insp.status === "Completed" ? G : "#B45309" }}>
                    {insp.status === "Completed" ? "✓ Completed" : "⏳ Pending"}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); toast.success(`${insp.type} report for Unit ${insp.unit} downloaded`); }}
                    style={{ padding: "5px 12px", background: BG, border: `1px solid ${BD}`, borderRadius: 7, fontFamily: SANS, fontSize: 10, fontWeight: 700, cursor: "pointer", color: TX }}
                  >
                    ⬇ PDF
                  </button>
                  <span style={{ fontSize: 12, color: MU }}>{expandedInspection === insp.id ? "▲" : "▼"}</span>
                </div>
              </div>
              {expandedInspection === insp.id && (
                <div style={{ padding: "0 20px 16px", borderTop: `1px solid ${BD}` }}>
                  <div style={{ paddingTop: 14 }}>
                    {insp.notes && (
                      <div style={{ background: BG, borderRadius: 9, padding: 12, marginBottom: 12 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 6 }}>Inspector Notes</p>
                        <p style={{ fontSize: 12, color: TX, lineHeight: 1.6 }}>{insp.notes}</p>
                      </div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                      {[
                        ["Property", insp.property],
                        ["Unit", insp.unit],
                        ["Type", insp.type],
                        ["Date", insp.date],
                        ["Inspector", insp.inspector],
                        ["Condition Score", insp.condition > 0 ? `${insp.condition}/10` : "Pending"],
                      ].map(([label, val]) => (
                        <div key={label} style={{ background: BG, borderRadius: 8, padding: "10px 12px" }}>
                          <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 4 }}>{label}</p>
                          <p style={{ fontSize: 12, fontWeight: 600, color: TX }}>{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
