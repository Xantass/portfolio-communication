import { contact, social } from "@portfolio/content";
import { Container, Eyebrow, Heading } from "@portfolio/ui";
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <section id="contact" className="min-h-dvh bg-contact text-bg px-[6vw] pb-[100px] pt-[160px]">
      <Container width="narrow">
        <Eyebrow className="text-accent">{contact.eyebrow}</Eyebrow>
        <Heading as="h2" className="text-bg">
          {contact.heading}
        </Heading>
        <ContactForm />
        <footer className="mt-16 flex gap-7 border-t border-ink-soft pt-8">
          <a
            href={social.instagram.href}
            className="text-[14px] font-medium text-blush no-underline hover:text-accent"
          >
            {social.instagram.label}
          </a>
          <a
            href={social.linkedin.href}
            className="text-[14px] font-medium text-blush no-underline hover:text-accent"
          >
            {social.linkedin.label}
          </a>
          <a
            href={contact.mailto}
            className="text-[14px] font-medium text-blush no-underline hover:text-accent"
          >
            {contact.displayEmail}
          </a>
        </footer>
      </Container>
    </section>
  );
}
