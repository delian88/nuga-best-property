
import React, { useState, useRef, useEffect } from 'react';
import { getPropertyAdvice } from '../services/geminiService';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getPropertyAdvice(input);
    setMessages(prev => [...prev, { role: 'assistant' as const, content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[calc(100vw-2rem)] sm:w-96 flex flex-col border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-300 max-h-[80vh]">
          <div className="bg-fuchsia-700 p-4 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-fuchsia-600 rounded-full flex items-center justify-center mr-3 shadow-inner">
                <svg className="w-5 h-5 text-fuchsia-100" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 112 0 1 1 0 01-2 0zm5-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-bold text-sm sm:text-base">Nuga AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-75 transition-opacity p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 bg-gray-50 space-y-4 min-h-[300px]">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-xs sm:text-sm mt-10">
                <p className="font-medium mb-2">Welcome to Nuga Best Properties!</p>
                <p>How can I help you today? Ask about neighborhoods, price trends, or property types.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm ${
                  m.role === 'user' 
                    ? 'bg-fuchsia-600 text-white rounded-br-none shadow-md' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl text-xs sm:text-sm border border-gray-200 shadow-sm animate-pulse text-gray-400 italic">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4 border-t border-gray-100 flex items-center space-x-2 bg-white shrink-0">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-gray-50"
            />
            <button 
              onClick={handleSend}
              className="bg-emerald-600 text-white p-2.5 rounded-full hover:bg-emerald-700 transition-all shadow-md active:scale-90"
              aria-label="Send message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-fuchsia-700 text-white p-4 rounded-full shadow-2xl hover:bg-fuchsia-800 transition-all hover:scale-105 group relative border-2 border-white/50 active:scale-95"
          aria-label="Open AI Assistant"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:block absolute -top-12 right-0 bg-white text-fuchsia-800 px-3 py-1 rounded-lg text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-fuchsia-100">
            Ask Nuga Best AI
          </span>
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
