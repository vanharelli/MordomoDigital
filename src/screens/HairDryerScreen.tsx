import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { ArrowLeft, Info, CheckSquare } from 'lucide-react';

const HairDryerScreen: React.FC = () => {
  const navigate = useNavigate();
  const { guestName, roomNumber } = useGuest();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleWhatsAppRequest = () => {
    const message = `*SOLICITAÇÃO DE SECADOR DE CABELO - MORDOMO DIGITAL*\n\n` +
      `👤 *Hóspede:* ${guestName}\n` +
      `🚪 *Quarto:* ${roomNumber}\n\n` +
      `_Por favor, solicito o empréstimo de um secador de cabelo._`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/556132639131?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="h-full w-full flex flex-col text-white relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/SECADOR DE CABELO.webp')" }}
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
            <h1 className="text-lg font-bold tracking-widest uppercase text-gold">Secador de Cabelo</h1>
            <p className="text-[10px] text-gray-300 uppercase tracking-tighter">Empréstimo na Recepção</p>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          <div className="relative group overflow-hidden rounded-2xl border border-gold/20 bg-black/40 p-6 shadow-2xl backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Info size={80} className="text-gold" />
            </div>
            
            <h2 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
              <Info size={20} />
              Termos de Empréstimo
            </h2>
            
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <p>
                Siga as condições abaixo:
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
                  <span>Ao sair do quarto, o secador deve ser devolvido à recepção.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center italic text-[10px] text-gray-400 backdrop-blur-sm">
            Este serviço não possui custo adicional.
          </div>
        </div>

        {/* Footer Button */}
        <div className="p-6 bg-black/30 backdrop-blur-md border-t border-gold/30">
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
              className="w-full bg-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all shadow-laser"
            >
              <CheckSquare size={20} />
              Solicitar Empréstimo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HairDryerScreen;
