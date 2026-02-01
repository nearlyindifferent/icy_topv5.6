import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Folder, Code, MoreVertical, Star, Palette, Pencil, X } from 'lucide-react';

interface VaultFile {
  id: string;
  name: string;
  type: 'pdf' | 'zip' | 'md' | 'code' | 'txt';
  size: string;
  starred?: boolean;
  color?: string;
}

interface VaultCardProps {
  file: VaultFile;
  onUpdate?: (file: VaultFile) => void;
}

const fileIcons = {
  pdf: FileText,
  zip: Folder,
  md: FileText,
  code: Code,
  txt: FileText,
};

// Color options applied via Tailwind classes below

export const VaultCard = ({ file, onUpdate }: VaultCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);
  
  const Icon = fileIcons[file.type] || FileText;

  const handleRename = () => {
    if (onUpdate && newName.trim()) {
      onUpdate({ ...file, name: newName });
    }
    setIsRenaming(false);
    setIsMenuOpen(false);
  };

  const handleStar = () => {
    if (onUpdate) {
      onUpdate({ ...file, starred: !file.starred });
    }
    setIsMenuOpen(false);
  };

  const handleColorChange = (color: string) => {
    if (onUpdate) {
      onUpdate({ ...file, color });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.div
      className="relative surface-card-hover rounded-lg p-4 cursor-pointer"
      style={{ borderColor: file.color || undefined }}
      whileTap={{ scale: 0.96 }}
      layout
    >
      {/* Star indicator */}
      {file.starred && (
        <Star className="absolute top-3 right-10 w-4 h-4 text-yellow-400 fill-yellow-400" />
      )}
      
      {/* Menu button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className="absolute top-3 right-3 p-1 rounded hover:bg-muted transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Icon */}
      <div className="mb-12">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>

      {/* File info */}
      <div className="space-y-1">
        {isRenaming ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            className="w-full bg-transparent border-b border-primary text-sm font-mono uppercase tracking-terminal focus:outline-none"
            autoFocus
          />
        ) : (
          <h3 className="text-sm font-mono uppercase tracking-terminal text-foreground truncate">
            {file.name}
          </h3>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono uppercase tracking-terminal text-muted-foreground">
            {file.type}
          </span>
          <span className="text-xs font-mono tracking-terminal text-muted-foreground">
            {file.size}
          </span>
        </div>
      </div>

      {/* Pop-out menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="absolute top-12 right-2 z-20 bg-card/95 backdrop-blur-xl border border-border rounded-lg p-3 min-w-[160px] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsRenaming(true)}
              className="flex items-center gap-2 w-full p-2 rounded hover:bg-muted transition-colors text-sm"
            >
              <Pencil className="w-4 h-4" />
              Rename
            </button>
            
            <button
              onClick={handleStar}
              className="flex items-center gap-2 w-full p-2 rounded hover:bg-muted transition-colors text-sm"
            >
              <Star className={`w-4 h-4 ${file.starred ? 'text-yellow-400 fill-yellow-400' : ''}`} />
              {file.starred ? 'Unstar' : 'Star'}
            </button>
            
            <div className="flex items-center gap-2 p-2">
              <Palette className="w-4 h-4" />
              <div className="flex gap-1">
                <button
                  onClick={() => handleColorChange('#EF4444')}
                  className="w-4 h-4 rounded-full border border-border hover:scale-110 transition-transform bg-red-500"
                />
                <button
                  onClick={() => handleColorChange('#22C55E')}
                  className="w-4 h-4 rounded-full border border-border hover:scale-110 transition-transform bg-green-500"
                />
                <button
                  onClick={() => handleColorChange('#3B82F6')}
                  className="w-4 h-4 rounded-full border border-border hover:scale-110 transition-transform bg-blue-500"
                />
                <button
                  onClick={() => handleColorChange('#FACC15')}
                  className="w-4 h-4 rounded-full border border-border hover:scale-110 transition-transform bg-yellow-400"
                />
              </div>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 w-full p-2 rounded hover:bg-muted transition-colors text-sm text-muted-foreground"
            >
              <X className="w-4 h-4" />
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
