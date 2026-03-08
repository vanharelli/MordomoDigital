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
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [hasSavedContact, setHasSavedContact] = useState(() => {
    return localStorage.getItem('md_contact_saved') === 'true';
  });
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
          .abortSignal(AbortSignal.timeout(10000));
        if (error) {
          if (error.message?.includes('AbortError')) return;
          console.error('Error fetching settings:', error);
          setHideRestaurant(false); 
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
    if (item.id === '4') {
      navigate('/room-service');
    }
    if (item.id === '5') {
      navigate('/iron');
    }
    if (item.id === '6') {
      navigate('/hair-dryer');
    }
    if (item.id === '7') {
      navigate('/garage');
    }
    if (item.id === 'map-alpha') {
      navigate('/radar');
    }
  };

  const coreServices = [
    { id: '1', title: 'Tabela de Produtos ', action: 'PEDIR AGORA' },
    { id: '2', title: 'Restaurante', action: 'SOLICITAR PEDIDO' },
    { id: '3', title: 'Toalha e extras', action: 'SOLICITAR' },
    { id: '4', title: 'Serviço de Quarto', action: 'ARRUMAÇÃO' },
    { id: '5', title: 'Ferro de Passar', action: 'SOLICITAR' },
    { id: '6', title: 'Secador de Cabelo', action: 'SOLICITAR' },
    { id: '7', title: 'Garagem', action: 'SOLICITAR' },
      ];

  const displayedCoreServices = hideRestaurant === null ? [] : (hideRestaurant ? coreServices.filter(s => s.id !== '2') : coreServices);

  const partnerNetwork = [
    { id: 'map-alpha', title: 'MAPA ALFA', action: 'EXPLORAR REGIÃO' },
  ];

  const handleContactSave = () => {
    setHasSavedContact(true);
    localStorage.setItem('md_contact_saved', 'true');
  };

  return (
    <div className="h-full w-full relative overflow-hidden bg-obsidian flex flex-col">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: 'url("/backgroundalfa.webp")' }}
      />
      
      {/* Content Wrapper */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Scrollable Content Wrapper */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="min-h-full flex flex-col">
            <div className="sticky top-0 z-50 flex flex-col">
              {/* Header */}
              <div className="px-3 pt-3 pb-3 flex justify-between items-center border-b-[0.5px] border-gold bg-obsidian/70 backdrop-blur-md relative text-white">
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

            <div className="space-y-12 mt-4 transition-opacity duration-300 flex-1" style={{ opacity: hideRestaurant === null ? 0 : 1 }}>
              <Carousel title={<span className="text-gold">SERVIÇOS</span>} items={displayedCoreServices} onItemClick={handleServiceClick} />
              <div className="pb-8">
                <Carousel title={<span className="text-gold">ONDE ESTAMOS?</span>} items={partnerNetwork} onItemClick={handleServiceClick} />
              </div>

              {/* Footer Information */}
              <div className="px-6 pb-12 pt-8 flex flex-col items-center space-y-4 border-t border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="flex flex-col items-center space-y-3 text-center">
                  <p className="text-[8px] text-gray-500 uppercase tracking-widest">
                    © {new Date().getFullYear()} Alfa Plaza Hotel. <br/> Todos os direitos reservados.
                  </p>
                  
                  <button 
                    onClick={() => setIsTermsOpen(true)}
                    className="text-[8px] text-gold uppercase tracking-widest hover:text-white transition-colors border-b border-gold/30 pb-0.5"
                  >
                    Termos de Uso e Privacidade
                  </button>

                  <div className="flex flex-col items-center gap-1 pt-2">
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
                  {hasSavedContact ? (
                    <span className="font-bold text-gold tracking-widest text-lg select-all animate-fade-in">77921207</span>
                  ) : (
                    <span className="text-gray-600 font-bold tracking-tighter text-xs uppercase bg-black/40 px-3 py-1 rounded border border-white/5 italic">
                      Liberado após salvar contato
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-[10px] text-gray-400 mt-2 leading-relaxed px-2">
                {hasSavedContact 
                  ? "Conecte-se agora para aproveitar a melhor experiência digital do Alfa Plaza."
                  : "Por segurança e para liberar benefícios VIP, adicione o contato do hotel abaixo para visualizar a senha do Wi-Fi."
                }
              </p>

              {/* VIP Contact Save Hook inside Wi-Fi Modal */}
              {!hasSavedContact && <WhatsAppHook variant="inline" onAction={handleContactSave} />}
            </div>
          </div>
        </div>
      )}

      {/* Terms of Use Modal */}
      {isTermsOpen && (
        <div className="absolute inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6 animate-fade-in">
          <div className="bg-obsidian border border-gold/30 rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gold/20 flex justify-between items-center bg-gold/5">
              <h2 className="text-sm font-bold text-gold uppercase tracking-widest">Termos de Uso e Responsabilidade</h2>
              <button onClick={() => setIsTermsOpen(false)} className="text-gold hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-gray-300 leading-relaxed scrollbar-hide">
              <section className="space-y-2">
                <h3 className="text-gold font-bold uppercase tracking-wider">1. Aceitação dos Termos</h3>
                <p>Ao utilizar o Mordomo Digital do Alfa Plaza Hotel, você concorda integralmente com as condições aqui estabelecidas para garantir a segurança e o conforto de sua estadia.</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-gold font-bold uppercase tracking-wider">2. Uso dos Serviços</h3>
                <p>Os serviços de pedidos, extras e informações locais são fornecidos exclusivamente para hóspedes em estadia ativa. O uso indevido ou solicitações falsas podem resultar em cobranças administrativas.</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-gold font-bold uppercase tracking-wider">3. Privacidade e Dados</h3>
                <p>O hotel respeita a LGPD. Seus dados (nome e quarto) são utilizados apenas para a prestação dos serviços internos e não são compartilhados com terceiros, exceto conforme necessário para o funcionamento técnico do sistema.</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-gold font-bold uppercase tracking-wider">4. Responsabilidade</h3>
                <p>O hotel não se responsabiliza por indisponibilidades técnicas momentâneas da rede Wi-Fi ou do servidor Supabase, embora envide todos os esforços para manter a estabilidade total.</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-gold font-bold uppercase tracking-wider">5. Desenvolvimento</h3>
                <p>Esta plataforma foi desenvolvida pela Marketelli. Para suporte técnico ou informações sobre o sistema, acesse www.marketelli.com.</p>
              </section>

              <div className="pt-4 border-t border-white/5 italic text-[10px] text-gray-500">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className="p-4 bg-black/50 border-t border-gold/10">
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="w-full bg-gold/10 border border-gold text-gold py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-gold hover:text-black transition-all"
              >
                Compreendi e Aceito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;
