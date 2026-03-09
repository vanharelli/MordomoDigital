import React, { useRef, useEffect, useState } from 'react';

  interface CarouselProps {
    title: React.ReactNode;
    items: { id: string; title: string; image?: string; action?: string }[];
    onItemClick?: (item: { id: string; title: string; image?: string; action?: string }) => void;
  }
  
  const Carousel: React.FC<CarouselProps> = ({ title, items, onItemClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollLeft;
        const cardWidth = 266; // w-[250px] + gap-4
        const index = Math.round(scrollPosition / cardWidth);
        setActiveIndex(index);
      }
    };
  
    useEffect(() => {
      const scrollContainer = containerRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
      }
    }, []);
  
    return (
      <div className="w-full animate-fade-in-up">
        <h2 className="px-6 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-80 flex items-center gap-2">
          <div className="w-1 h-1 bg-gold rounded-full" />
          {title}
        </h2>
        
        <div 
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 py-10"
          style={{
            paddingLeft: 'calc(-100px + 40vw)',
            paddingRight: 'calc(-100px + 40vw)'
          }}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            
            return (
              <div
                key={item.id}
                onClick={() => onItemClick && onItemClick(item)}
                className={`
                  snap-center shrink-0 w-[250px] aspect-[4/5]
                  rounded-3xl border border-gold/20 bg-black/40 backdrop-blur-xl
                  transition-all duration-500 ease-out flex flex-col justify-end p-6 relative overflow-hidden group
                  ${isActive ? 'scale-100 opacity-100 blur-0 shadow-laser' : 'scale-[0.9] opacity-50 blur-[4px]'}
                `}
              >
                {/* Background Image Layer */}
                {item.image && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                  </>
                )}
  
                {/* Ambient Glow (Only if no image, or subtle if image exists) */}
                {!item.image && (
                  <div className={`absolute inset-0 bg-gold/5 transition-opacity pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                )}
                
                <div className="relative z-10 space-y-4 w-full flex justify-center">
                  <h3 className="font-bold text-2xl leading-tight text-white drop-shadow-lg text-center">
                    {item.title}
                  </h3>
                </div>
  
                <div className={`relative z-10 w-full transition-all duration-500 ${isActive ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                  <button className="w-full text-[10px] text-white/90 uppercase tracking-widest border border-gold/50 rounded-xl px-4 py-3 font-bold hover:bg-gold hover:text-black hover:border-gold transition-all shadow-lg backdrop-blur-sm bg-black/30">
                    {item.action || 'ACESSAR'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

export default Carousel;
