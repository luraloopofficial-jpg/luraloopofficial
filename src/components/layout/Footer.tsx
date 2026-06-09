"use client";
import Link from "next/link";
import { useAbout } from "@/components/modals/AboutContext";

export default function Footer() {
  const { openAbout } = useAbout();

  return (
    <footer className="relative z-10 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center group mb-4 hover:opacity-90 transition-opacity">
              <img 
                src="/Logo.svg" 
                alt="LuraLoop Logo" 
                style={{ width: '190px', height: 'auto' }} 
                className="object-contain"
              />
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed mb-6">
              Hire The Future. An Enterprise AI Automation company acting as an intelligent operational layer on top of current systems.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:official.luraloop@gmail.com" className="text-brand-gray hover:text-brand-orange transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
              <a href="https://github.com/luraloopofficial-jpg" target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-brand-orange transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-brand-gray hover:text-brand-orange transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-brand-white font-semibold mb-6">Products</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><Link href="#industries" className="hover:text-brand-white transition-colors">Ziya Healthcare <span className="block text-xs mt-0.5 text-brand-gray/60">(AI Hospital Receptionist)</span></Link></li>
              <li><Link href="#industries" className="hover:text-brand-white transition-colors">Ziya Edu <span className="block text-xs mt-0.5 text-brand-gray/60">(AI Education Assistant)</span></Link></li>
              <li><Link href="#industries" className="hover:text-brand-white transition-colors">Ziya Estate <span className="block text-xs mt-0.5 text-brand-gray/60">(AI Real Estate Assistant)</span></Link></li>
              <li><Link href="#industries" className="hover:text-brand-white transition-colors">Ziya Commerce <span className="block text-xs mt-0.5 text-brand-gray/60">(AI E-Commerce Assistant)</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><button onClick={openAbout} className="hover:text-brand-white transition-colors">About Us</button></li>
              <li><Link href="#" className="hover:text-brand-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-brand-white transition-colors">Blog</Link></li>
              <li><Link href="#contact" className="hover:text-brand-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><Link href="#" className="hover:text-brand-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-brand-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#architecture" className="hover:text-brand-white transition-colors">Security (Zero-Data-Retention)</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-brand-gray">
          <p>© {new Date().getFullYear()} LuraLoop Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Status: All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
