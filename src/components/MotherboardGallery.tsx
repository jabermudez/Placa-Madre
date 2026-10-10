import React, { useState } from 'react';
import { LEGENDARY_MODELS, MotherboardModel } from '../data/motherboardData';
import { GlossaryTerm } from './GlossaryTerm';
import { Award, Cpu, Zap, Layers, Calendar, ChevronRight, X, ExternalLink, ShieldCheck } from 'lucide-react';

export const MotherboardGallery: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<MotherboardModel | null>(null);
  const [filterEra, setFilterEra] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredModels = LEGENDARY_MODELS.filter((model) => {
    const matchesEra = filterEra === 'all' || model.era === filterEra;
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          model.socket.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          model.chipset.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          model.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEra && matchesSearch;
  });

  return (
    <section id="modelos" className="py-16 bg-slate-900/60 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <span>04. Hall de la Fama</span>
            <span>·</span>
            <span>Hitos de la Industria de Hardware</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Placas Base Legendarias de Cada Época
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Desde la primera arquitectura abierta en 1981 hasta las bestias modernas sin cables con carriles PCIe 5.0, 
            estos diez modelos transformaron para siempre el diseño electromecánico, el overclocking y la computación personal.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-8 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Todas las Épocas' },
              { id: 'era-pre-atx', label: 'Pre-ATX (1981-1994)' },
              { id: 'era-atx-clasica', label: 'ATX Clásica (1995-2003)' },
              { id: 'era-pcie-uefi', label: 'PCIe & UEFI (2004-2014)' },
              { id: 'era-moderna', label: 'Moderna & BTF (2015-2026+)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterEra(tab.id)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                  filterEra === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Buscar por zócalo, chipset o marca..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              {/* Year Corner Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2.5 py-1 rounded-md">
                  {model.year}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {model.manufacturer}
                </span>
              </div>

              {/* Title & Socket */}
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {model.name}
                </h3>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400 mt-2">
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Zócalo: {model.socket}
                  </span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Chipset: {model.chipset}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 mt-3 leading-relaxed">
                  {model.significance}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>Inspeccionar ficha completa</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left">
              {/* Close Button */}
              <button
                onClick={() => setSelectedModel(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-bold bg-cyan-500 text-slate-950 px-2.5 py-1 rounded-md">
                  {selectedModel.year}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {selectedModel.manufacturer} · {selectedModel.formFactor}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white leading-tight">
                {selectedModel.name}
              </h3>
              <p className="text-xs text-cyan-400 font-medium mt-1">
                {selectedModel.significance}
              </p>

              {/* Historical Context Paragraph */}
              <div className="my-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider mb-2">
                  Contexto Histórico y Relevancia Técnica
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedModel.historicalContext}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">
                    <GlossaryTerm term="socket">Zócalo de Procesador</GlossaryTerm>
                  </span>
                  <span className="text-slate-200 font-semibold">{selectedModel.socket}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">
                    <GlossaryTerm term="chipset">Chipset de Placa</GlossaryTerm>
                  </span>
                  <span className="text-slate-200 font-semibold">{selectedModel.chipset}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">
                    <GlossaryTerm term="dual-channel">Soporte de Memoria</GlossaryTerm>
                  </span>
                  <span className="text-slate-200 font-semibold">{selectedModel.memorySupport}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">
                    <GlossaryTerm term="pcie">Ranuras de Expansión</GlossaryTerm>
                  </span>
                  <span className="text-slate-200 font-semibold">{selectedModel.expansionSlots}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">
                    <GlossaryTerm term="sata">Almacenamiento en Placa</GlossaryTerm>
                  </span>
                  <span className="text-slate-200 font-semibold">{selectedModel.storageInterfaces}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">
                    <GlossaryTerm term="vrm">Regulación Eléctrica (VRM)</GlossaryTerm>
                  </span>
                  <span className="text-slate-200 font-semibold">{selectedModel.specs.vrmPhases}</span>
                </div>
              </div>

              {/* Highlights Bullet List */}
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider mb-2 flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  Hitos e Innovaciones Introducidas
                </h4>
                <div className="space-y-1.5">
                  {selectedModel.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedModel(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Cerrar Ficha
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
