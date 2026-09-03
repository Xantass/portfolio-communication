import { cn } from "./cn";

export function Blob({ tone, position }: { tone: "blush" | "olive"; position: "accueil-top" | "accueil-bottom" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-0 rounded-full",
        tone === "blush" && "bg-blush opacity-60 blur-[2px]",
        tone === "olive" && "bg-olive opacity-20",
        position === "accueil-top" && "right-[-8%] top-[-10%] h-[420px] w-[420px]",
        position === "accueil-bottom" && "bottom-[-12%] left-[-10%] h-[360px] w-[360px]",
      )}
    />
  );
}
