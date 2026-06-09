"use client";
import { useState, useRef } from "react";
import gsap from "gsap";
import { Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Send to Secure API
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: (document.getElementById('firstName') as HTMLInputElement).value,
        lastName: (document.getElementById('lastName') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        company: (document.getElementById('company') as HTMLInputElement).value,
        message: (document.getElementById('message') as HTMLTextAreaElement).value,
      })
    }).then(async (res) => {
      setIsSubmitting(false);
      if (res.ok) {
        setIsSuccess(true);
        // GSAP Animation for Success State
        if (formRef.current && successRef.current) {
          gsap.to(formRef.current, { opacity: 0, y: -20, duration: 0.4, display: "none" });
          gsap.fromTo(
            successRef.current,
            { opacity: 0, y: 20, display: "none" },
            { opacity: 1, y: 0, display: "flex", duration: 0.5, delay: 0.4, ease: "back.out(1.7)" }
          );
        }
      } else {
        const data = await res.json();
        alert(data.error || "An error occurred.");
      }
    }).catch(() => {
      setIsSubmitting(false);
      alert("Network error.");
    });
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Start the <span className="text-brand-orange">Transformation</span>
          </h2>
          <p className="text-lg text-brand-gray">
            Book a discovery call to see how LuraLoop can optimize your operations.
          </p>
        </div>

        <div className="relative p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10">
          
          {/* Success State (Hidden initially) */}
          <div 
            ref={successRef} 
            className="hidden flex-col items-center justify-center text-center py-10"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-brand-white mb-4">Request Received</h3>
            <p className="text-brand-gray max-w-md">
              Thank you for reaching out. Our enterprise team will contact you within 24 hours to schedule your discovery session.
            </p>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <input 
                  type="text" 
                  id="firstName" 
                  required
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-orange peer placeholder-transparent"
                  placeholder="First Name"
                />
                <label 
                  htmlFor="firstName"
                  className="absolute left-0 top-3 text-brand-gray text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-orange peer-valid:-top-4 peer-valid:text-xs"
                >
                  First Name
                </label>
              </div>
              <div className="relative group">
                <input 
                  type="text" 
                  id="lastName" 
                  required
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-orange peer placeholder-transparent"
                  placeholder="Last Name"
                />
                <label 
                  htmlFor="lastName"
                  className="absolute left-0 top-3 text-brand-gray text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-orange peer-valid:-top-4 peer-valid:text-xs"
                >
                  Last Name
                </label>
              </div>
            </div>

            <div className="relative group">
              <input 
                type="email" 
                id="email" 
                required
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-orange peer placeholder-transparent"
                placeholder="Work Email"
              />
              <label 
                htmlFor="email"
                className="absolute left-0 top-3 text-brand-gray text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-orange peer-valid:-top-4 peer-valid:text-xs"
              >
                Work Email
              </label>
            </div>

            <div className="relative group">
              <input 
                type="text" 
                id="company" 
                required
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-orange peer placeholder-transparent"
                placeholder="Company / Hospital Name"
              />
              <label 
                htmlFor="company"
                className="absolute left-0 top-3 text-brand-gray text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-orange peer-valid:-top-4 peer-valid:text-xs"
              >
                Company / Hospital Name
              </label>
            </div>

            <div className="relative group mt-10">
              <textarea 
                id="message" 
                required
                rows={3}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-orange peer placeholder-transparent resize-none"
                placeholder="How can we help?"
              />
              <label 
                htmlFor="message"
                className="absolute left-0 top-3 text-brand-gray text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-orange peer-valid:-top-4 peer-valid:text-xs"
              >
                How can we help?
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-orange text-brand-black font-bold rounded-xl hover:bg-[#ff8022] transition-colors disabled:opacity-70 mt-8"
            >
              {isSubmitting ? "Sending..." : "Submit Request"}
              {!isSubmitting && <Send className="w-5 h-5" />}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
