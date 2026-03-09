import React, { useState, useRef, useEffect } from 'react';
import { useGuest } from '../context/GuestContext';
import Carousel from '../components/Carousel';
import AnnouncementTicker from '../components/AnnouncementTicker';
import WhatsAppHook from '../components/WhatsAppHook';
import { Wifi, X, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { validateSession } from '../lib/BrainFunctions';

const DashboardScreen: React.FC = () => {
  const { guestName, roomNumber, logout } = useGuest();
  const navigate = useNavigate();
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [hasSavedContact, setHasSavedContact] = useState(() => {
    return localStorage.getItem('md_contact_saved') === 'true';
  });
  const logoClicksRef = useRef(0);
  const [hideRestaurant, setHideRestaurant] = useState<boolean>(false);

  useEffect(() => {
    // 3. EXPIRAÇÃO E REDIRECIONAMENTO: Verifica sessão a cada carregamento do Dashboard
    const session = validateSession();
    if (!session) {
      logout(); // Limpa o contexto do hóspede e chaves antigas
      if (!window.location.href.includes('alfaplazahotel.com.br')) {
         navigate('/');
      }
    }
  }, [navigate, logout]);

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
        if (!isSupabaseConfigured) return;

        const { data, error } = await supabase
          .from('hotel_settings')
          .select('*');
          
        if (error) {
          console.error('Error fetching settings:', error);
          return;
        }

        if (data) {
          const hideRestaurantSetting = data.find(item => item.key === 'hide_restaurante');
          setHideRestaurant(hideRestaurantSetting?.value === 'true');
        }
      } catch (err) {
        console.error('Connection failed:', err);
      }
    };
    
    fetchModuleSettings();

    if (!isSupabaseConfigured) return;
    
    const channel = supabase
      .channel('public:hotel_settings_dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hotel_settings' }, (payload) => {
        // Atualização otimista apenas se for a chave relevante
        if (payload.new && (payload.new as any).key === 'hide_restaurante') {
           setHideRestaurant((payload.new as any).value === 'true');
        } else {
           fetchModuleSettings();
        }
      })
      .subscribe();
      
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleServiceClick = (item: { id: string }) => {
    if (item.id === '1') {
      navigate('/products');
    }
    if (item.id === '2') {
      navigate('/restaurant');
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
    { id: '1', title: 'Tabela de Produtos ', action: 'PEDIR AGORA', image: '/SNACKS.webp' },
    { id: '2', title: 'Restaurante', action: 'SOLICITAR PEDIDO', image: '/RESTAURANTE.webp' },
    { id: '3', title: 'Toalha e extras', action: 'SOLICITAR', image: '/TOALHA.webp' },
    { id: '4', title: 'Serviço de Quarto', action: 'ARRUMAÇÃO', image: '/SERVIÇO DE QUARTO.webp' },
    { id: '5', title: 'Ferro de Passar', action: 'SOLICITAR', image: '/FERRO DE PASSAR.webp' },
    { id: '6', title: 'Secador de Cabelo', action: 'SOLICITAR', image: '/SECADOR DE CABELO.webp' },
    { id: '7', title: 'Garagem', action: 'SOLICITAR', image: '/GARAGEM.webp' },
  ];

  const displayedCoreServices = hideRestaurant ? coreServices.filter(s => s.id !== '2') : coreServices;

  const partnerNetwork = [
    { id: 'map-alpha', title: 'MAPA ALFA', action: 'EXPLORAR REGIÃO', image: '/alfa maps.webp' },
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
        style={{ backgroundImage: 'url("/background2.webp")' }}
      />
      
      {/* Content Wrapper */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Scrollable Content Wrapper */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="min-h-full flex flex-col">
            <div className="sticky top-0 z-50 flex flex-col">
              {/* Header */}
            <div className="px-3 pt-3 pb-3 flex justify-between items-center border-b-[0.5px] border-gold bg-obsidian/70 backdrop-blur-md relative text-white">
              <div className="flex items-center gap-3 z-10">
                {/* Logo on the left */}
                <div 
                  className="cursor-pointer active:scale-95 transition-transform"
                  onClick={handleLogoClick}
                >
                  <img src="/logo.webp" alt="Alfa Plaza" className="h-12 w-auto object-contain" />
                </div>
                
                <div>
                  <h1 className="text-lg font-bold tracking-widest uppercase leading-tight">{guestName}</h1>
                  <p className="text-[10px] text-gold uppercase tracking-widest font-bold">Quarto {roomNumber}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 z-10">
                  <button 
                    onClick={() => setIsInfoOpen(true)} 
                    className="text-gold border-[0.5px] border-gold p-2 rounded-lg hover:bg-gold/10 transition-colors" 
                    aria-label="Hotel Info"
                  >
                    <Info size={15} />
                  </button>
                  <button 
                    onClick={() => setIsWifiOpen(true)} 
                    className="text-gold border-[0.5px] border-gold p-2 rounded-lg hover:bg-gold/10 transition-colors" 
                    aria-label="Wi-Fi Info"
                  >
                    <Wifi size={15} />
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

      {/* Info Modal */}
      <AnimatePresence>
        {isInfoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 w-full max-w-sm relative shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Brilho Interno Glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              
              <button 
                onClick={() => setIsInfoOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="bg-gold/20 p-5 rounded-full mb-2 border border-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <Info size={36} className="text-gold" />
                </div>
                
                <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase">Informações</h2>
                
                <div className="w-full space-y-4 bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-md text-left">
                  
                  {/* Horários */}
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Check-in / Check-out</h3>
                    <p className="text-gray-300 text-xs font-medium">Início: 13:00</p>
                    <p className="text-gray-300 text-xs font-medium">Término: 12:00 (Meio-dia)</p>
                  </div>

                  {/* Café da Manhã */}
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Café da Manhã</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-[10px]">Seg a Sáb</span>
                        <span className="text-white text-[10px] font-bold">06:00 - 10:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-[10px]">Dom e Feriados</span>
                        <span className="text-white text-[10px] font-bold">07:00 - 10:30</span>
                      </div>
                    </div>
                  </div>

                  {/* Aviso */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)] animate-pulse" />
                    <span className="text-gray-300 text-[10px] font-bold uppercase tracking-wider">Quartos para não fumantes</span>
                  </div>

                </div>

                <p className="text-[11px] text-white/50 leading-relaxed px-4 font-medium uppercase tracking-wider">
                  Desejamos uma excelente estadia no Alfa Plaza.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wi-Fi Popup Modal */}
      {isWifiOpen && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 w-full max-w-sm relative shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Brilho Interno Glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <button 
              onClick={() => setIsWifiOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
              <div className="bg-gold/20 p-5 rounded-full mb-2 border border-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Wifi size={36} className="text-gold" />
              </div>
              
              <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase">Alfa Plaza</h2>
              
              <div className="w-full space-y-4 bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-md">
                <div className="flex flex-col items-start border-b border-white/10 pb-3">
                  <span className="text-[10px] text-gold/60 uppercase tracking-widest mb-1 font-bold">Rede Premium</span>
                  <span className="font-bold text-white text-lg tracking-wide select-all">ALFA_HOSPEDE</span>
                </div>
                
                <div className="flex flex-col items-start pt-1">
                  <span className="text-[10px] text-gold/60 uppercase tracking-widest mb-1 font-bold">Chave de Acesso</span>
                  {hasSavedContact ? (
                    <span className="font-mono font-black text-gold tracking-[0.3em] text-2xl select-all animate-pulse">77921207</span>
                  ) : (
                    <span className="text-white/30 font-bold tracking-tighter text-[10px] uppercase bg-black/40 px-3 py-1 rounded border border-white/5 italic">
                      Liberado após salvar contato
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-white/50 leading-relaxed px-4 font-medium uppercase tracking-wider">
                {hasSavedContact 
                  ? "Experiência digital de alta velocidade exclusiva Alfa Plaza."
                  : "Salve o contato do hotel abaixo para visualizar sua chave de acesso VIP."
                }
              </p>

              {/* VIP Contact Save Hook inside Wi-Fi Modal */}
              {!hasSavedContact && <WhatsAppHook variant="inline" onAction={handleContactSave} />}
            </div>
          </div>
        </div>
      )}

      {/* Terms of Use Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative"
            >
              {/* Brilho Interno Glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md">
                  <h2 className="text-sm font-black text-white tracking-[0.2em] uppercase">Termos de Uso</h2>
                  <button 
                    onClick={() => setIsTermsOpen(false)} 
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-gray-300 leading-relaxed scrollbar-hide">
                  <section className="space-y-2">
                    <h3 className="text-gold font-bold uppercase tracking-wider text-[10px]">1. Aceitação dos Termos</h3>
                    <p>Ao utilizar o Mordomo Digital do Alfa Plaza Hotel, você concorda integralmente com as condições aqui estabelecidas para garantir a segurança e o conforto de sua estadia.</p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-gold font-bold uppercase tracking-wider text-[10px]">2. Uso dos Serviços</h3>
                    <p>Os serviços de pedidos, extras e informações locais são fornecidos exclusivamente para hóspedes em estadia ativa. O uso indevido ou solicitações falsas podem resultar em cobranças administrativas.</p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-gold font-bold uppercase tracking-wider text-[10px]">3. Privacidade e Dados</h3>
                    <p>O hotel respeita a LGPD. Seus dados (nome e quarto) são utilizados apenas para a prestação dos serviços internos e não são compartilhados com terceiros, exceto conforme necessário para o funcionamento técnico do sistema.</p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-gold font-bold uppercase tracking-wider text-[10px]">4. Responsabilidade</h3>
                    <p>O hotel não se responsabiliza por indisponibilidades técnicas momentâneas da rede Wi-Fi ou do servidor Supabase, embora envide todos os esforços para manter a estabilidade total.</p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-gold font-bold uppercase tracking-wider text-[10px]">5. Desenvolvimento</h3>
                    <p>Esta plataforma foi desenvolvida pela Marketelli. Para suporte técnico ou informações sobre o sistema, acesse www.marketelli.com.</p>
                  </section>

                  <div className="pt-4 border-t border-white/10 italic text-[10px] text-gray-500">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                  </div>
                </div>

                <div className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-md">
                  <button 
                    onClick={() => setIsTermsOpen(false)}
                    className="w-full bg-gold text-black py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-lg"
                  >
                    Compreendi e Aceito
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardScreen;
