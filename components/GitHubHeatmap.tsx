'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, GitCommit, GitBranch, Star, Calendar, Activity, TrendingUp, Code } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface GitHubStats {
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
  activeDays: number;
  totalCommits: number;
  totalRepos: number;
  followers: number;
  following: number;
}

// Generate realistic contribution data for the past year
const generateContributionData = (): ContributionWeek[] => {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  // Start from the beginning of the week containing one year ago
  const startDate = new Date(oneYearAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  let currentWeek: ContributionDay[] = [];
  
  for (let i = 0; i < 365 + today.getDay(); i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Generate realistic contribution patterns
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Base probability of contribution
    let probability = isWeekend ? 0.3 : 0.7;
    
    // Add some streaks and patterns
    const weekNumber = Math.floor(i / 7);
    if (weekNumber % 4 === 0) probability += 0.2; // Busy weeks
    if (weekNumber % 6 === 0) probability -= 0.3; // Light weeks
    
    // Random contribution count
    const hasContribution = Math.random() < probability;
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    
    if (hasContribution) {
      const intensity = Math.random();
      if (intensity < 0.5) {
        count = Math.floor(Math.random() * 3) + 1;
        level = 1;
      } else if (intensity < 0.75) {
        count = Math.floor(Math.random() * 5) + 3;
        level = 2;
      } else if (intensity < 0.9) {
        count = Math.floor(Math.random() * 8) + 6;
        level = 3;
      } else {
        count = Math.floor(Math.random() * 15) + 10;
        level = 4;
      }
    }
    
    currentWeek.push({
      date: currentDate.toISOString().split('T')[0],
      count,
      level
    });
    
    if (currentWeek.length === 7) {
      weeks.push({ days: currentWeek });
      currentWeek = [];
    }
  }
  
  if (currentWeek.length > 0) {
    weeks.push({ days: currentWeek });
  }
  
  return weeks;
};

const calculateStats = (weeks: ContributionWeek[]): GitHubStats => {
  let totalContributions = 0;
  let longestStreak = 0;
  let currentStreak = 0;
  let activeDays = 0;
  let tempStreak = 0;
  let maxStreak = 0;
  
  const allDays = weeks.flatMap(week => week.days);
  
  allDays.forEach((day, index) => {
    totalContributions += day.count;
    
    if (day.count > 0) {
      activeDays++;
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
    
    // Calculate current streak (from most recent)
    if (index >= allDays.length - 30) {
      if (day.count > 0) {
        currentStreak++;
      } else if (index === allDays.length - 1) {
        // Don't break streak if today has no contributions yet
      } else {
        currentStreak = 0;
      }
    }
  });
  
  longestStreak = maxStreak;
  
  return {
    totalContributions,
    longestStreak,
    currentStreak,
    activeDays,
    totalCommits: Math.floor(totalContributions * 0.8),
    totalRepos: 24,
    followers: 156,
    following: 89
  };
};

const getLevelColor = (level: number, isDark: boolean): string => {
  const colors = {
    light: ['bg-slate-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500'],
    dark: ['bg-slate-800', 'bg-purple-900/40', 'bg-purple-800/60', 'bg-purple-700/80', 'bg-purple-600']
  };
  return isDark ? colors.dark[level] : colors.light[level];
};

const getTooltipText = (day: ContributionDay): string => {
  const date = new Date(day.date);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  if (day.count === 0) {
    return `No contributions on ${date.toLocaleDateString('en-US', options)}`;
  } else if (day.count === 1) {
    return `1 contribution on ${date.toLocaleDateString('en-US', options)}`;
  } else {
    return `${day.count} contributions on ${date.toLocaleDateString('en-US', options)}`;
  }
};

export function GitHubHeatmap() {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDark] = useState(true); // Will detect from theme
  const [selectedView, setSelectedView] = useState<'full' | 'half'>('full');

  useEffect(() => {
    const data = generateContributionData();
    setWeeks(data);
    setStats(calculateStats(data));
  }, []);

  const handleMouseEnter = (day: ContributionDay, event: React.MouseEvent) => {
    setHoveredDay(day);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (!stats) return null;

  return (
    <section id="github" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6"
          >
            <Github className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-400 font-medium">Open Source</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            GitHub{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent">
              Activity
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            My coding journey visualized. Track my contributions, commits, and open source activity over the past year.
          </motion.p>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { 
              label: 'Total Contributions', 
              value: stats.totalContributions.toLocaleString(), 
              icon: <GitCommit className="w-5 h-5" />,
              color: 'from-purple-500 to-pink-500'
            },
            { 
              label: 'Longest Streak', 
              value: `${stats.longestStreak} days`, 
              icon: <TrendingUp className="w-5 h-5" />,
              color: 'from-green-500 to-emerald-500'
            },
            { 
              label: 'Active Days', 
              value: stats.activeDays.toString(), 
              icon: <Calendar className="w-5 h-5" />,
              color: 'from-blue-500 to-cyan-500'
            },
            { 
              label: 'Total Commits', 
              value: stats.totalCommits.toLocaleString(), 
              icon: <Code className="w-5 h-5" />,
              color: 'from-orange-500 to-red-500'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-purple-500/20 shadow-lg"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-3`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Heatmap Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-purple-500/20 shadow-xl"
        >
          {/* Heatmap Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center">
                <Github className="w-7 h-7 text-white dark:text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contribution Graph</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">
                  {stats.totalContributions.toLocaleString()} contributions in the last year
                </p>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setSelectedView('full')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  selectedView === 'full'
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-gray-400'
                }`}
              >
                Full Year
              </button>
              <button
                onClick={() => setSelectedView('half')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  selectedView === 'half'
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-gray-400'
                }`}
              >
                6 Months
              </button>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[750px]">
              {/* Month Labels */}
              <div className="flex mb-2 ml-10">
                {monthLabels.map((month, index) => (
                  <div 
                    key={month} 
                    className="flex-1 text-xs text-slate-500 dark:text-gray-400 font-medium"
                    style={{ marginLeft: index === 0 ? 0 : '0px' }}
                  >
                    {month}
                  </div>
                ))}
              </div>

              <div className="flex">
                {/* Day Labels */}
                <div className="flex flex-col justify-around mr-3 text-xs text-slate-500 dark:text-gray-400">
                  {dayLabels.filter((_, i) => i % 2 === 0).map((day) => (
                    <div key={day} className="h-4 flex items-center">{day}</div>
                  ))}
                </div>

                {/* Contribution Grid */}
                <div className="flex gap-1">
                  <AnimatePresence>
                    {(selectedView === 'half' ? weeks.slice(-26) : weeks).map((week, weekIndex) => (
                      <motion.div
                        key={weekIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: weekIndex * 0.01 }}
                        className="flex flex-col gap-1"
                      >
                        {week.days.map((day, dayIndex) => (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`w-3 h-3 rounded-sm ${getLevelColor(day.level, isDark)} cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-purple-500 hover:ring-offset-1 hover:ring-offset-white dark:hover:ring-offset-slate-800`}
                            onMouseEnter={(e) => handleMouseEnter(day, e)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            whileHover={{ scale: 1.3 }}
                            title={getTooltipText(day)}
                          />
                        ))}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4 text-xs text-slate-500 dark:text-gray-400">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getLevelColor(level, isDark)}`}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          {/* Current Streak */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 rounded-2xl p-6 border border-orange-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-6 h-6 text-orange-500" />
              <h4 className="font-semibold text-slate-900 dark:text-white">Current Streak</h4>
            </div>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
              {stats.currentStreak} days
            </p>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Keep it up! You're on fire! 🔥
            </p>
          </div>

          {/* Repositories */}
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-3">
              <GitBranch className="w-6 h-6 text-blue-500" />
              <h4 className="font-semibold text-slate-900 dark:text-white">Public Repos</h4>
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {stats.totalRepos}
            </p>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Open source projects shared with the community
            </p>
          </div>

          {/* Followers */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-6 h-6 text-purple-500" />
              <h4 className="font-semibold text-slate-900 dark:text-white">Followers</h4>
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {stats.followers}
            </p>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Developers following my work
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/rohitdarekar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            <Github className="w-5 h-5" />
            View My GitHub Profile
          </a>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'fixed',
                left: mousePosition.x,
                top: mousePosition.y - 60,
                transform: 'translateX(-50%)',
                zIndex: 1000,
                pointerEvents: 'none'
              }}
              className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
            >
              {getTooltipText(hoveredDay)}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
