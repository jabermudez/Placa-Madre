import React from 'react';
import { Cpu, Zap, Activity, HardDrive, Compass, ChevronDown } from 'lucide-react';
import { GlossaryTerm } from './GlossaryTerm';

interface HeroSectionProps {
  onExploreAnatomy: () => void;
  onExploreTimeline: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreAnatomy, onExploreTimeline }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/80 bg-radial-[at_top_center] from-slate-900 via-slate-950 to-slate-950">
      {/* Decorative PCB Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 211, 238, 0.25) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Investigación Técnica Exhaustiva · Arquitectura y Hardware
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            La Columna Vertebral del Computador:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Anatomía, Arquitectura y Generaciones
            </span>
          </h1>

          {/* Core premise with interactive glossary terms */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            La placa base (motherboard o tarjeta madre) es el circuito impreso multicapa más complejo del sistema.
            Actúa como centro neurálgico coordinando el microprocesador, la memoria RAM de acceso directo,
            los buses de expansión <GlossaryTerm term="pcie">PCIe</GlossaryTerm> de alta velocidad, los módulos de alimentación <GlossaryTerm term="vrm">VRM</GlossaryTerm> multifase y
            el ecosistema de almacenamiento <GlossaryTerm term="m2">NVMe</GlossaryTerm> e interfaces de entrada/salida.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreAnatomy}
              className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              Explorar Anatomía (19 Componentes)
            </button>
            <button
              onClick={onExploreTimeline}
              className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              Evolución Histórica (1981 - 2026+)
            </button>
          </div>
        </div>

        {/* 4 Pillars of the Motherboard Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/70 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Interconexión Central</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enlaza el zócalo de la CPU con la memoria mediante <GlossaryTerm term="imc">IMC</GlossaryTerm> e interfaces serie <GlossaryTerm term="dmi">DMI</GlossaryTerm> hacia el <GlossaryTerm term="chipset">chipset</GlossaryTerm>.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/70 border border-emerald-800/40 flex items-center justify-center text-emerald-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Regulación Eléctrica (<GlossaryTerm term="vrm">VRM</GlossaryTerm>)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Convierte los +12V de la fuente mediante etapas <GlossaryTerm term="drmos">DrMOS / SPS</GlossaryTerm> en voltajes milivoltio-precisos (0.7V - 1.4V) con corrientes de más de 300A para la CPU.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-950/70 border border-amber-800/40 flex items-center justify-center text-amber-400 mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Buses de Expansión <GlossaryTerm term="pcie">PCIe</GlossaryTerm></h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Canales diferenciales serie escalables (x1 a x16) que han multiplicado por más de 50.000 veces el ancho de banda del ISA original hasta <GlossaryTerm term="pam4">PCIe 6.0</GlossaryTerm>.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-950/70 border border-purple-800/40 flex items-center justify-center text-purple-400 mb-3">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Almacenamiento & E/S</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              De cintas de cassette e IDE de 8 MB/s a ranuras <GlossaryTerm term="m2">M.2 NVMe Gen 5</GlossaryTerm> conectadas directamente a los carriles PCIe a más de 14.500 MB/s.
            </p>
          </div>
        </div>

        {/* Rapid Technical Metrics Banner */}
        <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">1981 → 2026</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">45 Años de Evolución</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">2.38 MB/s → 126 GB/s</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Ancho de Banda de Bus</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">2 → 12 Capas</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Complejidad del PCB</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">19 Componentes</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Subsistemas Clave Mapeados</span>
          </div>
        </div>
      </div>
    </section>
  );
};
