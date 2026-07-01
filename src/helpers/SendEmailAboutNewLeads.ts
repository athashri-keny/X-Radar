import resend from "@/lib/Emailtransporter";

interface NewLead {
    tweetText: string;
    Tweeturl: string;
    score: number;
    Name: string;
    niche?: string;
}

function generateEmailHtml(newLeads: NewLead[], Name: string): string {
    const leadsHtml = newLeads
        .map(
            (lead) => `
        <p style="margin:0 0 4px;font-size:14px;color:#222;line-height:1.5;">
          "${lead.tweetText}"
        </p>
        <p style="margin:0 0 18px;font-size:13px;">
          <a href="https://xradar.in/dashboard" style="color:#2b5cad;">View and reply</a>
        </p>`
        )
        .join("");

    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;color:#222;">
  <div style="max-width:560px;margin:0 auto;padding:20px;">
    <p style="font-size:14px;margin:0 0 16px;">Hi ${Name},</p>
    <p style="font-size:14px;margin:0 0 16px;">
      X-Radar found ${newLeads.length} new lead${newLeads.length > 1 ? "s" : ""} matching your search criteria:
    </p>
    ${leadsHtml}
    <p style="font-size:13px;color:#666;margin-top:24px;">
      — X-Radar<br>
      <a href="https://xradar.in/dashboard" style="color:#666;">Manage your searches</a>
    </p>
  </div>
</body>
</html>`;
}

function generateEmailText(newLeads: NewLead[], Name: string): string {
    const leadsText = newLeads
        .map((lead) => `"${lead.tweetText}"\nReply: https://xradar.in/dashboard\n`)
        .join("\n");

    return `Hi ${Name},

X-Radar found ${newLeads.length} new lead${newLeads.length > 1 ? "s" : ""} matching your search criteria:

${leadsText}
— X-Radar
Manage your searches: https://xradar.in/dashboard`;
}

export async function SendEmailAboutNewLeads(newLeads: NewLead[], Email: string, Name: string) {
    try {
        await resend.emails.send({
            from: "X-Radar <hello@xradar.in>",
            to: Email,
            subject: `${newLeads.length} new lead${newLeads.length > 1 ? "s" : ""} matching your search`,
            html: generateEmailHtml(newLeads, Name),
            text: generateEmailText(newLeads, Name),
        });
    } catch (error) {
        console.log("Error while sending new leads to user", error);
    }
}