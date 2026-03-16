import { Wrench, Plus, Filter, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { MaintenanceKanban } from "../components/MaintenanceKanban";

export function Maintenance() {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Maintenance Requests</h1>
            <p className="mt-2 text-slate-600">Manage and track property maintenance with AI prioritization</p>
          </div>
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode("kanban")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "kanban" 
                    ? "bg-indigo-100 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list" 
                    ? "bg-indigo-100 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <List className="size-4" />
              </button>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200">
              <Plus className="size-5" />
              New Request
            </button>
          </div>
        </div>

        {/* AI Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-50">
                <Wrench className="size-5 text-amber-600" />
              </div>
              <span className="text-sm text-slate-600">Open</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">2</p>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-50">
                <Wrench className="size-5 text-blue-600" />
              </div>
              <span className="text-sm text-slate-600">In Progress</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">2</p>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-50">
                <Wrench className="size-5 text-green-600" />
              </div>
              <span className="text-sm text-slate-600">Completed</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">1</p>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-50">
                <Wrench className="size-5 text-purple-600" />
              </div>
              <span className="text-sm text-slate-600">Avg Cost</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">$176</p>
          </div>
        </div>

        {/* Kanban Board */}
        {viewMode === "kanban" ? (
          <MaintenanceKanban />
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-slate-500 text-center py-12">List view coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}