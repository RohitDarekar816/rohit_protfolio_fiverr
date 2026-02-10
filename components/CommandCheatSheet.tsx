'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Search, 
  Copy, 
  Check, 
  Container,
  GitBranch,
  Server,
  Cloud,
  BookOpen,
  Star,
  Filter,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface Command {
  id: string;
  category: string;
  command: string;
  description: string;
  example?: string;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
}

const commands: Command[] = [
  // Docker Commands
  {
    id: 'docker-1',
    category: 'Docker',
    command: 'docker ps',
    description: 'List all running containers',
    example: 'docker ps -a # Show all containers including stopped',
    tags: ['containers', 'list', 'basic'],
    level: 'beginner'
  },
  {
    id: 'docker-2',
    category: 'Docker',
    command: 'docker build -t <name> .',
    description: 'Build Docker image from Dockerfile',
    example: 'docker build -t myapp:latest .',
    tags: ['build', 'image', 'dockerfile'],
    level: 'beginner'
  },
  {
    id: 'docker-3',
    category: 'Docker',
    command: 'docker run -d -p 80:80 <image>',
    description: 'Run container in detached mode with port mapping',
    example: 'docker run -d -p 8080:80 --name web nginx',
    tags: ['run', 'port', 'detach'],
    level: 'beginner'
  },
  {
    id: 'docker-4',
    category: 'Docker',
    command: 'docker-compose up -d',
    description: 'Start all services defined in docker-compose.yml',
    example: 'docker-compose -f production.yml up -d',
    tags: ['compose', 'multi-container', 'orchestration'],
    level: 'intermediate'
  },
  {
    id: 'docker-5',
    category: 'Docker',
    command: 'docker logs -f <container>',
    description: 'Follow container logs in real-time',
    example: 'docker logs -f --tail 100 mycontainer',
    tags: ['logs', 'debug', 'monitoring'],
    level: 'beginner'
  },
  {
    id: 'docker-6',
    category: 'Docker',
    command: 'docker exec -it <container> bash',
    description: 'Execute interactive bash shell in running container',
    example: 'docker exec -it mycontainer sh',
    tags: ['debug', 'shell', 'interactive'],
    level: 'intermediate'
  },
  {
    id: 'docker-7',
    category: 'Docker',
    command: 'docker system prune -a',
    description: 'Remove all unused containers, networks, images, and volumes',
    example: 'docker system prune -a --volumes -f',
    tags: ['cleanup', 'maintenance', 'dangerous'],
    level: 'advanced'
  },
  {
    id: 'docker-8',
    category: 'Docker',
    command: 'docker network ls',
    description: 'List all Docker networks',
    example: 'docker network inspect bridge',
    tags: ['network', 'infrastructure'],
    level: 'intermediate'
  },

  // Kubernetes Commands
  {
    id: 'k8s-1',
    category: 'Kubernetes',
    command: 'kubectl get pods',
    description: 'List all pods in current namespace',
    example: 'kubectl get pods -n production -o wide',
    tags: ['pods', 'list', 'basic'],
    level: 'beginner'
  },
  {
    id: 'k8s-2',
    category: 'Kubernetes',
    command: 'kubectl apply -f <file>',
    description: 'Apply configuration from YAML file',
    example: 'kubectl apply -f deployment.yaml',
    tags: ['deploy', 'yaml', 'configuration'],
    level: 'beginner'
  },
  {
    id: 'k8s-3',
    category: 'Kubernetes',
    command: 'kubectl logs <pod>',
    description: 'Print logs from a pod',
    example: 'kubectl logs mypod -f --tail=50',
    tags: ['logs', 'debug', 'monitoring'],
    level: 'beginner'
  },
  {
    id: 'k8s-4',
    category: 'Kubernetes',
    command: 'kubectl port-forward <pod> 8080:80',
    description: 'Forward local port to pod port',
    example: 'kubectl port-forward svc/myapp 8080:80',
    tags: ['port-forward', 'access', 'debug'],
    level: 'intermediate'
  },
  {
    id: 'k8s-5',
    category: 'Kubernetes',
    command: 'kubectl exec -it <pod> -- /bin/bash',
    description: 'Execute command in pod',
    example: 'kubectl exec -it mypod -- sh',
    tags: ['exec', 'debug', 'shell'],
    level: 'intermediate'
  },
  {
    id: 'k8s-6',
    category: 'Kubernetes',
    command: 'kubectl top nodes',
    description: 'Display resource usage of nodes',
    example: 'kubectl top pods --all-namespaces',
    tags: ['metrics', 'monitoring', 'resources'],
    level: 'intermediate'
  },
  {
    id: 'k8s-7',
    category: 'Kubernetes',
    command: 'kubectl rollout restart deployment/<name>',
    description: 'Restart deployment (rolling update)',
    example: 'kubectl rollout status deployment/myapp',
    tags: ['deployment', 'restart', 'update'],
    level: 'intermediate'
  },
  {
    id: 'k8s-8',
    category: 'Kubernetes',
    command: 'kubectl get events --sort-by=.metadata.creationTimestamp',
    description: 'List cluster events sorted by time',
    example: 'kubectl get events --field-selector type=Warning',
    tags: ['events', 'debug', 'troubleshooting'],
    level: 'advanced'
  },

  // Git Commands
  {
    id: 'git-1',
    category: 'Git',
    command: 'git status',
    description: 'Show working tree status',
    example: 'git status -s # Short format',
    tags: ['status', 'basic'],
    level: 'beginner'
  },
  {
    id: 'git-2',
    category: 'Git',
    command: 'git add .',
    description: 'Add all changes to staging area',
    example: 'git add -p # Interactive staging',
    tags: ['add', 'staging'],
    level: 'beginner'
  },
  {
    id: 'git-3',
    category: 'Git',
    command: 'git commit -m "message"',
    description: 'Commit staged changes',
    example: 'git commit -am "fix: resolve bug"',
    tags: ['commit', 'save'],
    level: 'beginner'
  },
  {
    id: 'git-4',
    category: 'Git',
    command: 'git push origin <branch>',
    description: 'Push branch to remote',
    example: 'git push -u origin main',
    tags: ['push', 'remote'],
    level: 'beginner'
  },
  {
    id: 'git-5',
    category: 'Git',
    command: 'git pull --rebase',
    description: 'Pull changes with rebase',
    example: 'git pull origin main --rebase',
    tags: ['pull', 'rebase', 'sync'],
    level: 'intermediate'
  },
  {
    id: 'git-6',
    category: 'Git',
    command: 'git log --oneline --graph',
    description: 'Show commit history as graph',
    example: 'git log --oneline --graph --all --decorate',
    tags: ['log', 'history', 'visualization'],
    level: 'intermediate'
  },
  {
    id: 'git-7',
    category: 'Git',
    command: 'git reset --hard HEAD~1',
    description: 'Undo last commit (destructive)',
    example: 'git reset --soft HEAD~1 # Keep changes',
    tags: ['reset', 'undo', 'dangerous'],
    level: 'advanced'
  },
  {
    id: 'git-8',
    category: 'Git',
    command: 'git stash push -m "message"',
    description: 'Stash changes with description',
    example: 'git stash list && git stash pop',
    tags: ['stash', 'temporary', 'save'],
    level: 'intermediate'
  },

  // Linux Commands
  {
    id: 'linux-1',
    category: 'Linux',
    command: 'ls -la',
    description: 'List files with details including hidden',
    example: 'ls -lah # Human-readable sizes',
    tags: ['list', 'files', 'basic'],
    level: 'beginner'
  },
  {
    id: 'linux-2',
    category: 'Linux',
    command: 'ps aux | grep <process>',
    description: 'Find running process',
    example: 'ps aux | grep nginx',
    tags: ['process', 'search', 'monitoring'],
    level: 'beginner'
  },
  {
    id: 'linux-3',
    category: 'Linux',
    command: 'netstat -tlnp',
    description: 'Show listening ports with processes',
    example: 'ss -tlnp # Modern alternative',
    tags: ['network', 'ports', 'connections'],
    level: 'intermediate'
  },
  {
    id: 'linux-4',
    category: 'Linux',
    command: 'systemctl status <service>',
    description: 'Check service status',
    example: 'systemctl restart nginx',
    tags: ['systemd', 'services', 'management'],
    level: 'intermediate'
  },
  {
    id: 'linux-5',
    category: 'Linux',
    command: 'chmod 755 <file>',
    description: 'Change file permissions',
    example: 'chmod +x script.sh # Make executable',
    tags: ['permissions', 'security'],
    level: 'intermediate'
  },
  {
    id: 'linux-6',
    category: 'Linux',
    command: 'find / -name "*.log" -type f',
    description: 'Find files by name',
    example: 'find . -name "*.js" -mtime -7',
    tags: ['find', 'search', 'files'],
    level: 'intermediate'
  },
  {
    id: 'linux-7',
    category: 'Linux',
    command: 'tar -czvf archive.tar.gz <dir>',
    description: 'Create compressed archive',
    example: 'tar -xzvf archive.tar.gz # Extract',
    tags: ['archive', 'compress', 'backup'],
    level: 'beginner'
  },
  {
    id: 'linux-8',
    category: 'Linux',
    command: 'curl -I https://api.example.com',
    description: 'Check HTTP headers',
    example: 'curl -s -o /dev/null -w "%{http_code}" URL',
    tags: ['http', 'api', 'debug'],
    level: 'intermediate'
  },

  // AWS CLI Commands
  {
    id: 'aws-1',
    category: 'AWS',
    command: 'aws s3 ls',
    description: 'List S3 buckets',
    example: 'aws s3 ls s3://mybucket --recursive',
    tags: ['s3', 'storage', 'list'],
    level: 'beginner'
  },
  {
    id: 'aws-2',
    category: 'AWS',
    command: 'aws ec2 describe-instances',
    description: 'List EC2 instances',
    example: 'aws ec2 describe-instances --query "Reservations[].Instances[].InstanceId"',
    tags: ['ec2', 'compute', 'list'],
    level: 'intermediate'
  },
  {
    id: 'aws-3',
    category: 'AWS',
    command: 'aws logs tail /aws/lambda/myfunc',
    description: 'Tail CloudWatch logs',
    example: 'aws logs tail --follow --since 1h /aws/lambda/myfunc',
    tags: ['logs', 'cloudwatch', 'lambda'],
    level: 'intermediate'
  },
  {
    id: 'aws-4',
    category: 'AWS',
    command: 'aws eks update-kubeconfig --name <cluster>',
    description: 'Configure kubectl for EKS cluster',
    example: 'aws eks list-clusters',
    tags: ['eks', 'kubernetes', 'configure'],
    level: 'intermediate'
  }
];

