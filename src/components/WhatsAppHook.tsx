import React from 'react';
import { UserPlus } from 'lucide-react';

const WhatsAppHook: React.FC = () => {
  const saveContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:Alfa Plaza Hotel 🏨\nTEL;TYPE=CELL:(61)3263-9131\nEMAIL:reservas@alfaplazahotel.com.br\nURL:www.alfaplazahotel.com.br\nEND:VCARD"; 
    const blob = new Blob([vcard], { type: "text/vcard" }); 
    const url = window.URL.createObjectURL(blob); 
    const newLink = document.createElement('a'); 
    newLink.href = url; 
    newLink.setAttribute('download', 'AlfaPlaza.vcf'); 
    document.body.appendChild(newLink);
    newLink.click(); 
    document.body.removeChild(newLink);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-bounce-subtle">
      <button
        onClick={saveContact}
        className="group relative flex items-center gap-4 bg-obsidian border border-gold p-4 rounded-2xl shadow-laser hover:scale-105 transition-all duration-300 max-w-[320px] text-left"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gold/5 rounded-2xl blur-xl group-hover:bg-gold/10 transition-all" />
        
        {/* Icon Container */}
        <div className="relative flex-shrink-0 w-12 h-12 bg-black rounded-full border border-gold/30 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <UserPlus size={24} className="text-gold group-hover:scale-110 transition-transform" />
        </div>

        {/* Text Content */}
        <div className="relative flex flex-col">
          <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-black mb-1">
            Benefícios Exclusivos
          </span>
          <p className="text-[11px] text-white/90 leading-tight font-medium mb-1">
            Adicione nosso hotel à sua agenda para liberar seu acesso VIP.
          </p>
          <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold/10 px-2 py-1 rounded border border-gold/20 inline-block w-fit">
            ADICIONAR HOTEL À AGENDA (LIBERAR VIP)
          </span>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppHook;
