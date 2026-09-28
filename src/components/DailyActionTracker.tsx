import React, { useState, useEffect } from 'react';
import { DAILY_ACTIONS } from '../data/frameworkData';
import { DailyAction, ViewTab } from '../types';
import { 
  Flame, 
  CheckCircle2, 
  Clock, 
  Award, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  Share2
} from 'lucide-react';

interface DailyActionTrackerProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const DailyActionTracker: React.FC<DailyActionTrackerProps> = ({ onSelectTab }) => {
  const [completedActionIds, setCompletedActionIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('shared_future_completed_actions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['act-1'];
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('shared_future_streak');
    return saved ? parseInt(saved, 10) : 12;
  });

  const [reflectionText, setReflectionText] = useState<{ [id: string]: string }>({});
  const [activeTabCategory, setActiveTabCategory] = useState<string>('all');

  const handleToggleComplete = (id: string) => {
    if (completedActionIds.includes(id)) {
      const updated = completedActionIds.filter(item => item !== id);
      setCompletedActionIds(updated);
      localStorage.setItem('shared_future_completed_actions', JSON.stringify(updated));
    } else {
      const updated = [...completedActionIds, id];
      setCompletedActionIds(updated);
      localStorage.setItem('shared_future_completed_actions', JSON.stringify(updated));
      const newStreak = streakDays + 1;
      setStreakDays(newStreak);
      localStorage.setItem('shared_future_streak', newStreak.toString());
    }
  };

  const totalPoints = completedActionIds.reduce((acc, id) => {
    const act = DAILY_ACTIONS.find(a => a.id === id);
    return acc + (act ? act.points : 0);
  }, 0);

  const categories = ['all', 'connection', 'healing', 'advocacy', 'learning', 'service', 'digital', 'physical'];

  const filteredActions = activeTabCategory === 'all'
    ? DAILY_ACTIONS
    : DAILY_ACTIONS.filter(a => a.category === activeTabCategory);

  return (
    <section className="py-16 bg-white text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#2D6A4F]/20">
              <Flame className="w-3.5 h-3.5 text-[#D4A017]" />
              Part 5: 7 Immediate Actions Anyone Can Take
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
              Daily Bridge-Building &amp; Peace Practice Tracker
            </h2>
            <p className="text-sm text-[#6C757D] font-sans mt-2 max-w-2xl leading-relaxed">
              Global change does not begin in parliamentary halls; it begins with how we treat the person across from us today. Commit to daily micro-actions that de-escalate tension and heal relationships.
            </p>
          </div>

          {/* User Scorecard */}
          <div className="flex items-center gap-3 bg-[#FBFBFA] border border-gray-200 p-3 rounded-2xl shadow-xs">
            <div className="px-3 border-r border-gray-200 text-center">
              <span className="text-[10px] font-sans font-bold uppercase text-[#6C757D] block">Your Streak</span>
              <span className="text-xl font-bold font-serif text-[#0A2463] flex items-center justify-center gap-1">
                🔥 {streakDays} <span className="text-xs text-[#D4A017] font-sans">Days</span>
              </span>
            </div>
            <div className="px-3 text-center">
              <span className="text-[10px] font-sans font-bold uppercase text-[#6C757D] block">Peace Points</span>
              <span className="text-xl font-bold font-serif text-[#2D6A4F]">
                {totalPoints} <span className="text-xs text-gray-500 font-sans">pts</span>
              </span>
            </div>
          </div>
        </div>

        {/* 7 Daily Principles Summary Grid */}
        <div className="bg-[#051538] text-white rounded-2xl p-6 sm:p-8 mb-10 shadow-lg border border-white/10">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4A017]" />
              The 7 Core Practices of a Shared Future
            </h3>
            <span className="text-xs font-sans text-[#A8DADC]">Daily Micro-Commitments</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-sans">
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <strong className="text-[#D4A017] block mb-0.5">1. Personal Bridge:</strong>
              Talk with someone holding opposing political/cultural views weekly.
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <strong className="text-[#D4A017] block mb-0.5">2. Community Circle:</strong>
              Join or convene a 6-person monthly dialogue circle.
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <strong className="text-[#D4A017] block mb-0.5">3. National Pressure:</strong>
              Demand leaders support ceasefires and diplomacy over weapons escalation.
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <strong className="text-[#D4A017] block mb-0.5">4. Global Support:</strong>
              Donate or back peace NGOs (Crisis Group, Interpeace, Search for Common Ground).
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <strong className="text-[#D4A017] block mb-0.5">5. Digital Hygiene:</strong>
              Amplify bridge-builders, verify facts, and refuse outrage engagement.
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <strong className="text-[#D4A017] block mb-0.5">6. Ethical Economy:</strong>
              Choose fair trade, local, and ecologically regenerative goods.
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <strong className="text-[#D4A017] block mb-0.5">7. Ubuntu Ethic:</strong>
              Embrace &quot;I am because we are&quot; — healing wounds through mutual dignity.
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center justify-center text-center">
              <button
                onClick={() => onSelectTab('dialogue-guide')}
                className="text-[#D4A017] hover:underline font-bold"
              >
                Prepare with AI Guide →
              </button>
            </div>
          </div>
        </div>

        {/* Action Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <span className="text-xs font-sans font-semibold text-[#6C757D] mr-2">Filter Category:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTabCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold capitalize transition-all whitespace-nowrap ${
                activeTabCategory === cat
                  ? 'bg-[#0A2463] text-white shadow-xs'
                  : 'bg-gray-100 text-[#6C757D] hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Cards List */}
        <div className="space-y-4">
          {filteredActions.map((act) => {
            const isCompleted = completedActionIds.includes(act.id);
            return (
              <div
                key={act.id}
                id={`action-item-${act.id}`}
                className={`border rounded-2xl p-5 sm:p-6 transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-[#1E6091] shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={() => handleToggleComplete(act.id)}
                      className={`w-7 h-7 mt-0.5 rounded-full flex items-center justify-center transition-all border ${
                        isCompleted
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'border-gray-300 hover:border-emerald-600 text-transparent'
                      }`}
                      aria-label="Toggle action completion"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          {act.category}
                        </span>
                        <span className="text-xs font-sans text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {act.durationMinutes} min
                        </span>
                        <span className="text-xs font-sans font-bold text-[#D4A017]">
                          +{act.points} pts
                        </span>
                      </div>
                      <h4 className={`font-serif font-bold text-base sm:text-lg ${
                        isCompleted ? 'text-emerald-950 line-through' : 'text-[#0A2463]'
                      }`}>
                        {act.title}
                      </h4>
                      <p className="text-xs font-sans text-[#6C757D] mt-1 max-w-3xl leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleComplete(act.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all ${
                      isCompleted
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-[#0A2463] text-white hover:bg-[#1E6091]'
                    }`}
                  >
                    {isCompleted ? 'Completed ✓' : 'Mark Done'}
                  </button>
                </div>

                {/* Practical Prompt Helper */}
                <div className="mt-4 p-3 rounded-xl bg-[#FBFBFA] border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
                  <div className="text-[#2B2D42]">
                    <strong className="text-[#0A2463] mr-1">Suggested Script / Thought:</strong>
                    <span className="italic text-gray-600">{act.suggestedPrompt}</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(act.suggestedPrompt);
                    }}
                    className="text-[11px] font-bold text-[#1E6091] hover:underline whitespace-nowrap"
                  >
                    Copy Script
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
