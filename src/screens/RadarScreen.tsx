import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';
import { 
  Navigation, Menu, Search, X, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
 
import { ESTABELECIMENTOS_RADAR } from '../data/radar_locais';
import type { FeatureCollection, Point } from 'geojson';
import '../styles/Radar.css';

// Configuração global para mobile/touch
mapboxgl.clearStorage(); // Limpa cache para evitar estilos corrompidos

// TOKEN
const INITIAL_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';
mapboxgl.accessToken = INITIAL_TOKEN;

// DATA ENGINE: ESTABELECIMENTOS RADAR (Importado de src/data/radar_locais.ts)
// ID 1 é sempre a referência para cálculo de distância (Alfa Plaza)

// Constante de referência para inicialização do mapa (ID 1)
const HOTEL_COORDS = ESTABELECIMENTOS_RADAR[0].coords;

// Estilos do Mapa
const STYLES = {
  DAY: 'mapbox://styles/mapbox/light-v11', // Mais estável que standard
  NIGHT: 'mapbox://styles/mapbox/dark-v11' // Mais estável e combina com Titanium
};

// Limites do Distrito Federal (Quadrilátero de Elite)
// const DF_BOUNDS = [
//   [-48.35, -16.10], // Sudoeste (Gama / Entorno sul)
//   [-47.25, -15.40]  // Nordeste (Planaltina / Formosa)
// ] as [[number, number], [number, number]];

// CIDADES SATÉLITES (Visão Macro)
const SATELLITE_CITIES: FeatureCollection<Point> = {
  'type': 'FeatureCollection',
  'features': [
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.8825, -15.7942] }, 'properties': { 'title': '📍\nPlano Piloto' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-48.0558, -15.8306] }, 'properties': { 'title': '📍\nTaguatinga' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-48.0258, -15.8394] }, 'properties': { 'title': '📍\nÁguas Claras' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.9800, -15.8200] }, 'properties': { 'title': '📍\nGuará I' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.9900, -15.8300] }, 'properties': { 'title': '📍\nGuará II' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.9664, -15.8710] }, 'properties': { 'title': '📍\nN. Bandeirante' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-48.1102, -15.8197] }, 'properties': { 'title': '📍\nCeilândia' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.8833, -15.8450] }, 'properties': { 'title': '📍\nLago Sul' } },
    
    // NOVAS ADIÇÕES (PEDIDO DO USUÁRIO)
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.9100, -15.8150] }, 'properties': { 'title': '📍\nAsa Sul' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.8800, -15.7600] }, 'properties': { 'title': '📍\nAsa Norte' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-48.0850, -15.8750] }, 'properties': { 'title': '📍\nSamambaia' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.9420, -15.7950] }, 'properties': { 'title': '📍\nCruzeiro' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-48.0650, -15.9050] }, 'properties': { 'title': '📍\nRecanto das Emas' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-48.0150, -15.8800] }, 'properties': { 'title': '📍\nRiacho Fundo' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.9250, -15.7950] }, 'properties': { 'title': '📍\nSudoeste' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.8750, -15.7050] }, 'properties': { 'title': '📍\nVarjão' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.7800, -15.7700] }, 'properties': { 'title': '📍\nParanoá' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.7600, -15.7500] }, 'properties': { 'title': '📍\nItapoã' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-47.8300, -15.8600] }, 'properties': { 'title': '📍\nJardim Botânico' } }
  ]
};

