import { Building2, User } from "lucide-react";
import { Link } from "react-router";

export function RoleSwitcher() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4">
        <p className="text-xs text-slate-500 mb-3 text-center">Switch View</p>
        <div className="flex gap-3">
          <Link
            to="/app"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 rounded-xl transition-colors"
          >
            <Building2 className="size-6 text-indigo-600" />
            <span className="text-xs font-medium text-indigo-900">Home</span>
          </Link>
          <Link
            to="/tenant"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-xl transition-colors"
          >
            <User className="size-6 text-purple-600" />
            <span className="text-xs font-medium text-purple-900">Tenant</span>
          </Link>
        </div>
      </div>
    </div>
  );
}