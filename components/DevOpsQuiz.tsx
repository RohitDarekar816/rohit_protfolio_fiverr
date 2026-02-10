'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy,
  ArrowRight,
  RotateCcw,
  Share2,
  BookOpen,
  Target,
  Star
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does Docker use to isolate processes?",
    options: [
      "Virtual Machines",
      "Linux Namespaces and Cgroups",
      "Hardware virtualization",
      "Hypervisors"
    ],
    correct: 1,
    explanation: "Docker uses Linux namespaces for isolation and cgroups for resource limiting, not full VMs.",
    category: "Docker",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "In Kubernetes, what is the smallest deployable unit?",
    options: [
      "Node",
      "Container",
      "Pod",
      "Deployment"
    ],
    correct: 2,
    explanation: "A Pod is the smallest deployable unit in Kubernetes, which can contain one or more containers.",
    category: "Kubernetes",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "Which command creates a new Git branch?",
    options: [
      "git checkout -b branch-name",
      "git new branch branch-name",
      "git create branch branch-name",
      "git branch -c branch-name"
    ],
    correct: 0,
    explanation: "git checkout -b branch-name creates and switches to a new branch in one command.",
    category: "Git",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "What is Infrastructure as Code (IaC)?",
    options: [
      "Writing code for infrastructure hardware",
      "Managing infrastructure through code/version control",
      "Coding infrastructure documentation",
      "Hardware programming"
    ],
    correct: 1,
    explanation: "IaC is the practice of managing infrastructure through machine-readable definition files.",
    category: "DevOps",
    difficulty: "medium"
  },
  {
    id: 5,
    question: "Which AWS service is used for container orchestration?",
    options: [
      "EC2",
      "ECS/EKS",
      "Lambda",
      "S3"
    ],
    correct: 1,
    explanation: "ECS (Elastic Container Service) and EKS (Elastic Kubernetes Service) are AWS container orchestration services.",
    category: "AWS",
    difficulty: "medium"
  },
  {
    id: 6,
    question: "What is the purpose of a CI/CD pipeline?",
    options: [
      "To manually deploy code",
      "To automate build, test, and deployment",
      "To write code faster",
      "To manage databases"
    ],
    correct: 1,
    explanation: "CI/CD pipelines automate the continuous integration and continuous deployment processes.",
    category: "CI/CD",
    difficulty: "easy"
  },
  {
    id: 7,
    question: "What does 'idempotent' mean in DevOps?",
    options: [
      "Running multiple times has the same effect as running once",
      "Running only once",
      "Running continuously",
      "Running in parallel"
    ],
    correct: 0,
    explanation: "Idempotent operations can be applied multiple times without changing the result beyond the initial application.",
    category: "DevOps",
    difficulty: "hard"
  },
  {
    id: 8,
    question: "Which Linux command shows running processes?",
    options: [
      "ls",
      "ps aux",
      "top",
      "Both B and C"
    ],
    correct: 3,
    explanation: "Both 'ps aux' and 'top' commands can show running processes in Linux.",
    category: "Linux",
    difficulty: "medium"
  },
  {
    id: 9,
    question: "What is a Docker volume used for?",
    options: [
      "Increasing container memory",
      "Persisting data outside containers",
      "Networking between containers",
      "Container orchestration"
    ],
    correct: 1,
    explanation: "Docker volumes are used to persist data outside of containers, surviving container restarts.",
    category: "Docker",
    difficulty: "medium"
  },
  {
    id: 10,
    question: "In Git, what does 'git stash' do?",
    options: [
      "Deletes uncommitted changes",
      "Saves uncommitted changes temporarily",
      "Commits changes",
      "Pushes changes to remote"
    ],
    correct: 1,
    explanation: "git stash temporarily saves uncommitted changes so you can work on something else.",
    category: "Git",
    difficulty: "medium"
  },
  {
    id: 11,
    question: "What is the main benefit of blue-green deployment?",
    options: [
      "Lower cost",
      "Zero downtime deployments",
      "Faster builds",
      "Better security"
    ],
    correct: 1,
    explanation: "Blue-green deployment allows instant switch between versions with zero downtime.",
    category: "CI/CD",
    difficulty: "hard"
  },
  {
    id: 12,
    question: "Which command checks disk space in Linux?",
    options: [
      "memory",
      "disk",
      "df -h",
      "space"
    ],
    correct: 2,
    explanation: "df -h (disk free) shows disk space usage in human-readable format.",
    category: "Linux",
    difficulty: "easy"
  }
];

