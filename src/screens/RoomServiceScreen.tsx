import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { ArrowLeft, MessageCircle, AlertTriangle, Info } from 'lucide-react';

const RoomServiceScreen: React.FC = () => {
  const navigate = useNavigate();
  const { guestName, roomNumber } = useGuest();

  const handleWhatsAppRequest = () => {
    const message = `*SOLICITAÇÃO DE ARRUMAÇÃO - MORDOMO DIGITAL*\n\n` +
      `👤 *Hóspede:* ${guestName}\n` +
      `🚪 *Quarto:* ${roomNumber}\n\n` +
      `*Confirmação:* Declaro que o quarto está vazio, a chave foi entregue na recepção e a placa de maçaneta foi colocada.\n\n` +
      `_Por favor, solicito a arrumação da minha suíte._`;

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
          <h1 className="text-lg font-bold tracking-widest uppercase text-gold">Serviço de Quarto</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Arrumação e Limpeza</p>
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
            Protocolo de Arrumação
          </h2>
          
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              Para que nossa equipe de governança possa realizar a limpeza e organização da sua suíte, siga os passos abaixo:
            </p>
            
            <div className="flex items-start gap-3 bg-red-950/20 border border-red-900/30 p-4 rounded-xl">
              <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <div className="space-y-2">
                <p className="text-red-200/80 font-medium italic">
                  A camareira só iniciará a arrumação se não houver ninguém dentro da suíte.
                </p>
                <p className="text-red-200/80 font-bold uppercase text-[10px] tracking-widest border-t border-red-900/30 pt-2">
                  IMPORTANTE: Se o seu checkout for hoje, a arrumação não será realizada.
                </p>
              </div>
            </div>

            <ul className="space-y-4 pt-2">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" />
                <span>Entregue a chave na **recepção** ao sair.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" />
                <span>O quarto deve estar totalmente **desocupado**.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" />
                <span>Coloque a **Placa de Maçaneta** na porta indicando que deseja a arrumação.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,1)]" />
                <span>Solicite o serviço através do botão dourado abaixo.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gold/5 border border-gold/10 rounded-2xl p-4 text-center italic text-[10px] text-gray-400">
          O serviço de quarto está disponível das 08h às 16h diariamente.
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-6 bg-obsidian/80 backdrop-blur-md border-t border-gold/30">
        <button
          onClick={handleWhatsAppRequest}
          className="w-full bg-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all shadow-laser"
        >
          <MessageCircle size={20} fill="black" />
          Solicitar Arrumação
        </button>
      </div>
    </div>
  );
};

export default RoomServiceScreen;
