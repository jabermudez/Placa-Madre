import React from 'react';

interface ComponentIllustrationProps {
  id: number;
  className?: string;
}

export const ComponentIllustration: React.FC<ComponentIllustrationProps> = ({ id, className = "w-full h-48" }) => {
  switch (id) {
    case 8: // Socket del CPU
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 300 240" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="20" width="250" height="200" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
            <rect x="45" y="40" width="210" height="160" rx="4" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
            {/* Gold pin array pattern */}
            <g fill="#f59e0b" fillOpacity="0.8">
              {[...Array(9)].map((_, r) => (
                [...Array(12)].map((_, c) => (
                  <circle key={`${r}-${c}`} cx={65 + c * 15} cy={55 + r * 16} r="2.5" />
                ))
              ))}
            </g>
            {/* Socket retention frame */}
            <rect x="35" y="30" width="230" height="180" rx="6" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="16 8" />
            {/* ILM Lever */}
            <line x1="270" y1="25" x2="270" y2="215" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
            <circle cx="270" cy="215" r="8" fill="#94a3b8" stroke="#f8fafc" strokeWidth="2" />
            <text x="150" y="228" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">ZÓCALO LGA / CONTACTOS DORADOS</text>
          </svg>
        </div>
      );

    case 9: // Ranuras RAM
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 320 180" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Slot 1 & 2 */}
            <rect x="20" y="30" width="280" height="26" rx="3" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            <rect x="35" y="38" width="115" height="10" fill="#0284c7" />
            <rect x="165" y="38" width="120" height="10" fill="#0284c7" />
            {/* Notch */}
            <rect x="152" y="34" width="10" height="18" fill="#0f172a" />
            {/* Retention latches */}
            <polygon points="15,25 25,35 15,45" fill="#38bdf8" />
            <polygon points="305,25 295,35 305,45" fill="#38bdf8" />

            {/* Slot 2 */}
            <rect x="20" y="70" width="280" height="26" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <rect x="35" y="78" width="115" height="10" fill="#334155" />
            <rect x="165" y="78" width="120" height="10" fill="#334155" />
            <rect x="152" y="74" width="10" height="18" fill="#0f172a" />

            {/* Slot 3 */}
            <rect x="20" y="110" width="280" height="26" rx="3" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            <rect x="35" y="118" width="115" height="10" fill="#0284c7" />
            <rect x="165" y="118" width="120" height="10" fill="#0284c7" />
            <rect x="152" y="114" width="10" height="18" fill="#0f172a" />

            <text x="160" y="165" fill="#67e8f9" fontSize="10" fontFamily="monospace" textAnchor="middle">CANAL DUAL: 288 CONTACTOS + PMIC</text>
          </svg>
        </div>
      );

    case 16: // PCIe x16
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 340 160" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Steel Armor Outer */}
            <rect x="20" y="45" width="280" height="45" rx="5" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
            {/* Plastic inner slot */}
            <rect x="26" y="52" width="268" height="30" rx="3" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
            {/* Key section */}
            <rect x="35" y="60" width="40" height="14" fill="#1e293b" />
            <rect x="80" y="55" width="8" height="24" fill="#0f172a" />
            <rect x="93" y="60" width="190" height="14" fill="#1e293b" />
            {/* PCIe Retention Clip Q-Release */}
            <path d="M 305 40 L 325 65 L 305 90 Z" fill="#06b6d4" stroke="#e0f2fe" strokeWidth="1.5" />
            {/* Anchor solder pins */}
            <circle cx="35" cy="110" r="3" fill="#f59e0b" />
            <circle cx="160" cy="110" r="3" fill="#f59e0b" />
            <circle cx="285" cy="110" r="3" fill="#f59e0b" />
            <text x="170" y="135" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">PCI EXPRESS x16 REFORZADA (STEEL ARMOR)</text>
          </svg>
        </div>
      );

    case 11: // Chipset PCH
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 280 200" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Heatsink Block */}
            <rect x="40" y="30" width="200" height="140" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2.5" />
            {/* Aluminum Fin Lines */}
            {[...Array(7)].map((_, i) => (
              <line key={i} x1={60 + i * 23} y1="45" x2={60 + i * 23} y2="155" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            ))}
            {/* Central Core Emblem */}
            <rect x="90" y="65" width="100" height="70" rx="4" fill="#0f172a" stroke="#c084fc" strokeWidth="2" />
            <text x="140" y="100" fill="#f3e8ff" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CHIPSET</text>
            <text x="140" y="118" fill="#a855f7" fontSize="9" fontFamily="monospace" textAnchor="middle">PCH HUB</text>
            <text x="140" y="185" fill="#c084fc" fontSize="10" fontFamily="monospace" textAnchor="middle">CONCENTRADOR DE E/S & DMI</text>
          </svg>
        </div>
      );

    case 15: // M.2 Slot
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 320 160" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* PCB Slot Connector */}
            <rect x="25" y="55" width="50" height="40" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <rect x="32" y="65" width="36" height="20" fill="#047857" />
            {/* M.2 PCB Board Shape (2280) */}
            <rect x="75" y="58" width="180" height="34" rx="2" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
            {/* NAND chips */}
            <rect x="95" y="63" width="40" height="24" rx="2" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <rect x="145" y="63" width="40" height="24" rx="2" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <rect x="195" y="65" width="22" height="20" rx="2" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
            {/* Standoff & Screw */}
            <circle cx="260" cy="75" r="7" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="260" cy="75" r="2" fill="#0f172a" />
            <text x="160" y="125" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle">FORMATO 2280 NVMe (HASTA 14.5 GB/s)</text>
          </svg>
        </div>
      );

    case 10: // ATX 24 Pin
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="40" width="220" height="75" rx="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
            {/* 2x12 Pin Grid */}
            <g fill="#fbbf24">
              {[...Array(12)].map((_, i) => (
                <React.Fragment key={i}>
                  <rect x={42 + i * 16} y="50" width="11" height="11" rx="1.5" />
                  <rect x={42 + i * 16} y="88" width="11" height="11" rx="1.5" />
                </React.Fragment>
              ))}
            </g>
            {/* Plastic latch on top */}
            <rect x="105" y="32" width="70" height="10" rx="2" fill="#d97706" />
            <text x="140" y="145" fill="#fde68a" fontSize="10" fontFamily="monospace" textAnchor="middle">CONECTOR MOLEX MINI-FIT 24 PINES (+12V/+5V/+3.3V)</text>
          </svg>
        </div>
      );

    case 7: // CPU EPS 8 Pin
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 240 180" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="45" width="140" height="70" rx="4" fill="#0f172a" stroke="#eab308" strokeWidth="2.5" />
            <g fill="#ca8a04">
              <rect x="62" y="55" width="22" height="22" rx="2" />
              <rect x="92" y="55" width="22" height="22" rx="2" />
              <rect x="122" y="55" width="22" height="22" rx="2" />
              <rect x="152" y="55" width="22" height="22" rx="2" />
              <rect x="62" y="83" width="22" height="22" rx="2" />
              <rect x="92" y="83" width="22" height="22" rx="2" />
              <rect x="122" y="83" width="22" height="22" rx="2" />
              <rect x="152" y="83" width="22" height="22" rx="2" />
            </g>
            <rect x="95" y="37" width="50" height="9" rx="2" fill="#a16207" />
            <text x="120" y="145" fill="#fef08a" fontSize="10" fontFamily="monospace" textAnchor="middle">ALIMENTACIÓN EPS 12V CPU (HASTA 384W)</text>
          </svg>
        </div>
      );

    case 14: // Batería CMOS
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 240 180" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Socket housing */}
            <circle cx="120" cy="85" r="58" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
            {/* Lithium Coin Cell */}
            <circle cx="120" cy="85" r="48" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="120" cy="85" r="42" fill="#cbd5e1" />
            <text x="120" y="80" fill="#0f172a" fontSize="13" fontFamily="sans-serif" textAnchor="middle" fontWeight="black">CR2032</text>
            <text x="120" y="96" fill="#1e293b" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">+ 3V LITHIUM</text>
            {/* Metal Spring Retention Tab */}
            <rect x="110" y="27" width="20" height="15" rx="2" fill="#e2e8f0" stroke="#94a3b8" />
            <text x="120" y="165" fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">CELDA DE LITIO PARA RESPALDO RTC Y NVRAM</text>
          </svg>
        </div>
      );

    case 19: // BIOS SPI Flash
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 240 180" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="45" width="120" height="85" rx="5" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="75" cy="60" r="5" fill="#0284c7" />
            <text x="120" y="85" fill="#f8fafc" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">UEFI BIOS</text>
            <text x="120" y="103" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle">SPI 256Mb FLASH</text>
            {/* 8 Pins SOIC */}
            <g stroke="#94a3b8" strokeWidth="3">
              <line x1="45" y1="60" x2="60" y2="60" />
              <line x1="45" y1="78" x2="60" y2="78" />
              <line x1="45" y1="96" x2="60" y2="96" />
              <line x1="45" y1="114" x2="60" y2="114" />
              <line x1="180" y1="60" x2="195" y2="60" />
              <line x1="180" y1="78" x2="195" y2="78" />
              <line x1="180" y1="96" x2="195" y2="96" />
              <line x1="180" y1="114" x2="195" y2="114" />
            </g>
            <text x="120" y="155" fill="#7dd3fc" fontSize="10" fontFamily="monospace" textAnchor="middle">MEMORIA FLASH SPI DE ARRANQUE Y MICROÓDIGO</text>
          </svg>
        </div>
      );

    case 12: // SATA Ports
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 260 180" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="35" width="80" height="95" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            <rect x="140" y="35" width="80" height="95" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            {/* L-shaped connector keys */}
            <path d="M 55 55 L 105 55 L 105 75 L 90 75 L 90 65 L 55 65 Z" fill="#0284c7" />
            <path d="M 55 95 L 105 95 L 105 115 L 90 115 L 90 105 L 55 105 Z" fill="#0284c7" />
            <path d="M 155 55 L 205 55 L 205 75 L 190 75 L 190 65 L 155 65 Z" fill="#0284c7" />
            <path d="M 155 95 L 205 95 L 205 115 L 190 115 L 190 105 L 155 105 Z" fill="#0284c7" />
            <text x="130" y="155" fill="#67e8f9" fontSize="10" fontFamily="monospace" textAnchor="middle">PUERTOS SATA 6 Gbps (7 CONTACTOS)</text>
          </svg>
        </div>
      );

    default: // Genérico puertos / conectores
      return (
        <div className={`bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 240 160" className="w-full h-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="180" height="90" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="70" cy="75" r="18" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
            <rect x="110" y="60" width="70" height="30" rx="3" fill="#0284c7" stroke="#93c5fd" />
            <text x="120" y="145" fill="#7dd3fc" fontSize="10" fontFamily="monospace" textAnchor="middle">INTERFAZ ELECTROMECÁNICA ESTANDARIZADA</text>
          </svg>
        </div>
      );
  }
};
