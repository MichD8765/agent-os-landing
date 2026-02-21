"use client";

import { useMemo, useState } from "react";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.card}>
          <div style={styles.badge}>Free PDF</div>

          <h1 style={styles.h1}>Build your first digital thinking partner</h1>

          <p style={styles.subhead}>
            The Agent OS Starter Pack is a calm, practical introduction to AI agents and automation —
            so you can free up time and reduce mental overload.
          </p>

          <ul style={styles.bullets}>
            <li>What an AI agent actually is (no hype)</li>
            <li>The “Agent OS Model”: intent, memory, tools, loops</li>
            <li>Your first seed prompt to start using today</li>
            <li>A simple automation mindset that saves hours</li>
          </ul>

          <div style={styles.ctaRow}>
            <button style={styles.primaryBtn} onClick={() => setOpen(true)}>
              Get the Free Starter Pack
            </button>
            <span style={styles.microText}>
              Instant download • No spam • Unsubscribe anytime
            </span>
          </div>
        </header>

        <footer style={styles.footer}>
          <span style={styles.footerText}>© {year} • The 60-Day AI Agent Quest</span>
        </footer>
      </div>

      {open && <EmailModal onClose={() => setOpen(false)} />}
    </main>
  );
}

function EmailModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "agent-os-starter-pack" }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");

      // Start download (served via API)
      window.location.href = "/api/download?file=Agent-OS-Starter-Pack.pdf";

      setStatus("success");
      setMsg("Success! Your download should start immediately.");

      setTimeout(() => {
        onClose();
        window.location.href = "/thanks";
      }, 700);
    } catch (err: any) {
      setStatus("error");
      setMsg(err?.message || "Please try again.");
    }
  }

  return (
    <div style={styles.overlay} onMouseDown={onClose}>
      <div style={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h2 style={styles.h2}>Get the Agent OS Starter Pack</h2>
        <p style={styles.modalSub}>
          Enter your email and I’ll send you the PDF instantly (and keep you posted on the Quest).
        </p>

        <form onSubmit={onSubmit} style={styles.form}>
          <label style={styles.label}>
            Email address
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
            />
          </label>

          <button style={{ ...styles.primaryBtn, width: "100%" }} disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send me the PDF"}
          </button>

          <p style={styles.tiny}>No spam. One calm system. Unsubscribe anytime.</p>

          {msg ? (
            <p style={{ ...styles.notice, ...(status === "error" ? styles.noticeError : styles.noticeOk) }}>
              {msg}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111827",
    display: "flex",
    justifyContent: "center",
    padding: "56px 18px",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
  },
  container: { width: "100%", maxWidth: 860, display: "flex", flexDirection: "column", gap: 22 },
  card: { border: "1px solid #E5E7EB", borderRadius: 16, padding: "34px 28px" },
  badge: {
    display: "inline-flex",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #E5E7EB",
    color: "#374151",
    fontSize: 13,
    marginBottom: 14,
  },
  h1: { fontSize: 44, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 12px 0" },
  subhead: { fontSize: 18, lineHeight: 1.55, margin: "0 0 18px 0", color: "#374151" },
  bullets: { margin: "0 0 22px 18px", padding: 0, lineHeight: 1.75, fontSize: 16 },
  ctaRow: { display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" },
  primaryBtn: {
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "12px 16px",
    fontSize: 16,
    cursor: "pointer",
  },
  microText: { fontSize: 13, color: "#6B7280" },
  footer: { display: "flex", justifyContent: "center", paddingTop: 6 },
  footerText: { fontSize: 12, color: "#9CA3AF" },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(17,24,39,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  modal: {
    width: "100%",
    maxWidth: 520,
    background: "#fff",
    borderRadius: 18,
    border: "1px solid #E5E7EB",
    padding: "24px 22px",
    position: "relative",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    border: "1px solid #E5E7EB",
    background: "#fff",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
  },
  h2: { margin: "0 0 8px 0", fontSize: 22, letterSpacing: "-0.01em" },
  modalSub: { margin: "0 0 16px 0", fontSize: 14, color: "#4B5563", lineHeight: 1.5 },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  label: { fontSize: 13, color: "#374151", display: "flex", flexDirection: "column", gap: 6 },
  input: {
    border: "1px solid #D1D5DB",
    borderRadius: 12,
    padding: "12px 12px",
    fontSize: 15,
    outline: "none",
  },
  tiny: { margin: "4px 0 0 0", fontSize: 12, color: "#6B7280", textAlign: "center" },
  notice: { margin: "6px 0 0 0", fontSize: 13, padding: "10px 12px", borderRadius: 12, textAlign: "center" },
  noticeOk: { background: "#ECFDF5", color: "#065F46", border: "1px solid #A7F3D0" },
  noticeError: { background: "#FEF2F2", color: "#991B1B", border: "1px solid #FECACA" },
};