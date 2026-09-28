import React, { useState } from 'react';
import { DialogueCircle } from '../types';
import { CIRCLE_METRICS_DATA, getCircleDefaultMetrics } from '../data/circleMetricsData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Calendar, 
  Coffee, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface CircleMetricsSectionProps {
  circle: DialogueCircle;
}

export const CircleMetricsSection: React.FC<CircleMetricsSectionProps> = ({ circle }) => {
  const [activeMetricTab, setActiveMetricTab] = useState<'all' | 'attendance' | 'participation' | 'resources'>('all');
  const [timeRange, setTimeRange] = useState<'6m' | '3m'>('6m');

  const metrics = getCircleDefaultMetrics(circle.id, circle.name);
  const displayData = timeRange === '3m' ? metrics.monthlyData.slice(-3) : metrics.monthlyData;

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-200 text-xs z-50">
          <p className="font-bold text-gray-900 mb-1 border-b border-gray-100 pb-1">
            Month: {label} 2026
          </p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 font-medium text-gray-600">
                  <span 
                    className="w-2 h-2 rounded-full inline-block" 
                    style={{ backgroundColor: entry.color || entry.fill }}
                  />
                  {entry.name}:
                </span>
                <span className="font-bold text-gray-900 font-mono">
                  {entry.value} {entry.unit || ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Time Range Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#0A2463]/5 via-[#1E6091]/5 to-amber-500/5 p-4 rounded-2xl border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0A2463]" />
            <h4 className="font-serif font-bold text-base text-[#0A2463]">
              Circle Participation &amp; Impact Analytics
            </h4>
          </div>
          <p className="text-xs text-gray-600 mt-0.5">
            Real-time visual metrics tracking attendance frequency, active deliberation, and knowledge assets over time.
          </p>
        </div>

        {/* View filters */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-white p-1 rounded-xl border border-gray-200 text-xs shadow-xs">
            <button
              onClick={() => setTimeRange('6m')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                timeRange === '6m' ? 'bg-[#0A2463] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => setTimeRange('3m')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                timeRange === '3m' ? 'bg-[#0A2463] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Last 3 Months
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* KPI 1: Attendance Rate */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span className="font-semibold">Avg Attendance Rate</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif font-bold text-[#0A2463]">
              {metrics.overallAttendanceRate}%
            </span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 inline mr-0.5" /> +5.4%
            </span>
          </div>
          <p className="text-[10px] text-gray-500">
            {metrics.totalSessionsHeld} monthly gatherings held
          </p>
        </div>

        {/* KPI 2: Shared Resources */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span className="font-semibold">Shared Resources</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif font-bold text-emerald-800">
              {metrics.totalResourcesShared}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3 inline mr-0.5" /> 100% verified
            </span>
          </div>
          <p className="text-[10px] text-gray-500">
            PDFs, papers &amp; field frameworks
          </p>
        </div>

        {/* KPI 3: Participation Index */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span className="font-semibold">Deliberation Index</span>
            <Award className="w-4 h-4 text-[#D4A017]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif font-bold text-[#0A2463]">
              {metrics.activeParticipationIndex}%
            </span>
            <span className="text-[10px] font-bold text-[#D4A017] flex items-center">
              Co-elevated
            </span>
          </div>
          <p className="text-[10px] text-gray-500">
            Active speaker &amp; note-taking ratio
          </p>
        </div>

        {/* KPI 4: Virtual Coffee Pairings */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span className="font-semibold">1-on-1 Coffees</span>
            <Coffee className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif font-bold text-amber-900">
              {metrics.virtualCoffeesCompleted}
            </span>
            <span className="text-[10px] font-bold text-indigo-600 flex items-center">
              AI-sparked
            </span>
          </div>
          <p className="text-[10px] text-gray-500">
            Cross-role relational dialogues
          </p>
        </div>

      </div>

      {/* Sub-nav Metric Focus Selector */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 text-xs">
        <span className="text-gray-500 font-semibold flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" /> Visualize:
        </span>
        <button
          onClick={() => setActiveMetricTab('all')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeMetricTab === 'all'
              ? 'bg-[#0A2463] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Charts
        </button>
        <button
          onClick={() => setActiveMetricTab('attendance')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeMetricTab === 'attendance'
              ? 'bg-[#0A2463] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Meeting Attendance Frequency
        </button>
        <button
          onClick={() => setActiveMetricTab('participation')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeMetricTab === 'participation'
              ? 'bg-[#0A2463] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Member Participation
        </button>
        <button
          onClick={() => setActiveMetricTab('resources')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeMetricTab === 'resources'
              ? 'bg-[#0A2463] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Shared Resources Growth
        </button>
      </div>

      {/* CHART 1: ATTENDANCE FREQUENCY OVER TIME */}
      {(activeMetricTab === 'all' || activeMetricTab === 'attendance') && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E6091]"></span>
                <h5 className="font-serif font-bold text-sm text-[#0A2463]">
                  Meeting Attendance Frequency Over Time
                </h5>
              </div>
              <p className="text-[11px] text-gray-500">
                Number of participants present per monthly gathering vs circle capacity limit
              </p>
            </div>
            <div className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 self-start sm:self-auto">
              Target: 8 Members Max (Co-Elevation Dunbar Scale)
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E6091" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1E6091" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A017" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D4A017" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  wrapperStyle={{ fontSize: 11, paddingBottom: 6 }} 
                />
                <Area
                  type="monotone"
                  dataKey="attendanceCount"
                  name="Attendees Present"
                  stroke="#1E6091"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#attendanceGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="expectedAttendees"
                  name="Expected Roster"
                  stroke="#9CA3AF"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center text-xs">
            <div className="p-2 bg-gray-50 rounded-lg">
              <span className="text-[10px] text-gray-500 block">Min Attendance</span>
              <span className="font-bold text-gray-800">5 Members</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <span className="text-[10px] text-gray-500 block">Peak Attendance</span>
              <span className="font-bold text-emerald-700">8 Members (Full)</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <span className="text-[10px] text-gray-500 block">Retention Score</span>
              <span className="font-bold text-blue-900">94.2% Sustained</span>
            </div>
          </div>
        </div>
      )}

      {/* CHART 2: MEMBER PARTICIPATION OVER TIME */}
      {(activeMetricTab === 'all' || activeMetricTab === 'participation') && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0A2463]"></span>
                <h5 className="font-serif font-bold text-sm text-[#0A2463]">
                  Member Participation &amp; Deliberative Engagement
                </h5>
              </div>
              <p className="text-[11px] text-gray-500">
                Active discussion contributors, agenda points proposed, and 1-on-1 coffee matches
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
              100% Member Engagement Rate
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <YAxis domain={[0, 12]} tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  wrapperStyle={{ fontSize: 11, paddingBottom: 6 }} 
                />
                <Bar 
                  dataKey="activeContributors" 
                  name="Active Deliberators" 
                  fill="#0A2463" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="agendaItemsProposed" 
                  name="Agenda Points Proposed" 
                  fill="#D4A017" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="virtualCoffeeSessions" 
                  name="1-on-1 Coffee Chats" 
                  fill="#059669" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Role Breakdown Pill list */}
          <div className="pt-2 border-t border-gray-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
              Participation Index by Member Role:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {metrics.participationByRole.map((roleItem, idx) => (
                <div key={idx} className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800">{roleItem.role}</span>
                    <span className="font-mono text-emerald-700 font-bold">{roleItem.activityPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div 
                      className="bg-[#0A2463] h-full rounded-full" 
                      style={{ width: `${roleItem.activityPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHART 3: SHARED RESOURCES OVER TIME */}
      {(activeMetricTab === 'all' || activeMetricTab === 'resources') && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <h5 className="font-serif font-bold text-sm text-[#0A2463]">
                  Knowledge Assets &amp; Shared Resources Over Time
                </h5>
              </div>
              <p className="text-[11px] text-gray-500">
                Monthly materials shared (PDFs, research papers, field guides) and cumulative community downloads
              </p>
            </div>
            <span className="text-[11px] font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 self-start sm:self-auto">
              Total Assets: {metrics.totalResourcesShared} Materials
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={displayData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="resourceCumulativeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#9CA3AF" domain={[0, 20]} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#9CA3AF" domain={[0, 300]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  wrapperStyle={{ fontSize: 11, paddingBottom: 6 }} 
                />
                <Bar 
                  yAxisId="left"
                  dataKey="resourcesShared" 
                  name="Monthly Resources Added" 
                  fill="#1E6091" 
                  radius={[4, 4, 0, 0]} 
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="cumulativeResources" 
                  name="Cumulative Library Size" 
                  stroke="#059669" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#resourceCumulativeGrad)" 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="resourceDownloads" 
                  name="Member Downloads (RHS)" 
                  stroke="#D4A017" 
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#D4A017' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Resource Category Breakdown */}
          <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">Material Categories:</span>
              <div className="flex flex-wrap gap-2">
                {metrics.resourceTypeBreakdown.map((typeItem, idx) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                    style={{ 
                      backgroundColor: `${typeItem.fill}15`, 
                      color: typeItem.fill,
                      borderColor: `${typeItem.fill}30`
                    }}
                  >
                    {typeItem.type}: {typeItem.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Highlights & Chatham House Rule Trust Indicators */}
      <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-2">
        <h5 className="font-serif font-bold text-xs text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
          Key Analytical Observations &amp; Circle Health
        </h5>
        <ul className="space-y-1 text-xs text-amber-900/90 list-disc list-inside">
          {metrics.keyHighlights.map((highlight, index) => (
            <li key={index} className="leading-relaxed">
              {highlight}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
