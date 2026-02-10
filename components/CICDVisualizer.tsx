'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  Upload,
  Download,
  Eye,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  FileCode,
  Workflow
} from 'lucide-react';

interface PipelineStep {
  id: string;
  name: string;
  type: 'build' | 'test' | 'deploy' | 'notify' | 'approval';
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration?: string;
  logs?: string[];
  parallel?: boolean;
  dependsOn?: string[];
}

interface Pipeline {
  name: string;
  steps: PipelineStep[];
  trigger: string;
  branch: string;
}

const samplePipelines: Record<string, Pipeline> = {
  'github-actions': {
    name: 'Node.js CI',
    trigger: 'push',
    branch: 'main',
    steps: [
      { id: '1', name: 'Checkout Code', type: 'build', status: 'success', duration: '2s' },
      { id: '2', name: 'Setup Node.js', type: 'build', status: 'success', duration: '5s', dependsOn: ['1'] },
      { id: '3a', name: 'Lint', type: 'test', status: 'success', duration: '15s', parallel: true, dependsOn: ['2'] },
      { id: '3b', name: 'Unit Tests', type: 'test', status: 'running', duration: '45s', parallel: true, dependsOn: ['2'] },
      { id: '3c', name: 'Type Check', type: 'test', status: 'pending', parallel: true, dependsOn: ['2'] },
      { id: '4', name: 'Build App', type: 'build', status: 'pending', dependsOn: ['3a', '3b', '3c'] },
      { id: '5', name: 'Deploy to Staging', type: 'deploy', status: 'pending', dependsOn: ['4'] },
      { id: '6', name: 'Notify Slack', type: 'notify', status: 'pending', dependsOn: ['5'] },
    ]
  },
  'gitlab-ci': {
    name: 'Java Deployment',
    trigger: 'merge_request',
    branch: 'develop',
    steps: [
      { id: '1', name: 'Clone Repository', type: 'build', status: 'success', duration: '3s' },
      { id: '2', name: 'Maven Build', type: 'build', status: 'success', duration: '2m 15s', dependsOn: ['1'] },
      { id: '3', name: 'Run Tests', type: 'test', status: 'failed', duration: '3m 42s', dependsOn: ['2'] },
      { id: '4', name: 'Security Scan', type: 'test', status: 'skipped', dependsOn: ['3'] },
      { id: '5', name: 'Package Artifacts', type: 'build', status: 'skipped', dependsOn: ['3'] },
    ]
  },
  'jenkins': {
    name: 'Docker Build & Push',
    trigger: 'cron',
    branch: 'main',
    steps: [
      { id: '1', name: 'Clean Workspace', type: 'build', status: 'success', duration: '1s' },
      { id: '2', name: 'Docker Build', type: 'build', status: 'success', duration: '5m 20s', dependsOn: ['1'] },
      { id: '3', name: 'Vulnerability Scan', type: 'test', status: 'success', duration: '2m 10s', dependsOn: ['2'] },
      { id: '4', name: 'Approval Gate', type: 'approval', status: 'pending', dependsOn: ['3'] },
      { id: '5', name: 'Push to Registry', type: 'deploy', status: 'pending', dependsOn: ['4'] },
    ]
  }
};

const stepColors = {
  build: 'bg-blue-500',
  test: 'bg-green-500',
  deploy: 'bg-purple-500',
  notify: 'bg-orange-500',
  approval: 'bg-yellow-500'
};

const statusColors = {
  pending: 'bg-gray-300',
  running: 'bg-blue-400 animate-pulse',
  success: 'bg-green-500',
  failed: 'bg-red-500',
  skipped: 'bg-gray-400'
};

const statusIcons = {
  pending: Clock,
  running: Play,
  success: CheckCircle,
  failed: XCircle,
  skipped: AlertCircle
};

