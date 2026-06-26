import resend from "@/lib/Emailtransporter";

interface NewLead {
    tweetText: string;
    Tweeturl: string;
    score: number;
    Name: string;
    niche?: string;
}

function generateEmailHtml(newLeads: NewLead[], Name: string): string {

    const getScoreBadge = (score: number) => {
        if (score >= 7) {
            return `<span style="font-size:12px;font-weight:500;padding:3px 10px;border-radius:99px;background:#FFF3CD;color:#856404;">🔥 Score ${score}</span>`;
        }
        return `<span style="font-size:12px;font-weight:500;padding:3px 10px;border-radius:99px;background:#FFF3CD;color:#856404;">⚡ Score ${score}</span>`;
    };

    const leadsHtml = newLeads
        .map(
            (lead) => `
        <div style="background:#fafafa;border:0.5px solid #e8e8e8;border-radius:8px;padding:16px 18px;margin-bottom:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            ${getScoreBadge(lead.score)}
          </div>
          <p style="font-size:14px;color:#333;line-height:1.55;margin:0 0 12px;">"${lead.tweetText}"</p>
          <a href="https://xradar.in/dashboard" style="display:inline-block;font-size:13px;font-weight:500;color:#1a1a1a;text-decoration:none;padding:7px 16px;border-radius:6px;border:0.5px solid #d0d0d0;background:#fff;">
            Open X-Radar to reply →
          </a>
        </div>`
        )
        .join("");

    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:20px;background:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;">

    <!-- Header -->
    <div style="background:#1a1a1a;border-radius:12px 12px 0 0;padding:24px 28px 20px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="color:#fff;font-size:15px;font-weight:500;">X-Radar</span>
        <span style="background:rgba(255,255,255,0.1);color:#999;font-size:11px;font-weight:500;padding:3px 9px;border-radius:99px;">daily scan</span>
      </div>
      <p style="color:#fff;font-size:20px;font-weight:500;margin:0 0 6px;">Hey ${Name}, ${newLeads.length} hot lead${newLeads.length > 1 ? "s" : ""} just dropped 🔥</p>
      <p style="color:#999;font-size:13px;margin:0;">These people are actively looking to hire. Reply before someone else does.</p>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;border:0.5px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:24px 28px;">

      <!-- Urgency bar -->
      <div style="background:#FFF8EC;border:0.5px solid #F5C542;border-radius:8px;padding:10px 14px;margin-bottom:20px;font-size:13px;color:#7A5200;">
        ⏰ Most freelancers pitch within the first hour — don't wait.
      </div>

      <!-- Leads -->
      ${leadsHtml}

      <hr style="border:none;border-top:0.5px solid #e8e8e8;margin:20px 0;">

    </div>
  </div>
</body>
</html>`;
}

export async function SendEmailAboutNewLeads(newLeads: NewLead[], Email: string, Name: string) {
    try {
        await resend.emails.send({
            from: "X-Radar <hello@xradar.in>",
            to: Email,
            subject: `Hey ${Name}, ${newLeads.length} hot lead${newLeads.length > 1 ? "s" : ""} just dropped — reply fast`,
            html: generateEmailHtml(newLeads, Name),
        });
    } catch (error) {
        console.log("Error while sending new leads to user", error);
    }
}