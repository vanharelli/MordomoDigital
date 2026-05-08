import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';

const GuardaVolumeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/backgroundalfa.webp')" }}
      />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10" />

      <div className="relative z-20 flex flex-col h-full">
        <div className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-gold/30 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 text-gold hover:bg-gold/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold tracking-widest uppercase text-gold">Guarda Volume</h1>
            <p className="text-[10px] text-gray-300 uppercase tracking-tighter">Informações</p>
          </div>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          <div className="relative group overflow-hidden rounded-2xl border border-gold/20 bg-black/40 p-6 shadow-2xl backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Info size={80} className="text-gold" />
            </div>

            <h2 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
              <Info size={20} />
              Valor
            </h2>

            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <p>
                O valor do guarda volume é de <span className="text-white font-bold">R$ 10,00</span> por unidade do que for guardar.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-black/30 backdrop-blur-md border-t border-gold/30">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gold text-black font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-white transition-all shadow-laser"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuardaVolumeScreen;
