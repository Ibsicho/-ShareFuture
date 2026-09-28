import React, { useState } from 'react';
import { SOLUTIONS_DATA } from '../data/frameworkData';
import { SolutionItem, ViewTab } from '../types';
import { 
  Lightbulb, 
  Search, 
  Filter, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Calendar, 
  Users, 
  Target,
  ExternalLink,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface TenSolutionsExplorerProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const TenSolutionsExplorer: React.FC<TenSolutionsExplorerProps> = ({ onSelectTab }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalSolution, setActiveModalSolution] = useState<SolutionItem | null>(null);

  const categories = [
    'All',
    'Political & Diplomatic',
    'Economic',
    'Climate & Environment',
    'Technology & AI',
    'Social & Cultural'
  ];

  const filteredSolutions = SOLUTIONS_DATA.filter(sol => {
    const matchesCategory = activeCategory === 'All' || sol.category === activeCategory;
    const matchesSearch = 
      sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.kpi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-[#F5F6F8] text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#2D6A4F]/20">
              <Lightbulb className="w-3.5 h-3.5 text-[#2D6A4F]" />
              Part 3: Solutions &amp; Proposals
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
              10 Structural Solutions for Planetary Prosperity
            </h2>
            <p className="text-sm text-[#6C757D] font-sans mt-2 max-w-2xl">
              Concrete institutional blueprints designed to replace destructive rivalry with co-elevating systems across diplomacy, economics, climate, technology, and culture.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('un-resolution')}
            className="bg-[#0A2463] hover:bg-[#1E6091] text-white px-4 py-2.5 rounded-xl text-xs font-sans font-bold flex items-center gap-2 shadow-sm transition-all whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#D4A017]" />
            View Draft UN Resolution
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#0A2463] text-white shadow-sm'
                    : 'bg-white text-[#6C757D] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search solutions or KPIs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs font-sans bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-[#1E6091]"
            />
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSolutions.map((sol) => (
            <div
              key={sol.id}
              id={`solution-card-${sol.number}`}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#1E6091]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-[#0A2463] text-white font-serif font-bold text-sm flex items-center justify-center shadow-inner">
                    {sol.number}
                  </span>
                  <span className="text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1E6091] border border-blue-100">
                    {sol.tag}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#0A2463] group-hover:text-[#1E6091] transition-colors leading-snug">
                  {sol.title}
                </h3>

                <p className="text-xs text-[#6C757D] font-sans mt-2.5 line-clamp-3 leading-relaxed">
                  {sol.summary}
                </p>

                {/* Key Metric Badge */}
                <div className="mt-4 p-2.5 rounded-lg bg-[#FBFBFA] border border-gray-100">
                  <div className="text-[10px] font-sans font-bold uppercase tracking-wide text-[#2D6A4F] flex items-center gap-1">
                    <Target className="w-3 h-3" /> Core KPI Target:
                  </div>
                  <div className="text-xs font-sans font-semibold text-[#0A2463] mt-0.5">
                    {sol.kpi}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-sans text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#D4A017]" /> {sol.when}
                </span>
                <button
                  onClick={() => setActiveModalSolution(sol)}
                  className="text-xs font-sans font-bold text-[#1E6091] hover:text-[#0A2463] flex items-center gap-1 group-hover:underline"
                >
                  Full Proposal <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Solution Deep-Dive */}
        {activeModalSolution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-100">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#0A2463] text-white font-serif font-bold text-base flex items-center justify-center">
                    {activeModalSolution.number}
                  </span>
                  <div>
                    <span className="text-xs font-sans font-bold uppercase text-[#1E6091]">
                      {activeModalSolution.category}
                    </span>
                    <h3 className="font-serif font-bold text-xl text-[#0A2463]">
                      {activeModalSolution.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModalSolution(null)}
                  className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="py-5 space-y-4 text-sm font-sans">
                <div>
                  <h4 className="font-bold text-[#0A2463] text-xs uppercase tracking-wide mb-1">
                    What Is It?
                  </h4>
                  <p className="text-[#2B2D42] text-xs leading-relaxed">
                    {activeModalSolution.what}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#0A2463] text-xs uppercase tracking-wide mb-1">
                    Why Is It Crucial?
                  </h4>
                  <p className="text-[#2B2D42] text-xs leading-relaxed">
                    {activeModalSolution.why}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#0A2463] text-xs uppercase tracking-wide mb-1">
                    Implementation Architecture:
                  </h4>
                  <p className="text-[#2B2D42] text-xs leading-relaxed">
                    {activeModalSolution.how}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#FBFBFA] p-3 rounded-lg border border-gray-200">
                    <span className="text-[11px] font-bold text-[#2D6A4F] uppercase block mb-1">
                      Lead Actors &amp; Sponsors:
                    </span>
                    <p className="text-xs text-[#2B2D42] font-medium">
                      {activeModalSolution.actors}
                    </p>
                  </div>
                  <div className="bg-[#FBFBFA] p-3 rounded-lg border border-gray-200">
                    <span className="text-[11px] font-bold text-[#D4A017] uppercase block mb-1">
                      Resource &amp; Budget Strategy:
                    </span>
                    <p className="text-xs text-[#2B2D42] font-medium">
                      {activeModalSolution.investmentNeeded}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
                  <span className="text-[11px] font-bold text-[#0A2463] uppercase block mb-1">
                    Binding Metric &amp; Target KPI:
                  </span>
                  <p className="text-xs font-semibold text-[#1E6091]">
                    {activeModalSolution.kpi}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveModalSolution(null);
                    onSelectTab('roadmap');
                  }}
                  className="text-xs font-bold text-[#1E6091] hover:underline flex items-center gap-1"
                >
                  View in 50-Year Roadmap <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setActiveModalSolution(null)}
                  className="bg-[#0A2463] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#1E6091] transition-colors"
                >
                  Close Proposal
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
