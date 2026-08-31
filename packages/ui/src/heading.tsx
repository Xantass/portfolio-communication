import { cn } from "./cn";

const sizes = {
  h1: "font-serif text-[clamp(26px,3.6vw,38px)] font-semibold text-ink",
  h2: "font-serif text-[clamp(36px,5vw,56px)] font-semibold text-ink",
  h3: "font-serif text-[clamp(28px,4vw,42px)] font-semibold text-ink",
} as const;

export function Heading({
  as: Tag,
  children,
  className,
}: {
  as: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}) {
  return <Tag className={cn(sizes[Tag], "m-0", className)}>{children}</Tag>;
}
