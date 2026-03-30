import { Building2, User } from "lucide-react";
import { Link, useLocation } from "react-router";

export function RoleSwitcher() {
  const location = useLocation();
  const isTenantView = location.pathname.startsWith("/tenant");

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 px-3 py-2 flex items-center gap-2">
        <span className="text-[10px] text-slate-400 font-medium mr-1">Switch</span>
        {!isTenantView ? null : (
          <Link
            to="/app"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <Building2 className="size-3.5 text-emerald-700" />
            <span className="text-xs font-medium text-emerald-900">Landlord</span>
          </Link>
        )}
        {isTenantView ? null : (
          <Link
            to="/tenant"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
          >
            <User className="size-3.5 text-blue-700" />
            <span className="text-xs font-medium text-blue-900">Tenant</span>
          </Link>
        )}
      </div>
    </div>
  );
}
