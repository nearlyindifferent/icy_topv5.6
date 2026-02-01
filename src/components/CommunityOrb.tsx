import { useRef } from 'react';
import { motion } from 'framer-motion';

export const CommunityOrb = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Constraints container */}
      <div 
        ref={constraintsRef} 
        className="fixed inset-0 pointer-events-none z-40"
      />
      
      {/* Draggable Orb */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={true}
        whileTap={{ scale: 0.95 }}
        initial={{ 
          bottom: 96, 
          right: 24,
          position: 'fixed',
        }}
        className="fixed bottom-24 right-6 md:top-24 md:right-6 md:bottom-auto z-50 cursor-grab active:cursor-grabbing pointer-events-auto"
      >
        <div className="relative w-16 h-16">
          {/* SVG Progress Ring */}
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 64 64"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            <circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 30 * 0.65} ${2 * Math.PI * 30 * 0.35}`}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Orb */}
          <div className="absolute inset-2 rounded-full orb-gradient shadow-lg" />
          
          {/* Inner glow */}
          <div className="absolute inset-3 rounded-full bg-primary/20 backdrop-blur-sm" />
        </div>
      </motion.div>
    </>
  );
};
