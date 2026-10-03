"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <span className="w-10 h-10 inline-block rounded-xl border border-[var(--line)] bg-[var(--card)]" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="icon-btn"
    >
      {isDark ? (
        <Sun size={17} className="text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon size={17} className="text-slate-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
