"use client";

import { useEffect } from "react";
import { Media } from "./media";
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
        className="no-scrollbar grid max-h-[88vh] w-full max-w-[1000px] grid-cols-1 overflow-auto rounded bg-bg md:grid-cols-[1.2fr_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <Media src={project.src} alt={project.title} fallbackLabel={project.fallbackLabel} aspectRatio="1/1" />
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
          <Button variant="outline" type="button" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
}
