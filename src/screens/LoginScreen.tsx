import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { User, KeyRound } from 'lucide-react';

const LoginScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const { setGuestData, isAuthenticated } = useGuest();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && room) {
      setGuestData(name, room);
      navigate('/dashboard');
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/FRENTEHOTEL.webp')" }}
      />
      
      {/* Glassmorphism Overlay Layer */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[5px] z-10" />

      <div className="w-full max-w-md relative z-20 bg-black/60 backdrop-blur-[15px] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="text-center space-y-2 mb-8 flex flex-col items-center">
          <img src="/logo.webp" alt="Alfa Plaza Logo" className="h-20 w-auto mb-4 object-contain" />
          <h1 className="text-3xl font-bold tracking-tighter text-gold uppercase">Mordomo Digital</h1>
          <p className="text-sm text-gray-400 tracking-widest uppercase font-bold text-center">Sofisticação e qualidade ao seu dispor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
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
                className="w-full bg-white/5 border-[0.5px] border-gold rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-all font-bold tracking-widest"
                required
              />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gold/50 group-focus-within:text-gold transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="NOME DO HÓSPEDE"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                className="w-full bg-white/5 border-[0.5px] border-gold rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-all font-bold tracking-widest"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-black font-black py-4 rounded-xl border-[0.5px] border-gold hover:bg-white transition-all tracking-widest shadow-laser uppercase"
          >
            Acessar Portal
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center space-y-4">
          <p className="text-[8px] text-gray-500 uppercase tracking-widest text-center">
            © {new Date().getFullYear()} Alfa Plaza Hotel. <br/> Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[8px] text-gray-600 uppercase tracking-widest">Desenvolvido por:</span>
            <a 
              href="https://www.marketelli.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[9px] font-bold text-gold hover:text-white transition-colors tracking-widest"
            >
              WWW.MARKETELLI.COM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
