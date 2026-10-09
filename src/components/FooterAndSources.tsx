import React from 'react';
import { SOURCES_AND_REFERENCES } from '../data/motherboardData';
import { BookOpen, ExternalLink, ShieldCheck, AlertCircle, Cpu } from 'lucide-react';

export const FooterAndSources: React.FC = () => {
  return (
    <footer id="fuentes" className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Conclusions / Future Architecture Outlook */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-16 shadow-2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <span>07. Conclusiones & Perspectiva de Futuro</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Hacia Dónde va la Arquitectura de la Placa Base
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              La placa base ha dejado de ser un simple circuito impreso pasivo para transformarse en un sistema ciberfísico de alta precisión. 
              En los próximos años, cuatro vectores marcarán la siguiente revolución:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-xs text-slate-300">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-400 block mb-1 font-mono">1. Adopción de CAMM2</span>
              <p className="text-slate-400 leading-relaxed">
                Los módulos de memoria de conexión por compresión CAMM2 sustituirán paulatinamente a las ranuras DIMM tradicionales, 
                eliminando los rebotes inductivos de los zócalos y permitiendo velocidades superiores a 10.000 MT/s en espacio ultra-compacto.
              </p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-400 block mb-1 font-mono">2. Conectores Ocultos BTF</span>
              <p className="text-slate-400 leading-relaxed">
                La reubicación de todas las tomas de alimentación en el reverso del PCB se consolidará como estándar industrial, 
                optimizando el túnel de viento térmico y facilitando el ensamblaje automatizado y limpio.
              </p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-400 block mb-1 font-mono">3. Señalización PAM4 (PCIe 6.0)</span>
              <p className="text-slate-400 leading-relaxed">
                La transición de señalización binaria NRZ (0 o 1) a modulación de amplitud de pulsos de 4 niveles (PAM4) duplicará 
                el ancho de banda por ciclo de reloj, requiriendo sustratos de PCB de ultra baja pérdida dieléctrica (Low-Dk).
              </p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-400 block mb-1 font-mono">4. Interconexión Óptica en Placa</span>
              <p className="text-slate-400 leading-relaxed">
                A medida que las pistas de cobre alcancen sus límites de resistencia y disipación térmica, los primeros enlaces 
                ópticos integrados (co-packaged optics) comenzarán a conectar directamente la CPU con los aceleradores de cálculo.
              </p>
            </div>
          </div>
        </div>

        {/* References and Bibliography Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            Fuentes Bibliográficas & Metodología de Investigación
          </div>
          <h3 className="text-xl font-bold text-white">
            Documentación Técnica Consultada y Verificación de Datos
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Todos los valores de anchos de banda, voltajes, tasas de transferencia y arquitecturas de bus presentados en esta web 
            han sido contrastados contra los documentos canónicos de las entidades reguladoras correspondientes.
          </p>
        </div>

        {/* Sources Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {SOURCES_AND_REFERENCES.map((src, index) => (
            <div key={index} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  {src.organization} · {src.year}
                </span>
                <h4 className="text-sm font-bold text-slate-100 mt-0.5 mb-1.5">
                  {src.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {src.scope}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{src.url}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Historical Disclaimer & Accuracy Note */}
        <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 flex items-start gap-3 mb-12 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-slate-400 leading-relaxed">
            <strong className="text-slate-200 block mb-0.5">Nota de Tolerancia de Datos Históricos (1981 - 1995):</strong>
            En las arquitecturas previas a la especificación ATX de 1995 (como los buses ISA de 8 y 16 bits, el bus MCA de IBM y los primeros estándares IDE), 
            los anchos de banda prácticos variaban según la frecuencia del oscilador de cristal de cada fabricante y la implementación del chip DMA. 
            Las cifras indicadas en esta investigación representan las especificaciones canónicas teóricas de ingeniería recogidas en las patentes y manuales originales.
          </div>
        </div>

        {/* Clean Modern Footer Bottom */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-300">
              Arquitectura de la Placa Base · Guía Técnica Integral
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
            <span>Redactado e investigado íntegramente en español</span>
            <span>·</span>
            <span>Estándares IEEE / PCI-SIG / JEDEC</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
