import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ModConfigurator } from './components/ModConfigurator';
import { AIDiagnostics } from './components/AIDiagnostics';
import { AIModAdvisor } from './components/AIModAdvisor';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { JobTracker } from './components/JobTracker';
import { BranchesSection } from './components/BranchesSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { ServiceItem } from './types';
import { BrandProvider, useBrand } from './components/brand-demo/BrandProvider';
import { OnboardingModal, BrandResetButton } from './components/brand-demo/OnboardingModal';
import AdminConsole from './components/brand-demo/AdminConsole';

export default function App() {
  // Admin route check
  if (window.location.pathname === '/admin') {
    return (
      <BrandProvider>
        <AdminConsole />
      </BrandProvider>
    );
  }

  return (
    <BrandProvider>
      <AppContent />
    </BrandProvider>
  );
}

function AppContent() {
  const { countdown } = useBrand();
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Custom booking overlays (e.g. from AI Diagnostic or Mod Configurator)
  const [customServiceTitle, setCustomServiceTitle] = useState<string | undefined>(undefined);
  const [customEstimatedPriceINR, setCustomEstimatedPriceINR] = useState<number | undefined>(undefined);

  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices(prev => {
      const exists = prev.some(s => s.id === service.id);
      if (exists) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleOpenBooking = () => {
    setCustomServiceTitle(undefined);
    setCustomEstimatedPriceINR(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithService = (serviceName: string, estimatedPriceINR: number) => {
    setCustomServiceTitle(serviceName);
    setCustomEstimatedPriceINR(estimatedPriceINR);
    setIsBookingOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBookingSuccess = (bookingId: string) => {
    // Switch to Job Tracker view
    setActiveSection('job-tracker');
    const trackerEl = document.getElementById('job-tracker');
    if (trackerEl) {
      trackerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Session Countdown Pill */}
      {countdown && (
        <div className="fixed top-2 right-4 z-[80] inline-flex items-center gap-2 bg-slate-900/90 backdrop-blur-sm border border-amber-500/30 rounded-full px-3 py-1.5 text-[11px] text-amber-400 font-medium shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Session: {countdown}
        </div>
      )}

      {/* Onboarding Modal */}
      <OnboardingModal />

      {/* Brand Reset Button (floating) */}
      <BrandResetButton />

      {/* Sticky Header */}
      <Header
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        cartCount={selectedServices.length}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Section */}
        <Hero
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
        />

        {/* Services & Pitstop Catalog (Car Washing, Repairing & Modifications) */}
        <ServicesSection
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onOpenBooking={handleOpenBooking}
        />

        {/* Interactive 3D Mod Configurator */}
        <ModConfigurator
          onOpenBookingWithMods={(summary, price) => handleOpenBookingWithService(summary, price)}
        />

        {/* AI Pitmaster Diagnostic Tool */}
        <AIDiagnostics
          onOpenBookingWithService={(name, price) => handleOpenBookingWithService(name, price)}
        />

        {/* AI Modification Package Advisor */}
        <AIModAdvisor
          onOpenBookingWithMods={(summary, price) => handleOpenBookingWithService(summary, price)}
        />

        {/* Before / After Transformations Gallery */}
        <BeforeAfterGallery />

        {/* Live Job Card Tracker */}
        <JobTracker />

        {/* Indian Pit Centers & Branches */}
        <BranchesSection />
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedServices={selectedServices}
        customServiceTitle={customServiceTitle}
        customEstimatedPriceINR={customEstimatedPriceINR}
        initialCity={selectedCity}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
