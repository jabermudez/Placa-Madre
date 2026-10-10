import React, { useState } from 'react';
import { useGlossary } from '../context/GlossaryContext';
import { GLOSSARY_ITEMS } from '../data/glossaryData';
import { HelpCircle } from 'lucide-react';

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({ 
  term, 
  children, 
  className = "",
  showIcon = false 
}) => {
  const { openTerm } = useGlossary();
  const [isHovered, setIsHovered] = useState(false);

  const cleanQuery = term.toLowerCase().trim();
  const termData = GLOSSARY_ITEMS.find(item => 
    item.id === cleanQuery || 
    item.term.toLowerCase() === cleanQuery ||
    (item.acronym && item.acronym.toLowerCase() === cleanQuery) ||
    (cleanQuery === 'nvme' && item.id === 'm2') ||
    (cleanQuery === 'bios' && item.id === 'uefi') ||
    (cleanQuery === 'pch' && item.id === 'chipset')
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openTerm(term);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      openTerm(term);
    }
  };

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`inline-flex items-baseline gap-0.5 border-b border-dashed border-cyan-400/90 hover:border-cyan-300 hover:text-cyan-300 font-medium transition-all text-inherit cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:rounded-sm hover:bg-cyan-950/20 px-0.5 rounded-sm ${className}`}
        aria-label={`Ver definición técnica de ${termData ? termData.term : term}`}
        title={`Clic para ver definición de ${termData ? termData.term : term}`}
      >
        <span>{children || (termData ? termData.term : term)}</span>
        {showIcon && (
          <HelpCircle className="w-2.5 h-2.5 text-cyan-400/80 inline-block shrink-0 -translate-y-0.5" />
        )}
      </button>

      {/* Subtle Instant Hover Tooltip */}
      {isHovered && termData && (
        <span 
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-40 hidden sm:block w-64 p-2.5 rounded-xl bg-slate-900 border border-cyan-500/60 shadow-2xl text-left pointer-events-none animate-in fade-in duration-100"
        >
          <span className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-cyan-300 font-mono">
              {termData.term} {termData.acronym ? `(${termData.acronym})` : ''}
            </span>
            <span className="text-[9px] font-mono text-cyan-400/70 bg-cyan-950 px-1 py-0.2 rounded border border-cyan-800/40">
              Glosario
            </span>
          </span>
          <span className="block text-[10px] text-slate-300 leading-snug line-clamp-2">
            {termData.shortDefinition}
          </span>
          <span className="block text-[9px] text-cyan-400/90 font-mono mt-1 pt-1 border-t border-slate-800">
            ➜ Clic para abrir ficha técnica completa
          </span>
        </span>
      )}
    </span>
  );
};
