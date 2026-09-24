"use client";

import { useEffect } from "react";
import { FittedMedia } from "./fitted-media";
import { Eyebrow } from "./eyebrow";
import { Heading } from "./heading";
import { Body } from "./body";
import { Button } from "./button";

export function ProjectModal({
  project,
  onClose,
  onPrevious,
  onNext,
}: {
  project: {
    title: string;
    category: string;
    description: string;
    src: string | null;
    fallbackLabel: string;
    pdf?: string;
  } | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.target instanceof HTMLElement && e.target.closest("video, input, textarea")) return;
      if (e.key === "ArrowLeft") onPrevious?.();
      if (e.key === "ArrowRight") onNext?.();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose, onPrevious, onNext]);

  if (project === null) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex animate-fadeUp items-center justify-center gap-3 bg-overlay p-[5vw] md:gap-5"
      onClick={onClose}
    >
      {onPrevious ? (
        <button
          type="button"
          aria-label="Réalisation précédente"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-bg text-ink transition-colors hover:bg-blush"
        >
          <Chevron direction="left" />
        </button>
      ) : null}
      <div
        className="no-scrollbar grid max-h-[88vh] w-full max-w-[1100px] grid-cols-1 overflow-auto rounded bg-bg md:grid-cols-[minmax(0,1.2fr)_minmax(280px,1fr)] md:items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {project.src ? (
          <FittedMedia src={project.src} alt={project.title} playback="controls" />
        ) : (
          <div className="flex min-h-[40vh] items-center justify-center px-4 text-center">
            <span className="font-sans text-sm font-medium text-ink-muted">{project.fallbackLabel}</span>
          </div>
        )}
        <div className="flex min-h-full flex-col px-12 py-14">
          <Eyebrow className="mb-[18px] text-[12px] font-bold uppercase tracking-[2px] text-accent-soft">
            {project.category}
          </Eyebrow>
          <Heading as="h3" className="text-[36px]">
            {project.title}
          </Heading>
          <Body size="md" className="flex-1 text-[18px] leading-[1.85]">
            {project.description}
          </Body>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.pdf ? (
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center rounded-full bg-accent px-[22px] py-[10px] font-sans text-[14px] font-semibold text-ink transition-colors hover:bg-blush"
              >
                Voir le PDF
              </a>
            ) : null}
            <Button variant="outline" type="button" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </div>
      {onNext ? (
        <button
          type="button"
          aria-label="Réalisation suivante"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-bg text-ink transition-colors hover:bg-blush"
        >
          <Chevron direction="right" />
        </button>
      ) : null}
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M11 4 L6 9 L11 14" : "M7 4 L12 9 L7 14"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
