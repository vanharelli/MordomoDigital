import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, UtensilsCrossed, CupSoda, Layers, BedDouble,
  Shirt, Wind, Car, Printer, Copy, Briefcase, MapPin,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/products', label: 'Bebidas & Snacks', hint: 'Entrega na suíte', icon: <CupSoda size={20} /> },
  { path: '/restaurant', label: 'Restaurante', hint: 'Cardápio do dia', icon: <UtensilsCrossed size={20} /> },
  { path: '/extras', label: 'Toalhas & Extras', hint: 'Itens para o quarto', icon: <Layers size={20} /> },
  { path: '/room-service', label: 'Arrumação', hint: 'Limpeza da suíte', icon: <BedDouble size={20} /> },
  { path: '/iron', label: 'Lavanderia', hint: 'Lavar e passar', icon: <Shirt size={20} /> },
  { path: '/hair-dryer', label: 'Secador de Cabelo', hint: 'Empréstimo gratuito', icon: <Wind size={20} /> },
  { path: '/garage', label: 'Garagem', hint: 'Seu carro pronto na porta', icon: <Car size={20} /> },
  { path: '/printing', label: 'Impressão', hint: 'R$ 1,00 por folha', icon: <Printer size={20} /> },
  { path: '/xerox', label: 'Xerox', hint: 'R$ 1,00 por cópia', icon: <Copy size={20} /> },
  { path: '/guarda-volume', label: 'Guarda-Volumes', hint: 'Bagagem protegida', icon: <Briefcase size={20} /> },
  { path: '/radar', label: 'Mapa da Região', hint: 'O melhor ao redor do hotel', icon: <MapPin size={20} /> },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' as const, delay: 0.15 } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 as const } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

const NavMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path: string) => {
    setOpen(false);
    // Deixa a animação de saída respirar antes de trocar de tela
    setTimeout(() => navigate(path), 250);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menu de serviços"
        className="text-gold border-[0.5px] border-gold p-3 rounded-lg hover:bg-gold/10 active:scale-95 transition-all"
      >
        <Menu size={24} />
      </button>

      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex flex-col"
          >
            {/* Vinheta dourada do menu */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(218,165,32,0.12),transparent_55%)]" />

            {/* Header do menu */}
            <div className="relative flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <img src="/logo1.png" alt="Alfa Plaza" className="h-10 w-auto object-contain" />
                <div>
                  <p className="lux-title text-xl text-white leading-none">Mordomo Digital</p>
                  <p className="text-[9px] text-gold uppercase tracking-[0.3em] mt-1">Alfa Plaza Hotel</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="text-gold border-[0.5px] border-gold p-3 rounded-lg hover:bg-gold/10 active:scale-95 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="gold-rule mx-6 shrink-0" />

            {/* Lista de serviços */}
            <motion.nav
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative flex-1 overflow-y-auto scrollbar-hide px-6 py-6"
            >
              <div className="max-w-lg mx-auto md:max-w-3xl md:grid md:grid-cols-2 md:gap-x-8">
                {NAV_ITEMS.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <motion.button
                      key={item.path}
                      variants={itemVariants}
                      onClick={() => go(item.path)}
                      className={`w-full flex items-center gap-4 py-4 border-b border-white/5 text-left group transition-colors ${
                        active ? 'text-gold' : 'text-white hover:text-gold'
                      }`}
                    >
                      <span className={`shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center transition-all group-hover:border-gold group-hover:shadow-laser-soft ${
                        active ? 'border-gold text-gold' : 'border-white/15 text-gold/70'
                      }`}>
                        {item.icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="lux-title block text-2xl leading-tight truncate">{item.label}</span>
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-gold/70 transition-colors mt-0.5">
                          {item.hint}
                        </span>
                      </span>
                      <span className="text-gold/0 group-hover:text-gold transition-all group-hover:translate-x-1 text-lg">→</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.nav>

            {/* Rodapé do menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
              className="relative px-6 pb-8 pt-2 text-center shrink-0"
            >
              <p className="text-[9px] text-white/30 uppercase tracking-[0.3em]">
                Recepção 24 horas · Estamos à sua disposição
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
};

export default NavMenu;
