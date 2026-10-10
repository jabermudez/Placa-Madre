import React, { useState } from 'react';
import { Cpu, Layers, GitBranch, Award, BarChart3, BookOpen, Menu, X, HelpCircle } from 'lucide-react';
import { useGlossary } from '../context/GlossaryContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleDrawer } = useGlossary();

  const navItems = [
    { id: 'intro', label: 'Introducción', icon: Cpu },
    { id: 'anatomia', label: 'Anatomía (19 Componentes)', icon: Layers },
    { id: 'flujo', label: 'Flujo de Arquitectura', icon: GitBranch },
    { id: 'generaciones', label: 'Línea de Tiempo', icon: GitBranch },
    { id: 'modelos', label: 'Modelos Legendarios', icon: Award },
    { id: 'comparativa', label: 'Comparativas & Datos', icon: BarChart3 },
    { id: 'fuentes', label: 'Fuentes & Metodología', icon: BookOpen },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('intro')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-emerald-500 p-0.5 shadow-lg shadow-cyan-950/40">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                Motherboard<span className="text-cyan-400">Architecture</span>
              </span>
              <span className="text-[11px] block text-slate-400 tracking-wider uppercase font-mono">
                Investigación de Hardware
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md transition-all text-xs font-semibold tracking-wide flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}

            <button
              onClick={toggleDrawer}
              className="ml-2 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-700/50 hover:border-cyan-400 transition-all text-xs font-mono font-bold tracking-wide flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Abrir Glosario Técnico"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Glosario</span>
            </button>
          </nav>

          {/* Mobile hamburger button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4 text-cyan-400" />
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              toggleDrawer();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 mt-2"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Glosario Técnico de Hardware</span>
          </button>
        </div>
      )}
    </header>
  );
};
