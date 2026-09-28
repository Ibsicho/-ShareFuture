import React, { useState, useEffect } from 'react';
import { ViewTab } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CrisesAndScenarios } from './components/CrisesAndScenarios';
import { TenSolutionsExplorer } from './components/TenSolutionsExplorer';
import { ActionRoadmap } from './components/ActionRoadmap';
import { MetricsDashboard } from './components/MetricsDashboard';
import { ManifestoAndResolution } from './components/ManifestoAndResolution';
import { HealingFramework } from './components/HealingFramework';
import { DialogueCirclesApp } from './components/DialogueCirclesApp';
import { DailyActionTracker } from './components/DailyActionTracker';
import { AIDialogueGuide } from './components/AIDialogueGuide';
import { CampaignStrategy } from './components/CampaignStrategy';
import { SpeechCollection } from './components/SpeechCollection';
import { PressReleaseModule } from './components/PressReleaseModule';
import { OrgChartGovernance } from './components/OrgChartGovernance';
import { FundingModel } from './components/FundingModel';
import { ExecutionAndInnovation } from './components/ExecutionAndInnovation';
import { ResourceLibrary } from './components/ResourceLibrary';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  Lightbulb, 
  BarChart3, 
  Flame, 
  HeartHandshake, 
  Globe2,
  FileText,
  CheckCircle2,
  Megaphone,
  Mic,
  Scale,
  DollarSign,
  Zap
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('overview');

  const [signatoryCount, setSignatoryCount] = useState<number>(() => {
    const saved = localStorage.getItem('shared_future_signatories');
    return saved ? parseInt(saved, 10) : 1248390;
  });

  const [userSigned, setUserSigned] = useState<boolean>(() => {
    return localStorage.getItem('shared_future_user_signed') === 'true';
  });

  const [signerName, setSignerName] = useState<string>(() => {
    return localStorage.getItem('shared_future_signer_name') || '';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSignManifesto = (name: string, country: string) => {
    const newCount = signatoryCount + 1;
    setSignatoryCount(newCount);
    setUserSigned(true);
    setSignerName(name);
    localStorage.setItem('shared_future_signatories', newCount.toString());
    localStorage.setItem('shared_future_user_signed', 'true');
    localStorage.setItem('shared_future_signer_name', name);
    showToast(`Welcome, ${name}! Your signature has been verified on the Declaration of Interdependence.`);
  };

  // Scroll to top on tab change
  const handleSelectTab = (tab: ViewTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1E2530] font-sans">
      
      {/* Global Navigation Header */}
      <Header 
        currentTab={currentTab} 
        onSelectTab={handleSelectTab} 
        signatoryCount={signatoryCount}
      />

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A2463] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D4A017] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-[#95D5B2]" />
          <span className="text-xs font-sans font-semibold">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white ml-2 text-sm font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1">
        {currentTab === 'overview' && (
          <div>
            <HeroSection onSelectTab={handleSelectTab} />
            
            {/* Quick Interactive Portals on the Overview Page */}
            <section className="py-12 bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#1E6091]">
                    The Complete Operational Suite
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A2463] mt-1">
                    Explore the Framework Modules
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6C757D] mt-2 font-sans">
                    Every facet of the global transformation has been specified with concrete metrics, legal resolutions, and citizen toolkits.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <button
                    onClick={() => handleSelectTab('manifesto')}
                    className="p-5 rounded-2xl border border-gray-200 bg-[#FBFBFA] hover:bg-white hover:border-[#1E6091] text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E6091] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#0A2463] mb-1">
                        Declaration of Interdependence
                      </h3>
                      <p className="text-xs text-[#6C757D] font-sans leading-relaxed">
                        Read the founding covenant and inscribe your name alongside {signatoryCount.toLocaleString()} global citizens.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#1E6091] mt-4 flex items-center gap-1 group-hover:underline">
                      Sign Declaration <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelectTab('solutions')}
                    className="p-5 rounded-2xl border border-gray-200 bg-[#FBFBFA] hover:bg-white hover:border-[#2D6A4F] text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2D6A4F] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#0A2463] mb-1">
                        10 Structural Solutions
                      </h3>
                      <p className="text-xs text-[#6C757D] font-sans leading-relaxed">
                        From the Great Power Council to the Peace Dividend ($200B/yr) and International AI Safety Agency.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#2D6A4F] mt-4 flex items-center gap-1 group-hover:underline">
                      Inspect Proposals <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelectTab('dashboard')}
                    className="p-5 rounded-2xl border border-gray-200 bg-[#FBFBFA] hover:bg-white hover:border-[#D4A017] text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D4A017] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#0A2463] mb-1">
                        Verified Progress Dashboard
                      </h3>
                      <p className="text-xs text-[#6C757D] font-sans leading-relaxed">
                        Track quarterly planetary indicators: wars, nuclear arsenals, extreme poverty, CO2, and public trust.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#D4A017] mt-4 flex items-center gap-1 group-hover:underline">
                      View Metrics <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelectTab('circles')}
                    className="p-5 rounded-2xl border border-gray-200 bg-[#FBFBFA] hover:bg-white hover:border-[#0A2463] text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A2463] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <Users className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#0A2463] mb-1">
                        Dialogue Circles Directory
                      </h3>
                      <p className="text-xs text-[#6C757D] font-sans leading-relaxed">
                        Find a monthly 6-person dialogue circle in your city or launch one using the step-by-step wizard.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#0A2463] mt-4 flex items-center gap-1 group-hover:underline">
                      Find Circles <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelectTab('actions')}
                    className="p-5 rounded-2xl border border-gray-200 bg-[#FBFBFA] hover:bg-white hover:border-[#2D6A4F] text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2D6A4F] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <Flame className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#0A2463] mb-1">
                        7 Daily Actions &amp; Streak
                      </h3>
                      <p className="text-xs text-[#6C757D] font-sans leading-relaxed">
                        Micro-practices to bridge divides, reject outrage bait, support peace NGOs, and practice Ubuntu.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#2D6A4F] mt-4 flex items-center gap-1 group-hover:underline">
                      Log Action <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelectTab('healing')}
                    className="p-5 rounded-2xl border border-gray-200 bg-[#FBFBFA] hover:bg-white hover:border-[#D4A017] text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#0A2463] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <HeartHandshake className="w-5 h-5 text-[#2D6A4F]" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#0A2463] mb-1">
                        Historical Healing Framework
                      </h3>
                      <p className="text-xs text-[#6C757D] font-sans leading-relaxed">
                        5 steps to heal past wounds: Acknowledge → Listen → Apologize → Repair → Integrate.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#2D6A4F] mt-4 flex items-center gap-1 group-hover:underline">
                      Study Case Histories <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>

                {/* Operational Execution & Launch Modules */}
                <div className="mt-12 pt-10 border-t border-gray-200">
                  {/* Featured Fast-Track Execution Banner */}
                  <div className="mb-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#051538] via-[#0A2463] to-[#1E6091] text-white shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-[#D4A017]/40 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4A017]/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="max-w-2xl relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A2463] bg-[#D4A017] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3 text-[#0A2463]" /> NEW · 8 FAST-TRACK ENGINES
                        </span>
                        <span className="text-xs text-amber-300 font-sans font-medium">
                          Compressed Timelines &amp; 90-Day Sprints
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                        Execution &amp; Innovation Module
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-200 mt-1 font-sans leading-relaxed">
                        Compresses multi-decade diplomatic timelines by 75% through 90-day agile sprints, open tech commons, rapid 72h peace liquidity, real-time satellite conflict radar, and mobile deployment pods.
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectTab('execution-innovation')}
                      className="px-6 py-3.5 rounded-2xl bg-[#D4A017] hover:bg-[#b8860b] text-[#0A2463] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0 self-stretch lg:self-auto justify-center relative z-10 group"
                    >
                      <Zap className="w-4 h-4 text-[#0A2463]" />
                      Open Execution &amp; Innovation Suite
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-6">
                    <div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded">
                        Operational Execution Architecture
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#0A2463] mt-2">
                        Movement Infrastructure &amp; Operational Suites
                      </h3>
                      <p className="text-xs text-gray-600 font-sans mt-1">
                        Fast-track execution engines, campaign playbook, oratory scripts, media wire, governance org chart, and 10-year capital plan.
                      </p>
                    </div>
                    <span className="text-xs font-sans text-gray-500">
                      6 Operational Suites Available
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                    <button
                      onClick={() => handleSelectTab('execution-innovation')}
                      className="p-4 rounded-2xl border border-amber-300 bg-gradient-to-b from-amber-50 to-white hover:border-[#D4A017] text-left transition-all shadow-xs hover:shadow-md group ring-1 ring-amber-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0A2463] text-[#D4A017] flex items-center justify-center mb-2 font-bold text-sm">
                        ⚡
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#0A2463] group-hover:text-[#1E6091]">
                        Execution &amp; Innovation
                      </h4>
                      <p className="text-[11px] text-gray-600 font-sans mt-1 line-clamp-2">
                        8 Fast-Track Engines, 90-day sprints, and shortened activity plans.
                      </p>
                    </button>

                    <button
                      onClick={() => handleSelectTab('campaign')}
                      className="p-4 rounded-2xl border border-amber-200/80 bg-amber-50/40 hover:bg-white text-left transition-all shadow-2xs hover:shadow-md group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-2 font-bold text-sm">
                        📢
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#0A2463] group-hover:text-[#1E6091]">
                        Campaign Strategy
                      </h4>
                      <p className="text-[11px] text-gray-600 font-sans mt-1 line-clamp-2">
                        Social media calendar, viral hashtag assets, and 3-phase rollout.
                      </p>
                    </button>

                    <button
                      onClick={() => handleSelectTab('speech')}
                      className="p-4 rounded-2xl border border-blue-200/80 bg-blue-50/40 hover:bg-white text-left transition-all shadow-2xs hover:shadow-md group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0A2463] flex items-center justify-center mb-2 font-bold text-sm">
                        🎤
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#0A2463] group-hover:text-[#1E6091]">
                        Speech / TED Talk
                      </h4>
                      <p className="text-[11px] text-gray-600 font-sans mt-1 line-clamp-2">
                        Full 18-min script with stage teleprompter &amp; slide timing.
                      </p>
                    </button>

                    <button
                      onClick={() => handleSelectTab('press-release')}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white text-left transition-all shadow-2xs hover:shadow-md group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center mb-2 font-bold text-sm">
                        📰
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#0A2463] group-hover:text-[#1E6091]">
                        Press Release
                      </h4>
                      <p className="text-[11px] text-gray-600 font-sans mt-1 line-clamp-2">
                        Global wire draft, media contacts, and spokesperson roster.
                      </p>
                    </button>

                    <button
                      onClick={() => handleSelectTab('governance')}
                      className="p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 hover:bg-white text-left transition-all shadow-2xs hover:shadow-md group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#2D6A4F] flex items-center justify-center mb-2 font-bold text-sm">
                        🤝
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#0A2463] group-hover:text-[#2D6A4F]">
                        Org Chart &amp; Governance
                      </h4>
                      <p className="text-[11px] text-gray-600 font-sans mt-1 line-clamp-2">
                        Interactive hierarchy, Swiss legal foundation, and 10 principles.
                      </p>
                    </button>

                    <button
                      onClick={() => handleSelectTab('funding')}
                      className="p-4 rounded-2xl border border-yellow-200 bg-yellow-50/40 hover:bg-white text-left transition-all shadow-2xs hover:shadow-md group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-900 flex items-center justify-center mb-2 font-bold text-sm">
                        💰
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#0A2463] group-hover:text-[#D4A017]">
                        Funding Model
                      </h4>
                      <p className="text-[11px] text-gray-600 font-sans mt-1 line-clamp-2">
                        Year 1 $50M line items, $200B peace dividend calculator, and tiers.
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Embedded sections preview */}
            <TenSolutionsExplorer onSelectTab={handleSelectTab} />
            <MetricsDashboard onSelectTab={handleSelectTab} />
          </div>
        )}

        {currentTab === 'manifesto' && (
          <ManifestoAndResolution 
            signatoryCount={signatoryCount}
            onSign={handleSignManifesto}
            userSigned={userSigned}
            signerName={signerName}
          />
        )}

        {currentTab === 'un-resolution' && (
          <ManifestoAndResolution 
            signatoryCount={signatoryCount}
            onSign={handleSignManifesto}
            userSigned={userSigned}
            signerName={signerName}
          />
        )}

        {currentTab === 'crises' && (
          <CrisesAndScenarios onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'solutions' && (
          <TenSolutionsExplorer onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'roadmap' && (
          <ActionRoadmap onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'dashboard' && (
          <MetricsDashboard onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'circles' && (
          <DialogueCirclesApp onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'resources' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ResourceLibrary 
              onShowToast={(toast) => showToast(`${toast.title}: ${toast.message}`)}
            />
          </div>
        )}

        {currentTab === 'actions' && (
          <DailyActionTracker onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'dialogue-guide' && (
          <AIDialogueGuide onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'healing' && (
          <HealingFramework onSelectTab={handleSelectTab} />
        )}

        {/* Operational Modules */}
        {currentTab === 'campaign' && (
          <CampaignStrategy onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'speech' && (
          <SpeechCollection onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'press-release' && (
          <PressReleaseModule onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'governance' && (
          <OrgChartGovernance onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'funding' && (
          <FundingModel onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'execution-innovation' && (
          <ExecutionAndInnovation onSelectTab={handleSelectTab} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onSelectTab={handleSelectTab} />

    </div>
  );
}
