/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AnatomyExplorer } from './components/AnatomyExplorer';
import { DataFlowSimulator } from './components/DataFlowSimulator';
import { TimelineSection } from './components/TimelineSection';
import { MotherboardGallery } from './components/MotherboardGallery';
import { ComparativeBenchmarks } from './components/ComparativeBenchmarks';
import { DeepArchitectureGuide } from './components/DeepArchitectureGuide';
import { FooterAndSources } from './components/FooterAndSources';
import { GlossaryProvider } from './context/GlossaryContext';
import { FloatingGlossary } from './components/FloatingGlossary';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'intro') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'anatomia', 'flujo', 'generaciones', 'modelos', 'comparativa', 'fuentes'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section === 'intro' && window.scrollY < 300) {
          setActiveSection('intro');
          break;
        }
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <GlossaryProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
        {/* Top Fixed Navigation */}
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Introducción & Rol del Sistema */}
          <div id="intro">
            <HeroSection 
              onExploreAnatomy={() => scrollToSection('anatomia')} 
              onExploreTimeline={() => scrollToSection('generaciones')} 
            />
          </div>

          {/* 2. Anatomía Interactiva de la Placa Base (19 Componentes) */}
          <AnatomyExplorer />

          {/* 3. Simulador de Flujo de Datos & Topología de Interconexión */}
          <DataFlowSimulator />

          {/* 4. Evolución de la Arquitectura por Generaciones */}
          <TimelineSection />

          {/* 5. Galería de Modelos y Plataformas Legendarias */}
          <MotherboardGallery />

          {/* 6. Comparativas Técnicas & Benchmarks de Buses, Memoria y Formatos */}
          <ComparativeBenchmarks />

          {/* 7. Guía en Profundidad: VRM, Capas del PCB, UEFI y Refrigeración */}
          <DeepArchitectureGuide />
        </main>

        {/* 8. Conclusiones, Fuentes Bibliográficas y Pie de Página */}
        <FooterAndSources />

        {/* 9. Glosario Técnico Flotante e Interactivo */}
        <FloatingGlossary />
      </div>
    </GlossaryProvider>
  );
}
