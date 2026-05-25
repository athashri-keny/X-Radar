export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-300">
      {/* subtle star/dot background to match dashboard */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_#1e1b4b22_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">Refund Policy</h1>
          <p className="text-slate-500 text-sm">Effective Date: May 20, 2026</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-indigo-500/30 via-slate-700 to-transparent mb-12" />

        {/* Sections */}
        <div className="space-y-10">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-sm">01.</span>
              Subscription Cancellation
            </h2>
            <p className="text-slate-400 leading-relaxed">
              You can cancel your X-Radar subscription at any time from your{" "}
              <span className="text-slate-200">Account Settings</span>.
              Cancellation takes effect at the end of your current billing
              cycle. You will retain access to Pro features until that date.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-sm">02.</span>
              Refunds
            </h2>
            <p className="text-slate-400 leading-relaxed">
              All payments made to X-Radar are{" "}
              <span className="text-slate-200">non-refundable</span>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-sm">03.</span>
              Payment Processing
            </h2>
            <p className="text-slate-400 leading-relaxed">
              All payments are handled by{" "}
              <span className="text-slate-200">DodoPayments</span>. X-Radar
              does not store your card or payment information. For any billing
              issues, contact us at{" "}
              <a
                href="mailto:xradar10@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
              >
                xradar10@gmail.com
              </a>{" "}
              and we will escalate the issue to DodoPayments on your behalf.
            </p>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <p className="text-slate-600 text-sm">
            © 2026 X-Radar · All rights reserved.
          </p>
        </div>
      </div>
    
    </main>
  );
}