export default function ThanksPage() {
  return (
    <main style={{ padding: 44, maxWidth: 760, margin: "0 auto", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 34, marginBottom: 10 }}>You’re in.</h1>
      <p style={{ fontSize: 16, lineHeight: 1.6 }}>
        Your download should have started automatically.
        <br />
        If it didn’t, retry here:
      </p>

      <a
        href="/api/download?file=Agent-OS-Starter-Pack.pdf"
        style={{
          display: "inline-block",
          marginTop: 10,
          padding: "12px 16px",
          borderRadius: 12,
          background: "#111827",
          color: "white",
          textDecoration: "none",
        }}
      >
        Download the PDF
      </a>

      <p style={{ marginTop: 20, color: "#6B7280" }}>
        Next: The 60-Day AI Agent Quest begins March 1.
      </p>
    </main>
  );
}