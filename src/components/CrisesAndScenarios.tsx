import React, { useState } from 'react';
import { CRISES_DATA } from '../data/frameworkData';
import { CrisisItem, ViewTab } from '../types';
import { 
  AlertTriangle, 
  Flame, 
  TrendingUp, 
  ChevronRight, 
  ArrowRight, 
  ShieldAlert, 
  Filter, 
  Compass,
  Layers
} from 'lucide-react';

interface CrisesAndScenariosProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const CrisesAndScenarios: React.FC<CrisesAndScenariosProps> = ({ onSelectTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCrisis, setSelectedCrisis] = useState<CrisisItem | null>(CRISES_DATA[0]);

  const categories = ['All', 'Geopolitical', 'Economic', 'Environmental', 'Technological', 'Social'];

  const filteredCrises = selectedCategory === 'All' 
    ? CRISES_DATA 
    : CRISES_DATA.filter(c => c.category === selectedCategory);

  return (
    <section className="py-16 bg-[#FBFBFA] text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-100 text-red-800 text-xs font-sans font-bold uppercase tracking-wider mb-3 border border-red-200">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            Part 1: The Real Problems We Face Today
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463] tracking-tight">
            10 Interconnected Crises Threatening Civilizational Collapse
          </h2>
          <p className="text-base text-[#6C757D] font-sans mt-3 leading-relaxed">
            Humanity faces an unprecedented convergence of existential risks. These problems cannot be solved within national borders or through zero-sum domination; they compound each other exponentially if unaddressed.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-gray-200 pb-4">
          <span className="text-xs font-sans font-semibold text-[#6C757D] mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Crises:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0A2463] text-white shadow-sm'
                  : 'bg-white text-[#6C757D] hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Crisis List Cards */}
          <div className="lg:col-span-6 space-y-3">
            {filteredCrises.map((crisis) => {
              const isSelected = selectedCrisis?.id === crisis.id;
              return (
                <div
                  key={crisis.id}
                  id={`crisis-card-${crisis.id}`}
                  onClick={() => setSelectedCrisis(crisis)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-[#1E6091] shadow-md ring-2 ring-[#1E6091]/20'
                      : 'bg-white hover:bg-gray-50/80 border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#0A2463] text-white flex items-center justify-center text-xs font-bold font-sans">
                        {crisis.id}
                      </span>
                      <h3 className="font-sans font-bold text-sm text-[#0A2463]">
                        {crisis.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded bg-gray-100 text-[#6C757D] border border-gray-200">
                      {crisis.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#6C757D] font-sans mt-2 line-clamp-2">
                    {crisis.status}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-sans pt-2 border-t border-gray-100">
                    <span className="font-semibold text-[#1E6091] flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-red-500" />
                      Trend: <span className="capitalize text-red-600">{crisis.trend}</span>
                    </span>
                    <span className="text-[#0A2463] font-bold bg-[#D4A017]/15 px-2 py-0.5 rounded border border-[#D4A017]/30">
                      {crisis.keyStat}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Crisis Deep Dive & Worse Scenario */}
          <div className="lg:col-span-6 sticky top-24">
            {selectedCrisis && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-lg">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#0A2463]/10 text-[#0A2463]">
                    Crisis #{selectedCrisis.id} · {selectedCrisis.category}
                  </span>
                  <span className="text-xs text-red-600 font-sans font-semibold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> Severity: High Risk
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#0A2463] mt-4 mb-2">
                  {selectedCrisis.title}
                </h3>
                <p className="text-sm font-sans text-[#2B2D42] mb-4 leading-relaxed font-medium">
                  {selectedCrisis.status}
                </p>

                <div className="bg-[#FBFBFA] border border-gray-200 rounded-xl p-4 mb-5 text-xs text-[#6C757D] leading-relaxed">
                  <strong className="text-[#0A2463] block font-sans mb-1 text-sm">Systemic Cause:</strong>
                  {selectedCrisis.description}
                </div>

                {/* Worse Scenario 2035-2050 Callout */}
                <div className="bg-red-50/80 border-l-4 border-red-600 p-4 rounded-r-xl mb-6">
                  <div className="flex items-center gap-2 text-red-900 font-sans font-bold text-xs uppercase tracking-wide">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    Predicted Worse Scenario (If Unsolved by 2035–2050)
                  </div>
                  <p className="text-sm text-red-900 font-sans mt-1.5 font-medium leading-normal">
                    {selectedCrisis.worseScenario2050}
                  </p>
                </div>

                <div className="bg-[#0A2463] text-white p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-sans text-[#A8DADC] uppercase tracking-wider block font-bold">
                      Our Structural Proposal
                    </span>
                    <span className="font-serif font-bold text-base text-[#D4A017]">
                      The Shared Future Framework Solution
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectTab('solutions')}
                    className="bg-[#D4A017] hover:bg-[#b98a12] text-[#0A2463] px-4 py-2 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 whitespace-nowrap shadow transition-all active:scale-95"
                  >
                    Explore Solutions <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Worse Scenarios 8-Point Overview Matrix */}
            <div className="mt-6 bg-[#051538] text-white rounded-2xl p-6 border border-white/10 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif font-bold text-base text-[#A8DADC] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D4A017]" />
                  The 8 Predicted Worse Scenarios (2035–2050)
                </h4>
                <span className="text-[10px] font-sans font-bold bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                  Critical Warning
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/80 font-sans">
                <li className="flex items-start gap-2 bg-white/5 p-2 rounded">
                  <span className="text-red-400 font-bold">1.</span>
                  <span>Hot wars between major powers (nuclear risk)</span>
                </li>
                <li className="flex items-start gap-2 bg-white/5 p-2 rounded">
                  <span className="text-red-400 font-bold">2.</span>
                  <span>Climate-driven state collapse in vulnerable tropics</span>
                </li>
                <li className="flex items-start gap-2 bg-white/5 p-2 rounded">
                  <span className="text-red-400 font-bold">3.</span>
                  <span>Autonomous AI conflict loops without humans</span>
                </li>
                <li className="flex items-start gap-2 bg-white/5 p-2 rounded">
                  <span className="text-red-400 font-bold">4.</span>
                  <span>Global economic fragmentation into hostile blocs</span>
                </li>
                <li className="flex items-start gap-2 bg-white/5 p-2 rounded">
                  <span className="text-red-400 font-bold">5.</span>
                  <span>Mass famine and transboundary water wars</span>
                </li>
                <li className="flex items-start gap-2 bg-white/5 p-2 rounded">
                  <span className="text-red-400 font-bold">6.</span>
                  <span>Pandemic pathogen 10x worse than COVID-19</span>
                </li>
                <li className="flex items-start gap-2 bg-white/5 p-2 rounded">
                  <span className="text-red-400 font-bold">7.</span>
                  <span>Refugee flows surging past 500 Million people</span>
                </li>
                <li className="flex items-start gap-2 bg-white/5 p-2 rounded">
                  <span className="text-red-400 font-bold">8.</span>
                  <span>Complete collapse of international bodies (UN, WHO)</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
