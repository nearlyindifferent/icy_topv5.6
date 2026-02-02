import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { AgentTerminal } from '@/components/AgentTerminal';
import { Hive } from '@/components/Hive';
import { Nexus } from '@/components/Nexus';
import { Profile } from '@/components/Profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('agent');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {activeTab === 'agent' && <AgentTerminal />}
          {activeTab === 'hive' && <Hive />}
          {activeTab === 'nexus' && <Nexus />}
          {activeTab === 'profile' && <Profile />}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default Index;
