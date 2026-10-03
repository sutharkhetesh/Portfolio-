"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Server, 
  Database, 
  Wrench, 
  Sparkles,
  Terminal
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

const CATEGORY_ICONS: Record<string, typeof Code2> = {
  Frontend: Code2,
  "State Management": Layers,
  "API / Backend": Server,
  Database: Database,
  Tools: Wrench,
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Frontend: "Modern, component-driven client architectures with strict typing and responsive styling.",
  "State Management": "Predictable client-side store systems, caching layers, and asynchronous query syncing.",
  "API / Backend": "Seamless communication interfaces connecting frontend views with performant microservices.",
  Database: "Schema modeling, relational queries, and persistent storage management.",
  Tools: "Productivity, version control, API testing, and design-to-code collaboration tooling.",
};

const CORE_STACK = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Redux Toolkit",
  "GraphQL",
  "PostgreSQL",
  "REST APIs",
];

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Object.keys(portfolio.skills)];

  const displayedSkills = selectedCategory === "All"
    ? Object.entries(portfolio.skills)
    : Object.entries(portfolio.skills).filter(([cat]) => cat === selectedCategory);

  return (
    <section id="skills" className="section-wrap border-t border-[var(--line)]">
      {/* Section Header */}
      <div className="section-header">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          02 / Technical Toolkit
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-title"
        >
          Tools I reach for every day.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-subtitle"
        >
          A battle-tested frontend and full-stack toolkit focused on velocity, developer ergonomic clarity, and production stability.
        </motion.p>
      </div>

      {/* Core Stack Highlight Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 mb-10 bg-gradient-to-r from-[var(--card)] to-[var(--card-subtle)]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)]">
            <Sparkles size={16} />
            <span className="font-semibold">Core Production Arsenal:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CORE_STACK.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono-custom font-medium bg-[var(--lime-bg)] text-[var(--lime)] border border-[var(--lime)]/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono-custom tracking-wider uppercase transition-all duration-200 border ${
                isSelected
                  ? "bg-[var(--text)] text-[var(--bg)] font-semibold border-[var(--text)] shadow-sm"
                  : "bg-[var(--card)] text-[var(--text-muted)] border-[var(--line)] hover:text-[var(--text)] hover:border-[var(--line-strong)]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {displayedSkills.map(([category, skills], idx) => {
            const Icon = CATEGORY_ICONS[category] || Terminal;
            const description = CATEGORY_DESCRIPTIONS[category];

            return (
              <motion.div
                key={category}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="glass-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[var(--card-subtle)] border border-[var(--line)] flex items-center justify-center text-[var(--lime)]">
                        <Icon size={16} />
                      </div>
                      <h3 className="font-display font-semibold text-base text-[var(--text)]">
                        {category}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono-custom text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--card-subtle)] border border-[var(--line)]">
                      {skills.length} tools
                    </span>
                  </div>

                  {description && (
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-5">
                      {description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--line)]/60">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-mono-custom bg-[var(--card-subtle)] text-[var(--text)] border border-[var(--line)] transition-colors hover:border-[var(--lime)] hover:text-[var(--lime)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
