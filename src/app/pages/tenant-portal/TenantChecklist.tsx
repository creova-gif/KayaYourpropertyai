import { CheckSquare, Square, Camera, Plus, Sparkles, CheckCircle2, Clock, Download, Send } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

type Condition = "excellent" | "good" | "fair" | "damaged";
type ItemStatus = { checked: boolean; condition: Condition | null; note: string; hasPhoto: boolean };

const COND_COLOR: Record<Condition, { bg: string; text: string; label: string }> = {
  excellent: { bg: GL, text: G, label: "Excellent" },
  good:      { bg: GL,        text: G,          label: "Good" },
  fair:      { bg: "#FEF3C7", text: "#B45309", label: "Fair" },
  damaged:   { bg: "#FEF2F2", text: "#DC2626", label: "Damaged" },
};

const CHECKLIST_SECTIONS = [
  { id: "kitchen", title: "Kitchen", items: ["Stove & Oven", "Refrigerator", "Dishwasher", "Sink & Faucet", "Cabinets & Drawers", "Countertops", "Exhaust Fan"] },
  { id: "bathroom", title: "Bathroom(s)", items: ["Toilet", "Shower/Bathtub", "Sink & Faucet", "Mirror & Vanity", "Tile & Grout", "Ventilation Fan", "Towel Bars"] },
  { id: "livingroom", title: "Living Room", items: ["Flooring", "Walls & Paint", "Ceiling", "Windows & Blinds", "Light Fixtures", "Electrical Outlets"] },
  { id: "bedroom", title: "Bedroom(s)", items: ["Flooring", "Walls & Paint", "Closet & Doors", "Windows & Blinds", "Light Fixtures", "Electrical Outlets"] },
  { id: "general", title: "General", items: ["Entry Door & Lock", "Smoke Detectors", "CO Detectors", "HVAC / Thermostat", "Laundry (if in-unit)", "Parking Space", "Storage Locker"] },
];

