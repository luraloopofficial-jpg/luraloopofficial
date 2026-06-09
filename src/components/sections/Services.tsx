"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartPulse, GraduationCap, Building2, ShoppingCart } from "lucide-react";
import Modal from "@/components/ui/Modal";
import HealthcareContent from "@/components/modals/HealthcareContent";
import EducationContent from "@/components/modals/EducationContent";
import RealEstateContent from "@/components/modals/RealEstateContent";
import EcommerceContent from "@/components/modals/EcommerceContent";

gsap.registerPlugin(ScrollTrigger);

const sectors = [
  { 
    id: "healthcare", 
    name: "Healthcare", 
    description: "Automate patient bookings, tokens, and ops.",
    icon: <HeartPulse className="w-8 h-8 text-brand-orange" />,
    content: <HealthcareContent />
  },
  { 
    id: "education", 
    name: "Education", 
    description: "AI Admission Agents and LMS Bridges.",
    icon: <GraduationCap className="w-8 h-8 text-brand-orange" />,
    content: <EducationContent />
  },
  { 
    id: "realestate", 
    name: "Real Estate", 
    description: "Virtual Property Agents & Site Visits.",
    icon: <Building2 className="w-8 h-8 text-brand-orange" />,
    content: <RealEstateContent />
  },
  { 
    id: "ecommerce", 
    name: "E-Commerce", 
    description: "Personal Shoppers & Order Tracking.",
    icon: <ShoppingCart className="w-8 h-8 text-brand-orange" />,
    content: <EcommerceContent />
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLButtonElement[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards Grid Animation
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 50, rotateX: 20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const addToCards = (el: HTMLButtonElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const activeSector = sectors.find(s => s.id === activeModal);

  return (
    <section ref={containerRef} id="industries" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div ref={headerRef} className="text-center mb-16" style={{ willChange: "transform, opacity" }}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Industries We <span className="text-brand-orange">Transform</span>
          </h2>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Click to explore how LuraLoop's operational layer integrates with your specific sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              ref={addToCards}
              onClick={() => setActiveModal(sector.id)}
              className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-orange/50 hover:bg-brand-orange/10 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-2 text-left"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/5 rounded-3xl transition-colors duration-500 blur-xl" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-brand-black rounded-2xl border border-white/10 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {sector.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-white mb-2">
                  {sector.name}
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  {sector.description}
                </p>
                <span className="mt-6 text-xs font-bold uppercase tracking-widest text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  Explore →
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Shared Modal */}
      <Modal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)}
      >
        {activeSector?.content}
      </Modal>
    </section>
  );
}
