import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { User, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { validateSession, createSession } from '../lib/BrainFunctions';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const LoginScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const { setGuestData } = useGuest();
  const navigate = useNavigate();

  useEffect(() => {
    // 2. BYPASS DE LOGIN: Verifica se 'alfa_session' existe e é válida
    const session = validateSession();
    if (session) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && room) {
      // 1. PERSISTÊNCIA: Salva a sessão no localStorage
      createSession();
      setGuestData(name, room);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-white relative overflow-hidden atmosphere">
      {/* Background Image Layer */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/FRENTEHOTEL.webp')" }}
      />

      {/* Glassmorphism Overlay Layer */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[5px] z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-20 bg-black/60 backdrop-blur-[15px] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
      >
        {/* Filete dourado superior */}
        <div className="gold-rule absolute top-0 left-8 right-8" />

        <div className="text-center space-y-2 mb-6 md:mb-8 flex flex-col items-center">
          <motion.img
            variants={itemVariants}
            src="/logo1.png"
            alt="Alfa Plaza Logo"
            className="h-16 md:h-20 w-auto mb-4 object-contain"
          />
          <motion.h1 variants={itemVariants} className="lux-title text-4xl md:text-5xl text-white leading-none">
            Mordomo <span className="italic gold-shimmer">Digital</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-[10px] md:text-xs text-white/60 tracking-[0.35em] uppercase font-semibold text-center pt-2">
            Peça, agende e receba sem sair da suíte
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gold/50 group-focus-within:text-gold transition-colors">
                <KeyRound size={20} />
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="NÚMERO DA SUÍTE"
                value={room}
                onChange={(e) => setRoom(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-white/5 border-[0.5px] border-gold/60 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/25 focus:outline-none focus:border-gold focus:shadow-laser-soft transition-all font-bold tracking-widest"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gold/50 group-focus-within:text-gold transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="NOME DO HÓSPEDE"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                className="w-full bg-white/5 border-[0.5px] border-gold/60 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/25 focus:outline-none focus:border-gold focus:shadow-laser-soft transition-all font-bold tracking-widest"
                required
              />
            </motion.div>
          </div>

          <motion.button
            variants={itemVariants}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gold text-black font-black py-4 rounded-xl border-[0.5px] border-gold hover:bg-white transition-all tracking-widest shadow-laser uppercase animate-glow-pulse"
          >
            Começar minha estadia
          </motion.button>

          <motion.p variants={itemVariants} className="text-center text-[9px] text-white/40 uppercase tracking-[0.25em]">
            Atendimento direto com a recepção, 24 horas
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
