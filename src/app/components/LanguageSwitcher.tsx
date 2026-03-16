import { useLanguage } from "../contexts/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="size-4 text-[#9CA3AF]" />
      <div className="flex gap-1 p-1 bg-[#F5F5F5] rounded-lg">
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1.5 text-[12px] font-medium rounded transition-all ${
            language === "en"
              ? "bg-white text-[#0A0A0A] shadow-sm"
              : "text-[#9CA3AF] hover:text-[#0A0A0A]"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("fr")}
          className={`px-3 py-1.5 text-[12px] font-medium rounded transition-all ${
            language === "fr"
              ? "bg-white text-[#0A0A0A] shadow-sm"
              : "text-[#9CA3AF] hover:text-[#0A0A0A]"
          }`}
        >
          FR
        </button>
      </div>
    </div>
  );
}
