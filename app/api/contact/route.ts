import { prisma } from "@/lib/db";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const fields = payload as Record<string, unknown>;
  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  const message = typeof fields.message === "string" ? fields.message.trim() : "";

  if (
    name.length === 0 || name.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320 ||
    message.length === 0 || message.length > 5000
  ) {
    return Response.json({ error: "Please provide valid contact details" }, { status: 400 });
  }

  try {
    await prisma.contactMessage.create({ data: { name, email, message } });
  } catch {
    console.error("Contact submission failed");
    const status = process.env.DATABASE_URL ? 500 : 503;
    return Response.json({ error: "Message could not be saved" }, { status });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !recipient) {
    return Response.json({
      ok: true,
      emailSent: false,
      message: "Your message was saved, but email notifications are not configured yet.",
    }, { status: 201 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
        from: sender,
        to: recipient,
        replyTo: email,
        subject: "New message from your portfolio",
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Contact notification failed", error.statusCode);
      return Response.json({
        ok: true,
        emailSent: false,
        message: "Your message was saved, but the notification email could not be sent.",
      }, { status: 201 });
    }

    return Response.json({ ok: true, emailSent: true }, { status: 201 });
  } catch {
    console.error("Contact notification request failed");
    return Response.json({
      ok: true,
      emailSent: false,
      message: "Your message was saved, but the notification email could not be sent.",
    }, { status: 201 });
  }
}