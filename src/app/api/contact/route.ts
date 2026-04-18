import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM = process.env.CONTACT_FROM || "ByFabian <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || "fabian.arndt.info@gmail.com";

export async function POST(req: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const company = String(payload.company || "").trim();
  const brief = String(payload.brief || "").trim();

  if (!name || !email || !brief) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No mailer configured — accept silently in preview, log on the server.
    console.warn("[contact] RESEND_API_KEY missing, dropping submission:", { name, email, company });
    return NextResponse.json({ ok: true, dryRun: true });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `New brief — ${name}${company ? ` (${company})` : ""}`,
    text: `From: ${name} <${email}>\nCompany: ${company || "—"}\n\n${brief}`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Could not send. Try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
