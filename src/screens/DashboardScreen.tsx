import React, { useState, useRef, useEffect } from 'react';
import { useGuest } from '../context/GuestContext';
import ModuleCard from '../components/ModuleCard';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(() => {
    return sessionStorage.getItem('md_last_module') || null;
  });

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('dashboard_scroll');
    if (savedScroll && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo(0, parseInt(savedScroll, 10));
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        sessionStorage.setItem('dashboard_scroll', scrollRef.current.scrollTop.toString());
      }
    };
    
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // 3. EXPIRAÇÃO E REDIRECIONAMENTO: Verifica sessão a cada carregamento do Dashboard
    const session = validateSession();
    if (!session) {
      logout();
      navigate('/');
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
        const newRow = payload.new as { key?: string; value?: string } | null;
        if (newRow?.key === 'hide_restaurante') {
          setHideRestaurant(newRow.value === 'true');
        } else {
           fetchModuleSettings();
        }
      })
      .subscribe();
      
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleServiceClick = (item: { id: string; title: string }) => {
    setSelectedModuleId(item.id);
    sessionStorage.setItem('md_last_module', item.id);
    
    // Se for o mapa, mantém a navegação interna
    if (item.id === 'map-alpha') {
      navigate('/radar');
      return;
    }

    // Redirecionamento para WhatsApp (6132639131)
    const phoneNumber = '556132639131';
    const message = encodeURIComponent(`Olá, gostaria de solicitar o serviço: ${item.title.trim()}.\nHóspede: ${guestName}\nQuarto: ${roomNumber}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const coreServices = [
    { id: '1', title: 'Tabela de Produtos ', action: 'PEDIR AGORA', image: '/SNACKS.webp' },
    { id: '2', title: 'Restaurante', action: 'SOLICITAR PEDIDO', image: '/RESTAURANTE.webp' },
    { id: '3', title: 'Toalha e extras', action: 'SOLICITAR', image: '/TOALHA.webp' },
    { id: '4', title: 'Serviço de Quarto', action: 'ARRUMAÇÃO', image: '/SERVIÇO DE QUARTO.webp' },
    { id: '5', title: 'Lavar e Passar', action: 'SOLICITAR', image: '/FERRO DE PASSAR.webp' },
    { id: '6', title: 'Secador de Cabelo', action: 'SOLICITAR', image: '/SECADOR DE CABELO.webp' },
    { id: '7', title: 'Garagem', action: 'SOLICITAR', image: '/GARAGEM.webp' },
    { id: '8', title: 'Impressão', action: 'SOLICITAR', image: '/impressao.png' },
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
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide">
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
                  <img src="/logo1.png" alt="Alfa Plaza" className="h-12 w-auto object-contain" />
                </div>
                
                <div>
                  <h1 className="text-lg font-bold tracking-widest uppercase leading-tight">{guestName}</h1>
                  <p className="text-[10px] text-gold uppercase tracking-widest font-bold">Quarto {roomNumber}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 z-10">
                  <button 
                    onClick={() => setIsInfoOpen(true)} 
                    className="text-gold border-[0.5px] border-gold p-3 rounded-lg hover:bg-gold/10 transition-colors" 
                    aria-label="Hotel Info"
                  >
                    <Info size={24} />
                  </button>
                  <button 
                    onClick={() => setIsWifiOpen(true)} 
                    className="text-gold border-[0.5px] border-gold p-3 rounded-lg hover:bg-gold/10 transition-colors" 
                    aria-label="Wi-Fi Info"
                  >
                    <Wifi size={24} />
                  </button>
                </div>
              </div>

              {/* Live Announcement Ticker */}
              <AnnouncementTicker />
            </div>

            <div className="space-y-8 mt-4 transition-opacity duration-300 flex-1 px-4" style={{ opacity: hideRestaurant === null ? 0 : 1 }}>
              <div>
                <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-80 flex items-center gap-2">
                  <div className="w-1 h-1 bg-gold rounded-full" />
                  <span className="text-gold">RESTAURANTE E SNACKS</span>
                </h2>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-4" style={{ paddingLeft: 'calc(-100px + 40vw)' }}>
                  {displayedCoreServices.filter(s => ['1', '2'].includes(s.id)).map((item) => (
                    <div key={item.id} className="snap-center shrink-0">
                      <ModuleCard item={item} isSelected={selectedModuleId === item.id} onClick={() => handleServiceClick(item)} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-80 flex items-center gap-2 px-2">
                  <div className="w-1 h-1 bg-gold rounded-full" />
                  <span className="text-gold">TOALHA E SERVIÇO DE QUARTO</span>
                </h2>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-4" style={{ paddingLeft: 'calc(-100px + 40vw)' }}>
                  {displayedCoreServices.filter(s => ['3', '4'].includes(s.id)).map((item) => (
                    <div key={item.id} className="snap-center shrink-0">
                      <ModuleCard item={item} isSelected={selectedModuleId === item.id} onClick={() => handleServiceClick(item)} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-80 flex items-center gap-2 px-2">
                  <div className="w-1 h-1 bg-gold rounded-full" />
                  <span className="text-gold">LAVAR E PASSAR</span>
                </h2>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-4" style={{ paddingLeft: 'calc(-100px + 40vw)' }}>
                  {displayedCoreServices.filter(s => ['5', '6'].includes(s.id)).map((item) => (
                    <div key={item.id} className="snap-center shrink-0">
                      <ModuleCard item={item} isSelected={selectedModuleId === item.id} onClick={() => handleServiceClick(item)} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-80 flex items-center gap-2 px-2">
                  <div className="w-1 h-1 bg-gold rounded-full" />
                  <span className="text-gold">GARAGEM E IMPRESSÃO</span>
                </h2>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-4" style={{ paddingLeft: 'calc(-100px + 40vw)' }}>
                  {displayedCoreServices.find(s => s.id === '7') && (
                    <div className="snap-center shrink-0">
                      <ModuleCard 
                        item={displayedCoreServices.find(s => s.id === '7')!} 
                        isSelected={selectedModuleId === '7'} 
                        onClick={() => handleServiceClick(displayedCoreServices.find(s => s.id === '7')!)} 
                      />
                    </div>
                  )}
                  {displayedCoreServices.find(s => s.id === '8') && (
                    <div className="snap-center shrink-0">
                      <ModuleCard 
                        item={displayedCoreServices.find(s => s.id === '8')!} 
                        isSelected={selectedModuleId === '8'} 
                        onClick={() => handleServiceClick(displayedCoreServices.find(s => s.id === '8')!)} 
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pb-8">
                <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-80 flex items-center gap-2 px-2">
                  <div className="w-1 h-1 bg-gold rounded-full" />
                  <span className="text-gold">ONDE ESTAMOS?</span>
                </h2>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-4" style={{ paddingLeft: 'calc(-100px + 40vw)' }}>
                  {partnerNetwork.map((item) => (
                    <div key={item.id} className="snap-center shrink-0">
                      <ModuleCard item={item} isSelected={selectedModuleId === item.id} onClick={() => handleServiceClick(item)} />
                    </div>
                  ))}
                </div>
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
                className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 w-full max-w-[320px] relative shadow-2xl"
              >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <button 
                onClick={() => setIsInfoOpen(false)}
                className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center space-y-5">
                <div className="bg-gold/20 p-4 rounded-full border border-gold/30">
                  <Info size={28} className="text-gold" />
                </div>
                
                <h2 className="text-lg font-black text-white tracking-[0.15em] uppercase">Informações</h2>
                
                <div className="w-full space-y-3 bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm text-left">
                  
                  <div className="space-y-2">
                    <h3 className="text-gold text-[10px] font-bold uppercase tracking-widest">Check-in / Check-out</h3>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-400">Check-in</span>
                      <span className="text-white font-bold">13:00</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-400">Check-out</span>
                      <span className="text-white font-bold">12:00</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-2 space-y-2">
                    <h3 className="text-gold text-[10px] font-bold uppercase tracking-widest">Café da Manhã</h3>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-400">Seg a Sáb</span>
                      <span className="text-white font-bold">06:00 - 10:00</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-400">Dom e Feriados</span>
                      <span className="text-white font-bold">07:00 - 10:30</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)] animate-pulse" />
                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">Recepção 24 Horas</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)] animate-pulse" />
                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">Quartos p/ Não Fumantes</span>
                  </div>

                </div>

                <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
                  Desejamos uma excelente estadia
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wi-Fi Popup Modal */}
      {isWifiOpen && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 w-full max-w-[320px] relative shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <button 
              onClick={() => setIsWifiOpen(false)}
              className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-gold/20 p-4 rounded-full border border-gold/30">
                <Wifi size={28} className="text-gold" />
              </div>
              
              <h2 className="text-lg font-black text-white tracking-[0.15em] uppercase">Alfa Plaza</h2>
              
              <div className="w-full space-y-3 bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="flex flex-col items-start border-b border-white/10 pb-2">
                  <span className="text-[10px] text-gold/60 uppercase tracking-widest mb-1 font-bold">Rede Premium</span>
                  <span className="font-bold text-white text-base tracking-wide select-all">ALFA_HOSPEDE</span>
                </div>
                
                <div className="flex flex-col items-start pt-2">
                  <span className="text-[10px] text-gold/60 uppercase tracking-widest mb-1 font-bold">Chave de Acesso</span>
                  {hasSavedContact ? (
                    <span className="font-mono font-black text-gold tracking-[0.3em] text-xl select-all animate-pulse">77921207</span>
                  ) : (
                    <span className="text-white/30 font-bold tracking-tighter text-[10px] uppercase bg-black/40 px-3 py-1 rounded border border-white/5 italic">
                      Liberado após salvar contato
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider px-2">
                {hasSavedContact 
                  ? "Experiência digital de alta velocidade exclusiva Alfa Plaza."
                  : "Salve o contato do hotel para visualizar sua chave de acesso VIP."
                }
              </p>

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

              <div className="relative z-10 flex flex-col h-full min-h-0">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md shrink-0">
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
