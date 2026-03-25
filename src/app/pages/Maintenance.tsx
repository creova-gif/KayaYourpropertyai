import { Wrench, Plus, Filter, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { MaintenanceKanban } from "../components/MaintenanceKanban";

export function Maintenance() {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  return (
    <div style={{ minHeight: "100vh", background: "#F8F7F4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Property Operations</p>
          <h1 className="text-[48px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>Maintenance Requests</h1>
          <p className="mt-2 text-[14px] text-[#767570]">Track and manage maintenance issues across all properties</p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-[rgba(0,0,0,0.07)]">
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "kanban" 
                  ? "bg-[#E5F4EE] text-[#0A7A52]" 
                  : "text-[#767570] hover:bg-[#F8F7F4]"
              }`}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "list" 
                  ? "bg-[#E5F4EE] text-[#0A7A52]" 
                  : "text-[#767570] hover:bg-[#F8F7F4]"
              }`}
            >
              <List className="size-4" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-3 bg-[#0A7A52] text-white rounded-lg font-semibold hover:bg-[#096A46] transition-all shadow-sm">
            <Plus className="size-5" />
            New Request
          </button>
        </div>

        {/* AI Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#FEF3E2]">
                <Wrench className="size-5 text-[#F59E0B]" />
              </div>
              <span className="text-[12px] text-[#767570] uppercase tracking-wider">Open</span>
            </div>
            <p className="text-[36px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>2</p>
          </div>
          
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#EFF6FF]">
                <Wrench className="size-5 text-[#3B82F6]" />
              </div>
              <span className="text-[12px] text-[#767570] uppercase tracking-wider">In Progress</span>
            </div>
            <p className="text-[36px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>2</p>
          </div>
          
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#E5F4EE]">
                <Wrench className="size-5 text-[#0A7A52]" />
              </div>
              <span className="text-[12px] text-[#767570] uppercase tracking-wider">Completed</span>
            </div>
            <p className="text-[36px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>1</p>
          </div>
          
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#F3E8FF]">
                <Wrench className="size-5 text-[#9333EA]" />
              </div>
              <span className="text-[12px] text-[#767570] uppercase tracking-wider">Avg Cost</span>
            </div>
            <p className="text-[36px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>$176</p>
          </div>
        </div>

        {/* Kanban Board / List View */}
        {viewMode === "kanban" ? (
          <MaintenanceKanban />
        ) : (
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] overflow-hidden">
            {/* List header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 0, padding: "10px 20px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#F8F7F4" }}>
              {["Issue", "Property", "Priority", "Status", "Reported"].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#767570", textTransform: "uppercase", letterSpacing: "0.6px" }}>{h}</span>
              ))}
            </div>
            {[
              { id: "KY-1042", title: "Bathroom faucet dripping", unit: "Unit 4A · 123 King St", priority: "high", status: "In Progress", date: "Mar 12", cat: "🚿" },
              { id: "KY-1041", title: "Bedroom window won't latch", unit: "Unit 2B · 123 King St", priority: "high", status: "Open", date: "Mar 14", cat: "🪟" },
              { id: "KY-1039", title: "Dishwasher making noise", unit: "Unit 4A · 123 King St", priority: "medium", status: "In Progress", date: "Mar 8", cat: "🧺" },
              { id: "KY-1037", title: "Hallway light flickering", unit: "Unit 1C · 456 Queen Ave", priority: "medium", status: "Open", date: "Mar 5", cat: "💡" },
              { id: "KY-1034", title: "Thermostat not responding", unit: "Unit 3A · 456 Queen Ave", priority: "low", status: "Completed", date: "Feb 28", cat: "❄️" },
            ].map((ticket, i) => {
              const priorityColors: Record<string, { bg: string; text: string }> = {
                high: { bg: "#FEF2F2", text: "#DC2626" },
                medium: { bg: "#FEF3C7", text: "#B45309" },
                low: { bg: "#F8F7F4", text: "#767570" },
              };
              const statusColors: Record<string, { bg: string; text: string }> = {
                "Open": { bg: "#FEF3C7", text: "#B45309" },
                "In Progress": { bg: "#EFF6FF", text: "#1D4ED8" },
                "Completed": { bg: "#E5F4EE", text: "#0A7A52" },
              };
              const pc = priorityColors[ticket.priority];
              const sc = statusColors[ticket.status];
              return (
                <div key={ticket.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 0, padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.04)", alignItems: "center", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#FAFAF9")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16 }}>{ticket.cat}</span>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#0E0F0C", margin: 0 }}>{ticket.title}</p>
                      <p style={{ fontSize: 10, color: "#767570", margin: 0 }}>{ticket.id}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: "#767570" }}>{ticket.unit}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: pc.text, background: pc.bg, padding: "3px 10px", borderRadius: 99, display: "inline-block" }}>{ticket.priority}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: sc.text, background: sc.bg, padding: "3px 10px", borderRadius: 99, display: "inline-block" }}>{ticket.status}</span>
                  <span style={{ fontSize: 11, color: "#767570" }}>{ticket.date}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}