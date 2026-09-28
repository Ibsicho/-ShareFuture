import React, { useState } from 'react';
import { GOVERNANCE_NODES, GOVERNANCE_PRINCIPLES, GovernanceNode } from '../data/operationalModulesData';
import { ViewTab } from '../types';
import { 
  Users, 
  ShieldCheck, 
  Landmark, 
  Scale, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  Sparkles,
  Building,
  RotateCcw
} from 'lucide-react';

interface OrgChartGovernanceProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const OrgChartGovernance: React.FC<OrgChartGovernanceProps> = ({ onSelectTab }) => {
  const [selectedNode, setSelectedNode] = useState<GovernanceNode>(GOVERNANCE_NODES[0]);
  const [activeTab, setActiveTab] = useState<'chart' | 'legal' | 'principles' | 'decision-making'>('chart');

  return (
    <section className="py-16 bg-[#FBFBFA] text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#2D6A4F]/20">
              <Scale className="w-3.5 h-3.5 text-[#2D6A4F]" />
              Operational Module 4: Structure &amp; Accountability
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
              Org Chart &amp; Governance: Who Does What
            </h2>
            <p className="text-sm text-[#6C757D] font-sans mt-2 max-w-2xl leading-relaxed">
              A distributed, multi-tiered legal and operational architecture designed to prevent corruption, centralize accountability, and guarantee moral legitimacy across 120 nations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('funding')}
              className="bg-[#0A2463] hover:bg-[#1E6091] text-white px-3.5 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              💰 Funding Model &amp; Budget →
            </button>
          </div>
        </div>

