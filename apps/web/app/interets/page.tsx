import { images, interests } from "@portfolio/content";
import { Body, Eyebrow, Heading, InterestBand, Media } from "@portfolio/ui";

export default function InteretsPage() {
  return (
    <section id="interets">
      <div className="box-border grid h-dvh grid-cols-1 items-center gap-16 px-[6vw] pb-10 pt-[100px] md:grid-cols-[0.9fr_1.1fr]">
        <div className="max-h-[70vh] overflow-hidden rounded-[6px]">
          <Media
            src={images.interetsHero}
            alt="Visuel de mise en avant"
            fallbackLabel="Visuel de mise en avant"
            aspectRatio="4/5"
          />
        </div>
        <div>
          <Eyebrow className="mb-3.5">03 — Inspirations</Eyebrow>
          <Heading as="h2" className="mb-[22px] text-[clamp(38px,6vw,68px)]">
            Mes centres d&apos;intérêt
          </Heading>
          <Body italic className="max-w-[480px]">
            Ce qui m&apos;anime en dehors du travail nourrit directement ma manière de créer — chaque
            passion trouve un écho dans mes projets de communication.
          </Body>
        </div>
      </div>

      {interests.map((item) => (
        <InterestBand
          key={item.label}
          label={item.label}
          desc={item.desc}
          tone={item.tone}
          imgSrc={images.interests[item.imgKey]}
          imgLabel={item.label}
          direction={item.direction}
        />
      ))}
    </section>
  );
}
