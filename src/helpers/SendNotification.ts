import resend from "@/lib/Emailtransporter";
import { NextApiRequest, NextApiResponse } from "next";

function getV2EmailHtml(name: string) {
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
                Hi ${name} 👋
              </p>

              <p style="margin:0 0 12px 0;font-size:14px;color:#666666;line-height:1.75;font-family:Arial,sans-serif;">
                X-Radar V2 is live 
              </p>

              <!-- What's new card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f9f9f9;border:1px solid #eeeeee;border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 12px 0;font-size:11px;font-weight:600;color:#aaaaaa;text-transform:uppercase;letter-spacing:0.8px;font-family:Arial,sans-serif;">
                      What's new in V2
                    </p>

                    <!-- Item 1 -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                      <tr>
                        <td style="padding-right:10px;font-size:14px;color:#111111;">•</td>
                        <td>
                          <span style="font-size:14px;font-weight:600;color:#111111;font-family:Arial,sans-serif;">Sub-niches added</span>
                          <span style="font-size:14px;color:#666666;font-family:Arial,sans-serif;"> — search deeper within your niche for more targeted leads</span>
                        </td>
                      </tr>
                    </table>

                    <!-- Item 2 -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                      <tr>
                        <td style="padding-right:10px;font-size:14px;color:#111111;">•</td>
                        <td>
                          <span style="font-size:14px;font-weight:600;color:#111111;font-family:Arial,sans-serif;">Better lead filtering</span>
                          <span style="font-size:14px;color:#666666;font-family:Arial,sans-serif;"> — higher quality tweets, less noise</span>
                        </td>
                      </tr>
                    </table>

                    <!-- Item 3 -->
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:10px;font-size:14px;color:#111111;">•</td>
                        <td>
                          <span style="font-size:14px;font-weight:600;color:#111111;font-family:Arial,sans-serif;">Cleaner UI</span>
                          <span style="font-size:14px;color:#666666;font-family:Arial,sans-serif;"> — easier to find and act on leads</span>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px 0;font-size:14px;color:#666666;line-height:1.75;font-family:Arial,sans-serif;">
                Same account — just login and you'll see the difference.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:#111111;border-radius:6px;padding:12px 24px;">
                    <a href="https://x-radar-ai.vercel.app" style="color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">
                      Open X-Radar →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px 0;font-size:14px;color:#666666;font-family:Arial,sans-serif;">
                Reply to this email if you have feedback I read every response.
              </p>

              <p style="margin:24px 0 0 0;font-size:14px;color:#111111;font-weight:500;font-family:Arial,sans-serif;">
                 Athashri<br/>
                <span style="font-size:13px;color:#aaaaaa;font-weight:400;">Solo founder, building X-Radar</span>
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

export async function SendV2AnnouncementEmail(UserEmail: string, UserName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "X-Radar <hello@xradar.in>",
      to: [UserEmail],
      subject: "X-Radar just got Updated! 🚀",
      html: getV2EmailHtml(UserName),
    })

    if (error) {
      console.log("Resend error:", error)
      return { success: false, error }
    }

    console.log("Email sent successfully:", data)
    return { success: true, data }

  } catch (error) {
    console.log("Error while sending V2 email:", error)
    return { success: false, error }
  }
}