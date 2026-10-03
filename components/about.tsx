"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Cpu, 
  Database, 
  Layout, 
  Zap, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

const PILLARS = [
  {
    icon: Layout,
    title: "ERP & Complex Dashboards",
    description: "Designing high-density data tables, multi-stage transaction wizards, and workflow forms where clarity and high data throughput are critical.",
    tags: ["Data Grids", "CRUD Workflows", "Filter Pipelines"],
  },
  {
    icon: Cpu,
    title: "Type-Safe Component Architecture",
    description: "Constructing scalable, reusable React and Next.js design systems with strict TypeScript interfaces, clear separation of concerns, and clean abstraction.",
    tags: ["Design Tokens", "React 19", "Strict TypeScript"],
  },
  {
    icon: Database,
    title: "Resilient API & State Workflows",
    description: "Connecting frontend views with REST and GraphQL APIs using optimistic updates, smart caching, and thorough handling of loading, error, and empty states.",
    tags: ["Optimistic UI", "GraphQL & REST", "Redux & TanStack"],
  },
];

const PRINCIPLES = [
  {
    icon: Zap,
    title: "Optimistic State & Zero Perceived Latency",
    description: "Users should never wait for an API roundtrip to see button feedback. State updates happen immediately with graceful error rollbacks.",
  },
  {
    icon: ShieldCheck,
    title: "Defensive Error & Empty State Boundaries",
    description: "Enterprise software fails when corner cases aren't designed. Every screen has carefully crafted loading, error, empty, and partial data states.",
  },
  {
    icon: Sparkles,
    title: "Keyboard-First Ergonomics for Power Users",
    description: "ERP operators live in their workflows. Tab ordering, hotkeys, and quick actions turn repetitive data entry into effortless speed.",
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
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-subtitle"
        >
          Translating complex enterprise requirements and business logic into interfaces that empower users every single day.
        </motion.p>
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
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[var(--card)] to-[var(--card-subtle)] border border-[var(--line)] shadow-sm mb-6">
            <span className="text-xs font-mono-custom text-[var(--lime)] uppercase tracking-wider block mb-3 font-semibold">
              Mission & Focus
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text)] leading-snug mb-4">
              I like the moment when intricate business rules transform into effortless digital workflows.
            </h3>
            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {portfolio.about}
            </p>
            <a
              href={`mailto:${portfolio.email}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold font-mono-custom text-[var(--text)] border-b-2 border-[var(--lime)] pb-1 transition-all hover:text-[var(--lime)] hover:gap-3"
            >
              <span>Let&apos;s discuss opportunities</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
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
                className="glass-card p-6 flex flex-col justify-between group hover:border-[var(--lime)]/50"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--lime-bg)] text-[var(--lime)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-display text-base font-semibold text-[var(--text)] mb-3 leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line)]">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono-custom px-2 py-0.5 rounded bg-[var(--card-subtle)] text-[var(--text-muted)] border border-[var(--line)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Engineering Principles Ribbon */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--lime)]"></span>
          <span className="font-mono-custom text-xs uppercase tracking-wider text-[var(--text-muted)]">
            How I Approach Enterprise Frontend
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[var(--card-subtle)] border border-[var(--line)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Icon size={16} className="text-[var(--lime)]" />
                    <h4 className="font-display text-sm font-semibold text-[var(--text)]">
                      {principle.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {principle.description}
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
            className="glass-card p-6 text-center sm:text-left flex flex-col justify-between hover:border-[var(--lime)]/40"
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
