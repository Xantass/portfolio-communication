"use client";

import { useEffect, useState } from "react";

function isVideo(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

export function FittedMedia({
  src,
  alt,
  playback = "controls",
}: {
  src: string;
  alt: string;
  playback?: "ambient" | "controls";
}) {
  const [ratio, setRatio] = useState<number | null>(null);

  useEffect(() => {
    setRatio(null);
  }, [src]);

  const boxStyle = ratio
    ? {
        aspectRatio: String(ratio),
        width: `min(100%, calc(80vh * ${ratio}))`,
        maxHeight: "80vh",
      }
    : { width: "100%", maxHeight: "80vh" };

  return (
    <div className="flex w-full items-center justify-center self-center p-4 md:p-6">
      <div className="relative overflow-hidden" style={boxStyle}>
        {isVideo(src) ? (
          <video
            src={src}
            className="h-full w-full object-cover"
            muted={playback === "ambient"}
            loop={playback === "ambient"}
            playsInline
            autoPlay={playback === "ambient"}
            controls={playback === "controls"}
            preload="metadata"
            aria-label={alt}
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              if (v.videoHeight > 0) setRatio(v.videoWidth / v.videoHeight);
            }}
          />
        ) : (
          // Native img so the box can adopt the file's real aspect ratio.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onLoad={(e) => {
              const i = e.currentTarget;
              if (i.naturalHeight > 0) setRatio(i.naturalWidth / i.naturalHeight);
            }}
          />
        )}
      </div>
    </div>
  );
}
