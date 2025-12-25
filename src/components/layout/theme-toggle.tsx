"use client";

import {
  ComputerIcon,
  Moon01Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const themeOptions = [
  {
    value: "light",
    label: "Light",
    icon: Sun01Icon,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon01Icon,
  },
  {
    value: "system",
    label: "System",
    icon: ComputerIcon,
  },
] as const;

const ThemeToggle = () => {
  const [theme, setTheme] = useState("system");

  const applyTheme = useCallback((selectedTheme: string, root: HTMLElement) => {
    switch (selectedTheme) {
      case "dark":
        root.classList.add("dark");
        root.classList.remove("light");
        break;
      case "light":
        root.classList.add("light");
        root.classList.remove("dark");
        break;
      case "system": {
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        root.classList.toggle("dark", isDarkMode);
        root.classList.toggle("light", !isDarkMode);
        break;
      }
      default:
        root.classList.remove("light");
        root.classList.remove("dark");
        break;
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme, root);

    // Set up a listener for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        applyTheme(e.matches ? "dark" : "light", root);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme, applyTheme]);

  const handleThemeChange = (newTheme: string | null) => {
    if (!newTheme) return;
    const root = window.document.documentElement;
    setTheme(newTheme);
    applyTheme(newTheme, root);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <Select value={theme} onValueChange={handleThemeChange}>
        <SelectTrigger aria-label="Select Theme">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {themeOptions.map(({ value, label, icon }) => (
            <SelectItem key={value} value={value}>
              <HugeiconsIcon icon={icon} className="size-4" strokeWidth={2} />
              <span>{label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeToggle;
