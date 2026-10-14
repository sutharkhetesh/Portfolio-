"use client";

import { motion, animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
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

function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView || reduced || !/^\d+\+$/.test(value)) return;
    const target = ref.current;
    const count = animate(0, parseInt(value), {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (target) target.textContent = `${Math.round(latest).toString().padStart(2, "0")}+`;
      },
    });
    return () => count.stop();
  }, [inView, reduced, value]);
  return <span ref={ref} aria-label={value}>{value}</span>;
}

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

      <div className="about-editorial">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="identity-card">
          <span className="font-mono-custom text-[10px] tracking-widest text-[var(--text-muted)]">THE PERSON BEHIND THE PIXELS</span>
          <span className="identity-monogram" aria-hidden="true">KS<span className="text-[var(--sky)]">.</span></span>
          <div><h3 className="font-display text-xl mb-1">{portfolio.name}</h3><p className="text-xs text-[var(--text-muted)]">{portfolio.role} · {portfolio.location}</p></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="about-copy self-center">
          <span className="eyebrow">Mission & Focus</span>
          <h3 className="font-display">I like the moment when intricate business rules transform into effortless digital workflows.</h3>
          <p className="mb-7">{portfolio.about}</p>
          <a href={`mailto:${portfolio.email}`} className="inline-flex items-center gap-3 text-sm text-[var(--lime)] border-b border-[var(--lime)] pb-2">Let&apos;s discuss opportunities <ArrowUpRight size={16} /></a>
        </motion.div>
      </div>
      <div className="about-pillars">
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon;
          return <motion.div key={pillar.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="glass-card spotlight-card p-7">
            <Icon size={24} className="text-[var(--lime)] mb-6" />
            <h4 className="font-display text-lg mb-3">{pillar.title}</h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">{pillar.description}</p>
            <div className="flex flex-wrap gap-2">{pillar.tags.map(tag => <span key={tag} className="text-[10px] font-mono-custom text-[var(--text-muted)] px-2 py-1 border border-[var(--line)] rounded">{tag}</span>)}</div>
          </motion.div>;
        })}
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
            className="about-stat text-left flex flex-col justify-between"
          >
            <span className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text)] tracking-tight">
              <StatValue value={value} />
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
