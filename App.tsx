
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, Zap, Globe, Users, Heart, 
  Layers, ShieldCheck, BarChart3, ArrowRight, Award, Clock, AlertTriangle, 
  Cpu, Image as ImageIcon, CreditCard, Rocket, FileText, Ear, 
  Gamepad2, Target, CheckCircle2, Terminal, Monitor, Layout, Search, Lock, ShieldAlert, Key
} from 'lucide-react';
import SlideLayout from './components/SlideLayout';
import { SlideData } from './types';
import { generatePitchScript } from './services/geminiService';

const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1_wL80AHDqwvcSKFxG7ouoVzMszYQqbsWanjat1o7jFE/export?format=csv';

const LogoutButton: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <button 
      onClick={onLogout}
      className="group relative flex items-center justify-center w-16 h-16 rounded-full btn-logout-gloss transition-all duration-300 pointer-events-auto border-2 border-[#2a2d3d]/50"
      title="Secure Logout"
    >
      <div className="absolute top-1 left-2 w-6 h-3 bg-white/10 rounded-full blur-[2px] rotate-[-25deg]" />
      <div className="relative z-10 flex items-center justify-center text-[#2dd4bf] drop-shadow-[0_0_12px_rgba(45,212,191,0.8)]">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path 
             d="M11 6C8.5 6 7 7.5 7 10V14C7 16.5 8.5 18 11 18" 
             stroke="currentColor" 
             strokeWidth="2.5" 
             strokeLinecap="round" 
             className="group-hover:translate-x-[-1px] transition-transform"
           />
           <path 
             d="M11 12H20M20 12L17 9M20 12L17 15" 
             stroke="currentColor" 
             strokeWidth="2.5" 
             strokeLinecap="round" 
             strokeLinejoin="round" 
             className="group-hover:translate-x-[2px] transition-transform"
           />
        </svg>
      </div>
      <div className="absolute -inset-1 rounded-full border border-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
    </button>
  );
};

const ThanksScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#020205] flex items-center justify-center p-12 overflow-hidden perspective-2000">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-600/5 blur-[150px] rounded-full animate-pulse" />
      <div className="relative animate-thanks-3d w-full max-w-6xl">
        <div className="flex flex-col items-center gap-16 animate-float-3d">
          <div className="relative w-48 h-48">
             <div className="absolute inset-0 border-4 border-teal-500/20 rounded-[35%] animate-spin-slow" />
             <div className="absolute inset-6 border-4 border-indigo-500/20 rounded-[35%] animate-spin-reverse" />
             <div className="absolute inset-0 flex items-center justify-center shadow-[inset_0_0_50px_rgba(45,212,191,0.1)] rounded-full">
                <div className="relative">
                  <Heart size={96} className="text-teal-400 animate-pulse drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]" />
                  <div className="absolute -top-4 -right-4 w-4 h-4 bg-indigo-500 rounded-full animate-ping" />
                </div>
             </div>
          </div>
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black font-display tracking-tight text-white uppercase leading-[0.9] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
              THANKS FOR BEING <br />
              WITH THE <span className="glitch-text text-teal-400">SM TECHNOLOGY</span> <br />
              <span className="text-indigo-600 italic">SIGMA FAMILY</span>
            </h1>
            <div className="flex items-center justify-center gap-6 mt-12 opacity-60">
              <div className="h-px w-32 bg-gradient-to-r from-transparent to-teal-500/50" />
              <p className="text-indigo-400 font-mono text-base tracking-[1em] uppercase animate-pulse">
                Session Finalized
              </p>
              <div className="h-px w-32 bg-gradient-to-l from-transparent to-teal-500/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [pitchScript, setPitchScript] = useState<string | null>(null);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);

  const slides: SlideData[] = [
    {
      id: 'page-1',
      title: 'GAME DEVELOPMENT SALES MASTERY',
      subtitle: 'Complete Fiverr Client Acquisition Strategy',
      backgroundImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000',
      theme: 'dark',
      content: (
        <div className="flex flex-col gap-10 animate-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 w-full lg:max-w-7xl">
            {[
              { icon: <Gamepad2 size={48} />, label: 'Expert Game Dev' },
              { icon: <Users size={48} />, label: 'Fiverr Sales' },
              { icon: <Rocket size={48} />, label: 'Proven Success' },
              { icon: <Zap size={48} />, label: 'Fast Delivery' }
            ].map((item, idx) => (
              <div key={idx} className="glass p-12 rounded-[32px] flex flex-col items-center gap-6 border-t border-indigo-500/50 hover:bg-white/5 transition-all hover:scale-105 group">
                <span className="text-indigo-400 group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-sm font-black uppercase tracking-[0.2em] text-center">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl text-slate-300 max-w-5xl leading-tight font-light">
            Learn how to win clients, close deals, and deliver exceptional games at scale. 
            <span className="text-indigo-500 font-bold block mt-4 glitch-text">LEVEL UP YOUR FREELANCE CAREER.</span>
          </p>
          <button onClick={() => setCurrentSlideIndex(1)} className="w-fit px-12 py-6 bg-indigo-600 rounded-full font-black text-lg flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-indigo-600/30">
            PRESS START <ArrowRight size={24} />
          </button>
        </div>
      ),
    },
    {
      id: 'page-2',
      title: 'THE PROFESSIONAL STANDARD',
      subtitle: 'Why Clients Choose Us',
      backgroundImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000',
      theme: 'dark',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-in w-full">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-indigo-400">Competitive Advantages</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { t: 'Technical Excellence', d: 'Unity & C# Experts', i: <Cpu size={28}/> },
                { t: 'Complete Solutions', d: 'Design to Deployment', i: <Layout size={28}/> },
                { t: 'Proven Process', d: 'MVP-First Approach', i: <Target size={28}/> },
                { t: 'Transparent Pricing', d: 'Value for Money', i: <CreditCard size={28}/> }
              ].map((item, idx) => (
                <div key={idx} className="glass p-6 rounded-3xl border-l-4 border-indigo-600 hover:scale-105 transition-all">
                  <span className="text-indigo-400 mb-3 block">{item.i}</span>
                  <h4 className="font-bold text-base mb-1">{item.t}</h4>
                  <p className="text-xs text-slate-500">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass p-12 rounded-[40px] flex flex-col justify-center gap-8 border border-indigo-500/20 h-full">
            <h4 className="font-display text-3xl font-bold">Our Promise</h4>
            <p className="text-2xl text-slate-400 leading-relaxed italic">"We deliver high-quality games on time and on budget. Our structured approach eliminates surprises and focuses on creating games that succeed."</p>
            <div className="flex gap-6">
              <div className="px-6 py-3 bg-indigo-500/20 rounded-xl text-indigo-300 text-sm font-black tracking-widest">12+ GENRES</div>
              <div className="px-6 py-3 bg-indigo-500/20 rounded-xl text-indigo-300 text-sm font-black tracking-widest">4 PLATFORMS</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'page-3',
      title: 'SUCCESS BY THE NUMBERS',
      subtitle: 'Data-Driven Excellence',
      backgroundImage: 'https://images.unsplash.com/photo-1551288049-bbbda536ad80?auto=format&fit=crop&q=80&w=2000',
      theme: 'dark',
      content: (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 animate-in w-full">
          {[
            { v: '$800 - $30K+', l: 'Project Range', i: <BarChart3 size={40} className="text-green-400"/> },
            { v: '2w - 14m', l: 'Timeline Range', i: <Clock size={40} className="text-yellow-400"/> },
            { v: '12+', l: 'Game Genres', i: <Gamepad2 size={40} className="text-indigo-400"/> },
            { v: '7+', l: 'Premium Add-ons', i: <Layers size={40} className="text-pink-400"/> }
          ].map((stat, idx) => (
            <div key={idx} className="glass p-12 rounded-[48px] text-center flex flex-col items-center gap-6 hover:border-indigo-500 transition-all border border-white/5">
              <div className="p-6 bg-slate-900 rounded-3xl shadow-lg">{stat.i}</div>
              <h4 className="text-5xl font-black glitch-text">{stat.v}</h4>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-[0.3em]">{stat.l}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'page-4',
      title: 'INITIAL CLIENT CONTACT',
      subtitle: 'Message Templates',
      backgroundImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2000',
      theme: 'dark',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in font-mono w-full">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 px-6 py-3 glass rounded-xl border border-indigo-500/30 w-fit text-indigo-400 text-lg md:text-xl font-black uppercase mb-2 shadow-lg">
              <Terminal size={28}/> CASE: FULL REQUIREMENTS
            </div>
            <div className="glass p-10 rounded-[40px] text-lg md:text-xl leading-relaxed text-slate-300 border-t-4 border-green-500 whitespace-pre-wrap">
              {"Hello there!\n\nThank you for getting in touch.\n\nYes, I am well-experienced in creating games based on your vision.\n\nPlease allow me a moment to carefully review your instructions.\n\nI'll provide you with the most effective solution soon.\n\nAdditionally, feel free to schedule a meeting for a deeper discussion if needed."}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 px-6 py-3 glass rounded-xl border border-indigo-500/30 w-fit text-indigo-400 text-lg md:text-xl font-black uppercase mb-2 shadow-lg">
              <Terminal size={28}/> CASE: NO REQUIREMENTS
            </div>
            <div className="glass p-10 rounded-[40px] text-lg md:text-xl leading-relaxed text-slate-300 border-t-4 border-yellow-500 whitespace-pre-wrap">
              {"Hello there!\n\nThank you for getting in touch!\n\nCould you please provide more details on the following to better understand your game needs?\n\n• What type of game do you want (mobile, web, console)?\n• Who is the target audience?\n• What main features do you need (multiplayer, leaderboards)?\n• What is the visual style or theme?\n• What's your budget and timeline?\n• How will the game be monetized?\n\nLooking forward to your response."}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'page-5',
      title: "UNDERSTANDING THE VISION",
      subtitle: "Gathering Requirements",
      backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
      theme: 'dark',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center animate-in w-full">
          <div className="space-y-10">
            <div className="p-10 glass rounded-[40px] border-l-8 border-indigo-500 shadow-2xl">
              <h4 className="text-3xl font-black mb-6 text-indigo-400">THE GOLDEN RULE</h4>
              <p className="text-3xl text-slate-100 leading-tight italic">
                "Wait for the client to share their vision <span className="text-indigo-500">first</span>. If vague, ask thoughtful follow-ups."
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                'Clarify target audience & core mechanics',
                'Define game experience & emotional hooks',
                'Ask for visual inspiration or references',
                'Identify mandatory target platforms'
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-center text-xl group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white shadow-xl group-hover:scale-110 transition-transform">{i+1}</div>
                  <span className="text-slate-200 group-hover:text-indigo-400 transition-colors font-bold">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-lg mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
            <div className="absolute inset-[-20px] border-[1px] border-dashed border-indigo-500/20 rounded-full animate-spin-slow" />
            <div className="absolute inset-0 border-[2px] border-dashed border-teal-500/10 rounded-full animate-spin-reverse" />
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full z-0">
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent absolute animate-scan-y opacity-40" />
            </div>
            <div className="relative z-10 w-4/5 h-4/5 glass rounded-full flex flex-col items-center justify-center border-4 border-indigo-500/40 shadow-[0_0_80px_rgba(99,102,241,0.3)] transform hover:scale-105 transition-transform duration-700">
              <div className="p-6 bg-indigo-600/20 rounded-full mb-6 animate-pulse">
                <Search size={80} className="text-teal-400" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-display font-black text-4xl lg:text-5xl uppercase tracking-tighter leading-none text-white glitch-text">LISTEN</h4>
                <div className="text-indigo-400 text-xl tracking-[0.8em] font-light">FIRST</div>
                <div className="flex items-center justify-center gap-4 py-4">
                  <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-teal-500" />
                  <div className="w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_10px_#2dd4bf]" />
                  <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-teal-500" />
                </div>
                <h4 className="font-display font-black text-4xl lg:text-5xl uppercase tracking-tighter leading-none text-white glitch-text">ASK</h4>
                <div className="text-indigo-400 text-xl tracking-[0.8em] font-light">LATER</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'page-6',
      title: 'CLIENT CONVERSATION FLOW',
      subtitle: 'From Contact to Contract',
      backgroundImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=2000',
      theme: 'dark',
      content: (
        <div className="relative py-20 animate-in w-full">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-indigo-900/30 -translate-y-1/2 hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { l: 'Contact', d: 'Within 2h', i: <Users size={32}/> },
              { l: 'Gathering', d: '24-48h', i: <FileText size={32}/> },
              { l: 'Proposal', d: '48-72h', i: <Layers size={32}/> },
              { l: 'Meeting', d: 'Scheduled', i: <Monitor size={32}/> },
              { l: 'Closing', d: '3-7 Days', i: <Award size={32}/> }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 glass p-10 rounded-[40px] flex flex-col items-center text-center gap-4 border border-white/5 hover:border-indigo-500 transition-all hover:-translate-y-4">
                <div className="p-6 bg-indigo-600 rounded-3xl text-white mb-2 shadow-2xl">{step.i}</div>
                <h4 className="font-black text-lg uppercase tracking-widest">{step.l}</h4>
                <p className="text-xs text-indigo-400 font-black uppercase tracking-widest">{step.d}</p>
                <div className="mt-4 px-4 py-1 bg-green-500/20 rounded-full text-[10px] font-bold text-green-400">BUILD TRUST</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'page-7',
      title: 'THE 7-STEP MEETING FLOW',
      subtitle: 'Approaching the Discovery Call',
      backgroundImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000',
      theme: 'dark',
      content: (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-in w-full">
          {[
            { t: '1. Intro', d: '3m - Warm greet', i: <Heart size={24}/> },
            { t: '2. Listen', d: '15m - Vision', i: <Ear size={24}/> },
            { t: '3. Clarify', d: '10m - Tech deep dive', i: <CheckCircle2 size={24}/> },
            { t: '4. Present', d: '10m - Tech approach', i: <Cpu size={24}/> },
            { t: '5. Pricing', d: '10m - MVP plan', i: <CreditCard size={24}/> },
            { t: '6. Boundaries', d: '5m - Setting scope', i: <ShieldCheck size={24}/> },
            { t: '7. Next Steps', d: '2m - Proposal date', i: <ArrowRight size={24}/> },
            { t: 'Reminders', d: 'Detailed notes', i: <AlertTriangle size={24}/> }
          ].map((s, i) => (
            <div key={i} className="glass p-8 rounded-[32px] border-b-8 border-indigo-600 hover:bg-white/5 transition-all">
               <span className="text-indigo-400 mb-4 block">{s.i}</span>
               <h4 className="font-black text-lg mb-2">{s.t}</h4>
               <p className="text-sm text-slate-500 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'page-8',
      title: 'PREVENTING SCOPE CREEP',
      subtitle: 'Critical Boundaries',
      backgroundImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000',
      theme: 'dark',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in w-full">
          <div className="glass p-16 rounded-[48px] border-t-8 border-red-500 bg-red-500/5 flex flex-col gap-6">
            <h4 className="text-red-500 font-black uppercase text-sm tracking-[0.3em] flex items-center gap-3"><AlertTriangle size={24}/> NEVER SAY:</h4>
            <p className="text-4xl font-light italic text-slate-200 leading-tight">"If you need anything else, feel free to share."</p>
          </div>
          <div className="glass p-16 rounded-[48px] border-t-8 border-green-500 bg-green-500/5 flex flex-col gap-6">
            <h4 className="text-green-500 font-black uppercase text-sm tracking-[0.3em] flex items-center gap-3"><CheckCircle2 size={24}/> INSTEAD SAY:</h4>
            <p className="text-3xl text-slate-100 leading-tight">"Any additional features beyond the initial scope can be discussed as add-ons or future updates."</p>
          </div>
        </div>
      ),
    }
  ];

  const handleNext = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setDirection('forward');
      setCurrentSlideIndex(prev => prev + 1);
      setPitchScript(null);
    }
  }, [currentSlideIndex, slides.length]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection('backward');
      setCurrentSlideIndex(prev => prev - 1);
      setPitchScript(null);
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAuthenticated || isLoggingOut) return;
      if (e.key === 'ArrowRight' || e.key === ' ') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isAuthenticated, isLoggingOut]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError(null);
    try {
      const response = await fetch(SPREADSHEET_CSV_URL);
      if (!response.ok) throw new Error("Failed to fetch credentials.");
      const csvText = await response.text();
      const lines = csvText.split('\n');
      let found = false;
      for (let i = 0; i < lines.length; i++) {
        const columns = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        if (columns[0] === loginId && columns[1] === password) {
          found = true;
          break;
        }
      }
      if (found) setIsAuthenticated(true);
      else setError("Invalid Terminal ID or Access Key.");
    } catch (err) {
      setError("Authorization failed. Check network connection.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setIsLoggingOut(false);
      setLoginId('');
      setPassword('');
      setCurrentSlideIndex(0);
    }, 10000);
  };

  const handleGeneratePitch = async () => {
    setIsGeneratingPitch(true);
    const activeSlide = slides[currentSlideIndex];
    const context = {
      slideTitle: activeSlide.title,
      slideSubtitle: activeSlide.subtitle,
      keyPoints: [activeSlide.subtitle || '', 'Sales Mastery', 'Gaming Vibe']
    };
    const script = await generatePitchScript(context);
    setPitchScript(script);
    setIsGeneratingPitch(false);
  };

  if (isLoggingOut) return <ThanksScreen />;

  if (!isAuthenticated) {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-[#020205] bg-grid flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-indigo-500/20 rounded-full animate-spin-slow" />
        </div>
        <div className="relative z-10 w-full max-w-md glass p-10 md:p-14 rounded-[48px] border-t-8 border-indigo-600 shadow-2xl animate-in">
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-indigo-600/20 rounded-3xl flex items-center justify-center text-indigo-400 border border-indigo-500/30 animate-pulse">
              <Lock size={40} />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-black uppercase tracking-widest glitch-text mb-2 text-white">SECURE TERMINAL</h1>
              <p className="text-indigo-400 font-bold text-xs uppercase tracking-[0.3em]">SM TECHNOLOGY ACCESS</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-4">Terminal ID</label>
                <div className="relative group">
                  <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-6 font-mono text-indigo-100 focus:border-indigo-500 focus:outline-none transition-all" placeholder="ID..." required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-4">Access Key</label>
                <div className="relative group">
                  <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-6 font-mono text-indigo-100 focus:border-indigo-500 focus:outline-none transition-all" placeholder="••••••••" required />
                </div>
              </div>
            </div>
            {error && <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold animate-in"><ShieldAlert size={18} />{error}</div>}
            <button type="submit" disabled={isAuthenticating} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 py-6 rounded-2xl font-black text-white uppercase tracking-[0.4em] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-4">
              {isAuthenticating ? (<><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />WAIT...</>) : (<>LOGIN <ArrowRight size={20} /></>)}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-grid">
      <div className="absolute inset-0 bg-black/80 z-0" />
      <div className="absolute top-0 left-0 w-full h-1 z-50 flex gap-px px-px">
        {slides.map((_, idx) => (
          <div key={idx} className={`h-full transition-all duration-700 ease-out flex-1 ${idx <= currentSlideIndex ? 'bg-indigo-500 shadow-[0_0_10px_#6366f1]' : 'bg-white/5'}`} />
        ))}
      </div>
      <header className="absolute top-0 left-0 w-full p-8 z-50 flex justify-between items-start pointer-events-none">
        
        {/* Top Left Logo: Bdcalling */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Dynamic Swirl Arc Background */}
            <svg width="56" height="56" viewBox="0 0 100 100" className="absolute animate-spin-slow">
              <defs>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2563eb' }} />
                  <stop offset="100%" style={{ stopColor: '#3b82f6' }} />
                </linearGradient>
              </defs>
              <path 
                d="M50 10 A40 40 0 1 1 10 50" 
                fill="none" 
                stroke="url(#blueGrad)" 
                strokeWidth="6" 
                strokeLinecap="round" 
                className="opacity-90"
              />
            </svg>
            {/* Stylized 'b' */}
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-400 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
               <span className="font-montserrat font-black text-2xl text-white select-none">b</span>
            </div>
          </div>
          <div className="flex flex-col ml-1">
            <span className="font-montserrat text-2xl font-light text-white tracking-tight"><span className="font-bold">B</span>dcalling</span>
          </div>
          <div className="ml-4">
             <LogoutButton onLogout={handleLogout} />
          </div>
        </div>

        {/* Top Right Logo: SM Technology Sigma */}
        <div className="flex items-center gap-6 pointer-events-auto">
          <div className="flex flex-col text-right">
             <span className="font-montserrat text-3xl font-bold text-[#00f2ff] tracking-tighter leading-none">TECHNOLOGY</span>
             <span className="font-montserrat text-sm font-medium text-white tracking-[0.6em] uppercase mt-1">SIGMA</span>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center group">
             {/* Vibrant Swoosh Wrapping */}
             <svg width="80" height="80" viewBox="0 0 100 100" className="absolute -rotate-45 group-hover:rotate-0 transition-transform duration-1000">
                <path 
                  d="M15,50 C15,20 85,20 85,50 C85,80 15,80 15,50" 
                  fill="none" 
                  stroke="#00f2ff" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  className="opacity-70"
                />
             </svg>
             {/* Merged SM Emblem */}
             <div className="relative z-10 flex font-montserrat text-4xl font-extrabold items-baseline">
                <span className="text-yellow-400 drop-shadow-neon" style={{ transform: 'translateX(2px)' }}>S</span>
                <span className="text-yellow-500" style={{ transform: 'translateX(-4px)', fontSize: '0.9em' }}>M</span>
             </div>
          </div>
          <button onClick={handleGeneratePitch} className="flex items-center gap-3 px-6 py-3 glass rounded-xl hover:bg-white/10 transition-all font-black text-xs h-fit self-center">
            <Zap className="text-yellow-400" size={18} />
            AI DEBRIEF
          </button>
        </div>

      </header>

      <div className="absolute bottom-10 right-16 z-50 flex gap-4">
        <button onClick={handlePrev} disabled={currentSlideIndex === 0} className="w-16 h-16 glass rounded-2xl flex items-center justify-center hover:bg-indigo-600 disabled:opacity-20 transition-all shadow-2xl">
          <ChevronLeft size={28} />
        </button>
        <button onClick={handleNext} disabled={currentSlideIndex === slides.length - 1} className="w-24 h-16 bg-white text-black rounded-2xl flex items-center justify-center hover:scale-105 disabled:opacity-20 transition-all shadow-2xl">
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="absolute bottom-10 left-16 z-50 flex items-center gap-6">
        <div className="font-display text-6xl font-black text-white/10 select-none">{String(currentSlideIndex + 1).padStart(2, '0')}</div>
        <div className="flex flex-col">
          <div className="h-1.5 w-40 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all duration-700 ease-out shadow-[0_0_10px_#6366f1]" style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }} />
          </div>
          <span className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.4em] mt-2">MODULE PROGRESS</span>
        </div>
      </div>

      <main className="w-full h-full relative z-10">
        {slides.map((slide, index) => (
          <SlideLayout key={slide.id} slide={slide} isActive={index === currentSlideIndex} direction={direction} />
        ))}
      </main>

      {pitchScript && (
        <div className="absolute top-32 right-12 w-96 z-50 glass p-10 rounded-[40px] shadow-2xl animate-in border-l-8 border-indigo-500">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-display font-black uppercase text-xs tracking-[0.4em] text-indigo-400">MISSION DEBRIEF</h4>
            <button onClick={() => setPitchScript(null)} className="text-slate-500 hover:text-white transition-colors text-2xl">×</button>
          </div>
          <p className="text-lg leading-relaxed text-slate-200 italic font-mono bg-black/20 p-4 rounded-xl">"{pitchScript}"</p>
        </div>
      )}

      {isGeneratingPitch && (
        <div className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-xl flex items-center justify-center">
          <div className="flex flex-col items-center gap-12">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-8 border-t-indigo-500 rounded-[40px] animate-spin" />
            </div>
            <p className="font-display text-3xl font-black text-white tracking-[0.5em] animate-pulse">UPDATING AI FIRMWARE...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
