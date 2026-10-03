"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const values = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          email: values.get("email"),
          message: values.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Message could not be processed.");
      }

      form.reset();
      setStatusMessage({
        type: "success",
        text: result.emailSent
          ? "Message sent successfully! I'll get back to you shortly."
          : result.message || "Your message was recorded securely.",
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Could not send message. Please reach out directly via email.";
      setStatusMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-wrap border-t border-[var(--line)]">
      {/* Section Header */}
      <div className="section-header">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          05 / Contact & Collaboration
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-title"
        >
          Have a good idea or role in mind?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-subtitle"
        >
          I&apos;m always glad to talk about enterprise applications, frontend architecture, engineering challenges, or potential team roles.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Direct Contact Info & Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Direct Email Card */}
          <div className="glass-card p-5 flex items-center justify-between group">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--lime-bg)] text-[var(--lime)] flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-[11px] font-mono-custom text-[var(--text-muted)] block uppercase tracking-wider">
                  Direct Email
                </span>
                <a
                  href={`mailto:${portfolio.email}`}
                  className="font-mono-custom text-xs sm:text-sm font-medium text-[var(--text)] hover:text-[var(--lime)] transition-colors break-all"
                >
                  {portfolio.email}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(portfolio.email, "email")}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-subtle)] transition-colors"
              title="Copy email"
              aria-label="Copy email address"
            >
              {copiedEmail ? <Check size={16} className="text-[var(--lime)]" /> : <Copy size={16} />}
            </button>
          </div>

          {/* Direct Phone Card */}
          <div className="glass-card p-5 flex items-center justify-between group">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--sky-bg)] text-[var(--sky)] flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[11px] font-mono-custom text-[var(--text-muted)] block uppercase tracking-wider">
                  Phone / WhatsApp
                </span>
                <a
                  href={`tel:${portfolio.phone}`}
                  className="font-mono-custom text-xs sm:text-sm font-medium text-[var(--text)] hover:text-[var(--sky)] transition-colors"
                >
                  {portfolio.phone}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(portfolio.phone, "phone")}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-subtle)] transition-colors"
              title="Copy phone"
              aria-label="Copy phone number"
            >
              {copiedPhone ? <Check size={16} className="text-[var(--lime)]" /> : <Copy size={16} />}
            </button>
          </div>

          {/* Location Card */}
          <div className="glass-card p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] text-[var(--text)] flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-[var(--lime)]" />
            </div>
            <div>
              <span className="text-[11px] font-mono-custom text-[var(--text-muted)] block uppercase tracking-wider">
                Location & Timezone
              </span>
              <span className="font-mono-custom text-xs sm:text-sm font-medium text-[var(--text)]">
                {portfolio.location} (IST · GMT+5:30)
              </span>
            </div>
          </div>

          {/* Social Profiles Card */}
          <div className="glass-card p-5 flex items-center justify-between">
            <span className="text-xs font-mono-custom text-[var(--text-muted)]">
              Professional Networks:
            </span>
            <div className="flex items-center gap-2">
              {portfolio.socials.github && (
                <a
                  href={portfolio.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn !w-9 !h-9"
                  aria-label="GitHub Profile"
                >
                  <Github size={16} />
                </a>
              )}
              <a
                href={portfolio.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn !w-9 !h-9"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Modern Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="lg:col-span-7 glass-card p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-custom uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={120}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] text-sm text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:border-[var(--lime)] focus:bg-[var(--card)] transition-colors outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-custom uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={320}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] text-sm text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:border-[var(--lime)] focus:bg-[var(--card)] transition-colors outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-custom uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Project or Inquiry Message *
              </label>
              <textarea
                name="message"
                required
                maxLength={5000}
                rows={5}
                placeholder="Tell me about your product requirements, team needs, or what you're building..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] text-sm text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:border-[var(--lime)] focus:bg-[var(--card)] transition-colors outline-none resize-y min-h-[120px]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={15} />
                  </>
                )}
              </button>

              <span className="text-[11px] font-mono-custom text-[var(--text-muted)]">
                Average reply time: within 24 hours
              </span>
            </div>

            {/* Notification / Alert */}
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm font-medium ${
                  statusMessage.type === "success"
                    ? "bg-[var(--lime-bg)] text-[var(--lime)] border border-[var(--lime)]/30"
                    : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                }`}
                role="status"
                aria-live="polite"
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                )}
                <span>{statusMessage.text}</span>
              </motion.div>
            )}
          </form>
        </motion.div>

      </div>
    </section>
  );
}
