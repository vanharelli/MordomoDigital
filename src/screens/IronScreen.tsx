import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { ArrowLeft, CheckSquare, Plus, Minus, Shirt, WashingMachine, Sparkles } from 'lucide-react';

const IronScreen: React.FC = () => {
  const navigate = useNavigate();
  const { guestName, roomNumber } = useGuest();

  // State for service type
  const [serviceType, setServiceType] = useState<'passar' | 'lavar' | 'lavar_passar'>('passar');
  const [showConfirm, setShowConfirm] = useState(false);

  // State for clothes quantities
  const [items, setItems] = useState([
    { id: 1, name: 'Calcinha / Panties', price: 7, count: 0 },
    { id: 2, name: 'Lenço / Scarf', price: 7, count: 0 },
    { id: 3, name: 'Meias / Socks', price: 7, count: 0 },
    { id: 4, name: 'Sutiã / Bra', price: 7, count: 0 },
    { id: 5, name: 'Gravata / Tie', price: 15, count: 0 },
    { id: 6, name: 'Camisola / Nightgown', price: 17, count: 0 },
    { id: 7, name: 'Bermuda / Shorts', price: 18, count: 0 },
    { id: 8, name: 'Pijama / Pijama', price: 18, count: 0 },
    { id: 9, name: 'Blusa / Blouse', price: 20, count: 0 },
    { id: 10, name: 'Calça / Pants', price: 20, count: 0 },
    { id: 11, name: 'Camisa / Delicate Shirt', price: 20, count: 0 },
    { id: 12, name: 'Colete / Waistcoat', price: 20, count: 0 },
    { id: 13, name: 'Jaqueta / Jacket', price: 20, count: 0 },
    { id: 14, name: 'Cueca / Man Underwear', price: 25, count: 0 },
    { id: 15, name: 'Suéter / Sweater', price: 25, count: 0 },
    { id: 16, name: 'Macacão / Overall', price: 30, count: 0 },
    { id: 17, name: 'Saia / Skirt', price: 30, count: 0 },
    { id: 18, name: 'Casaco / Coat', price: 40, count: 0 },
    { id: 19, name: 'Conjunto / Tailleur', price: 40, count: 0 },
    { id: 20, name: 'Paletó / Sweat Suit', price: 40, count: 0 },
    { id: 21, name: 'Terno Fino / Delicate Suit', price: 45, count: 0 },
    { id: 22, name: 'Vestido / Dress', price: 45, count: 0 },
    { id: 23, name: 'Outros / Others', price: 0, count: 0 },
  ]);

  const updateCount = (id: number, delta: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
    ));
  };

  const selectedItems = items.filter(item => item.count > 0);
  const total = selectedItems.reduce((sum, item) => sum + (item.price * item.count), 0);
  const totalItems = selectedItems.reduce((sum, item) => sum + item.count, 0);

  const handleWhatsAppRequest = () => {
    if (selectedItems.length === 0) {
      alert('Por favor, selecione pelo menos uma peça de roupa.');
      return;
    }

    const serviceLabels = {
      passar: 'PASSAR',
      lavar: 'LAVAR',
      lavar_passar: 'LAVAR E PASSAR'
    };

    const itemsList = selectedItems.map(item => {
      const subtotal = item.price > 0 ? `R$ ${(item.price * item.count).toFixed(2).replace('.', ',')}` : 'Sob consulta';
      return `• ${item.name}: ${item.count}x @ R$ ${item.price > 0 ? item.price.toFixed(2).replace('.', ',') : '-'} = ${subtotal}`;
    }).join('\n');

    const message = `*SOLICITAÇÃO DE LAVANDERIA - MORDOMO DIGITAL*\n\n` +
      `👤 *Hóspede:* ${guestName}\n` +
      `🚪 *Quarto:* ${roomNumber}\n\n` +
      `🛠️ *Serviço:* ${serviceLabels[serviceType]}\n\n` +
      `📋 *Detalhes do Pedido:*\n${itemsList}\n\n` +
      `📦 *Total de Peças:* ${totalItems}\n` +
      `💰 *VALOR TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}\n\n` +
      `_Por favor, solicito a retirada das peças acima._`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/556132639131?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="h-full w-full flex flex-col text-white relative overflow-hidden bg-obsidian">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-40" 
        style={{ backgroundImage: "url('/FERRO DE PASSAR.webp')" }}
      />
      
      {/* Glassmorphism Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-sm z-10" />

      {/* Content Wrapper */}
      <div className="relative z-20 flex flex-col h-full">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-gold/30 px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 text-gold hover:bg-gold/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold tracking-widest uppercase text-gold">Lavar e Passar</h1>
            <p className="text-[10px] text-gray-300 uppercase tracking-tighter">Serviço de Lavanderia</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          
          {/* Service Type Toggles */}
          <div className="grid grid-cols-3 gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setServiceType('passar')}
              className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all gap-1 ${serviceType === 'passar' ? 'bg-gold text-black font-bold shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Sparkles size={18} />
              <span className="text-[10px] uppercase tracking-tighter">Passar</span>
            </button>
            <button
              onClick={() => setServiceType('lavar')}
              className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all gap-1 ${serviceType === 'lavar' ? 'bg-gold text-black font-bold shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <WashingMachine size={18} />
              <span className="text-[10px] uppercase tracking-tighter">Lavar</span>
            </button>
            <button
              onClick={() => setServiceType('lavar_passar')}
              className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all gap-1 ${serviceType === 'lavar_passar' ? 'bg-gold text-black font-bold shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <div className="flex gap-1">
                <WashingMachine size={14} />
                <Sparkles size={14} />
              </div>
              <span className="text-[10px] uppercase tracking-tighter leading-none text-center">Lavar e Passar</span>
            </button>
          </div>

          {/* Clothes List */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-gold uppercase tracking-[0.2em] px-2 flex items-center gap-2">
              <Shirt size={14} />
              Selecione as Peças
            </h2>
            
            <div className="grid grid-cols-1 gap-2">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between backdrop-blur-sm transition-all hover:border-gold/30"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-wide text-gray-200">{item.name}</span>
                    <span className="text-xs text-gold/70">{item.price > 0 ? `R$ ${item.price.toFixed(2).replace('.', ',')}` : 'Sob consulta'}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-black/40 rounded-xl border border-white/5 p-1">
                    <button 
                      onClick={() => updateCount(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 rounded-lg transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="w-6 text-center font-bold text-white text-base">{item.count}</span>
                    
                    <button 
                      onClick={() => updateCount(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* Footer Button */}
        <div className="p-6 bg-black/40 backdrop-blur-xl border-t border-gold/30 space-y-3">
          {totalItems > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center">
              <span className="text-xs text-gray-400">{totalItems} peça{totalItems !== 1 ? 's' : ''}: </span>
              <span className="text-sm font-bold text-gold">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          )}
          {showConfirm ? (
            <div className="bg-white/5 border border-gold/30 rounded-xl p-4 space-y-3">
              <p className="text-xs text-gray-300 text-center">
                Ao clicar no botão abaixo, você será redirecionado ao WhatsApp com uma mensagem pré-programada. Basta enviar sem alterar nada.
              </p>
              <button
                onClick={handleWhatsAppRequest}
                className="w-full bg-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest hover:bg-green-600 transition-all"
              >
                <CheckSquare size={18} />
                Confirmar e Enviar
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-2 text-gray-400 text-xs uppercase tracking-wider hover:text-white transition-colors"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full bg-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all shadow-laser active:scale-95"
            >
              <CheckSquare size={20} />
              Solicitar Retirada
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IronScreen;
