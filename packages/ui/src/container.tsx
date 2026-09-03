import { cn } from "./cn";

const widths = {
  page: "max-w-[1100px]",
  wide: "max-w-[1200px]",
  narrow: "max-w-[900px]",
} as const;

export function Container({
  width,
  children,
  className,
}: {
  width: keyof typeof widths;
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full px-[6vw]", widths[width], className)}>{children}</div>;
}
