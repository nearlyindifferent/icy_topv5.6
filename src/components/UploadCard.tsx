import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface UploadCardProps {
  onClick?: () => void;
}

export const UploadCard = ({ onClick }: UploadCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="surface-card rounded-lg p-4 border-dashed border-2 border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center min-h-[180px] cursor-pointer"
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-3">
        <Plus className="w-5 h-5 text-muted-foreground" />
      </div>
      <span className="text-xs font-mono uppercase tracking-terminal text-muted-foreground">
        Upload
      </span>
    </motion.button>
  );
};
