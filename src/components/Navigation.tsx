import { motion } from 'framer-motion';
import { FolderOpen, Bot, Settings, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'vault', icon: FolderOpen, label: 'Vault' },
  { id: 'agent', icon: Bot, label: 'Agent' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <>
      {/* Mobile: Bottom Dock */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-2 rounded-full bg-card/90 backdrop-blur-xl border border-border">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative p-3 rounded-full"
              whileTap={{ scale: 0.96 }}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-pill-mobile"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon 
                className={`relative z-10 w-5 h-5 transition-colors ${
                  activeTab === item.id ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              />
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Desktop: Left Vertical Pill */}
      <nav className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col items-center gap-2 p-2 rounded-full bg-card/90 backdrop-blur-xl border border-border">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative p-3 rounded-full"
              whileTap={{ scale: 0.96 }}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-pill-desktop"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon 
                className={`relative z-10 w-5 h-5 transition-colors ${
                  activeTab === item.id ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              />
            </motion.button>
          ))}
        </div>
      </nav>
    </>
  );
};
