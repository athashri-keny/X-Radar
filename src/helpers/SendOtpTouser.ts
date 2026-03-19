import transporter from "@/lib/Emailtransporter";

async function EmailAboutNewSignup(
  UserEmail: string,
  verifycode: string,
  Name: string
) {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your X-Radar OTP</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#111111;border-radius:12px;border:1px solid #222222;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:36px 40px;text-align:center;">
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:2px;text-transform:uppercase;">
                ✦ X-RADAR
              </h1>
              <p style="margin:6px 0 0;font-size:12px;color:#7b93b4;letter-spacing:3px;text-transform:uppercase;">
                Lead Intelligence Platform
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:13px;color:#555555;text-transform:uppercase;letter-spacing:2px;">
                Hello,
              </p>
              <h2 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#ffffff;">
                ${Name} 👋
              </h2>
              <p style="margin:0 0 28px;font-size:15px;color:#aaaaaa;line-height:1.7;">
                You requested a one-time verification code to access your X-Radar account.
                Use the code below to complete your login.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="background:#0a0a0a;border:1px solid #2a2a2a;border-radius:10px;padding:28px 20px;margin:0 0 28px;">
                      <p style="margin:0 0 10px;font-size:11px;color:#555555;text-transform:uppercase;letter-spacing:3px;">
                        Your Verification Code
                      </p>
                      <p style="margin:0;font-size:40px;font-weight:700;color:#4f9cf9;letter-spacing:10px;font-family:'Courier New',monospace;">
                        ${verifycode}
                      </p>
                      <p style="margin:12px 0 0;font-size:12px;color:#444444;">
                        ⏱ Expires in 10 minutes
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#555555;line-height:1.6;">
                If you didn't request this, you can safely ignore this email.
                Someone may have entered your email by mistake.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #1e1e1e;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#333333;">
                © ${new Date().getFullYear()} X-Radar · Built for lead intelligence
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#2a2a2a;">
                Do not reply to this email · This is an automated message
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"X-Radar" <athashrikeny94@gmail.com>`,
      to: UserEmail,
      subject: `${verifycode} is your X-Radar verification code`,
      text: `Hello ${Name},\n\nYour X-Radar verification code is: ${verifycode}\n\nThis code expires in 10 minutes.\n\nIf you didn't request this, ignore this email.\n\n— X-Radar Team`,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Error while sending email:", error);
    return error;
  }
}

export default EmailAboutNewSignup;