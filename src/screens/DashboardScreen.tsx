import React, { useState, useRef, useEffect } from 'react';
import { useGuest } from '../context/GuestContext';
import Carousel from '../components/Carousel';
import AnnouncementTicker from '../components/AnnouncementTicker';
import WhatsAppHook from '../components/WhatsAppHook';
import { LogOut, Wifi, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const DashboardScreen: React.FC = () => {
  const { guestName, roomNumber, logout } = useGuest();
  const navigate = useNavigate();
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const logoClicksRef = useRef(0);
  const [hideRestaurant, setHideRestaurant] = useState<boolean | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoClick = () => {
    logoClicksRef.current += 1;
    if (logoClicksRef.current >= 10) {
      navigate('/admin-alpha');
      logoClicksRef.current = 0;
    }
  };

  useEffect(() => {
    const fetchModuleSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('hotel_settings')
          .select('*')
          .abortSignal(AbortSignal.timeout(5000));
        if (error) {
          console.error('Error fetching settings:', error);
          setHideRestaurant(false); // Fallback caso o servidor falhe
          return;
        }
        if (data) {
          const hideRestaurantSetting = data.find(item => item.key === 'hide_restaurante');
          setHideRestaurant(hideRestaurantSetting?.value === 'true');
        } else {
          setHideRestaurant(false); // Caso não existam dados
        }
      } catch (err) {
        console.error('Connection failed:', err);
        setHideRestaurant(false); // Fallback em erro fatal
      }
    };
    fetchModuleSettings();

    const channel = supabase
      .channel('public:hotel_settings_dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hotel_settings' }, () => {
        fetchModuleSettings();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleServiceClick = (item: { id: string }) => {
    if (item.id === '1') {
      navigate('/products');
    }
    if (item.id === '3') {
      navigate('/extras');
    }
    if (item.id === 'map-alpha') {
      navigate('/radar');
    }
  };

  const coreServices = [
    { id: '1', title: 'Tabela de Produtos ', action: 'PEDIR AGORA' },
    { id: '2', title: 'Restaurante', action: 'SOLICITAR PEDIDO' },
    { id: '3', title: 'Toalha e extras', action: 'SOLICITAR' },
      ];

  const displayedCoreServices = hideRestaurant === null ? [] : (hideRestaurant ? coreServices.filter(s => s.id !== '2') : coreServices);

  const partnerNetwork = [
    { id: 'map-alpha', title: 'MAPA ALFA', action: 'EXPLORAR REGIÃO' },
  ];

  return (
    <div className="h-full w-full relative overflow-hidden bg-obsidian">
      {/* Background Image Layer - Fixed to container */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/backgroundalfa.webp')" }}
      />
      
      {/* Glassmorphism Overlay Layer */}
      <div className="absolute inset-0 bg-white/1 backdrop-blur-[5px] z-10" />

      {/* Scrollable Content Wrapper */}
      <div className="absolute inset-0 overflow-y-auto scrollbar-hide z-20 text-white">
        <div className="min-h-full flex flex-col">
          <div className="sticky top-0 z-50 flex flex-col">
            {/* Header */}
            <div className="px-3 pt-3 pb-3 flex justify-between items-center border-b-[0.5px] border-gold bg-obsidian/70 backdrop-blur-md relative">
              <div className="z-10">
                <h1 className="text-xl font-bold tracking-widest uppercase mb-1">{guestName}</h1>
                <p className="text-xs text-gold uppercase tracking-widest font-bold">Quarto {roomNumber}</p>
              </div>
              
              {/* Centralized Logo */}
              <div 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer active:scale-95 transition-transform"
                onClick={handleLogoClick}
              >
                <img src="/logo.webp" alt="Alfa Plaza" className="h-16 w-auto object-contain" />
              </div>

              <div className="flex items-center space-x-2 z-10">
                <button 
                  onClick={() => setIsWifiOpen(true)} 
                  className="text-gold border-[0.5px] border-gold p-2 rounded-lg hover:bg-gold/10 transition-colors" 
                  aria-label="Wi-Fi Info"
                >
                  <Wifi size={15} />
                </button>
                <button onClick={handleLogout} className="text-gold border-[0.5px] border-gold p-2 rounded-lg hover:bg-gold/10 transition-colors" aria-label="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            </div>

            {/* Live Announcement Ticker */}
            <AnnouncementTicker />
          </div>

          <div className="space-y-5 mt-4 transition-opacity duration-300" style={{ opacity: hideRestaurant === null ? 0 : 1 }}>
            <Carousel title={<span className="text-gold">SERVIÇOS</span>} items={displayedCoreServices} onItemClick={handleServiceClick} />
            <div className="pb-10 /* Added bottom padding to lift Partners module above native buttons */">
              <Carousel title={<span className="text-gold">ONDE ESTAMOS?</span>} items={partnerNetwork} onItemClick={handleServiceClick} />
            </div>
          </div>
        </div>
      </div>

      {/* Wi-Fi Popup Modal */}
      {isWifiOpen && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-obsidian border border-gold rounded-xl p-6 w-full max-w-sm relative shadow-[0_0_15px_rgba(218,165,32,0.3)]">
            <button 
              onClick={() => setIsWifiOpen(false)}
              className="absolute top-4 right-4 text-gold hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-gold/10 p-4 rounded-full mb-2 border border-gold/30">
                <Wifi size={32} className="text-gold" />
              </div>
              
              <h2 className="text-xl font-bold text-gold tracking-widest uppercase">Rede Wi-Fi</h2>
              
              <div className="w-full space-y-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Rede</span>
                  <span className="font-bold text-white tracking-wide select-all">ALFA_HOSPEDE</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Senha</span>
                  <span className="font-bold text-gold tracking-widest text-lg select-all">77921207</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Conecte-se para ter acesso a todos os serviços digitais do hotel.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Hook */}
      <WhatsAppHook />
    </div>
  );
};

export default DashboardScreen;
