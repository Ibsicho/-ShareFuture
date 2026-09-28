// Comprehensive operational data for Campaign, Speech, Press Release, Governance, and Funding

export interface CampaignPhase {
  id: string;
  number: number;
  name: string;
  timing: string;
  theme: string;
  reachTarget: string;
  engagementTarget: string;
  circlesTarget: string;
  fundingTarget: string;
  keyMilestones: string[];
}

export interface SocialChannelPlan {
  channel: string;
  handle: string;
  audience: string;
  contentPillars: string[];
  postCadence: string;
  primaryKPI: string;
  samplePost: string;
  formatFocus: string;
}

export interface SpeechVersion {
  id: string;
  title: string;
  duration: string;
  durationMinutes: number;
  wordCount: number;
  setting: string;
  audience: string;
  slidesRecommended: number;
  script: {
    sectionTitle: string;
    timestamp: string;
    deliveryNotes: string;
    slideVisualCue?: string;
    content: string;
  }[];
}

export interface GovernanceNode {
  id: string;
  title: string;
  level: number;
  category: 'Strategic' | 'Executive' | 'Regional' | 'Grassroots' | 'Oversight' | 'Advisory';
  headcount: string;
  termLimit: string;
  composition: string;
  mandate: string;
  keyResponsibilities: string[];
  accountabilityMechanism: string;
}

export interface RevenueStream {
  id: string;
  title: string;
  category: 'Grassroots' | 'Institutional' | 'Sovereign / Macro' | 'Earned / Tech';
  year1Target: string;
  year5Target: string;
  year10Target: string;
  percentageOfBudget: number;
  mechanism: string;
  ethicalSafeguards: string;
}

export interface BudgetCategory {
  category: string;
  year1Amount: number; // in USD millions
  year5Amount: number;
  percentage: number;
  color: string;
  lineItems: { name: string; amount: string; purpose: string }[];
}

// -------------------------------------------------------------
// 1. CAMPAIGN STRATEGY DATA
// -------------------------------------------------------------
export const CAMPAIGN_PHASES: CampaignPhase[] = [
  {
    id: 'phase-1',
    number: 1,
    name: 'AWAKEN — The Manifesto Drop & Global Teaser',
    timing: 'Months 1–3',
    theme: 'The Fork in the Road',
    reachTarget: '100M+ Impressions',
    engagementTarget: '1M Active Engagements',
    circlesTarget: '2,500 Pilot Dialogue Circles',
    fundingTarget: '$5M Seed Launch Fund',
    keyMilestones: [
      'Simultaneous launch of Manifesto in 24 languages with 100 global moral figures',
      'Viral "Fork in the Road: 2050" 90-second cinematic video release',
      'Global Ceasefire Petition launched across 50 international peace coalitions',
      'First 500 universities host Day of Interdependence teach-ins'
    ]
  },
  {
    id: 'phase-2',
    number: 2,
    name: 'ENGAGE — Grassroots Circle Expansion & App Rollout',
    timing: 'Months 4–6',
    theme: 'From Rivals to Partners',
    reachTarget: '350M+ Impressions',
    engagementTarget: '5M App Downloads',
    circlesTarget: '15,000 Dialogue Circles active in 60 countries',
    fundingTarget: '$20M Crowdfund & Foundation Match',
    keyMilestones: [
      'Release of AI Dialogue Guide v1.0 mobile web app',
      'National Peace Challenge: 100,000 youth complete the 7-Day Peace Streak',
      'First 10 "Bilateral Rivalry" dialogue circles (e.g. US/China youth, India/Pakistan youth)',
      'Global Faith Coalition issues joint declaration from 500 religious leaders'
    ]
  },
  {
    id: 'phase-3',
    number: 3,
    name: 'AMPLIFY — Global Summit & Policy Mobilization',
    timing: 'Months 7–9',
    theme: 'The Decade of Healing Begins',
    reachTarget: '750M+ Impressions',
    engagementTarget: '20M Digital Signatories',
    circlesTarget: '50,000 Dialogue Circles active in 120 countries',
    fundingTarget: '$50M Movement Multiplier',
    keyMilestones: [
      'First Shared Future World Assembly in Geneva (hybrid 10,000 delegates)',
      'Official submission of UN General Assembly Draft Resolution A/RES/SHARED-FUTURE',
      'Launch of the 10-Billion-Dollar Peace Dividend Pledge signed by 20 retired heads of state',
      'Global Concert for Interdependence broadcast across 5 continents'
    ]
  },
  {
    id: 'phase-4',
    number: 4,
    name: 'INSTITUTIONALIZE — The Permanent Movement',
    timing: 'Months 10–12+',
    theme: 'Building the 2075 Renaissance',
    reachTarget: '1.5B+ Cumulative Reach',
    engagementTarget: '50M Verified Network Members',
    circlesTarget: '150,000 Circles & 10,000 Community Hubs',
    fundingTarget: '$150M Annual Self-Sustaining Endowment',
    keyMilestones: [
      'First 5 countries formally vote on the Positive Competition Charter',
      'Launch of World Youth Peace Corps initial 100,000 cross-border brigade',
      'Establishment of the International AI Safety Agency civil inspection division',
      'Institutionalization of the Annual World Progress Olympics'
    ]
  }
];

