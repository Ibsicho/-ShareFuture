import React, { useState } from 'react';
import { CAMPAIGN_PHASES, SOCIAL_CHANNELS } from '../data/operationalModulesData';
import { ViewTab } from '../types';
import { 
  Megaphone, 
  Share2, 
  Calendar, 
  TrendingUp, 
  Users, 
  ShieldAlert, 
  DollarSign, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight,
  Video,
  Send
} from 'lucide-react';

interface CampaignStrategyProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const CampaignStrategy: React.FC<CampaignStrategyProps> = ({ onSelectTab }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [activeChannelIndex, setActiveChannelIndex] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState<'phases' | 'channels' | 'calendar' | 'ambassadors' | 'crisis'>('phases');
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const selectedPhase = CAMPAIGN_PHASES[activePhaseIndex];
  const selectedChannel = SOCIAL_CHANNELS[activeChannelIndex];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(null), 2500);
  };

  const ambassadorEmail = `Subject: Invitation: Join The Shared Future Project as Global Ambassador

Dear [Name / Creator],

We are reaching out on behalf of The Shared Future Project (sharedfuture.org) — a global coalition of scientists, diplomats, and youth leaders launching an open-source framework for historical healing, positive competition, and the $200B Global Peace Dividend.

We have long admired your ability to bring nuanced, unifying truth to complex issues without descending into algorithmic outrage.

We are launching Phase 1 ("The Fork in the Road") across 120 countries, and we would be deeply honored to invite you to join our Global Ambassador Circle:
• Preview our 90-second cinematic video and unreleased UN Draft Resolution
• Co-host or introduce a 6-person Dialogue Circle with your community
• Receive verified early briefing assets with zero sponsored-content constraints (this is 100% open-source)

Would you or your team have 15 minutes this week for a brief briefing with our youth and diplomatic leads?

With deep gratitude for your voice,
The Shared Future Project Secretariat
Geneva · Nairobi · New York
press@sharedfuture.org`;

  return (
    <section className="py-16 bg-[#FBFBFA] text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0A2463]/10 text-[#0A2463] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#0A2463]/20">
              <Megaphone className="w-3.5 h-3.5 text-[#0A2463]" />
              Operational Module 1: Movement Engine
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
              Global Campaign Strategy: Social, Content &amp; Launch Arc
            </h2>
            <p className="text-sm text-[#6C757D] font-sans mt-2 max-w-2xl leading-relaxed">
              A phased, multi-platform media strategy engineered to transform abstract geopolitical fatigue into measurable citizen participation, youth mobilization, and diplomatic leverage.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('speech')}
              className="bg-white hover:bg-gray-50 border border-gray-300 text-[#0A2463] px-3.5 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-colors"
            >
              🎤 18-Min Keynote Script →
            </button>
            <button
              onClick={() => onSelectTab('press-release')}
              className="bg-[#0A2463] hover:bg-[#1E6091] text-white px-3.5 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              📰 Media Press Release →
            </button>
          </div>
        </div>

        {/* Sub-module Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveSubTab('phases')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubTab === 'phases'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#D4A017]" />
            4-Phase Campaign Arc (Months 1–12)
          </button>

          <button
            onClick={() => setActiveSubTab('channels')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubTab === 'channels'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Share2 className="w-4 h-4 text-[#1E6091]" />
            Cross-Channel Strategy &amp; Social Blueprint
          </button>

          <button
            onClick={() => setActiveSubTab('calendar')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubTab === 'calendar'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#2D6A4F]" />
            Editorial Calendar &amp; Content Pillars
          </button>

          <button
            onClick={() => setActiveSubTab('ambassadors')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubTab === 'ambassadors'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Users className="w-4 h-4 text-[#D4A017]" />
            Ambassadors &amp; Outreach Kit
          </button>

          <button
            onClick={() => setActiveSubTab('crisis')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubTab === 'crisis'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Crisis Comms &amp; Anti-Polarization
          </button>
        </div>

        {/* SUB-MODULE 1: 4-PHASE CAMPAIGN ARC */}
        {activeSubTab === 'phases' && (
          <div className="space-y-8">
            {/* Phase Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CAMPAIGN_PHASES.map((phase, idx) => {
                const isActive = idx === activePhaseIndex;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhaseIndex(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isActive
                        ? 'bg-[#0A2463] text-white border-[#0A2463] shadow-md ring-2 ring-[#D4A017]/40'
                        : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
                        isActive ? 'bg-[#D4A017] text-[#0A2463]' : 'bg-gray-100 text-gray-600'
                      }`}>
                        Phase {phase.number} · {phase.timing}
                      </span>
                    </div>
                    <div className={`font-serif font-bold text-base mt-2 ${isActive ? 'text-white' : 'text-[#0A2463]'}`}>
                      {phase.name.split('—')[0]}
                    </div>
                    <div className={`text-xs font-sans mt-0.5 ${isActive ? 'text-[#D4A017]' : 'text-[#1E6091]'}`}>
                      {phase.theme}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Deep Dive Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#D4A017] block mb-1">
                    Phase {selectedPhase.number} Operational Blueprint ({selectedPhase.timing})
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                    {selectedPhase.name}
                  </h3>
                </div>
                <div className="px-4 py-2 bg-blue-50 text-[#0A2463] rounded-xl border border-blue-100 text-xs font-sans font-bold text-center">
                  Theme: &quot;{selectedPhase.theme}&quot;
                </div>
              </div>

              {/* Target Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                  <span className="text-[10px] font-sans font-bold uppercase text-gray-500 block">Total Reach Target</span>
                  <span className="text-xl font-bold font-serif text-[#0A2463] mt-1 block">
                    {selectedPhase.reachTarget}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                  <span className="text-[10px] font-sans font-bold uppercase text-gray-500 block">App Downloads / Signers</span>
                  <span className="text-xl font-bold font-serif text-[#1E6091] mt-1 block">
                    {selectedPhase.engagementTarget}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                  <span className="text-[10px] font-sans font-bold uppercase text-gray-500 block">Active Dialogue Circles</span>
                  <span className="text-xl font-bold font-serif text-[#2D6A4F] mt-1 block">
                    {selectedPhase.circlesTarget}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                  <span className="text-[10px] font-sans font-bold uppercase text-gray-500 block">Funding Milestone</span>
                  <span className="text-xl font-bold font-serif text-[#D4A017] mt-1 block">
                    {selectedPhase.fundingTarget}
                  </span>
                </div>
              </div>

              {/* Key Milestones */}
              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#0A2463] mb-3">
                  Strategic Execution Milestones
                </h4>
                <div className="space-y-3">
                  {selectedPhase.keyMilestones.map((ms, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs font-sans">
                      <div className="w-5 h-5 rounded-full bg-[#0A2463] text-white flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-gray-800 leading-relaxed font-medium">
                        {ms}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODULE 2: CROSS-CHANNEL STRATEGY */}
        {activeSubTab === 'channels' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {SOCIAL_CHANNELS.map((ch, idx) => (
                <button
                  key={ch.channel}
                  onClick={() => setActiveChannelIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    idx === activeChannelIndex
                      ? 'bg-[#0A2463] text-white border-[#0A2463] shadow-md'
                      : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="font-serif font-bold text-sm">
                    {ch.channel}
                  </div>
                  <div className={`text-[11px] font-sans mt-1 ${idx === activeChannelIndex ? 'text-[#D4A017]' : 'text-gray-500'}`}>
                    {ch.handle}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#1E6091] block mb-1">
                    Channel Architecture · {selectedChannel.handle}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                    {selectedChannel.channel} Blueprint
                  </h3>
                </div>
                <div className="text-xs font-sans font-semibold text-[#2D6A4F] bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  Target Audience: {selectedChannel.audience}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <h5 className="font-bold text-[#0A2463] uppercase tracking-wide mb-1">
                      Content Focus &amp; Format:
                    </h5>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200">
                      {selectedChannel.formatFocus}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-[#0A2463] uppercase tracking-wide mb-2">
                      Core Content Pillars for this Channel:
                    </h5>
                    <ul className="space-y-1.5 list-disc list-inside text-gray-700">
                      {selectedChannel.contentPillars.map((pillar, i) => (
                        <li key={i}>{pillar}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-[#FBFBFA] rounded-xl border border-gray-200">
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">Cadence</span>
                      <strong className="text-[#0A2463] text-xs">{selectedChannel.postCadence}</strong>
                    </div>
                    <div className="p-3 bg-[#FBFBFA] rounded-xl border border-gray-200">
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">Primary Success Metric</span>
                      <strong className="text-[#1E6091] text-xs">{selectedChannel.primaryKPI}</strong>
                    </div>
                  </div>
                </div>

                {/* Live Post Simulation */}
                <div className="p-5 rounded-2xl bg-gray-900 text-white font-sans shadow-lg border border-gray-800">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3 pb-2 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#0A2463] text-[#D4A017] flex items-center justify-center font-bold text-[10px]">
                        SF
                      </div>
                      <span className="text-white font-bold">{selectedChannel.handle}</span>
                    </div>
                    <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded">Mockup</span>
                  </div>

                  <p className="text-xs text-gray-200 leading-relaxed italic bg-black/30 p-3.5 rounded-xl border border-white/5">
                    {selectedChannel.samplePost}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400">
                    <span>❤️ 48.2K likes</span>
                    <span>💬 3,420 comments</span>
                    <span>🔄 18.9K shares</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODULE 3: EDITORIAL CALENDAR */}
        {activeSubTab === 'calendar' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
                The 5 Editorial Pillars (The 20/20/25/25/10 Rule)
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                Weekly Content Distribution &amp; Schedule
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-1">
                Balancing urgency without nihilism, and systemic solutions with personal empowerment.
              </p>
            </div>

            {/* 5 Pillars visual progress bars */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs font-sans">
              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                <strong className="text-red-900 block font-bold">1. Crisis Truth (20%)</strong>
                <span className="text-red-700 text-[11px]">Unflinching data on the 10 planetary tipping points</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <strong className="text-blue-900 block font-bold">2. Vision 2075 (20%)</strong>
                <span className="text-blue-700 text-[11px]">Inspiring photorealistic glimpses of Path B co-elevation</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <strong className="text-emerald-900 block font-bold">3. The 10 Solutions (25%)</strong>
                <span className="text-emerald-700 text-[11px]">Deep policy breakdowns (Peace Dividend, AI Safety)</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <strong className="text-amber-900 block font-bold">4. Daily Action (25%)</strong>
                <span className="text-amber-700 text-[11px]">Micro-bridge building, Dialogue Circles, ethical habits</span>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                <strong className="text-purple-900 block font-bold">5. Community Voice (10%)</strong>
                <span className="text-purple-700 text-[11px]">Participant spotlight, apology letters, circle stories</span>
              </div>
            </div>

            {/* 7-Day Matrix */}
            <div className="space-y-3 pt-4 border-t border-gray-100 font-sans text-xs">
              <h4 className="font-bold text-[#0A2463] uppercase tracking-wide">
                Standard Weekly Rhythm:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
                <div className="p-3 bg-[#FBFBFA] rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold text-[#0A2463] uppercase block">Monday</span>
                  <strong className="text-xs text-gray-900 block mt-1">#MindsetShift</strong>
                  <p className="text-[11px] text-gray-600 mt-1">From zero-sum to positive competition philosophy</p>
                </div>
                <div className="p-3 bg-[#FBFBFA] rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold text-[#0A2463] uppercase block">Tuesday</span>
                  <strong className="text-xs text-gray-900 block mt-1">#SolutionDeepDive</strong>
                  <p className="text-[11px] text-gray-600 mt-1">Infographic carousel on 1 of the 10 structural proposals</p>
                </div>
                <div className="p-3 bg-[#FBFBFA] rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold text-[#0A2463] uppercase block">Wednesday</span>
                  <strong className="text-xs text-gray-900 block mt-1">#BridgeBuilders</strong>
                  <p className="text-[11px] text-gray-600 mt-1">Video story of former adversaries reconciling</p>
                </div>
                <div className="p-3 bg-[#FBFBFA] rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold text-[#0A2463] uppercase block">Thursday</span>
                  <strong className="text-xs text-gray-900 block mt-1">#DataTruth</strong>
                  <p className="text-[11px] text-gray-600 mt-1">Fact-check threads refuting polarizing rage bait</p>
                </div>
                <div className="p-3 bg-[#FBFBFA] rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold text-[#0A2463] uppercase block">Friday</span>
                  <strong className="text-xs text-gray-900 block mt-1">#YouthAction</strong>
                  <p className="text-[11px] text-gray-600 mt-1">Student peace corps actions and campus challenge</p>
                </div>
                <div className="p-3 bg-[#FBFBFA] rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold text-[#0A2463] uppercase block">Saturday</span>
                  <strong className="text-xs text-gray-900 block mt-1">#CircleWeekend</strong>
                  <p className="text-[11px] text-gray-600 mt-1">Audio dialogue prompt drops for 6-person circles</p>
                </div>
                <div className="p-3 bg-[#FBFBFA] rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold text-[#0A2463] uppercase block">Sunday</span>
                  <strong className="text-xs text-gray-900 block mt-1">#WeeklyReflection</strong>
                  <p className="text-[11px] text-gray-600 mt-1">Gratitude, Ubuntu practice, streak maintenance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODULE 4: AMBASSADOR KIT */}
        {activeSubTab === 'ambassadors' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#D4A017] block mb-1">
                  High-Impact Network Mobilization
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                  Influencer &amp; Ambassador Recruitment Kit
                </h3>
              </div>
              <button
                onClick={() => handleCopy(ambassadorEmail, 'ambassador-email')}
                className="bg-[#0A2463] hover:bg-[#1E6091] text-white px-4 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-all"
              >
                {copiedTemplate === 'ambassador-email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#D4A017]" />}
                {copiedTemplate === 'ambassador-email' ? 'Copied Invitation Letter' : 'Copy Outreach Email'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sans text-xs">
              <div className="p-4 bg-[#FBFBFA] border border-gray-200 rounded-xl">
                <span className="text-[10px] font-bold text-[#0A2463] uppercase block">Tier 1: Global Icons</span>
                <strong className="text-xs text-gray-900 mt-1 block">Reach: 10M+ Followers</strong>
                <p className="text-[11px] text-gray-600 mt-1">Nobel laureates, global musicians, respected statesmen. Commit to 1 video statement + manifesto signing.</p>
              </div>
              <div className="p-4 bg-[#FBFBFA] border border-gray-200 rounded-xl">
                <span className="text-[10px] font-bold text-[#1E6091] uppercase block">Tier 2: Thought Leaders</span>
                <strong className="text-xs text-gray-900 mt-1 block">Reach: 500K–5M</strong>
                <p className="text-[11px] text-gray-600 mt-1">Podcasters, authors, university deans. Commit to long-form interviews and op-eds.</p>
              </div>
              <div className="p-4 bg-[#FBFBFA] border border-gray-200 rounded-xl">
                <span className="text-[10px] font-bold text-[#2D6A4F] uppercase block">Tier 3: Micro-Creators</span>
                <strong className="text-xs text-gray-900 mt-1 block">Reach: 25K–250K</strong>
                <p className="text-[11px] text-gray-600 mt-1">Local culture creators, climate activists, teachers. Host pilot dialogue circles.</p>
              </div>
              <div className="p-4 bg-[#FBFBFA] border border-gray-200 rounded-xl">
                <span className="text-[10px] font-bold text-[#D4A017] uppercase block">Tier 4: Grassroots Nano</span>
                <strong className="text-xs text-gray-900 mt-1 block">Reach: Community Leads</strong>
                <p className="text-[11px] text-gray-600 mt-1">Neighborhood chairs, youth council members, local religious organizers.</p>
              </div>
            </div>

            {/* Email template box */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-300 font-mono text-xs text-gray-800 whitespace-pre-line leading-relaxed">
              {ambassadorEmail}
            </div>
          </div>
        )}

        {/* SUB-MODULE 5: CRISIS COMMS */}
        {activeSubTab === 'crisis' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-600 block mb-1">
                De-escalation &amp; Defense Protocol
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                Crisis Communications &amp; Anti-Polarization Playbook
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-1">
                How we respond when bad actors, state propagandists, or cynical pundits attack the initiative.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <strong className="text-amber-950 font-bold block text-sm">
                  Scenario A: &quot;This is naive utopianism&quot;
                </strong>
                <p className="text-amber-900 text-xs leading-relaxed">
                  <strong>The Pivot:</strong> Never argue ideals. Cite hard economic and historical facts: Rwanda Gacaca courts, the Good Friday Agreement, and the $2.4 Trillion global weapons spend vs $40B for clean water.
                </p>
                <div className="text-[11px] text-amber-800 italic bg-white/70 p-2 rounded">
                  &quot;Reconciliation is not soft idealism; it is the most demanding, mathematically necessary survival technology in human history.&quot;
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                <strong className="text-red-950 font-bold block text-sm">
                  Scenario B: Bad-Faith Partisan Attacks
                </strong>
                <p className="text-red-900 text-xs leading-relaxed">
                  <strong>The Rule of Non-Engagement:</strong> Refuse outrage algorithms. Respond with an open invitation to sit together in a Dialogue Circle rather than firing counter-tweets.
                </p>
                <div className="text-[11px] text-red-800 italic bg-white/70 p-2 rounded">
                  &quot;We hear your anger. Come sit with us on Sunday; coffee is on us, and we will listen without interrupting.&quot;
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <strong className="text-blue-950 font-bold block text-sm">
                  Scenario C: Funding / Independence Smears
                </strong>
                <p className="text-blue-900 text-xs leading-relaxed">
                  <strong>Radical Transparency Drop:</strong> Link directly to our live Open Ledger. Highlight the 10:1 salary ratio and 100% ban on weapons and fossil fuel money.
                </p>
                <div className="text-[11px] text-blue-800 italic bg-white/70 p-2 rounded">
                  &quot;Every dollar over $500 is cryptographically verified on our public ledger. We invite you to inspect line 482.&quot;
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
