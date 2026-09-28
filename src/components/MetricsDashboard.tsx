import React, { useState } from 'react';
import { PROGRESS_METRICS } from '../data/frameworkData';
import { ProgressMetric, ViewTab } from '../types';
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Filter, 
  Download,
  Info,
  ShieldAlert
} from 'lucide-react';

interface MetricsDashboardProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ onSelectTab }) => {
  const [targetYear, setTargetYear] = useState<'2025' | '2030' | '2040'>('2030');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Peace & Security', 'Prosperity & Equality', 'Planetary Health', 'Governance & Trust'];

  const filteredMetrics = selectedCategory === 'All'
    ? PROGRESS_METRICS
    : PROGRESS_METRICS.filter(m => m.category === selectedCategory);

  const downloadReport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(PROGRESS_METRICS, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `shared_future_metrics_${targetYear}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section className="py-16 bg-[#FBFBFA] text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#D4A017]/15 text-[#0A2463] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#D4A017]/30">
              <BarChart3 className="w-3.5 h-3.5 text-[#0A2463]" />
              Part 5: Measurement Dashboard
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
              Global Progress &amp; Planetary Health Ledger
            </h2>
            <p className="text-sm text-[#6C757D] font-sans mt-2 max-w-2xl">
              Quarterly verified indicators tracking whether humanity is steering away from fragmentation and toward co-elevation and ecological balance.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={downloadReport}
              className="bg-white hover:bg-gray-50 border border-gray-300 text-[#0A2463] px-3.5 py-2 rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#1E6091]" />
              Export Open Data
            </button>
          </div>
        </div>

        {/* Target Year Selector & Category Filters */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0A2463] text-white shadow-xs'
                    : 'bg-gray-100 text-[#6C757D] hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Target Year Picker */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs font-sans font-bold text-[#6C757D] mr-1">
              Target Horizon:
            </span>
            <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 border border-gray-200">
              <button
                onClick={() => setTargetYear('2025')}
                className={`px-3 py-1 rounded-lg text-xs font-sans font-bold transition-all ${
                  targetYear === '2025' ? 'bg-white text-[#0A2463] shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                2025 (Current)
              </button>
              <button
                onClick={() => setTargetYear('2030')}
                className={`px-3 py-1 rounded-lg text-xs font-sans font-bold transition-all ${
                  targetYear === '2030' ? 'bg-[#0A2463] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                2030 Target
              </button>
              <button
                onClick={() => setTargetYear('2040')}
                className={`px-3 py-1 rounded-lg text-xs font-sans font-bold transition-all ${
                  targetYear === '2040' ? 'bg-[#2D6A4F] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                2040 Target
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMetrics.map((metric) => {
            const displayTarget = targetYear === '2025' 
              ? metric.current2025 
              : targetYear === '2030' 
                ? metric.target2030 
                : metric.target2040;

            const targetVal = targetYear === '2025'
              ? metric.currentVal
              : targetYear === '2030'
                ? metric.target2030Val
                : metric.target2040Val;

            return (
              <div
                key={metric.id}
                id={`metric-card-${metric.id}`}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#1E6091] bg-blue-50 px-2 py-0.5 rounded">
                      {metric.category}
                    </span>
                    {metric.status === 'on-track' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> On Track
                      </span>
                    )}
                    {metric.status === 'needs-work' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Needs Work
                      </span>
                    )}
                    {metric.status === 'critical' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Critical
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#0A2463] leading-snug">
                    {metric.name}
                  </h3>
                  <p className="text-xs text-[#6C757D] font-sans mt-2 leading-relaxed">
                    {metric.description}
                  </p>

                  {/* Highlight Values Box */}
                  <div className="mt-5 p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                    <div className="flex items-center justify-between text-xs font-sans text-gray-500 mb-1">
                      <span>Baseline (2025)</span>
                      <span className="font-bold text-[#0A2463]">Selected Horizon ({targetYear})</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-sans font-semibold text-gray-700">
                        {metric.current2025}
                      </span>
                      <span className={`text-xl font-serif font-bold ${
                        targetYear === '2025' ? 'text-gray-900' : 'text-[#2D6A4F]'
                      }`}>
                        {displayTarget}
                      </span>
                    </div>

                    {/* Progress indicator visuals */}
                    <div className="mt-3 text-[11px] font-sans text-gray-500 flex items-center justify-between pt-2 border-t border-gray-100">
                      <span>2030: {metric.target2030}</span>
                      <span>2040: {metric.target2040}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-sans text-[#6C757D]">
                  <span className="italic truncate max-w-[200px]">Source: {metric.source}</span>
                  <span className="text-[#1E6091] font-semibold">Verified quarterly</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Progress Summary Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#0A2463] to-[#1E6091] text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-sans uppercase tracking-wider text-[#D4A017] font-bold">
              Quarterly Verification Commitment
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mt-1">
              Real Accountability, Open Data &amp; Citizen Audit
            </h3>
            <p className="text-xs sm:text-sm text-[#A8DADC] mt-1.5 max-w-2xl font-sans">
              No nation or corporation is permitted to self-report without independent academic and civic auditing. We measure what preserves life.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('actions')}
            className="bg-[#D4A017] hover:bg-[#b98a12] text-[#0A2463] px-5 py-3 rounded-xl text-xs font-sans font-bold shadow transition-all whitespace-nowrap"
          >
            Contribute to Progress Today
          </button>
        </div>

      </div>
    </section>
  );
};
