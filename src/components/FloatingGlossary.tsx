import React, { useState, useEffect } from 'react';
import { useGlossary } from '../context/GlossaryContext';
import { GLOSSARY_ITEMS, GlossaryItem } from '../data/glossaryData';
import { 
  BookOpen, 
  X, 
  Search, 
  Layers, 
  Zap, 
  Cpu, 
  ArrowRight, 
  Info, 
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  Volume2,
  Maximize2,
  Minimize2,
  Pin,
  ExternalLink
} from 'lucide-react';

export const FloatingGlossary: React.FC = () => {
  const { 
    activeTerm, 
    closeTerm, 
    openTerm,
    isDrawerOpen, 
    toggleDrawer,
    openDrawerWithSearch
  } = useGlossary();

  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDockedCorner, setIsDockedCorner] = useState(false);

  // Close with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeTerm) {
          closeTerm();
        } else if (isDrawerOpen) {
          toggleDrawer();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTerm, isDrawerOpen, closeTerm, toggleDrawer]);

  // Reset copied state on activeTerm change
  useEffect(() => {
    setIsCopied(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [activeTerm]);

  const handleCopyDefinition = () => {
    if (!activeTerm) return;
    const textToCopy = `${activeTerm.term} (${activeTerm.acronym || ''}): ${activeTerm.shortDefinition}\n\nExplicación: ${activeTerm.fullDefinition}\n\nRelevancia en la Placa Base: ${activeTerm.hardwareRelevance}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!activeTerm || !('speechSynthesis' in window)) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${activeTerm.term}. ${activeTerm.shortDefinition}. ${activeTerm.fullDefinition}`);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const filteredItems = GLOSSARY_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.term.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (item.acronym && item.acronym.toLowerCase().includes(searchFilter.toLowerCase())) ||
      item.shortDefinition.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.fullDefinition.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeColor = (cat: GlossaryItem['category']) => {
    switch (cat) {
      case 'energia': return 'bg-amber-950/70 text-amber-400 border-amber-800/60';
      case 'buses': return 'bg-cyan-950/70 text-cyan-400 border-cyan-800/60';
      case 'memoria': return 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60';
      case 'firmware': return 'bg-purple-950/70 text-purple-400 border-purple-800/60';
      case 'almacenamiento': return 'bg-orange-950/70 text-orange-400 border-orange-800/60';
      case 'arquitectura': return 'bg-blue-950/70 text-blue-400 border-blue-800/60';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getCategoryLabel = (cat: GlossaryItem['category']) => {
    switch (cat) {
      case 'energia': return 'Alimentación & VRM';
      case 'buses': return 'Buses & Señalización';
      case 'memoria': return 'Memoria DRAM';
      case 'firmware': return 'Firmware & BIOS';
      case 'almacenamiento': return 'Almacenamiento NVMe/SATA';
      case 'arquitectura': return 'Arquitectura del PCB & Sockets';
    }
  };

  return (
    <>
      {/* 1. FLOATING PERMANENT GLOSSARY TRIGGER BUTTON (Bottom-Right) */}
      <aside aria-label="Acceso a Glosario Técnico" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleDrawer}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 border border-cyan-500/40 hover:border-cyan-400 shadow-2xl shadow-cyan-950/70 transition-all font-mono text-xs font-bold tracking-wide backdrop-blur-md group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          title="Abrir Glosario Técnico de Placas Base"
          aria-label="Abrir Glosario Técnico"
        >
          <BookOpen className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
          <span className="hidden sm:inline">Glosario Técnico</span>
          <span className="bg-cyan-950 group-hover:bg-slate-900 group-hover:text-cyan-300 text-cyan-400 text-[10px] px-2 py-0.5 rounded-full border border-cyan-800/60 font-mono">
            {GLOSSARY_ITEMS.length} términos
          </span>
        </button>
      </aside>

      {/* 2. CONTEXTUAL FLOATING DEFINITION CARD (Triggered by clicking an underlined term) */}
      {activeTerm && (
        isDockedCorner ? (
          /* DOCKED HUD MODE: Non-modal, anchored in bottom-right so the user can freely scroll and read while viewing definitions */
          <div 
            className="fixed bottom-20 right-6 z-50 w-full max-w-md bg-slate-900/95 border-2 border-cyan-500/70 rounded-2xl p-5 shadow-2xl shadow-cyan-950/80 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200 text-left"
            role="region"
            aria-label={`Definición flotante de ${activeTerm.term}`}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getCategoryBadgeColor(activeTerm.category)}`}>
                  {getCategoryLabel(activeTerm.category)}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40 flex items-center gap-1">
                  <Pin className="w-2.5 h-2.5" /> Ficha Anclada
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsDockedCorner(false)}
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Ampliar a ventana central"
                  aria-label="Ampliar a ventana central"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={closeTerm}
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Cerrar ficha"
                  aria-label="Cerrar ficha"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-black text-white leading-tight mb-1 flex items-center justify-between">
              <span>{activeTerm.term}</span>
              {activeTerm.acronym && (
                <span className="text-[11px] font-mono text-cyan-300 font-normal">
                  ({activeTerm.acronym})
                </span>
              )}
            </h3>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 mb-3">
              <p className="text-xs font-semibold text-cyan-300 leading-snug">
                {activeTerm.shortDefinition}
              </p>
            </div>

            <div className="max-h-48 overflow-y-auto pr-1 space-y-2 text-xs text-slate-300 leading-relaxed mb-3">
              <p>{activeTerm.fullDefinition}</p>
              <div className="bg-emerald-950/30 p-2 rounded border border-emerald-900/50 text-emerald-200/90 text-[11px]">
                <strong className="text-emerald-400 block mb-0.5">En la Placa Base:</strong>
                {activeTerm.hardwareRelevance}
              </div>
            </div>

            {/* Related Terms */}
            {activeTerm.relatedTerms.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 w-full block">Relacionados:</span>
                {activeTerm.relatedTerms.map(relId => {
                  const relItem = GLOSSARY_ITEMS.find(i => i.id === relId);
                  if (!relItem) return null;
                  return (
                    <button
                      key={relId}
                      onClick={() => openTerm(relId)}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 text-slate-300 text-[10px] font-mono transition-colors cursor-pointer border border-slate-700/60"
                    >
                      {relItem.term}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyDefinition}
                  className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                  title="Copiar texto de definición"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
                </button>
                <button
                  onClick={handleSpeak}
                  className={`flex items-center gap-1 cursor-pointer transition-colors ${isSpeaking ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-cyan-300'}`}
                  title="Escuchar locución"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{isSpeaking ? 'Pausar' : 'Audio'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  closeTerm();
                  openDrawerWithSearch(activeTerm.term);
                }}
                className="text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
              >
                Ver todos
              </button>
            </div>
          </div>
        ) : (
          /* CENTERED MODAL MODE: High-focus immersive card with easy dismissal */
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={closeTerm}
          >
            <div 
              className="bg-slate-900 border border-cyan-500/60 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative text-left animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="term-title"
            >
              {/* Header Toolbar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getCategoryBadgeColor(activeTerm.category)}`}>
                    {getCategoryLabel(activeTerm.category)}
                  </span>
                  {activeTerm.acronym && (
                    <span className="text-[11px] font-mono text-slate-400">
                      {activeTerm.acronym}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsDockedCorner(true)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-cyan-300 hover:bg-slate-700 transition-colors cursor-pointer"
                    title="Anclar en la esquina flotante para seguir navegando sin tapar la pantalla"
                    aria-label="Anclar en la esquina"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeTerm}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                    title="Cerrar definición (Esc)"
                    aria-label="Cerrar definición rápida"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Badge */}
              <h3 id="term-title" className="text-xl sm:text-2xl font-black text-white leading-tight mb-2 flex items-center gap-2">
                <span>{activeTerm.term}</span>
                <span className="text-xs font-mono font-normal text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-2 py-0.5 rounded">
                  Definición Rápida
                </span>
              </h3>

              {/* Short Definition Highlight */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 mb-4">
                <p className="text-xs sm:text-sm font-semibold text-cyan-300 leading-relaxed">
                  {activeTerm.shortDefinition}
                </p>
              </div>

              {/* In-depth explanation */}
              <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed mb-5 max-h-64 overflow-y-auto pr-1">
                <div>
                  <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block mb-1">
                    Explicación Técnica:
                  </span>
                  <p className="text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 leading-relaxed">
                    {activeTerm.fullDefinition}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase font-bold text-emerald-400 block mb-1">
                    Relevancia en la Placa Base:
                  </span>
                  <p className="text-slate-300 bg-emerald-950/20 p-3 rounded-lg border border-emerald-900/40 text-emerald-100/90 leading-relaxed">
                    {activeTerm.hardwareRelevance}
                  </p>
                </div>

                {/* Related terms pills */}
                {activeTerm.relatedTerms.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1.5">
                      Términos Relacionados en el Glosario:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeTerm.relatedTerms.map(relId => {
                        const relItem = GLOSSARY_ITEMS.find(i => i.id === relId);
                        if (!relItem) return null;
                        return (
                          <button
                            key={relId}
                            onClick={() => openTerm(relId)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 border border-slate-700"
                          >
                            {relItem.term}
                            <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyDefinition}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Copiar definición completa"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? '¡Copiado!' : 'Copiar'}</span>
                  </button>

                  <button
                    onClick={handleSpeak}
                    className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isSpeaking ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                    }`}
                    title="Escuchar lectura en voz alta"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeaking ? 'Detener' : 'Audio'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      closeTerm();
                      openDrawerWithSearch(activeTerm.term);
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Índice Completo</span>
                  </button>

                  <button
                    onClick={closeTerm}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* 3. SLIDE-OVER FULL DICTIONARY DRAWER */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={toggleDrawer}
        >
          <div 
            className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Glosario Técnico de Hardware"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    Glosario Técnico de Hardware
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {GLOSSARY_ITEMS.length} definiciones técnicas verificadas
                  </span>
                </div>
              </div>

              <button
                onClick={toggleDrawer}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Cerrar panel de glosario"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Category Filters */}
            <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar término, sigla o concepto (ej. VRM, PCIe, LGA, Chipset)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'energia', label: 'VRM & Energía' },
                  { id: 'buses', label: 'Buses PCIe/AGP' },
                  { id: 'memoria', label: 'DRAM & Canales' },
                  { id: 'almacenamiento', label: 'NVMe & SATA' },
                  { id: 'firmware', label: 'UEFI & BIOS' },
                  { id: 'arquitectura', label: 'PCB & Zócalos' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Terms List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-800/40">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No se encontraron términos que coincidan con "{searchFilter}".
                </div>
              ) : (
                filteredItems.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      toggleDrawer();
                      openTerm(item.id);
                    }}
                    className="pt-3 first:pt-0 group cursor-pointer hover:bg-slate-950/60 p-2.5 rounded-xl transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        {item.term}
                        {item.acronym && (
                          <span className="text-[10px] font-mono text-slate-400 font-normal">
                            ({item.acronym})
                          </span>
                        )}
                      </h4>
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${getCategoryBadgeColor(item.category)}`}>
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {item.shortDefinition}
                    </p>

                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                      <span>Ver ficha detallada</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer Notice */}
            <div className="p-3 border-t border-slate-800 bg-slate-950 text-center text-[10px] font-mono text-slate-500">
              Haz clic en cualquier término subrayado en la página para ver su definición rápida al instante.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
