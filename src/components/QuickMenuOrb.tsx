import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Upload, Sparkles, Send, X } from 'lucide-react';

interface QuickMenuOrbProps {
  onAction?: (action: string) => void;
}

const menuItems = [
  { id: 'send', icon: Send, label: 'Send' },
  { id: 'upload', icon: Upload, label: 'Upload' },
  { id: 'ai', icon: Sparkles, label: 'AI Tools' },
];

export const QuickMenuOrb = ({ onAction }: QuickMenuOrbProps) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (actionId: string) => {
    onAction?.(actionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Drag constraints container */}
      <div 
        ref={constraintsRef} 
        className="fixed inset-0 pointer-events-none z-40"
      />
      
      {/* Orb */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={true}
        whileTap={{ scale: 0.95 }}
        initial={{ bottom: 96, right: 24, position: 'fixed' }}
        className="fixed bottom-24 right-6 z-50 pointer-events-auto"
      >
        <div className="relative">
          {/* Radial Menu */}
          <AnimatePresence>
            {isOpen && (
              <>
                {menuItems.map((item, index) => {
                  const angle = -90 - (index * 45);
                  const radian = (angle * Math.PI) / 180;
                  const x = Math.cos(radian) * 70;
                  const y = Math.sin(radian) * 70;

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                      animate={{ scale: 1, opacity: 1, x, y }}
                      exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25,
                        delay: index * 0.05 
                      }}
                      onClick={() => handleAction(item.id)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover-bright"
                      whileTap={{ scale: 0.9 }}
                    >
                      <item.icon className="w-4 h-4 text-foreground" />
                    </motion.button>
                  );
                })}
              </>
            )}
          </AnimatePresence>

          {/* Main Orb Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="qm-orb"
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {isOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Plus className="w-5 h-5 text-foreground" />
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};
