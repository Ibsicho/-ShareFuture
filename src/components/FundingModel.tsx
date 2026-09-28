import React, { useState } from 'react';
import { REVENUE_STREAMS, BUDGET_BREAKDOWN_YEAR1 } from '../data/operationalModulesData';
import { ViewTab } from '../types';
import { 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  Sliders, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Lock, 
  Check, 
  Copy,
  ArrowRight,
  Calculator
} from 'lucide-react';

interface FundingModelProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const FundingModel: React.FC<FundingModelProps> = ({ onSelectTab }) => {
  const [activeTab, setActiveTab] = useState<'budget' | 'revenue' | 'calculator' | 'circle-tier' | 'transparency'>('budget');
  
  // Interactive Peace Dividend Reallocation Calculator state
  // Global military spending = $2,400 Billion ($2.4 Trillion)
  const [reallocationPercent, setReallocationPercent] = useState<number>(10); // default 10%
  
  // Monthly giving tier selection
  const [selectedTier, setSelectedTier] = useState<number>(10); // $10/mo default

  const totalMilitaryBudget = 2400; // in Billions USD
  const generatedDividend = (totalMilitaryBudget * (reallocationPercent / 100)); // in Billions USD

  // Calculation breakdowns
  const waterFund = (generatedDividend * 0.20).toFixed(1); // 20%
  const cleanEnergyFund = (generatedDividend * 0.35).toFixed(1); // 35%
  const healthPovertyFund = (generatedDividend * 0.25).toFixed(1); // 25%
  const youthPeaceCorps = (generatedDividend * 0.15).toFixed(1); // 15%
  const emergencyRelief = (generatedDividend * 0.05).toFixed(1); // 5%

  const monthlyTiers = [
    { amount: 5, name: 'Seed', impact: 'Subsidizes 1 Dialogue Circle dialogue kit in low-bandwidth regions' },
    { amount: 10, name: 'Sprout', impact: 'Funds monthly training & translation for 2 youth community organizers' },
    { amount: 25, name: 'Tree', impact: 'Maintains open-source cloud hosting for 500 AI Dialogue Guide users' },
    { amount: 50, name: 'Forest', impact: 'Sponsors 1 cross-border youth exchange volunteer in the Peace Corps' },
    { amount: 100, name: 'Grove', impact: 'Direct micro-grant to support a historical healing truth circle' }
  ];

  return (
    <section className="py-16 bg-[#FBFBFA] text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#D4A017]/10 text-[#0A2463] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#D4A017]/30">
              <DollarSign className="w-3.5 h-3.5 text-[#D4A017]" />
              Operational Module 5: Financial Architecture &amp; Capital Plan
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
              The Funding Model: Detailed Financial Blueprint
            </h2>
            <p className="text-sm text-[#6C757D] font-sans mt-2 max-w-2xl leading-relaxed">
              A 10-year capital roadmap combining grassroots micro-giving, institutional philanthropic syndicates, and the reallocation of 10% of global military expenditures ($200B/yr).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('governance')}
              className="bg-white hover:bg-gray-50 border border-gray-300 text-[#0A2463] px-3.5 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-colors"
            >
              🤝 Org Chart &amp; Governance
            </button>
            <button
              onClick={() => onSelectTab('campaign')}
              className="bg-[#0A2463] hover:bg-[#1E6091] text-white px-3.5 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              📢 Campaign Strategy
            </button>
          </div>
        </div>