export function TenantChecklist() {
  const [mode, setMode] = useState<"move-in" | "move-out">("move-in");
  const [items, setItems] = useState<Record<string, ItemStatus>>({});
  const [expandedSection, setExpandedSection] = useState<string | null>("kitchen");
  const [photoTarget, setPhotoTarget] = useState<string | null>(null);
  const [finalizeSubmitted, setFinalizeSubmitted] = useState(false);
  const checklistPhotoRef = useRef<HTMLInputElement>(null);

  function handleChecklistPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0] && photoTarget) {
      setItems(prev => ({ ...prev, [photoTarget]: { ...(prev[photoTarget] ?? { checked: true, condition: null, note: "" }), hasPhoto: true, checked: true } }));
      toast.success("Photo attached to inspection item");
      setPhotoTarget(null);
    }
    e.target.value = "";
  }

  function downloadReport() {
    const lines: string[] = [`Kaya Housing — ${mode === "move-in" ? "Move-In" : "Move-Out"} Inspection Report`, `Date: ${new Date().toLocaleDateString("en-CA")}`, `Tenant: Sarah Kim · Unit 4A, 123 King St, Toronto`, `Progress: ${checkedCount}/${allItems.length} items inspected`, ""];
    CHECKLIST_SECTIONS.forEach(s => {
      lines.push(`=== ${s.title} ===`);
      s.items.forEach(item => {
        const key = `${s.id}-${item}`;
        const st = items[key];
        const cond = st?.condition ? ` [${st.condition.toUpperCase()}]` : " [NOT RATED]";
        const photo = st?.hasPhoto ? " 📷" : "";
        lines.push(`  [${st?.checked ? "✓" : " "}] ${item}${cond}${photo}`);
      });
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `kaya-inspection-${mode}-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click(); URL.revokeObjectURL(url);
    toast.success("Inspection report downloaded");
  }

  const allItems = CHECKLIST_SECTIONS.flatMap(s => s.items.map(i => `${s.id}-${i}`));
  const checkedCount = allItems.filter(k => items[k]?.checked).length;
  const pct = Math.round((checkedCount / allItems.length) * 100);

  const toggle = (key: string) => {
    setItems(prev => ({ ...prev, [key]: { checked: !prev[key]?.checked, condition: prev[key]?.condition ?? null, note: prev[key]?.note ?? "", hasPhoto: prev[key]?.hasPhoto ?? false } }));
  };

  const setCondition = (key: string, condition: Condition) => {
    setItems(prev => ({ ...prev, [key]: { ...(prev[key] ?? { checked: true, note: "", hasPhoto: false }), condition, checked: true } }));
  };

  return (
    <div style={{ fontFamily: SANS }}>
      <input ref={checklistPhotoRef} type="file" accept="image/*" onChange={handleChecklistPhoto} style={{ display: "none" }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Inspection</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1 }}>Move-In/Out Checklist</h1>
        </motion.div>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, padding: 4, background: "#F0EFEC", borderRadius: 12, maxWidth: 320 }}>
          {[{ val: "move-in", label: "Move-In" }, { val: "move-out", label: "Move-Out" }].map(opt => (
            <button key={opt.val} onClick={() => setMode(opt.val as any)} style={{ flex: 1, padding: "9px 16px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: SANS, fontSize: 13, fontWeight: 600, background: mode === opt.val ? "#fff" : "transparent", color: mode === opt.val ? TX : MU, boxShadow: mode === opt.val ? "0 1px 6px rgba(0,0,0,0.08)" : "none" }}>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Progress hero */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl p-7 mb-7" style={{ background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, boxShadow: `0 12px 40px ${G}30` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>{mode === "move-in" ? "Move-In" : "Move-Out"} Inspection Progress</p>
              <p style={{ fontFamily: SERIF, fontSize: 44, fontWeight: 400, color: "#fff", lineHeight: 1, marginBottom: 4 }}>{pct}%</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{checkedCount} of {allItems.length} items inspected</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>Landlord co-sign pending</p>
              {pct === 100 && (
                <button style={{ padding: "10px 18px", background: "#fff", color: G, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}>
                  Submit for Co-Sign
                </button>
              )}
            </div>
          </div>
          <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.15)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "#fff", borderRadius: 4, transition: "width 0.4s ease" }} />
          </div>
        </motion.div>

        {/* Status summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Inspected", value: checkedCount, bg: GL, text: G, icon: CheckCircle2 },
            { label: "Remaining", value: allItems.length - checkedCount, bg: "#F8F7F4", text: MU, icon: Clock },
            { label: "Photos Taken", value: Object.values(items).filter(i => i.hasPhoto).length, bg: GL, text: G, icon: Camera },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon size={13} color={s.text} strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 11, color: MU, fontWeight: 500 }}>{s.label}</span>
              </div>
              <p style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: TX, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Checklist sections */}
        {CHECKLIST_SECTIONS.map((section, si) => {
          const expanded = expandedSection === section.id;
          const sectionChecked = section.items.filter(i => items[`${section.id}-${i}`]?.checked).length;
          return (
            <motion.div key={section.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + si * 0.04 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", marginBottom: 12, overflow: "hidden" }}>
              <button onClick={() => setExpandedSection(expanded ? null : section.id)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", background: "none", border: "none", cursor: "pointer", fontFamily: SANS }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: sectionChecked === section.items.length ? GL : "#F8F7F4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {sectionChecked === section.items.length ? <CheckCircle2 size={16} color={G} strokeWidth={2.5} /> : <span style={{ fontSize: 12, fontWeight: 700, color: MU }}>{sectionChecked}/{section.items.length}</span>}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: TX, margin: 0 }}>{section.title}</p>
                    <p style={{ fontSize: 11, color: MU, margin: 0 }}>{sectionChecked} of {section.items.length} inspected</p>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: MU, fontWeight: 600, transform: `rotate(${expanded ? 180 : 0}deg)`, transition: "transform 0.2s" }}>▾</div>
              </button>

              {expanded && (
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", padding: "8px 0" }}>
                  {section.items.map((item) => {
                    const key = `${section.id}-${item}`;
                    const state = items[key];
                    return (
                      <div key={item} style={{ padding: "10px 22px", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: state?.checked ? 10 : 0 }}>
                          <button onClick={() => toggle(key)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
                            {state?.checked ? <CheckSquare size={20} color={G} strokeWidth={2.5} /> : <Square size={20} color="rgba(0,0,0,0.2)" strokeWidth={2} />}
                          </button>
                          <span style={{ fontSize: 14, fontWeight: 500, color: state?.checked ? TX : MU, flex: 1, textAlign: "left" }}>{item}</span>
                          <button onClick={() => { setPhotoTarget(key); setTimeout(() => checklistPhotoRef.current?.click(), 0); }} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 8, border: `1px solid ${state?.hasPhoto ? G : "rgba(0,0,0,0.08)"}`, background: state?.hasPhoto ? GL : "#fff", color: state?.hasPhoto ? G : MU, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
                            <Camera size={11} strokeWidth={2.5} /> {state?.hasPhoto ? "Added" : "Photo"}
                          </button>
                        </div>
                        {state?.checked && (
                          <div style={{ display: "flex", gap: 6, marginLeft: 32, flexWrap: "wrap" }}>
                            {(["excellent", "good", "fair", "damaged"] as Condition[]).map(c => {
                              const cs = COND_COLOR[c];
                              return (
                                <button key={c} onClick={() => setCondition(key, c)} style={{ padding: "4px 12px", borderRadius: 9, border: `1.5px solid ${state?.condition === c ? cs.text : "rgba(0,0,0,0.08)"}`, background: state?.condition === c ? cs.bg : "#fff", color: state?.condition === c ? cs.text : MU, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
                                  {cs.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* AI insight */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: GL, borderRadius: 14, padding: "18px 22px", border: `1px solid ${G}20`, cursor: "pointer", marginTop: 8 }} onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "What should I document during move-in to protect my deposit?" } }))}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <Sparkles size={16} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Protect Your Deposit</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: 0, lineHeight: 1.5 }}>Document every item thoroughly and add photos. A completed, co-signed checklist is your legal protection. Ask Kaya AI for tips.</p>
            </div>
          </div>
        </motion.div>

        {/* Finalize section */}
        {finalizeSubmitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} style={{ marginTop: 20, background: "#fff", borderRadius: 16, padding: "28px 24px", border: `2px solid ${G}`, textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: GL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <CheckCircle2 size={28} color={G} strokeWidth={2} />
            </div>
            <p style={{ fontFamily: SERIF, fontSize: 22, color: TX, marginBottom: 6 }}>Inspection Submitted</p>
            <p style={{ fontSize: 13, color: MU, marginBottom: 20, lineHeight: 1.6 }}>Your {mode === "move-in" ? "move-in" : "move-out"} inspection has been submitted to your landlord for co-signature. You'll be notified when they sign.</p>
            <button onClick={() => setFinalizeSubmitted(false)} style={{ padding: "10px 22px", background: "#F8F7F4", color: TX, border: "1.5px solid rgba(0,0,0,0.07)", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>Back to Checklist</button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: 20, background: "#fff", borderRadius: 16, padding: "22px 24px", border: "1px solid rgba(0,0,0,0.07)" }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 4 }}>Finalize Inspection</h2>
            <p style={{ fontSize: 13, color: MU, marginBottom: 18, lineHeight: 1.6 }}>
              {pct < 100 ? `${allItems.length - checkedCount} item${allItems.length - checkedCount !== 1 ? "s" : ""} still need inspection. You can still download or submit a partial report.` : "All items inspected! Ready to submit for landlord co-signature."}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={downloadReport} style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 18px", background: "#F8F7F4", color: TX, border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 11, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
                <Download size={14} strokeWidth={2.5} /> Download Report
              </button>
              <button onClick={() => { toast.success("Inspection submitted for co-signature"); setFinalizeSubmitted(true); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 18px", background: G, color: "#fff", border: "none", borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: SANS, boxShadow: `0 4px 14px ${G}30` }}>
                <Send size={14} strokeWidth={2.5} /> Submit for Co-Sign {pct < 100 && <span style={{ fontSize: 10, opacity: 0.75, marginLeft: 4 }}>({pct}% done)</span>}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
