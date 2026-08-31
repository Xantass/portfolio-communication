import { cn } from "./cn";

export function Tab({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full px-6 py-[10px] font-sans text-[14px] font-semibold",
        active ? "border-0 bg-accent text-bg" : "border border-accent-soft bg-transparent text-ink",
      )}
    >
      {children}
    </button>
  );
}
