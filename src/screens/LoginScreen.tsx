import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import { User, KeyRound } from 'lucide-react';

const LoginScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const { setGuestData } = useGuest();
  const navigate = useNavigate();

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
        style={{ backgroundImage: "url('/FRENTEHOTEL.jpeg')" }}
      />
      
      {/* Glassmorphism Overlay Layer */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[5px] z-10" />

      <div className="w-full max-w-md relative z-20 bg-black/60 backdrop-blur-[15px] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="text-center space-y-2 mb-8 flex flex-col items-center">
          <img src="/logo.webp" alt="Alfa Plaza Logo" className="h-20 w-auto mb-4 object-contain" />
          <h1 className="text-3xl font-bold tracking-tighter text-gold">BEM VINDO AO ALFA PLAZA HOTEL</h1>
          <p className="text-sm text-silver tracking-widest uppercase font-bold">Sofisticação e qualidade ao seu dispor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gold/50 group-focus-within:text-gold transition-colors">
                <KeyRound size={20} />
              </div>
              <input
                type="text"
                placeholder="Número do Quarto"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-white/5 border-[0.5px] border-gold rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-all font-bold"
              />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gold/50 group-focus-within:text-gold transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="Nome e Sobrenome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border-[0.5px] border-gold rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-all font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-obsidian font-bold py-4 rounded-xl border-[0.5px] border-gold hover:bg-gold-light transition-colors tracking-wide shadow-laser"
          >
            ACESSAR SUÍTE
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
