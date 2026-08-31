import Image from "next/image";
import { cn } from "./cn";

export function Media({
  src,
  alt,
  fallbackLabel,
  aspectRatio,
  className,
}: {
  src: string | null;
  alt: string;
  fallbackLabel: string;
  aspectRatio: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-bg", className)} style={{ aspectRatio }}>
      {typeof src === "string" ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <span className="font-sans text-sm font-medium text-ink-muted">{fallbackLabel}</span>
        </div>
      )}
    </div>
  );
}
