import { RecurringAgendaTemplate, CircleMeetingAgenda, AgendaDiscussionPoint } from '../types';

export const RECURRING_AGENDA_TEMPLATES: RecurringAgendaTemplate[] = [
  {
    id: 'standard_dialogue',
    name: 'Standard 90-Min Co-Elevation Dialogue',
    totalDurationMinutes: 90,
    description: 'Balanced monthly format designed for deep listening, review of shared commitments, and collaborative inquiry.',
    standardSections: [
      {
        title: 'Opening & Mindful Grounding',
        durationMinutes: 10,
        description: 'Silent arrival, welcoming check-in, and affirmation of Chatham House Rule & Ubuntu principles.',
        category: 'dialogue'
      },
      {
        title: 'Review of Prior Commitments & Action Covenants',
        durationMinutes: 15,
        description: 'Accountability check: member updates on agreed actions from the previous monthly circle.',
        category: 'action'
      },
      {
        title: 'Core Plenary Inquiry & Theme Exploration',
        durationMinutes: 30,
        description: 'Facilitator-guided inquiry into this month’s primary breakthrough question.',
        category: 'dialogue'
      },
      {
        title: 'Member-Suggested Discussion Points',
        durationMinutes: 20,
        description: 'Open collaborative floor for high-voted topics proposed by circle members.',
        category: 'creative'
      },
      {
        title: 'Action Covenant & Closing Gratitude',
        durationMinutes: 15,
        description: 'Drafting 1-2 concrete mutual commitments, closing round of gratitude, and confirming next meeting date.',
        category: 'action'
      }
    ]
  },
  {
    id: 'truth_healing',
    name: 'Truth, Reconciliation & Healing Circle (120 Min)',
    totalDurationMinutes: 120,
    description: 'Extended sacred dialogue container for addressing historical trauma, colonial wounds, and inter-group reconciliation.',
    standardSections: [
      {
        title: 'Ceremonial Grounding & Safe Container Setup',
        durationMinutes: 15,
        description: 'Honoring ancestors, acknowledging historical harms, and establishing unshakeable psychological safety.',
        category: 'healing'
      },
      {
        title: 'Lived Experience & Testimony Sharing',
        durationMinutes: 40,
        description: 'Uninterrupted storytelling rounds from divergent perspectives without rebuttal or debate.',
        category: 'healing'
      },
      {
        title: 'Collaborative Inquiry into Historical Lessons',
        durationMinutes: 35,
        description: 'Examining systemic roots and unearthing shared human dignity beneath historical grievances.',
        category: 'dialogue'
      },
      {
        title: 'Mutual Reparative Actions & Covenants',
        durationMinutes: 20,
        description: 'Formulating practical restorative actions between groups (shared projects, mutual apologies, education).',
        category: 'action'
      },
      {
        title: 'Closing Circle & Dedicated Silent Reflection',
        durationMinutes: 10,
        description: 'Collective silence, honoring all shared vulnerability, and mutual reaffirmation.',
        category: 'healing'
      }
    ]
  },
  {
    id: 'action_lab',
    name: 'Shared Action & Project Incubator (60 Min)',
    totalDurationMinutes: 60,
    description: 'Fast-paced, action-biased monthly working session designed for coordinating community projects and cross-border initiatives.',
    standardSections: [
      {
        title: 'Rapid Check-in & Metric Dashboard Review',
        durationMinutes: 10,
        description: '5-minute status pulse on active cross-border initiatives, funding, or pilot projects.',
        category: 'logistics'
      },
      {
        title: 'Project Pitches & Collaboration Requests',
        durationMinutes: 20,
        description: 'Member presentations of emerging local challenges requiring shared resources or peer expertise.',
        category: 'action'
      },
      {
        title: 'Collaborative Problem-Solving Rounds',
        durationMinutes: 20,
        description: 'Breakout or plenary ideation addressing highest-voted member discussion points.',
        category: 'creative'
      },
      {
        title: 'Sprint Allocation & Milestone Commitments',
        durationMinutes: 10,
        description: 'Assigning owners, deadlines, and deliverables for the upcoming month sprint.',
        category: 'action'
      }
    ]
  },
  {
    id: 'youth_bridge',
    name: 'Youth & Cross-Cultural Bridge (75 Min)',
    totalDurationMinutes: 75,
    description: 'Engaging, intergenerational format connecting youth advocates, researchers, and elders across geopolitical frontiers.',
    standardSections: [
      {
        title: 'Cross-Cultural Icebreaker & Cultural Exchange',
        durationMinutes: 15,
        description: 'Informal connection, sharing a cultural tradition, idiom, or personal reflection on belonging.',
        category: 'creative'
      },
      {
        title: 'Intergenerational Deep Dialogue',
        durationMinutes: 30,
        description: 'Joint inquiry examining how historical legacies shape youth opportunities and technological risks today.',
        category: 'dialogue'
      },
      {
        title: 'Lightning Discussion Points from Members',
        durationMinutes: 20,
        description: 'Rapid-fire member suggestions focusing on digital tools, peace journalism, or educational exchanges.',
        category: 'action'
      },
      {
        title: 'Youth Ambassador Pledges & Send-Off',
        durationMinutes: 10,
        description: 'Mutual mentorship pairings and scheduling cross-border peer dialogues before next month.',
        category: 'dialogue'
      }
    ]
  }
];

