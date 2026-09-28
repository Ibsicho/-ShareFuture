import React, { useState, useEffect, useRef } from 'react';
import { SPEECH_VERSIONS } from '../data/operationalModulesData';
import { ViewTab } from '../types';
import { 
  Mic, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Clock, 
  FileText, 
  Sparkles, 
  Sliders, 
  Maximize2,
  Minimize2,
  ChevronDown,
  Layers
} from 'lucide-react';

interface SpeechCollectionProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const SpeechCollection: React.FC<SpeechCollectionProps> = ({ onSelectTab }) => {
  const [selectedSpeechId, setSelectedSpeechId] = useState<string>('ted-18');
  const [isTeleprompterMode, setIsTeleprompterMode] = useState<boolean>(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // 1 = slow, 2 = med, 3 = fast
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const teleprompterRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<any>(null);

  const activeSpeech = SPEECH_VERSIONS.find(s => s.id === selectedSpeechId) || SPEECH_VERSIONS[0];

  // Auto-scroll loop for teleprompter mode
  useEffect(() => {
    if (isAutoScrolling && teleprompterRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        if (teleprompterRef.current) {
          teleprompterRef.current.scrollTop += scrollSpeed;
        }
      }, 35);
    } else {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    }
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [isAutoScrolling, scrollSpeed]);

  // Audio Speech Synthesis
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      // Assemble speech text
      const fullText = activeSpeech.script.map(s => `${s.sectionTitle}. ${s.content}`).join('\n\n');
      const utterance = new SpeechSynthesisUtterance(fullText.slice(0, 3000)); // preview first 3000 chars
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const copyFullScript = () => {
    const fullText = `${activeSpeech.title}\nSetting: ${activeSpeech.setting}\nAudience: ${activeSpeech.audience}\n\n` +
      activeSpeech.script.map(s => `[${s.timestamp}] ${s.sectionTitle}\nNotes: ${s.deliveryNotes}\n\n${s.content}`).join('\n\n---\n\n');
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section className="py-16 bg-[#FBFBFA] text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#D4A017]/10 text-[#0A2463] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#D4A017]/30">
              <Mic className="w-3.5 h-3.5 text-[#D4A017]" />
              Operational Module 2: Keynote &amp; Oratory Architecture
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
              The 18-Minute TED Talk &amp; Speech Collection
            </h2>
            <p className="text-sm text-[#6C757D] font-sans mt-2 max-w-2xl leading-relaxed">
              Complete, stage-tested oratory manuscripts engineered with exact timestamps, vocal dynamic cues, and slide timing — adaptable from 3-minute elevator soundbites to the flagship 18-minute TED keynote.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('campaign')}
              className="bg-white hover:bg-gray-50 border border-gray-300 text-[#0A2463] px-3.5 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-colors"
            >
              📢 Campaign Strategy
            </button>
            <button
              onClick={() => onSelectTab('press-release')}
              className="bg-[#0A2463] hover:bg-[#1E6091] text-white px-3.5 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              📰 Media Press Release
            </button>
          </div>
        </div>

