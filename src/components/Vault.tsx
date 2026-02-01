import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { VaultCard } from './VaultCard';
import { UploadCard } from './UploadCard';

interface VaultFile {
  id: string;
  name: string;
  type: 'pdf' | 'zip' | 'md' | 'code' | 'txt';
  size: string;
  starred?: boolean;
  color?: string;
}

const initialFiles: VaultFile[] = [
  { id: '1', name: 'SPEC_SHEET_V3.pdf', type: 'pdf', size: '2.4 MB' },
  { id: '2', name: 'ASSETS_3D.zip', type: 'zip', size: '156 MB' },
  { id: '3', name: 'MANIFESTO.md', type: 'md', size: '12 KB' },
  { id: '4', name: 'KERNEL.tsx', type: 'code', size: '4 KB' },
  { id: '5', name: 'LOGS_001.txt', type: 'txt', size: '1 KB' },
];

export const Vault = () => {
  const [files, setFiles] = useState<VaultFile[]>(initialFiles);
  const constraintsRef = useRef(null);

  const handleFileUpdate = (updatedFile: VaultFile) => {
    setFiles(prev => prev.map(f => f.id === updatedFile.id ? updatedFile : f));
  };

  const handleUpload = () => {
    // Mock upload - add a new file
    const newFile: VaultFile = {
      id: Date.now().toString(),
      name: `NEW_FILE_${files.length + 1}.txt`,
      type: 'txt',
      size: '0 KB',
    };
    setFiles(prev => [...prev, newFile]);
  };

  return (
    <div className="min-h-screen pb-32 md:pl-24 px-4 md:px-8" ref={constraintsRef}>
      {/* Header */}
      <header className="pt-8 pb-6">
        <h1 className="text-3xl md:text-4xl font-mono font-bold uppercase tracking-tight">
          Vault
        </h1>
        <div className="w-12 h-1 bg-primary mt-2" />
      </header>

      {/* Rubber Band Scrollable Grid */}
      <motion.div
        drag="y"
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <UploadCard onClick={handleUpload} />
        
        {files.map((file) => (
          <VaultCard
            key={file.id}
            file={file}
            onUpdate={handleFileUpdate}
          />
        ))}
      </motion.div>
    </div>
  );
};
