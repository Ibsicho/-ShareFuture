import React, { useState } from 'react';
import { ViewTab } from '../types';
import { 
  MessageSquare, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw,
  Lightbulb,
  HeartHandshake
} from 'lucide-react';

interface AIDialogueGuideProps {
  onSelectTab: (tab: ViewTab) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  tips?: string[];
}

export const AIDialogueGuide: React.FC<AIDialogueGuideProps> = ({ onSelectTab }) => {
  const [targetPerson, setTargetPerson] = useState('Relative with opposing political views');
  const [topic, setTopic] = useState('Climate Policy & Economic Future');
  const [intention, setIntention] = useState<'understand' | 'connect' | 'change_mind'>('understand');
  const [primaryFear, setPrimaryFear] = useState<'angry' | 'polarized' | 'awkward'>('angry');
  
  // Interactive simulator chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I'm your Shared Future Dialogue Guide. Having conversations across political, cultural, or generational divides can feel nerve-wracking, but with the right intention and posture, adversaries turn into partners.\n\nWho are you preparing to speak with, and what is your primary intention?`,
      tips: [
        'Aim to understand, not win.',
        'Ask about their lived experiences, not abstract soundbites.',
        'Remember Ubuntu: "I am because we are."'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Dynamic question prompt generator based on chosen topic
  const sampleQuestions: { [key: string]: string[] } = {
    'Climate Policy & Economic Future': [
      '"When you think about the future of jobs and local energy, what concerns you most for your family?"',
      '"What experiences have shaped how you look at environmental regulations versus economic stability?"',
      '"Where do you think we can both agree on keeping our local water and air clean?"'
    ],
    'Political Polarization & Elections': [
      '"Can you tell me about the issues that matter to your daily life the most right now?"',
      '"What is something your side gets right that the other side misses, and what is something your side could do better?"',
      '"Even if we vote differently, what is something we both cherish about our community?"'
    ],
    'Historical Injustice & Healing': [
      '"How do you feel our ancestors\' histories still affect our community today?"',
      '"What would true acknowledgment look like for you that feels respectful rather than punitive?"',
      '"How can we work together on something concrete right now to build trust?"'
    ]
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // AI Guide constructive coaching simulation
    setTimeout(() => {
      let responseText = '';
      let coachingTips: string[] = [];

      const lower = userMsg.text.toLowerCase();

      if (lower.includes('angry') || lower.includes('shout') || lower.includes('fight') || lower.includes('yell')) {
        responseText = `When emotions spike, the nervous system enters fight-or-flight. If the other person raises their voice, try this de-escalation technique: take a slow breath, lower your own volume by 20%, and say: "I hear how much this matters to you. I want to listen calmly so I don't miss what you're saying."`;
        coachingTips = [
          'Lower your vocal volume when tension rises.',
          'Validate their emotional conviction without conceding points of fact.',
          'Take a brief pause for water before responding.'
        ];
      } else if (lower.includes('why') && (lower.includes('believe') || lower.includes('think'))) {
        responseText = `Notice how "Why do you think that?" can sometimes sound like an interrogation. A gentler reframing is: "What life experiences led you to feel strongly about this?" People rarely change minds through abstract logic; they open up through personal stories.`;
        coachingTips = [
          'Replace "Why do you think" with "How did you come to see it that way?"',
          'Acknowledge any shared values you hear (e.g. security, fairness, children\'s future).'
        ];
      } else {
        responseText = `That's a thoughtful approach. Keep your focus anchored on curiosity. Remember: your goal is not to convince them in one sitting, but to make it safe to talk again next week. That is how the culture shifts from negative rivalry to positive co-elevation.`;
        coachingTips = [
          'Listen for the unsaid need behind the words.',
          'Summarize what you heard: "If I understand right, you care most about..."',
          'End the conversation with gratitude for their time and honesty.'
        ];
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: responseText,
          tips: coachingTips
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <section className="py-16 bg-[#F5F6F8] text-[#1E2530]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10 pb-6 border-b border-gray-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1E6091]/10 text-[#1E6091] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#1E6091]/20">
            <Bot className="w-3.5 h-3.5 text-[#1E6091]" />
            Practical Technology · Part 5 Movement Strategy
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
            AI Dialogue Guide: Prepare for Difficult Conversations
          </h2>
          <p className="text-sm text-[#6C757D] font-sans mt-2 leading-relaxed">
            Practice and prepare before engaging someone with opposing political or cultural perspectives. Generate open questions, learn de-escalation posture, and replace anger with genuine curiosity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Conversation Setup & Question Generator */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Posture & Intention */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-[#0A2463] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />
                1. Set Your Intention &amp; Posture
              </h3>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block font-bold text-[#0A2463] mb-1">
                    Who are you speaking with?
                  </label>
                  <input
                    type="text"
                    value={targetPerson}
                    onChange={(e) => setTargetPerson(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#1E6091] focus:outline-none"
                    placeholder="e.g. Co-worker, parent, neighbor..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0A2463] mb-1">
                    What topic triggers polarization?
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#1E6091] focus:outline-none"
                  >
                    <option value="Climate Policy & Economic Future">Climate Policy &amp; Economic Future</option>
                    <option value="Political Polarization & Elections">Political Polarization &amp; Elections</option>
                    <option value="Historical Injustice & Healing">Historical Injustice &amp; Healing</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0A2463] mb-1">
                    Your Primary Intention:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setIntention('understand')}
                      className={`p-2 rounded-lg border font-semibold text-center transition-all ${
                        intention === 'understand'
                          ? 'bg-[#0A2463] text-white border-[#0A2463]'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      Understand
                    </button>
                    <button
                      type="button"
                      onClick={() => setIntention('connect')}
                      className={`p-2 rounded-lg border font-semibold text-center transition-all ${
                        intention === 'connect'
                          ? 'bg-[#0A2463] text-white border-[#0A2463]'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      Connect
                    </button>
                    <button
                      type="button"
                      onClick={() => setIntention('change_mind')}
                      className={`p-2 rounded-lg border font-semibold text-center transition-all ${
                        intention === 'change_mind'
                          ? 'bg-[#0A2463] text-white border-[#0A2463]'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      Influence
                    </button>
                  </div>
                  {intention === 'change_mind' && (
                    <p className="text-[11px] text-amber-700 mt-1 font-semibold">
                      💡 Pro-tip: Aiming to change someone&apos;s mind directly often triggers defensive armor. Focusing first on understanding lowers their guard naturally.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Generated Curious Questions for this topic */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-[#0A2463] mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#D4A017]" />
                Curious Question Starters
              </h3>
              <p className="text-xs text-[#6C757D] font-sans mb-3">
                Tap any question to copy it directly into your practice conversation:
              </p>

              <div className="space-y-2">
                {(sampleQuestions[topic] || sampleQuestions['Climate Policy & Economic Future']).map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputMessage(q.replace(/^"|"$/g, ''))}
                    className="w-full text-left p-2.5 rounded-xl bg-[#FBFBFA] hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all text-xs font-sans text-[#2B2D42] italic group"
                  >
                    <span className="text-[#1E6091] font-bold not-italic mr-1">Q{idx + 1}:</span>
                    {q}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Coaching Chat Simulator */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col h-[640px] overflow-hidden">
            
            {/* Chat header */}
            <div className="bg-[#0A2463] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1E6091] flex items-center justify-center text-lg">
                  🤖
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">
                    Dialogue Coach &amp; Empathy Assistant
                  </h4>
                  <p className="text-[11px] text-[#A8DADC] font-sans">
                    Guiding you through difficult conversation scenarios
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatMessages([chatMessages[0]])}
                className="text-xs text-white/70 hover:text-white flex items-center gap-1 bg-white/10 px-2 py-1 rounded"
                title="Reset conversation"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Chat message stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs bg-[#FBFBFA]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-[#0A2463] text-white flex items-center justify-center shrink-0 text-xs">
                      🤖
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-4 ${
                    msg.sender === 'user'
                      ? 'bg-[#0A2463] text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-[#2B2D42] rounded-tl-none shadow-xs'
                  }`}>
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    
                    {/* Optional coaching tips box */}
                    {msg.tips && msg.tips.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100 bg-amber-50/50 p-2.5 rounded-lg text-[11px] text-amber-900 space-y-1">
                        <strong className="block text-[#0A2463] font-bold">✨ Key De-escalation Rules:</strong>
                        <ul className="list-disc list-inside space-y-0.5">
                          {msg.tips.map((t, idx) => (
                            <li key={idx}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-[#D4A017] text-[#0A2463] font-bold flex items-center justify-center shrink-0 text-xs">
                      You
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-gray-500 italic p-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span>AI Dialogue Guide is formulating coaching tips...</span>
                </div>
              )}
            </div>

            {/* Chat input box */}
            <form onSubmit={handleSendMessage} className="p-3.5 bg-white border-t border-gray-200 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a scenario or draft response (e.g. 'What if they call my opinion foolish?')..."
                className="flex-1 px-4 py-2.5 text-xs font-sans rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
              />
              <button
                type="submit"
                className="bg-[#0A2463] hover:bg-[#1E6091] text-white p-2.5 rounded-xl transition-all shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