export const SOCIAL_CHANNELS: SocialChannelPlan[] = [
  {
    channel: 'TikTok & Reels',
    handle: '@SharedFutureEarth',
    audience: 'Gen Z & Emerging Leaders (16–28)',
    contentPillars: ['Fork in the Road simulations', 'Micro-interviews with opposing viewpoints', '60-sec healing stories', 'Daily peace hacks'],
    postCadence: '2–3 daily shorts/reels',
    primaryKPI: 'Viral Shares & Circle Creation clicks',
    samplePost: '"What happens when an ex-soldier from Country A sits down for tea with a refugee from Country B? Watch their eyes at second 42. #SharedFuture #Ubuntu #BridgeBuilders"',
    formatFocus: '9:16 High-emotion authentic video'
  },
  {
    channel: 'YouTube & Long-form',
    handle: 'The Shared Future Project',
    audience: 'Thinkers, Policymakers, Educators & Activists',
    contentPillars: ['18-minute TED Talks & Keynotes', 'Mini-documentaries on historical reconciliation', 'Debates in Positive Competition', 'Circle facilitator masterclasses'],
    postCadence: '1 flagship doc weekly + 3 shorts',
    primaryKPI: 'Watch time & Educational licensing',
    samplePost: '"The 5 Steps That Stopped a Civil War: What Rwanda & Northern Ireland Can Teach Today\'s Fractured World. Full 22-min documentary live now."',
    formatFocus: '4K Cinematic documentaries with expert commentary'
  },
  {
    channel: 'X / Twitter & Threads',
    handle: '@SharedFuture',
    audience: 'Journalists, Academics, Diplomats & Tech Leaders',
    contentPillars: ['Real-time crisis de-escalation memos', 'Data threads on the $200B Peace Dividend', 'AI safety policy breakdowns', 'UN Resolution tracking'],
    postCadence: '4–6 strategic threads daily',
    primaryKPI: 'Earned media citations & Diplomatic retweets',
    samplePost: '"THREAD: The world will spend $2.4 Trillion on weapons this year. Reallocating just 10% ($240B) would: 1. Clean water for every human ($40B). 2. Double UN disaster relief ($25B). 3. Eradicate malaria ($12B). Here is the treaty blueprint 🧵👇"',
    formatFocus: 'Evidence-based data visualization threads'
  },
  {
    channel: 'LinkedIn',
    handle: 'The Shared Future Initiative',
    audience: 'CEOs, ESG Investors, Philanthropists & Institutional Leaders',
    contentPillars: ['Positive Competition as corporate strategy', 'Global carbon dividend models', 'Workplace bridge-building', 'Foundation partnerships'],
    postCadence: '1 in-depth thought leadership article/day',
    primaryKPI: 'Corporate pledge endorsements & Philanthropic matching',
    samplePost: '"Zero-sum competition is bad business. Why the next decade\'s most valuable enterprises will compete to elevate humanity rather than extract from it."',
    formatFocus: 'Whitepapers, executive op-eds, slide decks'
  },
  {
    channel: 'WhatsApp & Signal Hubs',
    handle: 'Shared Future Global Wire',
    audience: 'Global South Grassroots, Displaced Communities, Local Facilitators',
    contentPillars: ['Weekly Circle dialogue kits', 'SMS/low-bandwidth action digests', 'Urgent nonviolent emergency alerts', 'Local language translations'],
    postCadence: '2 broadcasts weekly per local hub',
    primaryKPI: 'Circle attendance & local action reports',
    samplePost: '"[Weekly Circle Guide] This Sunday\'s topic: Listening without defensiveness. 3 simple questions to ask your circle. Download audio prompt (2MB)."',
    formatFocus: 'Lightweight voice notes, PDFs, and translated text cards'
  }
];

