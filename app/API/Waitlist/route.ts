import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendToFormspree } from "../../../lib/formsfree";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(25).optional(),
  question: z.string().trim().max(2000).optional(),
  company: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  const formId = process.env.FORMSPREE_WAITLIST_ID;

  if (!url || !key || !formId) {
    return NextResponse.json(
      { error: "Signups are temporarily unavailable." },
      { status: 500 }
    );
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const email = parsed.data.email.toLowerCase();
  const payload: Record<string, string> = { email };

  if (parsed.data.phone) payload.phone = parsed.data.phone;
  if (parsed.data.question) payload.question = parsed.data.question;

  let response: Response;

  try {
    response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the server. Please try again." },
      { status: 502 }
    );
  }

  if (!response.ok) {
    const details = await response.text();
    console.error("Supabase signup failed:", response.status, details);

    if (response.status === 409 || details.includes("23505")) {
      return NextResponse.json(
        { error: "This email has already joined the waitlist." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "We could not save your signup. Please try again." },
      { status: 502 }
    );
  }

  const notification = await sendToFormspree(formId, {
    email,
    _subject: "New Sillonner waitlist signup",
    ...(parsed.data.phone ? { phone: parsed.data.phone } : {}),
    ...(parsed.data.question ? { message: parsed.data.question } : {}),
  });

  if (!notification.ok) {
    console.error("Signup saved, but Formspree notification failed.");
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
