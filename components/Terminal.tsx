'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Copy, Check, Play, Pause, RotateCcw } from 'lucide-react';

interface Command {
  command: string;
  output: string[];
  delay: number;
}

const devOpsCommands: Command[] = [
  {
    command: 'docker ps',
    output: [
      'CONTAINER ID   IMAGE                    STATUS          PORTS                    NAMES',
      'a1b2c3d4e5f6   nginx:latest             Up 2 hours      0.0.0.0:80->80/tcp       web-server',
      'b2c3d4e5f6g7   postgres:15              Up 5 hours      0.0.0.0:5432->5432/tcp   database',
      'c3d4e5f6g7h8   redis:alpine             Up 3 days       0.0.0.0:6379->6379/tcp   cache',
      'd4e5f6g7h8i9   rohit/devops-tools:v2.1  Up 1 hour       0.0.0.0:8080->8080/tcp   devops-dashboard',
    ],
    delay: 800,
  },
  {
    command: 'kubectl get pods -n production',
    output: [
      'NAME                                    READY   STATUS    RESTARTS   AGE',
      'api-gateway-7c4b9f5d8-x2k9p            1/1     Running   0          3d12h',
      'auth-service-9f8e7d6c5-b4m2n           1/1     Running   1          5d8h',
      'payment-processor-5a4b3c2d1-v7w8x     1/1     Running   0          2d6h',
      'notification-service-2b3c4d5e6-f9g0h  1/1     Running   2          1w2d',
      'metrics-collector-8d7e6f5g4-h3i2j     1/1     Running   0          4d15h',
    ],
    delay: 1000,
  },
  {
    command: 'git log --oneline -5',
    output: [
      'f3a9b2c feat: implement automated deployment pipeline',
      'e8d7c6b fix: resolve Docker container memory leak',
      'b5a4c3d refactor: optimize CI/CD workflow',
      'c2d1e0f chore: update Kubernetes configs for scaling',
      'a9b8c7d docs: add infrastructure architecture diagrams',
    ],
    delay: 600,
  },
  {
    command: 'terraform plan',
    output: [
      'Terraform will perform the following actions:',
      '',
      '  # aws_instance.web_server will be created',
      '  + resource "aws_instance" "web_server" {',
      '      + ami                          = "ami-0c55b159cbfafe1f0"',
      '      + instance_type                = "t3.medium"',
      '      + key_name                     = "devops-key"',
      '      + tags                         = {',
      '          + "Environment" = "production"',
      '          + "ManagedBy"   = "terraform"',
      '        }',
      '    }',
      '',
      'Plan: 1 to add, 0 to change, 0 to destroy.',
    ],
    delay: 1200,
  },
  {
    command: 'ansible-playbook -i inventory deploy.yml',
    output: [
      'PLAY [Deploy Application Stack] ******************************************',
      '',
      'TASK [Gathering Facts] ***************************************************',
      'ok: [web-server-01]',
      'ok: [web-server-02]',
      'ok: [web-server-03]',
      '',
      'TASK [Pull latest Docker images] *****************************************',
      'changed: [web-server-01]',
      'changed: [web-server-02]',
      'changed: [web-server-03]',
      '',
      'TASK [Restart services] **************************************************',
      'changed: [web-server-01]',
      'changed: [web-server-02]',
      'changed: [web-server-03]',
      '',
      'PLAY RECAP **************************************************************',
      'web-server-01              : ok=3    changed=2    unreachable=0    failed=0',
      'web-server-02              : ok=3    changed=2    unreachable=0    failed=0',
      'web-server-03              : ok=3    changed=2    unreachable=0    failed=0',
    ],
    delay: 1500,
  },
  {
    command: 'systemctl status nginx',
    output: [
      '● nginx.service - A high performance web server and a reverse proxy server',
      '     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)',
      '     Active: active (running) since Mon 2026-02-08 14:23:15 UTC; 3 days ago',
      '       Docs: man:nginx(8)',
      '   Main PID: 1234 (nginx)',
      '      Tasks: 9 (limit: 4915)',
      '     Memory: 24.5M',
      '        CPU: 1h 23min 45.123s',
      '     CGroup: /system.slice/nginx.service',
      '             ├─1234 nginx: master process /usr/sbin/nginx -g daemon on;',
      '             ├─1235 nginx: worker process',
      '             ├─1236 nginx: worker process',
      '             └─1237 nginx: worker process',
    ],
    delay: 900,
  },
];

