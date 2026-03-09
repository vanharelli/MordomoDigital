import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useGuest } from '../context/GuestContext';

interface Product {
  id: string;
  name: string;
  price: number;
  category: 'drinks' | 'snacks';
}

const products: Product[] = [
  // Bebidas Geladas
  { id: '1', name: 'Coca-Cola (Lata)', price: 6.00, category: 'drinks' },
  { id: '2', name: 'Coca-Cola Zero (Lata)', price: 6.00, category: 'drinks' },
  { id: '3', name: 'Guaraná Antártica (Lata)', price: 5.00, category: 'drinks' },
  { id: '4', name: 'Água Mineral (Sem Gás)', price: 4.00, category: 'drinks' },
  { id: '5', name: 'Água Mineral (Com Gás)', price: 5.00, category: 'drinks' },
  // Snacks e Doces
  { id: '6', name: 'Chocolate KitKat', price: 5.00, category: 'snacks' },
  { id: '7', name: 'Chocolate Snickers', price: 5.00, category: 'snacks' },
  { id: '8', name: 'Salgadinho Doritos', price: 8.00, category: 'snacks' },
  { id: '9', name: 'Salgadinho Ruffles', price: 8.00, category: 'snacks' },
];

const ProductTableScreen: React.FC = () => {
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

  const total = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === id);
    return sum + (product?.price || 0) * qty;
  }, 0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleConfirmOrder = () => {
    if (total === 0) return;

    const selectedProducts = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = products.find(p => p.id === id);
        return product ? `• ${qty}x ${product.name} - ${formatCurrency(product.price * qty)}` : '';
      })
      .join('\n');

    const message = `*NOVO PEDIDO - MORDOMO DIGITAL*\n\n` +
      `👤 *Hóspede:* ${guestName}\n` +
      `🚪 *Quarto:* ${roomNumber}\n\n` +
      `*Itens do Pedido:*\n${selectedProducts}\n\n` +
      `💰 *Total:* ${formatCurrency(total)}\n\n` +
      `_Por favor, confirme o recebimento._`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5561982062229?text=${encodedMessage}`, '_blank');
  };

  const renderProductRow = (product: Product) => (
    <div key={product.id} className="flex items-center justify-between p-4 border-b border-gold/20 bg-white/5 rounded-lg mb-3">
      <div className="flex-1">
        <h3 className="font-bold text-white text-lg">{product.name}</h3>
        <p className="text-gold font-bold mt-1">{formatCurrency(product.price)}</p>
      </div>
      
      <div className="flex items-center gap-4 bg-black/40 rounded-lg p-2 border border-gold/30">
        <button 
          onClick={() => updateQuantity(product.id, -1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-black transition-colors disabled:opacity-50"
          disabled={!quantities[product.id]}
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center font-bold text-white">{quantities[product.id] || 0}</span>
        <button 
          onClick={() => updateQuantity(product.id, 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-black transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="text-white flex flex-col h-full w-full overflow-hidden relative">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/background2.webp')" }}
      />
      
      {/* Glassmorphism Overlay Layer */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-10" />

      {/* Content Wrapper */}
      <div className="relative z-20 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto scrollbar-hide w-full">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-gold p-6 flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 border border-gold rounded-lg text-gold hover:bg-gold hover:text-black transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-1xl font-bold tracking-widest text-gold uppercase">Tabela de Produtos</h1>
          </div>

          <div className="p-6 space-y-8 max-w-3xl mx-auto pb-48">
            {/* Drinks Section */}
        <section>
          <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
              Bebidas
          </h3>
          <div className="space-y-2">
            {products.filter(p => p.category === 'drinks').map(renderProductRow)}
          </div>
        </section>

        {/* Snacks Section */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
            PETISCOS e Doces
          </h2>
          <div className="space-y-2">
            {products.filter(p => p.category === 'snacks').map(renderProductRow)}
          </div>
        </section>
      </div>
    </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md border-t border-gold p-6 shadow-laser z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 uppercase tracking-widest">Total do Pedido</span>
            <span className="text-2xl font-bold text-gold">{formatCurrency(total)}</span>
          </div>
          <button 
  className="flex-1 max-w-xs bg-gold text-black font-bold py-4 rounded-xl flex items-center justify-center uppercase tracking-widest hover:bg-white transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
  disabled={total === 0}
  onClick={handleConfirmOrder}
>
  Confirmar Pedido
</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductTableScreen;
