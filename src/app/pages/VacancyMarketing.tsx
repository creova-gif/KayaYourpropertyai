import { useState } from "react";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

interface VacantUnit {
  unit: string;
  addr: string;
  beds: number;
  baths: number;
  sqft: number;
  aiPrice: number;
  yourPrice: number;
  copy: string;
  tags: string[];
  score: number;
  published: boolean;
}

const initUnits: VacantUnit[] = [
  {
    unit: "Unit 5A",
    addr: "123 King St",
    beds: 2, baths: 1, sqft: 975,
    aiPrice: 2420, yourPrice: 2400,
    copy: "Modern 2-bedroom condo in the heart of Downtown Toronto. Bright south-facing unit with floor-to-ceiling windows, updated kitchen with quartz counters, in-suite laundry, and a dedicated parking spot. Steps from King Station. Perfect for young professionals.",
    tags: ["Parking Included", "In-Suite Laundry", "Pet Friendly"],
    score: 94,
    published: false,
  },
  {
    unit: "Unit 2B",
    addr: "456 Queen St W",
    beds: 1, baths: 1, sqft: 650,
    aiPrice: 1975, yourPrice: 1950,
    copy: "Stylish 1-bedroom unit in vibrant Queen West. Recently renovated bathroom and kitchen, hardwood floors throughout, bright east-facing exposure. Rooftop terrace access. Walkable to cafes, shops, and transit.",
    tags: ["Rooftop Access", "Recently Renovated", "Transit Nearby"],
    score: 88,
    published: false,
  },
];

const PLATFORMS = ["Zumper", "Realtor.ca", "PadMapper", "Kijiji", "Rentals.ca"];

function ScoreMeter({ score }: { score: number }) {
  const color = score >= 90 ? G : score >= 75 ? "#B45309" : "#DC2626";
  return (
    <div style={{ textAlign: "right" }}>
      <p style={{ fontSize: 10, color: MU, marginBottom: 3, fontFamily: SANS }}>AI Listing Score</p>
      <p style={{ fontFamily: SERIF, fontSize: 32, color, lineHeight: 1 }}>{score}<span style={{ fontSize: 14, color: MU }}>/100</span></p>
      <div style={{ width: 80, height: 4, background: BG, borderRadius: 4, marginTop: 5, marginLeft: "auto" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 4, transition: "width .5s" }} />
      </div>
    </div>
  );
}

