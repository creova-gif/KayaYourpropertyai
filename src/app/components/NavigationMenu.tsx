import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard, Building2, FileText, Users, DollarSign,
  Wrench, MessageSquare, Settings as SettingsIcon, ChevronDown,
  Receipt, Bell, Shield, TrendingUp, Send, FolderOpen, BarChart3,
  Award, Brain, CreditCard, Scale, UserCheck, Hammer, FileBarChart,
  Share2, ShieldCheck, Store, Star, BadgeCheck, FileCheck2, Lock,
  HeartHandshake, PlusCircle, Briefcase,
} from "lucide-react";

const G = "#0A7A52";
const SANS = "'DM Sans', system-ui, sans-serif";

interface NavChild { name: string; href: string; icon: any; }
interface NavItem { name: string; href: string; icon: any; section?: string; children?: NavChild[]; badge?: string; }

interface Props {
  basePath?: string;
  onNavigate?: () => void;
  dark?: boolean;
}

export function NavigationMenu({ basePath = "/", onNavigate, dark = false }: Props) {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const mkp = (path: string) => basePath === "/" ? (path === "" ? "/" : path) : `${basePath}${path}`;

  const navigation: NavItem[] = [
    { name: "Dashboard", href: mkp(""), icon: LayoutDashboard, section: "MAIN" },
    {
      name: "Properties", href: mkp("/properties"), icon: Building2,
      children: [
        { name: "Residential Portfolio", href: mkp("/properties"), icon: Building2 },
        { name: "Commercial Portfolio", href: mkp("/commercial"), icon: Briefcase },
      ],
    },
    {
      name: "Applications", href: mkp("/applications"), icon: FileText,
      children: [
        { name: "All Applications", href: mkp("/applications"), icon: FileText },
        { name: "Tenant Screening", href: mkp("/tenant-screening"), icon: UserCheck },
      ],
    },
    { name: "Tenants", href: mkp("/tenants"), icon: Users },
    {
      name: "Operations", href: mkp("/maintenance"), icon: Wrench, section: "MANAGE",
      children: [
        { name: "Maintenance", href: mkp("/maintenance"), icon: Wrench },
        { name: "Contractors", href: mkp("/contractor-marketplace"), icon: Hammer },
        { name: "Vendors", href: mkp("/vendors"), icon: Store },
        { name: "Documents", href: mkp("/documents"), icon: FolderOpen },
        { name: "LTB Forms", href: mkp("/ltb-forms"), icon: Scale },
        { name: "LTB Workflow", href: mkp("/ltb-workflow"), icon: FileCheck2 },
        { name: "Paralegal Market", href: mkp("/paralegal"), icon: HeartHandshake },
        { name: "Lease Templates", href: mkp("/province-lease-templates"), icon: FileText },
        { name: "Notices", href: mkp("/notices"), icon: Bell },
      ],
    },
    {
      name: "Finances", href: mkp("/payments"), icon: DollarSign,
      children: [
        { name: "Payments", href: mkp("/payments"), icon: DollarSign },
        { name: "Rent Collection", href: mkp("/rent-collection"), icon: CreditCard },
        { name: "Financial Dashboard", href: mkp("/financial"), icon: TrendingUp },
        { name: "HST / GST Tracker", href: mkp("/tax-tracker"), icon: Receipt },
        { name: "T776 Tax Report", href: mkp("/t776"), icon: FileText },
        { name: "Invoices", href: mkp("/invoices"), icon: Receipt },
      ],
    },
    {
      name: "Growth", href: mkp("/listing-syndication"), icon: Share2, section: "GROW",
      children: [
        { name: "Listing Syndication", href: mkp("/listing-syndication"), icon: Share2 },
        { name: "Deposit-Free Shield", href: mkp("/deposit-free"), icon: ShieldCheck },
        { name: "Rent Credit Building", href: mkp("/rent-credit"), icon: Star },
        { name: "Insurance Market", href: mkp("/insurance"), icon: Shield },
      ],
    },
    {
      name: "Compliance", href: mkp("/compliance"), icon: Lock,
      children: [
        { name: "Compliance Centre", href: mkp("/compliance"), icon: Lock },
        { name: "Income Verification", href: mkp("/income-verify"), icon: BadgeCheck },
      ],
    },
    {
      name: "Insights", href: mkp("/rental-intelligence"), icon: Brain, section: "ANALYSE",
      children: [
        { name: "Rental Intelligence", href: mkp("/rental-intelligence"), icon: Brain },
        { name: "Tenant Passport", href: mkp("/tenant-passport"), icon: Award },
        { name: "Analytics", href: mkp("/analytics"), icon: BarChart3 },
        { name: "Reports", href: mkp("/reports"), icon: FileBarChart },
      ],
    },
    {
      name: "Settings", href: mkp("/settings"), icon: SettingsIcon, section: "ACCOUNT",
      children: [
        { name: "Messages", href: mkp("/messaging-center"), icon: MessageSquare },
        { name: "Notifications", href: mkp("/notification-center"), icon: Bell },
        { name: "Admin", href: mkp("/admin"), icon: Shield },
        { name: "Settings", href: mkp("/settings"), icon: SettingsIcon },
      ],
    },
  ];

  const isActive = (path: string) =>
    path === basePath ? location.pathname === basePath : location.pathname.startsWith(path);

  const isParentActive = (item: NavItem) =>
    item.children ? item.children.some(c => isActive(c.href)) : isActive(item.href);

  // Dark mode tokens
  const D = dark ? {
    text: "rgba(255,255,255,0.55)",
    textHover: "#fff",
    textActive: "#fff",
    bg: "transparent",
    bgHover: "rgba(255,255,255,0.07)",
    bgActive: "rgba(10,122,82,0.22)",
    border: "rgba(255,255,255,0.06)",
    sectionHdr: "rgba(255,255,255,0.22)",
    subBorder: "rgba(255,255,255,0.1)",
    childBg: "rgba(10,122,82,0.18)",
    childText: "#5DCAA5",
    badge: "rgba(255,255,255,0.12)",
    badgeText: "rgba(255,255,255,0.5)",
    icon: "rgba(255,255,255,0.4)",
    iconActive: "#5DCAA5",
    iconHover: "rgba(255,255,255,0.8)",
  } : {
    text: "#767570",
    textHover: "#0E0F0C",
    textActive: "#fff",
    bg: "transparent",
    bgHover: "#F8F7F4",
    bgActive: G,
    border: "rgba(0,0,0,0.07)",
    sectionHdr: "#9CA3AF",
    subBorder: `${G}22`,
    childBg: "#E5F4EE",
    childText: G,
    badge: `${G}18`,
    badgeText: G,
    icon: "#9CA3AF",
    iconActive: "#fff",
    iconHover: G,
  };

  let lastSection = "";

  return (
    <nav aria-label="Application navigation" style={{ padding: "10px 12px 16px" }}>
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isParentActive(item);
        const expanded = expandedItem === item.name;
        const submenuId = `submenu-${item.name.toLowerCase().replace(/\s+/g, "-")}`;
        const showSectionHeader = item.section && item.section !== lastSection;
        if (item.section) lastSection = item.section;

        return (
          <div key={item.name}>
            {/* Section header */}
            {showSectionHeader && (
              <p style={{
                fontSize: 9, fontWeight: 700, color: D.sectionHdr,
                textTransform: "uppercase", letterSpacing: "0.9px",
                padding: "14px 10px 4px", margin: 0, fontFamily: SANS
              }}>
                {item.section}
              </p>
            )}

            {item.children ? (
              <>
                <button
                  onClick={() => setExpandedItem(expanded ? null : item.name)}
                  aria-expanded={expanded}
                  aria-controls={submenuId}
                  style={{
                    width: "100%", display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 10px", borderRadius: 9,
                    background: active ? D.bgActive : D.bg,
                    border: "none", cursor: "pointer",
                    fontFamily: SANS, fontSize: 13, fontWeight: active ? 600 : 500,
                    color: active ? D.textActive : D.text,
                    transition: "all 0.15s", marginBottom: 1,
                    boxShadow: active && !dark ? `0 2px 8px ${G}33` : "none",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = D.bgHover; e.currentTarget.style.color = D.textHover; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = D.bg; e.currentTarget.style.color = D.text; } }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 7,
                      background: active ? (dark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.25)") : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)"),
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <Icon size={14} color={active ? D.iconActive : D.icon} strokeWidth={2.5} />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      padding: "2px 6px", borderRadius: 20,
                      background: active ? (dark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.25)") : D.badge,
                      color: active ? D.textActive : D.badgeText
                    }}>
                      {item.children.length}
                    </span>
                    <ChevronDown
                      size={13}
                      strokeWidth={2.5}
                      color={active ? D.iconActive : D.icon}
                      style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                    />
                  </div>
                </button>

                {expanded && (
                  <div
                    id={submenuId}
                    style={{
                      marginLeft: 14, marginBottom: 6,
                      paddingLeft: 10,
                      borderLeft: `1.5px solid ${D.subBorder}`,
                    }}
                  >
                    {item.children.map(child => {
                      const CIcon = child.icon;
                      const cActive = isActive(child.href);
                      return (
                        <Link
                          key={child.name}
                          to={child.href}
                          onClick={onNavigate}
                          style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "8px 10px", borderRadius: 8,
                            fontSize: 12, fontWeight: cActive ? 600 : 400,
                            color: cActive ? D.childText : D.text,
                            background: cActive ? (dark ? "rgba(10,122,82,0.18)" : "#E5F4EE") : "transparent",
                            textDecoration: "none", marginBottom: 1, fontFamily: SANS,
                            transition: "all 0.12s",
                          }}
                          onMouseEnter={e => { if (!cActive) { e.currentTarget.style.background = D.bgHover; e.currentTarget.style.color = D.textHover; } }}
                          onMouseLeave={e => { if (!cActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = D.text; } }}
                        >
                          <CIcon size={13} color={cActive ? D.childText : D.icon} strokeWidth={2.5} />
                          <span style={{ flex: 1 }}>{child.name}</span>
                          {cActive && <div style={{ width: 5, height: 5, borderRadius: "50%", background: D.childText, flexShrink: 0 }} />}
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
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "9px 10px", borderRadius: 9,
                  fontSize: 13, fontWeight: active ? 600 : 500,
                  color: active ? D.textActive : D.text,
                  background: active ? D.bgActive : D.bg,
                  textDecoration: "none", marginBottom: 1, fontFamily: SANS,
                  transition: "all 0.15s",
                  boxShadow: active && !dark ? `0 2px 8px ${G}33` : "none",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = D.bgHover; e.currentTarget.style.color = D.textHover; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = D.bg; e.currentTarget.style.color = D.text; } }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: active ? (dark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.25)") : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)"),
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <Icon size={14} color={active ? D.iconActive : D.icon} strokeWidth={2.5} />
                </div>
                <span>{item.name}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
