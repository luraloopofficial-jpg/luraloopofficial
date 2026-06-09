"use client";
import { useState } from "react";
import { QrCode, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DeploymentRegister() {
  const [step, setStep] = useState<"form" | "payment" | "success">("form");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a fake processing delay
    setTimeout(() => {
      setStep("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen relative z-10 flex items-center justify-center py-24 px-6">
      
      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-white mb-2">
            Secure Onboarding
          </h1>
          <p className="text-brand-gray text-sm md:text-base">
            Complete your registration to deploy the intelligent operational layer.
          </p>
        </div>

        <div className="relative p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent" />

          {step === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span className="text-sm font-semibold text-brand-white uppercase tracking-wider">Enterprise Details</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-brand-gray mb-1.5">Company / Hospital Name</label>
                  <input type="text" required placeholder="LuraLoop Health" className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-brand-orange transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-gray mb-1.5">GSTIN (Optional)</label>
                  <input type="text" placeholder="29XXXXX0000X1Z5" className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-brand-orange transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-brand-gray mb-1.5">Admin Email</label>
                    <input type="email" required placeholder="admin@company.com" className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-brand-orange transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-brand-gray mb-1.5">Contact Number</label>
                    <input type="tel" required placeholder="+91 9876543210" className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-brand-orange transition-colors" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full group flex items-center justify-center gap-2 mt-8 py-4 bg-brand-orange text-brand-black font-bold rounded-xl hover:bg-[#ff8022] hover:scale-[1.02] transition-all">
                Proceed to Payment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {step === "payment" && (
            <form onSubmit={handlePaymentSubmit} className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="w-5 h-5 text-brand-orange" />
                <span className="text-sm font-semibold text-brand-white uppercase tracking-wider">UPI Payment</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-brand-black/50 border border-white/10">
                <span className="text-brand-gray text-sm">Amount Due:</span>
                <span className="text-2xl font-bold text-brand-orange drop-shadow-[0_0_5px_rgba(255,107,0,0.8)]">₹50,000</span>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 py-6 border border-white/10 rounded-xl bg-brand-black/30">
                <div className="w-48 h-48 bg-white rounded-xl p-2 flex items-center justify-center">
                  {/* Mockup QR Code representation */}
                  <div className="w-full h-full border-4 border-black border-dashed flex items-center justify-center">
                    <span className="text-black font-bold text-sm">SCAN TO PAY</span>
                  </div>
                </div>
                <p className="text-xs text-brand-gray">Scan with any UPI App (GPay, PhonePe, Paytm)</p>
              </div>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-brand-gray text-xs uppercase tracking-wider">OR ENTER UPI ID</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <div>
                <input type="text" placeholder="yourname@upi" className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-center text-brand-white focus:outline-none focus:border-brand-orange transition-colors" />
              </div>

              <button type="submit" className="w-full group flex items-center justify-center gap-2 py-4 bg-brand-white text-brand-black font-bold rounded-xl hover:bg-gray-200 hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <ShieldCheck className="w-5 h-5" />
                Pay Securely
              </button>
            </form>
          )}

          {step === "success" && (
            <div className="text-center py-10 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-brand-orange" />
              </div>
              <h2 className="text-3xl font-bold text-brand-white mb-4">Payment Successful!</h2>
              <p className="text-brand-gray mb-8">
                Your transaction of <strong className="text-brand-white">₹50,000</strong> has been verified. Our architecture team will contact you shortly.
              </p>
              <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-brand-white font-medium rounded-xl hover:bg-white/20 transition-colors border border-white/20">
                Return to Home
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
