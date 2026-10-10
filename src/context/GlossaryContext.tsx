import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GLOSSARY_ITEMS, GlossaryItem } from '../data/glossaryData';

interface GlossaryContextType {
  activeTerm: GlossaryItem | null;
  openTerm: (termIdentifier: string) => void;
  closeTerm: () => void;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  openDrawerWithSearch: (term?: string) => void;
}

const GlossaryContext = createContext<GlossaryContextType | undefined>(undefined);

export const GlossaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTerm, setActiveTerm] = useState<GlossaryItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const openTerm = (termIdentifier: string) => {
    const id = termIdentifier.toLowerCase().trim();
    const found = GLOSSARY_ITEMS.find(item => 
      item.id === id || 
      item.term.toLowerCase() === id ||
      (item.acronym && item.acronym.toLowerCase() === id)
    );

    if (found) {
      setActiveTerm(found);
    } else {
      // Fallback search in terms or partial matches
      const partial = GLOSSARY_ITEMS.find(item => 
        item.term.toLowerCase().includes(id) || 
        id.includes(item.id)
      );
      if (partial) {
        setActiveTerm(partial);
      }
    }
  };

  const closeTerm = () => {
    setActiveTerm(null);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };

  const openDrawerWithSearch = (term?: string) => {
    if (term) {
      openTerm(term);
    }
    setIsDrawerOpen(true);
  };

  return (
    <GlossaryContext.Provider value={{
      activeTerm,
      openTerm,
      closeTerm,
      isDrawerOpen,
      toggleDrawer,
      openDrawerWithSearch
    }}>
      {children}
    </GlossaryContext.Provider>
  );
};

export const useGlossary = () => {
  const context = useContext(GlossaryContext);
  if (!context) {
    throw new Error('useGlossary must be used within a GlossaryProvider');
  }
  return context;
};
