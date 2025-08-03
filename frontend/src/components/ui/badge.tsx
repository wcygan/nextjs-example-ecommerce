import { cn } from "@/lib/utils";

interface BadgeProps {
  type: "new" | "sale" | "limited";
  text?: string;
  className?: string;
}

export function Badge({ type, text, className }: BadgeProps) {
  const variants = {
    new: {
      bg: "bg-emerald-500",
      text: "text-white",
      label: text || "New",
    },
    sale: {
      bg: "bg-red-500",
      text: "text-white",
      label: text || "Sale",
    },
    limited: {
      bg: "bg-slate-900",
      text: "text-white",
      label: text || "Limited",
    },
  };

  const variant = variants[type];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md",
        variant.bg,
        variant.text,
        className
      )}
    >
      {variant.label}
    </span>
  );
}