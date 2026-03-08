import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { ArrowLeft, Info, CheckSquare } from 'lucide-react';

const IronScreen: React.FC = () => {
  const navigate = useNavigate();
  const { guestName, roomNumber } = useGuest();

  const handleWhatsAppRequest = () => {
    const message = `*SOLICITAÇÃO DE FERRO DE PASSAR - MORDOMO DIGITAL*\n\n` +
      `👤 *Hóspede:* ${guestName}\n` +
      `🚪 *Quarto:* ${roomNumber}\n\n` +
      `_Por favor, solicito o empréstimo de um ferro de passar._`;

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
          <h1 className="text-lg font-bold tracking-widest uppercase text-gold">Ferro de Passar</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Empréstimo na Recepção</p>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="relative group overflow-hidden rounded-2xl border border-gold/20 bg-black/40 p-6 shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Info size={80} className="text-gold" />
          </div>
          
          <h2 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
            <Info size={20} />
            Termos de Empréstimo
          </h2>
          
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              O ferro de passar é um item de empréstimo e deve ser manuseado com cuidado. Siga as condições abaixo:
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" />
                <span>A solicitação deve ser feita pelo titular da reserva.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" />
                <span>O item será entregue em sua suíte pela nossa equipe.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" />
                <span>A devolução deve ser feita na recepção no momento do checkout.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gold/5 border border-gold/10 rounded-2xl p-4 text-center italic text-[10px] text-gray-400">
          Este serviço não possui custo adicional.
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-6 bg-obsidian/80 backdrop-blur-md border-t border-gold/30">
        <button
          onClick={handleWhatsAppRequest}
          className="w-full bg-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all shadow-laser"
        >
          <CheckSquare size={20} />
          Solicitar Empréstimo
        </button>
      </div>
    </div>
  );
};

export default IronScreen;
