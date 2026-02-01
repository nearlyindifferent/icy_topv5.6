import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Activity, Grid3X3, Power, Eye, Smartphone } from 'lucide-react';

interface SettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type VisualEngine = 'data-stream' | 'static-grid' | 'deep-void';

interface EngineOption {
  id: VisualEngine;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const visualEngines: EngineOption[] = [
  { id: 'data-stream', name: 'Data Stream', description: 'Live Hex/Data Feed', icon: Activity },
  { id: 'static-grid', name: 'Static Grid', description: 'Low Power / Minimal', icon: Grid3X3 },
  { id: 'deep-void', name: 'Deep Void', description: 'OLED / Pure Black', icon: Power },
];

export const SettingsSheet = ({ isOpen, onClose }: SettingsSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl rounded-t-3xl border-t border-border max-h-[85vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 rounded-full bg-muted" />
            </div>
            
            <div className="px-6 pb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-mono font-bold uppercase tracking-tight">
                  SETTINGS_V3
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Interface Skin */}
              <section className="mb-8">
                <h3 className="text-xs font-mono uppercase tracking-terminal text-muted-foreground mb-4">
                  Interface Skin
                </h3>
                
                <div className="surface-card rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Moon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono font-medium">Cyber Terminal</p>
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-terminal">
                          LOW_LIGHT_OPS :: NEON
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-7 bg-primary rounded-full relative">
                      <motion.div
                        className="absolute right-1 top-1 w-5 h-5 bg-primary-foreground rounded-full"
                        layoutId="toggle"
                      />
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Visual Engine */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-xs font-mono uppercase tracking-terminal text-muted-foreground">
                    Visual Engine
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {visualEngines.map((engine, index) => (
                    <motion.button
                      key={engine.id}
                      className={`w-full surface-card rounded-xl p-4 text-left transition-all ${
                        index === 0 ? 'border-primary bg-primary/10' : ''
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <engine.icon className={`w-5 h-5 ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                          <div>
                            <p className={`font-mono font-medium ${index === 0 ? 'text-primary' : ''}`}>
                              {engine.name}
                            </p>
                            <p className="text-xs font-mono text-muted-foreground">
                              {engine.description}
                            </p>
                          </div>
                        </div>
                        {index === 0 && (
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </section>
              
              {/* System Info */}
              <section>
                <h3 className="text-xs font-mono uppercase tracking-terminal text-muted-foreground mb-4">
                  System
                </h3>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-xs font-mono">ICY_OPS Mobile Client v3.0.2</span>
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
