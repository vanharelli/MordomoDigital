// src/data/radar_locais.ts

export interface RadarLocal {
  id: number;
  nome: string;
  emoji: string;
  coords: [number, number];
  categoria: string;
  avaliacao: number;
  descricao: string;
  horario?: string;
}

// ESTRUTURA DE ELITE - NÚCLEO BANDEIRANTE
export const ESTABELECIMENTOS_RADAR: RadarLocal[] = [
  { 
    id: 1, 
    nome: "ALFA PLAZA HOTEL", 
    emoji: "📍", 
    coords: [-47.970651, -15.871861], 
    categoria: "hotel", 
    avaliacao: 4.8,
    descricao: "Voce esta aqui",
    horario: "24h"
  },
  { 
    id: 14, 
    nome: "AEROPORTO DE BRASÍLIA", 
    emoji: "✈️", 
    coords: [-47.9186, -15.8711], 
    categoria: "transporte", 
    avaliacao: 4.8,
    descricao: "Aeroporto Internacional J.K.",
    horario: "24h"
  },
  { 
    id: 15, 
    nome: "RODOVIÁRIA INTERESTADUAL", 
    emoji: "🚌", 
    coords: [-47.949569, -15.830288], 
    categoria: "transporte", 
    avaliacao: 4.2,
    descricao: "Terminal Interestadual de Brasília",
    horario: "24h"
  },
  { 
    id: 16, 
    nome: "HOLLYWOOD PÃES", 
    emoji: "🥖", 
    coords: [-47.970298, -15.871575], 
    categoria: "padaria", 
    avaliacao: 4.6,
    descricao: "Padaria e Conveniência",
    horario: "06:00 - 22:00"
  },
  { 
    id: 17, 
    nome: "ICEBERG HOT DOG", 
    emoji: "🌭", 
    coords: [-47.970773, -15.871547], 
    categoria: "lanche", 
    avaliacao: 4.5,
    descricao: "Tradicional Hot Dog de Brasília",
    horario: "18:00 - 00:00"
  },
  { 
    id: 18, 
    nome: "PIZZARIA IGGLUS", 
    emoji: "🍕", 
    coords: [-47.968178, -15.869387], 
    categoria: "restaurante", 
    avaliacao: 4.4,
    descricao: "Pizzas e Pratos Executivos",
    horario: "18:00 - 23:00"
  },
  { 
    id: 19, 
    nome: "BANCO SANTANDER", 
    emoji: "🏦", 
    coords: [-47.968520, -15.870108], 
    categoria: "banco", 
    avaliacao: 4.3,
    descricao: "Agência Núcleo Bandeirante",
    horario: "10:00 - 16:00"
  },
  { 
    id: 20, 
    nome: "RESTAURANTE COMA BEM", 
    emoji: "🍽️", 
    coords: [-47.968352, -15.870072], 
    categoria: "restaurante", 
    avaliacao: 4.5,
    descricao: "Comida Caseira e Variada",
    horario: "11:00 - 15:00"
  },
  { 
    id: 21, 
    nome: "TEXXAS BAR", 
    emoji: "🍻", 
    coords: [-47.966406, -15.866193], 
    categoria: "bar", 
    avaliacao: 4.4,
    descricao: "Bar, Música e Petiscos",
    horario: "17:00 - 02:00"
  },
  { 
    id: 22, 
    nome: "PONTO DE TÁXI", 
    emoji: "🚖", 
    coords: [-47.965213, -15.868455], 
    categoria: "transporte", 
    avaliacao: 4.8,
    descricao: "Ponto de Táxi Bandeirante",
    horario: "24h"
  },
  { 
    id: 23, 
    nome: "FEIRA PERMANENTE", 
    emoji: "🏪", 
    coords: [-47.965445, -15.872089], 
    categoria: "compras", 
    avaliacao: 4.6,
    descricao: "Tradicional Feira do Núcleo Bandeirante",
    horario: "08:00 - 18:00"
  },
  { 
    id: 24, 
    nome: "PARAÍBA CARNE DE SOL", 
    emoji: "🥩", 
    coords: [-47.972916, -15.869585], 
    categoria: "restaurante", 
    avaliacao: 4.5,
    descricao: "Tradicional Carne de Sol Nordestina",
    horario: "11:00 - 23:00"
  },
  { 
    id: 25, 
    nome: "TOCA DO PEIXE", 
    emoji: "🐟", 
    coords: [-47.974242, -15.870150], 
    categoria: "restaurante", 
    avaliacao: 4.5,
    descricao: "Especialidade em Peixes",
    horario: "11:00 - 23:00"
  },
  { 
    id: 26, 
    nome: "VENITALIA PÃES & GASTRONOMIA", 
    emoji: "🥐", 
    coords: [-47.972103, -15.872474], 
    categoria: "padaria", 
    avaliacao: 4.7,
    descricao: "Padaria e Gastronomia Artesanal",
    horario: "06:00 - 22:00"
  },
  { 
    id: 27, 
    nome: "11ª DELEGACIA DE POLÍCIA", 
    emoji: "🚓", 
    coords: [-47.967211, -15.870237], 
    categoria: "segurança", 
    avaliacao: 4.5,
    descricao: "Polícia Civil do DF",
    horario: "24h"
  },
  { 
    id: 28, 
    nome: "NÚCLEO DA FÉ", 
    emoji: "⛪", 
    coords: [-47.970529, -15.868121], 
    categoria: "religioso", 
    avaliacao: 4.8,
    descricao: "Igreja Evangélica",
    horario: "08:00 - 20:00"
  },
  { 
    id: 30, 
    nome: "BURGER KING", 
    emoji: "🍔", 
    coords: [-47.972256, -15.869332], 
    categoria: "lanche", 
    avaliacao: 4.4,
    descricao: "Fast Food Burger King",
    horario: "11:00 - 23:00"
  },
  { 
    id: 31, 
    nome: "FOGÃO GOIANO", 
    emoji: "🥘", 
    coords: [-47.969828, -15.874305], 
    categoria: "restaurante", 
    avaliacao: 4.6,
    descricao: "Comida Goiana Tradicional",
    horario: "11:00 - 15:00"
  },
  { 
    id: 32, 
    nome: "PRAÇA PADRE ROQUE", 
    emoji: "🌳", 
    coords: [-47.966628, -15.871776], 
    categoria: "lazer", 
    avaliacao: 4.7,
    descricao: "Praça Padre Roque",
    horario: "24h"
  },
  { 
    id: 33, 
    nome: "VAREJÃO DA FARTURA", 
    emoji: "🥬", 
    coords: [-47.968773, -15.870211], 
    categoria: "mercado", 
    avaliacao: 4.5,
    descricao: "Hortifruti e Mercearia",
    horario: "07:00 - 20:00"
  },
  { 
    id: 34, 
    nome: "MARANATHA SORVETES", 
    emoji: "🍦", 
    coords: [-47.965145, -15.867929], 
    categoria: "lanche", 
    avaliacao: 4.6,
    descricao: "Sorvetes e Sobremesas",
    horario: "10:00 - 22:00"
  },
  { 
    id: 35, 
    nome: "POSTO SHELL", 
    emoji: "⛽", 
    coords: [-47.962102, -15.865050], 
    categoria: "transporte", 
    avaliacao: 4.5,
    descricao: "Posto de Combustível",
    horario: "24h"
  },
  { 
    id: 36, 
    nome: "EASYTECH", 
    emoji: "💻", 
    coords: [-47.972277, -15.873003], 
    categoria: "serviço", 
    avaliacao: 4.8,
    descricao: "Assistência Técnica e Informática",
    horario: "08:00 - 18:00"
  },
  { 
    id: 37, 
    nome: "POSTO PETROBRAS", 
    emoji: "⛽", 
    coords: [-47.974030, -15.870506], 
    categoria: "transporte", 
    avaliacao: 4.4,
    descricao: "Posto de Combustível e Conveniência",
    horario: "24h"
  },
  { 
    id: 38, 
    nome: "POSTO PETROBRAS", 
    emoji: "⛽", 
    coords: [-47.973151, -15.872095], 
    categoria: "transporte", 
    avaliacao: 4.5,
    descricao: "Posto de Combustível",
    horario: "24h"
  },
  { 
    id: 39, 
    nome: "POSTO SHELL", 
    emoji: "⛽", 
    coords: [-47.962845, -15.866911], 
    categoria: "transporte", 
    avaliacao: 4.5,
    descricao: "Posto de Combustível",
    horario: "24h"
  },
  { 
    id: 40, 
    nome: "POSTO SÃO MARCOS", 
    emoji: "⛽", 
    coords: [-47.972362, -15.869522], 
    categoria: "transporte", 
    avaliacao: 4.5,
    descricao: "Posto de Combustível",
    horario: "24h"
  },
  { 
    id: 41, 
    nome: "RESTAURANTE CIDADE LIVRE", 
    emoji: "🍽️", 
    coords: [-47.973129, -15.869461], 
    categoria: "restaurante", 
    avaliacao: 4.6,
    descricao: "Comida Caseira e Self-service",
    horario: "11:00 - 15:00"
  },
  { 
    id: 42, 
    nome: "PANIFICADORA TRIGOIAS", 
    emoji: "🥖", 
    coords: [-47.962516, -15.868099], 
    categoria: "padaria", 
    avaliacao: 4.5,
    descricao: "Padaria e Confeitaria",
    horario: "06:00 - 22:00"
  },
  { 
    id: 43, 
    nome: "CARTÓRIO 1º OFÍCIO", 
    emoji: "📜", 
    coords: [-47.959749, -15.866128], 
    categoria: "serviço", 
    avaliacao: 4.0,
    descricao: "Notas e Registro Civil",
    horario: "09:00 - 17:00"
  },
  { 
    id: 44, 
    nome: "FÓRUM DES. HUGO AULER", 
    emoji: "⚖️", 
    coords: [-47.960826, -15.8688209], 
    categoria: "serviço", 
    avaliacao: 4.8, 
    descricao: "Fórum de Núcleo Bandeirante - TJDFT",
    horario: "12:00 - 19:00"
  },
  { 
    id: 45, 
    nome: "6º GRUPAMENTO DE BOMBEIROS", 
    emoji: "🚒", 
    coords: [-47.962433, -15.868792], 
    categoria: "serviço", 
    avaliacao: 4.8,
    descricao: "Corpo de Bombeiros Militar",
    horario: "24h"
  },
  { 
    id: 46, 
    nome: "RESTAURANTE CASA AMARELA", 
    emoji: "🍽️", 
    coords: [-47.974293, -15.868340], 
    categoria: "restaurante", 
    avaliacao: 4.5,
    descricao: "Restaurante Brasileiro",
    horario: "11:00 - 15:00"
  },
  { 
    id: 47, 
    nome: "REDE SARAH", 
    emoji: "🏥", 
    coords: [-47.830627, -15.752716], 
    categoria: "saúde", 
    avaliacao: 4.9,
    descricao: "Hospital de Reabilitação",
    horario: "24h"
  },
  { 
    id: 48, 
    nome: "CATEDRAL METROPOLITANA", 
    emoji: "⛪", 
    coords: [-47.875547, -15.798297], 
    categoria: "turístico", 
    avaliacao: 4.8,
    descricao: "Monumento Arquitetônico de Brasília",
    horario: "08:00 - 18:00"
  },
  { 
    id: 49, 
    nome: "ESPLANADA DOS MINISTÉRIOS", 
    emoji: "🏛️", 
    coords: [-47.875149, -15.796260], 
    categoria: "turístico", 
    avaliacao: 4.8,
    descricao: "Centro do Poder Executivo Federal",
    horario: "09:00 - 18:00"
  },
  { 
    id: 50, 
    nome: "RODOVIÁRIA DO PLANO PILOTO", 
    emoji: "🚌", 
    coords: [-47.882539, -15.793138], 
    categoria: "transporte", 
    avaliacao: 4.5,
    descricao: "Terminal Central de Brasília",
    horario: "24h"
  },
  { 
    id: 51, 
    nome: "BRASÍLIA SHOPPING", 
    emoji: "🛍️", 
    coords: [-47.889259, -15.786650], 
    categoria: "compras", 
    avaliacao: 4.6,
    descricao: "Centro Comercial e Gastronômico",
    horario: "10:00 - 22:00"
  },
  { 
    id: 52, 
    nome: "PÁTIO BRASIL SHOPPING", 
    emoji: "🛍️", 
    coords: [-47.892009, -15.796035], 
    categoria: "compras", 
    avaliacao: 4.5,
    descricao: "Shopping Tradicional de Brasília",
    horario: "10:00 - 22:00"
  },
  { 
    id: 53, 
    nome: "MEMORIAL JK", 
    emoji: "🏛️", 
    coords: [-47.913354, -15.784206], 
    categoria: "turístico", 
    avaliacao: 4.8,
    descricao: "Museu e Mausoléu de Juscelino Kubitschek",
    horario: "09:00 - 18:00"
  },
  { 
    id: 54, 
    nome: "MUSEU NACIONAL", 
    emoji: "🏛️", 
    coords: [-47.878135, -15.797306], 
    categoria: "turístico", 
    avaliacao: 4.8,
    descricao: "Museu Nacional da República",
    horario: "09:00 - 18:30"
  },
  { 
    id: 55, 
    nome: "ORDINÁRIO BAR", 
    emoji: "🍻", 
    coords: [-47.881959, -15.800619], 
    categoria: "bar", 
    avaliacao: 4.5,
    descricao: "Bar, Música e Petiscos",
    horario: "17:00 - 02:00"
  },
  { 
    id: 56, 
    nome: "SHOPPING PIER 21", 
    emoji: "🛍️", 
    coords: [-47.874611, -15.818373], 
    categoria: "compras", 
    avaliacao: 4.6,
    descricao: "Shopping Center à Beira do Lago",
    horario: "10:00 - 22:00"
  },
  { 
    id: 57, 
    nome: "PONTÃO DO LAGO SUL", 
    emoji: "⛵", 
    coords: [-47.873441, -15.826346], 
    categoria: "turístico", 
    avaliacao: 4.8,
    descricao: "Complexo de Lazer e Gastronomia",
    horario: "10:00 - 23:00"
  },
  {
    id: 59,
    nome: "RESTAURANTE IMPERIAL",
    emoji: "🍽️",
    coords: [-47.965496, -15.869509],
    categoria: "restaurante",
    avaliacao: 4.6,
    descricao: "Culinária Tradicional",
    horario: "11:00 - 15:00"
  },
  {
    id: 60,
    nome: "ACADEMIA BLACKFIT",
    emoji: "💪",
    coords: [-47.964949, -15.869870],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Centro Fitness",
    horario: "06:00 - 23:00"
  },
  {
    id: 61,
    nome: "LIVRARIA E PAPELARIA FLÓRIDA",
    emoji: "📚",
    coords: [-47.967716, -15.870147],
    categoria: "compras",
    avaliacao: 4.5,
    descricao: "Materiais e Livros",
    horario: "08:00 - 18:00"
  },
  {
    id: 62,
    nome: "CAIXA ECONÔMICA FEDERAL",
    emoji: "🏦",
    coords: [-47.966119, -15.869418],
    categoria: "servico",
    avaliacao: 4.2,
    descricao: "Agência Bancária",
    horario: "10:00 - 16:00"
  },
  {
    id: 63,
    nome: "BANCO BRADESCO",
    emoji: "🏦",
    coords: [-47.964859, -15.868798],
    categoria: "servico",
    avaliacao: 4.3,
    descricao: "Agência Bancária",
    horario: "10:00 - 16:00"
  },
  {
    id: 64,
    nome: "BANCO ITAÚ",
    emoji: "🏦",
    coords: [-47.964630, -15.868685],
    categoria: "servico",
    avaliacao: 4.4,
    descricao: "Agência Bancária",
    horario: "10:00 - 16:00"
  },
  {
    id: 65,
    nome: "BANCO DO BRASIL",
    emoji: "🏦",
    coords: [-47.966463, -15.869093],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Agência Núcleo Bandeirante",
    horario: "10:00 - 16:00"
  },
  {
    id: 66,
    nome: "TITANIC HOTDOG",
    emoji: "🌭",
    coords: [-47.966290, -15.868253],
    categoria: "lanche",
    avaliacao: 4.7,
    descricao: "O Oficial - Hot Dog Tradicional",
    horario: "17:00 - 23:00"
  },
  {
    id: 67,
    nome: "RESTAURANTE PAULISTA",
    emoji: "🍽️",
    coords: [-47.965664, -15.868185],
    categoria: "restaurante",
    avaliacao: 4.5,
    descricao: "Tradição e Sabor Caseiro",
    horario: "11:00 - 15:00"
  },
  {
    id: 68,
    nome: "FORMIGAS LANCHES DODÔ",
    emoji: "🍔",
    coords: [-47.972063, -15.873552],
    categoria: "lanche",
    avaliacao: 4.6,
    descricao: "Lanches e Petiscos",
    horario: "17:00 - 23:00"
  },
  {
    id: 69,
    nome: "BACCANO COZINHA & BAR",
    emoji: "🍽️",
    coords: [-47.966508, -15.870786],
    categoria: "restaurante",
    avaliacao: 4.8,
    descricao: "Cozinha Contemporânea & Bar",
    horario: "18:00 - 00:00"
  },
  {
    id: 70,
    nome: "DUDU CELL",
    emoji: "📱",
    coords: [-47.966405, -15.869863],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Acessórios e Assistência Técnica",
    horario: "09:00 - 19:00"
  },
  {
    id: 71,
    nome: "POSTO DE SAÚDE",
    emoji: "🏥",
    coords: [-47.965682, -15.870377],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Unidade Básica de Saúde",
    horario: "07:00 - 18:00"
  },
  {
    id: 72,
    nome: "MYX BEER",
    emoji: "🍺",
    coords: [-47.971027, -15.871899],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Distribuidora de Bebidas",
    horario: "10:00 - 22:00"
  },
  {
    id: 73,
    nome: "KI PÃO DE QUEIJO",
    emoji: "🧀",
    coords: [-47.971184, -15.872533],
    categoria: "lanche",
    avaliacao: 4.6,
    descricao: "Lanches e Pães de Queijo",
    horario: "07:00 - 20:00"
  },
  {
    id: 74,
    nome: "NUUH12 DISTRIBUIDORA",
    emoji: "🍾",
    coords: [-47.970291, -15.872046],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Distribuidora e Tabacaria",
    horario: "14:00 - 00:00"
  },
  {
    id: 75,
    nome: "NALVA & LEIA",
    emoji: "💇‍♀️",
    coords: [-47.971434, -15.872391],
    categoria: "servico",
    avaliacao: 4.7,
    descricao: "Salão de Beleza",
    horario: "09:00 - 19:00"
  },
  {
    id: 76,
    nome: "BELEZA PLENA",
    emoji: "💅",
    coords: [-47.969914, -15.871544],
    categoria: "servico",
    avaliacao: 4.9,
    descricao: "Esmalteria e Salão",
    horario: "09:00 - 19:00"
  },
  {
    id: 77,
    nome: "LF BORRACHARIA",
    emoji: "🔧",
    coords: [-47.972962, -15.872500],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Serviços Automotivos",
    horario: "08:00 - 18:00"
  },
  {
    id: 78,
    nome: "BIKE & MOTOS",
    emoji: "🚲",
    coords: [-47.963132, -15.868031],
    categoria: "servico",
    avaliacao: 4.6,
    descricao: "Oficina de Bicicletas e Motos",
    horario: "08:00 - 18:00"
  },
  {
    id: 79,
    nome: "EPLACE GRÁFICA",
    emoji: "🖨️",
    coords: [-47.965744, -15.868299],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Copiadora e Gráfica Rápida",
    horario: "09:00 - 18:00"
  },
  {
    id: 80,
    nome: "MERCADO NÚCLEO BANDEIRANTE",
    emoji: "🏪",
    coords: [-47.968282, -15.870956],
    categoria: "loja",
    avaliacao: 4.5,
    descricao: "Mercado Tradicional",
    horario: "08:00 - 20:00"
  },
  {
    id: 81,
    nome: "POLÍCIA FEDERAL - IMIGRAÇÃO",
    emoji: "👮‍♂️",
    coords: [-47.924674, -15.872356],
    categoria: "servico",
    avaliacao: 4.0,
    descricao: "Delegacia de Imigração",
    horario: "08:00 - 17:00"
  },
  {
    id: 82,
    nome: "BORRA BORRACHARIA",
    emoji: "🔧",
    coords: [-47.9651085, -15.8700009],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Serviços de Pneus e Borracharia",
    horario: "08:00 - 18:00"
  },
  {
    id: 83,
    nome: "DISK BOMBA HAMBURGUERIA",
    emoji: "🍔",
    coords: [-47.9624329, -15.8675059],
    categoria: "lanche",
    avaliacao: 4.7,
    descricao: "Hamburgueria Tradicional",
    horario: "18:00 - 23:00"
  },
  {
    id: 84,
    nome: "ESPETINHO DO CARIOCA RB",
    emoji: "🍢",
    coords: [-47.9622818, -15.867471],
    categoria: "restaurante",
    avaliacao: 4.6,
    descricao: "Espetinhos Variados e Petiscos",
    horario: "17:00 - 23:00"
  },
  {
    id: 85,
    nome: "BUTECO AVENIDA",
    emoji: "🍻",
    coords: [-47.9631411, -15.8668972],
    categoria: "bar",
    avaliacao: 4.5,
    descricao: "Cozinha e Bar",
    horario: "11:00 - 01:00"
  },
  {
    id: 86,
    nome: "SUBWAY",
    emoji: "🥪",
    coords: [-47.9627694, -15.8670758],
    categoria: "lanche",
    avaliacao: 4.4,
    descricao: "Sanduíches e Saladas",
    horario: "11:00 - 23:00"
  },
  {
    id: 87,
    nome: "BANCO BRB - AG. BANDEIRANTE",
    emoji: "🏦",
    coords: [-47.9634854, -15.8675488],
    categoria: "banco",
    avaliacao: 4.5,
    descricao: "Agência 105",
    horario: "11:00 - 16:00"
  },
  {
    id: 88,
    nome: "BATERIAS BANBAN / AUTO ELÉTRICA",
    emoji: "⚡",
    coords: [-47.9637511, -15.86718],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Baterias e Elétrica Automotiva",
    horario: "08:00 - 18:00"
  },
  {
    id: 89,
    nome: "COMANDO AUTO PEÇAS",
    emoji: "🔧",
    coords: [-47.9639909, -15.8673201],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Peças e Acessórios Automotivos",
    horario: "08:00 - 18:00"
  },
  {
    id: 90,
    nome: "BORRACHARIA PIONEIRO",
    emoji: "🔧",
    coords: [-47.9619842, -15.8649966],
    categoria: "servico",
    avaliacao: 4.7,
    descricao: "Serviços de Pneus e Borracharia",
    horario: "08:00 - 18:00"
  },
  {
    id: 91,
    nome: "PARKSHOPPING",
    emoji: "🛍️",
    coords: [-47.954869, -15.8333955],
    categoria: "lazer",
    avaliacao: 4.8,
    descricao: "Shopping Center Tradicional",
    horario: "10:00 - 22:00"
  },
  {
    id: 92,
    nome: "CHURRASCARIA POTÊNCIA DO SUL",
    emoji: "🥩",
    coords: [-47.9519957, -15.8381432],
    categoria: "restaurante",
    avaliacao: 4.6,
    descricao: "Rodízio de Carnes Nobres",
    horario: "11:00 - 23:00"
  },
  {
    id: 93,
    nome: "HÍPICA HALL",
    emoji: "🐎",
    coords: [-47.9429728, -15.839492],
    categoria: "lazer",
    avaliacao: 4.7,
    descricao: "Centro de Eventos e Hipismo",
    horario: "08:00 - 22:00"
  },
  {
    id: 94,
    nome: "ZOOLÓGICO DE BRASÍLIA",
    emoji: "🦁",
    coords: [-47.9433209, -15.8446334],
    categoria: "lazer",
    avaliacao: 4.6,
    descricao: "Parque Zoológico e Preservação",
    horario: "08:30 - 17:00"
  },
  {
    id: 95,
    nome: "LEROY MERLIN",
    emoji: "🏠",
    coords: [-47.9505436, -15.8352805],
    categoria: "servico",
    avaliacao: 4.7,
    descricao: "Materiais de Construção e Decoração",
    horario: "08:00 - 22:00"
  },
  {
    id: 96,
    nome: "CHURRASCARIA PAMPAS",
    emoji: "🥩",
    coords: [-47.9550198, -15.8314187],
    categoria: "restaurante",
    avaliacao: 4.5,
    descricao: "Churrascaria Tradicional",
    horario: "11:00 - 23:00"
  },
  {
    id: 97,
    nome: "CARREFOUR HIPERMERCADO",
    emoji: "🛒",
    coords: [-47.9552456, -15.830608],
    categoria: "servico",
    avaliacao: 4.4,
    descricao: "Hipermercado e Variedades",
    horario: "08:00 - 22:00"
  },
  {
    id: 98,
    nome: "ASSAÍ ATACADISTA",
    emoji: "🛒",
    coords: [-47.9505875, -15.8339922],
    categoria: "servico",
    avaliacao: 4.6,
    descricao: "Atacadista de Alimentos",
    horario: "07:00 - 22:00"
  },
  {
    id: 99,
    nome: "LOCAVIP LOCADORA",
    emoji: "🚗",
    coords: [-47.9526115, -15.8555061],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Locação de Veículos",
    horario: "08:00 - 18:00"
  },
  {
    id: 100,
    nome: "FRANGO NO POTE",
    emoji: "🍗",
    coords: [-47.974186, -15.8706184],
    categoria: "lanche",
    avaliacao: 4.5,
    descricao: "Frango Frito e Porções",
    horario: "11:00 - 23:00"
  },
  {
    id: 101,
    nome: "PASSARELA EPNB",
    emoji: "🚶",
    coords: [-47.9727083, -15.8701933],
    categoria: "lazer",
    avaliacao: 4.6,
    descricao: "Passarela de Pedestres",
    horario: "24h"
  },
  {
    id: 102,
    nome: "ESTAÇÃO DE RECARGA CANAÃ",
    emoji: "⚡",
    coords: [-47.9738618, -15.8705274],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Estação de Recarga",
    horario: "24h"
  },
  {
    id: 103,
    nome: "EUROPA CÂMBIO - AEROPORTO",
    emoji: "💱",
    coords: [-47.9212024, -15.8700079],
    categoria: "servico",
    avaliacao: 4.7,
    descricao: "Casa de Câmbio",
    horario: "24h"
  },
  {
    id: 104,
    nome: "WESTERN UNION - PARK SHOPPING",
    emoji: "💱",
    coords: [-47.9558312, -15.8330973],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Casa de Câmbio e Serviços",
    horario: "10:00 - 22:00"
  },
  {
    id: 105,
    nome: "EMBAIXADA DOS EUA",
    emoji: "🇺🇸",
    coords: [-47.8732226, -15.8041068],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Representação Diplomática",
    horario: "08:00 - 17:00"
  },
  {
    id: 106,
    nome: "CONSULADO AMERICANO",
    emoji: "🛂",
    coords: [-47.8738395, -15.8036933],
    categoria: "servico",
    avaliacao: 4.4,
    descricao: "Emissão de Vistos",
    horario: "07:30 - 16:30"
  },
  {
    id: 107,
    nome: "PONTE JK",
    emoji: "🌉",
    coords: [-47.8300001, -15.8228561],
    categoria: "lazer",
    avaliacao: 4.9,
    descricao: "Ponto Turístico",
    horario: "24h"
  },
  {
    id: 108,
    nome: "LIFEBOX BURGER - LAGO SUL",
    emoji: "🍔",
    coords: [-47.8354671, -15.8192816],
    categoria: "lanche",
    avaliacao: 4.7,
    descricao: "Hamburgueria Artesanal",
    horario: "17:00 - 00:00"
  },
  {
    id: 109,
    nome: "SUBWAY - N. BANDEIRANTE",
    emoji: "🥪",
    coords: [-47.9724582, -15.8693966],
    categoria: "lanche",
    avaliacao: 4.5,
    descricao: "Sanduíches e Saladas",
    horario: "11:00 - 23:00"
  },
  {
    id: 110,
    nome: "DROGARIA SAÚDE MASTER",
    emoji: "💊",
    coords: [-47.967869, -15.8697913],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Farmácia e Drogaria",
    horario: "07:00 - 23:00"
  },
  {
    id: 111,
    nome: "DROGARIA ECONOMIZE",
    emoji: "💊",
    coords: [-47.9725578, -15.8727011],
    categoria: "servico",
    avaliacao: 4.6,
    descricao: "Farmácia e Drogaria",
    horario: "08:00 - 22:00"
  },
  {
    id: 112,
    nome: "DROGARIA ROSÁRIO",
    emoji: "💊",
    coords: [-47.9657285, -15.8686116],
    categoria: "servico",
    avaliacao: 4.7,
    descricao: "Farmácia e Drogaria",
    horario: "07:00 - 23:00"
  },
  {
    id: 113,
    nome: "DROGARIA BAND FARMA",
    emoji: "💊",
    coords: [-47.963081, -15.867896],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Farmácia e Drogaria",
    horario: "08:00 - 22:00"
  },
  {
    id: 114,
    nome: "MIRANTE DA TORRE DE TV",
    emoji: "🗼",
    coords: [-47.8929154, -15.7906572],
    categoria: "lazer",
    avaliacao: 4.8,
    descricao: "Ponto Turístico",
    horario: "09:00 - 19:00"
  },
  {
    id: 115,
    nome: "FEIRA DOS IMPORTADOS",
    emoji: "🛍️",
    coords: [-47.9498082, -15.7962108],
    categoria: "lazer",
    avaliacao: 4.6,
    descricao: "Eletrônicos e Variedades",
    horario: "09:00 - 18:00"
  },
  {
    id: 116,
    nome: "GIRAFFAS - N. BANDEIRANTE",
    emoji: "🍔",
    coords: [-47.9663766, -15.8709768],
    categoria: "lanche",
    avaliacao: 4.5,
    descricao: "Fast Food e Grelhados",
    horario: "11:00 - 23:00"
  },
  {
    id: 117,
    nome: "IGREJA PADRE ROQUE",
    emoji: "⛪",
    coords: [-47.9667713, -15.871137],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Igreja Católica",
    horario: "07:00 - 20:00"
  },
  {
    id: 118,
    nome: "AGÊNCIA DOS CORREIOS",
    emoji: "📮",
    coords: [-47.9659418, -15.8693272],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Correios e Telégrafos",
    horario: "09:00 - 17:00"
  },
  {
    id: 119,
    nome: "LÍDER LOTÉRICA",
    emoji: "🍀",
    coords: [-47.9654607, -15.8690641],
    categoria: "servico",
    avaliacao: 4.4,
    descricao: "Lotérica e Serviços Bancários",
    horario: "08:00 - 18:00"
  },
  {
    id: 120,
    nome: "LOTÉRICA 3RRR",
    emoji: "🍀",
    coords: [-47.9682448, -15.8709443],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Lotérica e Serviços Bancários",
    horario: "08:00 - 18:00"
  },
  {
    id: 121,
    nome: "MECÂNICA SOUZA",
    emoji: "🔧",
    coords: [-47.9615248, -15.8695646],
    categoria: "servico",
    avaliacao: 4.7,
    descricao: "Oficina Mecânica"
  },
  {
    id: 122,
    nome: "MAGAZINE LUIZA",
    emoji: "🏬",
    coords: [-47.9639708, -15.8683346],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Loja de Departamentos"
  },
  {
    id: 123,
    nome: "STUDIO SOBRANCELHAS",
    emoji: "💆‍♀️",
    coords: [-47.9633602, -15.868097],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Estética e Beleza"
  },
  {
    id: 124,
    nome: "NOSSA CLÍNICA ODONTOLÓGICA",
    emoji: "🦷",
    coords: [-47.9648401, -15.8682625],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Clínica Odontológica"
  },
  {
    id: 125,
    nome: "UPA DE NÚCLEO BANDEIRANTE",
    emoji: "🏥",
    coords: [-47.9821518, -15.8759388],
    categoria: "servico",
    avaliacao: 4.2,
    descricao: "Unidade de Pronto Atendimento"
  },
  {
    id: 126,
    nome: "ZEUS NIGHT CLUB",
    emoji: "🍸",
    coords: [-48.0137606, -15.8759209],
    categoria: "lazer",
    avaliacao: 4.5,
    descricao: "Casa Noturna e Chopperia"
  },
  {
    id: 127,
    nome: "FOGO CAMPEIRO BRASÍLIA",
    emoji: "🥩",
    coords: [-48.0149853, -15.8769535],
    categoria: "restaurante",
    avaliacao: 4.7,
    descricao: "Churrascaria"
  },
  {
    id: 128,
    nome: "SIM SEM HORA ENTRETENIMENTO",
    emoji: "🍻",
    coords: [-48.01426, -15.877242],
    categoria: "lazer",
    avaliacao: 4.6,
    descricao: "Chopperia e Entretenimento"
  },
  {
    id: 129,
    nome: "NA HORA - RIACHO FUNDO",
    emoji: "🏛️",
    coords: [-48.0202286, -15.877958],
    categoria: "servico",
    avaliacao: 4.3,
    descricao: "Unidade de Atendimento ao Cidadão"
  },
  {
    id: 130,
    nome: "VERSÁ RESTAURANTE & EVENTOS",
    emoji: "🍽️",
    coords: [-47.9720699, -15.8675651],
    categoria: "restaurante",
    avaliacao: 4.6,
    descricao: "Restaurante e Espaço para Eventos"
  },
  {
    id: 131,
    nome: "LOCALIZA ALUGUEL DE CARROS",
    emoji: "🚗",
    coords: [-47.9224387, -15.8740879],
    categoria: "transporte",
    avaliacao: 4.5,
    descricao: "Locadora de Veículos"
  },
  {
    id: 132,
    nome: "ATACADISTA SUPER ADEGA GUARÁ II",
    emoji: "🛒",
    coords: [-47.975812, -15.8475462],
    categoria: "compras",
    avaliacao: 4.6,
    descricao: "Distribuidor e Supermercado"
  },
  {
    id: 133,
    nome: "POLÍCIA RODOVIÁRIA FEDERAL - SEDE",
    emoji: "🚓",
    coords: [-47.9470638, -15.8144638],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Sede Administrativa da PRF"
  },
  {
    id: 134,
    nome: "ARENA BRB MANÉ GARRINCHA",
    emoji: "🏟️",
    coords: [-47.8992446, -15.78356],
    categoria: "turistico",
    avaliacao: 4.7,
    descricao: "Estádio Nacional de Brasília"
  },
  {
    id: 135,
    nome: "GINÁSIO NILSON NELSON",
    emoji: "🏟️",
    coords: [-47.9031774, -15.7830912],
    categoria: "turistico",
    avaliacao: 4.4,
    descricao: "Ginásio de Esportes e Eventos"
  },
  {
    id: 136,
    nome: "ULYSSES CENTRO DE CONVENÇÕES",
    emoji: "🏛️",
    coords: [-47.9005925, -15.7882292],
    categoria: "turistico",
    avaliacao: 4.7,
    descricao: "Centro de Convenções e Eventos"
  },
  {
    id: 137,
    nome: "ACADEMIA SMART FIT - NÚCLEO BANDEIRANTE",
    emoji: "🏋️",
    coords: [-47.9681916, -15.8705648],
    categoria: "lazer",
    avaliacao: 4.5,
    descricao: "Academia de Ginástica"
  },
  {
    id: 138,
    nome: "BRABOS FOOD",
    emoji: "🍔",
    coords: [-47.9683165, -15.8695392],
    categoria: "restaurante",
    avaliacao: 4.6,
    descricao: "Hamburgueria Artesanal"
  },
  {
    id: 139,
    nome: "POTIGUAR ESPETINHO",
    emoji: "🍢",
    coords: [-47.9691209, -15.8698948],
    categoria: "restaurante",
    avaliacao: 4.5,
    descricao: "Espetinhos e Grelhados"
  },
  {
    id: 140,
    nome: "RESTAURANTE NORDESTINO",
    emoji: "🍛",
    coords: [-47.9678399, -15.8707075],
    categoria: "restaurante",
    avaliacao: 4.4,
    descricao: "Culinária Típica Nordestina"
  },
  {
    id: 141,
    nome: "RESTAURANTE SABOR DA TERRA",
    emoji: "🥘",
    coords: [-47.9676904, -15.8703872],
    categoria: "restaurante",
    avaliacao: 4.3,
    descricao: "Comida Caseira e Self-Service"
  },
  {
    id: 142,
    nome: "BARBEARIA DO RAFA",
    emoji: "💈",
    coords: [-47.9648485, -15.8691421],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Corte Masculino e Barba"
  },
  {
    id: 143,
    nome: "BARBEARIA VINTAGE SKULL CONCEPT",
    emoji: "💈",
    coords: [-47.9634711, -15.8685833],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Barbearia Clássica e Estilo"
  },
  {
    id: 144,
    nome: "SALÃO E BARBEARIA ELZENI MARIA",
    emoji: "✂️",
    coords: [-47.9653178, -15.8691186],
    categoria: "servico",
    avaliacao: 4.6,
    descricao: "Cortes Unissex e Barbearia"
  },
  {
    id: 145,
    nome: "BARBEARIA ELMISSON HAIR",
    emoji: "✂️",
    coords: [-47.9653695, -15.8691454],
    categoria: "servico",
    avaliacao: 4.7,
    descricao: "Cortes Masculinos e Barba"
  },
  {
    id: 146,
    nome: "GIRAFFAS CANDANGOLÂNDIA",
    emoji: "🦒",
    coords: [-47.9543403, -15.8520068],
    categoria: "restaurante",
    avaliacao: 4.5,
    descricao: "Rede de Fast-Food Brasileira"
  },
  {
    id: 147,
    nome: "MCDONALD'S",
    emoji: "🍔",
    coords: [-47.9555214, -15.8511705],
    categoria: "restaurante",
    avaliacao: 4.6,
    descricao: "Rede de Fast-Food"
  },
  {
    id: 148,
    nome: "MCDONALD'S",
    emoji: "🍔",
    coords: [-47.9543799, -15.8509167],
    categoria: "restaurante",
    avaliacao: 4.6,
    descricao: "Rede de Fast-Food"
  },
  {
    id: 149,
    nome: "BSB LOCADORA DE VEÍCULOS",
    emoji: "🚗",
    coords: [-47.9542032, -15.850777],
    categoria: "servico",
    avaliacao: 4.4,
    descricao: "Aluguel de Carros"
  },
  {
    id: 150,
    nome: "LAVA JATO DO NILSON",
    emoji: "🚿",
    coords: [-47.9621318, -15.8673166],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Lavagem Automotiva"
  },
  {
    id: 151,
    nome: "CAMELO LAVA JATO E TROCA DE ÓLEO",
    emoji: "🛢️",
    coords: [-47.9616083, -15.8692392],
    categoria: "servico",
    avaliacao: 4.6,
    descricao: "Lava Jato e Troca de Óleo"
  },
  {
    id: 152,
    nome: "LAVA JATO AUTO LIMPEZA",
    emoji: "🧼",
    coords: [-47.9730043, -15.8724487],
    categoria: "servico",
    avaliacao: 4.4,
    descricao: "Limpeza Automotiva"
  },
  {
    id: 153,
    nome: "SALÃO DOS AMIGOS",
    emoji: "✂️",
    coords: [-47.9624236, -15.8679943],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Salão de Beleza e Barbearia"
  },
  {
    id: 154,
    nome: "LOGLAV LAVANDERIA EXPRESS",
    emoji: "🧺",
    coords: [-47.9654341, -15.8681758],
    categoria: "servico",
    avaliacao: 4.6,
    descricao: "Lavanderia Expressa"
  },
  {
    id: 155,
    nome: "LAVANDERIA LAVE & PASSE",
    emoji: "🧺",
    coords: [-47.9662446, -15.8684497],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Lavanderia e Passadoria"
  },
  {
    id: 156,
    nome: "LAVANDERIA COPACABANA",
    emoji: "🧺",
    coords: [-47.9663762, -15.868534],
    categoria: "servico",
    avaliacao: 4.5,
    descricao: "Lavanderia Tradicional"
  },
  {
    id: 157,
    nome: "QUEIROZ LANCHES",
    emoji: "🍔",
    coords: [-47.9683166, -15.8692752],
    categoria: "lanche",
    avaliacao: 4.6,
    descricao: "Lanches e Petiscos",
    horario: "18:00 - 23:00"
  },
  {
    id: 158,
    nome: "JANDIRA HAIR E MAKE-UP",
    emoji: "💇‍♀️",
    coords: [-47.9689797, -15.8701534],
    categoria: "servico",
    avaliacao: 4.8,
    descricao: "Cabeleireiro e Maquiagem",
    horario: "09:00 - 18:00"
  }
];
