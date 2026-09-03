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
      className="relative box-border flex min-h-dvh items-center justify-center overflow-x-hidden px-[6vw] pb-8 pt-[70px]"
    >
      <Blob tone="blush" position="accueil-top" />
      <Blob tone="olive" position="accueil-bottom" />

      <Container width="page" className="relative z-[1] px-0">
        <Heading as="h1" className="mb-7 text-center">
          {home.welcome}
        </Heading>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-stretch md:gap-14">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[6px] md:mx-0 md:aspect-auto md:h-full md:min-h-0 md:w-full md:max-w-none">
            <Media
              src={images.portrait}
              alt={home.portraitLabel}
              fallbackLabel={home.portraitLabel}
              className="h-full w-full md:absolute md:inset-0"
              objectPosition="center 70%"
              imageClassName="scale-[1.22] origin-[center_80%]"
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
            <div className="mb-3.5 flex flex-col gap-3">
              {home.bio.map((paragraph) => (
                <Body key={paragraph} size="sm">
                  {paragraph}
                </Body>
              ))}
            </div>
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
