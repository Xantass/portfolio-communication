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
}) {
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  if (project === null) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex animate-fadeUp items-center justify-center bg-overlay p-[5vw]"
      onClick={onClose}
    >
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
    </div>
  );
}
