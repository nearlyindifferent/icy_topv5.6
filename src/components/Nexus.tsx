import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Brain, Zap, Eye, EyeOff } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  connected: boolean;
  status?: string;
  meta?: string;
}

const AppleToggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`toggle-track ${checked ? 'toggle-track-on' : 'toggle-track-off'}`}
  >
    <motion.div
      className="toggle-thumb"
      animate={{ x: checked ? 20 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </button>
);

export const Nexus = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      connected: true,
      status: 'Connected',
      meta: 'Sync: 15m',
    },
    {
      id: 'openai',
      name: 'OpenAI',
      icon: Brain,
      connected: true,
      status: 'Active',
      meta: '$4.20',
    },
    {
      id: 'internal',
      name: 'Internal API',
      icon: Zap,
      connected: false,
      status: 'Not configured',
    },
  ]);

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [apiKey] = useState('sk-proj-abc123xyz789');

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(i => i.id === id ? { ...i, connected: !i.connected } : i)
    );
  };

  return (
    <div className="min-h-screen pb-32 md:pl-24 px-4 md:px-8">
      {/* Header */}
      <header className="pt-8 pb-6">
        <h1 className="text-xl font-medium tracking-tight">Integrations</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your connected services</p>
      </header>

      {/* Integration List */}
      <div className="max-w-lg">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between py-4 border-b border-border last:border-0"
          >
            {/* Left: Icon & Info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
                <integration.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {integration.name}
                  </span>
                  {integration.connected && (
                    <span className="status-dot-success" />
                  )}
                </div>
                
                {/* Meta info */}
                <div className="flex items-center gap-2 mt-0.5">
                  {integration.id === 'openai' ? (
                    <>
                      <span className="text-xs text-muted-foreground font-mono">
                        {showKeys[integration.id] ? apiKey : '••••••••••••'}
                      </span>
                      <button
                        onClick={() => setShowKeys(prev => ({ ...prev, [integration.id]: !prev[integration.id] }))}
                        className="p-0.5 hover-bright"
                      >
                        {showKeys[integration.id] ? (
                          <EyeOff className="w-3 h-3 text-muted-foreground" />
                        ) : (
                          <Eye className="w-3 h-3 text-muted-foreground" />
                        )}
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {integration.status}
                    </span>
                  )}
                  
                  {integration.meta && (
                    <>
                      <span className="text-muted-foreground/30">·</span>
                      <span className="text-xs text-muted-foreground">
                        {integration.meta}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Toggle */}
            <AppleToggle
              checked={integration.connected}
              onChange={() => toggleIntegration(integration.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Add Integration Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 w-full max-w-lg py-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover-bright"
        whileTap={{ scale: 0.98 }}
      >
        + Add Integration
      </motion.button>
    </div>
  );
};
