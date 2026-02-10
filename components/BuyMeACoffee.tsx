'use client';

import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

export function BuyMeACoffee() {
  return (
    <motion.a
      href="https://buymeacoffee.com/rohitdarekar"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <Coffee className="w-5 h-5" />
      <span className="font-semibold text-sm hidden sm:inline">Buy me a coffee</span>
      
      {/* Tooltip */}
      <span className="absolute -top-10 right-0 px-3 py-1 text-xs font-medium text-white bg-slate-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Support my work
      </span>
    </motion.a>
  );
}
