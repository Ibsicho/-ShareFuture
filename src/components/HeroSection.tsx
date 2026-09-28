import React, { useState } from 'react';
import { ViewTab } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  Compass, 
  HeartHandshake, 
  TrendingUp, 
  FileText,
  ChevronRight,
  Globe2,
  Zap
} from 'lucide-react';

interface HeroSectionProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  const [activePath, setActivePath] = useState<'b' | 'a'>('b');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2463] via-[#0D2E7C] to-[#0A2463] text-white py-16 sm:py-24 border-b border-[#1E6091]/30">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1E6091] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2D6A4F] rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#D4A017] rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-sans font-medium text-[#A8DADC] backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-ping"></span>
            <span>A Complete Blueprint for Humanity&apos;s Next Chapter · 2025–2075</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            A Framework for Global Cooperation &amp; Shared Prosperity
          </h1>
          <p className="text-lg sm:text-xl text-[#A8DADC] font-sans leading-relaxed max-w-3xl mx-auto">
            Humanity stands at a civilizational fork. We choose to shift from destructive zero-sum rivalry to creative positive competition — healing historical wounds and securing a flourishing planet for generations unborn.
          </p>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              id="hero-read-manifesto-btn"
              onClick={() => onSelectTab('manifesto')}
              className="bg-[#D4A017] hover:bg-[#b98a12] text-[#0A2463] font-sans font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Read The Declaration of Interdependence
            </button>
            <button
              id="hero-execution-innovation-btn"
              onClick={() => onSelectTab('execution-innovation')}
              className="bg-amber-400 hover:bg-amber-300 text-[#0A2463] font-sans font-bold px-5 py-3.5 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#0A2463]" />
              Execution &amp; Innovation (Fast-Track)
            </button>
            <button
              id="hero-explore-solutions-btn"
              onClick={() => onSelectTab('solutions')}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-semibold px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#95D5B2]" />
              Explore the 10 Solutions
            </button>
            <button
              id="hero-start-action-btn"
              onClick={() => onSelectTab('actions')}
              className="bg-[#2D6A4F] hover:bg-[#255841] text-white font-sans font-semibold px-5 py-3.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-[#D4A017]" />
              Take Today&apos;s Action
            </button>
          </div>
        </div>

        {/* The Core Paradigm Shift Card */}
        <div className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-14 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase font-sans tracking-wider font-bold text-[#D4A017]">
                Core Philosophy
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                From Negative Rivalry to Positive Competition
              </h2>
            </div>
            <div className="bg-[#D4A017]/20 border border-[#D4A017]/40 px-4 py-2 rounded-xl text-center">
              <span className="text-xs text-[#A8DADC] block font-sans">Core Insight</span>
              <span className="font-serif italic text-sm text-[#D4A017] font-semibold">
                &quot;Competition is healthy when it raises everyone&apos;s game; destructive when it aims to eliminate the other.&quot;
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#051538]/70 border border-white/10 rounded-xl p-4">
              <div className="text-xs uppercase tracking-wider text-red-300 font-bold mb-1">Old Paradigm</div>
              <div className="text-sm font-semibold text-white/70 line-through">Zero-Sum (I win only if you lose)</div>
              <div className="my-2 flex items-center gap-1.5 text-xs text-[#D4A017] font-sans font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> Transformed To:
              </div>
              <div className="text-sm font-bold text-[#95D5B2]">Positive-Sum (We both win together)</div>
            </div>

            <div className="bg-[#051538]/70 border border-white/10 rounded-xl p-4">
              <div className="text-xs uppercase tracking-wider text-red-300 font-bold mb-1">Old Paradigm</div>
              <div className="text-sm font-semibold text-white/70 line-through">Domination &amp; Subjugation</div>
              <div className="my-2 flex items-center gap-1.5 text-xs text-[#D4A017] font-sans font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> Transformed To:
              </div>
              <div className="text-sm font-bold text-[#95D5B2]">Co-Elevation &amp; Shared Lifting</div>
            </div>

            <div className="bg-[#051538]/70 border border-white/10 rounded-xl p-4">
              <div className="text-xs uppercase tracking-wider text-red-300 font-bold mb-1">Old Paradigm</div>
              <div className="text-sm font-semibold text-white/70 line-through">Revenge for Ancestral Wounds</div>
              <div className="my-2 flex items-center gap-1.5 text-xs text-[#D4A017] font-sans font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> Transformed To:
              </div>
              <div className="text-sm font-bold text-[#95D5B2]">Acknowledgment &amp; Shared Projects</div>
            </div>

            <div className="bg-[#051538]/70 border border-white/10 rounded-xl p-4">
              <div className="text-xs uppercase tracking-wider text-red-300 font-bold mb-1">Old Paradigm</div>
              <div className="text-sm font-semibold text-white/70 line-through">Identity as Enemy / Rival</div>
              <div className="my-2 flex items-center gap-1.5 text-xs text-[#D4A017] font-sans font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> Transformed To:
              </div>
              <div className="text-sm font-bold text-[#95D5B2]">Identity as Co-Creator &amp; Partner</div>
            </div>
          </div>
        </div>

        {/* The Fork in the Road: Interactive Comparison */}
        <div className="bg-[#051538] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs uppercase font-sans tracking-wider font-bold text-[#A8DADC]">
              The Civilizational Choice
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              The Fork in the Road
            </h3>
            <p className="text-sm text-[#A8DADC] mt-2">
              Toggle between the two divergent civilizational trajectories for the next 50 years:
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/30 p-1.5 rounded-xl inline-flex border border-white/10">
              <button
                id="toggle-path-b-btn"
                onClick={() => setActivePath('b')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-sans font-bold transition-all flex items-center gap-2 ${
                  activePath === 'b'
                    ? 'bg-[#2D6A4F] text-white shadow-md'
                    : 'text-[#A8DADC] hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#D4A017]" />
                Path B: Cooperation &amp; Renaissance (2075)
              </button>
              <button
                id="toggle-path-a-btn"
                onClick={() => setActivePath('a')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-sans font-bold transition-all flex items-center gap-2 ${
                  activePath === 'a'
                    ? 'bg-red-950 text-red-200 border border-red-500/40 shadow-md'
                    : 'text-[#A8DADC] hover:text-white'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Path A: Fragmentation &amp; Collapse (2050)
              </button>
            </div>
          </div>

          {/* Path Content Cards */}
          {activePath === 'b' ? (
            <div className="bg-gradient-to-br from-[#2D6A4F]/20 via-[#1E6091]/20 to-transparent border border-[#95D5B2]/30 rounded-xl p-6 sm:p-8 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#95D5B2]/20 text-[#95D5B2] border border-[#95D5B2]/40">
                    The Choice We Make Today
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-white mt-2">
                    Path B: Positive Competition, Healing &amp; Renaissance 2.0
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#A8DADC] block">Target Horizon</span>
                  <span className="text-xl font-bold text-[#D4A017] font-serif">Year 2075</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-[#95D5B2] font-bold mb-1">🕊️ Zero Active Wars</div>
                  <p className="text-xs text-[#A8DADC]">Conflicts mediated before escalation; Great Power Dialogue Council prevents great-power conflict.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-[#95D5B2] font-bold mb-1">🌱 Extreme Poverty Eliminated</div>
                  <p className="text-xs text-[#A8DADC]">Extreme poverty &lt;1%; guaranteed clean water, sanitation, nutrition, and universal basic dividends.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-[#95D5B2] font-bold mb-1">☀️ 90% Clean Energy Grid</div>
                  <p className="text-xs text-[#A8DADC]">Carbon price fund transformed energy infrastructure; atmospheric CO2 reversing below 400 ppm.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-[#95D5B2] font-bold mb-1">🤝 Deep Historical Healing</div>
                  <p className="text-xs text-[#A8DADC]">Truth commissions acknowledged wrongs; Shared Future Investment Funds replace bitter revanchism.</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-[#A8DADC] italic">
                  &quot;We did not inherit the Earth from our ancestors. We borrowed it from our children. And we return it better than we found it.&quot;
                </p>
                <button 
                  onClick={() => onSelectTab('roadmap')}
                  className="text-xs font-bold text-[#D4A017] hover:underline flex items-center gap-1"
                >
                  View 4-Phase Roadmap to 2075 <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-red-950/40 via-red-900/20 to-transparent border border-red-500/40 rounded-xl p-6 sm:p-8 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-red-500/20 text-red-300 border border-red-500/40">
                    If We Do Nothing
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-white mt-2">
                    Path A: Fragmentation, Escalation &amp; Dark Age 2.0
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-red-300 block">Catastrophic Horizon</span>
                  <span className="text-xl font-bold text-red-400 font-serif">2035–2050</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
                  <div className="text-red-300 font-bold mb-1">☢️ Nuclear Escalation</div>
                  <p className="text-xs text-white/70">Treaty collapse and hair-trigger autonomous command loops leading to 100M+ casualties.</p>
                </div>
                <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
                  <div className="text-red-300 font-bold mb-1">🌡️ +2.5°C Climate Collapse</div>
                  <p className="text-xs text-white/70">1 Billion displaced climate refugees; regional water wars and severe crop failures in 30+ countries.</p>
                </div>
                <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
                  <div className="text-red-300 font-bold mb-1">🤖 Autonomous Arms Race</div>
                  <p className="text-xs text-white/70">Lethal robotic swarms weaponized without human moral judgment or international inspection.</p>
                </div>
                <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
                  <div className="text-red-300 font-bold mb-1">🏛️ Multilateral Institution Collapse</div>
                  <p className="text-xs text-white/70">UN, WTO, and WHO dissolve; world collapses back into 19th-century warlordism and economic blocs.</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-500/20 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-red-300 font-semibold">
                  We refuse this future. We have ~10 years to change course. Not 10 years to talk. 10 years to act.
                </p>
                <button 
                  onClick={() => onSelectTab('solutions')}
                  className="text-xs font-bold text-white bg-red-800 hover:bg-red-700 px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  See The 10 Counter-Solutions <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
