import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataGrid } from '@/components/DataGrid';
import { Navigation } from '@/components/Navigation';
import { AgentTerminal } from '@/components/AgentTerminal';
import { Hive } from '@/components/Hive';
import { Nexus } from '@/components/Nexus';
import { Profile } from '@/components/Profile';
import { CommunityOrb } from '@/components/CommunityOrb';

const Index = () => {
  const [activeTab, setActiveTab] = useState('agent');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Living Data Background */}
      <DataGrid />
      
      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {activeTab === 'agent' && <AgentTerminal />}
          {activeTab === 'hive' && <Hive />}
          {activeTab === 'nexus' && <Nexus />}
          {activeTab === 'profile' && <Profile />}
        </motion.main>
      </AnimatePresence>
      
      {/* Community Orb */}
      <CommunityOrb />
    </div>
  );
};

export default Index;
