import type { Metadata } from 'next';
import { DevOpsQuiz } from '@/components/DevOpsQuiz';
import { BuyMeACoffee } from '@/components/BuyMeACoffee';
import { ArrowLeft, Brain } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DevOps Knowledge Quiz | Rohit Darekar',
  description: 'Test your DevOps knowledge with our interactive quiz. Covering Docker, Kubernetes, Git, CI/CD, and more. Get your skill assessment!',
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-colors duration-300">
      <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg shadow-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent"
            >
              RD
            </Link>
            
            <div className="flex items-center gap-6">
              <Link
                href="/tools/docker-compose"
                className="text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm font-medium"
              >
                Docker
              </Link>
              <Link
                href="/tools/commands"
                className="text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm font-medium"
              >
                Commands
              </Link>
              <Link
                href="/tools/metrics"
                className="text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm font-medium"
              >
                Metrics
              </Link>
              <Link
                href="/freelance"
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                DevOps Knowledge Quiz
              </h1>
              <p className="text-slate-600 dark:text-gray-400">
                Test your skills and get instant feedback
              </p>
            </div>
          </div>
        </div>
      </div>

      <DevOpsQuiz />

      <footer className="bg-slate-900 py-8 px-4 border-t border-purple-500/20 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 Rohit Darekar. All rights reserved.
          </p>
        </div>
      </footer>
      <BuyMeACoffee />
    </main>
  );
}
