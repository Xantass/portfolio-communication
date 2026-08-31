"use client";

import { useState } from "react";
import { contact } from "@portfolio/content";
import { Button, TextField } from "@portfolio/ui";
import type { ContactErrors } from "@/lib/contact";

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setErrors({});
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        errors?: ContactErrors;
      };

      if (res.ok && data.ok) {
        setSent(true);
        return;
      }
      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        return;
      }
      setFormError(contact.error);
    } catch {
      setFormError(contact.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return <p className="font-serif italic text-[20px] text-blush">{contact.success}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[560px] flex-col gap-5" noValidate>
      <TextField
        as="input"
        id="name"
        name="name"
        label="Nom"
        placeholder={contact.namePlaceholder}
        error={errors.name}
      />
      <TextField
        as="input"
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder={contact.emailPlaceholder}
        error={errors.email}
      />
      <TextField
        as="textarea"
        id="message"
        name="message"
        label="Message"
        placeholder={contact.messagePlaceholder}
        error={errors.message}
      />
      {formError ? (
        <p className="text-[13px] text-blush" role="alert">
          {formError}
        </p>
      ) : null}
      <Button
        variant="pill"
        type="submit"
        disabled={submitting}
        className="mt-3 self-start bg-accent px-8 py-[14px] text-[15px] text-ink hover:bg-blush"
      >
        {submitting ? contact.submitting : contact.submit}
      </Button>
    </form>
  );
}
