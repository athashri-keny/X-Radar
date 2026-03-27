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
                Hi ${Name} 👋
              </p>

              <p style="margin:0 0 12px 0;font-size:14px;color:#666666;line-height:1.75;font-family:Arial,sans-serif;">
                You requested a verification code to access your X-Radar account.
              </p>
              <p style="margin:0 0 28px 0;font-size:14px;color:#666666;line-height:1.75;font-family:Arial,sans-serif;">
                Use the code below to complete your login.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f9f9f9;border:1px solid #eeeeee;border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 18px;text-align:center;">
                    <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;color:#aaaaaa;text-transform:uppercase;letter-spacing:0.8px;font-family:Arial,sans-serif;">
                      Your Verification Code
                    </p>
                    <p style="margin:0 0 8px 0;font-size:36px;font-weight:800;color:#111111;letter-spacing:10px;font-family:'Courier New',monospace;">
                      ${verifycode}
                    </p>
                    <p style="margin:0;font-size:12px;color:#aaaaaa;font-family:Arial,sans-serif;">
                      ⏱ Expires in 10 minutes
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px 0;font-size:13px;color:#aaaaaa;line-height:1.6;font-family:Arial,sans-serif;">
                If you didn't request this, you can safely ignore this email.
              </p>

              <p style="margin:0;font-size:14px;color:#111111;font-weight:500;font-family:Arial,sans-serif;">
                The X-Radar Team
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 36px 24px;border-top:1px solid #eeeeee;">
              <p style="margin:0;font-size:12px;color:#bbbbbb;font-family:Arial,sans-serif;">
                © 2026 X-Radar · You're receiving this because you signed in to X-Radar.
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
      from: `"X-Radar" <xradar10@gmail.com>`,
      to: UserEmail,
      subject: `${verifycode} is your X-Radar verification code`,
      text: `Hi ${Name},\n\nYour X-Radar verification code is: ${verifycode}\n\nExpires in 10 minutes.\n\n— The X-Radar Team`,
      html: htmlContent,
    });

  } catch (error) {
    console.error("Error while sending email:", error);
    return error;
  }
}

export default EmailAboutNewSignup;