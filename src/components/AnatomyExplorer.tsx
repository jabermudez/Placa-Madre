import React, { useState, useEffect } from 'react';
import { 
  MOTHERBOARD_COMPONENTS, 
  ComponentAnatomy 
} from '../data/motherboardData';
import { ComponentIllustration } from './ComponentIllustration';
import { GlossaryTerm } from './GlossaryTerm';
import { 
  Cpu, 
  Zap, 
  HardDrive, 
  Settings2, 
  Search, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  Info,
  CheckCircle2,
  X,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';

const COMPONENT_GLOSSARY_MAP: Record<number, string[]> = {
  1: ['chipset'],
  2: ['vga', 'agp'],
  3: ['hdmi', 'chipset'],
  4: ['lan', 'pcie'],
  5: ['chipset'],
  6: ['vrm', 'tdp', 'atx'],
  7: ['vrm', 'drmos', 'tdp'],
  8: ['socket', 'lga', 'pga', 'imc'],
  9: ['dual-channel', 'daisy-chain', 't-topology', 'pmic', 'xmp'],
  10: ['atx', 'btf'],
  11: ['chipset', 'dmi', 'northbridge', 'southbridge'],
  12: ['sata', 'm2'],
  13: ['post', 'q-code'],
  14: ['cmos', 'post', 'uefi'],
  15: ['m2', 'pcie', 'sata'],
  16: ['pcie', 'pam4', 'agp', 'isa'],
  17: ['pcie', 'chipset'],
  18: ['chipset'],
  19: ['uefi', 'post', 'flashback', 'cmos']
};

export const AnatomyExplorer: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);
  const [hoveredComponentId, setHoveredComponentId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'diagram' | 'grid' | 'guides'>('diagram');

  const selectedComponent = MOTHERBOARD_COMPONENTS.find(c => c.id === selectedComponentId) || null;
  const hoveredComponent = MOTHERBOARD_COMPONENTS.find(c => c.id === hoveredComponentId) || null;

  const filteredComponents = MOTHERBOARD_COMPONENTS.filter(comp => {
    const matchesCategory = activeCategory === 'todos' || comp.category === activeCategory;
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comp.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comp.tag.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Close popup with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedComponentId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getCategoryColor = (cat: ComponentAnatomy['category']) => {
    switch (cat) {
      case 'procesamiento': return 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10';
      case 'expansion': return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      case 'conectividad': return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
      case 'control': return 'text-purple-400 border-purple-500/40 bg-purple-500/10';
      default: return 'text-slate-300 border-slate-700 bg-slate-800';
    }
  };

  const getCategoryBadge = (cat: ComponentAnatomy['category']) => {
    switch (cat) {
      case 'procesamiento': return 'Procesamiento & Energía';
      case 'expansion': return 'Expansión & Almacenamiento';
      case 'conectividad': return 'Panel E/S Trasero';
      case 'control': return 'Control & Firmware';
    }
  };

  const handleStep = (direction: 'next' | 'prev') => {
    if (!selectedComponentId) return;
    const currentIndex = MOTHERBOARD_COMPONENTS.findIndex(c => c.id === selectedComponentId);
    if (direction === 'next') {
      const nextId = currentIndex < MOTHERBOARD_COMPONENTS.length - 1 ? MOTHERBOARD_COMPONENTS[currentIndex + 1].id : MOTHERBOARD_COMPONENTS[0].id;
      setSelectedComponentId(nextId);
    } else {
      const prevId = currentIndex > 0 ? MOTHERBOARD_COMPONENTS[currentIndex - 1].id : MOTHERBOARD_COMPONENTS[MOTHERBOARD_COMPONENTS.length - 1].id;
      setSelectedComponentId(prevId);
    }
  };

  return (
    <section id="anatomia" className="py-16 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <span>01. Desglose Estructural Interactivo</span>
              <span>·</span>
              <span>19 Componentes Clave</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Anatomía y Diagrama de la Placa Base
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Pasa el cursor por los puntos numerados para una vista rápida, o haz clic en cualquier componente para abrir 
              la ventana emergente con su ilustración detallada, especificaciones eléctricas y función en el sistema.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setViewMode('diagram')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                viewMode === 'diagram'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Diagrama Interactivo (Popups)
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Catálogo de Fichas
            </button>
            <button
              onClick={() => setViewMode('guides')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                viewMode === 'guides'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Infografías de Referencia
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between mb-8 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'todos', label: 'Todos (19)' },
              { id: 'procesamiento', label: 'Procesamiento & VRM' },
              { id: 'expansion', label: 'Expansión & Discos' },
              { id: 'conectividad', label: 'Conectividad E/S' },
              { id: 'control', label: 'Control & Firmware' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-slate-800 text-cyan-400 font-semibold border border-cyan-500/40 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por componente, puerto o sigla..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* VIEW 1: INTERACTIVE BOARD DIAGRAM WITH HOVER TOOLTIPS & CLICK POPUPS */}
        {viewMode === 'diagram' && (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-8 shadow-2xl relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>DIAGRAMA ESQUEMÁTICO ATX · PUNTOS DE INSPECCIÓN ELECTRÓNICA</span>
              </div>
              <span className="text-xs text-cyan-400 font-mono">
                Pasa el cursor para vista rápida o haz clic para ventana emergente
              </span>
            </div>

            {/* Diagram Container */}
            <div className="relative w-full aspect-[4/5] max-w-4xl mx-auto bg-gradient-to-b from-slate-950 via-[#07131b] to-slate-950 rounded-2xl border border-cyan-950 p-3 sm:p-6 select-none overflow-hidden shadow-2xl">
              
              {/* Motherboard SVG Vector Artwork */}
              <svg className="w-full h-full" viewBox="0 0 1000 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* PCB Substrate Outer Edge */}
                <rect x="20" y="20" width="960" height="1160" rx="16" fill="#0b1620" stroke="#164e63" strokeWidth="4" />
                
                {/* PCB Copper Ground Plane Pattern / Traces */}
                <g stroke="#0e7490" strokeOpacity="0.25" strokeWidth="2">
                  <circle cx="60" cy="60" r="14" fill="#030712" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="500" cy="60" r="14" fill="#030712" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="940" cy="60" r="14" fill="#030712" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="60" cy="600" r="14" fill="#030712" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="940" cy="600" r="14" fill="#030712" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="60" cy="1140" r="14" fill="#030712" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="500" cy="1140" r="14" fill="#030712" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="940" cy="1140" r="14" fill="#030712" stroke="#f59e0b" strokeWidth="3" />

                  {/* Traces */}
                  <path d="M 450 350 L 600 350 L 600 200" fill="none" />
                  <path d="M 450 390 L 590 390 L 590 600 L 720 600" fill="none" />
                  <path d="M 320 460 L 320 600 L 220 600" fill="none" />
                  <path d="M 320 480 L 320 760 L 220 760" fill="none" />
                  <path d="M 720 780 L 840 780 L 840 850" fill="none" />
                </g>

                {/* 6: REAR I/O BLOCK (Left Edge) */}
                <rect x="35" y="100" width="110" height="720" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                <text x="90" y="470" fill="#94a3b8" fontSize="16" fontFamily="monospace" transform="rotate(-90 90 470)" textAnchor="middle">
                  PANEL TRASERO DE E/S (REAR I/O)
                </text>

                {/* 2: VGA */}
                <rect x="45" y="140" width="85" height="50" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
                <text x="87" y="170" fill="#ffffff" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">VGA</text>

                {/* 1: USB Ports */}
                <rect x="45" y="210" width="85" height="90" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="55" y="222" width="65" height="28" rx="2" fill="#0284c7" />
                <rect x="55" y="260" width="65" height="28" rx="2" fill="#0284c7" />
                <text x="87" y="278" fill="#ffffff" fontSize="11" fontFamily="sans-serif" textAnchor="middle">USB 3.2</text>

                {/* 3: HDMI */}
                <rect x="45" y="320" width="85" height="55" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                <path d="M 55 335 L 120 335 L 115 365 L 60 365 Z" fill="#6b21a8" />
                <text x="87" y="354" fill="#ffffff" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">HDMI</text>

                {/* 4: LAN Ethernet */}
                <rect x="45" y="395" width="85" height="80" rx="4" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="55" y="415" width="65" height="50" rx="3" fill="#14532d" />
                <circle cx="87" cy="406" r="3" fill="#eab308" />
                <text x="87" y="445" fill="#ffffff" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">LAN RJ-45</text>

                {/* 5: Audio Jacks */}
                <rect x="45" y="495" width="85" height="150" rx="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <circle cx="68" cy="525" r="12" fill="#ec4899" stroke="#be185d" strokeWidth="2" />
                <circle cx="106" cy="525" r="12" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                <circle cx="68" cy="565" r="12" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
                <circle cx="106" cy="565" r="12" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
                <circle cx="68" cy="605" r="12" fill="#64748b" stroke="#334155" strokeWidth="2" />
                <rect x="94" y="595" width="22" height="20" rx="2" fill="#000000" stroke="#e2e8f0" strokeWidth="1" />

                {/* 7: EPS 12V 8-PIN CPU POWER */}
                <rect x="180" y="40" width="120" height="65" rx="4" fill="#0f172a" stroke="#eab308" strokeWidth="2" />
                <g fill="#ca8a04">
                  <rect x="190" y="48" width="22" height="22" rx="2" />
                  <rect x="217" y="48" width="22" height="22" rx="2" />
                  <rect x="244" y="48" width="22" height="22" rx="2" />
                  <rect x="271" y="48" width="22" height="22" rx="2" />
                  <rect x="190" y="75" width="22" height="22" rx="2" />
                  <rect x="217" y="75" width="22" height="22" rx="2" />
                  <rect x="244" y="75" width="22" height="22" rx="2" />
                  <rect x="271" y="75" width="22" height="22" rx="2" />
                </g>

                {/* VRM HEATSINKS surrounding socket */}
                <rect x="170" y="130" width="120" height="280" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="310" y="110" width="230" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="230" y="270" fill="#64748b" fontSize="14" fontFamily="monospace" transform="rotate(-90 230 270)" textAnchor="middle">
                  DISIPADOR VRM (MOSFETS / DrMOS)
                </text>

                {/* 8: CPU SOCKET (LGA / PGA) */}
                <rect x="315" y="210" width="230" height="230" rx="8" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                <rect x="345" y="240" width="170" height="170" rx="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
                <g fill="#f59e0b" fillOpacity="0.7">
                  <circle cx="370" cy="265" r="2" /><circle cx="390" cy="265" r="2" /><circle cx="410" cy="265" r="2" /><circle cx="430" cy="265" r="2" /><circle cx="450" cy="265" r="2" /><circle cx="470" cy="265" r="2" /><circle cx="490" cy="265" r="2" />
                  <circle cx="370" cy="285" r="2" /><circle cx="490" cy="285" r="2" />
                  <circle cx="370" cy="305" r="2" /><circle cx="490" cy="305" r="2" />
                  <circle cx="370" cy="325" r="2" /><circle cx="490" cy="325" r="2" />
                  <circle cx="370" cy="345" r="2" /><circle cx="490" cy="345" r="2" />
                  <circle cx="370" cy="365" r="2" /><circle cx="490" cy="365" r="2" />
                  <circle cx="370" cy="385" r="2" /><circle cx="390" cy="385" r="2" /><circle cx="410" cy="385" r="2" /><circle cx="430" cy="385" r="2" /><circle cx="450" cy="385" r="2" /><circle cx="470" cy="385" r="2" /><circle cx="490" cy="385" r="2" />
                </g>
                <line x1="550" y1="200" x2="550" y2="445" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />

                {/* 9: RAM SLOTS (4 DDR DIMMs) */}
                <g>
                  <rect x="610" y="140" width="30" height="380" rx="3" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
                  <rect x="618" y="160" width="14" height="340" fill="#0284c7" />
                  <rect x="660" y="140" width="30" height="380" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                  <rect x="668" y="160" width="14" height="340" fill="#0f172a" />
                  <rect x="710" y="140" width="30" height="380" rx="3" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
                  <rect x="718" y="160" width="14" height="340" fill="#0284c7" />
                  <rect x="760" y="140" width="30" height="380" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                  <rect x="768" y="160" width="14" height="340" fill="#0f172a" />
                </g>

                {/* 10: 24-PIN ATX MAIN POWER */}
                <rect x="850" y="240" width="90" height="230" rx="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                <g fill="#fbbf24">
                  {[...Array(12)].map((_, i) => (
                    <React.Fragment key={i}>
                      <rect x="862" y={255 + i * 17} width="14" height="12" rx="2" />
                      <rect x="912" y={255 + i * 17} width="14" height="12" rx="2" />
                    </React.Fragment>
                  ))}
                </g>

                {/* 15: M.2 NVMe PRIMARY SLOT */}
                <rect x="260" y="490" width="320" height="55" rx="5" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="420" y="525" fill="#a7f3d0" fontSize="13" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  RANURA M.2 PCIe NVMe (Gen 4/5)
                </text>

                {/* 16: PCI EXPRESS x16 SLOT */}
                <rect x="210" y="580" width="560" height="40" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
                <rect x="225" y="592" width="60" height="16" fill="#1e293b" />
                <rect x="295" y="592" width="460" height="16" fill="#1e293b" />
                <path d="M 770 575 L 795 600 L 770 625 Z" fill="#06b6d4" />
                <text x="500" y="605" fill="#e0f2fe" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  PCI EXPRESS 5.0 x16 (GPU REFORZADA STEEL ARMOR)
                </text>

                {/* 17: PCI EXPRESS x1 */}
                <rect x="210" y="660" width="160" height="35" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="290" y="682" fill="#a7f3d0" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  PCIe x1
                </text>

                {/* Secondary M.2 */}
                <rect x="260" y="720" width="300" height="45" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                <text x="410" y="748" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  M.2 SECUNDARIO (PCH)
                </text>

                {/* 18: LEGACY PCI */}
                <rect x="210" y="800" width="480" height="40" rx="4" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect x="225" y="812" width="190" height="16" fill="#0f172a" />
                <rect x="440" y="812" width="235" height="16" fill="#0f172a" />
                <text x="460" y="825" fill="#fecdd3" fontSize="12" fontFamily="monospace" textAnchor="middle">
                  RANURA PCI LEGADO 32-BIT (33 MHz)
                </text>

                {/* 11: CHIPSET (PCH) */}
                <rect x="660" y="680" width="220" height="200" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2.5" />
                <rect x="685" y="705" width="170" height="150" rx="4" fill="#0f172a" stroke="#9333ea" strokeWidth="1.5" />
                <text x="770" y="775" fill="#f3e8ff" fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  CHIPSET (PCH)
                </text>
                <text x="770" y="798" fill="#c084fc" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
                  DMI / UMI ENLACE
                </text>

                {/* 14: CMOS BATTERY */}
                <circle cx="530" cy="910" r="48" fill="#64748b" stroke="#cbd5e1" strokeWidth="3" />
                <circle cx="530" cy="910" r="42" fill="#94a3b8" />
                <text x="530" y="905" fill="#0f172a" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">CR2032</text>
                <text x="530" y="922" fill="#0f172a" fontSize="10" fontFamily="sans-serif" textAnchor="middle">3V LITHIUM</text>

                {/* 12: SATA PORTS */}
                <g fill="#0f172a" stroke="#06b6d4" strokeWidth="2">
                  <rect x="880" y="750" width="60" height="45" rx="3" />
                  <rect x="880" y="810" width="60" height="45" rx="3" />
                  <rect x="880" y="870" width="60" height="45" rx="3" />
                </g>
                <g fill="#0284c7">
                  <rect x="890" y="760" width="40" height="25" rx="2" />
                  <rect x="890" y="820" width="40" height="25" rx="2" />
                  <rect x="890" y="880" width="40" height="25" rx="2" />
                </g>
                <text x="910" y="935" fill="#67e8f9" fontSize="11" fontFamily="monospace" textAnchor="middle">SATA 6G</text>

                {/* 19: BIOS SPI FLASH */}
                <rect x="810" y="970" width="55" height="45" rx="3" fill="#020617" stroke="#e2e8f0" strokeWidth="1.5" />
                <circle cx="820" cy="980" r="3" fill="#38bdf8" />
                <text x="837" y="1000" fill="#f8fafc" fontSize="9" fontFamily="monospace" textAnchor="middle">BIOS</text>

                {/* 13: FRONT PANEL HEADERS */}
                <rect x="740" y="1070" width="180" height="45" rx="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <g fill="#fbbf24">
                  {[...Array(9)].map((_, i) => (
                    <circle key={i} cx={755 + i * 18} cy="1085" r="3.5" />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <circle key={i} cx={755 + i * 18} cy="1102" r="3.5" />
                  ))}
                </g>
                <text x="830" y="1135" fill="#fde68a" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  F_PANEL (POWER / RESET / LED)
                </text>
              </svg>

              {/* INTERACTIVE NUMBERED BUTTONS OVERLAY (1 to 19) */}
              {MOTHERBOARD_COMPONENTS.map((comp) => {
                const isHovered = comp.id === hoveredComponentId;
                const isMatchesFilter = filteredComponents.some(c => c.id === comp.id);

                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComponentId(comp.id)}
                    onMouseEnter={() => setHoveredComponentId(comp.id)}
                    onMouseLeave={() => setHoveredComponentId(null)}
                    onFocus={() => setHoveredComponentId(comp.id)}
                    onBlur={() => setHoveredComponentId(null)}
                    aria-label={`Componente ${comp.id}: ${comp.name}. Presiona Enter para ver ficha técnica y diagrama.`}
                    aria-haspopup="dialog"
                    style={{
                      left: `${comp.coordinates.x}%`,
                      top: `${comp.coordinates.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus-visible:ring-4 focus-visible:ring-cyan-400 focus-visible:outline-none rounded-full cursor-pointer transition-all ${
                      isMatchesFilter ? 'opacity-100 scale-100' : 'opacity-25 scale-75'
                    }`}
                  >
                    {/* Ring highlight on hover */}
                    {isHovered && (
                      <span className="absolute -inset-2 rounded-full bg-cyan-400/40 animate-ping pointer-events-none" />
                    )}

                    {/* Button Badge */}
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shadow-xl border transition-all ${
                        isHovered
                          ? 'bg-cyan-400 text-slate-950 border-white scale-125 ring-4 ring-cyan-500/40'
                          : 'bg-slate-900/90 text-cyan-300 border-cyan-500/60 hover:bg-cyan-500 hover:text-slate-950'
                      }`}
                    >
                      {comp.id}
                    </span>
                  </button>
                );
              })}

              {/* FLOATING HOVER TOOLTIP CARD */}
              {hoveredComponent && (
                <div 
                  className="absolute z-30 pointer-events-none bg-slate-950/95 border border-cyan-500/50 rounded-xl p-3 shadow-2xl max-w-[280px] backdrop-blur-md transition-all duration-150 animate-in fade-in"
                  style={{
                    left: `${Math.min(75, Math.max(15, hoveredComponent.coordinates.x))}%`,
                    top: `${hoveredComponent.coordinates.y > 60 ? hoveredComponent.coordinates.y - 18 : hoveredComponent.coordinates.y + 12}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-md bg-cyan-500 text-slate-950 font-mono font-bold text-[10px] flex items-center justify-center">
                      {hoveredComponent.id}
                    </span>
                    <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${getCategoryColor(hoveredComponent.category)}`}>
                      {hoveredComponent.tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">
                    {hoveredComponent.name}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {hoveredComponent.shortDesc}
                  </p>
                  <span className="text-[10px] text-cyan-400 font-mono mt-1.5 block">
                    ➜ Haz clic para abrir ilustración y especificaciones
                  </span>
                </div>
              )}

            </div>

            {/* Bottom Quick Selector Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono border-t border-slate-800/80 pt-4">
              <span>Consejo: Haz clic en cualquier pin o selecciona un componente rápido:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 8, label: 'Socket CPU' },
                  { id: 11, label: 'Chipset' },
                  { id: 9, label: 'Ranuras RAM' },
                  { id: 16, label: 'Ranura PCIe x16' },
                  { id: 15, label: 'Ranura M.2' },
                  { id: 19, label: 'Chip BIOS' }
                ].map(quick => (
                  <button
                    key={quick.id}
                    onClick={() => setSelectedComponentId(quick.id)}
                    className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 transition-colors cursor-pointer text-[11px]"
                  >
                    #{quick.id} {quick.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: GRID CATALOG VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((comp) => (
              <div
                key={comp.id}
                onClick={() => setSelectedComponentId(comp.id)}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center transition-colors">
                      {comp.id}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getCategoryColor(comp.category)}`}>
                      {comp.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {comp.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-medium">
                  <span>Abrir ventana emergente</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: REFERENCE GUIDES TABLE */}
        {viewMode === 'guides' && (
          <div className="space-y-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="max-w-3xl">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Correspondencia con Infografías del Usuario
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Mapa Maestro de los 19 Componentes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Cada punto coincide rigurosamente con los 19 elementos etiquetados en las guías técnicas 
                y láminas de arquitectura de placas base. Haz clic en cualquier fila para abrir su ventana emergente.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Componente</th>
                    <th className="py-3 px-4">Categoría</th>
                    <th className="py-3 px-4">Pinout / Bus</th>
                    <th className="py-3 px-4">Rol en el Sistema</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
                  {MOTHERBOARD_COMPONENTS.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => setSelectedComponentId(item.id)}
                      className="hover:bg-slate-800/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-4 font-mono font-bold text-cyan-400">{item.id}</td>
                      <td className="py-2.5 px-4 font-semibold text-white">{item.name}</td>
                      <td className="py-2.5 px-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${getCategoryColor(item.category)}`}>
                          {item.tag}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-400 text-[11px]">{item.pinoutOrBus}</td>
                      <td className="py-2.5 px-4 text-slate-300">{item.shortDesc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ACCESSIBLE FLOATING MODAL POPUP (Triggered by clicking on any component) */}
        {selectedComponent && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-component-title"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedComponentId(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Cerrar ventana emergente"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Popup Header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-lg bg-cyan-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  #{selectedComponent.id}
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getCategoryColor(selectedComponent.category)}`}>
                  {getCategoryBadge(selectedComponent.category)}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {selectedComponent.tag}
                </span>
              </div>

              <h3 id="modal-component-title" className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedComponent.name}
              </h3>

              {/* Representative Component Illustration / Image */}
              <div className="my-5">
                <ComponentIllustration id={selectedComponent.id} className="w-full h-44 sm:h-48" />
              </div>

              {/* Summary Kicker */}
              <p className="text-xs sm:text-sm text-cyan-200 bg-cyan-950/40 border border-cyan-800/40 p-3.5 rounded-xl leading-relaxed mb-4">
                {selectedComponent.shortDesc}
              </p>

              {/* Associated Glossary Terms */}
              {COMPONENT_GLOSSARY_MAP[selectedComponent.id] && COMPONENT_GLOSSARY_MAP[selectedComponent.id].length > 0 && (
                <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-cyan-900/40 mb-5">
                  <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1.5 mr-1 font-semibold">
                    <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                    Términos del Glosario:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {COMPONENT_GLOSSARY_MAP[selectedComponent.id].map(termKey => (
                      <GlossaryTerm key={termKey} term={termKey} showIcon className="text-xs bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700/80" />
                    ))}
                  </div>
                </div>
              )}

              {/* Deep Technical Spec Sections */}
              <div className="space-y-4 text-xs">
                {/* 1. Arquitectura y Funcionamiento */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1.5 text-cyan-400 font-mono">
                    <Info className="w-3.5 h-3.5" />
                    Funcionamiento Arquitectónico
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedComponent.detailedDesc}
                  </p>
                </div>

                {/* 2. Especificaciones Eléctricas y Pinout */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1 text-amber-400 font-mono">
                    <Zap className="w-3.5 h-3.5" />
                    Valores Eléctricos, Tensiones y Pinout
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-white">Alimentación:</strong> {selectedComponent.electricalSpecs}
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Topología de Pines:</strong> {selectedComponent.pinoutOrBus}
                  </p>
                </div>

                {/* 3. Evolución Histórica */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1.5 text-emerald-400 font-mono">
                    <Cpu className="w-3.5 h-3.5" />
                    Evolución & Generaciones
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedComponent.historicalEvolution}
                  </p>
                </div>

                {/* 4. Diagnóstico y Problemas Comunes */}
                <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl text-rose-200/90">
                  <h4 className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1.5 text-rose-400 font-mono">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Fallas Frecuentes & Diagnóstico
                  </h4>
                  <p className="leading-relaxed">
                    {selectedComponent.commonIssues}
                  </p>
                </div>
              </div>

              {/* Stepper Footer Inside Modal */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleStep('prev')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>
                <span className="text-slate-500 font-mono text-[11px]">
                  {selectedComponent.id} de 19
                </span>
                <button
                  onClick={() => handleStep('next')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
