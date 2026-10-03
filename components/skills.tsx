"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Server, 
  Database, 
  Wrench, 
  Sparkles,
  Terminal,
  Search,
  X
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
  Frontend: "Modern, component-driven client architectures with strict typing, micro-interactions, and responsive design systems.",
  "State Management": "Predictable client-side store systems, optimistic mutations, caching layers, and asynchronous query synchronization.",
  "API / Backend": "Seamless communication interfaces connecting frontend views with performant microservices and database engines.",
  Database: "Schema modeling, relational queries, migrations, and persistent storage management.",
  Tools: "Developer ergonomics, version control, automated testing, and design-to-code collaboration tooling.",
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", ...Object.keys(portfolio.skills)];

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return Object.entries(portfolio.skills)
      .filter(([category]) => {
        if (selectedCategory !== "All" && category !== selectedCategory) {
          return false;
        }
        return true;
      })
      .map(([category, skills]) => {
        if (!q) {
          return [category, skills] as [string, string[]];
        }
        const matchingSkills = skills.filter((s) => s.toLowerCase().includes(q));
        const categoryMatches = category.toLowerCase().includes(q);
        return [category, categoryMatches ? skills : matchingSkills] as [string, string[]];
      })
      .filter(([, skills]) => skills.length > 0);
  }, [selectedCategory, searchQuery]);

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
                className="px-3 py-1 rounded-lg text-xs font-mono-custom font-medium bg-[var(--lime-bg)] text-[var(--lime)] border border-[var(--lime)]/30 hover:scale-105 transition-transform"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-custom tracking-wider uppercase transition-all duration-200 border ${
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

        {/* Real-time Search Box */}
        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. React, GraphQL)..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[var(--card)] border border-[var(--line)] text-xs font-mono-custom text-[var(--text)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--lime)] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full p-12 text-center text-xs font-mono-custom text-[var(--text-muted)] glass-card">
              No skills found matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            filteredCategories.map(([category, skills], idx) => {
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
                  className="glass-card p-6 flex flex-col justify-between hover:border-[var(--lime)]/50"
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

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--line)]/60">
                    {skills.map((skill) => {
                      const isHighlighted = searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase());
                      return (
                        <span
                          key={skill}
                          className={`px-2.5 py-1 rounded-md text-xs font-mono-custom border transition-all ${
                            isHighlighted
                              ? "bg-[var(--lime)] text-black font-semibold border-[var(--lime)] shadow-sm"
                              : "bg-[var(--card-subtle)] text-[var(--text)] border-[var(--line)] hover:border-[var(--lime)] hover:text-[var(--lime)]"
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
