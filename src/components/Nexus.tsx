import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Brain, Zap, Eye, EyeOff, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface APINode {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  connected: boolean;
  features: {
    label: string;
    value: string;
    type: 'status' | 'quota' | 'input';
  }[];
}

const NexusSwitch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
  <motion.div
    className={`relative w-14 h-8 rounded-full cursor-pointer transition-colors duration-200 ${
      checked 
        ? 'bg-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.5)]' 
        : 'bg-muted'
    }`}
    onClick={() => onCheckedChange(!checked)}
    whileTap={{ scale: 0.96 }}
  >
    <motion.div
      className={`absolute top-1 w-6 h-6 rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-muted-foreground'
      }`}
      animate={{ left: checked ? 28 : 4 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  </motion.div>
);

export const Nexus = () => {
  const [nodes, setNodes] = useState<APINode[]>([
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      connected: true,
      features: [
        { label: 'Status', value: 'Connected', type: 'status' },
        { label: 'Daily Post Quota', value: '15/20', type: 'quota' },
        { label: 'Sync Frequency', value: '30min', type: 'status' },
      ],
    },
    {
      id: 'ai-engine',
      name: 'AI Engine',
      icon: Brain,
      connected: true,
      features: [
        { label: 'Model', value: 'GPT-4o', type: 'status' },
        { label: 'API Key', value: '••••••••••••sk-proj', type: 'input' },
        { label: 'Usage', value: '2,340 tokens today', type: 'quota' },
      ],
    },
    {
      id: 'internal',
      name: 'Internal API',
      icon: Zap,
      connected: false,
      features: [
        { label: 'Status', value: 'Disconnected', type: 'status' },
        { label: 'Endpoint', value: 'Not configured', type: 'input' },
      ],
    },
  ]);

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [aiModel, setAiModel] = useState<'gpt-4o' | 'claude-3.5'>('gpt-4o');

  const toggleConnection = (nodeId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, connected: !node.connected } : node
    ));
  };

  const toggleKeyVisibility = (nodeId: string) => {
    setShowKeys(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  return (
    <div className="min-h-screen pb-32 md:pl-24 px-4 md:px-8">
      {/* Header */}
      <header className="pt-8 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-5 h-5 text-primary" />
          <h1 className="text-sm font-mono uppercase tracking-terminal text-primary">
            NEXUS // API CONTROL
          </h1>
        </div>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-terminal">
          INTEGRATION STATUS :: LIVE
        </p>
      </header>

      {/* API Nodes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`surface-card rounded-xl p-5 transition-all duration-300 ${
              node.connected 
                ? 'border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.1)]' 
                : 'border-border'
            }`}
          >
            {/* Node Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  node.connected ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <node.icon className={`w-5 h-5 ${
                    node.connected ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <h3 className="font-mono font-semibold text-sm uppercase tracking-tight">
                    {node.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {node.connected ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-mono text-primary uppercase">Online</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">Offline</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <NexusSwitch 
                checked={node.connected} 
                onCheckedChange={() => toggleConnection(node.id)} 
              />
            </div>

            {/* Node Features */}
            <div className="space-y-3">
              {node.features.map((feature, fIndex) => (
                <div key={fIndex} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    {feature.label}
                  </span>
                  
                  {feature.type === 'input' ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-foreground">
                        {showKeys[node.id] ? 'sk-proj-abc123...' : feature.value}
                      </span>
                      <button
                        onClick={() => toggleKeyVisibility(node.id)}
                        className="p-1 rounded hover:bg-muted transition-colors"
                      >
                        {showKeys[node.id] ? (
                          <EyeOff className="w-3 h-3 text-muted-foreground" />
                        ) : (
                          <Eye className="w-3 h-3 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  ) : feature.type === 'quota' ? (
                    <span className={`text-xs font-mono ${
                      node.connected ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {feature.value}
                    </span>
                  ) : (
                    <span className={`text-xs font-mono ${
                      feature.value === 'Connected' ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {feature.value}
                    </span>
                  )}
                </div>
              ))}

              {/* AI Model Toggle (only for AI Engine) */}
              {node.id === 'ai-engine' && (
                <div className="pt-3 border-t border-border/50">
                  <span className="text-xs font-mono text-muted-foreground uppercase block mb-2">
                    Active Model
                  </span>
                  <div className="flex gap-2">
                    {(['gpt-4o', 'claude-3.5'] as const).map((model) => (
                      <motion.button
                        key={model}
                        onClick={() => setAiModel(model)}
                        className={`flex-1 py-2 px-3 rounded-lg font-mono text-xs uppercase transition-all ${
                          aiModel === model 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                        whileTap={{ scale: 0.96 }}
                      >
                        {model}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sync Button */}
            {node.connected && (
              <motion.button
                className="w-full mt-4 py-2 rounded-lg bg-muted/50 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="w-3 h-3" />
                SYNC NOW
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 surface-card rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-terminal">
              System Status: All Nodes Operational
            </span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            Last sync: 2 min ago
          </span>
        </div>
      </motion.div>
    </div>
  );
};
