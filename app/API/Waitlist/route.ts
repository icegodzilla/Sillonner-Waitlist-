import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendToFormspree } from "../../../lib/formsfree";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(25, "That phone number looks too long.")
    .regex(/^(\+?[0-9][0-9\s()\-]{5,23})?$/, "Enter a valid phone number, or leave it empty.")
    .optional(),
  question: z.string().trim().max(2000, "Your question is too long.").optional(),
  company: z.string().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  const formId = process.env.FORMSPREE_WAITLIST_ID;

  if (!url || !key || !formId) {
    console.error("Waitlist configuration is incomplete.");
    return NextResponse.json(
      { error: "Signups are temporarily unavailable. Please try again soon." },
      { status: 500 }
    );
  }

  const email = parsed.data.email.toLowerCase();

  try {
    const supabaseUrl = url.replace(/\/+$/, "").replace(/\/rest\/v1$/, "");

const response = await fetch(
  `${supabaseUrl}/rest/v1/waitlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          email,
          phone: parsed.data.phone || null,
          question: parsed.data.question || null,
        }),
        cache: "no-store",
      }
    );

    if (response.status === 409) {
      return NextResponse.json(
        { error: "You're already on the waitlist.", code: "ALREADY_REGISTERED" },
        { status: 409 }
      );
    }

    if (!response.ok) {
      console.error(
  "Supabase waitlist insert failed:",
  response.status,
  await response.text()
);
      return NextResponse.json(
        { error: "We could not save your signup. Please try again." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Supabase request failed:", error);
    return NextResponse.json(
      { error: "We could not save your signup. Please try again." },
      { status: 502 }
    );
  }

  const payload: Record<string, string> = {
    email,
    _subject: "New Sillonner waitlist signup",
  };

  if (parsed.data.phone) payload.phone = parsed.data.phone;
  if (parsed.data.question) payload.message = parsed.data.question;

  const notification = await sendToFormspree(formId, payload);

  if (!notification.ok) {
    console.error("Waitlist saved, but Formspree notification failed:", notification.status);
    return NextResponse.json({
      success: true,
      notification: "failed",
      message: "Your signup was saved, but email notification could not be sent.",
    }, { status: 201 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
        }
  
