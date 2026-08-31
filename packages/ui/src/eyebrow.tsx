import { cn } from "./cn";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("m-0 mb-3 text-[13px] font-semibold uppercase tracking-[3px] text-accent-soft", className)}>
      {children}
    </p>
  );
}
