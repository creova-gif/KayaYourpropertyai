import { Outlet, Link, useLocation } from "react-router";
import { Home, CreditCard, FileText, Wrench, User, Menu, X, ClipboardList } from "lucide-react";
import { useState } from "react";
import { RoleSwitcher } from "../../components/RoleSwitcher";

export function TenantLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/tenant", icon: Home },
    { name: "Applications", href: "/tenant/applications", icon: ClipboardList },
    { name: "Payments", href: "/tenant/payments", icon: CreditCard },
    { name: "Documents", href: "/tenant/documents", icon: FileText },
    { name: "Maintenance", href: "/tenant/maintenance", icon: Wrench },
  ];

  const isActive = (path: string) => {
    if (path === "/tenant") {
      return location.pathname === "/tenant";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between h-16 px-4">
          <div>
            <h1 className="font-semibold text-slate-900">Tenant Portal</h1>
            <p className="text-xs text-slate-500">Unit 4A - 123 King St</p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Bottom Nav - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                  active ? "bg-purple-50 text-purple-600" : "text-slate-600"
                }`}
              >
                <Icon className="size-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-900">Tenant Portal</h1>
          <p className="text-sm text-slate-500 mt-1">John Doe</p>
          <p className="text-xs text-slate-400">Unit 4A - 123 King Street</p>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? "bg-purple-50 text-purple-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="size-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 pb-20 lg:pb-0 lg:pt-0">
        <Outlet />
      </main>
      
      {/* Role Switcher */}
      <RoleSwitcher />
    </div>
  );
}