// Sends a submission to Formspree from the server, so the form ID
// stays in an environment variable and is never sent to the browser.
export async function sendToFormspree(
  formId: string,
  data: Record<string, string>
): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Formspree rejected the submission, status:", res.status);
    }
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error("Could not reach Formspree:", err);
    return { ok: false, status: 0 };
  }
}

