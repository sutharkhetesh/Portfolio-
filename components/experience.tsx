"use client";

import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  TrendingUp,
  Award,
  Layers
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Experience() {
  const exp = portfolio.experience;
  const edu = portfolio.education;

  return (
    <section id="experience" className="section-wrap border-t border-[var(--line)]">
      {/* Section Header */}
      <div className="section-header">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          03 / Experience & Education
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-title"
        >
          Shipping with purpose & precision.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-subtitle"
        >
          Proven track record in enterprise SaaS environments, delivering high-density workflows and mission-critical ERP tools.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Main Column: Work Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-8 glass-card p-6 sm:p-8 relative"
        >
          {/* Top Role Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--lime)] animate-pulse"></span>
                <span className="text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)] font-semibold">
                  Current Role
                </span>
                <span className="text-xs font-mono-custom text-[var(--text-muted)]">·</span>
                <span className="text-xs font-mono-custom text-[var(--text-muted)]">{exp.type}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text)] tracking-tight">
                {exp.title}
              </h3>
              <div className="flex items-center gap-2 mt-1.5 text-sm font-medium text-[var(--text)]">
                <Building2 size={16} className="text-[var(--lime)]" />
                <span>{exp.company}</span>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 font-mono-custom text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--card-subtle)] border border-[var(--line)] text-[var(--text)]">
                <Calendar size={13} className="text-[var(--lime)]" />
                {exp.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} />
                {exp.location}
              </span>
            </div>
          </div>

          {/* Role Summary */}
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed my-6 font-normal">
            {exp.summary}
          </p>

          {/* Key Metrics / Impacts Ribbon */}
          {exp.metrics && (
            <div className="p-4 rounded-xl bg-[var(--lime-bg)] border border-[var(--lime)]/30 mb-6 space-y-2">
              <span className="text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)] font-semibold flex items-center gap-1.5">
                <TrendingUp size={14} />
                <span>Quantifiable Engineering Impact:</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {exp.metrics.map((m, idx) => (
                  <div key={idx} className="text-xs font-mono-custom text-[var(--text)] flex items-start gap-1.5">
                    <span className="text-[var(--lime)] font-bold">✓</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Contributions */}
          <div className="space-y-3.5 mb-8">
            <h4 className="text-xs font-mono-custom uppercase tracking-wider text-[var(--text)] font-semibold flex items-center gap-2">
              <Sparkles size={14} className="text-[var(--lime)]" />
              <span>Core Responsibilities & Workflow Architecture:</span>
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {exp.points.map((point) => (
                <div key={point} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  <CheckCircle2 size={16} className="text-[var(--lime)] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Used */}
          {exp.technologies && (
            <div className="pt-6 border-t border-[var(--line)]">
              <span className="text-xs font-mono-custom text-[var(--text-muted)] block mb-3">
                Technologies Utilized Daily:
              </span>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono-custom bg-[var(--card-subtle)] text-[var(--text)] border border-[var(--line)] hover:border-[var(--lime)] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Column: Education & Academic Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="lg:col-span-4 glass-card p-6 sm:p-7 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)] font-semibold mb-4">
              <GraduationCap size={18} />
              <span>Education</span>
            </div>

            <h3 className="font-display text-xl font-semibold text-[var(--text)] leading-snug mb-2">
              {edu.degree}
            </h3>

            <p className="text-sm text-[var(--text-muted)] mb-4">
              {edu.institution}
            </p>

            <div className="flex items-center justify-between py-3 px-3.5 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] font-mono-custom text-xs mb-6">
              <span className="text-[var(--text-muted)]">Graduation</span>
              <span className="text-[var(--text)] font-semibold">{edu.period}</span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--lime-bg)] border border-[var(--lime)]/30 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-custom text-[var(--text)] font-medium flex items-center gap-1.5">
                  <Award size={15} className="text-[var(--lime)]" />
                  <span>Academic Standing</span>
                </span>
                <span className="text-sm font-mono-custom font-bold text-[var(--lime)]">{edu.result}</span>
              </div>
            </div>

            {edu.coursework && (
              <div>
                <span className="text-xs font-mono-custom text-[var(--text-muted)] block mb-2.5 flex items-center gap-1.5">
                  <Layers size={13} />
                  <span>Core Foundations:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 rounded text-[11px] font-mono-custom bg-[var(--card-subtle)] text-[var(--text)] border border-[var(--line)]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-[var(--line)] text-[11px] font-mono-custom text-[var(--text-muted)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)]"></span>
            <span>Udaipur, Rajasthan, India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
