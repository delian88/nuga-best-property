
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
  // Using role 'model' to match Gemini API expectations
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

  // Autofocus input when the chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500); // Wait for open animation
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

    // Convert internal message format to Gemini API format
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

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-[2rem] shadow-2xl w-[calc(100vw-2rem)] sm:w-[420px] flex flex-col border border-emerald-100 overflow-hidden animate__animated animate__fadeInUp animate__faster max-h-[85vh]">
          {/* Header */}
          <div className="bg-emerald-600 p-6 text-white flex justify-between items-center shrink-0 shadow-lg border-b border-emerald-500/30">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mr-4 shadow-inner">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-emerald-600 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-black text-sm uppercase tracking-[0.2em] block">Nuga Concierge</span>
                <span className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest opacity-80">Online Expert</span>
              </div>
            </div>
            
            {/* Added prominent labeled close button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 transition-all px-4 py-2 rounded-xl border border-white/20 active:scale-95 group"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Close</span>
              <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Chat Body */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 bg-gray-50/30 space-y-6 min-h-[450px] custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center mt-4">
                <div className="bg-emerald-50 text-emerald-800 p-8 rounded-[2.5rem] border border-emerald-100 mb-10 shadow-sm">
                  <p className="font-black uppercase tracking-[0.3em] text-[10px] mb-4 text-emerald-600">Established Excellence</p>
                  <p className="text-sm font-medium leading-relaxed italic">
                    "Hello! I'm your private real estate advisor. How can I assist with your luxury property goals today?"
                  </p>
                </div>
                
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Popular Conversations</p>
                <div className="grid grid-cols-1 gap-3">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-6 py-4 bg-white border border-gray-100 rounded-2xl text-[12px] font-bold text-gray-700 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-xl transition-all active:scale-95 text-left flex justify-between items-center group"
                    >
                      {s}
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate__animated animate__fadeInUp animate__faster`}>
                <div className={`max-w-[85%] p-5 rounded-[1.8rem] text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none font-semibold shadow-emerald-700/10' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none font-medium italic'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-6 py-4 rounded-[1.8rem] rounded-bl-none text-sm border border-gray-100 shadow-sm flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Consulting Ledger...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-6 border-t border-gray-100 bg-white shrink-0">
            <div className="flex items-center space-x-4">
              <input 
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to our concierge..."
                className="flex-1 border-none bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-semibold"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`p-4 rounded-2xl transition-all shadow-xl active:scale-90 ${
                  !input.trim() || isLoading 
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-800/20'
                }`}
                aria-label="Send message"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[9px] text-gray-300 text-center mt-4 font-bold uppercase tracking-[0.2em]">Nuga Best AI v2.2 • Multi-turn Enabled</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white p-5 rounded-full shadow-2xl hover:bg-emerald-700 transition-all hover:scale-105 group relative border-4 border-white active:scale-95"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400"></span>
            </span>
          </div>
          
          <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-300 origin-right">
            <div className="bg-emerald-950 text-white px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl border border-emerald-800/50 whitespace-nowrap">
              Expert Property Guidance <span className="text-emerald-400 ml-2">