        {/* Speech Length Selector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {SPEECH_VERSIONS.map((speech) => {
            const isSelected = speech.id === selectedSpeechId;
            return (
              <button
                key={speech.id}
                onClick={() => {
                  setSelectedSpeechId(speech.id);
                  if (isPlayingAudio) {
                    window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                  }
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#0A2463] text-white border-[#0A2463] shadow-md ring-2 ring-[#D4A017]/40'
                    : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-[#D4A017] text-[#0A2463]' : 'bg-gray-100 text-gray-700'
                  }`}>
                    ⏱️ {speech.duration}
                  </span>
                  <span className={`text-[11px] font-sans ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                    ~{speech.wordCount} words
                  </span>
                </div>
                <div className={`font-serif font-bold text-sm mt-2 ${isSelected ? 'text-white' : 'text-[#0A2463]'}`}>
                  {speech.title.split(':')[0]}
                </div>
                <div className={`text-xs font-sans mt-0.5 truncate ${isSelected ? 'text-[#D4A017]' : 'text-[#1E6091]'}`}>
                  {speech.setting}
                </div>
              </button>
            );
          })}
        </div>

        {/* Teleprompter Control Toolbar */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTeleprompterMode(!isTeleprompterMode)}
              className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                isTeleprompterMode
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-[#0A2463]" />
              {isTeleprompterMode ? 'Teleprompter Stage Mode (Active)' : 'Enter Stage Teleprompter'}
            </button>

            {isTeleprompterMode && (
              <>
                <button
                  onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    isAutoScrolling ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {isAutoScrolling ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  {isAutoScrolling ? 'Pause Scroll' : 'Start Auto-Scroll'}
                </button>

                <div className="flex items-center gap-1 text-gray-600 ml-1">
                  <span>Speed:</span>
                  {[1, 2, 3].map(spd => (
                    <button
                      key={spd}
                      onClick={() => setScrollSpeed(spd)}
                      className={`w-6 h-6 rounded text-xs font-bold ${
                        scrollSpeed === spd ? 'bg-[#0A2463] text-white' : 'bg-gray-100'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Font Size Selector */}
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-[11px]">Font:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded text-xs ${fontSize === 'normal' ? 'bg-[#0A2463] text-white font-bold' : 'bg-gray-100'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-sm ${fontSize === 'large' ? 'bg-[#0A2463] text-white font-bold' : 'bg-gray-100'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded text-base font-bold ${fontSize === 'xlarge' ? 'bg-[#0A2463] text-white' : 'bg-gray-100'}`}
              >
                A++
              </button>
            </div>

            {/* Listen / Voice readout */}
            <button
              onClick={handleToggleAudio}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-[#0A2463] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                  <span>Stop Vocal Readout</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#1E6091]" />
                  <span>Vocal Preview</span>
                </>
              )}
            </button>

            {/* Copy Script */}
            <button
              onClick={copyFullScript}
              className="bg-[#0A2463] hover:bg-[#1E6091] text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4A017]" />}
              <span>{copied ? 'Copied' : 'Copy Script'}</span>
            </button>
          </div>
        </div>

        {/* The Script Document Viewer / Stage Teleprompter */}
        <div 
          ref={teleprompterRef}
          className={`border rounded-3xl p-6 sm:p-12 transition-all overflow-y-auto ${
            isTeleprompterMode
              ? 'bg-gray-950 text-white border-gray-800 shadow-2xl h-[700px]'
              : 'bg-white text-gray-900 border-gray-200 shadow-sm'
          }`}
        >
          {/* Document Header */}
          <div className="text-center max-w-3xl mx-auto pb-8 mb-8 border-b border-gray-200/40">
            <span className={`text-xs uppercase font-sans font-bold tracking-widest block mb-2 ${
              isTeleprompterMode ? 'text-[#D4A017]' : 'text-[#1E6091]'
            }`}>
              THE SHARED FUTURE PROJECT · ORATORY SCRIPT ARCHIVE
            </span>
            <h3 className={`font-serif font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight ${
              isTeleprompterMode ? 'text-white' : 'text-[#0A2463]'
            }`}>
              {activeSpeech.title}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs font-sans text-gray-400">
              <span>⏱️ Expected Duration: <strong>{activeSpeech.duration}</strong></span>
              <span>•</span>
              <span>Audience: <strong>{activeSpeech.audience}</strong></span>
              <span>•</span>
              <span>Visuals: <strong>{activeSpeech.slidesRecommended} Slides</strong></span>
            </div>
          </div>

          {/* Script Sections */}
          <div className="space-y-12 max-w-4xl mx-auto">
            {activeSpeech.script.map((sec, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border transition-all ${
                  isTeleprompterMode 
                    ? 'bg-gray-900/60 border-gray-800' 
                    : 'bg-[#FBFBFA] border-gray-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-200/30">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#D4A017] text-[#0A2463] font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className={`font-serif font-bold text-lg ${
                      isTeleprompterMode ? 'text-[#D4A017]' : 'text-[#0A2463]'
                    }`}>
                      {sec.sectionTitle}
                    </h4>
                  </div>
                  <span className="text-xs font-sans font-semibold text-gray-400 bg-black/20 px-2.5 py-1 rounded">
                    {sec.timestamp}
                  </span>
                </div>

                {/* Delivery Coaching & Slide cues */}
                <div className="space-y-2 mb-6 font-sans text-xs">
                  <div className={`p-3 rounded-xl border flex items-start gap-2 ${
                    isTeleprompterMode ? 'bg-blue-950/40 text-blue-200 border-blue-900' : 'bg-blue-50 text-blue-900 border-blue-100'
                  }`}>
                    <Mic className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
                    <div>
                      <strong>Stage Delivery Note:</strong> {sec.deliveryNotes}
                    </div>
                  </div>

                  {sec.slideVisualCue && (
                    <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-[11px] ${
                      isTeleprompterMode ? 'bg-amber-950/30 text-amber-200 border-amber-900' : 'bg-amber-50 text-amber-900 border-amber-100'
                    }`}>
                      <Layers className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
                      <div>
                        <strong>Screen Visual:</strong> {sec.slideVisualCue}
                      </div>
                    </div>
                  )}
                </div>

                {/* Spoken Content Text */}
                <div className={`font-serif leading-relaxed whitespace-pre-line ${
                  fontSize === 'normal' 
                    ? 'text-base sm:text-lg' 
                    : fontSize === 'large' 
                    ? 'text-lg sm:text-xl' 
                    : 'text-xl sm:text-2xl font-medium'
                } ${
                  isTeleprompterMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {sec.content}
                </div>
              </div>
            ))}
          </div>

          {/* End of Speech Note */}
          <div className="mt-12 pt-8 border-t border-gray-200/30 text-center text-xs font-sans text-gray-500">
            [END OF MANUSCRIPT — STAGE LIGHTS FADE TO BLACK — HOLD FOR FINAL APPLAUSE]
          </div>
        </div>

        {/* Audience Adaptations & Stagecraft Tips Box */}
        <div className="mt-12 bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <h4 className="font-serif font-bold text-xl text-[#0A2463] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4A017]" />
            Audience Customization Matrix &amp; Tough Q&amp;A Defense
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-4 rounded-2xl bg-[#FBFBFA] border border-gray-200">
              <strong className="text-[#0A2463] block mb-1">For Skeptical Business Leaders:</strong>
              <p className="text-gray-600 leading-relaxed">
                Frame the Peace Dividend not as charity, but as massive new market creation. A peaceful Africa and clean energy grid creates $12 Trillion in high-ROI infrastructure investments.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FBFBFA] border border-gray-200">
              <strong className="text-[#1E6091] block mb-1">For National Security Hawks:</strong>
              <p className="text-gray-600 leading-relaxed">
                Emphasize that autonomous weapons proliferation and biosecurity leaks threaten all sovereign states equally. Multilateral verification protects our homeland better than uninspected arms races.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FBFBFA] border border-gray-200">
              <strong className="text-[#2D6A4F] block mb-1">For Cynical Youth:</strong>
              <p className="text-gray-600 leading-relaxed">
                Remind them that despair is the goal of entrenched interests. Taking action through the World Youth Peace Corps turns climate anxiety into tangible physical community regeneration.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
