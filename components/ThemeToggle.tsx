'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full bg-slate-200 dark:bg-slate-800/50 border border-purple-300 dark:border-purple-500/30 opacity-50"
        aria-label="Loading theme toggle"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 rounded-full bg-slate-200 dark:bg-slate-800/50 hover:bg-purple-200 dark:hover:bg-purple-600/20 border border-purple-300 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-500/60 transition-all duration-300 group"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 rotate-0 scale-100 ${
            theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 text-purple-600 dark:text-purple-400 transition-all duration-300 ${
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      
      {/* Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium text-slate-800 dark:text-white bg-white dark:bg-slate-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-purple-200 dark:border-purple-500/30 shadow-lg">
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  );
}
