import { skills } from "@portfolio/content";
import { Container, Eyebrow, Heading, SkillBand } from "@portfolio/ui";

export default function CompetencesPage() {
  return (
    <section id="competences" className="pt-[120px]">
      <Container width="page" className="pb-10 pt-[60px]">
        <Eyebrow className="text-[14px]">01 — Savoir-faire</Eyebrow>
        <Heading as="h2">Mes compétences</Heading>
      </Container>
      {skills.map((skill, index) => (
        <SkillBand key={skill.num} {...skill} index={index} />
      ))}
    </section>
  );
}
