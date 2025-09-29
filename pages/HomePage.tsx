import React, { useState, useEffect } from 'react';
import type { Page } from '../types';
import { Header } from '../components/Header';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-300"
      aria-labelledby="welcome-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md transform-gpu rounded-xl bg-white p-6 text-center shadow-2xl transition-all duration-300 dark:bg-background-dark animate-fade-in">
        <span className="material-symbols-outlined mb-4 text-6xl text-primary">
          health_and_safety
        </span>
        <h2 id="welcome-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
          Important Disclaimer
        </h2>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          This is an educational tool. The information provided, including responses from our AI assistant, is for <strong>not a substitute for professional dental advice.</strong>
        </p>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
          This AI <strong>cannot and will not</strong> make a diagnosis or give treatment advice. Please consult a qualified dentist for any health concerns.
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-primary px-6 py-3 text-base font-bold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC = () => (
    <footer className="bg-white dark:bg-background-dark/50 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">© 2025 Oral Health SA. All rights reserved. This platform provides educational information and should not be considered a substitute for professional dental advice.</p>
        </div>
    </footer>
);


const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    try {
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeMessage');
      if (!hasSeenWelcome) {
        setShowWelcomeModal(true);
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
      setShowWelcomeModal(true);
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    try {
      localStorage.setItem('hasSeenWelcomeMessage', 'true');
    } catch (error) {
      console.error("Could not write to localStorage:", error);
    }
    setShowWelcomeModal(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <WelcomeModal isOpen={showWelcomeModal} onClose={handleCloseWelcomeModal} />
      <Header onNavigate={onNavigate} currentPage="home" />
      <main className="flex flex-col">
        <section className="relative h-[60vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center text-white p-4">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1583344497857-37f63c657a66?q=80&w=2940&auto=format&fit=crop")' }}></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">Free Oral Health Education for South Africans</h1>
            <p className="text-base md:text-xl font-light max-w-2xl">Empowering you with the knowledge to achieve and maintain a healthy smile for life.</p>
            <button onClick={() => onNavigate('chat')} className="mt-4 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:bg-primary/90 transition-colors">
              <span className="truncate">Chat with Our AI Assistant</span>
            </button>
          </div>
        </section>
        
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white mb-12">Quick Access</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <a onClick={() => onNavigate('learn')} className="group cursor-pointer">
                        <div className="w-full aspect-square rounded-lg overflow-hidden">
                            <div className="w-full h-full bg-cover bg-center transform transition-transform duration-300 group-hover:scale-105" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLQwtjHpwjOrbxzj2rQq1W7-Npe_8y7J1DOsXFzAX2FZnD1P7T3xOtFYrlyAPg5mmJ6R-tMXzICWvXZJ71kmEFv_xshkcLm2aVZ2jQ_7fkoJseUeEdJLr_BDttK8BWyDrjpGhpkClcjEiEZZynwmYwJYv9eKhbkWT5gd6kkyLDegdN69W1SkpC-FKPnK1oE9lJtaeav4u8O5gR-CJJGUzPmC3pV_CWi7JjU9QDmzTAWsb3RAOoMW7tLZII_PeVOMhIvPxDcogF0n7A")'}}></div>
                        </div>
                        <p className="text-lg font-medium mt-4 text-center text-gray-900 dark:text-white">Learn About Oral Hygiene</p>
                    </a>
                    <a onClick={() => onNavigate('directory')} className="group cursor-pointer">
                        <div className="w-full aspect-square rounded-lg overflow-hidden">
                            <div className="w-full h-full bg-cover bg-center transform transition-transform duration-300 group-hover:scale-105" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4n8TqTrw184rjjqGAJyA9sna9hf0yxiNwx_ZiwVrjo1xtowniWoEnNbb9Wo6-SSF2uFCwayIB9Q37wsw4CKcXjd818Sj2TnSP_oDxgdG4pyH3SDpenknM_MYZ1I0GH_ylDYh8bReXXHYKLOcLMsIM2Uu0uKKaMJdNDkGL4j1OAnAJ85dVfZRfYp4D5EvZOejjF0kIKuqYJdfEDA_CP9rFXrmoBxUNadyz3fKybWLPowqMD56WYO7VIrQg7CKWPgR01fI0RFzB6W0C")'}}></div>
                        </div>
                        <p className="text-lg font-medium mt-4 text-center text-gray-900 dark:text-white">Find a Dentist Near You</p>
                    </a>
                    <a onClick={() => onNavigate('tracker')} className="group cursor-pointer">
                        <div className="w-full aspect-square rounded-lg overflow-hidden">
                            <div className="w-full h-full bg-cover bg-center transform transition-transform duration-300 group-hover:scale-105" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfRImOiPpEsBYeI6_ksXnydb-6X-cyrmLNp3VPz3YmW50_61kf8A7I5BkecTg27s_SqQEzxRI549qtNsxwFJUK8_Vxs1ir5_A5C5ja33-OTc_1ghHYpiIh0CqsOfyJpC30YUXBDd-bikqVzUTP07KvTXyLdWIc-WYsG57jnMjchxXowKFodeVvnb53tYBilnUNuaJl4_VDCRH5wE7hzVXYFqemars71Wei88qR5KtVBt3NJK-dtPzSjmI-eaowVL4htHemmoRfMAit")'}}></div>
                        </div>
                        <p className="text-lg font-medium mt-4 text-center text-gray-900 dark:text-white">Track Your Symptoms</p>
                    </a>
                    <a onClick={() => onNavigate('chat')} className="group cursor-pointer">
                        <div className="w-full aspect-square rounded-lg overflow-hidden">
                            <div className="w-full h-full bg-cover bg-center transform transition-transform duration-300 group-hover:scale-105" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDnqfl7NJ0_stiDNci40qsvk22GyEuOlCk1CrGooq3HohzCwEaFSI2GluSRPPIIZdMysBhQGNDta_6xCPvdszVbVeytp1r4PqushoXe83DNdmQlQUHQXFc92HLXOjpxOhO-uYFvJF1ZxyRG_GyVxk0bWxeiqEU-VfDrguKsY6u3OMNzxLHRTcEfLjKlj-tmEz-8mcHUXe0VF_RSJ5V-FOZzzBL9DoJweQzANfZwMnQo5TaA0QvGHQxIeCGY638y4aImPDJb06pO2Jaf")'}}></div>
                        </div>
                        <p className="text-lg font-medium mt-4 text-center text-gray-900 dark:text-white">Ask a Question</p>
                    </a>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-white dark:bg-background-dark/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Why Choose Our Platform?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">We are dedicated to providing high-quality, accessible oral health education to all South Africans. Our platform is built on the principles of accuracy, inclusivity, and user privacy.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Feature cards here */}
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Take Control of Your Oral Health Today</h2>
                <div className="mt-8 flex justify-center">
                    <button onClick={() => onNavigate('chat')} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:bg-primary/90 transition-colors">
                        <span className="truncate">Get Started Now</span>
                    </button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;