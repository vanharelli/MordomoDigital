import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminScreen: React.FC = () => {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [speed, setSpeed] = useState(20);
  const [status, setStatus] = useState('');
  const [hideRestaurant, setHideRestaurant] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('hotel_settings')
        .select('*')
        .abortSignal(AbortSignal.timeout(5000));
      
      if (error) {
           console.warn('Supabase Error:', error);
           setStatus('Erro ao carregar configurações.');
           return;
      }

      if (data) {
        const announcementSetting = data.find(item => item.key === 'announcement');
        const speedSetting = data.find(item => item.key === 'ticker_speed');
        const hideRestaurantSetting = data.find(item => item.key === 'hide_restaurante');

        if (announcementSetting?.value) setAnnouncement(announcementSetting.value);
        if (speedSetting?.value) setSpeed(parseInt(speedSetting.value, 10));
        if (hideRestaurantSetting?.value) setHideRestaurant(hideRestaurantSetting.value === 'true');
      }
    } catch (err) {
      console.warn('Connection Failed:', err);
      setStatus('Erro de conexão com o servidor.');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('public:hotel_settings_admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hotel_settings' }, () => {
        fetchSettings();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === '3263') {
      setIsAuthenticated(true);
      setStatus('');
    } else {
      setStatus('Código de acesso inválido.');
    }
  };

  const handlePublish = async () => {
    if (!announcement.trim()) {
      setStatus('O anúncio não pode estar vazio.');
      return;
    }

    setStatus('Publicando...');
    setIsPublishing(true);

    try {
      const { error: error1 } = await supabase
        .from('hotel_settings')
        .upsert({ key: 'announcement', value: announcement });

      const { error: error2 } = await supabase
        .from('hotel_settings')
        .upsert({ key: 'ticker_speed', value: speed.toString() });

      const { error: error3 } = await supabase
        .from('hotel_settings')
        .upsert({ key: 'hide_restaurante', value: hideRestaurant ? 'true' : 'false' });

      if (error1 || error2 || error3) {
        throw new Error(error1?.message || error2?.message || error3?.message);
      }

      setStatus('Publicado com sucesso!');
    } catch (err) {
      // Ignore AbortError
      if (err instanceof Error && err.message.includes('AbortError')) {
          console.warn('Request aborted');
          setIsPublishing(false);
          return;
      }
      setStatus('Erro ao sincronizar. Verifique a conexão.');
    }
    
    // Clear status after 3 seconds
    setTimeout(() => setStatus(''), 3000);
    setIsPublishing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="h-full w-full bg-obsidian flex items-center justify-center p-8 relative">
        <button 
          onClick={() => navigate('/dashboard')}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 border-[0.5px] border-gold text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-gold/10 transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div className="w-full max-w-md space-y-8 border-[0.5px] border-gold p-8 rounded-2xl bg-black/50 backdrop-blur-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gold tracking-widest uppercase">Área Restrita</h2>
            <p className="mt-2 text-sm text-gray-400">Digite o código de acesso administrativo</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full bg-black/50 border-b border-gold text-white text-center text-2xl tracking-[0.5em] p-4 focus:outline-none focus:bg-gold/10 transition-colors placeholder-gray-700"
                placeholder="••••"
                maxLength={4}
              />
            </div>
            {status && (
              <p className="text-neon-red text-center text-sm font-bold tracking-wide border border-neon-red p-2 rounded bg-red-950/30 shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                {status}
              </p>
            )}
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-md text-black bg-gold hover:bg-white transition-all duration-300 uppercase tracking-widest"
            >
              Acessar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-obsidian flex flex-col items-center justify-center p-8 relative">
      <button 
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 border-[0.5px] border-gold text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-gold/10 transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-2 relative">
          <h1 className="text-lg font-bold text-gold tracking-widest uppercase">Gerenciamento de Ticker</h1>
          <p className="text-xs text-gray-400">Edite a mensagem exibida em todos os terminais do hotel.</p>
        </div>

        <div className="border-[0.5px] border-gold bg-black/50 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-laser">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-gold uppercase tracking-widest font-bold">Velocidade do Anúncio (Segundos)</label>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400">10s</span>
                <input 
                  type="range" 
                  min="10" 
                  max="40" 
                  value={speed} 
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <span className="text-[10px] font-bold text-gray-400">40s</span>
              </div>
              <div className="text-center text-gold font-bold text-xs">{speed}s</div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-gold uppercase tracking-widest font-bold">Mensagem do Anúncio</label>
              <textarea
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                rows={3}
                className="w-full bg-black/80 border border-gray-800 focus:border-gold rounded-lg p-3 text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                placeholder="Digite o anúncio aqui..."
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] text-gold uppercase tracking-widest font-bold">Visibilidade do Restaurante</label>
              <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-gray-800">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {hideRestaurant ? 'Módulo Oculto' : 'Módulo Visível'}
                </span>
                <button
                  onClick={() => setHideRestaurant(!hideRestaurant)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    hideRestaurant ? 'bg-red-500' : 'bg-emerald-500'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                      hideRestaurant ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className={`w-full py-3 ${isPublishing ? 'bg-gray-500 cursor-not-allowed opacity-50' : 'bg-gold'} text-black font-bold uppercase tracking-widest rounded text-xs ${isPublishing ? '' : 'hover:bg-white hover:shadow-laser'} transition-all duration-300`}
            >
              Publicar Anúncio
            </button>
            <p className={`text-[10px] font-bold tracking-wide text-center transition-opacity duration-300 ${status.includes('sucesso') ? 'text-green-500' : 'text-red-500'} ${status ? 'opacity-100' : 'opacity-0'}`}>
              {status || 'Pronto'}
            </p>
          </div>
        </div>
        
        <div className="text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">Mordomo Digital v2.0 • Sistema Interno</p>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