// -------------------------------------------------------------
// 2. SPEECH & TED TALK DATA (18-Minute Full Keynote Script + Variations)
// -------------------------------------------------------------
export const SPEECH_VERSIONS: SpeechVersion[] = [
  {
    id: 'ted-18',
    title: 'The 18-Minute TED Talk: The Fork in the Road',
    duration: '18:00',
    durationMinutes: 18,
    wordCount: 2450,
    setting: 'Mainstage TED / Major Global Forum',
    audience: 'Global Public, Innovators, Youth, Cross-Cultural Audience',
    slidesRecommended: 14,
    script: [
      {
        sectionTitle: 'I. THE HOOK: The Two Children of 2075',
        timestamp: '00:00 – 02:30',
        deliveryNotes: 'Step into the center of the red circle. No podium. Do not look at notes. Warm, direct eye contact with the center rows. Begin with quiet stillness.',
        slideVisualCue: 'SLIDE 1: A single photorealistic split horizon at twilight — barren red dust on the left; vibrant green terraced canopy on the right.',
        content: `Look at this date: September 19, 2075.

Fifty years from tonight.

Somewhere on this planet, a child will wake up. She might open her eyes in Nairobi, or Shanghai, or Chicago, or Buenos Aires.

In one version of that morning, she wakes up in a bunker. The air outside is 46 degrees Celsius at dawn. Her grandfather whispers stories of a time when people could walk outside without oxygen concentrators, when the oceans had fish, and when great nations did not solve their grievances with autonomous drone swarms. She belongs to a civilization that failed the test of maturity.

In the other version of that same morning, she wakes up to the sound of solar rail gliding into a city built in harmony with living rivers. Her classroom connects in real time with children across six continents. Her country still competes furiously with others — but they compete over who can eliminate cancer first, who can restore the Amazon fastest, and who can design the most beautiful cities.

Both futures are physically possible. Both are governed by the laws of physics and economics.

The only difference between that bunker and that garden... is the choices made by the generation sitting in this room tonight.`
      },
      {
        sectionTitle: 'II. THE DIAGNOSIS: Why Our Systems Are Breaking',
        timestamp: '02:30 – 06:00',
        deliveryNotes: 'Pace slowly to stage right. Shift vocal tone from poetic to urgent, analytical clarity. High contrast, sharp articulation.',
        slideVisualCue: 'SLIDE 2: Infographic showing $2.4 Trillion annual military spend vs $0.05 Trillion on global climate adaptation.',
        content: `Let us be completely honest with one another about where we stand today.

We are living through what historians will call the Great Convergence of Crises. We have nuclear states updating arsenals. We have artificial intelligence expanding faster than any moral architecture we have to govern it. We have the top one percent holding nearly half the wealth on Earth, while two billion human beings do not know where their next meal will come from. And our atmosphere is on track to smash through planetary boundaries.

Yet when we look at our international institutions, what do we see?

We see gridlock. We see zero-sum games. We see a philosophy inherited from the seventeenth century: "For my nation to win, yours must lose. For my tribe to be safe, yours must be humiliated."

This is what I call Negative Competition. It is the logic of cancer: the individual cell grows by destroying the organism that keeps it alive.

If we keep playing zero-sum games with twenty-first-century technologies, the mathematics are clear: extinction is not a metaphor. It is an actuarial certainty.`
      },
      {
        sectionTitle: 'III. THE PROOF OF RECONCILIATION: It Has Happened Before',
        timestamp: '06:00 – 09:30',
        deliveryNotes: 'Move center stage. Voice softens; profound reverence. Speak with personal vulnerability and moral weight.',
        slideVisualCue: 'SLIDE 3: Archival photo of South African TRC hearings and Rwandan Gacaca community court under a tree.',
        content: `Now, critics will say: "That is human nature. Humans have always fought. You cannot change human tribalism."

I want to challenge that lie with every fiber of my being.

Thirty years ago, in 1994, Rwanda tore itself apart. In one hundred days, one million human beings were murdered by their neighbors with machetes. Blood literally ran in the gutters.

If you stood in Kigali in July 1994, any rational person would have said: "This country is dead for a thousand years. Revenge will never end."

And yet, what happened?

They revived an ancient communal practice called Gacaca. They sat under the trees. The perpetrators walked back into the villages, confessed to the families whose children they had killed, and begged for forgiveness. And the families — holding back the urge for vengeance with superhuman courage — said: "We must live together. We will repair this village together."

Today, Rwanda has one of the highest safety ratings in Africa, one of the cleanest capital cities on Earth, and students from both sides study in the same classrooms.

Think of Northern Ireland: thirty years of the Troubles, car bombings every week. Today, former adversaries govern together.

Think of Germany and France: three bloody wars in seventy years, tens of millions dead. Today, a French citizen crosses into Germany without even showing a passport.

Reconciliation is not weakness. Reconciliation is the hardest, most courageous technology humanity has ever invented.`
      },
      {
        sectionTitle: 'IV. THE TEN-PART BLUEPRINT: Positive Competition',
        timestamp: '09:30 – 14:00',
        deliveryNotes: 'Vocal energy rises. Stand tall. Hand gestures open and decisive. Project supreme confidence in structural feasibility.',
        slideVisualCue: 'SLIDE 4: Interactive wheel showing the 10 Structural Solutions: Global Council, Peace Dividend, AI Safety, Carbon Price.',
        content: `So how do we scale this to eight billion people?

We do not ask nations to surrender their identities or stop competing. We change the rules of the competition.

We shift from Negative Competition — competing to eliminate — to Positive Competition: competing to elevate.

We have laid out a concrete, open-source 10-part blueprint:

First: The Global Peace Dividend. Today, the world spends 2.4 trillion dollars on armies. Our framework redirects just ten percent — two hundred billion dollars a year — into clean water, universal vaccines, and green grids. In five years, you end extreme poverty forever.

Second: The International AI Safety Agency. Just like we inspect nuclear centrifuges through the IAEA, we must inspect frontier AI compute clusters and ban autonomous lethal weapons before machines make kill decisions over human beings.

Third: The Global Carbon Price. Starting at fifty dollars a ton, rising to one hundred and fifty, with fifty percent of all revenue returning directly to the Global South for adaptation.

Fourth: The Historical Healing Commission. A victim-led fund to acknowledge the wounds of colonialism and slavery, not to punish living generations, but to build schools, hospitals, and clean water systems in the communities that were stripped of them.

And fifth: The World Youth Peace Corps. Ten million young people crossing borders every year — not with rifles, but with shovels, solar panels, and medical kits.`
      },
      {
        sectionTitle: 'V. THE CALL TO CITIZENS: The Rule of Six',
        timestamp: '14:00 – 16:30',
        deliveryNotes: 'Drop vocal intensity into warm intimacy. Step one meter forward toward the audience. Speak directly to individual agency.',
        slideVisualCue: 'SLIDE 5: A photograph of six people sitting in a circle of wooden chairs laughing together in an ordinary room.',
        content: `You might say: "This requires presidents and prime ministers. What can I do on a Tuesday evening?"

Everything.

Every great transformation in human history — from abolition to civil rights to the fall of the Berlin Wall — was forced upon hesitant leaders by ordinary citizens who had already changed their minds.

Tonight, we are launching Dialogue Circles in ten thousand cities worldwide. The Rule of Six: six people who disagree on politics, religion, or nationality, sitting in a living room once a month. Big enough for real difference; small enough for genuine friendship.

When you sit across from someone you were taught to hate, look them in the eyes, and ask: "Tell me what hurts in your life" — you break the algorithmic outrage economy. You starve the war machine of its fuel.`
      },
      {
        sectionTitle: 'VI. THE CLOSE: Monsters and Midwives',
        timestamp: '16:30 – 18:00',
        deliveryNotes: 'Build to a steady, powerful crescendo. Pause after the Gramsci quote. Finish with luminous resolve. Hold eye contact during final applause.',
        slideVisualCue: 'SLIDE 6: Dark starry cosmos transitioning into dawn over Earth seen from orbit.',
        content: `The Italian philosopher Antonio Gramsci once wrote from a prison cell:
"The old world is dying, and the new world struggles to be born. Now is the time of monsters."

We can all feel those monsters today. We see them in hatred, in greed, in algorithmic rage, in weapons factories running triple shifts.

But Gramsci forgot to mention the other presence in the room:

Where there is a birth, there are not only monsters. There are midwives.

Those who soothe the mother. Those who protect the infant. Those who refuse to let the future die on the delivery table.

That child waking up in 2075 is calling to us right now across time. She is asking us:
"Did you have the courage to put down your grievances?
Did you have the courage to compete to elevate rather than destroy?
Did you have the courage to choose us?"

Let us stand up tonight and answer her:
"Yes. We were here. And we chose you."

Thank you.`
      }
    ]
  },
  {
    id: 'pitch-3',
    title: 'The 3-Minute Elevator Pitch: For Leaders & Innovators',
    duration: '03:00',
    durationMinutes: 3,
    wordCount: 420,
    setting: 'Investor Forum / Davos Side Session / Media Soundbite',
    audience: 'High-Level Decision Makers, Donors, Executives',
    slidesRecommended: 3,
    script: [
      {
        sectionTitle: 'The 180-Second Blueprint',
        timestamp: '00:00 – 03:00',
        deliveryNotes: 'Crisp, razor-sharp cadence. Maximum economy of language. No filler words.',
        content: `Humanity is operating on a fatal operating system error: zero-sum competition with 21st-century weapons and climate tipping points.

The Shared Future Project is the upgrade.

We replace "Negative Competition" — where I win by destroying you — with "Positive Competition" — where nations compete to elevate human wellbeing, solve climate, and govern AI safely.

Our blueprint has three pillars:
First, a structural UN Resolution and Global Peace Dividend redirecting 10% of military budgets ($200B/yr) directly into SDGs and clean infrastructure.
Second, an International AI Safety Agency to inspect compute clusters and ban autonomous slaughter bots.
Third, a grassroots mobilization engine: 150,000 monthly Dialogue Circles of six people, breaking polarization at the neighborhood level in 120 countries.

We are already supported by 1.2 million signatories and piloting in 60 cities. In 10 years, this moves from a civic movement into binding international law.

We don't need nations to love each other. We just need them to realize that extinction is bad for business, bad for borders, and bad for our children. Join us at sharedfuture.org.`
      }
    ]
  },
  {
    id: 'ignite-5',
    title: 'The 5-Minute Ignite Talk: For Youth & Student Assemblies',
    duration: '05:00',
    durationMinutes: 5,
    wordCount: 720,
    setting: 'University Campuses / Youth Climates Strikes / Hackathons',
    audience: 'Students, Gen Z Builders, Young Creators',
    slidesRecommended: 5,
    script: [
      {
        sectionTitle: 'The 5-Minute Fire',
        timestamp: '00:00 – 05:00',
        deliveryNotes: 'Direct, informal, electrifying. Challenge cynical passivity. Focus on youth agency.',
        content: `They handed us an atmosphere on fire. They handed us algorithms designed to make us hate our neighbors. They handed us two trillion dollars in cruise missiles while teachers buy their own pencils.

And then they look at us and ask: "Why is Gen Z so anxious?"

We are not anxious because we are weak. We are anxious because our nervous systems are telling the truth about an insane status quo!

Cynicism is the ultimate boomer trap. When you give up and say "everything is doomed," you do the exact job the fossil fuel lobbyists and weapons manufacturers pay millions for you to do.

We refuse to be cynics.

The Shared Future Project is our generation taking the steering wheel. We are launching the World Youth Peace Corps — 10 million of us crossing borders to build solar microgrids, plant mangroves, and teach code. We are launching Dialogue Circles in every high school and college.

Do not wait for 80-year-old politicians to give you permission to save the planet. Download the toolkit. Start your circle of six this Sunday. Compete to elevate!`
      }
    ]
  },
  {
    id: 'conference-10',
    title: 'The 10-Minute Conference Address: For Policymakers & Diplomats',
    duration: '10:00',
    durationMinutes: 10,
    wordCount: 1380,
    setting: 'Foreign Affairs Think Tank / UN Side Event',
    audience: 'Ambassadors, Policy Analysts, Civil Servants',
    slidesRecommended: 8,
    script: [
      {
        sectionTitle: 'Architecting 21st Century Multilateralism',
        timestamp: '00:00 – 10:00',
        deliveryNotes: 'Measured diplomatic gravitas. Evidence-based citations. Respect existing treaties while proposing necessary upgrades.',
        content: `Excellencies, distinguished delegates, colleagues:

The post-1945 multilateral architecture saved the world from World War III. We must honor that achievement. But a house built for the challenges of 1945 cannot shelter us from the storm of 2025.

The UN Security Council veto paralyzes action precisely where action is most urgently required. Planetary carbon knows no sovereignty. Frontier AI models train across distributed global compute grids in seconds.

The Shared Future Framework offers a realistic, legally sound pathway forward through Draft General Assembly Resolution A/RES/SHARED-FUTURE:

1. A Global Council for Shared Future with 30 rotating regional members operating with binding jurisdiction on acute dispute mediation.
2. The Positive Competition Charter, replacing GDP bragging rights with the biennial "Olympics of Progress" indexed against verified SDG outcomes.
3. The 10% Global Peace Dividend, creating a predictable $200 Billion annual multilateral development fund insulated from annual national budget whims.

This does not require the abolition of sovereignty. It requires the intelligent pooling of sovereignty where collective survival depends upon it.

Colleagues, history will not judge us by the eloquence of our communiqués. History will judge us by whether we left our successors a world they can breathe in. Thank you.`
      }
    ]
  }
];

