import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { ArrowLeft, Clock, X, Lock } from 'lucide-react';
import ContingencyCarousel from '../components/ContingencyCarousel';
import { motion, AnimatePresence } from 'framer-motion';

const RestaurantScreen: React.FC = () => {
  const navigate = useNavigate();
  const { guestName, roomNumber } = useGuest();
  const [showHours, setShowHours] = useState(false);
  
  // Admin Mode States
  const [clickCount, setClickCount] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClockClick = () => {
    setShowHours(true);
  };

  const handleSecretTrigger = () => {
    // Increment click count
    setClickCount(prev => {
      const newCount = prev + 1;
      
      // Reset timeout on each click
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      
      // Set timeout to reset count if user stops clicking
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000); // 2 seconds to chain clicks

      // If 10 clicks reached
      if (newCount >= 10) {
        setShowHours(false); // Close hours modal
        setShowAdminLogin(true); // Open admin login
        setClickCount(0);
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      }
      
      return newCount;
    });
  };

  const handleLogin = () => {
    if (password === '3263') {
      setAdminMode(true);
      setShowAdminLogin(false);
      setPassword('');
      setError(false);
      setShowHours(false); // Close hours modal if open
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="h-full w-full flex flex-col text-white relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/RESTAURANTE.webp')" }}
      />
      
      {/* Glassmorphism Overlay Layer */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10" />

      {/* Content Wrapper */}
      <div className="relative z-20 flex flex-col h-full">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-gold px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 border border-gold rounded-lg text-gold hover:bg-gold hover:text-black transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-widest uppercase text-gold">
                Restaurante {adminMode && <span className="text-red-500 text-[10px] ml-2">(MODO ADMIN)</span>}
              </h1>
              <p className="text-[10px] text-gray-300 uppercase tracking-wider">Menu Executivo & Especialidades</p>
            </div>
          </div>
          
          <button 
            onClick={handleClockClick}
            className="p-2 bg-gold/10 border border-gold/30 rounded-full text-gold hover:bg-gold hover:text-black transition-colors animate-pulse active:scale-95"
          >
            <Clock size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center items-center overflow-hidden">
          <ContingencyCarousel adminMode={adminMode} />
          
          {adminMode && (
            <button 
              onClick={() => setAdminMode(false)}
              className="absolute bottom-8 px-6 py-2 bg-red-500/20 border border-red-500 rounded-full text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors"
            >
              Sair do Modo Admin
            </button>
          )}
        </div>
      </div>

      {/* Hours Modal */}
      <AnimatePresence>
        {showHours && !showAdminLogin && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-obsidian border border-gold rounded-2xl p-6 max-w-sm w-full relative shadow-laser"
            >
              <button 
                onClick={() => setShowHours(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="flex flex-col items-center text-center gap-4">
                <div 
                  onClick={handleSecretTrigger}
                  className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 active:scale-95 transition-transform cursor-pointer"
                >
                  <Clock size={32} className="text-gold" />
                </div>
                
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">Horário de Funcionamento</h3>
                
                <div className="space-y-3 text-sm text-gray-300 w-full bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-gold font-bold">Almoço</span>
                    <span>11h às 15h</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gold font-bold">Jantar</span>
                    <span>18h às 22h</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-500 italic mt-2">
                  *Pedidos fora do horário estão sujeitos à disponibilidade.
                </p>

                <button 
                  onClick={() => setShowHours(false)}
                  className="w-full py-3 bg-gold text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors mt-2"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-obsidian border border-red-500/50 rounded-2xl p-8 max-w-sm w-full relative shadow-[0_0_30px_rgba(239,68,68,0.3)]"
            >
              <button 
                onClick={() => setShowAdminLogin(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30 animate-pulse">
                  <Lock size={32} className="text-red-500" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-1">Área Restrita</h3>
                  <p className="text-xs text-gray-400">Gerenciamento de Cardápio</p>
                </div>
                
                <div className="w-full space-y-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha de Acesso"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-center text-white focus:outline-none focus:border-red-500 transition-colors tracking-[0.5em]"
                    autoFocus
                  />
                  
                  {error && (
                    <p className="text-red-500 text-xs font-bold">Senha incorreta</p>
                  )}

                  <button 
                    onClick={handleLogin}
                    className="w-full py-3 bg-red-600 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                  >
                    Acessar Painel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantScreen;