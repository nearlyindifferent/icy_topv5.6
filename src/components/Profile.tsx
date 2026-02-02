import { motion } from 'framer-motion';
import { User, Cpu, Zap, HardDrive, Crown, Sparkles } from 'lucide-react';

interface UsageRing {
  label: string;
  value: number;
  max: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

const usageData: UsageRing[] = [
  { label: 'CPU', value: 67, max: 100, color: 'hsl(var(--primary))', icon: Cpu },
  { label: 'API', value: 2340, max: 5000, color: 'hsl(270, 100%, 65%)', icon: Zap },
  { label: 'Storage', value: 4.2, max: 10, color: 'hsl(200, 100%, 60%)', icon: HardDrive },
];

const CircularProgress = ({ value, max, color, size = 100 }: { value: number; max: number; color: string; size?: number }) => {
  const percentage = (value / max) * 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="hsl(var(--muted))"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          strokeDasharray: circumference,
          filter: `drop-shadow(0 0 6px ${color})`,
        }}
      />
    </svg>
  );
};

export const Profile = () => {
  return (
    <div className="min-h-screen pb-32 md:pl-24 px-4 md:px-8">
      {/* Header */}
      <header className="pt-8 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-5 h-5 text-primary" />
          <h1 className="text-sm font-mono uppercase tracking-terminal text-primary">
            PROFILE_V3 // IDENTITY
          </h1>
        </div>
      </header>

      {/* Identity Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-6 mb-8 bg-card border border-border"
      >
        {/* Holographic shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative z-10 flex items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-mono font-bold uppercase tracking-tight">
                OPERATOR_X
              </h2>
              <Crown className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-sm font-mono text-muted-foreground mb-3">
              Level 42 // XP 8,450
            </p>

            {/* XP Bar */}
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: '84.5%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-[10px] font-mono text-muted-foreground mt-1">
              8,450 / 10,000 XP to Level 43
            </p>
          </div>
        </div>

        {/* Plan Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="text-xs font-mono text-amber-500 uppercase">Architect</span>
          </div>
        </div>
      </motion.div>

      {/* Usage Rings */}
      <section className="mb-8">
        <h3 className="text-xs font-mono uppercase tracking-terminal text-muted-foreground mb-4">
          SYSTEM USAGE
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          {usageData.map((ring, index) => (
            <motion.div
              key={ring.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="surface-card rounded-xl p-4 flex flex-col items-center"
            >
              <div className="relative">
                <CircularProgress 
                  value={ring.value} 
                  max={ring.max} 
                  color={ring.color}
                  size={80}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ring.icon className={`w-5 h-5 ${
                    ring.label === 'CPU' ? 'text-primary' :
                    ring.label === 'API' ? 'text-purple-500' : 'text-blue-400'
                  }`} />
                </div>
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-2 uppercase">
                {ring.label}
              </p>
              <p className={`text-sm font-mono font-semibold ${
                ring.label === 'CPU' ? 'text-primary' :
                ring.label === 'API' ? 'text-purple-500' : 'text-blue-400'
              }`}>
                {ring.value < 100 ? `${ring.value}%` : ring.value.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subscription Details */}
      <section>
        <h3 className="text-xs font-mono uppercase tracking-terminal text-muted-foreground mb-4">
          SUBSCRIPTION
        </h3>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="surface-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-mono font-semibold text-lg">Architect Plan</h4>
              <p className="text-sm font-mono text-muted-foreground">Pro features unlocked</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-2xl font-bold text-primary">$49</p>
              <p className="text-xs font-mono text-muted-foreground">/month</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {['Unlimited API calls', '10GB Storage', 'Priority Support', 'Custom Integrations'].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-xs text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <motion.button
            className="w-full mt-4 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm uppercase tracking-terminal"
            whileTap={{ scale: 0.98 }}
          >
            Manage Subscription
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};
