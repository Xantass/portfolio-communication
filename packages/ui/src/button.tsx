import Link from "next/link";
import { cn } from "./cn";

const variants = {
  pill: "inline-flex items-center rounded-full bg-accent px-[22px] py-[10px] text-[14px] font-semibold text-bg hover:bg-accent-soft",
  ghost: "inline-flex items-center border-0 bg-transparent p-0 text-[15px] font-medium text-ink hover:text-accent",
  underline:
    "inline-flex items-center gap-[10px] border-0 border-b-2 border-accent bg-transparent pb-[6px] text-[14px] font-semibold text-ink hover:text-accent",
  outline:
    "inline-flex items-center rounded-full border border-accent-soft bg-transparent px-6 py-[10px] text-[14px] font-semibold text-ink hover:bg-blush",
} as const;

type ButtonProps = {
  variant: keyof typeof variants;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ variant, href, type = "button", disabled, className, children, onClick }: ButtonProps) {
  const cls = cn(variants[variant], "cursor-pointer font-sans transition-colors", disabled && "cursor-not-allowed opacity-50", className);
  if (href && disabled) {
    return (
      <span className={cls} aria-disabled="true">
        {children}
      </span>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
