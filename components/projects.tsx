"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Github, 
  Info,
  CheckCircle2
} from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ProjectModal, type ProjectData } from "@/components/project-modal";

const FILTER_TABS = ["All", "ERP", "Productivity", "Web Apps"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = activeFilter === "All"
    ? portfolio.projects
    : portfolio.projects.filter((p) => p.filterCategory === activeFilter);

  const featuredProject = portfolio.projects.find((p) => p.featured) || portfolio.projects[0];
  const standardProjects = filteredProjects.filter((p) => activeFilter !== "All" || p.id !== featuredProject.id);

  return (
    <section id="projects" className="section-wrap border-t border-[var(--line)]">
      {/* Section Header */}
      <div className="section-header">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          04 / Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-title"
        >
          Engineered for real-world reliability.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-subtitle"
        >
          Explore enterprise software, specialized utilities, and performant web products built with React, Next.js, and TypeScript.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-mono-custom tracking-wider uppercase transition-all duration-200 border ${
                isActive
                  ? "bg-[var(--text)] text-[var(--bg)] font-semibold border-[var(--text)] shadow-sm"
                  : "bg-[var(--card)] text-[var(--text-muted)] border-[var(--line)] hover:text-[var(--text)] hover:border-[var(--line-strong)]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Featured Project Showcase (When 'All' or 'ERP' is active) */}
      {(activeFilter === "All" || activeFilter === "ERP") && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card mb-10 overflow-hidden group hover:border-[var(--lime)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Project Image */}
            <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto min-h-[320px] overflow-hidden bg-[var(--card-subtle)]">
              <Image
                src={featuredProject.image}
                alt={`${featuredProject.title} interface preview`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/90 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono-custom font-semibold bg-[var(--lime)] text-black shadow-md">
                  {featuredProject.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono-custom bg-black/60 text-white backdrop-blur-sm">
                  {featuredProject.period}
                </span>
              </div>
            </div>

            {/* Project Info */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)] block mb-1">
                  {featuredProject.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text)] mb-3">
                  {featuredProject.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                {featuredProject.highlights && (
                  <div className="space-y-2 mb-6">
                    {featuredProject.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)]">
                        <CheckCircle2 size={15} className="text-[var(--lime)] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono-custom bg-[var(--card-subtle)] text-[var(--text)] border border-[var(--line)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[var(--line)]">
                  <button
                    onClick={() => setSelectedProject(featuredProject as ProjectData)}
                    className="btn-primary !py-2.5 !px-4 text-xs"
                  >
                    <span>View Architecture Details</span>
                    <Info size={14} />
                  </button>
                  {featuredProject.live && (
                    <a
                      href={featuredProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn"
                      aria-label="Live Demo"
                    >
                      <ArrowUpRight size={17} />
                    </a>
                  )}
                  {featuredProject.github && (
                    <a
                      href={featuredProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn"
                      aria-label="GitHub Repository"
                    >
                      <Github size={17} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid for Other / Filtered Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {standardProjects.map((project, index) => (
            <motion.article
              key={project.id || project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card flex flex-col justify-between overflow-hidden group hover:border-[var(--line-strong)]"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--card-subtle)]">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-custom bg-black/60 text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono-custom text-[var(--lime)] uppercase tracking-wider">
                      {project.period || "Project"}
                    </span>
                    {project.badge && (
                      <span className="text-[10px] font-mono-custom text-[var(--text-muted)] bg-[var(--card-subtle)] px-2 py-0.5 rounded border border-[var(--line)]">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[var(--text)] mb-2.5">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono-custom bg-[var(--card-subtle)] text-[var(--text-muted)] border border-[var(--line)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-[var(--line)] flex items-center justify-between mt-auto">
                <button
                  onClick={() => setSelectedProject(project as ProjectData)}
                  className="text-xs font-mono-custom text-[var(--text)] hover:text-[var(--lime)] flex items-center gap-1.5 font-medium transition-colors"
                >
                  <Info size={14} />
                  <span>Inspect Architecture</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-subtle)]"
                      aria-label="Live Demo"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-subtle)]"
                      aria-label="GitHub Source"
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
