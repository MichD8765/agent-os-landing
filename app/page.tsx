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

          <h1 style={styles.h1}>Feeling mentally overloaded?</h1>

          <p style={styles.subhead}>
            Most people don’t struggle with work. They struggle with too many
            things living in their head.
          </p>

          <p style={styles.body}>
            This free <strong>Agent OS Starter Pack</strong> shows you how to:
          </p>

          <ul style={styles.bullets}>
            <li>reduce mental clutter</li>
            <li>structure your thinking</li>
            <li>stop repeating the same decisions</li>
            <li>build a simple AI system that thinks with you</li>
          </ul>

          <div style={styles.ctaRow}>
            <button style={styles.primaryBtn} onClick={() => setOpen(true)}>
              Get My Free Starter Pack
            </button>
            <span style={styles.microText}>
              Instant download • No spam • Unsubscribe anytime
            </span>
          </div>
        </header>

        <section style={styles.infoCard}>
          <h2 style={styles.h2}>What you’ll get</h2>
          <ul style={styles.bullets}>
            <li>The 5-Agent Framework</li>
            <li>A simple shift from prompts → systems</li>
            <li>A clearer way to use AI without overwhelm</li>
            <li>A starting point to build your own thinking system</li>
          </ul>
        </section>

        <section style={styles.infoCard}>
          <h2 style={styles.h2}>Who this is for</h2>
          <ul style={styles.bullets}>
            <li>you feel mentally overloaded</li>
            <li>you’re constantly switching between tasks</li>
            <li>you think a lot but don’t have a system</li>
            <li>you want clarity without complexity</li>
          </ul>
        </section>

        <footer style={styles.footer}>
          <span style={styles.footerText}>
            © {year} • The 60-Day AI Agent Quest
          </span>
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
          Enter your email and I’ll send you the PDF instantly.
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
            {status === "loading" ? "Sending..." : "Get My Free Starter Pack"}
          </button>

          <p style={styles.tiny}>No spam. One calm system. Unsubscribe anytime.</p>

          {msg ? (
            <p
              style={{
                ...styles.notice,
                ...(status === "error" ? styles.noticeError : styles.noticeOk),
              }}
            >
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
  container: {
    width: "100%",
    maxWidth: 860,
    display: "flex",
    flexDirection: "column",
    gap: 22,
  },
  card: {
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: "34px 28px",
  },
  infoCard: {
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: "28px 28px",
  },
  badge: {
    display: "inline-flex",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #E5E7EB",
    color: "#374151",
    fontSize: 13,
    marginBottom: 14,
  },
  h1: {
    fontSize: 44,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    margin: "0 0 12px 0",
  },
  h2: {
    margin: "0 0 10px 0",
    fontSize: 24,
    letterSpacing: "-0.01em",
  },
  subhead: {
    fontSize: 18,
    lineHeight: 1.55,
    margin: "0 0 14px 0",
    color: "#374151",
  },
  body: {
    fontSize: 16,
    lineHeight: 1.6,
    margin: "0 0 10px 0",
    color: "#111827",
  },
  bullets: {
    margin: "0 0 22px 18px",
    padding: 0,
    lineHeight: 1.75,
    fontSize: 16,
  },
  ctaRow: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "flex-start",
  },
  primaryBtn: {
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "12px 16px",
    fontSize: 16,
    cursor: "pointer",
  },
  microText: {
    fontSize: 13,
    color: "#6B7280",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 6,
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
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
  modalSub: {
    margin: "0 0 16px 0",
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 1.5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  input: {
    border: "1px solid #D1D5DB",
    borderRadius: 12,
    padding: "12px 12px",
    fontSize: 15,
    outline: "none",
  },
  tiny: {
    margin: "4px 0 0 0",
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  notice: {
    margin: "6px 0 0 0",
    fontSize: 13,
    padding: "10px 12px",
    borderRadius: 12,
    textAlign: "center",
  },
  noticeOk: {
    background: "#ECFDF5",
    color: "#065F46",
    border: "1px solid #A7F3D0",
  },
  noticeError: {
    background: "#FEF2F2",
    color: "#991B1B",
    border: "1px solid #FECACA",
  },
};