// -------------------------------------------------------------
// 3. PRESS RELEASE & MEDIA LAUNCH DATA
// -------------------------------------------------------------
export const PRESS_RELEASE_DATA = {
  distributionDate: 'FOR IMMEDIATE RELEASE — EMBARGOED UNTIL SEPTEMBER 21 (INTERNATIONAL DAY OF PEACE)',
  dateline: 'GENEVA / NEW YORK / NAIROBI',
  headline: 'GLOBAL COALITION LAUNCHES "THE SHARED FUTURE PROJECT": A MULTILATERAL BLUEPRINT FOR HISTORICAL HEALING, POSITIVE COMPETITION, AND A $200B PEACE DIVIDEND',
  subhead: 'Endorsed by Nobel Laureates, Former Heads of State, and 1.2M Citizens across 120 Countries, Initiative Unveils Draft UN Resolution and Global Dialogue Network to Reverse Civilizational Polarization',
  bodyParagraphs: [
    `GENEVA — Faced with compounding planetary crises ranging from geopolitical confrontation and runaway military AI to the brink of the 1.5°C climate threshold, an unprecedented international coalition of scientists, diplomats, grassroots leaders, and youth activists today announced the official global launch of The Shared Future Project (sharedfuture.org).`,
    `The initiative introduces a comprehensive, open-source civilizational framework anchored in "Positive Competition" — a diplomatic and economic doctrine that redirects national rivalries away from destructive militarism toward cooperative races to solve shared planetary challenges.`,
    `At the heart of the launch is the unveiling of Draft UN General Assembly Resolution A/RES/SHARED-FUTURE, which outlines ten legally actionable structural reforms, including:`,
    `• The Global Peace Dividend: A binding international agreement redirecting 10% of annual global military spending — generating roughly $200 Billion per year — toward universal clean water, climate adaptation, and extreme poverty eradication.`,
    `• International AI Safety Agency (IASA): An inspection and regulatory body modeled on the IAEA with the mandate to enforce algorithmic safety benchmarks and a universal ban on autonomous lethal weapons systems.`,
    `• Historical Healing & Reconciliation Commission: A global victim-led mechanism based on the proven reconciliation models of South Africa and Rwanda, creating a non-punitive Shared Future Investment Fund for communities harmed by colonialism, slavery, and war.`,
    `• World Youth Peace Corps: A cross-border mobilization aiming to deploy 10 million young people by 2035 in ecological restoration and public health initiatives.`,
    `"We are standing at the sharpest fork in the road in human history," said Dr. Amina Diallo, Co-Chair of the Global Advisory Council. "One path leads to catastrophic fragmentation, ecological breakdown, and nuclear escalation. The other leads to the greatest renaissance humanity has ever known. The Shared Future Project proves that peace is not an idealistic dream — it is an engineered engineering reality with a balanced balance sheet."`,
    `Simultaneously with today's diplomatic launch, the project announced the activation of over 10,000 community "Dialogue Circles" across 60 nations, backed by an open-source AI Dialogue Guide designed to coach citizens across political and cultural divides into empathetic, constructive conversation.`
  ],
  mediaContacts: [
    { name: 'Elena Rostova', title: 'Global Communications Director', email: 'press@sharedfuture.org', phone: '+41 22 555 0192', location: 'Geneva, Switzerland' },
    { name: 'Kofi Mensah', title: 'Global South Media Lead', email: 'kofi.m@sharedfuture.org', phone: '+254 20 712 3450', location: 'Nairobi, Kenya' },
    { name: 'Marcus Vance', title: 'North America Press Officer', email: 'press.na@sharedfuture.org', phone: '+1 212 555 0184', location: 'New York, USA' }
  ],
  boilerplate: `About The Shared Future Project:
The Shared Future Project is a neutral, non-partisan, globally distributed civil society initiative dedicated to advancing the transition from zero-sum destruction to positive civilizational cooperation. Headquartered under a Swiss non-profit foundation structure with regional hubs across Africa, the Americas, Asia, and Europe, the project combines high-level treaty architecture with grassroots civic infrastructure. Learn more and read the complete blueprint at https://sharedfuture.org.`
};

