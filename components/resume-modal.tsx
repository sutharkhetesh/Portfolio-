"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  Copy,
  Check,
  Building2,
  Calendar,
  MapPin,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Mail,
  Phone,
  Github,
  Linkedin,
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = `${portfolio.name} - ${portfolio.role}\n${portfolio.location} | ${portfolio.email} | ${portfolio.phone}\n\nSummary:\n${portfolio.intro}\n\nCurrent Role:\n${portfolio.experience.title} at ${portfolio.experience.company} (${portfolio.experience.period})\n\nEducation:\n${portfolio.education.degree}, ${portfolio.education.institution} (${portfolio.education.result})`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md no-print"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", duration: 0.45, bounce: 0.1 }}
          className="relative w-full max-w-4xl glass-card !p-0 z-10 my-6 bg-[var(--card)] border border-[var(--line)] shadow-2xl overflow-hidden resume-print-area max-h-[92vh] flex flex-col"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)] bg-[var(--card-subtle)] no-print shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--lime)] animate-pulse"></span>
              <span className="font-mono-custom text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
                Digital Curriculum Vitae (Resume)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
                title="Copy text summary"
              >
                {copied ? <Check size={14} className="text-[var(--lime)]" /> : <Copy size={14} />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy Summary"}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
                title="Print or Save as PDF"
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card)] transition-colors ml-2"
                aria-label="Close resume modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Printable Resume Content (Scrollable) */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[var(--card)] text-[var(--text)]">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[var(--line)]">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
                  {portfolio.name}
                </h1>
                <p className="text-base sm:text-lg font-medium text-[var(--lime)] mt-1 font-mono-custom">
                  {portfolio.role}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 max-w-xl leading-relaxed">
                  {portfolio.intro}
                </p>
              </div>

              <div className="flex flex-col gap-2 text-xs font-mono-custom text-[var(--text-muted)] sm:text-right shrink-0">
                <span className="flex items-center sm:justify-end gap-1.5">
                  <MapPin size={13} className="text-[var(--lime)]" />
                  <span>{portfolio.location}</span>
                </span>
                <a
                  href={`mailto:${portfolio.email}`}
                  className="flex items-center sm:justify-end gap-1.5 hover:text-[var(--lime)] transition-colors"
                >
                  <Mail size={13} className="text-[var(--lime)]" />
                  <span>{portfolio.email}</span>
                </a>
                <a
                  href={`tel:${portfolio.phone}`}
                  className="flex items-center sm:justify-end gap-1.5 hover:text-[var(--lime)] transition-colors"
                >
                  <Phone size={13} className="text-[var(--lime)]" />
                  <span>{portfolio.phone}</span>
                </a>
                <div className="flex items-center sm:justify-end gap-3 pt-1">
                  {portfolio.socials.github && (
                    <a
                      href={portfolio.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--lime)] transition-colors flex items-center gap-1"
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </a>
                  )}
                  <a
                    href={portfolio.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--lime)] transition-colors flex items-center gap-1"
                  >
                    <Linkedin size={13} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Core Competencies */}
            <div>
              <h2 className="text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)] font-semibold mb-3 flex items-center gap-2">
                <Sparkles size={14} />
                <span>Core Technical Proficiencies</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(portfolio.skills).map(([category, list]) => (
                  <div key={category} className="p-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)]">
                    <span className="text-xs font-semibold text-[var(--text)] block mb-1.5">
                      {category}
                    </span>
                    <p className="text-xs font-mono-custom text-[var(--text-muted)] leading-relaxed">
                      {list.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div>
              <h2 className="text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)] font-semibold mb-4 flex items-center gap-2">
                <Building2 size={14} />
                <span>Professional Experience</span>
              </h2>

              <div className="p-5 rounded-2xl bg-[var(--card-subtle)] border border-[var(--line)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--line)]">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[var(--text)]">
                      {portfolio.experience.title}
                    </h3>
                    <p className="text-xs font-medium text-[var(--lime)] font-mono-custom mt-0.5">
                      {portfolio.experience.company} · {portfolio.experience.type}
                    </p>
                  </div>
                  <div className="text-xs font-mono-custom text-[var(--text-muted)] sm:text-right">
                    <span className="flex items-center sm:justify-end gap-1.5">
                      <Calendar size={13} />
                      {portfolio.experience.period}
                    </span>
                    <span>{portfolio.experience.location}</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  {portfolio.experience.summary}
                </p>

                <ul className="space-y-2 mb-4">
                  {portfolio.experience.points.map((pt, idx) => (
                    <li key={idx} className="text-xs text-[var(--text)] flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line)]">
                  {portfolio.experience.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono-custom bg-[var(--card)] text-[var(--text-muted)] border border-[var(--line)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Projects */}
            <div>
              <h2 className="text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)] font-semibold mb-4 flex items-center gap-2">
                <ExternalLink size={14} />
                <span>Key Engineered Projects</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolio.projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-display font-semibold text-sm text-[var(--text)]">
                          {proj.title}
                        </h3>
                        <span className="text-[10px] font-mono-custom text-[var(--lime)] px-1.5 py-0.5 rounded bg-[var(--lime-bg)]">
                          {proj.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
                        {proj.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-[var(--line)]">
                      {proj.stack.map((s) => (
                        <span key={s} className="text-[10px] font-mono-custom text-[var(--text-muted)]">
                          #{s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)] font-semibold mb-3 flex items-center gap-2">
                <GraduationCap size={14} />
                <span>Education & Academic Credentials</span>
              </h2>

              <div className="p-4 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-sm font-semibold text-[var(--text)]">
                    {portfolio.education.degree}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {portfolio.education.institution}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono-custom">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--lime-bg)] text-[var(--lime)] font-semibold border border-[var(--lime)]/30">
                    {portfolio.education.result}
                  </span>
                  <span className="text-[var(--text-muted)]">{portfolio.education.period}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="px-6 py-4 border-t border-[var(--line)] bg-[var(--card-subtle)] flex items-center justify-between no-print shrink-0">
            <span className="text-xs font-mono-custom text-[var(--text-muted)]">
              Updated for 2026 Production Deployments
            </span>
            <button
              onClick={onClose}
              className="btn-secondary !py-1.5 !px-4 text-xs"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
