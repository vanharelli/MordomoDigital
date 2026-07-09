import React from 'react';
import { motion } from 'framer-motion';

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
  onAction?: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ item, isSelected, onClick, onAction }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={`
        snap-center shrink-0 rounded-2xl border bg-black/40 backdrop-blur-xl
        flex flex-col justify-end p-4 relative overflow-hidden group cursor-pointer
        transition-shadow duration-500
        ${isSelected ? 'border-gold shadow-laser' : 'border-gold/20 hover:shadow-laser-soft'}
        w-[70vw] max-w-[250px] md:w-full md:max-w-none aspect-[4/5]
      `}
    >
      {item.image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url('${item.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
          {/* Brilho dourado que atravessa o card no hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(115deg,transparent_35%,rgba(218,165,32,0.12)_50%,transparent_65%)]" />
        </>
      )}

      <div className="relative z-10 space-y-3 w-full">
        <h3 className="lux-title text-2xl leading-tight text-white drop-shadow-lg text-center">
          {item.title}
        </h3>

        <div className={`w-full transition-all duration-500 ${isSelected ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction && onAction();
            }}
            className="w-full text-[10px] text-white/90 uppercase tracking-widest border border-gold/50 rounded-xl px-4 py-3 font-bold hover:bg-gold hover:text-black hover:border-gold active:scale-95 transition-all shadow-lg backdrop-blur-sm bg-black/30"
          >
            {item.action || 'ACESSAR'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
