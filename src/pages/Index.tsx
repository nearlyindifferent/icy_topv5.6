import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataGrid } from '@/components/DataGrid';
import { Navigation } from '@/components/Navigation';
import { Vault } from '@/components/Vault';
import { AgentTerminal } from '@/components/AgentTerminal';
import { CommunityOrb } from '@/components/CommunityOrb';
import { SettingsSheet } from '@/components/SettingsSheet';

const Index = () => {
  const [activeTab, setActiveTab] = useState('vault');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === 'settings') {
      setIsSettingsOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Living Data Background */}
      <DataGrid />
      
      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {activeTab === 'vault' && <Vault />}
          {activeTab === 'agent' && <AgentTerminal />}
          {activeTab === 'profile' && (
            <div className="min-h-screen pb-32 md:pl-24 px-4 md:px-8 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-mono font-bold uppercase tracking-tight mb-2">
                  PROFILE_V3
                </h1>
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-terminal">
                  IDENTITY MODULE // COMING SOON
                </p>
              </div>
            </div>
          )}
        </motion.main>
      </AnimatePresence>
      
      {/* Community Orb */}
      <CommunityOrb />
      
      {/* Settings Sheet */}
      <SettingsSheet 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

export default Index;
