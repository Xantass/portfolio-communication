"use client";

import { useState } from "react";
import { images, projects } from "@portfolio/content";
import {
  Body,
  Container,
  Eyebrow,
  Heading,
  Media,
  ProjectModal,
  ProjectTile,
  Tab,
} from "@portfolio/ui";

export function RealisationsView() {
  const [tab, setTab] = useState<"social" | "print">("social");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = projects.filter((p) =>
    tab === "social" ? p.category === "Réseaux sociaux" : p.category === "Print",
  );

  const selected = projects.find((p) => p.id === selectedId) ?? null;
  const modalProject = selected
    ? {
        title: selected.title,
        category: selected.category,
        description: selected.description,
        src: images.projects[selected.id],
        fallbackLabel: `${selected.category} — ${selected.title}`,
      }
    : null;

  return (
    <section id="realisations">
      <div className="box-border grid h-dvh grid-cols-1 items-center gap-16 bg-sand px-[6vw] pb-10 pt-[100px] md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow className="mb-3.5">02 — Portfolio</Eyebrow>
          <Heading as="h2" className="mb-[22px] text-[clamp(38px,6vw,68px)]">
            Mes réalisations
          </Heading>
          <Body italic className="max-w-[480px]">
            Un aperçu de mes créations, entre contenus pensés pour les réseaux sociaux et supports
            imprimés — clique sur une vignette pour découvrir chaque projet.
          </Body>
        </div>
        <div className="max-h-[70vh] overflow-hidden rounded-[6px]">
          <Media
            src={images.realisationsHero}
            alt="Visuel de mise en avant"
            fallbackLabel="Visuel de mise en avant"
            aspectRatio="4/5"
          />
        </div>
      </div>

      <Container width="wide" className="py-[100px]">
        <div className="mb-12 flex gap-3.5">
          <Tab active={tab === "social"} onClick={() => setTab("social")}>
            Réseaux sociaux
          </Tab>
          <Tab active={tab === "print"} onClick={() => setTab("print")}>
            Print
          </Tab>
        </div>

        <div className="grid grid-cols-2 gap-1.5 md:grid-cols-4">
          {visible.map((p) => (
            <ProjectTile
              key={p.id}
              title={p.title}
              src={images.projects[p.id]}
              fallbackLabel={`${p.category} — ${p.title}`}
              onClick={() => setSelectedId(p.id)}
            />
          ))}
        </div>
      </Container>

      <ProjectModal project={modalProject} onClose={() => setSelectedId(null)} />
    </section>
  );
}
