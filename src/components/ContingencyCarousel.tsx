import React, { useRef, useState, useEffect } from 'react';
import { useGuest } from '../context/GuestContext';
import { UtensilsCrossed } from 'lucide-react';

const contingencyDishes = [
  {
    id: 1,
    name: 'Strogonoff Clássico',
    description: '(Frango ou Carne), Arroz Branco e Batata Palha.',
    image: 'https://images.unsplash.com/photo-1574484284008-59d73054522d?q=80&w=1935&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Lagarto ao Madeira',
    description: 'Lagarto fatiado, Molho Madeira, Arroz e Purê.',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Frango às Ervas',
    description: 'Filé Grelhado, Molho de Laranja/Ervas e Legumes.',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Peixe Nobre',
    description: 'Tilápia Grelhada, Arroz com Brócolis e Purê.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Sobrecoxa Dourada',
    description: 'Sobrecoxa Assada com Batatas Coradas e Arroz.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1888&auto=format&fit=crop'
  }
];

const ContingencyCarousel: React.FC = () => {
  const { guestName, roomNumber } = useGuest();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = 300; // Largura aproximada do card + gap
      const index = Math.round(scrollPosition / cardWidth);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleOrder = (dishName: string) => {
    const message = `Olá! Gostaria de solicitar a opção *${dishName}* para o quarto *${roomNumber}*.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/556132639131?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="w-full animate-fade-in-up mt-8 mb-12">
      <h2 className="px-6 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-80 flex items-center gap-2 text-gold">
        <UtensilsCrossed size={14} />
        Menu Executivo (Contingência)
      </h2>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-6 pb-8"
        style={{
          paddingRight: '20vw' // Espaço para ver o próximo card parcialmente
        }}
      >
        {contingencyDishes.map((dish, index) => {
          const isActive = index === activeIndex;
          
          return (
            <div
              key={dish.id}
              className={`
                snap-center shrink-0 w-[280px]
                rounded-2xl border border-gold/30 bg-obsidian overflow-hidden
                flex flex-col relative group transition-all duration-500
                ${isActive ? 'scale-100 opacity-100 shadow-laser' : 'scale-[0.95] opacity-70'}
              `}
            >
              {/* Badge */}
              <div className="absolute top-3 right-3 z-20 bg-gold text-black text-[8px] font-black px-2 py-1 rounded shadow-lg tracking-widest">
                OPÇÃO DO DIA
              </div>

              {/* Image Area */}
              <div className="h-40 w-full relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${dish.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-90" />
              </div>

              {/* Content Area */}
              <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white leading-tight font-serif tracking-tight">
                    {dish.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-wide font-medium">
                    {dish.description}
                  </p>
                </div>

                <button
                  onClick={() => handleOrder(dish.name)}
                  className="mt-6 w-full py-3 bg-gold/10 border border-gold/30 rounded-lg text-gold text-[9px] font-black uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <UtensilsCrossed size={12} />
                  Solicitar Este Prato
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContingencyCarousel;