export function Terminal() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([
    '🚀 Welcome to Rohit Darekar\'s DevOps Terminal',
    '💻 Type "help" to see available commands or watch the demo...',
    '',
  ]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<number | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused || currentCommandIndex >= devOpsCommands.length) return;

    const currentCmd = devOpsCommands[currentCommandIndex];
    let charIndex = 0;

    // Type the command
    setIsTyping(true);
    setShowOutput(false);

    const typeInterval = setInterval(() => {
      if (charIndex <= currentCmd.command.length) {
        setCurrentTyping(currentCmd.command.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        
        // Show output after delay
        setTimeout(() => {
          setShowOutput(true);
          setDisplayedLines(prev => [
            ...prev,
            `$ ${currentCmd.command}`,
            ...currentCmd.output,
            '',
          ]);
          setCurrentTyping('');
          
          // Move to next command
          setTimeout(() => {
            setCurrentCommandIndex(prev => prev + 1);
          }, 2000);
        }, currentCmd.delay);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentCommandIndex, isPaused]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, currentTyping]);

  const handleCopy = (command: string, index: number) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(index);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const handleRestart = () => {
    setCurrentCommandIndex(0);
    setDisplayedLines([
      '🚀 Welcome to Rohit Darekar\'s DevOps Terminal',
      '💻 Type "help" to see available commands or watch the demo...',
      '',
    ]);
    setCurrentTyping('');
    setIsTyping(false);
    setShowOutput(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Terminal Header */}
      <div className="bg-slate-800 dark:bg-slate-900 rounded-t-xl p-4 border border-slate-700 dark:border-slate-800 border-b-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <TerminalIcon className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 text-sm font-medium">rohit@devops:~</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            onClick={handleRestart}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
            title="Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="bg-slate-900 dark:bg-black rounded-b-xl p-4 sm:p-6 border border-slate-700 dark:border-slate-800 min-h-[400px] max-h-[500px] overflow-y-auto font-mono text-sm"
      >
        {/* Displayed Lines */}
        {displayedLines.map((line, index) => (
          <div
            key={index}
            className={`mb-1 ${
              line.startsWith('$') 
                ? 'text-green-400' 
                : line.startsWith('✓') || line.includes('ok:') || line.includes('Running')
                ? 'text-green-400'
                : line.startsWith('●')
                ? 'text-cyan-400'
                : line.startsWith('PLAY') || line.startsWith('TASK')
                ? 'text-yellow-400'
                : line.includes('changed:')
                ? 'text-yellow-400'
                : line.includes('failed:') || line.includes('error')
                ? 'text-red-400'
                : line.startsWith('Plan:')
                ? 'text-cyan-400 font-bold'
                : line.startsWith('#')
                ? 'text-yellow-400'
                : line.startsWith('+')
                ? 'text-green-400'
                : 'text-slate-300'
            }`}
          >
            {line.startsWith('$') && (
              <button
                onClick={() => handleCopy(line.slice(2), index)}
                className="inline-flex items-center gap-1 mr-2 opacity-0 hover:opacity-100 transition-opacity"
                title="Copy command"
              >
                {copiedCommand === index ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-500" />
                )}
              </button>
            )}
            {line}
          </div>
        ))}

        {/* Currently Typing Command */}
        {isTyping && currentTyping && (
          <div className="text-green-400">
            <span className="text-slate-500">$</span> {currentTyping}
            <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
          </div>
        )}

        {/* Cursor when waiting */}
        {!isTyping && !showOutput && currentCommandIndex < devOpsCommands.length && (
          <div className="text-slate-500">
            $<span className="inline-block w-2 h-4 bg-slate-500 ml-2 animate-pulse" />
          </div>
        )}

        {/* Demo Complete Message */}
        {currentCommandIndex >= devOpsCommands.length && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="text-green-400 mb-2">
              ✓ Demo completed successfully!
            </div>
            <div className="text-slate-400">
              All {devOpsCommands.length} commands executed. Click restart to run again.
            </div>
            <div className="mt-2 text-slate-500">
              $<span className="inline-block w-2 h-4 bg-slate-500 ml-2 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Command Counter */}
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <div>
          Command {Math.min(currentCommandIndex + 1, devOpsCommands.length)} of {devOpsCommands.length}
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Docker
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Kubernetes
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            Git
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            Terraform
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            Ansible
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-cyan-500" />
            Linux
          </span>
        </div>
      </div>
    </div>
  );
}