// -------------------------------------------------------------
// 4. ORG CHART & GOVERNANCE DATA
// -------------------------------------------------------------
export const GOVERNANCE_NODES: GovernanceNode[] = [
  {
    id: 'gov-council',
    title: 'Global Council for Shared Future (GCSF)',
    level: 1,
    category: 'Strategic',
    headcount: '30 Councilors (Rotating)',
    termLimit: '3 Years (Staggered, Max 2 terms)',
    composition: '50% Global South, 50% Women, 30% Under 35 years old; includes indigenous leaders, retired statesmen, Nobel laureates, and scientists.',
    mandate: 'Supreme moral and strategic authority of the movement. Approves major treaties, global campaigns, annual audited budgets, and institutional policy positions.',
    keyResponsibilities: [
      'Custodians of the Declaration of Interdependence',
      'Appoint Secretary-General and Ombudsman with 75% consensus',
      'Oversee international diplomatic representations at UN and G20',
      'Authorize releases from the Global Peace Dividend Reserve'
    ],
    accountabilityMechanism: 'Subject to annual recall petitions and radical transparency voting audits.'
  },
  {
    id: 'steering-comm',
    title: 'Executive Steering Committee',
    level: 2,
    category: 'Executive',
    headcount: '12 Full-time Directors',
    termLimit: '4 Years',
    composition: 'Headed by the Secretary-General, includes Chiefs of Diplomatic Affairs, Technology, Grassroots Organizing, Historical Healing, and Finance.',
    mandate: 'Executes day-to-day operations, coordinates multi-region campaigns, oversees digital platforms, and manages financial distributions.',
    keyResponsibilities: [
      'Day-to-day management of 120 global staff',
      'Platform maintenance of AI Dialogue Guide and Dialogue Circles App',
      'Financial deployment to national chapters and emergency peace funds',
      'Direct liaison with sponsor governments for UN draft resolutions'
    ],
    accountabilityMechanism: 'Quarterly performance metrics published publicly on the Radical Transparency Ledger.'
  },
  {
    id: 'ombudsman',
    title: 'Independent Ombudsman & Ethics Board',
    level: 2,
    category: 'Oversight',
    headcount: '5 Independent Jurists',
    termLimit: '5 Years (Non-renewable)',
    composition: 'Independent human rights jurists and forensic audit experts with zero operational ties to staff.',
    mandate: 'Total investigatory independence to audit finances, investigate whistleblower complaints, resolve internal disputes, and enforce anti-corruption covenants.',
    keyResponsibilities: [
      'Direct anonymous whistleblower intake portal',
      'Audit all donations exceeding $1,000 for conflict of interest',
      'Enforce maximum 10:1 executive salary ratio ceiling',
      'Authority to suspend any councilor or executive for ethical violations'
    ],
    accountabilityMechanism: 'Reports directly to the public with un-redacted annual findings.'
  },
  {
    id: 'regional-hubs',
    title: '7 Regional Coordination Hubs',
    level: 3,
    category: 'Regional',
    headcount: '7 Regional Secretariats',
    termLimit: 'Rolling Local Governance',
    composition: 'Autonomous offices in Geneva (Europe), Nairobi (Africa), Singapore (East Asia/Oceania), New Delhi (South Asia), Amman (Middle East), São Paulo (Latin America), and Montreal (North America).',
    mandate: 'Localize campaigns, translate materials into regional tongues, support national chapters, and facilitate cross-border bilateral dialogues.',
    keyResponsibilities: [
      'Disburse micro-grants to grassroots dialogue circles',
      'Coordinate regional Youth Peace Corps detachments',
      'Liaise with regional multilateral bodies (AU, ASEAN, OAS, EU, Arab League)',
      'Organize annual continental Shared Future Summits'
    ],
    accountabilityMechanism: 'Regional councils elected by local chapter facilitators.'
  },
  {
    id: 'dialogue-network',
    title: 'Grassroots Dialogue Circles Assembly',
    level: 4,
    category: 'Grassroots',
    headcount: '150,000+ Circle Facilitators',
    termLimit: 'Self-Organized Community',
    composition: 'Decentralized network of 6-person monthly dialogue units operating in schools, faith centers, workplaces, and neighborhoods.',
    mandate: 'The foundational bedrock of the movement. Practices deep listening, conducts local bridge-building, and reports community sentiment.',
    keyResponsibilities: [
      'Convene monthly face-to-face dialogues across polarization lines',
      'Implement local service and healing projects',
      'Cast grassroots delegate votes for Global Council representatives',
      'Mobilize rapid-response nonviolent peace presence during local tensions'
    ],
    accountabilityMechanism: 'Peer accountability governed by the Rule of Six and Ubuntu Charter.'
  }
];

