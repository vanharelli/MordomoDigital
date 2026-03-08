import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';

interface WhatsAppHookProps {
  variant?: 'floating' | 'inline';
  onAction?: () => void;
}

const WhatsAppHook: React.FC<WhatsAppHookProps> = ({ variant = 'floating', onAction }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleVipAccess = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (onAction) onAction();

    // Micro-loading para feedback visual antes de disparar a ação do sistema
    setTimeout(() => {
      const vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:Alfa Plaza Hotel 🏨\nTEL;TYPE=CELL;VOICE:+556132639131\nEMAIL:reservas@alfaplazahotel.com.br\nURL:www.alfaplazahotel.com.br\nEND:VCARD"; 
      const blob = new Blob([vcard], { type: "text/x-vcard" }); 
      const url = URL.createObjectURL(blob); 
      
      // Criar link invisível para disparo mais robusto (evita ERR_ABORTED em alguns navegadores)
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'AlfaPlaza.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsLoading(false);
      
      // Limpeza segura após um tempo maior para garantir que o sistema processou o arquivo
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }, 800);
  };

  const containerClasses = variant === 'floating' 
    ? "fixed bottom-6 right-6 z-[100] animate-bounce-subtle" 
    : "w-full mt-4 animate-fade-in";

  return (
    <div className={containerClasses}>
      <button
        onClick={handleVipAccess}
        disabled={isLoading}
        className={`group relative flex items-center gap-4 bg-obsidian border border-gold p-4 rounded-2xl shadow-laser hover:scale-105 transition-all duration-300 ${variant === 'floating' ? 'max-w-[320px]' : 'w-full'} text-left disabled:opacity-80`}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gold/5 rounded-2xl blur-xl group-hover:bg-gold/10 transition-all" />
        
        {/* Icon Container */}
        <div className="relative flex-shrink-0 w-12 h-12 bg-black rounded-full border border-gold/30 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          {isLoading ? (
            <Loader2 size={24} className="text-gold animate-spin" />
          ) : (
            <UserPlus size={24} className="text-gold group-hover:scale-110 transition-transform" />
          )}
        </div>

        {/* Text Content */}
        <div className="relative flex flex-col">
          <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-black mb-1">
            Benefícios Exclusivos
          </span>
          <p className="text-[11px] text-white/90 leading-tight font-medium mb-1">
            {isLoading ? 'Sincronizando com agenda...' : 'Adicione nosso hotel à sua agenda para liberar seu acesso VIP.'}
          </p>
          <span className={`text-[10px] font-bold text-gold uppercase tracking-widest bg-gold/10 px-2 py-1 rounded border border-gold/20 inline-block w-fit transition-all ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            {isLoading ? 'ABRINDO AGENDA...' : 'ADICIONAR HOTEL À AGENDA (LIBERAR VIP)'}
          </span>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppHook;