export function DevOpsQuiz() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean }[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const startQuiz = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(30);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, { questionId: questions[currentQuestion].id, correct: isCorrect }]);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      setGameState('result');
    }
  };

  const getSkillLevel = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { level: 'Expert', color: 'text-green-500', icon: Trophy };
    if (percentage >= 60) return { level: 'Advanced', color: 'text-blue-500', icon: Star };
    if (percentage >= 40) return { level: 'Intermediate', color: 'text-yellow-500', icon: Target };
    return { level: 'Beginner', color: 'text-orange-500', icon: BookOpen };
  };

  const getCategoryScore = (category: string) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const correct = answers.filter(a => {
      const q = questions.find(ques => ques.id === a.questionId);
      return q?.category === category && a.correct;
    }).length;
    return { total: categoryQuestions.length, correct };
  };

  if (gameState === 'start') {
    return (
      <section id="devops-quiz" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/20 border border-green-500/30 mb-6"
            >
              <Brain className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-700 dark:text-green-400 font-medium">Knowledge Test</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              DevOps Knowledge{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Quiz
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Test your DevOps knowledge with {questions.length} questions covering Docker, 
              Kubernetes, Git, CI/CD, AWS, and Linux. Get your skill assessment instantly!
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-green-500/20 shadow-xl text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Brain className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Test Your Skills?
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['Docker', 'Kubernetes', 'Git', 'CI/CD'].map((topic) => (
                <div key={topic} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{topic}</p>
                </div>
              ))}
            </div>
            
            <button
              onClick={startQuiz}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/30"
            >
              Start Quiz
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  if (gameState === 'playing') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <section id="devops-quiz" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600 dark:text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-slate-600 dark:text-gray-400">
                Score: {score}
              </span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-green-500/20 shadow-xl"
          >
            {/* Category & Difficulty */}
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                {question.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {question.difficulty}
              </span>
            </div>

            {/* Question */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedAnswer === null
                      ? 'border-slate-200 dark:border-slate-700 hover:border-green-400 dark:hover:border-green-500'
                      : selectedAnswer === index
                        ? index === question.correct
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : index === question.correct
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-slate-200 dark:border-slate-700 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 dark:text-white font-medium">{option}</span>
                    {selectedAnswer !== null && (
                      <>
                        {index === question.correct ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="w-6 h-6 text-red-500" />
                        ) : null}
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl"
                >
                  <p className="text-blue-900 dark:text-blue-300">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={nextQuestion}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full hover:from-green-700 hover:to-emerald-700 transition-all"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  // Results
  const skillLevel = getSkillLevel();
  const SkillIcon = skillLevel.icon;

  return (
    <section id="devops-quiz" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-green-500/20 shadow-xl"
        >
          {/* Score Header */}
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${
              score >= 8 ? 'from-green-500 to-emerald-500' :
              score >= 6 ? 'from-blue-500 to-cyan-500' :
              score >= 4 ? 'from-yellow-500 to-orange-500' :
              'from-orange-500 to-red-500'
            } flex items-center justify-center`}>
              <SkillIcon className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              {score} / {questions.length}
            </h2>
            <p className={`text-2xl font-semibold ${skillLevel.color}`}>
              {skillLevel.level}
            </p>
            <p className="text-slate-600 dark:text-gray-400 mt-2">
              You scored {Math.round((score / questions.length) * 100)}%
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {['Docker', 'Kubernetes', 'Git', 'CI/CD', 'AWS', 'Linux'].map((category) => {
              const stats = getCategoryScore(category);
              if (stats.total === 0) return null;
              return (
                <div key={category} className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
                  <p className="text-sm text-slate-500 dark:text-gray-400">{category}</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {stats.correct}/{stats.total}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Learning Resources */}
          <div className="bg-slate-100 dark:bg-slate-700/50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Recommended Learning Resources
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-gray-400">
              {score < 6 && (
                <li>• Start with Docker & Kubernetes fundamentals</li>
              )}
              {score < 8 && (
                <li>• Practice Git workflows and branching strategies</li>
              )}
              <li>• Explore CI/CD pipeline tutorials on YouTube</li>
              <li>• Try AWS Free Tier hands-on labs</li>
              <li>• Read "The DevOps Handbook" for best practices</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={startQuiz}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Quiz
            </button>
            <button
              onClick={() => alert('Share functionality would open social sharing options')}
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share Result
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
