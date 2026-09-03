import Image from "next/image";
import { cn } from "./cn";

function isVideo(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

export function Media({
  src,
  alt,
  fallbackLabel,
  aspectRatio,
  className,
  playback = "ambient",
  objectPosition,
  imageClassName,
}: {
  src: string | null;
  alt: string;
  fallbackLabel: string;
  aspectRatio?: string;
  className?: string;
  playback?: "ambient" | "controls";
  objectPosition?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-bg", className)} style={{ aspectRatio }}>
      {typeof src === "string" && isVideo(src) ? (
        <video
          src={src}
          className={cn("absolute inset-0 h-full w-full object-cover", imageClassName)}
          style={objectPosition ? { objectPosition } : undefined}
          muted={playback === "ambient"}
          loop={playback === "ambient"}
          playsInline
          autoPlay={playback === "ambient"}
          controls={playback === "controls"}
          preload="metadata"
          aria-label={alt}
        />
      ) : typeof src === "string" ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", imageClassName)}
          style={objectPosition ? { objectPosition } : undefined}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <span className="font-sans text-sm font-medium text-ink-muted">{fallbackLabel}</span>
        </div>
      )}
    </div>
  );
}
