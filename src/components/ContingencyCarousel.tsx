import React, { useRef, useState, useEffect } from 'react';
import { useGuest } from '../context/GuestContext';
import { Wine, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const drinks = [
  { id: 1, name: 'Coca-Cola (Lata)', price: 'R$ 8,00' },
  { id: 2, name: 'Coca-Cola Zero (Lata)', price: 'R$ 8,00' },
  { id: 3, name: 'Guaraná Antarctica (Lata)', price: 'R$ 8,00' },
  { id: 4, name: 'Guaraná Zero (Lata)', price: 'R$ 8,00' },
  { id: 5, name: 'Água sem Gás', price: 'R$ 6,00' },
  { id: 6, name: 'Água com Gás', price: 'R$ 6,00' },
  { id: 7, name: 'Suco de Laranja', price: 'R$ 12,00' },
  { id: 8, name: 'Cerveja Long Neck', price: 'R$ 14,00' },
  { id: 0, name: 'Sem Bebida', price: '-' },
];

const ContingencyCarousel: React.FC<{ adminMode?: boolean }> = ({ adminMode }) => {
  const { guestName, roomNumber } = useGuest();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hiddenDishes, setHiddenDishes] = useState<number[]>(() => {
    const saved = localStorage.getItem('md_hidden_dishes');
    return saved ? JSON.parse(saved) : [];
  });
  
  // State for multi-step flow
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);

  const toggleDishVisibility = (dishId: number) => {
    setHiddenDishes(prev => {
      const newHidden = prev.includes(dishId)
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId];
      
      localStorage.setItem('md_hidden_dishes', JSON.stringify(newHidden));
      return newHidden;
    });
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = 266; // w-[250px] + gap-4
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
  }, [step]); // Re-attach listener if step changes (though component might re-mount)

  const handleDishSelect = (dishName: string) => {
    setSelectedDish(dishName);
    setStep(2);
  };

  const handleFinalOrder = (drinkName: string) => {
    const drinkText = drinkName === 'Sem Bebida' ? 'sem bebida' : `com *${drinkName}*`;
    
    const message = `*PEDIDO RESTAURANTE - MORDOMO DIGITAL*\n\n` +
      `👤 *Hóspede:* ${guestName}\n` +
      `🚪 *Quarto:* ${roomNumber}\n\n` +
      `🍽️ *Prato:* ${selectedDish}\n` +
      `🥤 *Bebida:* ${drinkText}\n\n` +
      `_Por favor, confiram o pedido._`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/556132639131?text=${encodedMessage}`, '_blank');
    
    // Reset flow after a short delay
    setTimeout(() => {
      setStep(1);
      setSelectedDish(null);
    }, 1000);
  };

  // Filter dishes for display (unless in admin mode, show all with opacity)
  const displayDishes = adminMode 
    ? contingencyDishes 
    : contingencyDishes.filter(d => !hiddenDishes.includes(d.id));

  return (
    <div className="w-full animate-fade-in-up mt-8 mb-12">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <h2 className="px-6 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-80 flex items-center gap-2 text-gold">
              <div className="w-1 h-1 bg-gold rounded-full" />
              Menu Executivo (Contingência)
            </h2>

            <div 
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 py-10"
              style={{
                paddingLeft: 'calc(-100px + 40vw)',
                paddingRight: 'calc(-100px + 40vw)'
              }}
            >
              {displayDishes.map((dish, index) => {
                const isActive = index === activeIndex;
                const isHidden = hiddenDishes.includes(dish.id);
                
                return (
                  <div
                    key={dish.id}
                    className={`
                      snap-center shrink-0 w-[250px] aspect-[4/5]
                      rounded-3xl border border-gold/20 bg-black/40 backdrop-blur-xl
                      transition-all duration-500 ease-out flex flex-col justify-end p-6 relative overflow-hidden group
                      ${isActive ? 'scale-100 opacity-100 blur-0 shadow-laser' : 'scale-[0.9] opacity-50 blur-[4px]'}
                      ${isHidden && adminMode ? 'opacity-40 grayscale border-red-500/50' : ''}
                    `}
                  >
                    {/* Admin Toggle Button */}
                    {adminMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDishVisibility(dish.id);
                        }}
                        className={`absolute top-4 left-4 z-50 p-2 rounded-full backdrop-blur-md transition-colors ${
                          isHidden ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                        }`}
                      >
                        {isHidden ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    )}

                    {/* Image Background */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${dish.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-20 bg-gold text-black text-[8px] font-black px-2 py-1 rounded shadow-lg tracking-widest">
                      OPÇÃO DO DIA
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-2 w-full flex flex-col items-center justify-end h-full">
                      <h3 className="font-bold text-xl leading-tight text-white drop-shadow-lg text-center">
                        {dish.name}
                      </h3>
                      
                      <p className={`text-[10px] text-gray-300 text-center line-clamp-3 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        {dish.description}
                      </p>

                      <div className={`w-full transition-all duration-500 ${isActive ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                        {!adminMode ? (
                          <button 
                            onClick={() => handleDishSelect(dish.name)}
                            className="w-full text-[10px] text-white/90 uppercase tracking-widest border border-gold/50 rounded-xl px-4 py-3 font-bold hover:bg-gold hover:text-black hover:border-gold transition-all shadow-lg backdrop-blur-sm bg-black/30"
                          >
                            SELECIONAR
                          </button>
                        ) : (
                          <div className="w-full text-center text-[10px] uppercase font-bold text-gold bg-black/50 py-2 rounded-lg">
                            {isHidden ? 'OCULTO' : 'VISÍVEL'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full px-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={() => setStep(1)}
                className="p-2 -ml-2 text-gold hover:bg-white/5 rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-80 flex items-center gap-2 text-gold">
                <Wine size={14} />
                Escolha a Bebida
              </h2>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10 bg-white/5">
                <p className="text-xs text-gray-400">Prato selecionado:</p>
                <p className="text-sm font-bold text-white">{selectedDish}</p>
              </div>
              
              <div className="max-h-[50vh] overflow-y-auto scrollbar-hide">
                {drinks.map((drink) => (
                  <button
                    key={drink.id}
                    onClick={() => handleFinalOrder(drink.name)}
                    className="w-full p-4 flex items-center justify-between border-b border-white/5 hover:bg-gold/10 transition-colors group text-left"
                  >
                    <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                      {drink.name}
                    </span>
                    <span className="text-xs font-mono text-gold opacity-70 group-hover:opacity-100">
                      {drink.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContingencyCarousel;