        {/* Sub-module Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'chart'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Users className="w-4 h-4 text-[#D4A017]" />
            Interactive Org Chart &amp; Bodies
          </button>

          <button
            onClick={() => setActiveTab('legal')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'legal'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Building className="w-4 h-4 text-[#1E6091]" />
            Multi-Entity Global Legal Structure
          </button>

          <button
            onClick={() => setActiveTab('principles')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'principles'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
            The 10 Governance Principles
          </button>

          <button
            onClick={() => setActiveTab('decision-making')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'decision-making'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-600" />
            Consent-Based Decision Framework
          </button>
        </div>

        {/* SUB-MODULE 1: INTERACTIVE ORG CHART */}
        {activeTab === 'chart' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Org Chart Tree Nodes */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Click any operational body to view mandates &amp; limits:
              </span>

              {GOVERNANCE_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-white border-[#0A2463] shadow-md ring-2 ring-[#0A2463]/20'
                        : 'bg-white hover:bg-gray-50 border-gray-200 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded ${
                          node.category === 'Strategic' ? 'bg-amber-100 text-amber-900' :
                          node.category === 'Executive' ? 'bg-blue-100 text-blue-900' :
                          node.category === 'Oversight' ? 'bg-red-100 text-red-900' :
                          node.category === 'Regional' ? 'bg-emerald-100 text-emerald-900' :
                          'bg-purple-100 text-purple-900'
                        }`}>
                          {node.category}
                        </span>
                        <span className="text-xs font-sans text-gray-500">
                          {node.headcount}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#0A2463]">
                        {node.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-sans mt-0.5">
                        Term: {node.termLimit}
                      </p>
                    </div>
                    <ArrowRight className={`w-4 h-4 mt-1 transition-transform ${isSelected ? 'text-[#0A2463] translate-x-1' : 'text-gray-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right side: Selected Node Inspector */}
            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#D4A017] block mb-1">
                    Operational Body Deep Dive
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                    {selectedNode.title}
                  </h3>
                </div>
                <div className="text-right text-xs font-sans">
                  <span className="font-bold text-[#0A2463] block">{selectedNode.headcount}</span>
                  <span className="text-gray-500">Term: {selectedNode.termLimit}</span>
                </div>
              </div>

              <div className="space-y-5 font-sans text-xs sm:text-sm">
                <div>
                  <h5 className="font-bold text-[#0A2463] uppercase tracking-wide text-xs mb-1">
                    Composition &amp; Representation Quota:
                  </h5>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200 leading-relaxed">
                    {selectedNode.composition}
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-[#0A2463] uppercase tracking-wide text-xs mb-1">
                    Core Mandate:
                  </h5>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedNode.mandate}
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-[#0A2463] uppercase tracking-wide text-xs mb-2">
                    Key Operational Responsibilities:
                  </h5>
                  <ul className="space-y-2 list-disc list-inside text-gray-700">
                    {selectedNode.keyResponsibilities.map((resp: string, i: number) => (
                      <li key={i} className="leading-relaxed">{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                  <span className="text-[11px] font-bold text-[#2D6A4F] uppercase tracking-wider block mb-1">
                    Accountability &amp; Recall Mechanism:
                  </span>
                  <p className="text-emerald-950 font-medium text-xs leading-relaxed">
                    {selectedNode.accountabilityMechanism}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SUB-MODULE 2: LEGAL STRUCTURE */}
        {activeTab === 'legal' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#1E6091] block mb-1">
                Swiss Neutrality &amp; Distributed Legal Entity
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                Multi-Jurisdiction Global Legal Architecture
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-1">
                Designed to maintain political neutrality, protect donor privacy where vulnerable, and prevent unilateral state seizure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
              <div className="p-5 rounded-2xl bg-[#FBFBFA] border border-gray-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                  🇨🇭
                </div>
                <strong className="text-sm font-bold text-[#0A2463] block">
                  Swiss Foundation (Geneva HQ)
                </strong>
                <p className="text-gray-600 leading-relaxed">
                  Holds global trademark, IP, and treaty copyright under Swiss law. Governed by the Federal Supervisory Board for Foundations. Total geopolitical neutrality.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FBFBFA] border border-gray-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  🇺🇸
                </div>
                <strong className="text-sm font-bold text-[#0A2463] block">
                  US 501(c)(3) Public Charity
                </strong>
                <p className="text-gray-600 leading-relaxed">
                  Facilitates tax-deductible contributions across the Americas and handles academic research partnerships with MIT, Harvard, and Stanford.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FBFBFA] border border-gray-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  🌍
                </div>
                <strong className="text-sm font-bold text-[#0A2463] block">
                  Decentralized National NGOs
                </strong>
                <p className="text-gray-600 leading-relaxed">
                  Legally incorporated grassroots entities in Kenya, India, Brazil, Japan, and Germany ensuring local fund deployment complies with national sovereignty.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODULE 3: 10 GOVERNANCE PRINCIPLES */}
        {activeTab === 'principles' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
                Ethical Safeguards &amp; Operational Constitution
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                The 10 Governance Principles
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
              {GOVERNANCE_PRINCIPLES.map((gp) => (
                <div key={gp.num} className="p-4 rounded-2xl bg-[#FBFBFA] border border-gray-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-[#0A2463] text-[#D4A017] flex items-center justify-center font-bold text-xs shrink-0">
                    {gp.num}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#0A2463] mb-1">{gp.title}</h5>
                    <p className="text-gray-600 leading-relaxed">{gp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-MODULE 4: CONSENT-BASED DECISION MAKING */}
        {activeTab === 'decision-making' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Sociocracy In Action
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                Consent-Based Decision Making Flowchart
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-1">
                How our councils pass policies without deadlock or authoritarian top-down decrees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-sans text-xs">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] font-bold text-[#0A2463] uppercase block">Step 1</span>
                <strong className="text-xs text-gray-900 mt-1 block">Present Proposal</strong>
                <p className="text-[11px] text-gray-600 mt-1">Written brief published 7 days prior to voting session.</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] font-bold text-[#1E6091] uppercase block">Step 2</span>
                <strong className="text-xs text-gray-900 mt-1 block">Clarifying Round</strong>
                <p className="text-[11px] text-gray-600 mt-1">Questions of fact only. No opinions or debates allowed.</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] font-bold text-[#2D6A4F] uppercase block">Step 3</span>
                <strong className="text-xs text-gray-900 mt-1 block">Brief Reactions</strong>
                <p className="text-[11px] text-gray-600 mt-1">Each member shares 60-second immediate gut feelings.</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] font-bold text-amber-700 uppercase block">Step 4</span>
                <strong className="text-xs text-gray-900 mt-1 block">Test Objections</strong>
                <p className="text-[11px] text-gray-600 mt-1">&quot;Does this cause catastrophic harm to our mission?&quot;</p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Step 5</span>
                <strong className="text-xs text-emerald-950 mt-1 block">Consented Action</strong>
                <p className="text-[11px] text-emerald-800 mt-1">Objections amended or resolved; proposal adopted.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
