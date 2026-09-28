import React, { useState } from 'react';
import { 
  ExecutionModuleId, 
  ViewTab,
  ExecutionInnovationModule,
  EarlyWarningHotspot
} from '../types';
import {
  EXECUTION_INNOVATION_MODULES,
  TIMELINE_PACE_COMPARISONS,
  EARLY_WARNING_HOTSPOTS,
  TECH_COMMONS_PROTOTYPES,
  CIVIC_INNOVATION_GRANTS,
  RAPID_DEPLOYMENT_PODS_FLEET
} from '../data/executionInnovationData';
import {
  Zap,
  Cpu,
  DollarSign,
  Scale,
  Lightbulb,
  Users,
  Radio,
  Navigation,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Download,
  Filter,
  Layers,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  Target,
  RefreshCw,
  Send
} from 'lucide-react';

interface ExecutionAndInnovationProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const ExecutionAndInnovation: React.FC<ExecutionAndInnovationProps> = ({ onSelectTab }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<ExecutionModuleId | 'all'>('all');
  const [timelinePaceMode, setTimelinePaceMode] = useState<'accelerated' | 'comparison' | 'traditional'>('accelerated');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Simulator States
  const [activeHotspotAlert, setActiveHotspotAlert] = useState<EarlyWarningHotspot | null>(null);
  const [dispatchedHotspots, setDispatchedHotspots] = useState<string[]>([]);
  const [toastNotification, setToastNotification] = useState<string | null>(null);
  
  // Interactive Grant Simulator
  const [grantApplicantName, setGrantApplicantName] = useState('');
  const [grantProjectTitle, setGrantProjectTitle] = useState('');
  const [grantRegion, setGrantRegion] = useState('Africa');
  const [grantSubmitted, setGrantSubmitted] = useState(false);

  // Active module data if specific module selected
  const activeModule = selectedModuleId !== 'all' 
    ? EXECUTION_INNOVATION_MODULES.find(m => m.id === selectedModuleId) 
    : null;

  const showNotification = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => {
      setToastNotification(null);
    }, 4500);
  };

  const handleDispatchHotspot = (hotspot: EarlyWarningHotspot) => {
    if (!dispatchedHotspots.includes(hotspot.id)) {
      setDispatchedHotspots(prev => [...prev, hotspot.id]);
    }
    showNotification(`⚡ Rapid De-escalation Pod & Envoys dispatched to ${hotspot.region}! Estimated arrival in ${hotspot.deploymentTimeHours} hours.`);
  };

  const handleGrantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantApplicantName || !grantProjectTitle) return;
    setGrantSubmitted(true);
    showNotification(`✅ Grant proposal "${grantProjectTitle}" registered! Accelerated 5-Day Peer Review initiated.`);
  };

  const getModuleIcon = (id: ExecutionModuleId, className = "w-5 h-5") => {
    switch (id) {
      case 'accelerated-engine': return <Zap className={className} />;
      case 'frontier-tech-commons': return <Cpu className={className} />;
      case 'catalytic-finance': return <DollarSign className={className} />;
      case 'agile-policy-sandboxes': return <Scale className={className} />;
      case 'grassroots-incubator': return <Lightbulb className={className} />;
      case 'collaborative-coalitions': return <Users className={className} />;
      case 'early-warning-radar': return <Radio className={className} />;
      case 'rapid-deployment-pods': return <Navigation className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  // Filtered shortened activities for current view
  const allActivities = EXECUTION_INNOVATION_MODULES.flatMap(m => 
    m.shortenedActivityPlan.map(act => ({ ...act, moduleTitle: m.title, moduleId: m.id }))
  );

  const displayedActivities = allActivities.filter(act => {
    if (selectedModuleId !== 'all' && act.moduleId !== selectedModuleId) return false;
    if (phaseFilter !== 'all') {
      if (phaseFilter === 'sprint-30' && act.phaseId !== 'sprint-30') return false;
      if (phaseFilter === 'sprint-60' && act.phaseId !== 'sprint-60') return false;
      if (phaseFilter === 'sprint-90' && act.phaseId !== 'sprint-90') return false;
      if (phaseFilter === 'horizon-6mo' && act.phaseId !== 'horizon-6mo') return false;
      if (phaseFilter === 'horizon-12mo' && act.phaseId !== 'horizon-12mo') return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        act.title.toLowerCase().includes(q) ||
        act.deliverable.toLowerCase().includes(q) ||
        act.leadTaskforce.toLowerCase().includes(q) ||
        act.accelerationTechnique.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FBFBFA] pb-24">
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A2463] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D4A017] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-5 h-5 text-[#D4A017] animate-spin" />
          <span className="text-xs font-sans font-semibold">{toastNotification}</span>
          <button 
            onClick={() => setToastNotification(null)}
            className="text-white/60 hover:text-white ml-2 text-sm font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Hero Banner */}
      <section className="bg-gradient-to-br from-[#051538] via-[#0A2463] to-[#1E6091] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#1E6091]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#2D6A4F]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/40 text-amber-300 text-xs font-sans font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-[#D4A017]" />
              Accelerated Operational Engine · 8 Fast-Track Modules
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-white/70 font-sans hidden sm:inline">Pace Mode:</span>
              <div className="bg-white/10 p-1 rounded-xl flex items-center gap-1 border border-white/15">
                <button
                  onClick={() => setTimelinePaceMode('accelerated')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    timelinePaceMode === 'accelerated'
                      ? 'bg-[#D4A017] text-[#0A2463] shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  ⚡ Fast-Track (75% Faster)
                </button>
                <button
                  onClick={() => setTimelinePaceMode('comparison')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    timelinePaceMode === 'comparison'
                      ? 'bg-white text-[#0A2463] shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  ⚖️ Pace Comparison
                </button>
                <button
                  onClick={() => setTimelinePaceMode('traditional')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    timelinePaceMode === 'traditional'
                      ? 'bg-red-500/80 text-white shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  ⏳ Original Doc Baseline
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-4xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              EXECUTION &amp; INNOVATION
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-sans leading-relaxed">
              Accelerating the Global Cooperation &amp; Shared Prosperity framework. While the original linked charter outlined a multi-decade horizon, this execution suite compresses timelines through <strong className="text-amber-300 font-semibold">90-day agile sprints, 72-hour emergency liquidity, rapid policy sandboxes, satellite-verified truces, and mobile deployment pods</strong>.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-[11px] font-sans uppercase font-bold text-amber-300 tracking-wider">
                Average Timeline Shortening
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                78% Faster
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                From 10 years down to 90-day sprint cycles
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-[11px] font-sans uppercase font-bold text-emerald-300 tracking-wider">
                Field Deployment Speed
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                24–48 Hours
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Rapid response pods vs 18 months diplomatic lag
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-[11px] font-sans uppercase font-bold text-cyan-300 tracking-wider">
                New Core Modules
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                8 Engines
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Integrated with 10 Crises, 10 Solutions &amp; Circles
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-[11px] font-sans uppercase font-bold text-amber-300 tracking-wider">
                Rapid Capital Release
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                72h Liquidity
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Instant post-ceasefire community stabilization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Selector for the 8 Modules */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0A2463]">
                The 8 Execution &amp; Innovation Engines
              </h2>
              <p className="text-xs text-[#6C757D] font-sans mt-0.5">
                Select an operational engine below to inspect its shortened activity plan, high-speed KPIs, and field toolkits.
              </p>
            </div>

            <button
              onClick={() => setSelectedModuleId('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto ${
                selectedModuleId === 'all'
                  ? 'bg-[#0A2463] text-white shadow-xs'
                  : 'bg-gray-100 text-[#0A2463] hover:bg-gray-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              All 8 Modules Master View
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mt-4">
            {EXECUTION_INNOVATION_MODULES.map((mod) => {
              const isSelected = selectedModuleId === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`p-3 rounded-2xl text-left transition-all flex flex-col justify-between border relative group ${
                    isSelected
                      ? 'bg-[#0A2463] text-white border-[#0A2463] shadow-md ring-2 ring-[#D4A017]'
                      : 'bg-[#FBFBFA] hover:bg-white text-gray-800 border-gray-200 hover:border-[#1E6091]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-[#D4A017] text-[#0A2463]' : 'bg-gray-100 text-[#0A2463] group-hover:bg-blue-50'
                    }`}>
                      {mod.moduleNumber}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                    }`}>
                      -{mod.timeReductionPercent}%
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-xs font-bold font-serif line-clamp-2 leading-tight ${
                      isSelected ? 'text-white' : 'text-[#0A2463]'
                    }`}>
                      {mod.title}
                    </h3>
                    <p className={`text-[10px] mt-1 line-clamp-1 font-sans ${
                      isSelected ? 'text-slate-300' : 'text-gray-500'
                    }`}>
                      {mod.category}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* TIMELINE COMPARISON BANNER (When comparison or traditional mode is on) */}
        {timelinePaceMode === 'comparison' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-200 mb-8 animate-in fade-in">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                  Pace Acceleration Matrix
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0A2463] mt-2">
                  Document Original Timelines vs. Accelerated Fast-Track Plan
                </h3>
                <p className="text-xs text-gray-600 font-sans mt-1">
                  How every operational dimension has been systematically shortened to prevent bureaucratic delays and save lives.
                </p>
              </div>
              <button
                onClick={() => setTimelinePaceMode('accelerated')}
                className="text-xs font-bold text-[#1E6091] hover:underline flex items-center gap-1"
              >
                Hide Comparison <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-gray-700">
                    <th className="py-3 px-4 font-bold">Operational Dimension</th>
                    <th className="py-3 px-4 font-bold text-red-700">Original Document Pace</th>
                    <th className="py-3 px-4 font-bold text-emerald-800">Accelerated Execution Pace</th>
                    <th className="py-3 px-4 font-bold text-amber-700">Velocity Factor</th>
                    <th className="py-3 px-4 font-bold">Acceleration Mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {TIMELINE_PACE_COMPARISONS.map((comp, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/30">
                      <td className="py-3 px-4 font-semibold text-[#0A2463]">{comp.dimension}</td>
                      <td className="py-3 px-4 text-red-600 line-through decoration-red-300 font-medium">
                        {comp.originalDocumentPace}
                      </td>
                      <td className="py-3 px-4 text-emerald-700 font-bold bg-emerald-50/50 rounded-lg">
                        {comp.acceleratedExecutionPace}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          {comp.accelerationFactor}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-[11px] leading-relaxed">
                        {comp.mechanism}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DETAILED ACTIVE MODULE PROFILE (If a specific module is selected) */}
        {activeModule && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 mb-8 animate-in fade-in">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-gray-200">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-xl bg-[#0A2463] text-[#D4A017] flex items-center justify-center font-bold text-sm">
                    {activeModule.moduleNumber}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E6091] bg-blue-50 px-2.5 py-1 rounded-md">
                    {activeModule.category}
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                    {activeModule.timeReductionPercent}% Time Reduction
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A2463]">
                  Module {activeModule.moduleNumber}: {activeModule.title}
                </h2>
                <p className="text-xs sm:text-sm font-sans font-medium text-amber-800 mt-1 italic">
                  &quot;{activeModule.tagline}&quot;
                </p>

                <p className="text-xs sm:text-sm text-gray-700 font-sans mt-3 leading-relaxed">
                  {activeModule.executiveSummary}
                </p>
              </div>

              {/* Timeframe Card */}
              <div className="bg-[#FBFBFA] p-5 rounded-2xl border border-gray-200 min-w-[280px]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#D4A017]" />
                  Timeframe Compression
                </div>
                <div className="space-y-2 text-xs font-sans">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Document Baseline:</span>
                    <span className="text-gray-600 line-through font-medium">{activeModule.originalDocumentTimeframe}</span>
                  </div>
                  <div className="pt-1 border-t border-gray-200">
                    <span className="text-emerald-700 block text-[10px] uppercase font-bold">Accelerated Plan:</span>
                    <span className="text-emerald-800 font-bold">{activeModule.shortenedTimeframe}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <span className="text-[10px] text-gray-500 font-bold block mb-1">Cooperation Impact:</span>
                  <p className="text-[11px] text-[#0A2463] font-medium leading-tight">
                    {activeModule.cooperationImpact}
                  </p>
                </div>
              </div>
            </div>

            {/* Core Innovations & High-Speed KPIs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-serif font-bold text-base text-[#0A2463] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4A017]" />
                  Core Structural Innovations
                </h4>
                <ul className="space-y-2.5">
                  {activeModule.coreInnovations.map((inn, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700 font-sans leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">
                        ✓
                      </span>
                      <span>{inn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-[#0A2463] mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  High-Speed KPI Benchmarks
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModule.highSpeedKPIs.map((kpi, i) => (
                    <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="text-[10px] font-bold text-gray-500 block">{kpi.label}</span>
                      <div className="text-lg font-bold text-[#0A2463] font-serif mt-0.5">{kpi.value}</div>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1 pt-1 border-t border-gray-200/60">
                        <span>Baseline: {kpi.baselineDocValue}</span>
                        <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          {kpi.velocityGain}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Operational Toolkits:</span>
                  {activeModule.operationalToolkits.map((tk, idx) => (
                    <span key={idx} className="text-xs bg-blue-50 text-[#1E6091] font-semibold px-2.5 py-1 rounded-lg border border-blue-100">
                      {tk.name} ({tk.type})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE ENGINE SPECIFIC TOOLS (RADAR, TECH COMMONS, CIVIC GRANTS, PODS) */}
        {/* If All or Module 7 (Early Warning Radar) */}
        {(selectedModuleId === 'all' || selectedModuleId === 'early-warning-radar') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-red-600 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    Live Conflict Risk Radar · 24/7 Satellite &amp; Telemetry Feed
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A2463] mt-1">
                  Module 7: Real-Time Early Warning Radar &amp; De-Escalation Engine
                </h3>
                <p className="text-xs text-gray-600 font-sans mt-0.5">
                  Shortens warning lead-time from months to 24–48 hours, enabling proactive preventative mediation.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500">
                  {EARLY_WARNING_HOTSPOTS.length} Active Hotspots Tracked
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {EARLY_WARNING_HOTSPOTS.map((hotspot) => {
                const isDispatched = dispatchedHotspots.includes(hotspot.id);
                return (
                  <div 
                    key={hotspot.id} 
                    className="p-4 rounded-2xl border border-gray-200 bg-[#FBFBFA] hover:bg-white hover:border-[#0A2463] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          hotspot.escalationRiskScore >= 80 
                            ? 'bg-red-100 text-red-900 border border-red-200' 
                            : hotspot.escalationRiskScore >= 70
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-yellow-100 text-yellow-900 border border-yellow-200'
                        }`}>
                          Risk Index: {hotspot.escalationRiskScore}/100
                        </span>

                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {hotspot.threatVector}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-base text-[#0A2463]">
                        {hotspot.region}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-sans font-medium">
                        {hotspot.country}
                      </p>

                      <div className="mt-3 p-2.5 rounded-xl bg-gray-50 border border-gray-200/80">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                          Detected Telemetry Signal:
                        </span>
                        <p className="text-xs text-gray-700 font-sans leading-tight">
                          {hotspot.earlyWarningSignal}
                        </p>
                      </div>

                      <div className="mt-2.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">
                          Accelerated De-escalation Protocol:
                        </span>
                        <p className="text-xs text-[#0A2463] font-sans leading-tight font-medium">
                          {hotspot.acceleratedDeescalationAction}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 font-sans">
                        Est. Deployment: <strong className="text-gray-700">{hotspot.deploymentTimeHours}h</strong>
                      </span>

                      <button
                        onClick={() => handleDispatchHotspot(hotspot)}
                        disabled={isDispatched}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          isDispatched
                            ? 'bg-emerald-600 text-white cursor-default'
                            : 'bg-[#0A2463] hover:bg-[#1E6091] text-white shadow-xs'
                        }`}
                      >
                        {isDispatched ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" /> Deploy Envoys
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* If All or Module 2 (Frontier Tech Commons) */}
        {(selectedModuleId === 'all' || selectedModuleId === 'frontier-tech-commons') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#1E6091]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E6091] bg-blue-50 px-2 py-0.5 rounded">
                    Open Public Goods &amp; Technological Commons
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A2463] mt-1">
                  Module 2: Frontier Tech &amp; Open-Source Commons Prototypes
                </h3>
                <p className="text-xs text-gray-600 font-sans mt-0.5">
                  Decentralized cryptographic tools, open-source satellite verification, and zero-knowledge voting protocols.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TECH_COMMONS_PROTOTYPES.map((proto) => (
                <div key={proto.id} className="p-5 rounded-2xl border border-gray-200 bg-[#FBFBFA] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-[#0A2463] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                        {proto.domain}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        {proto.readinessLevel}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#0A2463]">
                      {proto.name}
                    </h4>

                    <p className="text-xs text-gray-700 font-sans mt-2 leading-relaxed">
                      {proto.description}
                    </p>

                    <div className="mt-3 p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5 font-mono">
                        Architecture Pipeline:
                      </span>
                      <code className="text-[11px] text-gray-800 font-mono block break-words">
                        {proto.technicalArchitecture}
                      </code>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-gray-500 font-medium">
                      Fast-Track Deployment: <strong className="text-emerald-700">{proto.shortenedDeploymentWindow}</strong>
                    </span>
                    <button 
                      onClick={() => showNotification(`📋 ${proto.name} code repository and architecture specs copied to clipboard.`)}
                      className="text-xs font-bold text-[#1E6091] hover:underline flex items-center gap-1"
                    >
                      Inspect Blueprint <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If All or Module 5 (Grassroots Incubator & Grants) */}
        {(selectedModuleId === 'all' || selectedModuleId === 'grassroots-incubator') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Youth Bridge-Builders &amp; Civic Hackathons
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A2463] mt-1">
                  Module 5: Grassroots Innovation Incubator &amp; 7-Day Micro-Grants
                </h3>
                <p className="text-xs text-gray-600 font-sans mt-0.5">
                  Bypassing multi-year grant bureaucracies with 48-hour hackathons and 7-day mobile money funding.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Grant Showcase List (2 cols) */}
              <div className="lg:col-span-2 space-y-3">
                <h4 className="font-serif font-bold text-sm text-[#0A2463] mb-2">
                  Active Rapid-Disbursed Civic Grants
                </h4>
                {CIVIC_INNOVATION_GRANTS.map((grant) => (
                  <div key={grant.id} className="p-4 rounded-2xl border border-gray-200 bg-[#FBFBFA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="max-w-md">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {grant.region}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          grant.status === 'funded' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {grant.status === 'funded' ? '✓ Funded in ' + grant.turnaroundTimeDays + ' days' : 'Rapid Review'}
                        </span>
                      </div>
                      <h5 className="font-serif font-bold text-sm text-[#0A2463]">
                        {grant.title}
                      </h5>
                      <p className="text-[11px] text-gray-600 font-sans mt-0.5">
                        Applicant: <strong className="text-gray-800">{grant.applicant}</strong> · {grant.focusArea}
                      </p>
                      <p className="text-[11px] text-emerald-800 font-sans font-medium mt-1">
                        Target: {grant.shortenedMilestoneGoal}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs text-gray-400 block text-[10px] uppercase font-bold">Grant Amount</span>
                      <span className="text-base font-bold font-serif text-[#0A2463]">{grant.requestedAmount}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Application Simulator (1 col) */}
              <div className="bg-gradient-to-br from-blue-50/50 to-amber-50/30 p-5 rounded-2xl border border-blue-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0A2463] mb-1 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#D4A017]" />
                    Fast-Track Micro-Grant Simulator
                  </h4>
                  <p className="text-[11px] text-gray-600 font-sans mb-3">
                    Submit an expedited community bridge-building proposal for review within 5 business days.
                  </p>

                  {grantSubmitted ? (
                    <div className="bg-emerald-100/70 border border-emerald-300 rounded-xl p-4 text-center my-4 animate-in fade-in">
                      <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto mb-1" />
                      <h5 className="font-serif font-bold text-sm text-emerald-900">Application Lodged!</h5>
                      <p className="text-[11px] text-emerald-800 mt-1">
                        Peer jury assigned. Estimated review decision in 96 hours.
                      </p>
                      <button
                        onClick={() => {
                          setGrantSubmitted(false);
                          setGrantProjectTitle('');
                          setGrantApplicantName('');
                        }}
                        className="mt-3 text-xs font-bold text-emerald-900 underline"
                      >
                        Submit another proposal
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleGrantSubmit} className="space-y-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-gray-600 uppercase block mb-0.5">
                          Project or Circle Title
                        </label>
                        <input
                          type="text"
                          required
                          value={grantProjectTitle}
                          onChange={(e) => setGrantProjectTitle(e.target.value)}
                          placeholder="e.g. Cross-Border Youth River Cleanup"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#0A2463]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-600 uppercase block mb-0.5">
                          Applicant / Organization
                        </label>
                        <input
                          type="text"
                          required
                          value={grantApplicantName}
                          onChange={(e) => setGrantApplicantName(e.target.value)}
                          placeholder="e.g. Nairobi Youth Peace Guild"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#0A2463]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-gray-600 uppercase block mb-0.5">
                            Region
                          </label>
                          <select
                            value={grantRegion}
                            onChange={(e) => setGrantRegion(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-300 bg-white"
                          >
                            <option>Africa</option>
                            <option>Middle East</option>
                            <option>Latin America</option>
                            <option>Asia &amp; Pacific</option>
                            <option>Europe</option>
                            <option>North America</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-600 uppercase block mb-0.5">
                            Funding Tier
                          </label>
                          <select className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-300 bg-white">
                            <option>$2,500 (Seed)</option>
                            <option>$5,000 (Sprint)</option>
                            <option>$10,000 (Scale)</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 mt-2"
                      >
                        <Zap className="w-3.5 h-3.5 text-[#D4A017]" />
                        Submit for 5-Day Review
                      </button>
                    </form>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-blue-200/50 text-[10px] text-gray-500 text-center">
                  Protected by the Radical Transparency Ledger · Zero fee overhead
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If All or Module 8 (Rapid Deployment Pods) */}
        {(selectedModuleId === 'all' || selectedModuleId === 'rapid-deployment-pods') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Field Readiness &amp; Humanitarian Sanctuaries
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A2463] mt-1">
                  Module 8: Scalable Impact Hubs &amp; Rapid Deployment Pods
                </h3>
                <p className="text-xs text-gray-600 font-sans mt-0.5">
                  Modular, solar-powered, satellite-connected mediation shelters deployed in under 24–48 hours to acute border flashpoints.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {RAPID_DEPLOYMENT_PODS_FLEET.map((pod) => (
                <div key={pod.id} className="p-4 rounded-2xl border border-gray-200 bg-[#FBFBFA] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        pod.readinessStatus.includes('Standing By')
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {pod.readinessStatus}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 font-mono">
                        {pod.deploymentWindowHours}h Window
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#0A2463]">
                      {pod.name}
                    </h4>

                    <span className="text-[11px] font-sans font-semibold text-[#1E6091] block mt-0.5">
                      {pod.specialization}
                    </span>

                    <p className="text-xs text-gray-600 font-sans mt-2">
                      Station: <strong className="text-gray-800">{pod.currentStation}</strong>
                    </p>

                    <div className="mt-3 p-2 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                        Equipment Profile:
                      </span>
                      <p className="text-[11px] text-gray-700 font-sans leading-tight">
                        {pod.equipmentProfile}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => showNotification(`🚁 ${pod.name} logistics flight manifest generated for priority standby.`)}
                      className="w-full py-1.5 bg-white hover:bg-gray-50 text-[#0A2463] border border-gray-200 font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1"
                    >
                      <Navigation className="w-3 h-3 text-emerald-700" /> Inspect Manifest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SHORTENED ACTIVITY PLAN - INTERACTIVE MATRIX */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Shortened Activities Plan · High-Velocity Sprint Deliverables
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0A2463] mt-1">
                Accelerated Milestone Matrix &amp; Accountability Gates
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-0.5">
                Each activity replaces prolonged multi-year diplomatic stagnation with verifiable 30-day, 60-day, and 90-day execution milestones.
              </p>
            </div>

            {/* Sprint Filters & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A2463] w-40 sm:w-48"
                />
              </div>

              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                {[
                  { id: 'all', label: 'All Sprints' },
                  { id: 'sprint-30', label: 'Days 1–30' },
                  { id: 'sprint-60', label: 'Days 31–60' },
                  { id: 'sprint-90', label: 'Days 61–90' },
                  { id: 'horizon-6mo', label: 'Months 3–6' },
                  { id: 'horizon-12mo', label: 'Months 6–12' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setPhaseFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      phaseFilter === tab.id
                        ? 'bg-white text-[#0A2463] shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Activities Cards Grid */}
          <div className="mt-6 space-y-3.5">
            {displayedActivities.length === 0 ? (
              <div className="p-12 text-center text-gray-500 font-sans">
                <Filter className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-semibold">No activities match the current filter.</p>
                <button
                  onClick={() => { setPhaseFilter('all'); setSearchQuery(''); }}
                  className="mt-2 text-xs font-bold text-[#1E6091] underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              displayedActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-5 rounded-2xl border border-gray-200 bg-[#FBFBFA] hover:bg-white hover:border-[#1E6091] transition-all shadow-2xs hover:shadow-xs group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        {act.timingWindow} ({act.phaseTitle})
                      </span>

                      <span className="text-[10px] font-bold text-gray-400 line-through bg-gray-100 px-2 py-0.5 rounded">
                        Original: {act.originalDocTiming}
                      </span>

                      <span className="text-[10px] font-bold text-[#1E6091] bg-blue-50 px-2 py-0.5 rounded">
                        {act.moduleTitle}
                      </span>

                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Target: {act.kpiTarget}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-sans">Lead:</span>
                      <span className="text-xs font-bold text-[#0A2463] bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                        {act.leadTaskforce}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-serif font-bold text-base text-[#0A2463] group-hover:text-[#1E6091] transition-colors">
                    {act.title}
                  </h4>

                  <p className="text-xs text-gray-700 font-sans mt-1.5 leading-relaxed">
                    <strong className="text-gray-900">Deliverable:</strong> {act.deliverable}
                  </p>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-sans">
                    <div className="p-2 rounded-xl bg-gray-50 border border-gray-200/80">
                      <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">
                        Accountability Gate:
                      </span>
                      <span className="text-gray-700 font-medium">
                        {act.accountabilityGate}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-amber-50/50 border border-amber-200/60">
                      <span className="text-[10px] font-bold text-amber-800 uppercase block mb-0.5">
                        Acceleration Technique (Why It&apos;s Faster):
                      </span>
                      <span className="text-amber-900 font-medium">
                        {act.accelerationTechnique}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION STRIP */}
        <div className="mt-12 bg-gradient-to-r from-[#0A2463] via-[#1E6091] to-[#0A2463] rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full">
              Full Spectrum Integration
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
              Ready to Accelerate the Movement in Your City?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-sans mt-1 max-w-xl">
              Connect this Execution &amp; Innovation plan with your local Dialogue Circle, sign the Declaration of Interdependence, or inspect the 10 Structural Solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('circles')}
              className="px-5 py-3 rounded-2xl bg-[#D4A017] hover:bg-[#b8860b] text-[#0A2463] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Join / Launch a Circle
            </button>
            <button
              onClick={() => onSelectTab('dashboard')}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              Verified Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
