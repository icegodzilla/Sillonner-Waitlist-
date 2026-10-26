"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/API/Waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, question, company }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="ok" style={{ display: "block" }} role="status">
        You are on the list. We will email you when Sillonner opens up.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="wform">
      <label htmlFor="wl-email" className="sr">
        Email address
      </label>
      <input
        id="wl-email"
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="wl-phone" className="sr">
        Phone number
      </label>
      <input
        id="wl-phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="Phone number with country code (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label htmlFor="wl-question" className="sr">
        Your question
      </label>
      <textarea
        id="wl-question"
        placeholder="Any questions for us? (optional)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hp"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining..." : "Join the waitlist"}
      </button>
      {status === "error" && (
        <p className="err" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
