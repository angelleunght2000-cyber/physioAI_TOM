
import React, { useState, useRef, useEffect } from 'react';
import AnatomyModel from './components/AnatomyModel';
import RecoveryPlan from './components/RecoveryPlan';
import { chatWithGemini } from './services/gemini';
import { Message, MuscleZone, RecoveryPlanData } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to the Lab. Tom isn't feeling too great today. Tap the part of his body where the pain is starting, and I'll help you both out.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleZone | null>(null);
  const [recoveryPlan, setRecoveryPlan] = useState<RecoveryPlanData | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const parseRecoveryData = (text: string, muscleName: string): RecoveryPlanData | null => {
    if (!text.includes('### EXPLANATION ###')) return null;

    const sections = text.split(/### [A-Z]+ ###/);
    const headers = (text.match(/### [A-Z]+ ###/g) || []).map(h => h.replace(/### /g, '').replace(/ ###/g, ''));
    
    const data: any = { muscleName };
    headers.forEach((header, index) => {
        const content = sections[index + 1]?.trim();
        if (header === 'EXPLANATION') data.explanation = content;
        if (header === 'STRETCH') data.stretch = content;
        if (header === 'STRENGTH') data.strength = content;
        if (header === 'SMOOTH') data.smooth = content;
        if (header === 'HEAL') data.heal = content;
    });

    return data as RecoveryPlanData;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const chatHistory = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }));
      const responseText = await chatWithGemini(chatHistory);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText.replace(/### [A-Z]+ ###/g, ''),
        timestamp: Date.now()
      };

      const plan = parseRecoveryData(responseText, selectedMuscle?.name || "Target Area");
      if (plan) {
        setRecoveryPlan(plan);
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Could you try saying that again?",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleZoneClick = async (zone: MuscleZone) => {
    setSelectedMuscle(zone);
    setRecoveryPlan(null);
    
    const contextPrompt = `I'm feeling pain in my ${zone.name}.`;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: contextPrompt,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const responseText = await chatWithGemini([{ role: 'user', content: contextPrompt }]);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText.replace(/### [A-Z]+ ###/g, ''),
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-house-medical"></i>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">PhysioAI</h1>
            <p className="text-xs text-slate-500 font-medium tracking-tighter uppercase tracking-[0.2em]">Tom's Diagnostic Lab</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full text-green-600 text-[10px] font-black tracking-widest uppercase">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Scanner Online
        </div>
      </header>

      <main className="flex-grow max-w-[1400px] mx-auto w-full p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        {/* Left Column: Tom's Anatomy */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="lg:sticky lg:top-24">
            <AnatomyModel 
              onZoneClick={handleZoneClick} 
              selectedZoneId={selectedMuscle?.id} 
            />
          </div>
        </div>

        {/* Right Column: Chat & Recovery Plan */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {recoveryPlan && (
            <section className="animate-in slide-in-from-right-4 duration-500">
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <i className="fa-solid fa-kit-medical text-blue-600"></i>
                    Recovery Protocol: {recoveryPlan.muscleName}
                  </h2>
               </div>
               <RecoveryPlan data={recoveryPlan} />
            </section>
          )}

          <div className="flex-grow flex flex-col bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
            <div className="bg-slate-50/50 px-6 py-3 border-b border-slate-100 flex items-center gap-2">
              <i className="fa-solid fa-comments text-slate-400"></i>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Consultation Log</span>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 text-slate-500 rounded-2xl rounded-tl-none px-5 py-3 text-sm flex gap-1 items-center border border-slate-100">
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-slate-50/50 border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your symptoms..."
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-5 pr-14 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-inner transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                >
                  <i className="fa-solid fa-paper-plane px-1"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2024 PhysioAI Assistant • Tom Research Program</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-500 transition-colors">Safety</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
