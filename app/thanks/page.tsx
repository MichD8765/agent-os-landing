import React from "react";

export default function ThanksPage() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Your Starter Pack is ready</h1>

        <p style={styles.sub}>
          Your download should have started automatically.
        </p>

        <p style={styles.body}>
          If it didn’t, you can refresh the page or try again.
        </p>

        <div style={styles.divider} />

        <h2 style={styles.h2}>If you want to go deeper</h2>

        <p style={styles.body}>The Starter Pack gives you the mental model.</p>

        <p style={styles.body}>
          If you want to actually <strong>build your system</strong>, I created
          the next step:
        </p>

        <ul style={styles.bullets}>
          <li>turn ideas into structured agents</li>
          <li>build your memory + thinking system</li>
          <li>use AI without feeling scattered</li>
        </ul>

        <a
          href="https://melody8784.gumroad.com/l/hsvwc"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
        >
          Explore the Builder Pack →
        </a>

        <p style={styles.small}>
          No pressure. You can also just start with the Starter Pack and come
          back later.
        </p>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
    padding: "40px 20px",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  } as React.CSSProperties,

  container: {
    maxWidth: "600px",
    width: "100%",
    textAlign: "left" as const,
  } as React.CSSProperties,

  h1: {
    fontSize: "34px",
    marginBottom: "10px",
  } as React.CSSProperties,

  h2: {
    fontSize: "22px",
    marginTop: "30px",
    marginBottom: "10px",
  } as React.CSSProperties,

  sub: {
    fontSize: "18px",
    color: "#374151",
    marginBottom: "10px",
  } as React.CSSProperties,

  body: {
    fontSize: "16px",
    marginBottom: "10px",
    lineHeight: 1.6,
  } as React.CSSProperties,

  bullets: {
    marginTop: "10px",
    marginBottom: "20px",
    paddingLeft: "20px",
    lineHeight: 1.7,
  } as React.CSSProperties,

  button: {
    display: "inline-block",
    background: "#111827",
    color: "#ffffff",
    padding: "12px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    marginBottom: "10px",
  } as React.CSSProperties,

  small: {
    fontSize: "13px",
    color: "#6B7280",
  } as React.CSSProperties,

  divider: {
    height: "1px",
    background: "#E5E7EB",
    margin: "20px 0",
  } as React.CSSProperties,
};