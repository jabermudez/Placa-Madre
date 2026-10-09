import React, { useState } from 'react';
import { 
  EXPANSION_BUS_BENCHMARKS, 
  MEMORY_BENCHMARKS, 
  STORAGE_BENCHMARKS,
  FORM_FACTORS
} from '../data/motherboardData';
import { BarChart3, Zap, HardDrive, Layers, Info, Check, HelpCircle } from 'lucide-react';

export const ComparativeBenchmarks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buses' | 'memory' | 'storage' | 'formfactors'>('buses');

  // Max values for relative bar calculations
  const maxBus = EXPANSION_BUS_BENCHMARKS[EXPANSION_BUS_BENCHMARKS.length - 1].bandwidthMBs;
  const maxMem = MEMORY_BENCHMARKS[MEMORY_BENCHMARKS.length - 1].bandwidthGBs;
  const maxStorage = STORAGE_BENCHMARKS[STORAGE_BENCHMARKS.length - 1].speedMBs;

  return (
    <section id="comparativa" className="py-16 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <span>05. Datos Verificables & Telemetría Histórica</span>
            <span>·</span>
            <span>Comparativas entre Generaciones</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Evolución Cuantitativa del Rendimiento y Conectividad
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Gráficos comparativos y tablas técnicas basadas en las especificaciones oficiales de 
            organismos de estandarización internacional (PCI-SIG, JEDEC e Intel Corporation).
          </p>
        </div>

        {/* Comparison Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-900/60 p-2 rounded-xl border border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab('buses')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'buses'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Buses de Expansión (MB/s)
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'memory'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            Memoria RAM (GB/s por Canal)
          </button>
          <button
            onClick={() => setActiveTab('storage')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'storage'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            Almacenamiento (MB/s Sostenidos)
          </button>
          <button
            onClick={() => setActiveTab('formfactors')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'formfactors'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Factores de Forma (Dimensiones)
          </button>
        </div>

        {/* TAB 1: BUSES COMPARISON */}
        {activeTab === 'buses' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Ancho de Banda Máximo Teórico de Buses de Expansión
                </h3>
                <p className="text-xs text-slate-400">
                  Fuente: Especificaciones oficiales de PCI Special Interest Group (PCI-SIG) e IEEE.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-3 py-1 rounded-md">
                De 2.38 MB/s a 126.032 MB/s (~52.954×)
              </span>
            </div>

            {/* Visual Bars with Logarithmic Normalization for Human Readability */}
            <div className="space-y-3.5">
              {EXPANSION_BUS_BENCHMARKS.map((item, idx) => {
                // Using logarithmic scale for visual presentation because range spans 50,000x
                const logVal = Math.log10(item.bandwidthMBs);
                const maxLog = Math.log10(maxBus);
                const minLog = Math.log10(2.38);
                const percent = Math.max(4, Math.round(((logVal - minLog) / (maxLog - minLog)) * 100));

                return (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between text-xs mb-1 font-mono">
                      <span className="font-semibold text-slate-200">
                        {item.generation} ({item.year})
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-bold">
                          {item.bandwidthMBs.toLocaleString()} MB/s
                        </span>
                        <span className="text-slate-500 text-[10px] hidden sm:inline">
                          ({item.relativeGain})
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-400 rounded-full transition-all duration-500 group-hover:brightness-125"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      {item.notes}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Nota metodológica:</strong> Las barras se normalizan en escala logarítmica visual debido a la diferencia 
                monumental de cinco órdenes de magnitud (52.954×) entre el bus ISA original y PCIe 6.0 x16. Los datos de PCIe 6.0 corresponden 
                a la especificación final aprobada por PCI-SIG en 2022 con modulación PAM4 de 4 niveles.
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: MEMORY COMPARISON */}
        {activeTab === 'memory' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Tasa de Transferencia y Ancho de Banda de Memoria RAM
                </h3>
                <p className="text-xs text-slate-400">
                  Fuente: Estándares JEDEC JESD79 series (DDR a DDR5 SDRAM).
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-3 py-1 rounded-md">
                De 5.0V a 1.1V · De 0.05 a 67.20 GB/s
              </span>
            </div>

            <div className="space-y-4">
              {MEMORY_BENCHMARKS.map((mem, idx) => {
                const percent = Math.max(3, Math.round((mem.bandwidthGBs / maxMem) * 100));

                return (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between text-xs mb-1 font-mono">
                      <span className="font-semibold text-slate-200">
                        {mem.tech} ({mem.year}) · {mem.form}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-[11px]">{mem.voltage}</span>
                        <span className="text-emerald-400 font-bold">
                          {mem.bandwidthGBs.toFixed(2)} GB/s
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full transition-all duration-500 group-hover:brightness-125"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Eficiencia energética e integridad:</strong> Observa la reducción de voltaje de 5.0V en las memorias FPM de 1990 
                hasta tan solo 1.1V en DDR5. DDR5 además incorpora gestión de energía integrada en el propio módulo mediante un circuito integrado PMIC 
                y corrección de errores on-die ECC para tolerar densidades microscópicas de silicio.
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: STORAGE COMPARISON */}
        {activeTab === 'storage' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Evolución de la Velocidad de Almacenamiento en Placa Base
                </h3>
                <p className="text-xs text-slate-400">
                  De cables planos IDE paralelos a buses directos serie PCIe Gen 5 NVMe.
                </p>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/70 border border-amber-800/60 px-3 py-1 rounded-md">
                De 8.3 MB/s a 14.500 MB/s (~1.746×)
              </span>
            </div>

            <div className="space-y-4">
              {STORAGE_BENCHMARKS.map((st, idx) => {
                const logVal = Math.log10(st.speedMBs);
                const maxLog = Math.log10(maxStorage);
                const minLog = Math.log10(8.3);
                const percent = Math.max(4, Math.round(((logVal - minLog) / (maxLog - minLog)) * 100));

                return (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between text-xs mb-1 font-mono">
                      <span className="font-semibold text-slate-200">
                        {st.standard} ({st.year}) · {st.bus}
                      </span>
                      <span className="text-amber-400 font-bold">
                        {st.speedMBs.toLocaleString()} MB/s
                      </span>
                    </div>

                    <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-400 rounded-full transition-all duration-500 group-hover:brightness-125"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: FORM FACTORS COMPARISON */}
        {activeTab === 'formfactors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FORM_FACTORS.map((factor, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-cyan-500/50 transition-colors"
                >
                  <div>
                    {/* Visual Aspect Ratio Box */}
                    <div className="w-full h-36 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-3 mb-4 relative overflow-hidden">
                      <div 
                        className="border-2 border-cyan-400/80 bg-cyan-500/10 rounded flex items-center justify-center text-center p-1"
                        style={{
                          width: factor.name.includes('Mini-ITX') ? '55%' : factor.name.includes('MicroATX') ? '75%' : factor.name.includes('E-ATX') ? '98%' : '88%',
                          height: factor.name.includes('Mini-ITX') ? '70%' : factor.name.includes('MicroATX') ? '80%' : '90%'
                        }}
                      >
                        <span className="text-[11px] font-mono text-cyan-300 font-bold">
                          {factor.dimensionsMm}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">
                      {factor.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400 block mb-3">
                      {factor.dimensionsInches}
                    </span>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {factor.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Ranuras PCIe:</span>
                      <strong className="text-slate-200">Hasta {factor.expansionSlotsMax}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Ranuras RAM:</span>
                      <strong className="text-slate-200">{factor.ramSlotsTypical}</strong>
                    </div>
                    <div className="text-[11px] text-cyan-400/90 bg-cyan-950/40 p-2 rounded border border-cyan-900/40 mt-2">
                      <strong>Mercado:</strong> {factor.targetMarket}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BTF Project Zero Section */}
            <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 sm:p-8">
              <div className="max-w-3xl">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  La Última Frontera en Factores de Forma (2024 - 2026+)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  ASUS BTF (Back-To-Future) & MSI Project Zero
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Rompe con 30 años de tradición del estándar ATX. Todos los conectores gruesos 
                  (ATX de 24 pines, conectores de CPU de 8 pines, conectores de ventiladores y cabezales USB) 
                  se trasladan a la cara posterior del PCB. Además, introduce la ranura PCIe de alta potencia con ranura para gráficos dedicada de hasta 600W, 
                  eliminando por completo los cables visibles dentro del chasis y mejorando radicalmente la convección térmica.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
