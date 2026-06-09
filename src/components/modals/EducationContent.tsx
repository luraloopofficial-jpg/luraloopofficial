import Image from "next/image";
import { 
  GraduationCap, MessagesSquare, CheckSquare, Users, BookOpen, Banknote, 
  ArrowRight, ShieldAlert, CheckCircle2 
} from "lucide-react";

export default function EducationContent() {
  const hoverClasses = "hover:scale-105 hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] hover:border-[#FF6B00]/30 transition-all duration-300 ease-out";

  const features = [
    { title: "Student Enquiries", icon: <MessagesSquare className="w-6 h-6 text-brand-orange" /> },
    { title: "Admission Support", icon: <GraduationCap className="w-6 h-6 text-brand-orange" /> },
    { title: "Attendance Info", icon: <CheckSquare className="w-6 h-6 text-brand-orange" /> },
    { title: "Parent Communication", icon: <Users className="w-6 h-6 text-brand-orange" /> },
    { title: "LMS Integration", icon: <BookOpen className="w-6 h-6 text-brand-orange" /> },
    { title: "Fee Automation", icon: <Banknote className="w-6 h-6 text-brand-orange" /> },
  ];

  const workflows = [
    "Student Message",
    "ZIYA Edu Responds",
    "Process Automation",
    "System Update",
    "Confirmation"
  ];

  const integrations = [
    "LMS", "ERP", "Payment Gateways", "WhatsApp Business API", "Email/SMS", "Custom APIs"
  ];

  return (
    <div className="space-y-10 text-brand-white">
      {/* Header */}
      <div className="relative w-full overflow-hidden border-b border-white/10 pb-8 mb-6">
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0 opacity-20">
          <Image src="/modal-education.png" alt="Education Background" fill className="object-cover object-right" />
        </div>
        <div className="bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent absolute inset-0 z-10 pointer-events-none"></div>
        <div className="relative z-20 flex flex-col items-start text-left pt-2">
          <h3 className="text-3xl font-bold mb-3 text-brand-white">Smarter Admissions. Stronger Education.</h3>
          <p className="text-brand-gray text-lg max-w-xl leading-relaxed">
            ZIYA Edu automates student enquiries, admissions, fee processes, and academic support — instantly on WhatsApp and across your systems.
          </p>
        </div>
      </div>

      {/* 6 Grid Core Features */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-5">Core Features</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feat, idx) => (
            <div key={idx} className={`flex flex-col items-center justify-center text-center p-6 bg-brand-black/40 border border-white/10 rounded-2xl ${hoverClasses}`}>
              <div className="mb-4">{feat.icon}</div>
              <span className="text-sm font-semibold">{feat.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Row */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-5">How ZIYA Works</h4>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {workflows.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`px-5 py-3 bg-brand-black border border-white/10 rounded-xl text-sm font-medium ${hoverClasses}`}>
                {step}
              </div>
              {idx < workflows.length - 1 && <ArrowRight className="w-5 h-5 text-brand-gray/50" />}
            </div>
          ))}
        </div>
      </div>

      {/* Integrations Layer */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-5">Integrations</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {integrations.map((integration, idx) => (
            <div key={idx} className={`px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-brand-gray ${hoverClasses}`}>
              {integration}
            </div>
          ))}
        </div>
      </div>

      {/* Global Trims */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-white/10">
        <div className={`p-6 bg-brand-orange/5 border border-brand-orange/20 rounded-2xl ${hoverClasses}`}>
          <h5 className="flex items-center gap-2 font-bold text-brand-orange mb-3">
            <CheckCircle2 className="w-5 h-5" /> Benefits for Your Business
          </h5>
          <p className="text-sm text-brand-gray/90 leading-relaxed">
            Streamline the entire admission pipeline, instantly resolve thousands of parent enquiries concurrently, and significantly reduce administrative overhead.
          </p>
        </div>
        <div className={`p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl ${hoverClasses}`}>
          <h5 className="flex items-center gap-2 font-bold text-blue-400 mb-3">
            <ShieldAlert className="w-5 h-5" /> Your Data. Your Control.
          </h5>
          <p className="text-sm text-brand-gray/90 leading-relaxed">
            Strict Zero-Data-Retention architecture. ZIYA reads and writes to your enterprise systems but never stores sensitive information locally. Fully compliant.
          </p>
        </div>
      </div>
    </div>
  );
}
