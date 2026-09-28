import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Award,
  Globe,
  Printer
} from 'lucide-react';

interface ManifestoAndResolutionProps {
  signatoryCount: number;
  onSign: (name: string, country: string) => void;
  userSigned: boolean;
  signerName: string;
}

export const ManifestoAndResolution: React.FC<ManifestoAndResolutionProps> = ({
  signatoryCount,
  onSign,
  userSigned,
  signerName
}) => {
  const [activeDoc, setActiveDoc] = useState<'manifesto' | 'un-resolution'>('manifesto');
  const [formName, setFormName] = useState('');
  const [formCountry, setFormCountry] = useState('Global Citizen');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  // Audio Speech Synthesis for Manifesto recitation
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `The Declaration of Interdependence. We, the peoples of Earth, across every nation, faith, ethnicity, and ideology, recognize that we share one planet, one atmosphere, one ocean, one genome, one destiny. We declare: Dignity. Truth. Justice. Cooperation. Stewardship. And Hope. We commit to heal, not harm. To build, not burn. To unite, not divide. To turn adversaries into partners, and partners into family.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    onSign(formName.trim(), formCountry.trim() || 'Global Citizen');
  };

  const copyResolutionToClipboard = () => {
    const resolutionText = `UNITED NATIONS GENERAL ASSEMBLY
Draft Resolution A/RES/SHARED-FUTURE
Co-sponsored by: [All willing member states]
Title: Establishing a Framework for Positive Competition, Historical Healing, and Shared Prosperity for All Humanity

The General Assembly,
Recalling the UN Charter's pledge to save succeeding generations from the scourge of war,
Recognizing that humanity faces existential, interconnected threats — climate disruption, uncontrolled AI weapons, pandemics, nuclear war, and extreme inequality,
Deeply concerned that polarization between nations and peoples is accelerating toward catastrophic conflict,
Affirming that competition is healthy when it elevates all and destructive when it eliminates some,

1. ESTABLISHES the Global Council for Shared Future (GCSF) — 30 members with rotating regional representation.
2. PROCLAIMS a Global Ceasefire Initiative — All active conflicts enter mediated negotiation within 12 months.
3. CREATES the Historical Healing & Reconciliation Commission — Truth-first, dignity-centered restoration fund.
4. ADOPTS the Positive Competition Charter — Nations compete on SDG progress, clean energy, and wellbeing.
5. MANDATES the International AI Safety Agency (IASA) — Modeled on IAEA, banning autonomous lethal weapons.
6. DECLARES a Global Carbon Price (2027) — $50 to $150/ton with revenue shared for adaptation.
7. ESTABLISHES the Global Peace Dividend — Redirecting 10% of global military spending ($200B/yr) to SDGs.
8. FOUNDS the World Youth Peace Corps — 10 million cross-border youth by 2035.
9. PROTECTS the Global Commons — Oceans, atmosphere, Antarctica, outer space, and cyberspace governed collectively.
10. DECLARES 2025–2035 "The Decade of Healing and Shared Prosperity".`;

    navigator.clipboard.writeText(resolutionText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section className="py-16 bg-[#FBFBFA] text-[#1E2530]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Document Switcher Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveDoc('manifesto')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-bold transition-all flex items-center gap-2 ${
                activeDoc === 'manifesto'
                  ? 'bg-[#0A2463] text-white shadow-sm'
                  : 'bg-white text-[#6C757D] hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D4A017]" />
              The Declaration of Interdependence (Manifesto)
            </button>
            <button
              onClick={() => setActiveDoc('un-resolution')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-bold transition-all flex items-center gap-2 ${
                activeDoc === 'un-resolution'
                  ? 'bg-[#0A2463] text-white shadow-sm'
                  : 'bg-white text-[#6C757D] hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <FileText className="w-4 h-4 text-[#1E6091]" />
              Draft UN Resolution A/RES/SHARED-FUTURE
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans">
            {activeDoc === 'manifesto' && (
              <button
                onClick={handleToggleAudio}
                className="bg-white hover:bg-gray-50 border border-gray-300 text-[#0A2463] px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-colors"
                title="Listen to the Declaration"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-600 animate-pulse" />
                    <span>Stop Reading</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#1E6091]" />
                    <span>Listen Aloud</span>
                  </>
                )}
              </button>
            )}
            {activeDoc === 'un-resolution' && (
              <button
                onClick={copyResolutionToClipboard}
                className="bg-white hover:bg-gray-50 border border-gray-300 text-[#0A2463] px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#1E6091]" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Resolution'}</span>
              </button>
            )}
          </div>
        </div>

        {activeDoc === 'manifesto' ? (
          /* MANIFESTO / DECLARATION OF INTERDEPENDENCE */
          <div className="bg-white border border-[#D4A017]/30 rounded-3xl p-6 sm:p-12 shadow-xl relative overflow-hidden">
            {/* Elegant corner watermark styling */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#D4A017]/10 to-transparent pointer-events-none rounded-bl-full"></div>

            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#D4A017] block mb-2">
                FOUNDING MANIFESTO · OPEN SOURCE FOR HUMANITY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A2463] tracking-tight">
                The Declaration of Interdependence
              </h2>
              <div className="w-16 h-1 bg-[#D4A017] mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Preamble */}
            <div className="mb-10 text-center max-w-3xl mx-auto">
              <h3 className="font-serif italic text-lg text-[#1E6091] mb-4">Preamble</h3>
              <p className="font-serif text-base sm:text-lg text-[#2B2D42] leading-relaxed">
                We, the peoples of Earth — across every nation, faith, ethnicity, language, and ideology — recognize that:
              </p>
              <ul className="mt-4 space-y-2 text-sm sm:text-base font-sans text-[#2B2D42] max-w-2xl mx-auto text-left list-disc list-inside bg-[#FDFCDC]/50 p-4 rounded-xl border border-[#D4A017]/20">
                <li>We share one planet, one atmosphere, one ocean, one genome, one future.</li>
                <li>Our ancestors&apos; wounds — colonialism, war, slavery, genocide, partition — still bleed into today.</li>
                <li>Our current trajectory leads to mutual destruction: climate collapse, nuclear war, AI catastrophe, endless conflict.</li>
                <li><strong className="text-[#0A2463]">We refuse this future. We choose another.</strong></li>
              </ul>
            </div>

            {/* The 6 Declarations */}
            <div className="mb-10">
              <h3 className="text-center font-sans font-bold text-xs uppercase tracking-widest text-[#0A2463] mb-6">
                We Solemnly Declare:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                  <span className="text-xs font-sans font-bold text-[#D4A017] uppercase">1. Dignity</span>
                  <p className="text-sm font-sans text-[#2B2D42] mt-1">
                    Every human life has equal worth, regardless of border, belief, or birth.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                  <span className="text-xs font-sans font-bold text-[#D4A017] uppercase">2. Truth</span>
                  <p className="text-sm font-sans text-[#2B2D42] mt-1">
                    We will acknowledge historical wrongs without weaponizing them for vengeance.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                  <span className="text-xs font-sans font-bold text-[#D4A017] uppercase">3. Justice</span>
                  <p className="text-sm font-sans text-[#2B2D42] mt-1">
                    We will correct systems of exploitation, not punish living generations for ancestors&apos; sins.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                  <span className="text-xs font-sans font-bold text-[#D4A017] uppercase">4. Cooperation</span>
                  <p className="text-sm font-sans text-[#2B2D42] mt-1">
                    We will compete to improve and elevate, never to destroy or eliminate the other.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                  <span className="text-xs font-sans font-bold text-[#D4A017] uppercase">5. Stewardship</span>
                  <p className="text-sm font-sans text-[#2B2D42] mt-1">
                    The Earth is not ours to conquer, but to protect for those unborn.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FBFBFA] border border-gray-200">
                  <span className="text-xs font-sans font-bold text-[#D4A017] uppercase">6. Hope</span>
                  <p className="text-sm font-sans text-[#2B2D42] mt-1">
                    We choose to believe a better world is possible, and to build it daily through action.
                  </p>
                </div>
              </div>
            </div>

            {/* Commitments */}
            <div className="bg-[#0A2463] text-white rounded-2xl p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-md">
              <span className="text-xs uppercase font-sans tracking-widest text-[#D4A017] font-bold block mb-2">
                Our Sacred Covenant
              </span>
              <p className="font-serif text-xl sm:text-2xl font-bold leading-snug mb-3">
                &quot;To heal, not harm. To build, not burn. To unite, not divide.
                To turn adversaries into partners, and partners into family.&quot;
              </p>
              <p className="text-xs text-[#A8DADC] font-sans">
                Signed in spirit by every human who chooses this path.
              </p>
            </div>

            {/* Interactive Signing Form & Badge */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              {userSigned ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center max-w-xl mx-auto">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 text-2xl">
                    ✓
                  </div>
                  <h4 className="font-serif font-bold text-xl text-emerald-950">
                    Thank You, {signerName}!
                  </h4>
                  <p className="text-xs font-sans text-emerald-800 mt-1">
                    Your name has been inscribed in the official Declaration of Interdependence ledger alongside{' '}
                    <span className="font-bold">{signatoryCount.toLocaleString()}</span> fellow global citizens.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-sans font-bold">
                    <Award className="w-4 h-4 text-[#D4A017]" />
                    Verified Global Signatory #SF-{signatoryCount}
                  </div>
                </div>
              ) : (
                <div className="max-w-xl mx-auto bg-[#FBFBFA] border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="text-center mb-5">
                    <h4 className="font-serif font-bold text-xl text-[#0A2463]">
                      Inscribe Your Name
                    </h4>
                    <p className="text-xs text-[#6C757D] font-sans mt-1">
                      Join {signatoryCount.toLocaleString()} signatories worldwide pledging for peace and co-elevation.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-3 font-sans">
                    <div>
                      <label className="block text-xs font-bold text-[#0A2463] mb-1">
                        Full Name or Moniker:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Amara Okafor / Elena Rossi"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0A2463] mb-1">
                        Country or Community:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Kenya / Brazil / Global Citizen"
                        value={formCountry}
                        onChange={(e) => setFormCountry(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
                      />
                    </div>
                    <div className="flex items-start gap-2 pt-1 text-xs text-[#6C757D]">
                      <input type="checkbox" required id="commit-check" className="mt-0.5 rounded text-[#0A2463]" />
                      <label htmlFor="commit-check" className="leading-tight">
                        I commit to heal, not harm; to compete to elevate; and to practice daily bridge-building.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 bg-[#D4A017] hover:bg-[#b98a12] text-[#0A2463] font-bold py-2.5 rounded-xl text-xs shadow transition-all active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      Sign The Declaration of Interdependence
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* DRAFT UN RESOLUTION */
          <div className="bg-white border border-gray-300 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="border-b-2 border-gray-800 pb-6 mb-8 text-center">
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-[#1E6091] mb-1">
                UNITED NATIONS GENERAL ASSEMBLY · EIGHTIETH SESSION
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Draft Resolution A/RES/SHARED-FUTURE
              </h2>
              <p className="text-xs font-sans text-gray-600 mt-2">
                Sponsors: [Co-sponsored by all willing member states] · Agenda Item: Global Peace &amp; Survival
              </p>
              <div className="text-xs font-bold text-[#0A2463] uppercase tracking-wider mt-3 bg-gray-100 inline-block px-3 py-1 rounded">
                Title: Establishing a Framework for Positive Competition, Historical Healing, and Shared Prosperity for All Humanity
              </div>
            </div>

            <div className="space-y-6 text-xs sm:text-sm font-serif leading-relaxed text-gray-800">
              <div className="space-y-2 italic text-gray-700 font-sans text-xs">
                <p>The General Assembly,</p>
                <p><strong>Recalling</strong> the UN Charter&apos;s foundational pledge to save succeeding generations from the scourge of war,</p>
                <p><strong>Recognizing</strong> that humanity faces existential, interconnected threats across climate emergency, autonomous artificial intelligence, pandemics, nuclear proliferation, and crushing economic inequality,</p>
                <p><strong>Deeply concerned</strong> that geopolitical polarization between nations is accelerating toward catastrophic regional and planetary conflict,</p>
                <p><strong>Acknowledging</strong> that historical injustices — colonialism, slavery, genocide, and war — continue to shape present suffering and mistrust,</p>
                <p><strong>Affirming</strong> that competition is healthy when it elevates all and destructive when it eliminates some,</p>
              </div>

              {/* The 10 Clauses */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <strong>1. ESTABLISHES</strong> the <em>Global Council for Shared Future (GCSF)</em>: Comprising 30 members with rotating regional representation, meeting quarterly with binding jurisdiction on acute conflict prevention.
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <strong>2. PROCLAIMS</strong> a <em>Global Ceasefire Initiative</em>: Requiring all active conflicts to enter mediated negotiation within 12 months, backed by 5 permanent neutral peace hubs in Switzerland, Singapore, UAE, Costa Rica, and New Zealand.
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <strong>3. CREATES</strong> the <em>Historical Healing &amp; Reconciliation Commission</em>: Acknowledging colonial, wartime, and systemic injustices with a victim-led, non-punitive Shared Future Investment Fund.
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <strong>4. ADOPTS</strong> the <em>Positive Competition Charter</em>: Establishing the biennial &quot;Olympics of Progress&quot; ranking and rewarding nations on verified SDG advancements and human wellbeing.
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <strong>5. MANDATES</strong> the <em>International AI Safety Agency (IASA)</em>: Modeled on the IAEA with compute audit powers, binding safety standards, and a complete treaty ban on autonomous lethal weapons.
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <strong>6. DECLARES</strong> a <em>Global Carbon Price (2027)</em>: Starting at $50/ton and scaling to $150/ton by 2035, splitting revenues between climate adaptation (50%), Global South development (30%), and clean tech commons (20%).
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <strong>7. ESTABLISHES</strong> the <em>Global Peace Dividend</em>: Requiring states to redirect 10% of annual military expenditures ($200 Billion/year) to clean energy, disease eradication, and poverty alleviation.
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <strong>8. FOUNDS</strong> the <em>World Youth Peace Corps</em>: Deploying 10 million cross-border youth volunteers by 2035 in ecological restoration, health, and mutual education missions.
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <strong>9. PROTECTS</strong> the <em>Global Commons</em>: Declaring Earth&apos;s oceans, atmosphere, Antarctica, outer space, and cyberspace as inalienable shared heritage that may never be weaponized or privatized.
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <strong>10. DECLARES</strong> the decade of 2025–2035 as <em>&quot;The Decade of Healing and Shared Prosperity&quot;</em>.
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
              <span className="text-gray-500">Document Classification: UN Draft General Assembly Resolution A/RES/SHARED-FUTURE</span>
              <button
                onClick={copyResolutionToClipboard}
                className="bg-[#0A2463] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#1E6091] flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#D4A017]" />}
                {copied ? 'Copied to Clipboard' : 'Copy Text for Submission'}
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
