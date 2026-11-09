import { parseContactPayload } from "@/lib/contact";
import { NextResponse } from "next/server";
import { Resend } from "resend";

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
    from: "Portfolio Alizee Marques <onboarding@resend.dev>",
    to: "marques.alizee@hotmail.fr",
    replyTo: parsed.email,
    subject: `Portfolio Alizee Marques — message de ${parsed.name}`,
    text: parsed.message,
  });
  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
