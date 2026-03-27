import transporter from "@/lib/Emailtransporter";

function getEmailHtml(email: string, niche: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">

        <table width="520" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:10px;max-width:520px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:24px 36px;border-bottom:1px solid #eeeeee;">
              <span style="font-size:18px;font-weight:800;color:#111111;font-family:Arial,sans-serif;letter-spacing:-0.5px;">X-Radar</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 36px 28px;">

              <p style="margin:0 0 20px 0;font-size:20px;font-weight:700;color:#111111;font-family:Arial,sans-serif;">
                Hi ${email} 👋
              </p>

              <p style="margin:0 0 12px 0;font-size:14px;color:#666666;line-height:1.75;font-family:Arial,sans-serif;">
                Your early access to X-Radar is ready!
              </p>
              <p style="margin:0 0 12px 0;font-size:14px;color:#666666;line-height:1.75;font-family:Arial,sans-serif;">
                X-Radar hunts hiring tweets on Twitter/X in real-time, scores each lead by intent, and suggests the perfect reply so you can close faster.
              </p>
              <p style="margin:0 0 28px 0;font-size:14px;color:#666666;line-height:1.75;font-family:Arial,sans-serif;">
                Click below to get started 👇
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:#111111;border-radius:6px;padding:12px 24px;">
                    <a href="https://x-radar-ai.vercel.app" style="color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">
                      Access X-Radar →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Niche Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f9f9f9;border:1px solid #eeeeee;border-radius:8px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0 0 3px 0;font-size:11px;font-weight:600;color:#aaaaaa;text-transform:uppercase;letter-spacing:0.8px;font-family:Arial,sans-serif;">
                      Your Niche
                    </p>
                    <p style="margin:0;font-size:14px;font-weight:600;color:#111111;font-family:Arial,sans-serif;">
                      ${niche}
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0 0;font-size:14px;color:#111111;font-weight:500;font-family:Arial,sans-serif;">
                The X-Radar Team
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 36px 24px;border-top:1px solid #eeeeee;">
              <p style="margin:0;font-size:12px;color:#bbbbbb;font-family:Arial,sans-serif;">
                © 2026 X-Radar · You're receiving this because you signed up for early access.
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
}

export async function SendAccessReadyEmail(UserEmail: string, niche: string) {
  try {
    await transporter.sendMail({
      from: "X-Radar <xradar10@gmail.com>",
      to: UserEmail,
      subject: "Your X-Radar early access is ready 🎯",
      html: getEmailHtml(UserEmail, niche),
    });
  } catch (error) {
    console.log("Error while sending access ready email:", error);
  }
}