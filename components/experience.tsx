"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 70%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const exp = portfolio.experience;
  const edu = portfolio.education;
  return (
    <section id="experience" className="section-wrap border-t border-[var(--line)]">
      <div className="section-header">
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow">03 / Experience & Education</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title">Shipping with purpose & precision.</motion.h2>
        <p className="section-subtitle">Proven track record in enterprise SaaS environments, delivering high-density workflows and mission-critical ERP tools.</p>
      </div>
      <div className="timeline" ref={ref}>
        <div className="timeline-track" aria-hidden="true"><motion.div className="timeline-progress" style={{ scaleY }} /></div>
        <motion.article className="timeline-entry" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="timeline-meta"><span className="text-[var(--lime)]">● CURRENT ROLE / {exp.type}</span><span>{exp.period}</span></div>
          <div className="timeline-content">
            <h3>{exp.title}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm mb-5"><span>{exp.company}</span><span className="flex items-center gap-2 text-[var(--text-muted)] text-xs"><MapPin size={13} />{exp.location}</span></div>
            <p className="mb-7 max-w-3xl">{exp.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {exp.metrics.map(metric => <div key={metric} className="p-5 rounded-xl bg-[var(--lime-bg)] border border-[var(--lime)]/20"><ArrowUpRight className="text-[var(--lime)] mb-3" size={20} /><p className="!text-xs !text-[var(--text)]">{metric}</p></div>)}
            </div>
            <h4 className="font-mono-custom text-[10px] tracking-wider uppercase mb-4 flex items-center gap-2"><Sparkles size={14} className="text-[var(--lime)]" />Core Responsibilities & Workflow Architecture</h4>
            <ul className="space-y-3 mb-8">{exp.points.map(point => <li key={point} className="flex gap-3"><span className="text-[var(--lime)]">↗</span><span>{point}</span></li>)}</ul>
            <div className="flex flex-wrap gap-2 border-t border-[var(--line)] pt-6">{exp.technologies.map(tech => <span key={tech} className="text-xs font-mono-custom px-3 py-1.5 rounded-lg border border-[var(--line)] text-[var(--text-muted)]">{tech}</span>)}</div>
          </div>
        </motion.article>
        <motion.article className="timeline-entry" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="timeline-meta"><span className="flex items-center gap-2"><GraduationCap size={16} />EDUCATION / FOUNDATIONS</span><span>{edu.period}</span></div>
          <div className="timeline-content">
            <div className="flex flex-col md:flex-row justify-between gap-5"><div><h3 className="!text-2xl">{edu.degree}</h3><p>{edu.institution}</p><p>{edu.location}</p></div><span className="badge-violet self-start px-4 py-2 rounded-full font-mono-custom text-xs">{edu.result}</span></div>
            <p className="!text-xs mt-6 mb-3">Core Foundations</p>
            <div className="flex flex-wrap gap-2">{edu.coursework.map(course => <span key={course} className="font-mono-custom text-[11px] px-3 py-1.5 rounded-lg border border-[var(--line)] text-[var(--text-muted)]">{course}</span>)}</div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
