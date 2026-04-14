import React, { useRef, useEffect, useState } from 'react';

interface ModuleItem {
  id: string;
  title: string;
  image?: string;
  action?: string;
}

interface ModuleGridProps {
  title: React.ReactNode;
  items: ModuleItem[];
  onItemClick?: (item: ModuleItem) => void;
  selectedModuleId?: string | null;
  layout?: 'horizontal' | 'vertical';
}

const ModuleCard: React.FC<{
  item: ModuleItem;
  isSelected: boolean;
  onClick: () => void;
  size: 'small' | 'large';
}> = ({ item, isSelected, onClick, size }) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl border border-gold/20 bg-black/40 backdrop-blur-xl
        transition-all duration-500 ease-out flex flex-col justify-end p-4 relative overflow-hidden group cursor-pointer
        ${isSelected ? 'scale-100 opacity-100 blur-0 shadow-laser ring-2 ring-gold' : 'scale-[0.98] opacity-80 hover:opacity-100'}
        ${size === 'large' ? 'w-[250px] aspect-[4/5]' : 'w-[250px] aspect-[4/5]'}
      `}
    >
      {item.image && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${item.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        </>
      )}

      <div className="relative z-10 space-y-2 w-full flex justify-center">
        <h3 className="font-bold text-xl leading-tight text-white drop-shadow-lg text-center">
          {item.title}
        </h3>
      </div>

      <div className={`relative z-10 w-full transition-all duration-500 ${isSelected ? 'max-h-16 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
        <button className="w-full text-[10px] text-white/90 uppercase tracking-widest border border-gold/50 rounded-xl px-4 py-2 font-bold hover:bg-gold hover:text-black hover:border-gold transition-all shadow-lg backdrop-blur-sm bg-black/30">
          {item.action || 'ACESSAR'}
        </button>
      </div>
    </div>
  );
};

const ModuleGrid: React.FC<ModuleGridProps> = ({ title, items, onItemClick, selectedModuleId, layout = 'horizontal' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (selectedModuleId) {
      const moduleIndex = items.findIndex(item => item.id === selectedModuleId);
      if (moduleIndex !== -1) {
        setActiveIndex(moduleIndex);
      }
    }
  }, [selectedModuleId, items]);

  const handleScroll = () => {
    if (containerRef.current && layout === 'horizontal') {
      const scrollPosition = containerRef.current.scrollLeft;
      const cardWidth = 266;
      const index = Math.round(scrollPosition / cardWidth);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (scrollContainer && layout === 'horizontal') {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [layout]);

  return (
    <div className="w-full animate-fade-in-up">
      <h2 className="px-6 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-80 flex items-center gap-2">
        <div className="w-1 h-1 bg-gold rounded-full" />
        {title}
      </h2>
      
      <div 
        ref={containerRef}
        className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 py-4 ${
          layout === 'vertical' ? 'flex-col items-center' : ''
        }`}
        style={layout === 'horizontal' ? {
          paddingLeft: 'calc(-100px + 40vw)',
          paddingRight: 'calc(-100px + 40vw)'
        } : undefined}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex || item.id === selectedModuleId;
          
          return (
            <div
              key={item.id}
              className={layout === 'vertical' ? 'w-full flex justify-center' : 'snap-center shrink-0'}
            >
              <ModuleCard
                item={item}
                isSelected={!!isActive}
                onClick={() => onItemClick && onItemClick(item)}
                size={layout === 'horizontal' ? 'large' : 'large'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleGrid;