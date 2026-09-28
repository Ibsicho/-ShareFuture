import React, { useState } from 'react';
import { ROADMAP_PHASES } from '../data/frameworkData';
import { RoadmapPhase, ViewTab } from '../types';
import { 
  Milestone, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ArrowRight, 
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';

interface ActionRoadmapProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const ActionRoadmap: React.FC<ActionRoadmapProps> = ({ onSelectTab }) => {
  const [activePhaseId, setActivePhaseId] = useState<string>('phase-1');

  const selectedPhase = ROADMAP_PHASES.find(p => p.id === activePhaseId) || ROADMAP_PHASES[0];

  return (
    <section className="py-16 bg-white text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1E6091]/10 text-[#1E6091] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#1E6091]/20">
            <Milestone className="w-3.5 h-3.5 text-[#1E6091]" />
            Part 4: Action Roadmap with Timelines &amp; KPIs
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
            The 4-Phase Transition to 2075
          </h2>
          <p className="text-sm text-[#6C757D] font-sans mt-2 leading-relaxed">
            A concrete multi-decade operational trajectory bridging emergency mediation today with institutional restructuring, flourishing prosperity, and civilizational transcendence.
          </p>
        </div>

        {/* Phase Stepper Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {ROADMAP_PHASES.map((phase) => {
            const isActive = phase.id === activePhaseId;
            return (
              <button
                key={phase.id}
                id={`roadmap-phase-tab-${phase.phaseNumber}`}
                onClick={() => setActivePhaseId(phase.id)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  isActive
                    ? 'bg-[#0A2463] text-white border-[#0A2463] shadow-md ring-2 ring-[#D4A017]/50'
                    : 'bg-[#FBFBFA] hover:bg-gray-100 text-[#2B2D42] border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isActive ? 'bg-white/15 text-[#D4A017]' : 'bg-gray-200 text-gray-700'
                  }`}>
                    Phase {phase.phaseNumber}
                  </span>
                  <span className={`text-xs font-sans font-bold ${isActive ? 'text-[#A8DADC]' : 'text-[#1E6091]'}`}>
                    {phase.years}
                  </span>
                </div>

                <div className={`font-serif font-bold text-lg mb-1 ${isActive ? 'text-white' : 'text-[#0A2463]'}`}>
                  {phase.name}
                </div>

                <div className={`text-xs font-sans line-clamp-1 ${isActive ? 'text-white/80' : 'text-[#6C757D]'}`}>
                  {phase.goal}
                </div>

                {/* Status indicator bar */}
                <div className="mt-3 w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${isActive ? 'bg-[#D4A017]' : 'bg-[#2D6A4F]'}`}
                    style={{ width: `${phase.progressPercent}%` }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Details Display */}
        <div className="bg-[#FBFBFA] border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-sans font-bold uppercase bg-[#D4A017]/20 text-[#0A2463] px-2.5 py-0.5 rounded border border-[#D4A017]/40">
                  Phase {selectedPhase.phaseNumber} · {selectedPhase.years}
                </span>
                <span className="text-xs text-gray-500 font-sans">
                  Target Window: {selectedPhase.years}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A2463] mt-2">
                Phase {selectedPhase.phaseNumber}: {selectedPhase.name} — {selectedPhase.goal}
              </h3>
              <p className="text-sm font-sans text-[#6C757D] mt-1 italic">
                &quot;{selectedPhase.tagline}&quot;
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] font-sans text-gray-500 uppercase block font-bold">Preparation &amp; Readiness</span>
                <span className="text-lg font-bold font-serif text-[#2D6A4F]">{selectedPhase.progressPercent}% Mobilized</span>
              </div>
            </div>
          </div>

          {/* Actions List within Phase */}
          <div className="mt-8">
            <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#0A2463] mb-4 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
              Strategic Objectives, Actors &amp; Verification KPIs
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPhase.actions.map((act, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-[#1E6091] transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h5 className="font-serif font-bold text-base text-[#0A2463]">
                      {act.title}
                    </h5>
                    <span className="text-[10px] font-sans font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      Obj {idx + 1}
                    </span>
                  </div>

                  <p className="text-xs text-[#2B2D42] font-sans leading-relaxed mb-4">
                    {act.details}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-gray-100 text-[11px] font-sans">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#6C757D]">Primary Lead:</span>
                      <span className="font-medium text-[#0A2463] text-right truncate max-w-[200px]">
                        {act.actor}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-[#95D5B2]/15 text-[#2D6A4F] font-semibold border border-[#95D5B2]/30">
                      🎯 Verification KPI: {act.kpi}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase Footer banner */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#6C757D] font-sans">
              Metrics monitored quarterly on the open verification ledger.
            </span>
            <button
              onClick={() => onSelectTab('dashboard')}
              className="bg-[#1E6091] hover:bg-[#0A2463] text-white px-4 py-2 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              View Global Progress Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
