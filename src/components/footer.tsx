import { Radar } from "lucide-react";

const Footer = () => (
  <footer className="relative border-t border-border">
    {/* Top gradient glow */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

    <div className="container mx-auto px-4 py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <a href="#" className="flex items-center gap-2 text-foreground font-bold text-lg mb-3">
            <Radar className="text-primary" size={22} />
            <span>X-Radar</span>
          </a>
          <p className="text-muted-foreground text-sm leading-relaxed">
            AI-powered lead discovery for freelancers. Never miss a hiring tweet again.
          </p>
        </div>

        {[
          { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Legal", links: ["Privacy", "Terms", "Security"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-foreground text-sm mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-border text-center text-muted-foreground text-xs">
        © {new Date().getFullYear()} X-Radar. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
