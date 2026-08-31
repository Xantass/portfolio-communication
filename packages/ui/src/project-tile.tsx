import { Media } from "./media";

export function ProjectTile({
  title,
  src,
  fallbackLabel,
  onClick,
}: {
  title: string;
  src: string | null;
  fallbackLabel: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="group relative aspect-square cursor-pointer overflow-hidden bg-tile">
      <Media src={src} alt={title} fallbackLabel={fallbackLabel} aspectRatio="1/1" className="h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center bg-ink/55 p-4 text-center opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100">
        <span className="text-[15px] font-semibold text-bg">{title}</span>
      </div>
    </button>
  );
}
