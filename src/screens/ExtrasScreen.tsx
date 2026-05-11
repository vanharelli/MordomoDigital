import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';

const extrasList = [
  { id: 'extra-1', name: 'Toalhas' },
  { id: 'extra-2', name: 'Papel Higiênico' },
  { id: 'extra-3', name: 'Cobertor' },
  { id: 'extra-4', name: 'Travesseiros' },
  { id: 'extra-5', name: 'Talheres' },
];

const ExtrasScreen: React.FC = () => {
  const navigate = useNavigate();
  const { guestName, roomNumber } = useGuest();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const rest = { ...prev };
        delete rest[id];
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);

  const handleConfirmOrder = () => {
    if (totalItems === 0) return;

    const selectedExtras = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const extra = extrasList.find(e => e.id === id);
        return extra ? `• ${qty}x ${extra.name}` : '';
      })
      .join('\n');

    const message = `*SOLICITAÇÃO DE EXTRAS - MORDOMO DIGITAL*\n\n` +
      `👤 *Hóspede:* ${guestName}\n` +
      `🚪 *Quarto:* ${roomNumber}\n\n` +
      `*Itens Solicitados:*\n${selectedExtras}\n\n` +
      `_Por favor, confirme a entrega._`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/556132639131?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="h-full w-full flex flex-col text-white relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/background2.webp')" }}
      />
      
      {/* Glassmorphism Overlay Layer */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10" />

      {/* Content Wrapper */}
      <div className="relative z-20 flex flex-col h-full">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-gold px-6 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 border border-gold rounded-lg text-gold hover:bg-gold hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-widest text-gold uppercase">Toalha e Extras</h1>
            <p className="text-[10px] text-gray-300 uppercase tracking-wider">Quarto {roomNumber} • {guestName}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-32 scrollbar-hide">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-6 backdrop-blur-sm">
            <p className="text-xs text-gray-300 text-center italic font-medium">
              Selecione os itens extras que deseja receber em sua suíte.
            </p>
          </div>

          {extrasList.map((extra) => (
            <div 
              key={extra.id}
              className="bg-white/5 border border-gold/20 rounded-xl p-4 flex items-center justify-between shadow-lg backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <div>
                <h3 className="font-bold text-white text-lg tracking-tight">{extra.name}</h3>
                <p className="text-[10px] text-gold uppercase tracking-widest font-semibold mt-1">Disponível</p>
              </div>

              <div className="flex items-center gap-4 bg-black/40 rounded-lg p-2 border border-gold/30">
                <button
                  onClick={() => updateQuantity(extra.id, -1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-black transition-colors disabled:opacity-50"
                  disabled={!quantities[extra.id]}
                >
                  <Minus size={16} />
                </button>
                <span className="w-6 text-center font-bold text-white text-lg">{quantities[extra.id] || 0}</span>
                <button
                  onClick={() => updateQuantity(extra.id, 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-black transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md border-t border-gold p-6 shadow-laser z-50">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleConfirmOrder}
              disabled={totalItems === 0}
              className="w-full bg-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={20} />
              Solicitar Agora ({totalItems})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtrasScreen;
