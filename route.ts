import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendToFormspree } from "@/lib/formspree";

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
  company: z.string().optional(), // hidden field, real people leave it empty
});

export async function POST(req: NextRequest) {
  const formId = process.env.FORMSPREE_WAITLIST_ID;
  if (!formId) {
    console.error("FORMSPREE_WAITLIST_ID is not set.");
    return NextResponse.json(
      { error: "Signups are not available right now. Please try again soon." },
      { status: 500 }
    );
  }

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

  // Bots fill the hidden field. Pretend it worked and drop it.
  if (parsed.data.company) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const payload: Record<string, string> = {
    email: parsed.data.email,
    _subject: "New Sillonner waitlist signup",
  };
  if (parsed.data.phone) {
    payload.phone = parsed.data.phone;
  }
  if (parsed.data.question) {
    payload.message = parsed.data.question;
  }

  const result = await sendToFormspree(formId, payload);
  if (!result.ok) {
    return NextResponse.json(
      { error: "We could not save your signup. Please try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
