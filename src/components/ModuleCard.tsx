import React from 'react';

interface ModuleItem {
  id: string;
  title: string;
  image?: string;
  action?: string;
}

interface ModuleCardProps {
  item: ModuleItem;
  isSelected: boolean;
  onClick: () => void;
  hasSibling?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ item, isSelected, onClick, hasSibling = false }) => {
  return (
    <div
      onClick={onClick}
      className={`
        snap-center shrink-0 rounded-2xl border border-gold/20 bg-black/40 backdrop-blur-xl
        transition-all duration-500 ease-out flex flex-col justify-end p-4 relative overflow-hidden group cursor-pointer
        ${isSelected 
          ? 'scale-100 opacity-100 blur-0 shadow-laser ring-2 ring-gold' 
          : hasSibling 
            ? 'scale-[0.85] opacity-40 blur-[2px]' 
            : 'scale-95 opacity-70 hover:opacity-90 hover:scale-100'
        }
        w-[250px] aspect-[4/5]
      `}
    >
      {item.image && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${item.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        </>
      )}

      <div className="relative z-10 space-y-3 w-full">
        <h3 className="font-bold text-xl leading-tight text-white drop-shadow-lg text-center">
          {item.title}
        </h3>
        
        <div className={`w-full transition-all duration-500 ${isSelected ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <button className="w-full text-[10px] text-white/90 uppercase tracking-widest border border-gold/50 rounded-xl px-4 py-3 font-bold hover:bg-gold hover:text-black hover:border-gold transition-all shadow-lg backdrop-blur-sm bg-black/30">
            {item.action || 'ACESSAR'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;