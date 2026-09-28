import React, { useState } from 'react';
import { HISTORICAL_HEALING_CASES } from '../data/frameworkData';
import { HistoricalHealingCase, ViewTab } from '../types';
import { 
  HeartHandshake, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Award
} from 'lucide-react';

interface HealingFrameworkProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const HealingFramework: React.FC<HealingFrameworkProps> = ({ onSelectTab }) => {
  const [selectedCase, setSelectedCase] = useState<HistoricalHealingCase>(HISTORICAL_HEALING_CASES[0]);
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: 'ACKNOWLEDGE',
      action: 'Name the Wrong',
      summary: 'State institutions, leaders, or parties formally name colonial, wartime, or systemic crimes without evasion, euphemism, or historical whitewashing.',
      quote: 'You cannot heal a wound that you pretend does not exist.'
    },
    {
      num: 2,
      title: 'LISTEN',
      action: 'Victims Speak First',
      summary: 'Victims and affected communities testify in unhurried, public, and safe spaces. Former perpetrators and beneficiaries listen without defense, excuses, or rebuttal.',
      quote: 'Listening without defensiveness is the first gesture of restored dignity.'
    },
    {
      num: 3,
      title: 'APOLOGIZE',
      action: 'Formal, Sincere, Institutional',
      summary: 'Formal remorse expressed by heads of state or institutions, recognizing the profound intergenerational trauma inflicted.',
      quote: 'A true apology seeks no immediate relief; it accepts moral responsibility.'
    },
    {
      num: 4,
      title: 'REPAIR',
      action: 'Investment, Not Revenge',
      summary: 'Establishment of the Shared Future Investment Fund. Not punitive sanctions that humiliate, but tangible capital for health, schools, and infrastructure in harmed communities.',
      quote: 'Justice without vengeance: repair the future rather than punishing descendants.'
    },
    {
      num: 5,
      title: 'INTEGRATE',
      action: 'A New Shared Story',
      summary: 'Rewrite textbooks, build shared memorials, and cooperate on joint challenges so that adversaries discover an identity as co-creators of tomorrow.',
      quote: '"We were once adversaries; today we build a shared planet together."'
    }
  ];

  return (
    <section className="py-16 bg-[#FBFBFA] text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#2D6A4F]/20">
            <HeartHandshake className="w-3.5 h-3.5 text-[#2D6A4F]" />
            Part 7: The Healing Framework
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
            How to Heal Painful Pasts: The 5-Step Process
          </h2>
          <p className="text-sm text-[#6C757D] font-sans mt-2 leading-relaxed">
            You cannot construct a lasting shared future upon denied historical atrocities. Healing demands truth, respectful contrition, victim restoration, and common endeavors.
          </p>
        </div>

        {/* The 5 Steps Interactive Visual Flow */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
          <h3 className="font-serif text-xl font-bold text-[#0A2463] mb-6 text-center">
            The Universal 5-Step Reconciliation Pathway
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {steps.map((step) => {
              const isSelected = activeStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#0A2463] text-white border-[#0A2463] shadow-md ring-2 ring-[#D4A017]/40'
                      : 'bg-[#FBFBFA] hover:bg-gray-100 border-gray-200 text-[#2B2D42]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-[#D4A017] text-[#0A2463]' : 'bg-gray-200 text-gray-700'
                    }`}>
                      Step {step.num}
                    </span>
                  </div>
                  <div className={`font-serif font-bold text-base mb-1 ${isSelected ? 'text-white' : 'text-[#0A2463]'}`}>
                    {step.title}
                  </div>
                  <div className={`text-xs font-sans font-semibold mb-2 ${isSelected ? 'text-[#D4A017]' : 'text-[#1E6091]'}`}>
                    {step.action}
                  </div>
                  <p className={`text-[11px] font-sans line-clamp-2 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                    {step.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive Card */}
          <div className="mt-6 p-6 rounded-xl bg-[#FDFCDC]/60 border border-[#D4A017]/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <span className="text-xs font-sans font-bold text-[#0A2463] uppercase tracking-wider bg-white px-2.5 py-1 rounded border border-gray-200">
                Deep Dive · Step {activeStep}: {steps[activeStep - 1].title} ({steps[activeStep - 1].action})
              </span>
              <span className="font-serif italic text-xs text-[#0A2463] font-semibold">
                &quot;{steps[activeStep - 1].quote}&quot;
              </span>
            </div>
            <p className="text-sm font-sans text-[#2B2D42] leading-relaxed">
              {steps[activeStep - 1].summary}
            </p>
          </div>
        </div>

        {/* Real-World Case Studies That Worked */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0A2463]">
                Proven Models: Historical Precedents
              </h3>
              <p className="text-xs text-[#6C757D] font-sans mt-1">
                Reconciliation is not a utopian fantasy; it has ended decades of slaughter in modern history.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Case selector buttons */}
            <div className="lg:col-span-4 space-y-2.5">
              {HISTORICAL_HEALING_CASES.map((item) => {
                const isSelected = selectedCase.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCase(item)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-white border-[#1E6091] shadow-md ring-2 ring-[#1E6091]/20'
                        : 'bg-white hover:bg-gray-50 border-gray-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-sans font-bold text-[#0A2463]">
                        {item.country}
                      </span>
                      <span className="text-[11px] font-sans text-gray-500">
                        {item.period}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-sm text-[#1E6091]">
                      {item.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Case Study Details */}
            <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <span className="text-xs font-sans font-bold uppercase text-[#2D6A4F] bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {selectedCase.country} · {selectedCase.period}
                </span>
                <span className="text-xs font-sans text-gray-500">Historical Case Analysis</span>
              </div>

              <h4 className="font-serif font-bold text-2xl text-[#0A2463] mb-2">
                {selectedCase.title}
              </h4>
              <p className="text-xs font-sans text-red-700 font-semibold mb-4 bg-red-50 p-2 rounded border border-red-100">
                Context: {selectedCase.conflict}
              </p>

              <div className="space-y-4 font-sans text-xs sm:text-sm">
                <div>
                  <h5 className="font-bold text-[#0A2463] uppercase tracking-wide text-xs mb-1">
                    Healing Mechanism Deployed:
                  </h5>
                  <p className="text-[#2B2D42] leading-relaxed">
                    {selectedCase.mechanism}
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-[#0A2463] uppercase tracking-wide text-xs mb-1">
                    Concrete Outcomes:
                  </h5>
                  <ul className="space-y-1.5 list-disc list-inside text-[#2B2D42]">
                    {selectedCase.outcomes.map((outcome, idx) => (
                      <li key={idx} className="leading-normal">{outcome}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0A2463] text-white p-4 rounded-xl mt-4">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#D4A017] block mb-1">
                    Core Civilizational Lesson:
                  </span>
                  <p className="font-serif italic text-sm text-[#A8DADC]">
                    &quot;{selectedCase.keyLesson}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
