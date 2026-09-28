import React from 'react';
import { ViewTab } from '../types';
import { Globe, Heart, Shield, Sparkles, FileText, Landmark, Users } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#051538] text-white border-t border-white/10 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Quote Callout */}
        <div className="text-center max-w-3xl mx-auto pb-12 border-b border-white/10">
          <span className="text-3xl mb-4 block">🌍</span>
          <blockquote className="font-serif italic text-xl sm:text-2xl text-white font-medium leading-relaxed">
            &quot;The old world is dying. The new world is struggling to be born.
            Now is the time of monsters — and of midwives.
            Choose to be a midwife of a better future.&quot;
          </blockquote>
          <p className="text-xs text-[#A8DADC] uppercase tracking-widest mt-3 font-semibold">
            — Inspired by Antonio Gramsci · The Shared Future Project
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs">
          <div>
            <h4 className="font-serif font-bold text-sm text-[#D4A017] mb-4 tracking-wide">
              The Blueprint
            </h4>
            <ul className="space-y-2 text-[#A8DADC]">
              <li>
                <button onClick={() => onSelectTab('manifesto')} className="hover:text-white transition-colors">
                  Declaration of Interdependence
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('crises')} className="hover:text-white transition-colors">
                  The 10 Real Problems We Face
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('solutions')} className="hover:text-white transition-colors">
                  10 Structural Proposals
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('un-resolution')} className="hover:text-white transition-colors">
                  Draft UN Resolution A/RES/SHARED-FUTURE
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('roadmap')} className="hover:text-white transition-colors">
                  4-Phase Roadmap to 2075
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-[#D4A017] mb-4 tracking-wide">
              Operational Launch Kit
            </h4>
            <ul className="space-y-2 text-[#A8DADC]">
              <li>
                <button onClick={() => onSelectTab('execution-innovation')} className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-300 font-bold">
                  <span>⚡</span> Execution &amp; Innovation (Fast-Track)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('campaign')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>📢</span> Campaign Strategy &amp; Social
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('speech')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>🎤</span> 18-Minute Speech &amp; Script
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('press-release')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>📰</span> Press Release &amp; Media Kit
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('governance')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>🤝</span> Org Chart &amp; Governance
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('funding')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>💰</span> Funding Model &amp; $200B Calculator
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-[#D4A017] mb-4 tracking-wide">
              Action &amp; Community
            </h4>
            <ul className="space-y-2 text-[#A8DADC]">
              <li>
                <button onClick={() => onSelectTab('circles')} className="hover:text-white transition-colors">
                  Dialogue Circles Directory
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('actions')} className="hover:text-white transition-colors">
                  7 Daily Actions Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dialogue-guide')} className="hover:text-white transition-colors">
                  AI Dialogue Guide Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('healing')} className="hover:text-white transition-colors">
                  Historical Healing 5-Step Process
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dashboard')} className="hover:text-white transition-colors">
                  Verified Quarterly Metrics
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-[#D4A017] mb-4 tracking-wide">
              Open Source Civilization
            </h4>
            <p className="text-xs text-[#A8DADC] leading-relaxed mb-3">
              This framework is open source under Creative Commons BY-SA 4.0. Free to share, translate, and adapt in every nation, school, and village.
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/80">
              <span className="font-bold text-[#95D5B2] block mb-0.5">Decade of Healing (2025–2035)</span>
              We have 10 years to change course. Not 10 years to talk. 10 years to act.
            </div>
          </div>
        </div>

        {/* Bottom copyright and status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-white">THE SHARED FUTURE PROJECT</span>
            <span>· Version 1.0 Global Working Document</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Open Source (CC BY-SA 4.0)</span>
            <span>#SharedFuture</span>
            <span className="text-[#D4A017] font-semibold">Decade of Healing &amp; Shared Prosperity</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