export const GOVERNANCE_PRINCIPLES = [
  { num: 1, title: 'Subsidiarity', desc: 'No decision is made at the global level that can be made better at the neighborhood or regional level.' },
  { num: 2, title: 'Radical Transparency', desc: 'Every expenditure over $500, every council vote, and every meeting minute is published to an open ledger.' },
  { num: 3, title: 'Consent-Based Sociocracy', desc: 'Proposals pass not through 51% tyranny of the majority, but when no reasoned objection remains unresolved.' },
  { num: 4, title: 'Strict Wealth Cap (10:1)', desc: 'The highest-compensated director cannot earn more than 10 times the lowest full-time employee wage.' },
  { num: 5, title: 'Zero Weapons / Fossil Fuel Money', desc: 'Strict negative donation screen: strictly zero funding from defense contractors, fossil fuels, or authoritarian state funds.' }
];

// -------------------------------------------------------------
// 5. FUNDING MODEL & FINANCIAL PLAN DATA
// -------------------------------------------------------------
export const REVENUE_STREAMS: RevenueStream[] = [
  {
    id: 'rev-grassroots',
    title: 'Individual Monthly Grassroots ("The Healing Circle")',
    category: 'Grassroots',
    year1Target: '$12,000,000',
    year5Target: '$85,000,000',
    year10Target: '$250,000,000',
    percentageOfBudget: 24,
    mechanism: 'Micro-contributions from citizens pledging $5, $10, or $25/month. Ensures movement remains accountable to citizens, not oligarchs.',
    ethicalSafeguards: 'Anonymous donations capped at $100. Full donor ledger open to public scrutiny.'
  },
  {
    id: 'rev-foundations',
    title: 'Independent Philanthropic Foundations',
    category: 'Institutional',
    year1Target: '$20,000,000',
    year5Target: '$60,000,000',
    year10Target: '$100,000,000',
    percentageOfBudget: 20,
    mechanism: 'Multi-year unrestricted general operating grants from climate, human rights, and democracy foundations.',
    ethicalSafeguards: 'No donor receives governance seats or veto power over campaign positions.'
  },
  {
    id: 'rev-peace-dividend',
    title: 'Global Peace Dividend Reallocation Share',
    category: 'Sovereign / Macro',
    year1Target: '$0 (Diplomatic Phase)',
    year5Target: '$500,000,000',
    year10Target: '$2,000,000,000+',
    percentageOfBudget: 35,
    mechanism: '0.5% statutory allocation from nations ratifying the 10% Military Reduction Treaty into the independent administration pool.',
    ethicalSafeguards: 'Audited by the UN Board of Auditors and international forensic consortium.'
  },
  {
    id: 'rev-carbon-fee',
    title: 'Global Carbon Fee & Commons Dividend',
    category: 'Sovereign / Macro',
    year1Target: '$0 (Pilot Feasibility)',
    year5Target: '$250,000,000',
    year10Target: '$1,000,000,000',
    percentageOfBudget: 15,
    mechanism: 'Reinvested fee from the $50-$150/ton Global Carbon Price mechanism allocated to local adaptation and reforestation corps.',
    ethicalSafeguards: 'Strict hypothecation to Global South adaptation projects.'
  },
  {
    id: 'rev-earned',
    title: 'Earned Income & Educational Licensing',
    category: 'Earned / Tech',
    year1Target: '$3,000,000',
    year5Target: '$25,000,000',
    year10Target: '$60,000,000',
    percentageOfBudget: 6,
    mechanism: 'Corporate bridge-building workshops, university textbook licensing, documentary syndication, and conference registration.',
    ethicalSafeguards: 'All profits reinvested into subsidized grassroots circle kits.'
  }
];