        {/* Sub-module Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'budget'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <PieChart className="w-4 h-4 text-[#D4A017]" />
            Year 1 Budget Allocation ($50M)
          </button>

          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'revenue'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#1E6091]" />
            12 Revenue Streams &amp; Projections
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'calculator'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Calculator className="w-4 h-4 text-[#2D6A4F]" />
            Peace Dividend $200B Calculator
          </button>

          <button
            onClick={() => setActiveTab('circle-tier')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'circle-tier'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Heart className="w-4 h-4 text-red-500" />
            Monthly &quot;Healing Circle&quot; Giving
          </button>

          <button
            onClick={() => setActiveTab('transparency')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'transparency'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Radical Transparency &amp; Screens
          </button>
        </div>

        {/* SUB-MODULE 1: BUDGET BREAKDOWN */}
        {activeTab === 'budget' && (
          <div className="space-y-8">
            {/* Top Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs">
                <span className="text-[10px] font-sans font-bold uppercase text-gray-500 block">Year 1 Operating Budget</span>
                <span className="text-3xl font-bold font-serif text-[#0A2463] mt-1 block">$50.0 Million</span>
                <span className="text-xs font-sans text-gray-500 mt-1 block">Phase 1 Awaken &amp; Seed Mobilization</span>
              </div>
              <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs">
                <span className="text-[10px] font-sans font-bold uppercase text-gray-500 block">Year 5 Scaling Target</span>
                <span className="text-3xl font-bold font-serif text-[#1E6091] mt-1 block">$320.0 Million</span>
                <span className="text-xs font-sans text-gray-500 mt-1 block">150,000 active circles &amp; peace corps</span>
              </div>
              <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs">
                <span className="text-[10px] font-sans font-bold uppercase text-gray-500 block">10-Year Cumulative Plan</span>
                <span className="text-3xl font-bold font-serif text-[#2D6A4F] mt-1 block">$3.9 Billion</span>
                <span className="text-xs font-sans text-gray-500 mt-1 block">Supported by Peace Dividend statutory reallocation</span>
              </div>
            </div>

            {/* Categorical Breakdown */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                Year 1 Detailed Capital Deployment (By Line Item)
              </h3>

              <div className="space-y-6">
                {BUDGET_BREAKDOWN_YEAR1.map((cat, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#FBFBFA] border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                        <h4 className="font-serif font-bold text-base text-[#0A2463]">
                          {cat.category}
                        </h4>
                      </div>
                      <div className="text-xs font-sans">
                        <span className="font-bold text-[#0A2463] text-sm">${cat.year1Amount}M</span>
                        <span className="text-gray-500 ml-1">({cat.percentage}%)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs pt-2">
                      {cat.lineItems.map((item, i) => (
                        <div key={i} className="p-3 bg-white rounded-xl border border-gray-200">
                          <div className="flex items-center justify-between mb-1">
                            <strong className="text-gray-900">{item.name}</strong>
                            <span className="font-bold text-[#0A2463]">{item.amount}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 leading-normal">{item.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODULE 2: 12 REVENUE STREAMS */}
        {activeTab === 'revenue' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#1E6091] block mb-1">
                Diversified Sovereign, Grassroots &amp; Institutional Capital
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                Revenue Streams &amp; 10-Year Trajectory
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-1">
                No single government or donor may contribute more than 15% of total budget to safeguard political independence.
              </p>
            </div>

            <div className="space-y-4 font-sans text-xs">
              {REVENUE_STREAMS.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-[#FBFBFA] border border-gray-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        rev.category === 'Grassroots' ? 'bg-emerald-100 text-emerald-800' :
                        rev.category === 'Institutional' ? 'bg-blue-100 text-blue-800' :
                        rev.category === 'Sovereign / Macro' ? 'bg-purple-100 text-purple-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {rev.category} · {rev.percentageOfBudget}% of target budget
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#0A2463] mt-1">
                        {rev.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <span className="text-[10px] text-gray-500 block">Year 1</span>
                        <strong className="text-gray-900">{rev.year1Target}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Year 5</span>
                        <strong className="text-[#1E6091]">{rev.year5Target}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Year 10</span>
                        <strong className="text-[#2D6A4F]">{rev.year10Target}</strong>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {rev.mechanism}
                  </p>

                  <div className="text-[11px] text-gray-500 bg-white p-2.5 rounded-lg border border-gray-100">
                    <strong className="text-gray-700 mr-1">Ethical Safeguard:</strong>
                    {rev.ethicalSafeguards}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-MODULE 3: PEACE DIVIDEND CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
                Interactive Economic Conversion Simulator
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                The $200B Peace Dividend Reallocation Engine
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-1">
                Global defense expenditures sit at $2.4 Trillion ($2,400 Billion). Adjust the reallocation percentage slider below to see what happens when humanity shifts just a fraction of weapons spending to life support systems:
              </p>
            </div>

            {/* Slider Control */}
            <div className="bg-[#051538] text-white p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#A8DADC] uppercase font-bold tracking-wider">
                    Military Budget Reallocation %
                  </span>
                  <div className="font-serif text-3xl font-bold text-[#D4A017] mt-1">
                    {reallocationPercent}% Shifted
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#A8DADC] uppercase font-bold tracking-wider">
                    Annual Capital Unlocked
                  </span>
                  <div className="font-serif text-3xl font-bold text-white mt-1">
                    ${generatedDividend.toFixed(0)} Billion / year
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={reallocationPercent}
                onChange={(e) => setReallocationPercent(parseInt(e.target.value, 10))}
                className="w-full accent-[#D4A017] cursor-pointer h-2 bg-gray-700 rounded-lg"
              />

              <div className="flex justify-between text-[11px] text-gray-400 font-sans">
                <span>1% ($24B)</span>
                <span>5% ($120B)</span>
                <span className="text-[#D4A017] font-bold">10% ($240B Target)</span>
                <span>15% ($360B)</span>
                <span>25% ($600B)</span>
              </div>
            </div>

            {/* Real World Impact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-xs">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <span className="text-blue-700 font-bold uppercase text-[10px] block">Universal Clean Water &amp; Sanitation</span>
                <div className="text-2xl font-serif font-bold text-blue-950 mt-1">${waterFund}B</div>
                <p className="text-blue-800 mt-1 leading-normal">
                  Enough to pipe potable water and sanitation to every human currently lacking clean water.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-emerald-700 font-bold uppercase text-[10px] block">Global Clean Microgrid Fund</span>
                <div className="text-2xl font-serif font-bold text-emerald-950 mt-1">${cleanEnergyFund}B</div>
                <p className="text-emerald-800 mt-1 leading-normal">
                  Deploys decentralized solar and battery grids to 600M people in Sub-Saharan Africa and South Asia.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <span className="text-purple-700 font-bold uppercase text-[10px] block">Disease Eradication &amp; Healthcare</span>
                <div className="text-2xl font-serif font-bold text-purple-950 mt-1">${healthPovertyFund}B</div>
                <p className="text-purple-800 mt-1 leading-normal">
                  Eradicates malaria, funds maternal health clinics, and guarantees childhood vaccines globally.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-amber-700 font-bold uppercase text-[10px] block">World Youth Peace Corps</span>
                <div className="text-2xl font-serif font-bold text-amber-950 mt-1">${youthPeaceCorps}B</div>
                <p className="text-amber-800 mt-1 leading-normal">
                  Provides living stipends and cross-border deployments for 10 million young environmental and health volunteers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <span className="text-rose-700 font-bold uppercase text-[10px] block">UN Disaster Rapid Response</span>
                <div className="text-2xl font-serif font-bold text-rose-950 mt-1">${emergencyRelief}B</div>
                <p className="text-rose-800 mt-1 leading-normal">
                  Quadruples emergency food, shelter, and medical logistics for climate-displaced refugees.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
                <div>
                  <span className="text-gray-500 font-bold uppercase text-[10px] block">Civilizational Comparison</span>
                  <div className="text-base font-serif font-bold text-[#0A2463] mt-1">Cost of One Aircraft Carrier:</div>
                  <p className="text-gray-600 mt-1 leading-normal">
                    $13.3 Billion = Cost to train 100,000 primary school teachers and build 5,000 community health posts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODULE 4: MONTHLY GIVING TIERS */}
        {activeTab === 'circle-tier' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-red-500 block mb-1">
                Citizen-Powered Autonomy
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                Join &quot;The Healing Circle&quot; Monthly Giving Program
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-2">
                100% of grassroots individual gifts flow directly to local dialogue kits and youth peace corps stipends. Zero percent goes to administrative overhead.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4">
              {monthlyTiers.map((tier) => {
                const isSelected = tier.amount === selectedTier;
                return (
                  <button
                    key={tier.amount}
                    onClick={() => setSelectedTier(tier.amount)}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-[#0A2463] text-white border-[#0A2463] shadow-md ring-2 ring-[#D4A017]/40'
                        : 'bg-[#FBFBFA] hover:bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="font-serif text-2xl font-bold mb-1">
                      ${tier.amount}<span className="text-xs font-sans font-normal text-gray-400">/mo</span>
                    </div>
                    <div className={`text-xs font-bold font-sans ${isSelected ? 'text-[#D4A017]' : 'text-[#0A2463]'}`}>
                      {tier.name} Circle
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Tier Impact Display */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center max-w-xl mx-auto font-sans text-xs">
              <span className="font-bold text-emerald-900 block text-sm mb-1">
                Your Monthly Impact as a ${selectedTier}/month Partner:
              </span>
              <p className="text-emerald-800 leading-relaxed font-medium">
                {monthlyTiers.find(t => t.amount === selectedTier)?.impact}
              </p>
              <button
                onClick={() => {
                  alert(`Thank you! You have selected the $${selectedTier}/month ${monthlyTiers.find(t => t.amount === selectedTier)?.name} Tier. Simulation recorded.`);
                }}
                className="mt-4 bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold px-6 py-2.5 rounded-xl shadow transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-[#D4A017]" />
                Pledge ${selectedTier} / Month
              </button>
            </div>
          </div>
        )}

        {/* SUB-MODULE 5: RADICAL TRANSPARENCY */}
        {activeTab === 'transparency' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Zero Corruption Covenant
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                Radical Transparency &amp; Non-Acceptance Screens
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
              <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                <strong className="text-sm font-bold text-red-950 block">
                  Strict Negative Screens (We Reject Money From):
                </strong>
                <ul className="space-y-1.5 list-disc list-inside text-red-900 leading-relaxed">
                  <li>Weapons, defense contractors, and surveillance software vendors</li>
                  <li>Fossil fuel extraction corporations and petrostate sovereign wealth funds</li>
                  <li>Tobacco, gambling, and addictive social algorithmic syndicates</li>
                  <li>Any donor demanding confidential policy veto or board appointment</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <strong className="text-sm font-bold text-emerald-950 block">
                  Positive Accountability Covenants:
                </strong>
                <ul className="space-y-1.5 list-disc list-inside text-emerald-900 leading-relaxed">
                  <li>100% of donations over $500 published to our live cryptographically verified ledger</li>
                  <li>Executive compensation capped at 10:1 ratio against lowest-paid full-time staff member</li>
                  <li>Quarterly audits conducted by independent international ombudsman</li>
                  <li>Open-source software license for all tools, research, and educational curriculum</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
