import { Wrench, Plus, Filter, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { MaintenanceKanban } from "../components/MaintenanceKanban";

export function Maintenance() {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  return (
    <div className="min-h-screen bg-slate-50">
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

        {/* Kanban Board */}
        {viewMode === "kanban" ? (
          <MaintenanceKanban />
        ) : (
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6">
            <p className="text-[#767570] text-center py-12 text-[14px]">List view coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}