import { useEffect, useState } from "react";

const STORAGE_KEY = "bizik-theme";

const getInitialTheme = (): boolean => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(() => getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return { isDark, toggleDark };
};
