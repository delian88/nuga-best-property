
import React, { useState, useRef, useEffect } from 'react';
import { getPropertyAdvice, ChatMessage } from '../services/geminiService';

const SUGGESTIONS = [
  "Houses for sale in Ikoyi",
  "ROI on Lekki land",
  "Luxury rentals in Abuja",
  "Land title verification steps"
];

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [isOpen]);

  const handleSend = async (text: string = input) => {
    const messageToSend = text.trim();
    if (!messageToSend) return;

    const newUserMessage = { role: 'user' as const, content: messageToSend };
    const updatedMessages = [...messages, newUserMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const history: ChatMessage[] = updatedMessages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    try {
      const aiResponse = await getPropertyAdvice(history);
      setMessages(prev => [...prev, { role: 'model' as const, content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model' as const, 
        content: "I'm having a bit of trouble connecting to my database. Could you try asking me again?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[200]">
      {isOpen ? (
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] w-[calc(100vw-2rem)] sm:w-[350px] h-[520px] flex flex-col border border-emerald-100 overflow-hidden animate__animated animate__fadeInUp animate__faster border-4 border-white">
          {/* Header */}
          <div className="bg-emerald-600 px-5 py-4 text-white flex justify-between items-center shrink-0 shadow-md z-10">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mr-3 shadow-inner">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-emerald-600 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-black text-[11px] uppercase tracking-widest block leading-none">Concierge</span>
                <span className="text-[8px] text-emerald-100 font-bold uppercase tracking-widest opacity-80">Online</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)} 
              className="bg-black/10 hover:bg-black/20 text-white p-1.5 rounded-lg transition-all border border-white/20 active:scale-90 flex items-center"
              title="Close Chat"
            >
              <span className="text-[9px] font-black uppercase tracking-tighter px-1.5">Close</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 bg-gray-50/50 space-y-5 custom-scrollbar">
            {messages.length === 0 && (
              <div className="animate__animated animate__fadeIn">
                <div className="bg-white p-5 rounded-[1.5rem] border border-emerald-100 mb-6 shadow-sm">
                  <p className="font-black uppercase tracking-[0.2em] text-[8px] mb-2 text-emerald-600">Nuga Best Advisor</p>
                  <p className="text-[13px] font-medium leading-relaxed italic text-gray-700">
                    {"Welcome. I am your specialized digital advisor. How can I assist with your acquisition requirements today?"}
                  </p>
                </div>
                
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 ml-1">Suggestions</p>
                <div className="space-y-2">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s)}
                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-bold text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-md transition-all active:scale-95 text-left flex justify-between items-center group"
                    >
                      <span>{s}</span>
                      <svg className="w-3 h-3 text-gray-300 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate__animated animate__fadeInUp animate__faster`}>
                <div className={`max-w-[88%] p-3.5 rounded-[1.2rem] text-[13px] leading-relaxed shadow-sm break-words overflow-hidden ${
                  m.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none font-semibold' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none font-medium'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate__animated animate__fadeIn">
                <div className="bg-white px-4 py-2.5 rounded-xl rounded-bl-none text-sm border border-gray-100 shadow-sm flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-emerald-300 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-1 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">Consulting...</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-white shrink-0">
            <div className="flex items-center space-x-2">
              <input 
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask our expert..."
                className="flex-1 border-none bg-gray-50 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-semibold"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`p-3 rounded-xl transition-all shadow-md active:scale-90 ${
                  !input.trim() || isLoading 
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white p-4 sm:p-5 rounded-full shadow-2xl hover:bg-emerald-700 transition-all hover:scale-105 group relative border-4 border-white active:scale-95"
          aria-label="Open Concierge"
        >
          <div className="relative">
            <svg className="w-7 h-7 sm:w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-400"></span>
            </span>
          </div>
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-300 origin-right hidden sm:block">
            <div className="bg-emerald-950 text-white px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl border border-emerald-800/50 whitespace-nowrap">
              {"AI Concierge "} 
              <span className="text-emerald-400 ml-2">Online</span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
