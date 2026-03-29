import { Bell, Megaphone, Wrench, AlertTriangle, Info, CheckCircle2, Sparkles, Clock } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

type NoticeType = "maintenance" | "emergency" | "info" | "community";

const TYPE_CONFIG: Record<NoticeType, { bg: string; border: string; text: string; icon: React.ComponentType<any>; label: string }> = {
  maintenance: { bg: "#FEF3C7", border: "rgba(180,83,9,0.15)", text: "#B45309", icon: Wrench, label: "Maintenance" },
  emergency:   { bg: "#FEF2F2", border: "rgba(220,38,38,0.15)", text: "#DC2626", icon: AlertTriangle, label: "Emergency" },
  info:        { bg: GL,        border: `${G}22`,               text: G,         icon: Info, label: "Info" },
  community:   { bg: GL,        border: `${G}22`,               text: G,         icon: Megaphone, label: "Community" },
};

interface Notice { id: number; type: NoticeType; title: string; body: string; date: string; read: boolean; pinned?: boolean; }

export function TenantNotices() {
  const [notices, setNotices] = useState<Notice[]>([
    { id: 1, type: "maintenance", title: "Elevator Maintenance — Sat Mar 28", body: "The main elevator will be out of service for scheduled maintenance on Saturday March 28th from 8:00 AM to 2:00 PM. Please use the stairwell during this time. We apologize for any inconvenience.", date: "Mar 25, 2026", read: false, pinned: true },
    { id: 2, type: "emergency", title: "Water Shutoff — Tonight 11 PM–3 AM", body: "Emergency pipe repairs require us to shut off water to the entire building tonight from 11:00 PM to approximately 3:00 AM. Please fill any containers you may need before then.", date: "Mar 24, 2026", read: false },
    { id: 3, type: "info", title: "Lease Renewal Reminder", body: "Your current lease expires on May 1, 2027. Under the Ontario Residential Tenancies Act, your landlord is required to offer renewal or provide an N12/N13 notice 60 days before expiry. Watch for an email in February 2027.", date: "Mar 20, 2026", read: true },
    { id: 4, type: "community", title: "Welcome Spring! BBQ This Weekend", body: "Join your neighbours for a building BBQ on Sunday March 29th from 1–5 PM in the courtyard. All residents welcome. RSVP to management by Friday.", date: "Mar 18, 2026", read: true },
    { id: 5, type: "info", title: "New Recycling Guidelines", body: "The City of Toronto has updated its recycling program. Please review the new guidelines posted in the mail room. Soft plastics can now be recycled in the blue bin.", date: "Mar 15, 2026", read: true },
    { id: 6, type: "maintenance", title: "Lobby Renovation Complete", body: "The lobby renovation project has been completed ahead of schedule. The new key fob entry system is now active — please ensure your key fob has been programmed.", date: "Mar 10, 2026", read: true },
  ]);

  const markRead = (id: number) => setNotices(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  const unreadCount = notices.filter(n => !n.read).length;

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Notices</p>
              <h1 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1 }}>Building Notices</h1>
            </div>
            {unreadCount > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 99, background: "#FEF2F2", border: "1px solid rgba(220,38,38,0.15)" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#DC2626" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#DC2626" }}>{unreadCount} unread</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Unread", value: unreadCount, bg: "#FEF2F2", text: "#DC2626" },
            { label: "Maintenance", value: notices.filter(n => n.type === "maintenance").length, bg: "#FEF3C7", text: "#B45309" },
            { label: "Emergency", value: notices.filter(n => n.type === "emergency").length, bg: "#FEF2F2", text: "#DC2626" },
            { label: "Total", value: notices.length, bg: "#F8F7F4", text: TX },
          ].map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", border: "1px solid rgba(0,0,0,0.07)" }}>
              <p style={{ fontSize: 11, color: MU, fontWeight: 500, margin: "0 0 8px" }}>{s.label}</p>
              <p style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: s.text, margin: 0 }}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Pinned notices */}
        {notices.filter(n => n.pinned).map((notice) => {
          const cfg = TYPE_CONFIG[notice.type];
          const Icon = cfg.icon;
          return (
            <motion.div key={notice.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} onClick={() => markRead(notice.id)} style={{ background: "#fff", borderRadius: 16, border: `2px solid ${cfg.text}30`, padding: "20px 24px", marginBottom: 16, cursor: "pointer", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: cfg.text }} />
              <div style={{ paddingLeft: 8 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color={cfg.text} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", background: "#B45309", padding: "2px 8px", borderRadius: 99 }}>PINNED</span>
                        {!notice.read && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#DC2626" }} />}
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: TX, margin: "4px 0 0" }}>{notice.title}</h3>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                    <Clock size={11} color={MU} strokeWidth={2.5} />
                    <span style={{ fontSize: 11, color: MU }}>{notice.date}</span>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: TX, margin: 0, lineHeight: 1.7, opacity: 0.8 }}>{notice.body}</p>
              </div>
            </motion.div>
          );
        })}

        {/* All notices */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {notices.filter(n => !n.pinned).map((notice, idx) => {
            const cfg = TYPE_CONFIG[notice.type];
            const Icon = cfg.icon;
            return (
              <motion.div key={notice.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + idx * 0.04 }} onClick={() => markRead(notice.id)} style={{ background: notice.read ? "#fff" : "#FFFEF7", borderRadius: 14, border: `1px solid ${notice.read ? "rgba(0,0,0,0.07)" : "rgba(180,83,9,0.15)"}`, padding: "16px 20px", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Icon size={16} color={cfg.text} strokeWidth={2.5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: cfg.text, background: cfg.bg, border: `1px solid ${cfg.border}`, padding: "2px 8px", borderRadius: 99 }}>{cfg.label.toUpperCase()}</span>
                        {!notice.read && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#DC2626" }} />}
                        {notice.read && <CheckCircle2 size={13} color="rgba(0,0,0,0.15)" strokeWidth={2} />}
                      </div>
                      <span style={{ fontSize: 11, color: MU, flexShrink: 0 }}>{notice.date}</span>
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: TX, margin: "0 0 6px" }}>{notice.title}</h3>
                    <p style={{ fontSize: 13, color: MU, margin: 0, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{notice.body}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: GL, borderRadius: 14, padding: "18px 22px", border: `1px solid ${G}20`, cursor: "pointer", marginTop: 20 }} onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "Can my landlord enter without notice?" } }))}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <Sparkles size={16} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Know Your Rights</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: 0, lineHeight: 1.5 }}>Landlords must provide 24 hours written notice before entering — except in emergencies. Ask Kaya AI if you have questions about a notice.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
