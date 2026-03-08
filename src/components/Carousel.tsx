import React, { useRef, useEffect, useState } from 'react';

interface CarouselProps {
  title: React.ReactNode;
  items: { id: string; title: string; image?: string; action?: string }[];
  onItemClick?: (item: { id: string; title: string; image?: string; action?: string }) => void;
}

const Carousel: React.FC<CarouselProps> = ({ title, items, onItemClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Pegar a largura real do card renderizado
    const firstCard = container.querySelector('.snap-center');
     if (!firstCard) return;
     
     // Calcular o centro do container
    const containerWidth = container.clientWidth;
    const centerPoint = container.scrollLeft + (containerWidth / 2);
    
    // Encontrar qual item está mais próximo do centro
    const children = Array.from(container.children);
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = (child as HTMLElement).offsetLeft + (child as HTMLElement).clientWidth / 2;
      const distance = Math.abs(centerPoint - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    if (closestIndex !== focusedIndex) {
      setFocusedIndex(closestIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [items, focusedIndex]);

  return (
    <div className="-mt-2 /* ADJUSTED TO MOVE UP */ space-y-4">
      <h2 className="px-6 text-xl font-bold text-white tracking-tighter">{title}</h2>
      
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4"
        style={{ 
          paddingLeft: 'calc(40vw - 100px)', /* ADJUST HORIZONTAL POSITION HERE */
          paddingRight: 'calc(40vw - 100px)' /* ADJUST HORIZONTAL POSITION HERE */
        }} 
      >
        {items.map((item, index) => {
          const isFocused = index === focusedIndex;
          
          return (
            <div
              key={item.id}
              className={`
                snap-center shrink-0 w-[250px] /* ADJUST WIDTH HERE */ aspect-[4/5] /* ADJUST HEIGHT HERE */
                rounded-1x2 /* ADJUST CORNER ANGLES HERE */ border-[1px] border-[rgba(212,175,55,0.3)] bg-[rgba(0,0,0,0.45)] backdrop-blur-[12px]
                transition-all duration-500 ease-out flex flex-col justify-start items-center text-center p-6 relative overflow-hidden
                ${isFocused 
                  ? 'scale-100 opacity-100 blur-0 shadow-laser' 
                  : 'scale-[0.9] opacity-50 blur-[4px] /* ADJUST BLUR HERE */'}
              `}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <h3 className={`font-bold text-2xl leading-tight ${isFocused ? 'text-gold' : 'text-white'}`}>
                  {item.title}
                </h3>
                <div className={`transition-all duration-500 overflow-hidden ${isFocused ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <button 
                    onClick={() => onItemClick && onItemClick(item)}
                    className="text-sm text-white/80 uppercase tracking-widest border border-gold rounded-lg px-6 py-3 font-bold hover:bg-gold hover:text-black transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  >
                    {item.action || 'Explorar'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
