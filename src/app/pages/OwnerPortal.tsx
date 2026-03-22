import { useState } from "react";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

const properties = [
  { addr: "123 King St W", units: 4, occupied: 4, income: 9600 },
  { addr: "456 Queen St W", units: 5, occupied: 4, income: 8740 },
  { addr: "789 Bloor St W", units: 3, occupied: 3, income: 6600 },
];

const statements = [
  { month: "March 2026", net: 24940, gross: 27600, expenses: 2660 },
  { month: "February 2026", net: 24200, gross: 26800, expenses: 2600 },
  { month: "January 2026", net: 23800, gross: 26400, expenses: 2600 },
  { month: "December 2025", net: 23100, gross: 25800, expenses: 2700 },
];

const ownerActivity = [
  { type: "statement", label: "March statement available", time: "Today", icon: "📊" },
  { type: "payment", label: "Rent collected — 789 Bloor", time: "Mar 1", icon: "💰" },
  { type: "maintenance", label: "HVAC repair completed — Unit 4A", time: "Feb 28", icon: "🔧" },
  { type: "tenancy", label: "New tenant — Unit 2B, Queen St", time: "Feb 15", icon: "🏠" },
];

export function OwnerPortal() {
  const [selectedStatement, setSelectedStatement] = useState<number | null>(null);

  const totalUnits = properties.reduce((s, p) => s + p.units, 0);
  const occupiedUnits = properties.reduce((s, p) => s + p.occupied, 0);
  const totalIncome = properties.reduce((s, p) => s + p.income, 0);
  const occupancy = Math.round((occupiedUnits / totalUnits) * 100);

  return (
    <div style={{ fontFamily: SANS, background: BG, minHeight: "100vh", padding: "28px 32px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6 }}>Owner Portal</p>
        <h1 style={{ fontFamily: SERIF, fontSize: 36, color: TX, lineHeight: 1.05, margin: 0 }}>
          Property <em style={{ fontStyle: "italic" }}>Owners</em>
        </h1>
        <p style={{ fontSize: 14, color: MU, marginTop: 8, lineHeight: 1.6 }}>
          For landlords who use a property manager — read-only financial and occupancy view
        </p>
      </div>

      {/* Owner identity card */}
      <div style={{ background: TX, borderRadius: 14, padding: 20, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: GL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: G }}>
            JM
          </div>
          <div>
            <p style={{ fontFamily: SERIF, fontSize: 22, color: "#fff", margin: 0 }}>John Mafie</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 3 }}>Property Owner · Managed by Kaya Pro</p>
          </div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: G, background: GL, borderRadius: 20, padding: "5px 14px" }}>Owner View</span>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          ["Properties", String(properties.length)],
          ["Total Units", String(totalUnits)],
          ["Occupancy", `${occupancy}%`],
          ["Net Income / mo", `$${totalIncome.toLocaleString()}`],
        ].map(([label, val]) => (
          <div key={label} style={{ ...cd, padding: "16px 20px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 6 }}>{label}</p>
            <p style={{ fontFamily: SERIF, fontSize: 28, color: TX, lineHeight: 1 }}>{val}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Monthly Statements */}
        <div style={{ ...cd, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BD}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: TX }}>Monthly Statements</p>
            <span style={{ fontSize: 10, color: MU }}>PDF Export</span>
          </div>
          {statements.map((s, i) => (
            <div
              key={s.month}
              onClick={() => setSelectedStatement(selectedStatement === i ? null : i)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", borderBottom: `1px solid ${BD}`, cursor: "pointer", background: selectedStatement === i ? GL : "transparent", transition: "background .15s" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: BG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📊</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: TX, marginBottom: 2 }}>{s.month}</p>
                  <p style={{ fontSize: 10, color: MU }}>Statement · PDF</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: SERIF, fontSize: 20, color: TX }}>${s.net.toLocaleString()}</span>
                <button
                  onClick={e => { e.stopPropagation(); toast.success(`${s.month} statement downloaded`); }}
                  style={{ padding: "5px 10px", background: BG, border: `1px solid ${BD}`, borderRadius: 7, fontFamily: SANS, fontSize: 10, fontWeight: 700, cursor: "pointer", color: TX }}
                >
                  ⬇
                </button>
              </div>
            </div>
          ))}
          {selectedStatement !== null && (
            <div style={{ padding: "14px 18px", background: GL, borderTop: `1px solid rgba(10,122,82,.1)` }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: G, marginBottom: 10 }}>Statement Breakdown — {statements[selectedStatement].month}</p>
              {[
                ["Gross Rent Collected", `$${statements[selectedStatement].gross.toLocaleString()}`],
                ["Management Fees (10%)", `-$${Math.round(statements[selectedStatement].gross * 0.1).toLocaleString()}`],
                ["Maintenance & Repairs", `-$${(statements[selectedStatement].gross - statements[selectedStatement].net - Math.round(statements[selectedStatement].gross * 0.1)).toLocaleString()}`],
                ["Net to Owner", `$${statements[selectedStatement].net.toLocaleString()}`],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid rgba(10,122,82,.1)` }}>
                  <span style={{ fontSize: 11, color: MU }}>{label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: label.startsWith("Net") ? G : TX }}>{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Portfolio Summary */}
        <div style={{ ...cd, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BD}` }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: TX }}>Portfolio Summary</p>
          </div>
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {properties.map(p => {
              const occ = Math.round((p.occupied / p.units) * 100);
              return (
                <div key={p.addr} style={{ padding: 14, background: BG, borderRadius: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: TX, marginBottom: 2 }}>{p.addr}</p>
                      <p style={{ fontSize: 10, color: MU }}>{p.occupied}/{p.units} occupied</p>
                    </div>
                    <p style={{ fontFamily: SERIF, fontSize: 18, color: G }}>${p.income.toLocaleString()}</p>
                  </div>
                  {/* Occupancy bar */}
                  <div style={{ height: 4, background: BD, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${occ}%`, height: "100%", background: occ === 100 ? G : "#B45309", borderRadius: 4 }} />
                  </div>
                  <p style={{ fontSize: 9, color: MU, marginTop: 4 }}>{occ}% occupancy</p>
                </div>
              );
            })}
          </div>
          {/* YTD Summary */}
          <div style={{ margin: "0 16px 16px", padding: 14, background: TX, borderRadius: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 10 }}>YTD Performance</p>
            {[
              ["Total Revenue", "$82,800"],
              ["Total Expenses", "$7,860"],
              ["Net to Owner", "$74,940"],
              ["Avg Occupancy", `${occupancy}%`],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ ...cd, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BD}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: TX }}>Recent Activity</p>
        </div>
        {ownerActivity.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", borderBottom: `1px solid ${BD}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: BG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{a.icon}</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: TX, marginBottom: 1 }}>{a.label}</p>
                <p style={{ fontSize: 10, color: MU }}>{a.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
