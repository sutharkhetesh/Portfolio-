"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--card)]/50 relative z-10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[var(--line)]">
          {/* Brand & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--text)] text-[var(--bg)] font-semibold font-display text-xs">
                KS
              </div>
              <span className="font-display font-semibold text-lg text-[var(--text)]">
                {portfolio.name}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono-custom max-w-sm">
              Frontend Developer specializing in high-performance ERP systems and resilient enterprise web applications.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-mono-custom uppercase tracking-wider text-[var(--text-muted)]">
            <a href="#about" className="hover:text-[var(--lime)] transition-colors">About</a>
            <a href="#skills" className="hover:text-[var(--lime)] transition-colors">Toolkit</a>
            <a href="#experience" className="hover:text-[var(--lime)] transition-colors">Experience</a>
            <a href="#projects" className="hover:text-[var(--lime)] transition-colors">Work</a>
            <a href="#contact" className="hover:text-[var(--lime)] transition-colors">Contact</a>
          </nav>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            {portfolio.socials.github && (
              <a
                href={portfolio.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn !w-9 !h-9"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
            )}
            <a
              href={portfolio.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn !w-9 !h-9"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href={`mailto:${portfolio.email}`}
              className="icon-btn !w-9 !h-9"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
            <button
              onClick={scrollToTop}
              className="icon-btn !w-9 !h-9 ml-2 bg-[var(--card-subtle)] hover:bg-[var(--lime)] hover:text-black hover:border-[var(--lime)]"
              aria-label="Back to top of page"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-custom text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with React 19, Next.js 15 & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
