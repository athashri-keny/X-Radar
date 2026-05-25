import { Radar } from "lucide-react";
import Link from "next/link";

const Footer = () => (
  <footer className="relative border-t border-border">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

    <div className="w-full px-6 md:px-12 lg:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">

        {/* Brand section */}
        <div className="md:col-span-1">
          <a href="#" className="flex items-center gap-2 text-foreground font-bold text-base mb-3">
            <Radar className="text-primary" size={16} />
            <span>X-Radar</span>
          </a>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
            AI-powered lead discovery for freelancers.
          </p>
        </div>

        {/* Product */}
        <div className="md:col-span-1">
          <h4 className="font-medium text-foreground text-sm mb-4 tracking-wide uppercase opacity-50">
            Product
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="/" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="md:col-span-1">
          <h4 className="font-medium text-foreground text-sm mb-4 tracking-wide uppercase opacity-50">
            Company
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="mailto:hello@xradar.in" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="md:col-span-1">
          <h4 className="font-medium text-foreground text-sm mb-4 tracking-wide uppercase opacity-50">
            Legal
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <a href="/terms" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Terms and Conditions
              </a>
            </li>
              <li>
              <a href="/refund-policy" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-muted-foreground text-sm">
        <span>© {new Date().getFullYear()} X-Radar</span>
        <span className="opacity-40">All rights reserved.</span>
      </div>
    </div>
  </footer>
);

export default Footer;