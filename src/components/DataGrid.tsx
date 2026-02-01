import { useEffect, useState, useMemo } from 'react';

const CHARS = ['0x4F', '∆', '∑', '0xA1', '◊', '∞', '0x7B', '⌘', '∂', '0xFF', '∇', '⊕'];

interface GridCell {
  char: string;
  opacity: number;
}

export const DataGrid = () => {
  const [grid, setGrid] = useState<GridCell[]>([]);
  
  const cellCount = useMemo(() => {
    // Calculate based on viewport - roughly 40x30 grid
    return 1200;
  }, []);

  useEffect(() => {
    // Initialize grid
    const initialGrid = Array.from({ length: cellCount }, () => ({
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setGrid(initialGrid);

    // Animate: flip 5% of characters every 100ms
    const interval = setInterval(() => {
      setGrid(prev => {
        const newGrid = [...prev];
        const flipCount = Math.floor(cellCount * 0.05);
        
        for (let i = 0; i < flipCount; i++) {
          const idx = Math.floor(Math.random() * cellCount);
          newGrid[idx] = {
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
            opacity: Math.random() * 0.5 + 0.2,
          };
        }
        return newGrid;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [cellCount]);

  return (
    <div 
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none data-grid-mask"
      aria-hidden="true"
    >
      <div 
        className="grid gap-4 p-4 text-xs font-mono text-primary/[0.03]"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
        }}
      >
        {grid.map((cell, idx) => (
          <span
            key={idx}
            className="select-none transition-opacity duration-300"
            style={{ opacity: cell.opacity * 0.03 }}
          >
            {cell.char}
          </span>
        ))}
      </div>
    </div>
  );
};
