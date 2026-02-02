import { motion } from 'framer-motion';

interface UsageBar {
  label: string;
  value: number;
  max: number;
  unit: string;
}

const usageData: UsageBar[] = [
  { label: 'API Limit', value: 84, max: 100, unit: '%' },
  { label: 'Storage', value: 1.2, max: 10, unit: 'GB' },
  { label: 'Tokens', value: 847000, max: 1000000, unit: '' },
];

const formatValue = (value: number, unit: string) => {
  if (unit === '%') return `${value}%`;
  if (unit === 'GB') return `${value} GB`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

export const Profile = () => {
  return (
    <div className="min-h-screen pb-32 md:pl-24 px-4 md:px-8">
      {/* Header spacing */}
      <div className="pt-8" />

      {/* Identity Card - Passport Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        {/* Name & Badge */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">Wali</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Lvl 42</p>
          </div>
          <div className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground">
            PRO PLAN
          </div>
        </div>

        {/* Usage Section */}
        <section className="space-y-6">
          <h2 className="text-xs text-muted-foreground uppercase tracking-wide">Usage</h2>
          
          <div className="space-y-5">
            {usageData.map((item, index) => {
              const percentage = (item.value / item.max) * 100;
              
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-sm text-muted-foreground font-mono">
                      {formatValue(item.value, item.unit)}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Account Section */}
        <section className="space-y-4">
          <h2 className="text-xs text-muted-foreground uppercase tracking-wide">Account</h2>
          
          <div className="space-y-3">
            {[
              { label: 'Email', value: 'wali@example.com' },
              { label: 'Member since', value: 'Jan 2024' },
              { label: 'Billing cycle', value: 'Monthly' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Actions */}
        <section className="space-y-3">
          <motion.button
            className="w-full py-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover-bright"
            whileTap={{ scale: 0.98 }}
          >
            Manage Subscription
          </motion.button>
          
          <motion.button
            className="w-full py-3 rounded-xl text-sm text-muted-foreground hover-bright"
            whileTap={{ scale: 0.98 }}
          >
            Sign Out
          </motion.button>
        </section>
      </motion.div>
    </div>
  );
};