export const INITIAL_CIRCLE_AGENDAS: Record<string, CircleMeetingAgenda> = {
  'circle-1': {
    circleId: 'circle-1',
    upcomingMeetingDate: 'Saturday, Oct 3, 2026 · 10:00 AM EAT',
    meetingCadence: '1st Saturday monthly · 10:00 AM EAT',
    themeTitle: 'Shared Water Stewardship & Inter-Tribal Grazing Covenants',
    templateId: 'standard_dialogue',
    templateName: 'Standard 90-Min Co-Elevation Dialogue',
    groundingNorms: 'We practice active listening from lived experience. Chatham House Rule applies. Every resource conflict holds the seed of an enduring mutual covenant.',
    discussionPoints: [
      {
        id: 'pt-1-1',
        title: 'Review Solar Bore-hole Hydrological Telemetry in Kajiado',
        description: 'Wanjiru Njeri will present real-time water table sensors and proposed weekly sharing rota between agricultural farmers and Maasai pastoralist elders.',
        durationMinutes: 15,
        category: 'action',
        suggestedBy: 'Wanjiru Njeri',
        suggestedRole: 'Youth Tech Lead',
        votes: 7,
        votedByMe: true,
        status: 'included',
        speakerLead: 'Wanjiru Njeri & Elder David',
        createdAt: '2 days ago'
      },
      {
        id: 'pt-1-2',
        title: 'Traditional Elder Mediation Protocols for Dry Season Migration',
        description: 'Structuring traditional dispute mechanisms to prevent skirmishes when cattle herds move toward river valleys next month.',
        durationMinutes: 20,
        category: 'healing',
        suggestedBy: 'David Kiprono',
        suggestedRole: 'Community Elder',
        votes: 9,
        votedByMe: true,
        status: 'included',
        speakerLead: 'David Kiprono',
        createdAt: '3 days ago'
      },
      {
        id: 'pt-1-3',
        title: 'Youth Agroforestry Seedling Distribution Schedule',
        description: 'Organizing tree planting along the riparian buffer zones to prevent topsoil runoff and restore water retention.',
        durationMinutes: 10,
        category: 'creative',
        suggestedBy: 'Amara Okafor',
        suggestedRole: 'Facilitator',
        votes: 4,
        votedByMe: false,
        status: 'suggested',
        speakerLead: 'Amara Okafor',
        createdAt: 'Yesterday'
      },
      {
        id: 'pt-1-4',
        title: 'Cross-Border Community FM Radio Early-Warning Broadcasts',
        description: 'Coordination with northern Tanzanian community radio stations to broadcast mutual drought alerts and cattle market pricing in Swahili and Maa.',
        durationMinutes: 15,
        category: 'dialogue',
        suggestedBy: 'Dr. Kofi Mensah',
        suggestedRole: 'Visiting Peace Fellow',
        votes: 3,
        votedByMe: false,
        status: 'suggested',
        createdAt: 'Today'
      }
    ],
    lastEditedBy: 'Amara Okafor',
    lastUpdatedAt: 'Today at 11:20 AM'
  },
  'circle-2': {
    circleId: 'circle-2',
    upcomingMeetingDate: 'Tuesday, Oct 13, 2026 · 6:30 PM CET',
    meetingCadence: 'Every 2nd Tuesday · 6:30 PM CET',
    themeTitle: 'Operationalizing Track 1.5 De-escalation Corridors & Helsinki 2.0',
    templateId: 'standard_dialogue',
    templateName: 'Standard 90-Min Co-Elevation Dialogue',
    groundingNorms: 'Strict Chatham House Rule. Diplomatic non-attribution ensures honest appraisal of geopolitical deadlocks and verified confidence-building measures.',
    discussionPoints: [
      {
        id: 'pt-2-1',
        title: 'Comparative Analysis: 1975 Helsinki CBMs vs 2026 Satellite Verification',
        description: 'Elena Rostova presents draft framework on open-skies commercial satellite verification to prevent flashpoints in the Black Sea and Baltic corridors.',
        durationMinutes: 20,
        category: 'dialogue',
        suggestedBy: 'Elena Rostova',
        suggestedRole: 'Legal Fellow',
        votes: 8,
        votedByMe: true,
        status: 'included',
        speakerLead: 'Elena Rostova',
        createdAt: '3 days ago'
      },
      {
        id: 'pt-2-2',
        title: 'Neutral Humanitarian Energy Corridors for Winter 2026–2027',
        description: 'Reviewing proposals to shield civil electrical grids and water treatment plants from offensive cyber and kinetic targeting through Swiss mediation.',
        durationMinutes: 20,
        category: 'action',
        suggestedBy: 'Jean-Luc Meyer',
        suggestedRole: 'Circle Facilitator',
        votes: 6,
        votedByMe: false,
        status: 'included',
        speakerLead: 'Jean-Luc Meyer',
        createdAt: '4 days ago'
      },
      {
        id: 'pt-2-3',
        title: 'AI Flashpoint Predictive Modeling: Validating UN Early-Warning Feeds',
        description: 'Examining false-positive rates of AI early-warning models in ambiguous border maneuvers.',
        durationMinutes: 15,
        category: 'creative',
        suggestedBy: 'Marcus Sterling',
        suggestedRole: 'Tech Policy Analyst',
        votes: 5,
        votedByMe: false,
        status: 'suggested',
        createdAt: 'Yesterday'
      }
    ],
    lastEditedBy: 'Jean-Luc Meyer',
    lastUpdatedAt: 'Yesterday at 4:10 PM'
  },
  'circle-3': {
    circleId: 'circle-3',
    upcomingMeetingDate: 'Thursday, Oct 8, 2026 · 7:30 PM SGT',
    meetingCadence: '1st & 3rd Thursday · 7:30 PM SGT',
    themeTitle: 'US–China AI Guardrails & Autonomous Systems Red-Lines',
    templateId: 'action_lab',
    templateName: 'Shared Action & Project Incubator (60 Min)',
    groundingNorms: 'Bridge Pacific viewpoints with mutual respect. Technology should protect human dignity rather than accelerate zero-sum hegemony.',
    discussionPoints: [
      {
        id: 'pt-3-1',
        title: 'Bilateral Academic Red-Lines on Autonomous Biological Research AI',
        description: 'Tsinghua and Stanford visiting scholars review drafted joint moratorium on cloud-connected pathogen synthesis models.',
        durationMinutes: 20,
        category: 'action',
        suggestedBy: 'Dr. Kevin Zhao',
        suggestedRole: 'AI Ethics Researcher',
        votes: 11,
        votedByMe: true,
        status: 'included',
        speakerLead: 'Dr. Kevin Zhao & Lin Wei-Ting',
        createdAt: '2 days ago'
      },
      {
        id: 'pt-3-2',
        title: 'Maritime Incident De-confliction Hotlines in the South China Sea',
        description: 'Practical digital protocols for immediate civilian fisheries and coast guard communication during tense encounters.',
        durationMinutes: 15,
        category: 'dialogue',
        suggestedBy: 'Lin Wei-Ting',
        suggestedRole: 'Facilitator',
        votes: 7,
        votedByMe: false,
        status: 'included',
        createdAt: '3 days ago'
      },
      {
        id: 'pt-3-3',
        title: 'ASEAN Youth Digital Commons Hub Launch',
        description: 'Plans for student hackathons building open-source multilingual translation tools for cross-border student diplomacy.',
        durationMinutes: 15,
        category: 'creative',
        suggestedBy: 'Nurul Huda',
        suggestedRole: 'Youth Delegate',
        votes: 5,
        votedByMe: false,
        status: 'suggested',
        createdAt: 'Yesterday'
      }
    ],
    lastEditedBy: 'Lin Wei-Ting',
    lastUpdatedAt: 'Today at 8:45 AM'
  },
  'circle-4': {
    circleId: 'circle-4',
    upcomingMeetingDate: 'Sunday, Oct 11, 2026 · 4:00 PM BRT',
    meetingCadence: '2nd Sunday monthly · 4:00 PM BRT',
    themeTitle: 'Amazon Rainforest Biome Sovereignty & Indigenous Carbon Rights',
    templateId: 'truth_healing',
    templateName: 'Truth, Reconciliation & Healing Circle (120 Min)',
    groundingNorms: 'Indigenous knowledge systems are foundational science. We listen deeply to forest guardians and bridge sustainable bioeconomy with global climate justice.',
    discussionPoints: [
      {
        id: 'pt-4-1',
        title: 'Yanomami & Kayapo Territorial Satellite Alert Protocol',
        description: 'Reviewing community drone surveillance data detecting unauthorized logging corridors and establishing legal rapid-response channels.',
        durationMinutes: 25,
        category: 'action',
        suggestedBy: 'Tiago Guajajara',
        suggestedRole: 'Indigenous Rights Liaison',
        votes: 12,
        votedByMe: true,
        status: 'included',
        speakerLead: 'Tiago Guajajara',
        createdAt: '4 days ago'
      },
      {
        id: 'pt-4-2',
        title: 'Direct Benefit Carbon Revenue Distribution Directly to Riverine Cooperatives',
        description: 'Bypassing speculative brokers to ensure 90% of global carbon price revenues land directly with forest guardian families.',
        durationMinutes: 25,
        category: 'dialogue',
        suggestedBy: 'Luciana Santos',
        suggestedRole: 'Facilitator',
        votes: 8,
        votedByMe: false,
        status: 'included',
        speakerLead: 'Luciana Santos',
        createdAt: '3 days ago'
      },
      {
        id: 'pt-4-3',
        title: 'Bio-pharmacy Traditional Knowledge Registry under Nagoya Protocol',
        description: 'Protecting sacred botanical medicinal patents from predatory multinational biopiracy.',
        durationMinutes: 20,
        category: 'healing',
        suggestedBy: 'Prof. Rafael Morales',
        suggestedRole: 'Ethnobotanist',
        votes: 6,
        votedByMe: false,
        status: 'suggested',
        createdAt: 'Yesterday'
      }
    ],
    lastEditedBy: 'Luciana Santos',
    lastUpdatedAt: '3 days ago'
  },
  'circle-5': {
    circleId: 'circle-5',
    upcomingMeetingDate: 'Saturday, Oct 17, 2026 · 5:30 PM IST',
    meetingCadence: 'Every 3rd Saturday · 5:30 PM IST',
    themeTitle: 'South Asian River Basin Peace Treaties & Clean Energy Integration',
    templateId: 'standard_dialogue',
    templateName: 'Standard 90-Min Co-Elevation Dialogue',
    groundingNorms: 'Water and air do not carry passports. The Indus and Ganges-Brahmaputra basins bind our destinies in mutual survival and climate resilience.',
    discussionPoints: [
      {
        id: 'pt-5-1',
        title: 'Indus Water Treaty Modernization: Himalayan Glacial Runoff Tracking',
        description: 'Joint data-sharing protocol between Indian and Pakistani hydrologists on real-time glacial lake outburst flood warnings.',
        durationMinutes: 20,
        category: 'action',
        suggestedBy: 'Arjun Mehta',
        suggestedRole: 'Circle Facilitator',
        votes: 9,
        votedByMe: true,
        status: 'included',
        createdAt: '5 days ago'
      },
      {
        id: 'pt-5-2',
        title: 'Cross-Border Smog & Air Quality Cooperative Action Plan',
        description: 'Coordinated stubble-biochar conversion programs across Punjab (India & Pakistan) to eliminate seasonal winter pollution crises.',
        durationMinutes: 20,
        category: 'dialogue',
        suggestedBy: 'Dr. Priya Sharma',
        suggestedRole: 'Environmental Health Lead',
        votes: 7,
        votedByMe: false,
        status: 'included',
        createdAt: '4 days ago'
      },
      {
        id: 'pt-5-3',
        title: 'South Asian Regional Solar Microgrid Settlement Mechanism',
        description: 'Exploring cross-border green kilowatt-hour trading between Nepal hydro, Rajasthan solar, and Bangladesh distribution.',
        durationMinutes: 15,
        category: 'creative',
        suggestedBy: 'Farhan Qureshi',
        suggestedRole: 'Energy Systems Engineer',
        votes: 5,
        votedByMe: false,
        status: 'suggested',
        createdAt: 'Yesterday'
      }
    ],
    lastEditedBy: 'Arjun Mehta',
    lastUpdatedAt: '2 days ago'
  },
  'circle-6': {
    circleId: 'circle-6',
    upcomingMeetingDate: 'Friday, Oct 2, 2026 · 7:00 PM JST',
    meetingCadence: '1st Friday monthly · 7:00 PM JST',
    themeTitle: 'Northeast Asia Nuclear De-risking & Historical Reconciliation',
    templateId: 'truth_healing',
    templateName: 'Truth, Reconciliation & Healing Circle (120 Min)',
    groundingNorms: 'Acknowledging 20th century historical wounds openly unlocks our shared 21st century cooperative potential in science, arts, and peaceful energy.',
    discussionPoints: [
      {
        id: 'pt-6-1',
        title: 'Trilateral Student Exchange Program on Shared Maritime History',
        description: 'Proposal for joint high school history modules collaboratively developed by Japanese, South Korean, and Chinese educators.',
        durationMinutes: 30,
        category: 'healing',
        suggestedBy: 'Kenji Sato',
        suggestedRole: 'Facilitator',
        votes: 10,
        votedByMe: true,
        status: 'included',
        createdAt: '4 days ago'
      },
      {
        id: 'pt-6-2',
        title: 'Nuclear-Weapon-Free Zone Treaty Draft for the Korean Peninsula',
        description: 'Analyzing phased security guarantees and mutual non-aggression protocols guaranteed by regional powers.',
        durationMinutes: 25,
        category: 'dialogue',
        suggestedBy: 'Yuki Tanaka',
        suggestedRole: 'Disarmament Researcher',
        votes: 8,
        votedByMe: false,
        status: 'included',
        createdAt: '3 days ago'
      }
    ],
    lastEditedBy: 'Kenji Sato',
    lastUpdatedAt: 'Yesterday'
  }
};

