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
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);

  const handleConfirmOrder = () => {
    if (totalItems === 0) return;

    const selectedExtras = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
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
    <div className="h-full w-full bg-obsidian flex flex-col text-white relative">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-gold/30 px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 -ml-2 text-gold hover:bg-gold/10 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-widest uppercase text-gold">Toalha e Extras</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Quarto {roomNumber} • {guestName}</p>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-4">
          <p className="text-xs text-gray-400 text-center italic">
            Selecione os itens extras que deseja receber em sua suíte.
          </p>
        </div>

        {extrasList.map((extra) => (
          <div 
            key={extra.id}
            className="bg-black/60 border border-gold/10 rounded-2xl p-4 flex items-center justify-between shadow-lg"
          >
            <div>
              <h3 className="font-bold text-lg tracking-tight">{extra.name}</h3>
              <p className="text-[10px] text-gold uppercase tracking-widest">Disponível</p>
            </div>

            <div className="flex items-center gap-4 bg-black/80 rounded-xl p-1 border border-white/5">
              <button
                onClick={() => updateQuantity(extra.id, -1)}
                className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 rounded-lg transition-colors"
              >
                <Minus size={18} />
              </button>
              <span className="w-6 text-center font-bold text-lg">{quantities[extra.id] || 0}</span>
              <button
                onClick={() => updateQuantity(extra.id, 1)}
                className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 rounded-lg transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="p-6 bg-obsidian/80 backdrop-blur-md border-t border-gold/30">
        <button
          onClick={handleConfirmOrder}
          disabled={totalItems === 0}
          className="w-full bg-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all shadow-laser disabled:opacity-30 disabled:grayscale"
        >
          <ShoppingCart size={20} />
          Solicitar Agora ({totalItems})
        </button>
      </div>
    </div>
  );
};

export default ExtrasScreen;
