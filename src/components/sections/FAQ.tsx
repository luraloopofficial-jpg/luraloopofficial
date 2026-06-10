"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is LuraLoop and how does it integrate with our hospital systems?",
    answer: "LuraLoop is an Enterprise AI Automation company that acts as an intelligent operational layer on top of your current HMS, CRM, or ERP. It does not replace your existing systems. Instead, it securely integrates via APIs to automate workflows like patient bookings, staff rostering, and revenue analytics without requiring a complete system overhaul."
  },
  {
    question: "What is the Ziya Patient Agent?",
    answer: "Ziya is our flagship AI hospital receptionist powered by LuraLoop. It enables patients to book appointments, manage digital tokens, and ask basic queries through natural language, primarily via platforms like WhatsApp, ensuring a seamless and instant patient experience."
  },
  {
    question: "Does LuraLoop store patient data permanently?",
    answer: "No. LuraLoop operates on a strict Zero-Data-Retention architecture. We only process data via temporary session context to execute specific workflows. Once a transaction or query is completed, the data is immediately cleared from our memory layers. Your data remains 100% owned and stored within your existing infrastructure."
  },
  {
    question: "How does LuraLoop handle security and Role-Based Access Control (RBAC)?",
    answer: "We implement strict context isolation based on user roles. Patients, Doctors, HR staff, and Management interact with different, securely isolated instances of the AI agent. This ensures that a patient can never access hospital analytics, and staff members only see the workflows relevant to their permissions."
  },
  {
    question: "What is the cost of deploying Ziya for our hospital?",
    answer: "The standard deployment setup for the Ziya Patient Agent is ₹75,000 (currently discounted for the first 5 hospitals), with a monthly operations, hosting, and support fee of ₹15,000. This provides full-suite intelligent reception and patient management capabilities."
  },
  {
    question: "Is LuraLoop available in Malayalam?",
    answer: "Yes. Ziya communicates fluently in Malayalam and English, managing enterprise workflows locally."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-24 relative z-10 border-t border-white/5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked <span className="text-brand-orange">Questions</span>
          </h2>
          <p className="text-lg text-brand-gray">
            Everything you need to know about our intelligent operational layer.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden transition-colors hover:border-white/20"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-lg text-brand-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-brand-orange transition-transform duration-300 shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`} 
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-brand-gray leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
