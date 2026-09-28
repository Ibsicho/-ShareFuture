import React, { useState } from 'react';
import { ViewTab } from '../types';
import { 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  FileText, 
  AlertTriangle, 
  Lightbulb, 
  Milestone, 
  BarChart3, 
  Users, 
  Flame, 
  HeartHandshake, 
  MessageSquare,
  Landmark,
  Megaphone,
  Mic,
  Scale,
  DollarSign,
  BookOpen,
  Zap
} from 'lucide-react';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  signatoryCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, signatoryCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryNavItems: { id: ViewTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'manifesto', label: 'Manifesto', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'crises', label: 'Crises', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    { id: 'solutions', label: 'Solutions', icon: <Lightbulb className="w-3.5 h-3.5" /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Milestone className="w-3.5 h-3.5" /> },
    { id: 'dashboard', label: 'Metrics', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'circles', label: 'Circles', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'resources', label: 'Library', icon: <BookOpen className="w-3.5 h-3.5 text-[#D4A017]" />, badge: 'Docs' },
    { id: 'actions', label: 'Actions', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'dialogue-guide', label: 'AI Guide', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'healing', label: 'Healing', icon: <HeartHandshake className="w-3.5 h-3.5" /> },
    { id: 'un-resolution', label: 'UN Draft', icon: <Landmark className="w-3.5 h-3.5" /> },
  ];

  const operationalNavItems: { id: ViewTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'execution-innovation', label: 'Execution & Innovation', icon: <Zap className="w-3.5 h-3.5" />, badge: 'Fast-Track' },
    { id: 'campaign', label: 'Campaign', icon: <Megaphone className="w-3.5 h-3.5" />, badge: 'Launch' },
    { id: 'speech', label: 'Keynote Talk', icon: <Mic className="w-3.5 h-3.5" />, badge: '18 min' },
    { id: 'press-release', label: 'Press Release', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'governance', label: 'Governance', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'funding', label: 'Funding Plan', icon: <DollarSign className="w-3.5 h-3.5" />, badge: '$3.9B' },
  ];

  const allNavItems = [...primaryNavItems, ...operationalNavItems];

  return (
    <header className="sticky top-0 z-50 bg-[#0A2463]/95 backdrop-blur-md border-b border-[#1E6091]/40 text-white transition-all shadow-md">
      {/* Top micro-bar with global pulse */}
      <div className="bg-[#051538] text-xs text-[#A8DADC] px-4 py-1.5 border-b border-white/5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#95D5B2] animate-pulse"></span>
          <span className="font-sans font-medium tracking-wide">
            THE SHARED FUTURE MOVEMENT · A BLUEPRINT FOR HUMANITY&apos;S NEXT CHAPTER
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-white/80">
            <span className="text-[#D4A017] font-semibold">{signatoryCount.toLocaleString()}</span> Signatures
          </span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-white/80">
            <span className="text-[#95D5B2] font-semibold">10,480+</span> Circles in 150 Countries
          </span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-[#D4A017] font-serif italic text-xs hidden md:inline">
            &quot;Compete to elevate. Cooperate to survive. Heal to thrive.&quot;
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo Brand */}
          <button 
            id="brand-logo-btn"
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E6091] to-[#2D6A4F] p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0A2463] rounded-[10px] flex items-center justify-center text-xl">
                🌍
              </div>
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-white group-hover:text-[#A8DADC] transition-colors tracking-tight flex items-center gap-1.5">
                SHARED FUTURE
                <span className="text-[10px] font-sans uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#D4A017]/20 text-[#D4A017] border border-[#D4A017]/30">
                  2025–2075
                </span>
              </span>
              <p className="text-[11px] text-[#A8DADC] font-sans tracking-tight line-clamp-1">
                A Framework for Global Cooperation & Shared Prosperity
              </p>
            </div>
          </button>

          {/* Desktop Navigation Items */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
            {primaryNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-sans font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1E6091] text-white shadow-inner font-semibold border border-[#A8DADC]/40'
                      : 'text-[#A8DADC] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-[#D4A017]' : 'text-[#A8DADC]'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}

            {/* Divider */}
            <div className="h-4 w-[1px] bg-white/20 mx-1"></div>

            {/* Operational Launch Modules */}
            {operationalNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-sans font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D4A017] text-[#0A2463] font-bold shadow-md ring-1 ring-white/50'
                      : 'text-amber-300 hover:text-white hover:bg-white/10 border border-amber-400/20'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Secondary Call to Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              id="header-sign-manifesto-btn"
              onClick={() => onSelectTab('manifesto')}
              className="flex items-center gap-1.5 bg-[#D4A017] hover:bg-[#b98a12] text-[#0A2463] px-3 py-1.5 rounded-lg text-xs font-sans font-bold shadow-sm hover:shadow transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0A2463]" />
              Sign
            </button>
            <button
              id="header-campaign-hub-btn"
              onClick={() => onSelectTab('campaign')}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all active:scale-95"
            >
              <Megaphone className="w-3.5 h-3.5 text-[#D4A017]" />
              Launch Kit
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex xl:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#071b4a] border-t border-[#1E6091]/40 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          <div>
            <span className="text-[10px] uppercase font-sans font-bold text-[#D4A017] tracking-wider block mb-1.5">
              Core Framework Modules
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {primaryNavItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-tab-${item.id}`}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-sans font-medium text-left transition-colors ${
                      isActive
                        ? 'bg-[#1E6091] text-white font-bold border border-[#A8DADC]/40'
                        : 'text-[#A8DADC] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className={isActive ? 'text-[#D4A017]' : 'text-[#A8DADC]'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <span className="text-[10px] uppercase font-sans font-bold text-amber-300 tracking-wider block mb-1.5">
              Operational &amp; Campaign Modules
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {operationalNavItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-tab-op-${item.id}`}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-sans font-medium text-left transition-colors ${
                      isActive
                        ? 'bg-[#D4A017] text-[#0A2463] font-bold'
                        : 'bg-white/5 text-amber-200 hover:bg-white/10'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                onSelectTab('manifesto');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#D4A017] hover:bg-[#b98a12] text-[#0A2463] py-2.5 rounded-lg text-xs font-sans font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Sign Declaration of Interdependence
            </button>
            <button
              onClick={() => {
                onSelectTab('circles');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg text-xs font-sans font-semibold border border-white/20 flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-[#95D5B2]" />
              Find Local Dialogue Circle
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
