"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "@/components/ui/Modal";

interface AboutContextType {
  isOpen: boolean;
  openAbout: () => void;
  closeAbout: () => void;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export function AboutProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAbout = () => setIsOpen(true);
  const closeAbout = () => setIsOpen(false);

  return (
    <AboutContext.Provider value={{ isOpen, openAbout, closeAbout }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeAbout} title="About LuraLoop">
        <div className="space-y-12 text-brand-white">
          
          {/* SECTION 1: HERO & ORIGIN STORY */}
          <section className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built in Kerala. <span className="text-brand-orange">Deployed everywhere.</span>
            </h3>
            <p className="text-brand-gray text-lg leading-relaxed max-w-2xl mx-auto">
              LuraLoop was born from a simple observation: hospitals, schools, and businesses were spending more time managing systems than serving people. Founded in 2025 in Kerala, India, LuraLoop set out to build something different — an intelligent operational layer that sits on top of existing systems, speaks the local language, and works 24/7 without complaints.
            </p>
          </section>

          {/* SECTION 2: MISSION & VISION */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-orange/50 transition-colors group">
              <h4 className="text-xl font-bold mb-3 text-brand-orange group-hover:scale-105 transition-transform origin-left">Our Mission</h4>
              <p className="text-brand-gray text-sm leading-relaxed">
                To make intelligent automation accessible to every organization — from a hospital in rural Kerala to an enterprise in Dubai — by building AI agents that integrate seamlessly into existing systems without disruption, data risk, or complexity.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-orange/50 transition-colors group">
              <h4 className="text-xl font-bold mb-3 text-brand-orange group-hover:scale-105 transition-transform origin-left">Our Vision</h4>
              <p className="text-brand-gray text-sm leading-relaxed">
                A world where every business, regardless of size or sector, operates with an intelligent layer that thinks, responds, and acts — so humans can focus on what only humans can do.
              </p>
            </div>
          </section>

          {/* SECTION 4: OUR APPROACH (The Differentiator) */}
          <section className="p-8 rounded-3xl bg-brand-orange/10 border border-brand-orange/30 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/0 via-brand-orange/5 to-brand-orange/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <h4 className="text-2xl font-bold mb-4">The LuraLoop Differentiator</h4>
            <p className="text-brand-white/90 text-lg leading-relaxed max-w-3xl mx-auto font-medium">
              Most AI companies build new platforms and ask you to migrate to them. LuraLoop does the opposite. We come to your system. We learn your workflow. We add intelligence to what you already have. <span className="text-brand-orange font-bold">No migration. No disruption. No data risk. Just intelligence, added.</span>
            </p>
          </section>

          {/* SECTION 3: WHAT WE DO */}
          <section>
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold mb-2">What We Do</h4>
              <p className="text-brand-gray text-sm">All powered by a strict <span className="text-brand-orange font-semibold">Zero-Data-Retention</span> architecture.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🏥", title: "Healthcare", desc: "AI Hospital Receptionist" },
                { icon: "🎓", title: "Education", desc: "AI Education Assistant" },
                { icon: "🏢", title: "Real Estate", desc: "AI Real Estate Assistant" },
                { icon: "🛒", title: "E-Commerce", desc: "AI E-Commerce Assistant" }
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center hover:-translate-y-2 hover:bg-white/10 hover:border-brand-orange/50 transition-all duration-300">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h5 className="font-bold text-sm mb-1">{item.title}</h5>
                  <p className="text-xs text-brand-gray">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: CORE VALUES */}
          <section>
            <h4 className="text-2xl font-bold mb-6 text-center">Core Values</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { title: "Zero Data Retention", desc: "We process, we don't store." },
                { title: "Integration First", desc: "We adapt to your existing tools." },
                { title: "Local Intelligence", desc: "We speak Malayalam. We understand Kerala. We think global." },
                { title: "Always Available", desc: "24/7/365 operational uptime." },
                { title: "Human Behind the Machine", desc: "Technology serving humanity." }
              ].map((val, idx) => (
                <div key={idx} className="px-5 py-4 rounded-xl bg-brand-black border border-white/10 hover:scale-105 hover:border-brand-orange/40 transition-all shadow-lg flex-1 min-w-[200px]">
                  <h5 className="font-bold text-sm text-brand-orange mb-1">{val.title}</h5>
                  <p className="text-xs text-brand-gray">{val.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: TEAM & SECTION 7: STATS */}
          <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-brand-black to-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <h4 className="text-sm font-semibold text-brand-gray uppercase tracking-wider mb-4">Leadership</h4>
              <h3 className="text-xl font-bold text-brand-white mb-1">Muhammed Ameen</h3>
              <p className="text-sm text-brand-orange mb-4">Founder & CEO <br/><span className="text-brand-gray text-xs">(AI Automation Architect | n8n Expert)</span></p>
              <blockquote className="border-l-2 border-brand-orange pl-4 italic text-sm text-brand-gray">
                "I believe every hospital, school, and business deserves an intelligent assistant that works as hard as they do."
              </blockquote>
            </div>
            
            <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { num: "4+", label: "Industries Served" },
                { num: "1", label: "Flagship Product (Ziya)" },
                { num: "0", label: "Bytes Patient Data Stored" },
                { num: "24/7", label: "Agent Availability" },
                { num: "100%", label: "WhatsApp Based" }
              ].map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-bold text-brand-orange mb-1">{stat.num}</span>
                  <span className="text-xs text-brand-gray font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: CTA & CONTACT ZONE */}
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-bold text-lg mb-1">Ready to automate?</h4>
              <p className="text-sm text-brand-gray">Available for deployments across India and internationally.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
              <a href="mailto:official.luraloop@gmail.com" className="flex items-center gap-2 hover:text-brand-orange transition-colors">
                <span className="text-brand-orange">✉</span> official.luraloop@gmail.com
              </a>
              <a href="tel:+917902897181" className="flex items-center gap-2 hover:text-brand-orange transition-colors">
                <span className="text-brand-orange">📞</span> +91 79028 97181
              </a>
              <a href="https://www.luraloop.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-orange transition-colors">
                <span className="text-brand-orange">🌐</span> www.luraloop.com
              </a>
            </div>
          </section>

        </div>
      </Modal>
    </AboutContext.Provider>
  );
}

export function useAbout() {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error("useAbout must be used within an AboutProvider");
  }
  return context;
}