export function CICDVisualizer() {
  const [selectedPipeline, setSelectedPipeline] = useState<string>('github-actions');
  const [selectedStep, setSelectedStep] = useState<PipelineStep | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [customYaml, setCustomYaml] = useState('');
  const [showYamlInput, setShowYamlInput] = useState(false);

  const pipeline = samplePipelines[selectedPipeline];

  const simulatePipeline = useCallback(() => {
    setIsSimulating(true);
    // Simulation logic would go here
    setTimeout(() => setIsSimulating(false), 3000);
  }, []);

  const parseYaml = (yaml: string) => {
    // Basic YAML parsing for demo
    // In production, use a proper YAML parser
    alert('YAML parsing would be implemented here with a proper parser library');
  };

  return (
    <section id="cicd-visualizer" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6"
          >
            <Workflow className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-400 font-medium">Pipeline Visualization</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            CI/CD Pipeline{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent">
              Visualizer
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Upload your CI/CD configuration and visualize the pipeline flow. 
            See dependencies, parallel jobs, and execution status in real-time.
          </motion.p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-purple-500/20 shadow-lg mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <select
                value={selectedPipeline}
                onChange={(e) => setSelectedPipeline(e.target.value)}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              >
                <option value="github-actions">GitHub Actions Example</option>
                <option value="gitlab-ci">GitLab CI Example</option>
                <option value="jenkins">Jenkins Example</option>
              </select>

              <button
                onClick={() => setShowYamlInput(!showYamlInput)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload YAML
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm text-slate-600 dark:text-gray-400 min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={simulatePipeline}
                disabled={isSimulating}
                className="ml-4 flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                {isSimulating ? 'Simulating...' : 'Simulate'}
              </button>
            </div>
          </div>

          {/* YAML Input */}
          <AnimatePresence>
            {showYamlInput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 overflow-hidden"
              >
                <textarea
                  value={customYaml}
                  onChange={(e) => setCustomYaml(e.target.value)}
                  placeholder="Paste your .github/workflows/*.yml or .gitlab-ci.yml content here..."
                  className="w-full h-48 p-4 rounded-lg bg-slate-900 text-green-400 font-mono text-sm resize-none border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setShowYamlInput(false)}
                    className="px-4 py-2 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => parseYaml(customYaml)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Parse & Visualize
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pipeline Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">{pipeline.name}</h3>
              <div className="flex items-center gap-4 mt-2 text-purple-100">
                <span className="flex items-center gap-1">
                  <GitBranch className="w-4 h-4" />
                  {pipeline.branch}
                </span>
                <span>•</span>
                <span className="capitalize">{pipeline.trigger} trigger</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="font-semibold">
                  {pipeline.steps.filter(s => s.status === 'success').length} / {pipeline.steps.length} Passed
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-purple-500/20 shadow-xl overflow-x-auto"
        >
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
            <div className="flex flex-col gap-6 min-w-[800px]">
              {/* Group steps by level/dependencies */}
              {pipeline.steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 ${step.parallel ? 'ml-8' : ''}`}
                >
                  {/* Step Card */}
                  <button
                    onClick={() => setSelectedStep(selectedStep?.id === step.id ? null : step)}
                    className={`flex-1 flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      selectedStep?.id === step.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-purple-400'
                    }`}
                  >
                    {/* Status Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusColors[step.status]}`}>
                      {(() => {
                        const Icon = statusIcons[step.status];
                        return <Icon className="w-5 h-5 text-white" />;
                      })()}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900 dark:text-white">{step.name}</h4>
                        {step.parallel && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                            Parallel
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 mt-1">
                        <span className={`w-2 h-2 rounded-full ${stepColors[step.type]}`} />
                        <span className="capitalize">{step.type}</span>
                        {step.duration && (
                          <>
                            <span>•</span>
                            <Clock className="w-3 h-3" />
                            <span>{step.duration}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* View Details */}
                    <Eye className="w-5 h-5 text-slate-400" />
                  </button>

                  {/* Connection Arrow */}
                  {index < pipeline.steps.length - 1 && !step.parallel && (
                    <div className="absolute left-8 -bottom-3 w-0.5 h-6 bg-slate-300 dark:bg-slate-600" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step Details Panel */}
        <AnimatePresence>
          {selectedStep && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-slate-900 rounded-2xl p-6 border border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedStep.name}</h3>
                  <p className="text-slate-400 mt-1">Step Details & Logs</p>
                </div>
                <button
                  onClick={() => setSelectedStep(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>

              <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                <pre>{`> ${selectedStep.name}
> Status: ${selectedStep.status}
${selectedStep.duration ? `> Duration: ${selectedStep.duration}` : ''}
> 
> Executing step...
> ${selectedStep.status === 'success' ? '✓ Completed successfully' : selectedStep.status === 'failed' ? '✗ Failed with errors' : '⏳ In progress...'}
> 
> ${selectedStep.status === 'success' ? 'Exit code: 0' : selectedStep.status === 'failed' ? 'Exit code: 1' : 'Waiting for completion...'}`}</pre>
              </div>

              <div className="flex gap-4 mt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
                  <FileCode className="w-4 h-4" />
                  View Configuration
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Download Logs
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span className="text-slate-600 dark:text-gray-400">Build</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-slate-600 dark:text-gray-400">Test</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-500" />
            <span className="text-slate-600 dark:text-gray-400">Deploy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500" />
            <span className="text-slate-600 dark:text-gray-400">Notify</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500" />
            <span className="text-slate-600 dark:text-gray-400">Approval</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            Need help setting up CI/CD pipelines?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            Let's Discuss Your Pipeline
            <Workflow className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