export default function RadarScreen() {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Ref para gerenciar marcadores

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDayMode, setIsDayMode] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  });
  const [mapError, setMapError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introFadeOut, setIntroFadeOut] = useState(false);
  const [accessToken] = useState<string>(INITIAL_TOKEN);

  // Alternância manual de modo dia/noite
  const toggleDayNight = () => {
    if (!map.current) return;
    const newMode = !isDayMode;
    setIsDayMode(newMode);
    const newStyle = newMode ? STYLES.DAY : STYLES.NIGHT;
    map.current.setStyle(newStyle);
    // add3DLayer será chamado pelo evento 'style.load' automaticamente
  };

  // Função para configurar o estilo GAME ENGINE / CINEMATIC REALISM
  const add3DLayer = useCallback((forceMode?: 'day' | 'night') => {
    if (!map.current) return;
    
    const hour = new Date().getHours();
    let isDay = true;

    // LÓGICA DE HORÁRIO (PROTOCOLO ATMOSFERA VIVA)
    if (forceMode) {
      isDay = forceMode === 'day';
    } else {
      if (hour >= 6 && hour < 18) {
        isDay = true;
      } else {
        isDay = false;
      }
    }

    setIsDayMode(isDay);

    // 1. CONFIGURAÇÃO TITANIUM STEALTH (MAPBOX STANDARD - ADAPTADO V11)
    try {
        if ((map.current as any).setConfigProperty) {
            (map.current as any).setConfigProperty('basemap', 'lightPreset', isDay ? 'dawn' : 'night');
            (map.current as any).setConfigProperty('basemap', 'showPointOfInterestLabels', false);
        }
    } catch (e) {
        console.warn('Mapbox config error:', e);
    }

    // 2. ATMOSFERA E HORIZONTE (REQ 4)
    // Fog Chumbo Profundo (#121212) com range [0.5, 5]
    try {
        map.current.setFog({
            'range': [0.5, 5],
            'color': '#121212',
            'horizon-blend': 0.3,
            'high-color': '#202020', 
            'space-color': '#000000',
            'star-intensity': isDay ? 0 : 0.8
        });
    } catch (e) { console.warn('Fog config error:', e); }

    // 3. SKY LAYER (ATMOSPHERE)
    try {
        // Apenas adiciona se não existir e se o estilo suportar (Standard já tem sky, mas reforçamos)
        if (!map.current.getLayer('sky')) {
             map.current.addLayer({
                'id': 'sky',
                'type': 'sky',
                'paint': {
                    'sky-type': 'atmosphere',
                    'sky-atmosphere-sun': [0.0, 0.0], 
                    'sky-atmosphere-sun-intensity': 15
                }
            });
        }
    } catch (e) { console.warn('Sky layer error:', e); }

    // REMOVER POIS NATIVOS E RÓTULOS (LEGACY FALLBACK)
    const layersToHide = [
      'poi-label',
      'settlement-label',
      'settlement-subdivision-label',
      'settlement-minor-label',
      'settlement-major-label',
      'state-label',
      'country-label'
    ];
    
    layersToHide.forEach(layer => {
      if (map.current?.getLayer(layer)) {
        map.current.setPaintProperty(layer, 'text-opacity', 0);
        map.current.setPaintProperty(layer, 'icon-opacity', 0);
      }
    });

    // 4. ADICIONAR MARCADORES DE CIDADES SATÉLITES (VISÃO MACRO)
    try {
      if (!map.current.getSource('satellite-cities')) {
        map.current.addSource('satellite-cities', {
          type: 'geojson',
          data: SATELLITE_CITIES
        });

        map.current.addLayer({
          'id': 'satellite-cities-labels',
          'type': 'symbol',
          'source': 'satellite-cities',
          'maxzoom': 11,
          'minzoom': 9.5,
          'layout': {
            'text-field': ['get', 'title'],
            'text-size': 12,
            'text-anchor': 'center',
            'text-justify': 'center'
          },
          'paint': {
            'text-color': '#ffffff',
            'text-halo-color': '#000000',
            'text-halo-width': 2
          }
        });
      }
    } catch (err) {
      console.warn('Erro ao adicionar satellite-cities:', err);
    }

    // 5. ADICIONAR BORDA ELEGANTE NAS REGIÕES ADMINISTRATIVAS (VISÃO MACRO)
    try {
      if (!map.current.getLayer('admin-boundaries-gold')) {
        const compositeSource = map.current.getSource('composite');
        if (compositeSource) {
          map.current.addLayer({
            'id': 'admin-boundaries-gold',
            'type': 'line',
            'source': 'composite',
            'source-layer': 'admin',
            'filter': ['all', ['==', 'maritime', 0], ['>=', 'admin_level', 2]], 
            'minzoom': 9.5,
            'maxzoom': 11,
            'paint': {
              'line-color': '#D4AF37', // Dourado (Gold)
              'line-width': 1.5,
              'line-opacity': 0.8,
              'line-blur': 0
            }
          });
        }
      }
    } catch (err) {
      console.warn('Erro ao adicionar admin-boundaries-gold:', err);
    }

  }, []); // Dependência isDayMode removida para evitar recriação do mapa

  // TIMER AUTOMÁTICO DE DIA/NOITE
  useEffect(() => {
    // Checa a cada minuto se mudou de turno (dia/noite)
    const interval = setInterval(() => {
      if (!map.current) return;
      
      const hour = new Date().getHours();
      const currentIsDay = hour >= 6 && hour < 18;
      
      // Só muda se o estado for diferente (evita re-renders desnecessários)
      setIsDayMode(prevMode => {
        if (prevMode !== currentIsDay) {
          // Detectou mudança de turno! Atualiza o mapa.
          const newStyle = currentIsDay ? STYLES.DAY : STYLES.NIGHT;
          map.current?.setStyle(newStyle);
          // add3DLayer será rechamado via evento 'style.load'
          return currentIsDay;
        }
        return prevMode;
      });
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, []);

  // Função para inicializar (Hotel + Radar) - FIXAÇÃO ABSOLUTA
  const initMarkers = useCallback(() => {
    if (!map.current) return;

    // Limpar marcadores existentes para evitar duplicação (HMR Friendly)
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // RENDERIZAR TODOS OS PARCEIROS (SEM EXCEÇÃO, SEM CULLING)
    ESTABELECIMENTOS_RADAR.forEach((local) => {
      // Calcular Distância do Hotel
      const hotelLoc = new mapboxgl.LngLat(HOTEL_COORDS[0], HOTEL_COORDS[1]);
      const localLoc = new mapboxgl.LngLat(local.coords[0], local.coords[1]);
      const distance = hotelLoc.distanceTo(localLoc);
      
      const formattedDist = distance < 1000 
        ? `${Math.round(distance)}m` 
        : `${(distance / 1000).toFixed(1)}km`;

      // Criar elemento DOM
      const el = document.createElement('div');
      el.className = 'marker-container';
      el.dataset.id = local.id.toString(); 
      
      // Z-INDEX SUPREMO PARA O HOTEL
      if (local.id === 1) {
        el.style.zIndex = '9999';
        el.classList.add('hotel-only-icon');
      } else {
        el.style.zIndex = '100'; 
        // Entrada sem animação para evitar alterações de opacidade/visibility
      }

      // Renderizar Conteúdo (Emoji + Nome)
      const markerRoot = createRoot(el);
      markerRoot.render(
        <>
          <div className={local.id === 1 ? "poi-emoji-clean" : "poi-emoji filter drop-shadow-lg"}>
            {local.emoji}
          </div>
        </>
      );

      // Popup de Conversão (Obsidian Theme)
      const popup = new mapboxgl.Popup({ 
        offset: [0, -10], // Offset para não cobrir o marcador
        closeButton: false, 
        className: 'obsidian-popup',
        maxWidth: '300px'
      })
      .setHTML(`
        <div class="flex flex-col gap-2 min-w-[200px]">
          <!-- Cabeçalho -->
          <div class="text-left">
            <h3 class="font-bold text-lg text-white leading-tight mb-0.5">${local.nome}</h3>
            <p class="text-xs text-[#D4AF37] font-bold uppercase tracking-wide mb-1">${local.descricao || 'Estabelecimento Parceiro'}</p>
            ${local.horario ? `<p class="text-[10px] text-gray-300 mb-1 flex items-center gap-1">🕒 ${local.horario}</p>` : ''}
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[#FFD700] text-sm tracking-widest">${'★'.repeat(Math.floor(local.avaliacao || 5)).padEnd(5, '☆')}</span>
              <span class="text-[10px] text-gray-400 font-medium">(${local.avaliacao || '5.0'})</span>
              <span class="text-[10px] text-gray-400 font-medium ml-auto border border-gray-700 px-1.5 py-0.5 rounded text-[#D4AF37]">${formattedDist}</span>
            </div>
          </div>

          <!-- Botão de Ação (Gold) -->
          <button 
            onclick="window.open('https://www.google.com/maps/dir/?api=1&origin=${HOTEL_COORDS[1]},${HOTEL_COORDS[0]}&destination=${local.coords[1]},${local.coords[0]}&travelmode=driving', '_blank')"
            class="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-black font-bold text-sm py-3 px-4 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform active:scale-95 flex items-center justify-center gap-2 mt-1"
            style="min-height: 44px; background-color: #D4AF37 !important;"
          >
            <span>IR</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l14 0"></path><path d="M13 18l6 -6"></path><path d="M13 6l6 6"></path></svg>
          </button>
        </div>
      `);

      // Adicionar ao Mapa (Permanência Garantida)
      const marker = new mapboxgl.Marker({ 
        element: el, 
        anchor: local.id === 1 ? 'center' : 'bottom', // Hotel no centro para ficar 'em cima', outros na base
        pitchAlignment: 'viewport', 
        rotationAlignment: 'viewport' 
      })
      .setLngLat(local.coords)
      .setPopup(popup)
      .addTo(map.current!);

      // Rastrear marcador
      markersRef.current.push(marker);
    });
  }, []); // Executa apenas uma vez. Sem re-renders.

  // Inicializar Mapa
  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    // Validação de Segurança e Compatibilidade
    if (!mapboxgl.supported()) {
      setTimeout(() => setMapError('Seu dispositivo não suporta WebGL (necessário para o mapa). Tente desativar o modo de economia de energia.'), 0);
      return;
    }

    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!token || token.trim() === '') {
      setTimeout(() => setMapError('Chave de acesso do mapa não encontrada. Contate o suporte.'), 0);
      console.error('Mapbox Token Missing');
      return;
    }

    const initTimeout = setTimeout(() => {
      try {
        if (!mapContainer.current) return;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: isDayMode ? STYLES.DAY : STYLES.NIGHT,
          center: HOTEL_COORDS,
          zoom: 15.5,
          pitch: 65,
          bearing: -17.6,
          antialias: true,
          attributionControl: false,
          preserveDrawingBuffer: true,
          trackResize: true,
          failIfMajorPerformanceCaveat: false // Permite rodar em dispositivos com GPU limitada
        });

        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
          if (e.error && e.error.message && (e.error.message.includes('Aborted') || e.error.message.includes('Network'))) {
              return;
          }
          setTimeout(() => setMapError('Erro de conexão com o servidor de mapas.'), 0);
        });

        map.current.on('style.load', () => {
          add3DLayer();
          initMarkers();
          
          setTimeout(() => {
            map.current?.resize();
          }, 200); // Delay maior para mobile

          // Watchdog: garantir visibilidade dos ícones em qualquer zoom/movimento
          const ensureIconVisibility = () => {
            markersRef.current.forEach(marker => {
              const element = marker.getElement();
              if (!element) return;
              element.style.opacity = '1';
              element.style.visibility = 'visible';
              element.style.pointerEvents = 'auto';
              const emoji = element.querySelector('.poi-emoji') as HTMLElement | null;
              if (emoji) {
                emoji.style.opacity = '1';
                emoji.style.display = 'flex';
                emoji.style.visibility = 'visible';
                emoji.style.pointerEvents = 'auto';
              }
            });
          };
          map.current?.on('move', ensureIconVisibility);
          map.current?.on('zoom', ensureIconVisibility);
          ensureIconVisibility();
        });

      } catch (err) {
        console.error('Erro fatal ao iniciar mapa:', err);
        setTimeout(() => setMapError('Falha técnica ao carregar o mapa.'), 0);
      }
    }, 500); // Delay maior para estabilização do DOM mobile

    return () => clearTimeout(initTimeout);
  }, [add3DLayer, initMarkers, isDayMode]);

  // Persistência e FlyTo no Style Load
  useEffect(() => {
    if (!map.current) return;

    const handleStyleLoad = () => {
      add3DLayer();
      // Manter a posição atual ou resetar para o Hotel? 
      // Por padrão, ao trocar o estilo, o Mapbox mantém a câmera.
      // Vamos apenas garantir que as camadas sejam refeitas.
    };

    map.current.on('style.load', handleStyleLoad);
    return () => {
      map.current?.off('style.load', handleStyleLoad);
    };
  }, [add3DLayer]);

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
      {showIntro && accessToken && (
        <div className={`map-intro-overlay ${introFadeOut ? 'fade-out' : ''}`}>
          <div 
            className="map-zoom-sequence" 
            style={{ 
              backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-47.9706,-15.8718,2,0/1280x1280?access_token=${accessToken}')` 
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
        <div className="absolute inset-0 z-[200002] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-red-500/10 p-6 rounded-full mb-6 border border-red-500/30">
            <span className="text-5xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Ops! Algo deu errado</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-xs">
            {mapError}
          </p>
          <div className="flex flex-col w-full gap-3 max-w-xs">
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-gold text-black font-black rounded-xl uppercase tracking-widest text-xs shadow-laser active:scale-95 transition-all"
            >
              Tentar Novamente
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-white/5 text-white font-bold rounded-xl uppercase tracking-widest text-xs border border-white/10 active:scale-95 transition-all"
            >
              Recarregar
            </button>
          </div>
          
          {/* Debug Info */}
          <div className="mt-12 opacity-20 text-[8px] text-white font-mono uppercase tracking-[0.2em]">
            Debug: {mapboxgl.supported() ? 'WebGL OK' : 'No WebGL'} | {import.meta.env.VITE_MAPBOX_TOKEN ? 'Token OK' : 'No Token'}
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
        onClick={toggleDayNight}
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
