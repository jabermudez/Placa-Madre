import React, { useState } from 'react';
import { GitBranch, Cpu, Zap, HardDrive, Wifi, Volume2, ArrowRight, Activity, AlertTriangle } from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  source: string;
  destination: string;
  busUsed: string;
  bandwidth: string;
  latencyRating: 'Ultra-Baja (<20ns)' | 'Baja (~50ns)' | 'Media (~150ns)' | 'Elevada (>1µs)';
  pathWay: ('CPU' | 'IMC' | 'RAM' | 'GPU' | 'M2_PRIMARY' | 'DMI_ENLACE' | 'CHIPSET' | 'SATA' | 'LAN_AUDIO')[];
  explanation: string;
  isDirectCpu: boolean;
}

export const DataFlowSimulator: React.FC = () => {
  const [architectureMode, setArchitectureMode] = useState<'moderna' | 'clasica'>('moderna');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('gpu-render');

  const modernScenarios: Scenario[] = [
    {
      id: 'gpu-render',
      name: 'Renderizado Gráfico 3D (Tarjeta GPU PCIe x16)',
      source: 'GPU Dedicada (Ranura PCIe x16)',
      destination: 'Microprocesador (CPU Cores & L3 Cache)',
      busUsed: 'PCIe 5.0 x16 Enlace Directo (32 GT/s por carril)',
      bandwidth: '63.0 GB/s Bidireccional sin intermediarios',
      latencyRating: 'Ultra-Baja (<20ns)',
      pathWay: ['GPU', 'CPU'],
      explanation: 'Las pistas del PCB conectan la ranura PCIe x16 superior directamente a las patillas del zócalo del procesador. No pasa por el chipset, evitando cualquier cuello de botella o latencia de conmutación.',
      isDirectCpu: true
    },
    {
      id: 'ram-access',
      name: 'Lectura/Escritura en Memoria RAM (Dual-Channel)',
      source: 'Módulos DRAM DDR5 (DIMM)',
      destination: 'Controlador Integrado de Memoria (IMC en CPU)',
      busUsed: 'Bus Paralelo de Dos Subcanales de 32-bit (64-bit totales)',
      bandwidth: 'Hasta 68.0 GB/s por canal (DDR5-8400 MT/s)',
      latencyRating: 'Baja (~50ns)',
      pathWay: ['RAM', 'IMC', 'CPU'],
      explanation: 'Las pistas serpenteantes del PCB tienen longitudes matemáticamente idénticas (trace matching) y conectan las ranuras DIMM directamente al silicio de la CPU a través del IMC.',
      isDirectCpu: true
    },
    {
      id: 'nvme-primary',
      name: 'Carga de Videojuego desde SSD M.2 NVMe Primario',
      source: 'SSD M.2 PCIe Gen 5 (Ranura 1)',
      destination: 'Memoria Caché y CPU',
      busUsed: '4 Carriles PCIe 5.0 dedicados de CPU',
      bandwidth: 'Hasta 14.500 MB/s de lectura sostenida',
      latencyRating: 'Ultra-Baja (<20ns)',
      pathWay: ['M2_PRIMARY', 'CPU'],
      explanation: 'Las placas modernas reservan 4 carriles PCIe exclusivos del procesador para la primera ranura M.2. Las cargas de DirectStorage van directas de NVMe a GPU/CPU sin tocar el chipset.',
      isDirectCpu: true
    },
    {
      id: 'sata-storage',
      name: 'Copia de Seguridad en Disco SATA / SSD 2.5"',
      source: 'Puerto SATA III 6 Gbps',
      destination: 'Procesador / RAM a través del Chipset',
      busUsed: 'SATA III (6 Gbps) → Chipset PCH → Enlace DMI 4.0 x8 → CPU',
      bandwidth: '~550 MB/s limitados por el bus SATA',
      latencyRating: 'Media (~150ns)',
      pathWay: ['SATA', 'CHIPSET', 'DMI_ENLACE', 'CPU'],
      explanation: 'Los puertos SATA son controlados por el Chipset PCH. El flujo de datos debe atravesar el enlace DMI (Intel) o PCIe Uplink (AMD), compartiendo ancho de banda con otros periféricos.',
      isDirectCpu: false
    },
    {
      id: 'lan-audio',
      name: 'Paquetes de Red Ethernet 2.5G & Audio HD',
      source: 'Controlador Realtek RTL8125 / Códec ALC4080',
      destination: 'Sistema Operativo y Procesador',
      busUsed: 'Carriles PCIe x1 / USB internos hacia PCH → DMI → CPU',
      bandwidth: '2.5 Gbps (312 MB/s de red) / 192 kHz 32-bit audio',
      latencyRating: 'Media (~150ns)',
      pathWay: ['LAN_AUDIO', 'CHIPSET', 'DMI_ENLACE', 'CPU'],
      explanation: 'Los chips auxiliares de red y sonido se comunican con el chipset mediante carriles PCIe secundarios o puertos USB internos del PCH antes de llegar a la CPU.',
      isDirectCpu: false
    }
  ];

  const currentScenario = modernScenarios.find(s => s.id === activeScenarioId) || modernScenarios[0];

  const isNodeActive = (node: Scenario['pathWay'][number]) => {
    return currentScenario.pathWay.includes(node);
  };

  return (
    <section id="flujo" className="py-16 bg-slate-900/60 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span>02. Topología de Interconexión</span>
            <span>·</span>
            <span>Simulador de Tráfico Interno</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¿Cómo se Comunican los Componentes?
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            En una placa madre moderna, no todos los dispositivos interactúan igual. Comprende la diferencia vital 
            entre los <strong className="text-cyan-400">carriles directos al CPU</strong> (GPU, RAM y SSD primario) 
            y los periféricos multiplexados a través del <strong className="text-purple-400">Chipset PCH</strong>.
          </p>
        </div>

        {/* Interactive Scenario Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {modernScenarios.map((scenario) => {
            const isSelected = scenario.id === activeScenarioId;
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold scale-102'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                {scenario.name}
              </button>
            );
          })}
        </div>

        {/* Topology Visualizer Container */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Top Status & Pathway Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-[11px] font-mono text-slate-400 block uppercase">Origen → Destino</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                {currentScenario.source} <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {currentScenario.destination}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block uppercase">Bus y Ancho de Banda</span>
              <span className="text-sm font-bold text-cyan-400 mt-0.5 block">
                {currentScenario.bandwidth}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block uppercase">Tipo de Conexión</span>
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded mt-1 border ${
                currentScenario.isDirectCpu
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50'
                  : 'bg-purple-950/60 text-purple-400 border-purple-800/50'
              }`}>
                {currentScenario.isDirectCpu ? 'Enlace Directo CPU (Sin Puente)' : 'Vía Chipset PCH (Multiplexado)'}
              </span>
            </div>
          </div>

          {/* Graphical Node Flow Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Direct CPU Subsystem Nodes (Left 7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900/50 rounded-xl p-5 border border-slate-800 relative">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Dominio del Procesador (Directo)</span>
                <span className="text-emerald-400">Latencia Ultra-Baja</span>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                {/* RAM Node */}
                <div className={`p-4 rounded-xl border text-center transition-all ${
                  isNodeActive('RAM')
                    ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-102 ring-2 ring-cyan-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}>
                  <Zap className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                  <span className="text-xs font-bold block">Memoria RAM</span>
                  <span className="text-[10px] text-slate-400 font-mono">DDR5 DIMMs</span>
                </div>

                {/* Central CPU Node */}
                <div className={`p-5 rounded-xl border-2 text-center transition-all ${
                  isNodeActive('CPU')
                    ? 'bg-gradient-to-b from-cyan-950 to-slate-900 border-cyan-400 text-white shadow-xl shadow-cyan-500/30 ring-4 ring-cyan-400/20'
                    : 'bg-slate-950 border-slate-700 text-slate-300'
                }`}>
                  <Cpu className="w-8 h-8 mx-auto mb-1 text-cyan-300 animate-pulse" />
                  <span className="text-sm font-extrabold block">CPU & IMC</span>
                  <span className="text-[10px] text-cyan-300 font-mono">Núcleos + L3 + IMC</span>
                </div>

                {/* Primary GPU Node */}
                <div className={`p-4 rounded-xl border text-center transition-all ${
                  isNodeActive('GPU')
                    ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-102 ring-2 ring-cyan-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}>
                  <Activity className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                  <span className="text-xs font-bold block">GPU Dedicada</span>
                  <span className="text-[10px] text-slate-400 font-mono">PCIe 5.0 x16</span>
                </div>
              </div>

              {/* Primary M.2 under CPU */}
              <div className="mt-4 flex justify-center">
                <div className={`w-3/4 p-3 rounded-xl border text-center transition-all ${
                  isNodeActive('M2_PRIMARY')
                    ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}>
                  <span className="text-xs font-bold flex items-center justify-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                    Ranura M.2 Primaria (NVMe Gen 5 x4)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Enlace directo a 4 carriles de CPU (hasta 14.5 GB/s)</span>
                </div>
              </div>
            </div>

            {/* Middle DMI / UMI Bridge */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center">
              <div className={`w-full h-1 bg-gradient-to-r transition-all ${
                isNodeActive('DMI_ENLACE') ? 'from-cyan-400 to-purple-400 h-2 shadow-lg shadow-purple-500/50' : 'from-slate-800 to-slate-800'
              }`} />
              <span className={`text-[10px] font-mono uppercase tracking-wider py-1 px-1.5 rounded mt-2 border text-center ${
                isNodeActive('DMI_ENLACE')
                  ? 'bg-purple-950 text-purple-300 border-purple-500/50 font-bold'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}>
                DMI / UMI Enlace (x8)
              </span>
            </div>

            {/* Chipset Secondary Subsystem Nodes (Right 4 Cols) */}
            <div className="lg:col-span-4 bg-slate-900/50 rounded-xl p-5 border border-slate-800 relative">
              <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Dominio del Chipset (PCH)</span>
                <span className="text-slate-400">Multiplexado</span>
              </div>

              {/* Chipset Central Node */}
              <div className={`p-4 rounded-xl border text-center mb-4 transition-all ${
                isNodeActive('CHIPSET')
                  ? 'bg-purple-950/70 border-purple-400 text-white shadow-xl shadow-purple-500/30 ring-2 ring-purple-400/30'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400'
              }`}>
                <Activity className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                <span className="text-xs font-bold block">Chipset (PCH / Promontory)</span>
                <span className="text-[10px] text-purple-300 font-mono">Concentrador de E/S</span>
              </div>

              {/* Sub-peripherals connected to PCH */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className={`p-2.5 rounded-lg border transition-all ${
                  isNodeActive('SATA')
                    ? 'bg-amber-500/20 border-amber-400 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}>
                  <HardDrive className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  <span className="text-[11px] font-bold block">Puertos SATA</span>
                  <span className="text-[9px] font-mono text-slate-400">HDDs / SSDs 2.5"</span>
                </div>

                <div className={`p-2.5 rounded-lg border transition-all ${
                  isNodeActive('LAN_AUDIO')
                    ? 'bg-amber-500/20 border-amber-400 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}>
                  <Wifi className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  <span className="text-[11px] font-bold block">LAN & Audio</span>
                  <span className="text-[9px] font-mono text-slate-400">2.5GbE / USB / HDA</span>
                </div>
              </div>
            </div>

          </div>

          {/* Educational Insight Text */}
          <div className="mt-8 bg-slate-900/80 rounded-xl p-4 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/50 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Análisis de Rendimiento: {currentScenario.name}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {currentScenario.explanation}
              </p>
            </div>
          </div>

        </div>

        {/* Historical Architecture Contrast: Northbridge vs PCH Moderno */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <h3 className="text-base font-bold text-white">Topología Clásica (1995 - 2008)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              La CPU no tenía controlador de memoria ni carriles PCIe en su silicio. Todo el tráfico hacia la RAM y la tarjeta gráfica AGP debía viajar obligatoriamente por el <strong>Front Side Bus (FSB)</strong> hacia el <strong>Northbridge</strong>, convirtiendo al FSB en un severo cuello de botella que elevaba la latencia global del sistema.
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-rose-300/90 space-y-1">
              <div>• CPU ↔ Front Side Bus (FSB) ↔ Northbridge</div>
              <div>• Northbridge ↔ Bus AGP (Gráficos) & RAM SDRAM/DDR</div>
              <div>• Northbridge ↔ Bus PCI / Propietario ↔ Southbridge</div>
              <div>• Southbridge ↔ IDE, USB 1.1, Audio AC97, Ranuras PCI</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="text-base font-bold text-white">Topología Moderna PCH / SoC (2009 - Hoy)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              El Northbridge desapareció al integrarse dentro del procesador. El CPU gestiona directamente la memoria DRAM de doble canal y los carriles PCIe de ultra alta velocidad para la GPU y el SSD M.2 primario. El <strong>Chipset (PCH)</strong> subsiste como un concentrador secundario de E/S enlazado por bus serie DMI/PCIe.
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-300/90 space-y-1">
              <div>• CPU integra IMC (RAM) + 20-28 carriles PCIe Gen 4/5</div>
              <div>• GPU y M.2 principal conectan directo al zócalo del CPU</div>
              <div>• Enlace DMI 4.0 x8 / PCIe Uplink (15.75 GB/s) hacia PCH</div>
              <div>• PCH gestiona SATA, Wi-Fi 7, 2.5GbE LAN, USB4 y audio</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
