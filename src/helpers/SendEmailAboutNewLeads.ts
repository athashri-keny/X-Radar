import resend from "@/lib/Emailtransporter";

interface NewLead {
    tweetText: string;
    Tweeturl: string;
    score: number;
}

function generateEmailHtml(newLeads: NewLead[]): string {
    const radarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
      <path d="M4 6h.01" />
      <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
      <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
      <path d="M12 18h.01" />
      <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
      <circle cx="12" cy="12" r="2" />
      <path d="m13.41 10.59 5.66-5.66" />
    </svg>`;

    const getScoreBadge = (score: number) => {
        if (score >= 80) {
            return `<span style="display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:500;padding:3px 10px;border-radius:99px;background:#EEEDFE;color:#3C3489;">🔥 Score ${score}</span>`;
        }
        return `<span style="display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:500;padding:3px 10px;border-radius:99px;background:#FAEEDA;color:#633806;">⚡ Score ${score}</span>`;
    };

    const leadsHtml = newLeads
        .map(
            (lead) => `
        <div style="background:#f9f9f9;border:0.5px solid #e5e5e5;border-radius:8px;padding:16px 18px;margin-bottom:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
            <span style="font-size:12px;color:#888;">Tweet</span>
            ${getScoreBadge(lead.score)}
          </div>
          <p style="font-size:14px;color:#111;line-height:1.5;margin:6px 0 10px;">"${lead.tweetText}"</p>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <a href="${lead.Tweeturl}" style="font-size:12px;color:#185FA5;text-decoration:none;">View tweet →</a>
          </div>
        </div>`
        )
        .join("");

    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:20px;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;">
    
    <!-- Header -->
    <div style="background:#0f0f0f;border-radius:12px 12px 0 0;padding:24px 28px 20px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="color:#fff;font-size:15px;font-weight:500;">X-Radar</span>
        <span style="background:rgba(255,255,255,0.1);color:#aaa;font-size:11px;font-weight:500;padding:3px 9px;border-radius:99px;margin-left:4px;">daily scan</span>
      </div>
      <div style="display:flex;align-items:center;">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ff4444;margin-right:8px;"></span>
        <span style="color:#fff;font-size:20px;font-weight:500;">${newLeads.length} hot lead${newLeads.length > 1 ? "s" : ""} just dropped</span>
      </div>
      <p style="color:#aaa;font-size:13px;margin:6px 0 0;">These people are actively looking to hire. Reply now before someone else does.</p>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;border:0.5px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px;padding:24px 28px;">
      
      <!-- Urgency bar -->
      <div style="background:#fff3cd;border:0.5px solid #EF9F27;border-radius:8px;padding:10px 14px;margin-bottom:20px;font-size:13px;color:#633806;">
        ⏰ Leads go cold fast — most freelancers pitch within the first hour.
      </div>

      <!-- Leads -->
      ${leadsHtml}

      <hr style="border:none;border-top:0.5px solid #e5e5e5;margin:20px 0;">

      <!-- CTA -->
      <a href="https://xradar.in/dashboard" style="display:block;text-align:center;background:#0f0f0f;color:#fff;text-decoration:none;padding:13px;border-radius:8px;font-size:14px;font-weight:500;">
        Open X-Radar → reply to all leads
      </a>

      <!-- Footer -->
    
    </div>

  </div>
</body>
</html>`;
}

export async function SendEmailAboutNewLeads(newLeads: NewLead[] , Email: string) {


    try {
        await resend.emails.send({
            from: "X-Radar <hello@xradar.in>",
            to: Email, // replace with actual user email
            subject: `${newLeads.length} hot lead${newLeads.length > 1 ? "s" : ""} just dropped — reply fast`,
            html: generateEmailHtml(newLeads),
        });
    } catch (error) {
        console.log("Error while sending new leads to user", error);
    }
}