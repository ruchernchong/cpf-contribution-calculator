"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const themeOptions = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
  },
];

const ThemeToggle = () => {
  const [theme, setTheme] = useState("system");

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
  }, [theme]);

  const applyTheme = (selectedTheme: string, root: HTMLElement) => {
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
  };

  const handleThemeChange = (newTheme: string) => {
    const root = window.document.documentElement;
    setTheme(newTheme);
    applyTheme(newTheme, root);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <Select value={theme} onValueChange={handleThemeChange}>
        <SelectTrigger aria-label="Select Theme">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent>
          {themeOptions.map(({ value, icon: Icon }) => (
            <SelectItem key={value} value={value}>
              <div className="flex items-center gap-2 mr-2">
                <Icon />
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeToggle;
