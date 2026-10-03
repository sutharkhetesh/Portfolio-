"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  FileText,
  Mail,
  Phone,
  Moon,
  Sun,
  Github,
  Linkedin,
  Layers,
  Code2,
  Briefcase,
  LayoutGrid,
  Send,
  ExternalLink,
  ArrowRight,
  Check,
} from "lucide-react";
import { useTheme } from "next-themes";
import { portfolio } from "@/data/portfolio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Actions" | "Projects" | "Social";
  icon: typeof Search;
  action: () => void;
}

export function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape or open on Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAction(label);
    setTimeout(() => {
      setCopiedAction(null);
      onClose();
    }, 1200);
  }, [onClose]);

  const scrollToSection = useCallback((id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [onClose]);

  const items: CommandItem[] = useMemo(() => [
    // Navigation
    {
      id: "nav-about",
      title: "About Khetesh",
      subtitle: "Engineering philosophy & focus areas",
      category: "Navigation",
      icon: Code2,
      action: () => scrollToSection("about"),
    },
    {
      id: "nav-skills",
      title: "Technical Toolkit",
      subtitle: "React, Next.js, TypeScript, GraphQL",
      category: "Navigation",
      icon: Layers,
      action: () => scrollToSection("skills"),
    },
    {
      id: "nav-experience",
      title: "Experience & Education",
      subtitle: "TDC Consultancy & Academic credentials",
      category: "Navigation",
      icon: Briefcase,
      action: () => scrollToSection("experience"),
    },
    {
      id: "nav-projects",
      title: "Selected Work",
      subtitle: "EdgeBooks ERP, utilities & web apps",
      category: "Navigation",
      icon: LayoutGrid,
      action: () => scrollToSection("projects"),
    },
    {
      id: "nav-contact",
      title: "Contact & Inquiries",
      subtitle: "Direct email, WhatsApp & message form",
      category: "Navigation",
      icon: Send,
      action: () => scrollToSection("contact"),
    },

    // Actions
    {
      id: "act-resume",
      title: "View Digital Resume / CV",
      subtitle: "Printable single-page curriculum vitae",
      category: "Actions",
      icon: FileText,
      action: () => {
        onClose();
        setTimeout(onOpenResume, 150);
      },
    },
    {
      id: "act-copy-email",
      title: "Copy Email Address",
      subtitle: portfolio.email,
      category: "Actions",
      icon: Mail,
      action: () => copyToClipboard(portfolio.email, "Email copied!"),
    },
    {
      id: "act-copy-phone",
      title: "Copy Phone Number",
      subtitle: portfolio.phone,
      category: "Actions",
      icon: Phone,
      action: () => copyToClipboard(portfolio.phone, "Phone copied!"),
    },
    {
      id: "act-toggle-theme",
      title: `Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`,
      subtitle: "Toggle color theme",
      category: "Actions",
      icon: resolvedTheme === "dark" ? Sun : Moon,
      action: () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        onClose();
      },
    },

    // Projects
    ...portfolio.projects.map((proj) => ({
      id: `proj-${proj.id}`,
      title: proj.title,
      subtitle: `${proj.category} · ${proj.stack.slice(0, 3).join(", ")}`,
      category: "Projects" as const,
      icon: ExternalLink,
      action: () => scrollToSection("projects"),
    })),

    // Social Links
    {
      id: "soc-github",
      title: "GitHub Profile",
      subtitle: "Explore repositories & code",
      category: "Social",
      icon: Github,
      action: () => {
        window.open(portfolio.socials.github, "_blank");
        onClose();
      },
    },
    {
      id: "soc-linkedin",
      title: "LinkedIn Profile",
      subtitle: "Connect professionally",
      category: "Social",
      icon: Linkedin,
      action: () => {
        window.open(portfolio.socials.linkedin, "_blank");
        onClose();
      },
    },
  ], [resolvedTheme, setTheme, onOpenResume, copyToClipboard, scrollToSection, onClose]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:pt-28 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl glass-card !p-0 z-10 bg-[var(--card)] border border-[var(--line)] shadow-2xl overflow-hidden rounded-2xl flex flex-col"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--line)] bg-[var(--card)]">
            <Search size={18} className="text-[var(--text-muted)] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none font-sans"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <X size={14} />
              </button>
            )}
            <kbd className="kbd-badge hidden sm:inline-flex">ESC</kbd>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[var(--line)]/40">
            {copiedAction && (
              <div className="p-3 mb-2 rounded-xl bg-[var(--lime-bg)] text-[var(--lime)] text-xs font-mono-custom flex items-center gap-2 border border-[var(--lime)]/30">
                <Check size={14} />
                <span>{copiedAction}</span>
              </div>
            )}

            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono-custom text-[var(--text-muted)]">
                No matching results found for &quot;{query}&quot;
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                      isSelected
                        ? "bg-[var(--card-subtle)] text-[var(--text)] border border-[var(--lime)]/30"
                        : "text-[var(--text)] hover:bg-[var(--card-subtle)] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? "bg-[var(--lime-bg)] text-[var(--lime)] border-[var(--lime)]/30"
                            : "bg-[var(--card)] text-[var(--text-muted)] border-[var(--line)]"
                        }`}
                      >
                        <Icon size={15} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium font-sans truncate">
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className="text-[11px] font-mono-custom text-[var(--text-muted)] truncate">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-mono-custom text-[var(--text-muted)] uppercase tracking-wider hidden sm:inline">
                        {item.category}
                      </span>
                      {isSelected && (
                        <ArrowRight size={13} className="text-[var(--lime)]" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 bg-[var(--card-subtle)] border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono-custom text-[var(--text-muted)]">
            <div className="flex items-center gap-3">
              <span><kbd className="kbd-badge text-[9px] mr-1">↑↓</kbd> Navigate</span>
              <span><kbd className="kbd-badge text-[9px] mr-1">↵</kbd> Select</span>
            </div>
            <span>Khetesh Suthar · Portfolio Studio</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