/**
 * Returns a fallback default agenda for circles that do not have custom initial entries.
 */
export function getCircleDefaultAgenda(circleId: string, circleName: string, meetingTime: string, topic: string, contactPerson: string): CircleMeetingAgenda {
  return {
    circleId,
    upcomingMeetingDate: `Upcoming Session · ${meetingTime}`,
    meetingCadence: meetingTime,
    themeTitle: `${topic}: Building Positive-Sum Cooperation`,
    templateId: 'standard_dialogue',
    templateName: 'Standard 90-Min Co-Elevation Dialogue',
    groundingNorms: `Chatham House Rule in effect. We honor ${contactPerson} and all members' perspectives, seeking solutions where every stakeholder wins.`,
    discussionPoints: [
      {
        id: `pt-${circleId}-1`,
        title: `Core Dialogue: Deconstructing ${topic}`,
        description: `Facilitator ${contactPerson} introduces key local challenges and systemic friction points under Chatham House Rule.`,
        durationMinutes: 25,
        category: 'dialogue',
        suggestedBy: contactPerson,
        suggestedRole: 'Circle Facilitator',
        votes: 6,
        votedByMe: false,
        status: 'included',
        speakerLead: contactPerson,
        createdAt: 'Initial Setup'
      },
      {
        id: `pt-${circleId}-2`,
        title: 'Local Resource Mapping & Mutual Aid Opportunities',
        description: 'Collaborative round identifying untapped local synergies, cross-cultural partnerships, and shared facilities.',
        durationMinutes: 20,
        category: 'action',
        suggestedBy: 'Active Circle Members',
        suggestedRole: 'Working Group',
        votes: 4,
        votedByMe: false,
        status: 'included',
        createdAt: 'Initial Setup'
      },
      {
        id: `pt-${circleId}-3`,
        title: 'Drafting our Monthly Shared Future Covenant',
        description: 'Formulating 2 actionable steps our circle will test and report back on at our next monthly gathering.',
        durationMinutes: 15,
        category: 'action',
        suggestedBy: contactPerson,
        suggestedRole: 'Circle Facilitator',
        votes: 5,
        votedByMe: false,
        status: 'included',
        createdAt: 'Initial Setup'
      }
    ],
    lastEditedBy: contactPerson,
    lastUpdatedAt: 'Recently'
  };
}
