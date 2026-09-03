const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<ContactFields>;

export function parseContactPayload(input: unknown) {
  const errors: ContactErrors = {};
  if (!input || typeof input !== "object") {
    return { ok: false as const, errors: { name: "Ce champ est requis.", email: "Ce champ est requis.", message: "Ce champ est requis." } };
  }
  const rec = input as Record<string, unknown>;
  const name = typeof rec.name === "string" ? rec.name.trim() : "";
  const email = typeof rec.email === "string" ? rec.email.trim() : "";
  const message = typeof rec.message === "string" ? rec.message.trim() : "";
  if (!name) errors.name = "Ce champ est requis.";
  if (!email) errors.email = "Ce champ est requis.";
  else if (!EMAIL.test(email)) errors.email = "Entre un email valide.";
  if (!message) errors.message = "Ce champ est requis.";
  if (Object.keys(errors).length) return { ok: false as const, errors };
  return { ok: true as const, name, email, message };
}
