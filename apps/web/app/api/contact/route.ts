import { NextResponse } from "next/server";
import { Resend } from "resend";
import { parseContactPayload } from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const parsed = parseContactPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 400 });
  }
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: "Portfolio Emma <beth.t@example.com>",
    to: "marques.alizee@hotmail.fr",
    replyTo: parsed.email,
    subject: `Portfolio — message de ${parsed.name}`,
    text: parsed.message,
  });
  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
