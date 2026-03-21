import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  DollarSign,
  Wrench,
  MessageSquare,
  Settings as SettingsIcon,
  ChevronDown,
  Receipt,
  Bell,
  Shield,
  TrendingUp,
  Send,
  FolderOpen,
  BarChart3,
  Award,
  Brain,
  CreditCard,
  Scale,
  UserCheck,
  Hammer,
  FileBarChart,
  Share2,
  ShieldCheck,
  Store,
  Star,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  children?: {
    name: string;
    href: string;
    icon: any;
  }[];
}

export function NavigationMenu({ basePath = "/", onNavigate }: { basePath?: string; onNavigate?: () => void }) {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Helper function to construct paths correctly
  const makePath = (path: string) => {
    if (basePath === "/") {
      return path === "" ? "/" : path;
    }
    return `${basePath}${path}`;
  };

  const navigation: NavItem[] = [
    {
      name: "Dashboard",
      href: makePath(""),
      icon: LayoutDashboard,
    },
    {
      name: "Properties",
      href: makePath("/properties"),
      icon: Building2,
    },
    {
      name: "Applications",
      href: makePath("/applications"),
      icon: FileText,
      children: [
        { name: "All Applications", href: makePath("/applications"), icon: FileText },
        { name: "Tenant Screening", href: makePath("/tenant-screening"), icon: UserCheck },
      ],
    },
    {
      name: "Tenants",
      href: makePath("/tenants"),
      icon: Users,
    },
    {
      name: "Finances",
      href: makePath("/payments"),
      icon: DollarSign,
      children: [
        { name: "Payments", href: makePath("/payments"), icon: DollarSign },
        { name: "Rent Collection", href: makePath("/rent-collection"), icon: CreditCard },
        { name: "Financial Dashboard", href: makePath("/financial"), icon: TrendingUp },
        { name: "HST/GST Tracker", href: makePath("/tax-tracker"), icon: Receipt },
        { name: "Invoices", href: makePath("/invoices"), icon: Receipt },
      ],
    },
    {
      name: "Operations",
      href: makePath("/maintenance"),
      icon: Wrench,
      children: [
        { name: "Maintenance", href: makePath("/maintenance"), icon: Wrench },
        { name: "Contractors", href: makePath("/contractor-marketplace"), icon: Hammer },
        { name: "Vendors", href: makePath("/vendors"), icon: Store },
        { name: "Documents", href: makePath("/documents"), icon: FolderOpen },
        { name: "LTB Forms", href: makePath("/ltb-forms"), icon: Scale },
        { name: "Lease Templates", href: makePath("/province-lease-templates"), icon: FileText },
        { name: "Notices", href: makePath("/notices"), icon: Bell },
      ],
    },
    {
      name: "Growth",
      href: makePath("/listing-syndication"),
      icon: Share2,
      children: [
        { name: "Listing Syndication", href: makePath("/listing-syndication"), icon: Share2 },
        { name: "Deposit-Free (Shield)", href: makePath("/deposit-free"), icon: ShieldCheck },
        { name: "Rent Credit Building", href: makePath("/rent-credit"), icon: Star },
      ],
    },
    {
      name: "Insights",
      href: makePath("/rental-intelligence"),
      icon: Brain,
      children: [
        { name: "Rental Intelligence", href: makePath("/rental-intelligence"), icon: Brain },
        { name: "Tenant Passport", href: makePath("/tenant-passport"), icon: Award },
        { name: "Analytics", href: makePath("/analytics"), icon: BarChart3 },
        { name: "Reports", href: makePath("/reports"), icon: FileBarChart },
      ],
    },
    {
      name: "More",
      href: makePath("/messages"),
      icon: SettingsIcon,
      children: [
        { name: "Messages", href: makePath("/messaging-center"), icon: MessageSquare },
        { name: "Notifications", href: makePath("/notification-center"), icon: Bell },
        { name: "Admin", href: makePath("/admin"), icon: Shield },
        { name: "Settings", href: makePath("/settings"), icon: SettingsIcon },
      ],
    },
  ];

  const isActive = (path: string) => {
    if (path === basePath) {
      return location.pathname === basePath;
    }
    return location.pathname.startsWith(path);
  };

  const isParentActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some(child => isActive(child.href));
    }
    return isActive(item.href);
  };

  return (
    <nav className="px-3 py-6 space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isParentActive(item);
        const expanded = expandedItem === item.name;

        return (
          <div key={item.name}>
            {item.children ? (
              <>
                <button
                  onClick={() => setExpandedItem(expanded ? null : item.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-300 group relative overflow-hidden ${
                    active
                      ? "bg-gradient-to-r from-[#0A7A52] to-[#085D3D] text-white shadow-lg shadow-[#0A7A52]/20"
                      : "text-[#767570] hover:text-[#0E0F0C] hover:bg-[#F8F7F4]"
                  }`}
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif"
                  }}
                >
                  {active && (
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
                      style={{ mixBlendMode: 'overlay' }}
                    />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                      active 
                        ? "bg-white/20" 
                        : "bg-transparent group-hover:bg-[#0A7A52]/8"
                    }`}>
                      <Icon className={`size-[18px] ${active ? "text-white" : "text-[#767570] group-hover:text-[#0A7A52]"}`} strokeWidth={2.5} />
                    </div>
                    <span className="relative z-10">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 relative z-10">
                    {item.children && item.children.length > 0 && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        active 
                          ? "bg-white/20 text-white" 
                          : "bg-[#0A7A52]/10 text-[#0A7A52]"
                      }`}>
                        {item.children.length}
                      </span>
                    )}
                    <ChevronDown
                      className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""} ${
                        active ? "text-white/80" : "text-[#767570] group-hover:text-[#0A7A52]"
                      }`}
                      strokeWidth={2.5}
                    />
                  </div>
                </button>

                {expanded && (
                  <div className="ml-3 mt-1.5 mb-1 pl-4 border-l-2 border-[#0A7A52]/10 space-y-0.5">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive = isActive(child.href);
                      return (
                        <Link
                          key={child.name}
                          to={child.href}
                          onClick={onNavigate}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 group ${
                            childActive
                              ? "bg-[#E5F4EE] text-[#0A7A52] shadow-sm"
                              : "text-[#767570] hover:text-[#0E0F0C] hover:bg-[#F8F7F4]"
                          }`}
                        >
                          <div className={`p-1 rounded-md ${
                            childActive 
                              ? "bg-[#0A7A52]/10" 
                              : "bg-transparent group-hover:bg-[#0A7A52]/5"
                          }`}>
                            <ChildIcon className={`size-[15px] ${
                              childActive ? "text-[#0A7A52]" : "text-[#767570] group-hover:text-[#0A7A52]"
                            }`} strokeWidth={2.5} />
                          </div>
                          <span>{child.name}</span>
                          {childActive && (
                            <div className="ml-auto">
                              <div className="size-1.5 rounded-full bg-[#0A7A52]" />
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-300 group relative overflow-hidden ${
                  active
                    ? "bg-gradient-to-r from-[#0A7A52] to-[#085D3D] text-white shadow-lg shadow-[#0A7A52]/20"
                    : "text-[#767570] hover:text-[#0E0F0C] hover:bg-[#F8F7F4]"
                }`}
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif"
                }}
              >
                {active && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
                    style={{ mixBlendMode: 'overlay' }}
                  />
                )}
                <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                  active 
                    ? "bg-white/20" 
                    : "bg-transparent group-hover:bg-[#0A7A52]/8"
                }`}>
                  <Icon className={`size-[18px] ${active ? "text-white" : "text-[#767570] group-hover:text-[#0A7A52]"}`} strokeWidth={2.5} />
                </div>
                <span className="relative z-10">{item.name}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}