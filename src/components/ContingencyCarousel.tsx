import React, { useState, useEffect } from 'react';
import { useGuest } from '../context/GuestContext';
import { Wine, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const contingencyDishes = [
  {
    id: 1,
    name: 'Strogonoff Clássico',
    description: 'Frango grelhado em emulsão cremosa de tomates frescos e mostarda. Servido com arroz branco e batata palha',
    image: '/strogonoff.webp'
  },
  {
    id: 2,
    name: 'Bife acebolado',
    description: 'Carne bovina selada em alta temperatura com generosa camada de cebolas douradas. Servido com arroz branco, macarrão e salada',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop&fm=jpg'
  },
  {
    id: 3,
    name: 'Filé de Frango',
    description: 'Peito de frango marinado e grelhado na chapa. Servido com arroz soltinho e batata frita',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=2070&auto=format&fit=crop&fm=jpg'
  },
  {
    id: 4,
    name: 'Frango à parmegiana',
    description: 'Peito de frango gratinado com muçarela e molho de tomates frescos. Acompanha arroz soltinho, batatas fritas e salada',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop&fm=jpg'
  },
  {
    id: 5,
    name: 'Misto Quente Tradicional',
    description: 'Pão de forma tostado, queijo muçarela e presunto.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1888&auto=format&fit=crop&fm=jpg'
  },
  {
    id: 6,
    name: 'Omelete',
    description: 'Ovos selecionados batidos e preparados na manteiga, com textura leve e interior cremoso.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2070&auto=format&fit=crop&fm=jpg'
  }
];

const drinks = [
  { id: 1, name: 'Coca-Cola (Lata)', price: 'R$ 8,00' },
  { id: 2, name: 'Coca-Cola Zero (Lata)', price: 'R$ 8,00' },
  { id: 3, name: 'Guaraná Antarctica (Lata)', price: 'R$ 8,00' },
  { id: 4, name: 'Guaraná Zero (Lata)', price: 'R$ 8,00' },
  { id: 5, name: 'Água sem Gás', price: 'R$ 5,00' },
  { id: 6, name: 'Água com Gás', price: 'R$ 6,00' },
  { id: 7, name: 'Suco de Laranja', price: 'R$ 12,00' },
  { id: 8, name: 'Cerveja Long Neck', price: 'R$ 14,00' },
  { id: 0, name: 'Sem Bebida', price: '-' },
];

const ContingencyCarousel: React.FC<{ adminMode?: boolean }> = ({ adminMode }) => {
  const { guestName, roomNumber } = useGuest();
  const [hiddenDishes, setHiddenDishes] = useState<number[]>(() => {
    const saved = localStorage.getItem('md_hidden_dishes');
    return saved ? JSON.parse(saved) : [];
  });
  
  // State for multi-step flow
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const selectedDishDescription = selectedDish
    ? contingencyDishes.find(d => d.name === selectedDish)?.description || null
    : null;

  const toggleDishVisibility = (dishId: number) => {
    setHiddenDishes(prev => {
      const newHidden = prev.includes(dishId)
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId];
      
      localStorage.setItem('md_hidden_dishes', JSON.stringify(newHidden));
      return newHidden;
    });
  };

  const resetToMenu = () => {
    setStep(1);
    setSelectedDish(null);
  };

  useEffect(() => {
    const onFocus = () => resetToMenu();
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetToMenu();
      }
    };

    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const handleDishSelect = (dishName: string) => {
    setSelectedDish(dishName);
    setStep(2);
  };

  const handleBackToMenu = () => {
    resetToMenu();
  };

  const handleFinalOrder = (drinkName: string) => {
    const drinkText = drinkName === 'Sem Bebida' ? 'sem bebida' : `com *${drinkName}*`;
    const dishName = selectedDish;
    
    const message = `*PEDIDO RESTAURANTE - MORDOMO DIGITAL*\n\n` +
      `👤 *Hóspede:* ${guestName}\n` +
      `🚪 *Quarto:* ${roomNumber}\n\n` +
      `🍽️ *Prato:* ${dishName}\n` +
      `🥤 *Bebida:* ${drinkText}\n\n` +
      `_Por favor, confiram o pedido._`;

    const encodedMessage = encodeURIComponent(message);
    resetToMenu();
    window.open(`https://wa.me/556132639131?text=${encodedMessage}`, '_blank');
  };

  const displayDishes = contingencyDishes;

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

            <div className="px-6 pb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
              {displayDishes.map((dish) => {
                const isHidden = adminMode ? hiddenDishes.includes(dish.id) : false;
                
                return (
                  <div
                    key={dish.id}
                    onClick={() => {
                      if (!adminMode) {
                        handleDishSelect(dish.name);
                      }
                    }}
                    className={`
                      w-full max-w-[320px] aspect-[4/5]
                      rounded-3xl border border-gold/20 bg-black/40 backdrop-blur-xl
                      transition-all duration-500 ease-out flex flex-col justify-end p-6 relative overflow-hidden group
                      shadow-laser
                      ${isHidden ? 'opacity-40 grayscale border-red-500/50' : ''}
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

                    <img
                      src={dish.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      draggable={false}
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

                      <div className="w-full mt-4">
                        {!adminMode ? (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDishSelect(dish.name);
                            }}
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
                onClick={handleBackToMenu}
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
                {selectedDishDescription && (
                  <p className="text-[10px] text-gray-300 mt-1">
                    {selectedDishDescription}
                  </p>
                )}
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
