import React, { useState } from 'react';
import { PRESS_RELEASE_DATA } from '../data/operationalModulesData';
import { ViewTab } from '../types';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  Share2, 
  Mail, 
  Phone, 
  MapPin, 
  HelpCircle, 
  Download, 
  Globe,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface PressReleaseModuleProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const PressReleaseModule: React.FC<PressReleaseModuleProps> = ({ onSelectTab }) => {
  const [copied, setCopied] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'release' | 'factsheet' | 'spokespersons' | 'qa' | 'assets'>('release');

  const copyFullRelease = () => {
    const fullText = `${PRESS_RELEASE_DATA.distributionDate}\n\n${PRESS_RELEASE_DATA.dateline}\n\n${PRESS_RELEASE_DATA.headline}\n\n${PRESS_RELEASE_DATA.subhead}\n\n` +
      PRESS_RELEASE_DATA.bodyParagraphs.join('\n\n') +
      `\n\n###\n\nMedia Contacts:\n` +
      PRESS_RELEASE_DATA.mediaContacts.map(c => `${c.name} — ${c.title}\nEmail: ${c.email} | Phone: ${c.phone} | ${c.location}`).join('\n\n') +
      `\n\n${PRESS_RELEASE_DATA.boilerplate}`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-16 bg-[#FBFBFA] text-[#1E2530]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1E6091]/10 text-[#1E6091] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#1E6091]/20">
              <FileText className="w-3.5 h-3.5 text-[#1E6091]" />
              Operational Module 3: Media &amp; Wire Launch Kit
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
              Official Press Release &amp; Global Newsroom
            </h2>
            <p className="text-sm text-[#6C757D] font-sans mt-2 max-w-2xl leading-relaxed">
              Publication-grade media materials, embargo instructions, accredited spokesperson contacts, and journalist briefing dossiers for the global announcement.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-white hover:bg-gray-50 border border-gray-300 text-[#0A2463] px-3.5 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-gray-600" />
              Print / Save PDF
            </button>
            <button
              onClick={copyFullRelease}
              className="bg-[#0A2463] hover:bg-[#1E6091] text-white px-4 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#D4A017]" />}
              {copied ? 'Copied to Wire' : 'Copy Full Press Release'}
            </button>
          </div>
        </div>

        {/* Media Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveMediaTab('release')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeMediaTab === 'release'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <FileText className="w-4 h-4 text-[#D4A017]" />
            Official Press Release (Draft Wire)
          </button>

          <button
            onClick={() => setActiveMediaTab('factsheet')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeMediaTab === 'factsheet'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#1E6091]" />
            Media Fact Sheet &amp; Fast Data
          </button>

          <button
            onClick={() => setActiveMediaTab('spokespersons')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeMediaTab === 'spokespersons'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Mail className="w-4 h-4 text-[#2D6A4F]" />
            Spokesperson Roster &amp; Press Bureaus
          </button>

          <button
            onClick={() => setActiveMediaTab('qa')}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeMediaTab === 'qa'
                ? 'bg-[#0A2463] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            Journalist Q&amp;A &amp; Interview Soundbites
          </button>
        </div>

        {/* SUB-MODULE 1: OFFICIAL PRESS RELEASE WIRE */}
        {activeMediaTab === 'release' && (
          <div className="bg-white border border-gray-300 rounded-3xl p-6 sm:p-12 shadow-md">
            {/* Dateline banner */}
            <div className="border-b-2 border-gray-900 pb-4 mb-6">
              <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-red-700 mb-1">
                {PRESS_RELEASE_DATA.distributionDate}
              </div>
              <div className="text-xs font-sans font-bold text-gray-500">
                WIRE SERVICE SOURCE: THE SHARED FUTURE PROJECT GLOBAL SECRETARIAT
              </div>
            </div>

            {/* Headline */}
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-gray-900 tracking-tight leading-snug mb-3">
              {PRESS_RELEASE_DATA.headline}
            </h3>

            <p className="font-serif italic text-base sm:text-lg text-gray-700 mb-8 border-l-4 border-[#D4A017] pl-4">
              {PRESS_RELEASE_DATA.subhead}
            </p>

            {/* Body paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm font-serif leading-relaxed text-gray-800">
              {PRESS_RELEASE_DATA.bodyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Wire Ending Marks */}
            <div className="text-center font-bold text-gray-400 my-8 text-sm tracking-widest">
              ###
            </div>

            {/* Media Contacts Roster */}
            <div className="bg-[#FBFBFA] p-6 rounded-2xl border border-gray-200 mb-8">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#0A2463] mb-4">
                Accredited Press Officers &amp; Interview Booking:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
                {PRESS_RELEASE_DATA.mediaContacts.map((contact, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 space-y-1">
                    <strong className="text-[#0A2463] block font-bold text-sm">{contact.name}</strong>
                    <span className="text-gray-500 block text-[11px]">{contact.title}</span>
                    <div className="flex items-center gap-1.5 text-gray-600 pt-1">
                      <Mail className="w-3 h-3 text-[#1E6091]" />
                      <a href={`mailto:${contact.email}`} className="text-[#1E6091] hover:underline font-medium">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 text-[11px]">
                      <Phone className="w-3 h-3 text-[#2D6A4F]" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                      <MapPin className="w-3 h-3 text-[#D4A017]" />
                      <span>{contact.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Boilerplate */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-sans text-gray-600 leading-relaxed">
              <strong className="text-gray-900 block mb-1">About The Shared Future Project:</strong>
              {PRESS_RELEASE_DATA.boilerplate}
            </div>
          </div>
        )}

        {/* SUB-MODULE 2: FACT SHEET */}
        {activeMediaTab === 'factsheet' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#1E6091] block mb-1">
                Fast Reference For Editors &amp; Reporters
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                The Shared Future Project: Fact Sheet &amp; Statistics
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
              <div className="space-y-3">
                <h4 className="font-bold text-[#0A2463] uppercase tracking-wide text-xs">The Problem By The Numbers</h4>
                <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 space-y-1">
                  <strong className="text-red-950 block text-sm">$2.4 Trillion Annual Military Spending</strong>
                  <p className="text-red-800">Global arms expenditures reached an all-time peak in 2024 (SIPRI).</p>
                </div>
                <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 space-y-1">
                  <strong className="text-red-950 block text-sm">424 ppm Atmospheric CO2</strong>
                  <p className="text-red-800">1.5°C Paris warming threshold breached in consecutive rolling months.</p>
                </div>
                <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 space-y-1">
                  <strong className="text-red-950 block text-sm">45% Wealth in 1% Hands</strong>
                  <p className="text-red-800">Global wealth gap at widest point since the 1920s (Oxfam).</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-[#2D6A4F] uppercase tracking-wide text-xs">The Solution By The Numbers</h4>
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                  <strong className="text-emerald-950 block text-sm">$200 Billion Annual Peace Dividend</strong>
                  <p className="text-emerald-800">10% military reallocation funds clean water ($40B), basic healthcare ($35B), and clean microgrids ($50B).</p>
                </div>
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                  <strong className="text-emerald-950 block text-sm">150,000 Dialogue Circles</strong>
                  <p className="text-emerald-800">6-person monthly citizen circles meeting across 120 nations by 2028.</p>
                </div>
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                  <strong className="text-emerald-950 block text-sm">10 Million Youth Peace Corps</strong>
                  <p className="text-emerald-800">Target deployment of cross-border youth by 2035.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODULE 3: SPOKESPERSON ROSTER */}
        {activeMediaTab === 'spokespersons' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
                Global Media Roster
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                Authorized Spokespersons &amp; Topic Experts
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-1">
                Available for live TV, radio, and print interviews in English, French, Spanish, Arabic, and Mandarin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
              <div className="p-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold text-[#0A2463]">Dr. Amina Diallo</strong>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">Diplomacy &amp; UN</span>
                </div>
                <p className="text-gray-600">Former Assistant Secretary-General; expert on the UN Resolution and African regional reconciliation.</p>
                <div className="text-[11px] text-gray-500 pt-1">Location: Geneva / Nairobi · Languages: English, French, Swahili</div>
              </div>

              <div className="p-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold text-[#0A2463]">Prof. Kenji Takahashi</strong>
                  <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-semibold">AI Safety &amp; Tech</span>
                </div>
                <p className="text-gray-600">Pioneer in autonomous system safety; author of the International AI Safety Agency (IASA) inspection protocols.</p>
                <div className="text-[11px] text-gray-500 pt-1">Location: Tokyo / London · Languages: English, Japanese</div>
              </div>

              <div className="p-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold text-[#0A2463]">Maria Santos-Silva</strong>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Grassroots &amp; Youth</span>
                </div>
                <p className="text-gray-600">Coordinator of the 150,000 Dialogue Circles Network and World Youth Peace Corps initiative.</p>
                <div className="text-[11px] text-gray-500 pt-1">Location: São Paulo · Languages: Portuguese, Spanish, English</div>
              </div>

              <div className="p-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold text-[#0A2463]">David K. Thorne</strong>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">Economics &amp; Peace Dividend</span>
                </div>
                <p className="text-gray-600">Macroeconomist specializing in defense budget conversion and the Global Carbon Price adaptation fund.</p>
                <div className="text-[11px] text-gray-500 pt-1">Location: New York / Washington · Languages: English</div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODULE 4: JOURNALIST Q&A */}
        {activeMediaTab === 'qa' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Interview Prep &amp; Tough Questions
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0A2463]">
                Journalist Q&amp;A &amp; Soundbite Cheat Sheet
              </h3>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <strong className="text-[#0A2463] text-sm block mb-1">
                  Q1: &quot;Why would competing superpowers like the US and China ever agree to a Peace Dividend or AI Treaty?&quot;
                </strong>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Soundbite:</strong> &quot;Because in a world of autonomous AI weapons and runaway climate tipping points, zero-sum competition is suicide. Even during the height of the Cold War, the US and USSR signed the Non-Proliferation Treaty because mutual survival came before ideology. We are simply applying that exact logic to the 21st century.&quot;
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <strong className="text-[#0A2463] text-sm block mb-1">
                  Q2: &quot;Can ordinary citizens really influence geopolitical weapons budgets through 6-person circles?&quot;
                </strong>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Soundbite:</strong> &quot;Every major treaty started as an uncomfortable conversation in a living room. When citizens stop falling for outrage politics and demand that our taxes heal rather than destroy, politicians have no choice but to follow. The politicians aren&apos;t leading; we are giving them an exit ramp.&quot;
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <strong className="text-[#0A2463] text-sm block mb-1">
                  Q3: &quot;What makes this different from past UN resolutions that were ignored?&quot;
                </strong>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Soundbite:</strong> &quot;Two things: First, economic incentives. The Positive Competition Charter rewards nations with concrete trade preferences and credit ratings for meeting SDG milestones. Second, a mobilized grassroots network of 10 million youth holding leaders directly accountable.&quot;
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
