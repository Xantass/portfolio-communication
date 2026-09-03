import { cn } from "./cn";

export function Body({
  size = "md",
  italic,
  children,
  className,
}: {
  size?: "sm" | "md";
  italic?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 font-sans text-ink-muted",
        size === "sm" && "text-[13px] leading-[1.4]",
        size === "md" && "text-[16px] leading-[1.85] text-ink-soft",
        italic && "font-serif italic text-[17px] leading-[1.7] text-ink-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