export function VacancyMarketing() {
  const [units, setUnits] = useState(initUnits);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editCopy, setEditCopy] = useState("");
  const [editPrice, setEditPrice] = useState<number | null>(null);
  const [editingPriceIdx, setEditingPriceIdx] = useState<number | null>(null);

  const totalVacant = units.length;
  const published = units.filter(u => u.published).length;
  const avgScore = Math.round(units.reduce((s, u) => s + u.score, 0) / units.length);

  function handlePublish(idx: number) {
    setUnits(prev => prev.map((u, i) => i === idx ? { ...u, published: true } : u));
    toast.success(`${units[idx].unit} published to ${PLATFORMS.length} platforms!`);
  }

  function handleEditCopy(idx: number) {
    setEditingIdx(idx);
    setEditCopy(units[idx].copy);
  }

  function handleSaveCopy(idx: number) {
    setUnits(prev => prev.map((u, i) => i === idx ? { ...u, copy: editCopy, score: Math.min(100, u.score + 2) } : u));
    setEditingIdx(null);
    toast.success("Listing copy updated");
  }

  function handleEditPrice(idx: number) {
    setEditingPriceIdx(idx);
    setEditPrice(units[idx].yourPrice);
  }

  function handleSavePrice(idx: number) {
    if (editPrice === null) return;
    setUnits(prev => prev.map((u, i) => i === idx ? { ...u, yourPrice: editPrice } : u));
    setEditingPriceIdx(null);
    toast.success("Price updated");
  }

  return (
    <div style={{ fontFamily: SANS, background: BG, minHeight: "100vh", padding: "28px 32px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6 }}>AI Marketing</p>
        <h1 style={{ fontFamily: SERIF, fontSize: 36, color: TX, lineHeight: 1.05, margin: 0 }}>
          Vacancy <em style={{ fontStyle: "italic" }}>Marketing</em>
        </h1>
        <p style={{ fontSize: 14, color: MU, marginTop: 8, lineHeight: 1.6 }}>
          AI writes your listing, picks the price, and publishes everywhere in minutes
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          ["Vacant Units", String(totalVacant)],
          ["Published", String(published)],
          ["Avg Price Accuracy", "98%"],
          ["Days to Lease", "4.2d"],
        ].map(([label, val]) => (
          <div key={label} style={{ ...cd, padding: "16px 20px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 6 }}>{label}</p>
            <p style={{ fontFamily: SERIF, fontSize: 28, color: TX, lineHeight: 1 }}>{val}</p>
          </div>
        ))}
      </div>

      {/* Platform pills */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: ".5px" }}>Syndicates to:</span>
        {PLATFORMS.map(p => (
          <span key={p} style={{ fontSize: 11, fontWeight: 600, color: G, background: GL, borderRadius: 20, padding: "4px 12px" }}>{p}</span>
        ))}
      </div>

      {/* Vacant Unit Cards */}
      {units.map((v, idx) => (
        <div key={v.unit} style={{ ...cd, padding: 24, marginBottom: 16 }}>
          {/* Unit header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: SERIF, fontSize: 22, color: TX }}>{v.unit}</span>
                {v.published
                  ? <span style={{ fontSize: 10, fontWeight: 700, color: G, background: GL, borderRadius: 20, padding: "3px 10px" }}>✓ Published</span>
                  : <span style={{ fontSize: 10, fontWeight: 700, color: "#B45309", background: "#FEF3C7", borderRadius: 20, padding: "3px 10px" }}>Vacant</span>
                }
              </div>
              <p style={{ fontSize: 12, color: MU }}>{v.addr} · {v.beds}bd/{v.baths}ba · {v.sqft} sqft</p>
            </div>
            <ScoreMeter score={v.score} />
          </div>

          {/* Content grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {/* Copy */}
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 8 }}>AI-Generated Listing Copy</p>
              {editingIdx === idx ? (
                <div>
                  <textarea
                    value={editCopy}
                    onChange={e => setEditCopy(e.target.value)}
                    rows={5}
                    style={{ width: "100%", borderRadius: 9, border: `1px solid ${BD}`, padding: 10, fontFamily: SANS, fontSize: 12, color: TX, resize: "vertical", outline: "none", boxSizing: "border-box" }}
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button onClick={() => handleSaveCopy(idx)} style={{ padding: "7px 16px", background: G, color: "#fff", border: "none", borderRadius: 8, fontFamily: SANS, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Save</button>
                    <button onClick={() => setEditingIdx(null)} style={{ padding: "7px 12px", background: BG, border: `1px solid ${BD}`, borderRadius: 8, fontFamily: SANS, fontSize: 11, cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: BG, borderRadius: 9, padding: 12, fontSize: 12, color: TX, lineHeight: 1.65 }}>{v.copy}</div>
              )}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                {v.tags.map(t => (
                  <span key={t} style={{ fontSize: 10, fontWeight: 600, color: MU, background: BG, border: `1px solid ${BD}`, borderRadius: 20, padding: "3px 10px" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 8 }}>Pricing Analysis</p>
              <div style={{ background: BG, borderRadius: 9, padding: 12 }}>
                {[
                  ["AI Suggested Price", `$${v.aiPrice.toLocaleString()}/mo`, G],
                  ["Your Price", `$${v.yourPrice.toLocaleString()}/mo`, TX],
                  ["Market Avg", "$2,450/mo", MU],
                  ["Est. Days to Lease", "4–7 days", G],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BD}` }}>
                    <span style={{ fontSize: 11, color: MU }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color }}>{val}</span>
                  </div>
                ))}
                {editingPriceIdx === idx ? (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 12, color: MU }}>$</span>
                      <input
                        type="number"
                        value={editPrice ?? ""}
                        onChange={e => setEditPrice(Number(e.target.value))}
                        style={{ flex: 1, border: `1px solid ${BD}`, borderRadius: 7, padding: "6px 10px", fontFamily: SANS, fontSize: 12, outline: "none" }}
                      />
                      <button onClick={() => handleSavePrice(idx)} style={{ padding: "6px 12px", background: G, color: "#fff", border: "none", borderRadius: 7, fontFamily: SANS, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Save</button>
                      <button onClick={() => setEditingPriceIdx(null)} style={{ padding: "6px 10px", background: BG, border: `1px solid ${BD}`, borderRadius: 7, fontFamily: SANS, fontSize: 11, cursor: "pointer" }}>✕</button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            {v.published ? (
              <button
                onClick={() => { setUnits(prev => prev.map((u, i) => i === idx ? { ...u, published: false } : u)); toast.success("Listing unpublished"); }}
                style={{ flex: 1, padding: "10px 0", background: "#FEF3C7", color: "#92400E", border: "none", borderRadius: 10, fontFamily: SANS, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
              >
                Unpublish
              </button>
            ) : (
              <button
                onClick={() => handlePublish(idx)}
                style={{ flex: 1, padding: "10px 0", background: G, color: "#fff", border: "none", borderRadius: 10, fontFamily: SANS, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
              >
                Publish Now →
              </button>
            )}
            <button
              onClick={() => handleEditCopy(idx)}
              style={{ padding: "10px 16px", background: "#fff", border: `1px solid ${BD}`, borderRadius: 10, fontFamily: SANS, fontSize: 11, fontWeight: 600, cursor: "pointer", color: TX }}
            >
              Edit Copy
            </button>
            <button
              onClick={() => handleEditPrice(idx)}
              style={{ padding: "10px 16px", background: "#fff", border: `1px solid ${BD}`, borderRadius: 10, fontFamily: SANS, fontSize: 11, fontWeight: 600, cursor: "pointer", color: TX }}
            >
              Adjust Price
            </button>
          </div>
        </div>
      ))}

      {/* AI Tips Banner */}
      <div style={{ background: TX, borderRadius: 14, padding: 22, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginTop: 8 }}>
        <div>
          <p style={{ fontFamily: SERIF, fontSize: 20, color: "#fff", marginBottom: 4 }}>Boost your listing score</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>
            Add professional photos to reach a score of 100 — units with photos lease 60% faster.
          </p>
        </div>
        <button
          onClick={() => toast.success("Photo upload feature coming soon!")}
          style={{ padding: "11px 24px", background: G, color: "#fff", border: "none", borderRadius: 10, fontFamily: SANS, fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Upload Photos →
        </button>
      </div>
    </div>
  );
}