export const BUDGET_BREAKDOWN_YEAR1: BudgetCategory[] = [
  {
    category: 'Programmatic Deployment & Circles',
    year1Amount: 25.0, // $25M
    year5Amount: 180.0,
    percentage: 50,
    color: '#0A2463',
    lineItems: [
      { name: 'Grassroots Dialogue Circle Micro-Grants', amount: '$10.5M', purpose: 'Direct stipends & meeting toolkits for 15,000 circle facilitators' },
      { name: 'Historical Healing Pilot Initiatives', amount: '$7.5M', purpose: 'Seed funding for South Africa, Colombia, and Balkans community reconciliation' },
      { name: 'World Youth Peace Corps Initial Cohort', amount: '$7.0M', purpose: 'Living stipends, travel, and training for 2,500 pilot cross-border peace volunteers' }
    ]
  },
  {
    category: 'Digital Infrastructure & AI Safety Tech',
    year1Amount: 7.5,
    year5Amount: 45.0,
    percentage: 15,
    color: '#1E6091',
    lineItems: [
      { name: 'AI Dialogue Guide Platform & App', amount: '$3.5M', purpose: 'Open-source privacy-preserving NLP coaching infrastructure' },
      { name: 'Verification & Transparency Ledger', amount: '$2.0M', purpose: 'Cryptographic public audit database for all progress metrics' },
      { name: 'Multilingual Translation Pipeline', amount: '$2.0M', purpose: 'Real-time localization of training tools across 40 languages' }
    ]
  },
  {
    category: 'Global Advocacy, Policy & UN Engagement',
    year1Amount: 6.0,
    year5Amount: 35.0,
    percentage: 12,
    color: '#2D6A4F',
    lineItems: [
      { name: 'UN Resolution Diplomatic Secretariat', amount: '$2.5M', purpose: 'Legal drafting, mission briefings in New York & Geneva' },
      { name: 'Positive Competition Progress Index', amount: '$2.0M', purpose: 'Independent quarterly planetary health & peace data auditing' },
      { name: 'Global Parliamentary Caucuses', amount: '$1.5M', purpose: 'Building cross-party legislative support in 30 national parliaments' }
    ]
  },
  {
    category: 'Public Campaign, Media & Creative Storytelling',
    year1Amount: 5.5,
    year5Amount: 30.0,
    percentage: 11,
    color: '#D4A017',
    lineItems: [
      { name: 'Global Media Launch & Documentaries', amount: '$3.0M', purpose: 'Production of flagship film series & high-impact investigative exposés' },
      { name: 'Social Media & Grassroots Outreach', amount: '$1.5M', purpose: 'Paid promotion targeting youth in polarized regions' },
      { name: 'Earned Media & Press Bureaus', amount: '$1.0M', purpose: 'Global media relations in Geneva, Nairobi, and New York' }
    ]
  },
  {
    category: 'Operations, Governance & Independent Audit',
    year1Amount: 6.0,
    year5Amount: 30.0,
    percentage: 12,
    color: '#6C757D',
    lineItems: [
      { name: 'Regional Secretariats (7 Continental Hubs)', amount: '$3.5M', purpose: 'Core operational staffing across Africa, Asia, Americas, Europe' },
      { name: 'Independent Ombudsman & Forensic Audit', amount: '$1.5M', purpose: 'Total autonomy legal review and quarterly public financial audits' },
      { name: 'Emergency Contingency & Reserves', amount: '$1.0M', purpose: 'Safe reserve buffer for sudden geopolitical or currency shocks' }
    ]
  }
];
