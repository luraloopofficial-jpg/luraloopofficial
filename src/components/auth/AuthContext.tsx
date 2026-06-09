"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "@/components/ui/Modal";

type AuthType = "login" | "signup" | null;

interface AuthContextType {
  authType: AuthType;
  openAuth: (type: AuthType) => void;
  closeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authType, setAuthType] = useState<AuthType>(null);
  
  const openAuth = (type: AuthType) => {
    setAuthType(type);
  };

  const closeAuth = () => setAuthType(null);

  return (
    <AuthContext.Provider value={{ authType, openAuth, closeAuth }}>
      {children}

      {/* Login Modal */}
      <Modal isOpen={authType === "login"} onClose={closeAuth} maxWidth="max-w-[420px]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brand-white">Sign in to LuraLoop</h2>
          <p className="text-brand-gray text-sm mt-2">Secure Enterprise Access.</p>
        </div>

        <form className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-medium text-brand-gray mb-1.5 uppercase tracking-wide">Work Email</label>
            <input 
              type="email" 
              required 
              placeholder="name@company.com"
              className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-brand-orange transition-colors" 
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-brand-gray uppercase tracking-wide">Password</label>
              <button type="button" className="text-xs text-brand-orange hover:underline transition-all">
                Forgot Password?
              </button>
            </div>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-brand-orange transition-colors" 
            />
          </div>
          
          <button className="w-full py-3.5 bg-brand-orange text-brand-black font-bold rounded-xl hover:bg-[#ff8022] hover:scale-[1.02] transition-all mt-4 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
            Sign In
          </button>
          
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <button type="button" onClick={() => openAuth("signup")} className="text-sm text-brand-gray hover:text-brand-orange transition-colors">
              Don't have an account? <span className="font-semibold text-brand-white">Sign up</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={authType === "signup"} onClose={closeAuth} maxWidth="max-w-[420px]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brand-white">Create an Account</h2>
          <p className="text-brand-gray text-sm mt-2">Join the intelligent operational layer.</p>
        </div>

        <form className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-brand-gray mb-1.5 uppercase tracking-wide">First Name</label>
              <input type="text" required placeholder="John" className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-brand-orange transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-brand-gray mb-1.5 uppercase tracking-wide">Last Name</label>
              <input type="text" required placeholder="Doe" className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-brand-orange transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-brand-gray mb-1.5 uppercase tracking-wide">Work Email</label>
            <input type="email" required placeholder="name@company.com" className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-brand-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-brand-gray mb-1.5 uppercase tracking-wide">Password</label>
            <input type="password" required placeholder="••••••••" className="w-full bg-brand-black/50 border border-white/20 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-brand-orange transition-colors" />
          </div>
          
          <button className="w-full py-3.5 bg-brand-orange text-brand-black font-bold rounded-xl hover:bg-[#ff8022] hover:scale-[1.02] transition-all mt-4 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
            Create Account
          </button>
          
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <button type="button" onClick={() => openAuth("login")} className="text-sm text-brand-gray hover:text-brand-orange transition-colors">
              Already have an account? <span className="font-semibold text-brand-white">Log In</span>
            </button>
          </div>
        </form>
      </Modal>

    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
