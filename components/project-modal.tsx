"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CheckCircle2, 
  Github, 
  ExternalLink, 
  Sparkles,
  Layers,
  Cpu,
  HelpCircle,
  Code2
} from "lucide-react";

export interface ProjectData {
  id?: string;
  title: string;
  category: string;
  filterCategory?: string;
  period?: string;
  badge?: string;
  description: string;
  problemSolved?: string;
  architectureNotes?: string;
  highlights?: string[];
  stack: string[];
  image: string;
  github?: string;
  live?: string;
  accent: string;
  featured?: boolean;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "stack">("overview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      setActiveTab("overview");
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
          className="relative w-full max-w-3xl glass-card !p-0 z-10 my-8 overflow-hidden bg-[var(--card)] border border-[var(--line)] shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header Image */}
          <div className="relative aspect-[16/7] sm:aspect-[21/8] w-full overflow-hidden bg-[var(--card-subtle)] shrink-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-black/30" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Top Badges */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono-custom font-semibold bg-[var(--lime)] text-black shadow-md">
                {project.badge || project.category}
              </span>
              {project.period && (
                <span className="px-3 py-1 rounded-full text-xs font-mono-custom bg-black/60 text-white backdrop-blur-sm">
                  {project.period}
                </span>
              )}
            </div>
          </div>

          {/* Modal Header & Tabs */}
          <div className="px-6 pt-5 pb-3 border-b border-[var(--line)] bg-[var(--card)] shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-mono-custom text-[var(--lime)] uppercase tracking-wider block mb-1">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text)]">
                  {project.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={13} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
                  >
                    <Github size={13} />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-t border-[var(--line)]/60 pt-3">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-custom transition-colors flex items-center gap-1.5 ${
                  activeTab === "overview"
                    ? "bg-[var(--card-subtle)] text-[var(--text)] font-semibold border border-[var(--lime)]/30"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <HelpCircle size={13} />
                <span>Overview & Features</span>
              </button>

              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-custom transition-colors flex items-center gap-1.5 ${
                  activeTab === "architecture"
                    ? "bg-[var(--card-subtle)] text-[var(--text)] font-semibold border border-[var(--lime)]/30"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <Cpu size={13} />
                <span>Architecture & Data Flow</span>
              </button>

              <button
                onClick={() => setActiveTab("stack")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-custom transition-colors flex items-center gap-1.5 ${
                  activeTab === "stack"
                    ? "bg-[var(--card-subtle)] text-[var(--text)] font-semibold border border-[var(--lime)]/30"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <Code2 size={13} />
                <span>Tech Stack</span>
              </button>
            </div>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono-custom uppercase tracking-wider text-[var(--text)] font-semibold mb-2 flex items-center gap-2">
                    <Layers size={14} className="text-[var(--lime)]" />
                    <span>Project Description</span>
                  </h4>
                  <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.problemSolved && (
                  <div className="p-4 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)]">
                    <span className="text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)] font-semibold block mb-1.5">
                      Problem Solved & Real-World Context:
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                      {project.problemSolved}
                    </p>
                  </div>
                )}

                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono-custom uppercase tracking-wider text-[var(--text)] font-semibold flex items-center gap-2">
                      <Sparkles size={14} className="text-[var(--lime)]" />
                      <span>Key Engineering Highlights:</span>
                    </h4>
                    <div className="space-y-2.5">
                      {project.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                          <CheckCircle2 size={16} className="text-[var(--lime)] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ARCHITECTURE */}
            {activeTab === "architecture" && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-[var(--lime-bg)] border border-[var(--lime)]/30">
                  <h4 className="text-xs font-mono-custom uppercase tracking-wider text-[var(--lime)] font-semibold mb-2 flex items-center gap-2">
                    <Cpu size={14} />
                    <span>Technical Architecture Notes</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                    {project.architectureNotes || "Engineered with modular, decoupled components, strict interface contracts, and reactive client state synchronization."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)]">
                    <h5 className="font-display font-semibold text-sm text-[var(--text)] mb-2">
                      State & Data Sync
                    </h5>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Optimistic updates with automated cache rollback ensure instantaneous user feedback without waiting for server responses.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)]">
                    <h5 className="font-display font-semibold text-sm text-[var(--text)] mb-2">
                      Component Reusability
                    </h5>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Built with standard design tokens, composable inputs, and strict TypeScript types to eliminate regression bugs.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: STACK */}
            {activeTab === "stack" && (
              <div className="space-y-4">
                <span className="text-xs font-mono-custom text-[var(--text-muted)] block">
                  Technologies, Libraries & Tools Deployed:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.stack.map((tech) => (
                    <div
                      key={tech}
                      className="p-3 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--lime)]"></span>
                      <span className="text-xs font-mono-custom font-medium text-[var(--text)]">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-[var(--line)] bg-[var(--card-subtle)] flex items-center justify-between shrink-0">
            <span className="text-xs font-mono-custom text-[var(--text-muted)]">
              {project.accent === "lime" ? "Flagship ERP Architecture" : "Specialized Production Product"}
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
