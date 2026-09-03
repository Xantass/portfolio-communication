import { skills } from "@portfolio/content";
import { Body, Container, Eyebrow, Heading, SkillBand } from "@portfolio/ui";

export default function CompetencesPage() {
  return (
    <section id="competences" className="pt-[120px]">
      <Container width="page" className="pb-10 pt-[60px]">
        <Eyebrow className="text-[14px]">01 — Savoir-faire</Eyebrow>
        <Heading as="h2">Mes compétences</Heading>
        <Body italic className="max-w-[480px]">
            Mes compétences se sont construites à la croisée de ma formation en communication, de mes expériences en stage et en alternance, et de mes passions personnelles.
            Ce parcours m'a permis d'allier une approche stratégique et éditoriale à une véritable sensibilité créative, nourrie par mon goût pour l'image et la vidéo.
        </Body>
      </Container>
      {skills.map((skill, index) => (
        <SkillBand key={skill.num} {...skill} index={index} />
      ))}
    </section>
  );
}
