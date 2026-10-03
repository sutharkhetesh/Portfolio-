"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  Copy,
  Check
} from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Toolkit" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scroll listener for sticky styling & active section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Bottom of page detection -> highlight contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection("contact");
        return;
      }

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          return;
        }
      }

      if (window.scrollY < 120) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open & close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolio.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--line)] shadow-sm"
            : "py-4 sm:py-5 bg-transparent"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          
          {/* Brand / Logo (Responsive across Mobile, Tablet, Desktop) */}
          <a
            href="#top"
            onClick={closeMenu}
            className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none"
            aria-label="Back to top of portfolio"
          >
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[var(--text)] text-[var(--bg)] font-semibold font-display text-xs sm:text-sm tracking-tight transition-transform duration-300 group-hover:scale-105 shadow-sm shrink-0">
              <span>KS</span>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lime)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[var(--lime)] border-2 border-[var(--bg)]"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-semibold text-xs sm:text-sm tracking-tight text-[var(--text)] leading-none">
                <span className="inline sm:hidden">{portfolio.name.split(" ")[0]}</span>
                <span className="hidden sm:inline">{portfolio.name}</span>
              </span>
              <span className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono-custom text-[var(--text-muted)] mt-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--lime)]"></span>
                <span>Frontend & ERP</span>
              </span>
              <span className="hidden sm:flex lg:hidden items-center gap-1 text-[10px] font-mono-custom text-[var(--text-muted)] mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--lime)]"></span>
                <span>Developer</span>
              </span>
            </div>
          </a>

          {/* Desktop & Tablet Navigation Bar */}
          <nav
            className="hidden md:flex items-center gap-0.5 lg:gap-1 px-2.5 lg:px-3 py-1.5 rounded-full bg-[var(--card)]/80 border border-[var(--line)] backdrop-blur-md shadow-sm"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 lg:px-4 py-1.5 text-[11px] lg:text-xs font-medium font-mono-custom uppercase tracking-wider transition-colors duration-200 rounded-full ${
                    isActive
                      ? "text-[var(--text)] font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[var(--lime-bg)] border border-[var(--lime)]/30 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop & Tablet Actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="btn-primary text-xs !py-2 !px-3 lg:!px-4 !rounded-xl inline-flex items-center gap-1.5 shadow-sm"
            >
              <span className="hidden lg:inline">Let&apos;s Connect</span>
              <span className="inline lg:hidden">Connect</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 sm:p-2.5 rounded-xl border border-[var(--line)] bg-[var(--card)] text-[var(--text)] focus:outline-none transition-colors hover:bg-[var(--card-subtle)]"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close main navigation menu" : "Open main navigation menu"}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>

        </div>
      </header>

      {/* Animated Fullscreen Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden bg-[var(--bg)]/98 backdrop-blur-2xl pt-20 pb-8 px-6 flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Navigation Links */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between px-3 mb-3">
                <span className="font-mono-custom text-[11px] text-[var(--lime)] uppercase tracking-widest">
                  Menu
                </span>
                <span className="text-[11px] font-mono-custom text-[var(--text-muted)]">
                  {portfolio.location}
                </span>
              </div>

              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl text-base sm:text-lg font-display transition-all ${
                      isActive
                        ? "bg-[var(--card)] border border-[var(--lime)]/30 text-[var(--text)] font-semibold shadow-sm"
                        : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-subtle)]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono-custom text-xs text-[var(--lime)]">
                        0{index + 1}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight
                      size={17}
                      className={isActive ? "text-[var(--lime)] opacity-100" : "opacity-40"}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Bottom Utilities, Quick Contact & Socials */}
            <div className="pt-6 border-t border-[var(--line)] space-y-4">
              {/* Availability Badge */}
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-[var(--card-subtle)] border border-[var(--line)] text-xs font-mono-custom text-[var(--text-muted)]">
                <span className="text-[var(--text-muted)]">Status:</span>
                <span className="flex items-center gap-1.5 text-[var(--text)] font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lime)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--lime)]"></span>
                  </span>
                  <span>{portfolio.availability}</span>
                </span>
              </div>

              {/* Direct Quick Email / Action */}
              <div className="flex items-center gap-2">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="flex-1 btn-primary !py-3 !rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Sparkles size={15} />
                  <span>Let&apos;s Connect</span>
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="icon-btn !w-11 !h-11 shrink-0"
                  title="Copy Email"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check size={16} className="text-[var(--lime)]" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* Social Channels Bar in Mobile Menu */}
              <div className="flex items-center justify-between pt-2 text-xs font-mono-custom text-[var(--text-muted)]">
                <span>Find me on:</span>
                <div className="flex items-center gap-2">
                  {portfolio.socials.github && (
                    <a
                      href={portfolio.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn !w-8 !h-8"
                      aria-label="GitHub"
                    >
                      <Github size={14} />
                    </a>
                  )}
                  <a
                    href={portfolio.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn !w-8 !h-8"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={14} />
                  </a>
                  <a
                    href={`mailto:${portfolio.email}`}
                    className="icon-btn !w-8 !h-8"
                    aria-label="Email"
                  >
                    <Mail size={14} />
                  </a>
                  <a
                    href={`tel:${portfolio.phone}`}
                    className="icon-btn !w-8 !h-8"
                    aria-label="Phone"
                  >
                    <Phone size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
