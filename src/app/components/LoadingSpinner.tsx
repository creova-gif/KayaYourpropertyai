import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  fullScreen?: boolean;
  color?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  text, 
  fullScreen = false,
  color = "#0A7A52"
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "size-4",
    md: "size-8",
    lg: "size-12",
    xl: "size-16",
  };

  const textSizes = {
    sm: "text-[12px]",
    md: "text-[14px]",
    lg: "text-[16px]",
    xl: "text-[20px]",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 
        className={`${sizeClasses[size]} animate-spin`}
        style={{ color }}
        strokeWidth={2.5}
      />
      {text && (
        <p 
          className={`${textSizes[size]} text-[#767570] font-medium`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

// Button Loading Spinner (inline)
export function ButtonSpinner({ size = "sm" }: { size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "size-4" : "size-5";
  
  return (
    <Loader2 
      className={`${sizeClass} animate-spin`}
      strokeWidth={2.5}
    />
  );
}

// Skeleton Loading Component
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-[#F8F7F4] rounded w-3/4"></div>
      <div className="h-4 bg-[#F8F7F4] rounded w-1/2"></div>
      <div className="h-20 bg-[#F8F7F4] rounded"></div>
      <div className="flex gap-2">
        <div className="h-10 bg-[#F8F7F4] rounded flex-1"></div>
        <div className="h-10 bg-[#F8F7F4] rounded flex-1"></div>
      </div>
    </div>
  );
}

// Table Skeleton
export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-lg">
          <div className="size-10 bg-[#F8F7F4] rounded-full flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-[#F8F7F4] rounded w-3/4"></div>
            <div className="h-3 bg-[#F8F7F4] rounded w-1/2"></div>
          </div>
          <div className="h-8 bg-[#F8F7F4] rounded w-24"></div>
        </div>
      ))}
    </div>
  );
}
