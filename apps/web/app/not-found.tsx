import { Button, Heading, Body } from "@portfolio/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-bg px-[6vw] text-center">
      <Heading as="h1">Page introuvable</Heading>
      <Body className="mt-4" size="md">
        Cette page n&apos;existe pas.
      </Body>
      <Button variant="pill" href="/" className="mt-8">
        Retour à l&apos;accueil
      </Button>
    </section>
  );
}