const categories = ['All', 'Docker', 'Kubernetes', 'Git', 'Linux', 'AWS'];
const levels = ['All', 'beginner', 'intermediate', 'advanced'];

export function CommandCheatSheet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredCommands = useMemo(() => {
    return commands.filter((cmd) => {
      const matchesSearch = 
        cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || cmd.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || cmd.level === selectedLevel;
      const matchesFavorites = !showFavoritesOnly || favorites.has(cmd.id);

      return matchesSearch && matchesCategory && matchesLevel && matchesFavorites;
    });
  }, [searchQuery, selectedCategory, selectedLevel, favorites, showFavoritesOnly]);

  const copyCommand = (cmd: Command) => {
    navigator.clipboard.writeText(cmd.command);
    setCopiedId(cmd.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <section id="commands" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6"
          >
            <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-400 font-medium">DevOps Reference</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Command{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent">
              Cheat Sheet
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Searchable collection of essential DevOps commands. Copy, save favorites, 
            and boost your productivity.
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-purple-500/20 shadow-lg mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search commands, descriptions, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      selectedCategory === cat
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm focus:ring-2 focus:ring-purple-500"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Favorites Toggle */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                showFavoritesOnly
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Star className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              {showFavoritesOnly ? 'Favorites Only' : 'Show All'}
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-slate-500 dark:text-gray-400">
            Showing {filteredCommands.length} of {commands.length} commands
          </div>
        </motion.div>

        {/* Commands Grid */}
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredCommands.map((cmd, index) => (
              <motion.div
                key={cmd.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.02 }}
                className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getLevelColor(cmd.level)}`}>
                        {cmd.level}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-gray-400 flex items-center gap-1">
                        {cmd.category === 'Docker' && <Container className="w-4 h-4" />}
                        {cmd.category === 'Kubernetes' && <Server className="w-4 h-4" />}
                        {cmd.category === 'Git' && <GitBranch className="w-4 h-4" />}
                        {cmd.category === 'Linux' && <Terminal className="w-4 h-4" />}
                        {cmd.category === 'AWS' && <Cloud className="w-4 h-4" />}
                        {cmd.category}
                      </span>
                      <div className="flex gap-1">
                        {cmd.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Command */}
                    <div className="bg-slate-900 rounded-lg p-4 mb-3 font-mono text-sm text-green-400 overflow-x-auto">
                      <code>{cmd.command}</code>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-gray-400 mb-2">
                      {cmd.description}
                    </p>

                    {/* Example */}
                    {cmd.example && (
                      <div className="text-sm text-slate-500 dark:text-gray-500">
                        <span className="text-purple-600 dark:text-purple-400">Example: </span>
                        <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                          {cmd.example}
                        </code>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => copyCommand(cmd)}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-slate-600 dark:text-slate-400 hover:text-purple-600 transition-colors"
                      title="Copy command"
                    >
                      {copiedId === cmd.id ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleFavorite(cmd.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        favorites.has(cmd.id)
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                      }`}
                      title="Add to favorites"
                    >
                      <Star className={`w-5 h-5 ${favorites.has(cmd.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCommands.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Terminal className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <p className="text-slate-500 dark:text-gray-400 text-lg">No commands found</p>
            <p className="text-slate-400 dark:text-gray-500">Try adjusting your search or filters</p>
          </motion.div>
        )}

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            Want to learn more? Check out the official documentation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Docker Docs', url: 'https://docs.docker.com', icon: Container },
              { name: 'K8s Docs', url: 'https://kubernetes.io/docs', icon: Server },
              { name: 'Git Docs', url: 'https://git-scm.com/doc', icon: GitBranch },
              { name: 'AWS CLI', url: 'https://aws.amazon.com/cli', icon: Cloud },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
