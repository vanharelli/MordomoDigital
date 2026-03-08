import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { 
  Navigation, Menu, Search, X, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
 
import { ESTABELECIMENTOS_RADAR } from '../data/radar_locais';
import '../styles/Radar.css';

// Configuração global para mobile/touch
try {
  mapboxgl.clearStorage(); 
} catch (e) {
  console.warn('Mapbox clearStorage error:', e);
}

// TOKEN (Sincronizado via .env com Fallback Seguro para Mobile)
const MAP_T = 'pk.eyJ1IjoidmFuaGFyZWxsaSIsImEiOiJjbW1pMDdkdXIwbGFoMnhwemZlNXBzOGFiIn0.';
const MAP_S = '942vAo9L4VdV9tSWAfwl2w';
const INITIAL_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || (MAP_T + MAP_S);
mapboxgl.accessToken = INITIAL_TOKEN;

// DATA ENGINE: ESTABELECIMENTOS RADAR (Importado de src/data/radar_locais.ts)
// ID 1 é sempre a referência para cálculo de distância (Alfa Plaza)

// Estilos do Mapa (Mapbox Standard para Visual 3D Nativo)
const STYLES = {
  STANDARD: 'mapbox://styles/mapbox/standard'
};

const BRASILIA_COORDS: [number, number] = [-47.8825, -15.7942]; // Visão Geral de Brasília
const HOTEL_COORDS = ESTABELECIMENTOS_RADAR[0].coords;

export default function RadarScreen() {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDayMode, setIsDayMode] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  });
  const [mapError, setMapError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introFadeOut, setIntroFadeOut] = useState(false);

  // Função para configurar o estilo GAME ENGINE / CINEMATIC REALISM
  const configureStandardStyle = useCallback(() => {
    if (!map.current) return;
    
    try {
      // 1. CONFIGURAÇÃO MAPBOX STANDARD (3D NATIVO)
      if ((map.current as any).setConfigProperty) {
        // Iluminação Dusk (Crepúsculo) para harmonizar com Obsidian
        (map.current as any).setConfigProperty('basemap', 'lightPreset', 'dusk');
        
        // Ativar Prédios 3D e detalhes realistas
        (map.current as any).setConfigProperty('basemap', 'showPointOfInterestLabels', false);
        (map.current as any).setConfigProperty('basemap', 'showRoadLabels', true);
        (map.current as any).setConfigProperty('basemap', 'showTransitLabels', true);
      }

      // 2. ZOOM DIVE (FLYTO) - De Brasília para o Hotel
      map.current.flyTo({
        center: HOTEL_COORDS,
        zoom: 17,
        pitch: 60,
        bearing: -15,
        speed: 0.5,
        curve: 1,
        essential: true
      });

    } catch (e) {
      console.warn('Mapbox Standard config error:', e);
    }
  }, []);

  // Inicializar Mapa
  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) { return false; }
    };

    if (!checkWebGL()) {
      setMapError('Dispositivo incompatível com WebGL.');
      return;
    }

    const token = INITIAL_TOKEN;
    if (!token) {
      setMapError('Token Mapbox ausente.');
      return;
    }

    const initTimeout = setTimeout(() => {
      try {
        if (!mapContainer.current) return;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: STYLES.STANDARD,
          center: BRASILIA_COORDS, // Inicia em Brasília para o efeito Dive
          zoom: 10,
          pitch: 0,
          bearing: 0,
          antialias: false,
          attributionControl: false
        });

        map.current.on('style.load', () => {
          configureStandardStyle();
          initMarkers();
          
          setTimeout(() => map.current?.resize(), 300);
        });

        map.current.on('error', (e) => {
          console.warn('Mapbox error:', e);
          if (e.error?.message?.includes('unauthorized')) {
            setMapError('Token inválido.');
          }
        });

      } catch (err: any) {
        setMapError(`Erro: ${err.message}`);
      }
    }, 100);

    return () => clearTimeout(initTimeout);
  }, [configureStandardStyle]);

  // Marcadores de Elite (Alfa Plaza com Pulse Gold + 3D Simplified + Rótulos Dinâmicos)
  const initMarkers = useCallback(() => {
    if (!map.current) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    ESTABELECIMENTOS_RADAR.forEach((local) => {
      const el = document.createElement('div');
      el.className = 'marker-container';
      
      // Estilização Específica do Hotel (Pulsar Dourado)
      if (local.id === 1) {
        el.innerHTML = `
          <div class="hotel-marker-pulse">
            <div class="pulse-ring"></div>
            <div class="hotel-pin-gold">📍</div>
            <div class="poi-dynamic-label active">${local.nome}</div>
          </div>
        `;
        el.style.zIndex = '1000';
      } else {
        // Marcadores 3D Simplificados
        const isElite = [14, 15, 23].includes(local.id);
        el.innerHTML = `
          <div class="poi-3d-marker ${isElite ? 'elite-poi' : ''}">
            <span class="poi-emoji-3d">${local.emoji}</span>
            <div class="poi-dynamic-label">${local.nome}</div>
          </div>
        `;
      }

      const popup = new mapboxgl.Popup({ offset: [0, -10], closeButton: false, className: 'obsidian-popup' })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-bold text-white">${local.nome}</h3>
            <p class="text-[10px] text-gold uppercase">${local.descricao}</p>
          </div>
        `);

      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat(local.coords)
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });

    // Watchdog de Zoom para Rótulos (Aparecem apenas em Zoom aproximado)
    const updateLabels = () => {
      if (!map.current) return;
      const zoom = map.current.getZoom();
      
      // Seleciona todos os rótulos dinâmicos via DOM (Mapbox markers estão fora do ciclo React)
      const labels = document.querySelectorAll('.poi-dynamic-label');
      
      labels.forEach(label => {
        const isHotelLabel = label.parentElement?.classList.contains('hotel-marker-pulse');
        
        // Regra: Hotel sempre visível. Outros apenas com Zoom > 16.2
        if (isHotelLabel) {
          label.classList.add('active');
          return;
        }

        if (zoom > 16.2) {
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      });
    };

    map.current.on('zoom', updateLabels);
    map.current.on('move', updateLabels); // Garante atualização em qualquer movimento
    
    // Pequeno delay para garantir que o DOM dos marcadores foi injetado pelo Mapbox
    setTimeout(updateLabels, 500);
  }, []);

  // Persistência e FlyTo no Style Load
  useEffect(() => {
    if (!map.current) return;

    const handleStyleLoad = () => {
      configureStandardStyle();
      // Manter a posição atual ou resetar para o Hotel? 
      // Por padrão, ao trocar o estilo, o Mapbox mantém a câmera.
      // Vamos apenas garantir que as camadas sejam refeitas.
    };

    map.current.on('style.load', handleStyleLoad);
    return () => {
      map.current?.off('style.load', handleStyleLoad);
    };
  }, [configureStandardStyle]);

  const flyToLocation = (coords: [number, number]) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: coords,
      zoom: 18,
      pitch: 60,
      bearing: Math.random() * 40 - 20,
      speed: 1.2,
      curve: 1
    });
  };

  // EFEITOS VISUAIS - HUD (Refinado para TITANIUM)
  const hudBg = isDayMode ? 'bg-white/5' : 'bg-black/10'; // Transparência extrema (5% dia, 10% noite)
  const hudTextMain = isDayMode ? 'text-gray-950' : 'text-white'; // Preto absoluto no dia para máximo contraste
  const hudTextSub = isDayMode ? 'text-gray-900' : 'text-gray-100'; 
  const borderHighlight = isDayMode ? 'border-yellow-600/50' : 'border-white/5'; // Borda dourada no dia
  const itemHover = isDayMode ? 'hover:bg-yellow-500/10' : 'hover:bg-white/5'; // Hover dourado no dia

  return (
    <div className={`w-full h-full relative overflow-hidden font-sans transition-colors duration-500 ${isDayMode ? 'bg-gray-100' : 'bg-gray-900'}`}>
      
      {/* NAVEGAÇÃO SATÉLITE ELITE (INTRO) */}
      {showIntro && INITIAL_TOKEN && (
        <div className={`map-intro-overlay ${introFadeOut ? 'fade-out' : ''}`}>
          <div 
            className="map-zoom-sequence" 
            style={{ 
              backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-47.9706,-15.8718,2,0/1280x1280?access_token=${INITIAL_TOKEN}')` 
            }}
            onAnimationEnd={() => {
              setIntroFadeOut(true);
              setTimeout(() => setShowIntro(false), 500);
            }} 
          />
          
          {/* Overlay do Brasil Dourado (Simulado via SVG sobre o zoom) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-1/2 h-1/2 border-2 border-gold/30 rounded-full animate-pulse blur-2xl" />
          </div>
        </div>
      )}

      {/* MAPA */}
      <div ref={mapContainer} className="w-full h-full absolute top-0 left-0 z-0" />

      {/* FILTRO CINEMATOGRÁFICO DINÂMICO */}
      {/* Dia: Dourado Sutil (Calor) | Noite: Azul Noturno (Frio/Cyber) */}
      <div className={`absolute inset-0 pointer-events-none z-10 mix-blend-overlay transition-colors duration-1000 ${
        isDayMode 
          ? 'opacity-20 bg-yellow-600' 
          : 'opacity-40 bg-blue-900'
      }`}></div>

      {/* ERROR ALERT */}
      {mapError && (
        <div className="absolute inset-0 z-[200002] bg-[#000] backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-red-500/10 p-6 rounded-full mb-6 border border-red-500/30">
            <span className="text-5xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Ops! Algo deu errado</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-xs">
            {mapError}
          </p>
          <div className="flex flex-col w-full gap-3 max-w-xs">
            <button 
              onClick={() => {
                setMapError(null);
                window.location.reload();
              }}
              className="w-full py-4 bg-[#D4AF37] text-black font-black rounded-xl uppercase tracking-widest text-xs shadow-laser active:scale-95 transition-all"
            >
              Tentar Novamente
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 bg-white/5 text-white font-bold rounded-xl uppercase tracking-widest text-xs border border-white/10 active:scale-95 transition-all"
            >
              Voltar ao Início
            </button>
          </div>
          
          {/* Debug Info (Aprimorado) */}
          <div className="mt-12 opacity-40 text-[9px] text-white font-mono uppercase tracking-[0.2em] space-y-1">
            <p>WebGL: {mapboxgl.supported() ? 'OK' : 'Falha'}</p>
            <p>Token: {import.meta.env.VITE_MAPBOX_TOKEN ? 'Carregado' : 'Ausente'}</p>
            <p>Modo: {window.innerWidth < 768 ? 'Mobile' : 'Desktop'}</p>
          </div>
        </div>
      )}

      {/* CONTROLES SUPERIORES */}
      <div className="absolute left-4 z-[200001] flex items-center gap-3 top-6 sm:left-6 sm:gap-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className={`p-3 sm:p-4 shadow-lg border rounded-full transition-all hover:scale-105 active:scale-95 ${isDayMode ? 'bg-white/90 text-yellow-600 border-yellow-500 shadow-yellow-500/20' : 'bg-gray-800 text-gray-300 border-gray-700'}`}
          title="Voltar ao Dashboard"
        >
          <ArrowLeft size={24} />
        </button>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-3 sm:p-4 shadow-lg border rounded-full transition-all hover:scale-105 active:scale-95 ${isDayMode ? 'bg-white/90 text-yellow-600 border-yellow-500 shadow-yellow-500/20' : 'bg-gray-800 text-gray-300 border-gray-700'}`}
          title="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* SIDEBAR - GLASSMORPHISM FROST */}
      <div className={`absolute top-0 left-0 h-full w-full sm:w-80 z-[200000] backdrop-blur-2xl shadow-2xl transform transition-all duration-500 cubic-bezier(0.25, 1, 0.5, 1) ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${hudBg} ${borderHighlight} border-r`}>
        <div className="h-full overflow-y-auto p-6 pt-20 pb-24">
          
          {/* HEADER */}
          <div className={`mb-8 border-b pb-6 text-center ${isDayMode ? 'border-yellow-600/30' : 'border-gray-800'}`}>
            <h1 className={`font-bold text-xl leading-tight ${hudTextMain} ${isDayMode ? 'text-yellow-700' : ''}`}>Mordomo Digital</h1>
            <p className={`text-sm font-medium mt-2 ${hudTextSub} ${isDayMode ? 'text-yellow-600' : ''}`}>Alfa Plaza Hotel</p>
          </div>

          <button 
            onClick={() => {
              flyToLocation(HOTEL_COORDS);
              if (window.innerWidth < 640) setIsSidebarOpen(false);
            }}
            className="mb-8 w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 transform hover:-translate-y-0.5 active:scale-95"
          >
            <Navigation size={20} />
            Voltar para o Hotel
          </button>

          {/* LISTA DE POIs */}
          <div className="space-y-6">
            <h2 className={`text-xs font-bold uppercase tracking-wider opacity-70 ${hudTextSub}`}>
              Explorar Região
            </h2>

            {/* INPUT DE BUSCA */}
            <div className={`relative flex items-center ${isDayMode ? 'bg-yellow-500/10 border-yellow-600/30' : 'bg-black/30 border-white/5'} rounded-lg border`}>
              <Search size={16} className={`absolute left-3 ${isDayMode ? 'text-yellow-600' : 'text-gray-400'}`} />
              <input 
                type="text" 
                placeholder="Buscar locais..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-transparent pl-10 pr-4 py-3 text-sm font-medium outline-none ${isDayMode ? 'text-yellow-900 placeholder-yellow-700/50' : 'text-white placeholder-opacity-50 placeholder-current'}`}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className={`absolute right-3 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 ${isDayMode ? 'text-yellow-600' : 'text-gray-400'}`}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="space-y-2">
              {ESTABELECIMENTOS_RADAR
                .filter(local => local.id !== 1) // Remove o Hotel da lista (já tem botão dedicado)
                .filter(local => {
                  if (!searchTerm) return true;
                  const term = searchTerm.toLowerCase();
                  return (
                    local.nome.toLowerCase().includes(term) || 
                    local.categoria.toLowerCase().includes(term) ||
                    (local.descricao && local.descricao.toLowerCase().includes(term))
                  );
                })
                .map((local) => {
                const isUtility = ['banco', 'juridico', 'taxi', 'transporte'].includes(local.categoria);
                
                // CORES DOS ÍCONES (Adaptado para Golden Mode no Dia)
                let colorClass = isUtility 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-orange-100 text-orange-600';
                
                if (isDayMode) {
                  colorClass = isUtility
                    ? 'bg-yellow-100 text-yellow-700' // Utilitários viram Ouro Claro
                    : 'bg-yellow-200 text-yellow-800'; // Comércios viram Ouro Escuro
                }

                // Calcular Distância na Lista
                const hotelLoc = new mapboxgl.LngLat(HOTEL_COORDS[0], HOTEL_COORDS[1]);
                const localLoc = new mapboxgl.LngLat(local.coords[0], local.coords[1]);
                const distance = hotelLoc.distanceTo(localLoc);
                const formattedDist = distance < 1000 
                  ? `${Math.round(distance)}m` 
                  : `${(distance / 1000).toFixed(1)}km`;

                return (
                  <button
                    key={local.id}
                    onClick={() => {
                      flyToLocation(local.coords);
                      if (window.innerWidth < 640) setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${itemHover} ${isDayMode ? 'text-yellow-900 border border-yellow-500/30 hover:border-yellow-500/60' : hudTextMain} text-left group`}
                  >
                    <div className={`p-2 rounded-lg ${colorClass} group-hover:scale-110 transition-transform text-xl shadow-sm ${isDayMode ? 'shadow-yellow-500/10' : ''}`}>
                      {local.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className={`font-bold text-sm leading-tight ${isDayMode ? 'text-yellow-800' : ''}`}>{local.nome}</p>
                        <span className={`text-[10px] font-mono opacity-60 px-1.5 py-0.5 rounded ${isDayMode ? 'bg-yellow-500/10 text-yellow-800' : 'bg-black/10 dark:bg-white/10'}`}>{formattedDist}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className={`text-xs opacity-60 capitalize ${isDayMode ? 'text-yellow-700' : ''}`}>{local.categoria}</p>
                        {local.horario && <span className={`text-[10px] opacity-80 font-medium ${isDayMode ? 'text-yellow-700' : ''}`}>{local.horario}</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* MODO DIA/NOITE (CLICÁVEL) */}
      <button 
        onClick={() => {
          if (!map.current) return;
          const newMode = !isDayMode;
          setIsDayMode(newMode);
          try {
            (map.current as any).setConfigProperty('basemap', 'lightPreset', newMode ? 'dawn' : 'night');
          } catch (e) { console.warn(e); }
        }}
        className={`absolute right-4 z-10 shadow-lg text-xs font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 border transition-all duration-500 top-6 sm:right-6 hover:scale-105 active:scale-95 ${isDayMode ? 'bg-white text-gray-600 border-gray-100' : 'bg-gray-800 text-gray-300 border-gray-700'}`}
        title={`Alternar para modo ${isDayMode ? 'Noite' : 'Dia'}`}
      >
        <div className={`w-2 h-2 rounded-full ${isDayMode ? 'bg-yellow-500' : 'bg-blue-400'} animate-pulse`}></div>
        <span className="hidden sm:inline">{isDayMode ? 'Modo Dia (Ao Vivo)' : 'Modo Noite (Ao Vivo)'}</span>
        <span className="sm:hidden">{isDayMode ? 'Dia' : 'Noite'}</span>
      </button>

    </div>
  );
}
