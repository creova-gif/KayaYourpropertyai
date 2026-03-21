import { useState, useRef, useEffect } from "react";
import { useLanguage, LANGUAGES } from "../contexts/LanguageContext";
import { Globe, ChevronDown, Check } from "lucide-react";

const G = "#0A7A52";

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const btnBg = dark
    ? open ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)"
    : open ? "#F0F0EE" : "transparent";
  const btnBorder = dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.09)";
  const btnColor = dark ? "rgba(255,255,255,0.7)" : "#0E0F0C";
  const iconColor = dark ? "rgba(255,255,255,0.4)" : "#767570";

  return (
    <div ref={ref} style={{ position: "relative", display: "block" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 12px",
          background: btnBg,
          border: btnBorder,
          borderRadius: 10,
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 500,
          color: btnColor,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          transition: "all 0.15s ease",
          whiteSpace: "nowrap",
        }}
      >
        <Globe size={14} color={iconColor} />
        <span style={{ flex: 1, textAlign: "left" }}>{current.nativeLabel}</span>
        <ChevronDown
          size={13}
          color={iconColor}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: 0, right: 0,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.09)",
            borderRadius: 12,
            boxShadow: "0 -8px 24px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
            zIndex: 9999,
            overflow: "hidden",
            padding: "4px 0",
          }}
        >
          <div style={{ padding: "8px 14px 6px", fontSize: 10, fontWeight: 700, color: "#767570", letterSpacing: "0.07em", textTransform: "uppercase" }}>
            Language · Langue
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); setOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 14px",
                background: language === lang.code ? "#F0F7F4" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.12s ease",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => { if (language !== lang.code) e.currentTarget.style.background = "#F8F7F4"; }}
              onMouseLeave={(e) => { if (language !== lang.code) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>{lang.flag}</span>
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#0E0F0C" }}>{lang.nativeLabel}</span>
                <span style={{ display: "block", fontSize: 11, color: "#767570" }}>{lang.label}</span>
              </span>
              {language === lang.code && <Check size={13} color={G} strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
