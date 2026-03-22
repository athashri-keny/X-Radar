// app/privacy/page.tsx

export default function PrivacyPolicy() {
  return (
<main style={{ 
  maxWidth: "680px", 
  margin: "0 auto", 
  padding: "60px 24px", 
  fontFamily: "Arial, sans-serif", 
  color: "#111111",
  backgroundColor: "#ffffff",
  minHeight: "100vh"
}}>      <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>Privacy Policy</h1>
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "40px" }}>Last updated: March 2026</p>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>1. Who We Are</h2>
        <p style={{ fontSize: "15px", lineHeight: "1.75", color: "#444" }}>
          X-Radar ("we", "our", "us") is an AI-powered lead generation tool that helps users find hiring-intent tweets on Twitter/X.
          We are operated by Athashri Keny. You can contact us at xradar10@gmail.com.
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>2. What Data We Collect</h2>
        <p style={{ fontSize: "15px", lineHeight: "1.75", color: "#444" }}>
          When you sign up for early access or create an account, we collect:
        </p>
        <ul style={{ fontSize: "15px", lineHeight: "2", color: "#444", paddingLeft: "20px" }}>
          <li>Your email address</li>
          <li>Your name (via Google OAuth)</li>
          <li>Your niche/industry preference</li>
          <li>Basic usage data (searches run, leads viewed)</li>
        </ul>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>3. How We Use Your Data</h2>
        <p style={{ fontSize: "15px", lineHeight: "1.75", color: "#444" }}>
          We use your data to:
        </p>
        <ul style={{ fontSize: "15px", lineHeight: "2", color: "#444", paddingLeft: "20px" }}>
          <li>Send you early access and product updates via email</li>
          <li>Personalize your lead search results based on your niche</li>
          <li>Improve the product based on usage patterns</li>
          <li>Contact you about your account</li>
        </ul>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>4. Google OAuth</h2>
        <p style={{ fontSize: "15px", lineHeight: "1.75", color: "#444" }}>
          We use Google OAuth for authentication. When you sign in with Google, we receive your name and email address.
          We do not receive your Google password or access to your Google account beyond basic profile information.
          We do not share this data with any third parties.
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>5. Data Storage</h2>
        <p style={{ fontSize: "15px", lineHeight: "1.75", color: "#444" }}>
          Your data is stored securely in MongoDB. We do not sell, rent, or share your personal data with third parties
          for marketing purposes.
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>6. Emails</h2>
        <p style={{ fontSize: "15px", lineHeight: "1.75", color: "#444" }}>
          By signing up for early access, you agree to receive occasional emails from us about product updates and your
          account. You can unsubscribe at any time by replying to any email with "unsubscribe".
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>7. Your Rights</h2>
        <p style={{ fontSize: "15px", lineHeight: "1.75", color: "#444" }}>
          You can request to view, update, or delete your data at any time by emailing us at xradar10@gmail.com.
          We will respond within 7 days.
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>8. Cookies</h2>
        <p style={{ fontSize: "15px", lineHeight: "1.75", color: "#444" }}>
          We use only essential cookies required for authentication (session cookies). We do not use tracking or
          advertising cookies.
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>9. Changes to This Policy</h2>
        <p style={{ fontSize: "15px", lineHeight: "1.75", color: "#444" }}>
          We may update this policy as the product grows. We will notify you of significant changes via email.
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>10. Contact</h2>
        <p style={{ fontSize: "15px", lineHeight: "1.75", color: "#444" }}>
          For any privacy-related questions, contact us at{" "}
          <a href="mailto:xradar10@gmail.com" style={{ color: "#111", fontWeight: "600" }}>
            xradar10@gmail.com
          </a>
        </p>
      </section>

      <div style={{ borderTop: "1px solid #eee", paddingTop: "24px", marginTop: "40px" }}>
        <a href="/" style={{ fontSize: "14px", color: "#888", textDecoration: "none" }}>← Back to X-Radar</a>
      </div>
    </main>
  );
}