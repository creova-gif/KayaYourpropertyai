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

export function NavigationMenu({ basePath = "/" }: { basePath?: string }) {
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
        { name: "Documents", href: makePath("/documents"), icon: FolderOpen },
        { name: "LTB Forms", href: makePath("/ltb-forms"), icon: Scale },
        { name: "Lease Templates", href: makePath("/province-lease-templates"), icon: FileText },
        { name: "Notices", href: makePath("/notices"), icon: Bell },
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
      ],
    },
    {
      name: "More",
      href: makePath("/messages"),
      icon: SettingsIcon,
      children: [
        { name: "Messages", href: makePath("/messages"), icon: MessageSquare },
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
    <nav className="px-4 py-8 space-y-1">
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
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-[14px] font-medium transition-all duration-200 group ${
                    active
                      ? "bg-[#0A0A0A] text-white"
                      : "text-[#9CA3AF] hover:text-[#0A0A0A] hover:bg-[#F5F5F5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`size-5 ${active ? "text-white" : "text-[#9CA3AF] group-hover:text-[#0A0A0A]"}`} />
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown
                    className={`size-4 transition-transform ${expanded ? "rotate-180" : ""} ${
                      active ? "text-white" : "text-[#9CA3AF]"
                    }`}
                  />
                </button>

                {expanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive = isActive(child.href);
                      return (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                            childActive
                              ? "bg-[#F5F5F5] text-[#0A0A0A]"
                              : "text-[#9CA3AF] hover:text-[#0A0A0A] hover:bg-[#F5F5F5]"
                          }`}
                        >
                          <ChildIcon className="size-4" />
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-[14px] font-medium transition-all duration-200 group ${
                  active
                    ? "bg-[#0A0A0A] text-white"
                    : "text-[#9CA3AF] hover:text-[#0A0A0A] hover:bg-[#F5F5F5]"
                }`}
              >
                <Icon className={`size-5 ${active ? "text-white" : "text-[#9CA3AF] group-hover:text-[#0A0A0A]"}`} />
                <span>{item.name}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}