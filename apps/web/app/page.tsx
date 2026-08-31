import { home, images, social } from "@portfolio/content";
import {
  Blob,
  Body,
  Button,
  Container,
  Eyebrow,
  Heading,
  IconLink,
  Media,
} from "@portfolio/ui";

export default function HomePage() {
  return (
    <section
      id="accueil"
      className="relative box-border flex h-dvh items-center justify-center overflow-hidden px-[6vw] pb-5 pt-[70px]"
    >
      <Blob tone="blush" position="accueil-top" />
      <Blob tone="olive" position="accueil-bottom" />

      <Container width="page" className="relative z-[1] px-0">
        <Heading as="h1" className="mb-7 text-center">
          {home.welcome}
        </Heading>

        <div className="grid grid-cols-1 items-center md:grid-cols-[0.85fr_1.15fr]">
          <div className="h-[314px] max-h-[28vh] w-[190px] overflow-hidden rounded-[6px]">
            <Media
              src={images.portrait}
              alt={home.portraitLabel}
              fallbackLabel={home.portraitLabel}
              aspectRatio="4/5"
              className="h-full w-full"
            />
          </div>

          <div>
            <Eyebrow className="mb-2 text-[11px]">{home.eyebrow}</Eyebrow>
            <Heading
              as="h1"
              className="mb-2.5 text-[clamp(20px,2.8vw,30px)] leading-[1.15]"
            >
              {home.heading}
            </Heading>
            <Body size="sm" className="mb-2.5">
              {home.bio}
            </Body>
            <Button variant="underline" href={home.ctaHref}>
              {home.cta}
            </Button>
            <div className="mt-3 flex gap-4">
              <IconLink network="instagram" href={social.instagram.href} />
              <IconLink network="linkedin" href={social.linkedin.href} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
