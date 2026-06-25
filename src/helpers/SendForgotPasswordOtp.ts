import resend from "@/lib/Emailtransporter";

function generateForgotPasswordHtml(Name: string, Otp: string): string {
    const digits = Otp.split("");

    const digitBoxes = digits
        .map(
            (d) =>
                `<span style="display:inline-block;width:36px;height:44px;line-height:44px;text-align:center;font-size:22px;font-weight:700;color:#111111;background:#f7f7f7;border:1px solid #e0e0e0;border-radius:6px;margin:0 3px;letter-spacing:0;">${d}</span>`
        )
        .join("");

    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <p style="font-size:14px;color:#555555;margin:0 0 20px;">X-Radar</p>

    <h2 style="font-size:18px;font-weight:600;color:#111111;margin:0 0 8px;">Your password reset code</h2>
    <p style="font-size:14px;color:#555555;line-height:1.6;margin:0 0 28px;">
      Hi ${Name}, use the code below to reset your X-Radar password. This code expires in <strong style="color:#111111;">10 minutes</strong>.
    </p>

    <div style="margin:0 0 28px;">
      ${digitBoxes}
    </div>

    <p style="font-size:13px;color:#888888;line-height:1.6;margin:0 0 28px;">
      If you didn't request this, you can safely ignore this email — your password won't change.
    </p>

    <p style="font-size:12px;color:#aaaaaa;margin:32px 0 0;border-top:1px solid #f0f0f0;padding-top:16px;">
      This code was sent to ${Name} · X-Radar account security<br>
      <a href="https://xradar.in" style="color:#aaaaaa;">xradar.in</a>
    </p>

  </div>
</body>
</html>`;
}

function generateForgotPasswordText(Name: string, Otp: string): string {
    return `Hi ${Name},

Your X-Radar password reset code is: ${Otp}

This code expires in 10 minutes.

If you didn't request this, ignore this email — your password won't change.

— X-Radar (xradar.in)`;
}

export async function SendForgotPasswordOTP(Email: string, Name: string, Otp: string) {



    try {
        await resend.emails.send({
            from: "X-Radar <hello@xradar.in>",
            to: Email,
            subject: `Your password reset code`,
            html: generateForgotPasswordHtml(Name, Otp),
            text: generateForgotPasswordText(Name, Otp),
        });

        console.log("Otp send to user successfulyy")

    } catch (error) {
        console.log("Error while sending forgot password OTP to user", error);
    }
}