"use client";
import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize bot greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setMessages([{ role: "bot", text: "Hi, I am Ziya. How can I help you today?" }]);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newMessages: { role: "bot" | "user"; text: string }[] = [
      ...messages,
      { role: "user", text: userMessage }
    ];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages // pass previous history for context
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Network response was not ok");
      }

      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "bot", text: "I am having trouble connecting right now. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-80 sm:w-96 mb-4 rounded-2xl overflow-hidden bg-brand-black/90 backdrop-blur-2xl border border-white/10 shadow-2xl origin-bottom-right"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-brand-orange/20 to-transparent border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/chatbot-logo.svg" alt="Ziya Brand Icon" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-brand-white font-semibold text-sm">Ziya Agent</h3>
                    <p className="text-brand-orange text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span> Online
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-brand-gray hover:text-brand-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Area */}
              <div ref={scrollRef} className="p-4 h-80 overflow-y-auto flex flex-col gap-4 scroll-smooth">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div 
                      className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === "user" 
                          ? "bg-[#2A2A2A] text-brand-white rounded-br-sm border border-white/5" // User: sleek dark-gray
                          : "bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 text-brand-white border border-brand-orange/20 rounded-bl-sm" // Ziya: premium orange highlight
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 border border-brand-orange/20 p-3.5 rounded-2xl rounded-bl-sm flex items-center gap-2">
                      <span className="text-xs text-brand-orange font-medium mr-1">Ziya is typing</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-white/10 bg-black/60">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message Ziya..." 
                    disabled={isLoading}
                    className="flex-grow bg-transparent text-sm text-brand-white px-3 py-2.5 focus:outline-none placeholder:text-brand-gray/50 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2.5 bg-brand-orange text-brand-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff8022] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:scale-110 bg-white text-brand-black group"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Subtle pulse behind the icon */}
              <div className="absolute inset-0 rounded-full border-2 border-brand-orange animate-ping opacity-50"></div>
              <img 
                src="/chatbot-logo.svg" 
                alt="Ziya Brand Icon" 
                style={{ width: '32px', height: '32px' }} 
                className="z-10 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </button>
      </div>
    </>
  );
}
