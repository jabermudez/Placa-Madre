import React, { useState } from 'react';
import { Cpu, Zap, ShieldAlert, Sparkles, Layers, ThermometerSnowflake, FileCode, CheckCircle2 } from 'lucide-react';

export const DeepArchitectureGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vrm' | 'pcb' | 'uefi' | 'cooling'>('vrm');

  return (
    <section className="py-16 bg-slate-900/60 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <span>06. Ingeniería Eléctrica & Firmware</span>
            <span>·</span>
            <span>Investigación en Profundidad</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Fundamentos de Diseño Electromecánico
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Comprende los subsistemas invisibles que garantizan que una placa base moderna opere de forma estable 
            a gigahertzios de frecuencia sin fallas térmicas ni degradación de silicio.
          </p>
        </div>

        {/* Pillar Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { id: 'vrm', label: '1. El VRM Multifase', icon: Zap, sub: 'Regulación de Potencia & DrMOS' },
            { id: 'pcb', label: '2. Capas del PCB', icon: Layers, sub: 'Integridad de Señal & Trazas' },
            { id: 'uefi', label: '3. Firmware UEFI & POST', icon: FileCode, sub: 'Inicialización de Hardware' },
            { id: 'cooling', label: '4. Refrigeración & Sensores', icon: ThermometerSnowflake, sub: 'Disipación Térmica' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-950 border-cyan-400 shadow-xl shadow-cyan-950/40 ring-2 ring-cyan-500/20'
                    : 'bg-slate-950/40 border-slate-800 hover:bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <tab.icon className="w-4 h-4" />
                  <span className="text-xs font-bold font-mono">{tab.label}</span>
                </div>
                <span className="text-[11px] text-slate-400 block">{tab.sub}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Content */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
          
          {/* TAB 1: VRM */}
          {activeTab === 'vrm' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Sub-sistema de Alimentación Eléctrica
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Módulo Regulador de Voltaje (VRM: Voltage Regulator Module)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  El procesador no puede alimentarse directamente de los 12 voltios de la fuente de poder; se destruiría en nanosegundos. 
                  El VRM convierte de forma ultra-eficiente los +12V DC en una tensión dinámica de entre 0.7V y 1.45V (VCore), 
                  entregando corrientes colosales de hasta 250 a 350 amperios con un rizado de tensión (ripple) de menos de 10 milivoltios.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 font-mono block mb-1">Controlador PWM Digital</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    El "cerebro" del VRM. Muestrea el voltaje de la CPU millones de veces por segundo y genera pulsos modulados en ancho (PWM) 
                    a frecuencias de entre 300 kHz y 800 kHz para conmutar las fases en secuencia.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 font-mono block mb-1">Etapas de Potencia DrMOS / SPS</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sustituyen a los antiguos MOSFETs discretos "High-Side" y "Low-Side". Integran el controlador de puerta (driver) 
                    y ambos transistores de efecto de campo en un único silicio térmicamente optimizado capaz de soportar hasta 105A continuos.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 font-mono block mb-1">Bobinas (Chokes) y Condensadores</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Inductores con núcleo de ferrita blindada que suavizan la corriente conmutada, seguidos de condensadores poliméricos sólidos 
                    japoneses de 10.000 horas que absorben los picos de voltaje transitorios.
                  </p>
                </div>
              </div>

              {/* Historical Context: The Capacitor Plague */}
              <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-4 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs text-rose-200/90 leading-relaxed">
                  <strong className="text-rose-300 block mb-0.5">Lección Histórica: La "Plaga de Condensadores" (2002 - 2007)</strong>
                  Millones de placas base de fabricantes reconocidos fallaron prematuramente debido a una fórmula química robada de electrolito defectuoso. 
                  Los condensadores se hinchaban y reventaban derramando líquido corrosivo. Esta catástrofe forzó a la industria a adoptar 
                  de manera universal los condensadores de polímero de estado sólido (Solid Caps) que vemos en las placas modernas.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PCB & SIGNAL INTEGRITY */}
          {activeTab === 'pcb' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Física de Circuitos de Alta Frecuencia
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Capas del PCB (Printed Circuit Board) e Integridad de Señal
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  A frecuencias de bus de 8.000 MT/s en DDR5 y 32 GT/s en PCIe 5.0, las pistas de cobre de la placa madre 
                  no se comportan como simples cables conductores, sino como líneas de transmisión electromagnética de microondas 
                  sensibles a reflexiones parásitas, diafonía (crosstalk) e interferencias inductivas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white font-mono text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Estructura Multicapa (6 a 12 Capas)
                  </h4>
                  <p className="leading-relaxed">
                    Las placas de gama de entrada tienen 6 capas; las de gama entusiasta montan 8, 10 o hasta 12 capas. 
                    Las capas externas contienen los componentes y pistas de escape; las capas intermedias alojan planos continuos de masa (GND) 
                    y alimentación (VCC) que actúan como apantallamiento electromagnético.
                  </p>
                  <p className="leading-relaxed text-slate-400">
                    Se emplean láminas de cobre de 2 onzas (2 oz copper PCB) para duplicar la masa térmica y reducir la resistencia eléctrica en los planos de alimentación del VRM.
                  </p>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white font-mono text-sm flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    Ruteo Daisy-Chain vs T-Topology
                  </h4>
                  <p className="leading-relaxed">
                    <strong>Daisy-Chain:</strong> Las pistas de memoria van primero a la ranura 2 y luego continúan a la ranura 1. 
                    Es el diseño dominante hoy porque maximiza la velocidad cuando solo se instalan 2 módulos de RAM (óptimo para DDR5 a 7000+ MT/s).
                  </p>
                  <p className="leading-relaxed text-slate-400">
                    <strong>T-Topology:</strong> La pista se divide a mitad de camino de forma simétrica hacia ambas ranuras. Ofrece estabilidad equilibrada si se llenan las 4 ranuras, pero penaliza la frecuencia pico.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: UEFI FIRMWARE */}
          {activeTab === 'uefi' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Firmware de Inicialización de Bajo Nivel
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  La Transición de BIOS a UEFI (Unified Extensible Firmware Interface)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Durante 30 años, los PCs arrancaban con la BIOS de 16 bits heredada del IBM PC de 1981, atrapada en el modo real del procesador 
                  con acceso a solo 1 MB de memoria y limitada al esquema de partición MBR (máximo 2 TB por disco). UEFI revolucionó 
                  el arranque hacia un sistema operativo modular de 64 bits embebido en la placa base.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 font-mono block mb-1">Secuencia POST y Q-LEDs</span>
                  <p className="text-slate-300 leading-relaxed">
                    Al encenderse, la placa comprueba sucesivamente la CPU, la RAM, la GPU y el almacenamiento de arranque. 
                    Los 4 diodos Q-LED (o una pantalla digital de dos dígitos con códigos hexadecimales de depuración) permiten diagnosticar fallas en segundos.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 font-mono block mb-1">Tablas GPT y Secure Boot</span>
                  <p className="text-slate-300 leading-relaxed">
                    Soporte para GUID Partition Table (GPT) sin límite práctico de tamaño de disco (hasta 9.4 zettabytes), 
                    y firma criptográfica de controladores y cargadores de arranque para impedir la inyección de bootkits a nivel de hardware.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 font-mono block mb-1">BIOS Flashback Autónomo</span>
                  <p className="text-slate-300 leading-relaxed">
                    Un microcontrolador dedicado (ej. chip AI Suite o ITE) puede reprogramar el chip SPI Flash leyendo un archivo desde una memoria USB 
                    incluso con la placa base vacía, sin necesidad de tener CPU, memoria RAM o pantalla conectadas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COOLING */}
          {activeTab === 'cooling' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Gestión Térmica Integrada
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Disipación Pasiva, Almohadillas Térmicas y Cabezales PWM
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Con procesadores modernos consumiendo más de 250W y unidades SSD M.2 PCIe Gen 5 que superan los 80°C bajo carga continua, 
                  la placa base ha evolucionado de un circuito desnudo a una estructura equipada con masivos bloques de aluminio extruido, 
                  tubos de calor de cobre niquelado (heatpipes) y almohadillas de conductividad térmica de hasta 7 W/mK.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <strong className="text-white block font-mono text-xs mb-1">Disipadores M.2 Shield Frozr / Thermal Guards</strong>
                  <p className="leading-relaxed">
                    Bloques de aluminio atornillados o con cierres rápidos sin herramientas (Q-Latch) con almohadillas térmicas en ambas caras 
                    para refrigerar tanto el controlador de la memoria NAND como el chip de caché DRAM, evitando el estrangulamiento térmico (thermal throttling).
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <strong className="text-white block font-mono text-xs mb-1">Cabezales de Bomba AIO Líquida dedicados</strong>
                  <p className="leading-relaxed">
                    Cabezales de ventilador de 4 pines marcados como AIO_PUMP o W_PUMP+ capaces de suministrar hasta 2A a 3A continuos (24W a 36W) 
                    a plena potencia constante para alimentar bombas de refrigeración líquida sin quemar los transistores del cabezal.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
