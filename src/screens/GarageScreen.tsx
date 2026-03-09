import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { ArrowLeft, Car, Info } from 'lucide-react';

const GarageScreen: React.FC = () => {
  const navigate = useNavigate();
  const { guestName, roomNumber } = useGuest();

  const handleWhatsAppRequest = () => {
    const message = `*SOLICITAÇÃO DE VEÍCULO - MORDOMO DIGITAL*\n\n` +
      `👤 *Hóspede:* ${guestName}\n` +
      `🚪 *Quarto:* ${roomNumber}\n\n` +
      `_Por favor, solicito que preparem meu veículo para saída._`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/556132639131?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="h-full w-full flex flex-col text-white relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/GARAGEM.webp')" }}
      />
      
      {/* Glassmorphism Overlay Layer */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10" />

      {/* Content Wrapper */}
      <div className="relative z-20 flex flex-col h-full">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-gold/30 px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 text-gold hover:bg-gold/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold tracking-widest uppercase text-gold">Garagem</h1>
            <p className="text-[10px] text-gray-300 uppercase tracking-tighter">Solicitação de Veículo</p>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          <div className="relative group overflow-hidden rounded-2xl border border-gold/20 bg-black/40 p-6 shadow-2xl backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Car size={80} className="text-gold" />
            </div>
            
            <h2 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
              <Info size={20} />
              Como funciona?
            </h2>
            
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <p>
                Para sua comodidade, você pode solicitar seu veículo com antecedência. Nossa equipe o deixará pronto na entrada do hotel.
              </p>

              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" />
                  <span>Clique no botão abaixo para notificar a recepção.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" />
                  <span>Aguarde alguns instantes enquanto preparamos seu carro.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" />
                  <span>Dirija-se à entrada principal para retirar seu veículo.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center italic text-[10px] text-gray-400 backdrop-blur-sm">
            Recomendamos solicitar com 5 a 10 minutos de antecedência.
          </div>
        </div>

        {/* Footer Button */}
        <div className="p-6 bg-black/30 backdrop-blur-md border-t border-gold/30">
          <button
            onClick={handleWhatsAppRequest}
            className="w-full bg-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all shadow-laser"
          >
            <Car size={20} />
            Solicitar Veículo
          </button>
        </div>
      </div>
    </div>
  );
};

export default GarageScreen;
