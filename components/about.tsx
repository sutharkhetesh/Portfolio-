"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Database, Layout } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const PILLARS = [
  {
    icon: Layout,
    title: "ERP & Complex Dashboards",
    description: "Designing high-density data tables, multi-stage transaction wizards, and workflow forms where clarity and high data throughput are critical.",
  },
  {
    icon: Cpu,
    title: "Type-Safe Component Architecture",
    description: "Constructing scalable, reusable React and Next.js design systems with strict TypeScript interfaces, clear separation of concerns, and clean abstraction.",
  },
  {
    icon: Database,
    title: "Resilient API & State Workflows",
    description: "Connecting frontend views with REST and GraphQL APIs using optimistic updates, smart caching, and thorough handling of loading, error, and empty states.",
  },
];

export function About() {
  return (
    <section id="about" className="section-wrap border-t border-[var(--line)]">
      {/* Section Header */}
      <div className="section-header">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          01 / About Me
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-title"
        >
          The discipline behind the screen.
        </motion.h2>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
        {/* Left Column: Lead Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-5"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text)] leading-snug mb-6">
            I like the moment when intricate business rules transform into effortless digital workflows.
          </h3>
          <p className="text-[var(--text-muted)] text-base leading-relaxed mb-6">
            {portfolio.about}
          </p>
          <a
            href={`mailto:${portfolio.email}`}
            className="inline-flex items-center gap-2 text-sm font-semibold font-mono-custom text-[var(--text)] border-b-2 border-[var(--lime)] pb-1 transition-all hover:text-[var(--lime)]"
          >
            <span>Let&apos;s discuss opportunities</span>
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        {/* Right Column: Key Pillars */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--lime-bg)] text-[var(--lime)] flex items-center justify-center mb-5">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-display text-base font-semibold text-[var(--text)] mb-3 leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-[var(--line)]">
        {portfolio.stats.map(([value, label], idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="glass-card p-6 text-center sm:text-left flex flex-col justify-between"
          >
            <span className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text)] tracking-tight">
              {value}
            </span>
            <span className="font-mono-custom text-xs uppercase tracking-wider text-[var(--text-muted)] mt-2">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
