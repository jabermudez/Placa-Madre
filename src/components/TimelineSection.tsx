import React, { useState, useRef, useEffect } from 'react';
import { 
  GENERATION_ERAS, 
  TIMELINE_MILESTONES, 
  TimelineMilestone, 
  EraGeneration 
} from '../data/motherboardData';
import { 
  Calendar, 
  Cpu, 
  HardDrive, 
  Zap, 
  Layers, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  Scale, 
  ArrowRight, 
  Compass, 
  Sparkles,
  Info
} from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('m-1995'); // ATX launch by default
  const [filterEra, setFilterEra] = useState<string>('all');
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareMilestoneId, setCompareMilestoneId] = useState<string>('m-2024'); // Compare with 2024 modern
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  const filteredMilestones = TIMELINE_MILESTONES.filter(m => 
    filterEra === 'all' || m.eraId === filterEra
  );

  const currentMilestone = TIMELINE_MILESTONES.find(m => m.id === selectedMilestoneId) || TIMELINE_MILESTONES[4];
  const compareMilestone = TIMELINE_MILESTONES.find(m => m.id === compareMilestoneId) || TIMELINE_MILESTONES[TIMELINE_MILESTONES.length - 1];

  const parentEra = GENERATION_ERAS.find(e => e.id === currentMilestone.eraId) || GENERATION_ERAS[1];

  const currentIndex = filteredMilestones.findIndex(m => m.id === currentMilestone.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedMilestoneId(filteredMilestones[currentIndex - 1].id);
    } else {
      setSelectedMilestoneId(filteredMilestones[filteredMilestones.length - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredMilestones.length - 1) {
      setSelectedMilestoneId(filteredMilestones[currentIndex + 1].id);
    } else {
      setSelectedMilestoneId(filteredMilestones[0].id);
    }
  };

  // Center active point on scrub track when selected
  useEffect(() => {
    if (timelineScrollRef.current) {
      const activeEl = timelineScrollRef.current.querySelector(`[data-milestone-id="${selectedMilestoneId}"]`) as HTMLElement;
      if (activeEl) {
        const containerWidth = timelineScrollRef.current.offsetWidth;
        const scrollLeft = activeEl.offsetLeft - containerWidth / 2 + activeEl.offsetWidth / 2;
        timelineScrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedMilestoneId]);

  return (
    <section id="generaciones" className="py-16 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <span>03. Cronología Arquitectónica</span>
              <span>·</span>
              <span>1981 a 2026+</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Línea de Tiempo Interactiva: 45 Años de Placas Base
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Navega punto a punto por los mayores saltos evolutivos de la computación. 
              Examina la transición de factores de forma (Baby AT → ATX → Mini-ITX → BTX → BTF), 
              los modelos emblemáticos y compara dos eras cara a cara.
            </p>
          </div>

          {/* Compare Toggle Button */}
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer border ${
              compareMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            {compareMode ? 'Modo Normal (Ficha Individual)' : 'Comparar Dos Eras Frente a Frente'}
          </button>
        </div>

        {/* Filter Pills for Eras */}
        <div className="flex flex-wrap gap-1.5 mb-6 bg-slate-900/60 p-2 rounded-xl border border-slate-800 w-fit">
          {[
            { id: 'all', label: 'Todos los Hitos (15)' },
            { id: 'era-pre-atx', label: 'Pre-ATX (1981-1994)' },
            { id: 'era-atx-clasica', label: 'Revolución ATX (1995-2003)' },
            { id: 'era-pcie-uefi', label: 'PCIe & UEFI (2004-2014)' },
            { id: 'era-moderna', label: 'Moderna & BTF (2015-2026+)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterEra(tab.id)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                filterEra === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Horizontal Timeline Scrubber Track */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 shadow-xl relative">
          <div className="flex items-center justify-between mb-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Compass className="w-3.5 h-3.5" />
              Haz clic en cualquier año o usa las flechas laterales
            </span>
            <span>{currentMilestone.year} seleccionado</span>
          </div>

          {/* Stepper Buttons and Track */}
          <div className="relative flex items-center">
            {/* Left arrow */}
            <button
              onClick={handlePrev}
              className="absolute -left-2 z-10 p-2 rounded-full bg-slate-800/90 text-slate-300 hover:text-white hover:bg-cyan-500 hover:text-slate-950 transition-colors border border-slate-700 shadow-lg cursor-pointer"
              aria-label="Hito anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Track */}
            <div 
              ref={timelineScrollRef}
              className="w-full overflow-x-auto no-scrollbar scroll-smooth py-6 px-8 flex items-center gap-6 sm:gap-8"
              style={{ scrollbarWidth: 'none' }}
            >
              {/* Connecting Background Line */}
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-800 pointer-events-none" />

              {filteredMilestones.map((milestone) => {
                const isSelected = milestone.id === selectedMilestoneId;
                const isCompared = compareMode && milestone.id === compareMilestoneId;

                return (
                  <button
                    key={milestone.id}
                    data-milestone-id={milestone.id}
                    onClick={() => {
                      if (compareMode) {
                        // In compare mode, clicking changes either target depending on keys
                        setSelectedMilestoneId(milestone.id);
                      } else {
                        setSelectedMilestoneId(milestone.id);
                      }
                    }}
                    className="relative flex flex-col items-center shrink-0 group focus:outline-none cursor-pointer"
                  >
                    {/* Node Dot / Badge */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all relative z-10 border ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 border-white scale-110 shadow-lg shadow-cyan-500/40 ring-4 ring-cyan-500/30'
                          : isCompared
                          ? 'bg-amber-400 text-slate-950 border-white scale-105 ring-4 ring-amber-500/30'
                          : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-cyan-400 hover:bg-slate-900 hover:scale-105'
                      }`}
                    >
                      {milestone.year.toString().slice(-2)}'
                    </div>

                    {/* Label underneath */}
                    <div className="mt-2 text-center max-w-[90px]">
                      <span className={`block font-mono text-[11px] font-bold transition-colors ${
                        isSelected ? 'text-cyan-400' : isCompared ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}>
                        {milestone.year}
                      </span>
                      <span className="block text-[9px] text-slate-500 truncate leading-tight">
                        {milestone.formFactor.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNext}
              className="absolute -right-2 z-10 p-2 rounded-full bg-slate-800/90 text-slate-300 hover:text-white hover:bg-cyan-500 hover:text-slate-950 transition-colors border border-slate-700 shadow-lg cursor-pointer"
              aria-label="Hito siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MODE 1: SINGLE MILESTONE DEEP INSPECTION */}
        {!compareMode && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            
            {/* Top Bar: Year, Badge and Form Factor */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500 text-slate-950 text-xs font-mono font-bold">
                    Año {currentMilestone.year}
                  </span>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                    {currentMilestone.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {parentEra.name}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {currentMilestone.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">
                  Factor de Forma: <strong className="text-white">{currentMilestone.formFactor}</strong>
                </p>
              </div>

              {/* Representative Motherboard of that year */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 lg:text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Placa Base Paradigmática</span>
                <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                  {currentMilestone.representativeBoard}
                </span>
              </div>
            </div>

            {/* Architectural Narrative Description */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
              
              {/* Left 8 Cols: Detailed History & Technical Leaps */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    El Salto Arquitectónico
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    {currentMilestone.details}
                  </p>
                </div>

                {/* Key Technical Impacts */}
                <div>
                  <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Impacto en el Diseño Electrónico y Formatos
                  </h4>
                  <div className="space-y-2">
                    {currentMilestone.keyTechnicalImpact.map((impact, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 text-xs text-slate-300">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{impact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Technical Specs Card for that Year */}
              <div className="lg:col-span-4 bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block border-b border-slate-800/80 pb-2">
                  Telemetría de la Era ({currentMilestone.year})
                </span>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Bus & Interconexión</span>
                  <span className="text-xs font-bold text-cyan-400 block mt-0.5">
                    {currentMilestone.busAndInterconnect}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Tecnología de Memoria</span>
                  <span className="text-xs font-bold text-emerald-400 block mt-0.5">
                    {currentMilestone.memoryType}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Alimentación & Fuente</span>
                  <span className="text-xs font-bold text-amber-400 block mt-0.5">
                    {currentMilestone.powerSpecs}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Ancho de Banda Máx. Bus</span>
                  <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2 py-1 rounded mt-1 inline-block border border-slate-800">
                    {currentMilestone.comparisonMetric.busSpeed}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Tasa de Almacenamiento</span>
                  <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2 py-1 rounded mt-1 inline-block border border-slate-800">
                    {currentMilestone.comparisonMetric.storageSpeed}
                  </span>
                </div>
              </div>

            </div>

            {/* Stepper Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Hito Anterior
              </button>
              <span className="text-slate-500 font-mono">
                {currentIndex + 1} de {filteredMilestones.length} hitos
              </span>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                Hito Siguiente
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* MODE 2: SIDE-BY-SIDE ERA COMPARISON MATRIX */}
        {compareMode && (
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-amber-400" />
                  Comparativa Cara a Cara de Generaciones
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Selecciona dos momentos de la historia para cotejar cómo cambiaron los factores de forma, los anchos de banda y la entrega de energía.
                </p>
              </div>

              {/* Selector for the second target */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Comparar con:</span>
                <select
                  value={compareMilestoneId}
                  onChange={(e) => setCompareMilestoneId(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-400"
                >
                  {TIMELINE_MILESTONES.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.year} - {m.title.slice(0, 35)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Side-by-Side Dual Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              {/* Column 1: Current Selected Milestone */}
              <div className="bg-slate-950 p-5 rounded-xl border border-cyan-500/40 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold bg-cyan-500 text-slate-950 px-2.5 py-0.5 rounded">
                    {currentMilestone.year}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">{currentMilestone.formFactor}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{currentMilestone.title}</h4>
                <p className="text-slate-300 leading-relaxed mb-4 text-xs">
                  {currentMilestone.architecturalLeap}
                </p>

                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Bus & Interconexión</span>
                    <strong className="text-cyan-400 font-mono text-xs">{currentMilestone.comparisonMetric.busSpeed}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Ancho de Banda Memoria</span>
                    <strong className="text-slate-200 font-mono text-xs">{currentMilestone.comparisonMetric.ramBandwidth}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Velocidad Almacenamiento</span>
                    <strong className="text-slate-200 font-mono text-xs">{currentMilestone.comparisonMetric.storageSpeed}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Placa Base de Referencia</span>
                    <strong className="text-white font-mono text-xs">{currentMilestone.representativeBoard}</strong>
                  </div>
                </div>
              </div>

              {/* Column 2: Compare Target Milestone */}
              <div className="bg-slate-950 p-5 rounded-xl border border-amber-500/40 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded">
                    {compareMilestone.year}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400">{compareMilestone.formFactor}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{compareMilestone.title}</h4>
                <p className="text-slate-300 leading-relaxed mb-4 text-xs">
                  {compareMilestone.architecturalLeap}
                </p>

                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Bus & Interconexión</span>
                    <strong className="text-amber-400 font-mono text-xs">{compareMilestone.comparisonMetric.busSpeed}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Ancho de Banda Memoria</span>
                    <strong className="text-slate-200 font-mono text-xs">{compareMilestone.comparisonMetric.ramBandwidth}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Velocidad Almacenamiento</span>
                    <strong className="text-slate-200 font-mono text-xs">{compareMilestone.comparisonMetric.storageSpeed}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Placa Base de Referencia</span>
                    <strong className="text-white font-mono text-xs">{compareMilestone.representativeBoard}</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Difference Highlight */}
            <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Transformación en {Math.abs(compareMilestone.year - currentMilestone.year)} años:</strong> Pasamos de 
                "{currentMilestone.formFactor}" con {currentMilestone.comparisonMetric.busSpeed} a 
                "{compareMilestone.formFactor}" con {compareMilestone.comparisonMetric.busSpeed}. 
                Las pistas del circuito pasaron de manejar señales de MHz a frecuencias de gigahertz con codificación PAM4 y conectores traseros sin cables.
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
