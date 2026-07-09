import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { ArrowLeft, Info, Printer } from 'lucide-react';

const PrintingScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { guestName, roomNumber } = useGuest();
  const isXerox = location.pathname === '/xerox';
  const title = isXerox ? 'Xerox' : 'Impressão';

  const handleWhatsAppRequest = () => {
    const message = `*SOLICITAÇÃO DE ${isXerox ? 'XEROX' : 'IMPRESSÃO'} - MORDOMO DIGITAL*\n\n` +
      `👤 *Hóspede:* ${guestName}\n` +
      `🚪 *Quarto:* ${roomNumber}\n\n` +
      `Estou ciente que cada ${isXerox ? 'cópia' : 'folha'} custa *R$ 1,00*.\n\n` +
      `_Por favor, solicito ${isXerox ? 'xerox' : 'impressão'} na recepção._`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/556132639131?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="h-full w-full flex flex-col text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/impressao.png')" }}
      />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10" />

      <div className="relative z-20 flex flex-col h-full">
        <div className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-gold/30 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 text-gold hover:bg-gold/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h1 className="lux-title text-2xl text-gold leading-none">{title}</h1>
            <p className="text-[10px] text-gray-300 uppercase tracking-[0.2em] mt-1">Atendimento na recepção</p>
          </div>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide reveal">
          <div className="relative group overflow-hidden rounded-2xl border border-gold/20 bg-black/40 p-6 shadow-2xl backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Printer size={80} className="text-gold" />
            </div>

            <h2 className="lux-title text-2xl text-gold mb-4 flex items-center gap-2">
              <Info size={20} />
              Simples e imediato
            </h2>

            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <p>
                Precisou de {isXerox ? 'uma cópia' : 'um documento impresso'}? A recepção resolve na hora, por apenas <span className="text-white font-bold">R$ 1,00</span> por {isXerox ? 'cópia' : 'folha'}.
              </p>
              <p>
                Toque no botão abaixo, envie o documento pelo WhatsApp e retire na recepção.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-black/30 backdrop-blur-md border-t border-gold/30">
          <button
            onClick={handleWhatsAppRequest}
            className="w-full bg-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all shadow-laser"
          >
            <Printer size={20} />
            Solicitar {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintingScreen;
