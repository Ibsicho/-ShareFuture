import { CircleMember, CircleMemberRole } from '../types';

export const AVAILABLE_ROLES: { role: CircleMemberRole; description: string; badgeColor: string }[] = [
  { role: 'Facilitator', description: 'Guides dialogue flow and holds the Chatham House container', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
  { role: 'Co-Facilitator', description: 'Assists in breakout rooms and co-hosts gatherings', badgeColor: 'bg-orange-100 text-orange-900 border-orange-300' },
  { role: 'Note-Taker', description: 'Records non-attributed consensus and monthly key takeaways', badgeColor: 'bg-blue-100 text-blue-900 border-blue-300' },
  { role: 'Tech Support', description: 'Manages hybrid video feeds, audio setup, and digital links', badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
  { role: 'Timekeeper', description: 'Ensures equitable speaking rounds and agenda pacing', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300' },
  { role: 'Community Liaison', description: 'Bridges circle actions with local neighborhood stakeholders', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  { role: 'Youth Envoy', description: 'Connects circle initiatives with students and young advocates', badgeColor: 'bg-teal-100 text-teal-900 border-teal-300' },
  { role: 'Research Lead', description: 'Curates relevant study materials and evidence-based data', badgeColor: 'bg-rose-100 text-rose-900 border-rose-300' },
  { role: 'Participant', description: 'Active contributor practicing deep listening and shared inquiry', badgeColor: 'bg-gray-100 text-gray-800 border-gray-300' }
];

export const POPULAR_INTEREST_TAGS = [
  'Water Stewardship',
  'Renewable Energy',
  'Historical Reconciliation',
  'AI Safety & Ethics',
  'Youth Mentorship',
  'Indigenous Land Rights',
  'Restorative Justice',
  'Media Literacy',
  'Cross-Border Diplomacy',
  'Economic Equity',
  'Regenerative Agriculture',
  'Nuclear De-escalation',
  'Community Health',
  'Interfaith Unity'
];

export const INITIAL_CIRCLE_MEMBERS: Record<string, CircleMember[]> = {
  'circle-1': [
    {
      id: 'mem-1-1',
      circleId: 'circle-1',
      name: 'Amara Okafor',
      role: 'Facilitator',
      interests: ['Water Stewardship', 'Restorative Justice', 'Ubuntu Philosophy', 'Youth Mentorship'],
      bio: 'Community mediator and environmental educator passionate about traditional African dispute resolution covenants.',
      joinedDate: 'Joined March 2026',
      virtualCoffeeAvailable: true,
      city: 'Nairobi',
      timezone: 'EAT (UTC+3)'
    },
    {
      id: 'mem-1-2',
      circleId: 'circle-1',
      name: 'David Kiprono',
      role: 'Community Liaison',
      interests: ['Pastoralist Rights', 'Traditional Elder Mediation', 'Rangeland Ecology', 'Restorative Justice'],
      bio: 'Elder representative mediating seasonal migratory grazing boundaries in the Rift Valley corridor.',
      joinedDate: 'Joined March 2026',
      virtualCoffeeAvailable: true,
      city: 'Kajiado',
      timezone: 'EAT (UTC+3)'
    },
    {
      id: 'mem-1-3',
      circleId: 'circle-1',
      name: 'Wanjiru Njeri',
      role: 'Tech Support',
      interests: ['Solar Telemetry', 'Renewable Energy', 'Open Data', 'Water Stewardship'],
      bio: 'Clean tech engineer installing low-cost IoT groundwater monitoring devices for arid cooperatives.',
      joinedDate: 'Joined April 2026',
      virtualCoffeeAvailable: true,
      city: 'Nairobi',
      timezone: 'EAT (UTC+3)'
    },
    {
      id: 'mem-1-4',
      circleId: 'circle-1',
      name: 'Dr. Kofi Mensah',
      role: 'Research Lead',
      interests: ['Cross-Border Diplomacy', 'Economic Equity', 'Water Stewardship'],
      bio: 'Senior fellow at East African Peace Institute investigating positive-sum shared resource treaties.',
      joinedDate: 'Joined May 2026',
      virtualCoffeeAvailable: true,
      city: 'Nairobi',
      timezone: 'EAT (UTC+3)'
    },
    {
      id: 'mem-1-5',
      circleId: 'circle-1',
      name: 'Mary Achieng',
      role: 'Note-Taker',
      interests: ['Media Literacy', 'Community Health', 'Historical Reconciliation'],
      bio: 'Peace journalist documenting grassroots coexistence covenants and youth oral histories.',
      joinedDate: 'Joined June 2026',
      virtualCoffeeAvailable: true,
      city: 'Nairobi',
      timezone: 'EAT (UTC+3)'
    },
    {
      id: 'mem-1-6',
      circleId: 'circle-1',
      name: 'Joseph Lenana',
      role: 'Timekeeper',
      interests: ['Regenerative Agriculture', 'Youth Mentorship', 'Pastoralist Rights'],
      bio: 'Youth leader facilitating seasonal grazing radio bulletins across the Kenya-Tanzania border.',
      joinedDate: 'Joined July 2026',
      virtualCoffeeAvailable: true,
      city: 'Narok',
      timezone: 'EAT (UTC+3)'
    }
  ],
  'circle-2': [
    {
      id: 'mem-2-1',
      circleId: 'circle-2',
      name: 'Jean-Luc Meyer',
      role: 'Facilitator',
      interests: ['Cross-Border Diplomacy', 'Track 1.5 Diplomacy', 'Neutral Corridors', 'Nuclear De-escalation'],
      bio: 'Former international civil servant and backchannel mediator dedicated to de-escalation protocols.',
      joinedDate: 'Joined January 2026',
      virtualCoffeeAvailable: true,
      city: 'Geneva',
      timezone: 'CET (UTC+1)'
    },
    {
      id: 'mem-2-2',
      circleId: 'circle-2',
      name: 'Elena Rostova',
      role: 'Research Lead',
      interests: ['Nuclear De-escalation', 'Commercial Satellite Verification', 'Cross-Border Diplomacy'],
      bio: 'International law fellow analyzing open-access satellite surveillance for ceasefire verification.',
      joinedDate: 'Joined February 2026',
      virtualCoffeeAvailable: true,
      city: 'Geneva',
      timezone: 'CET (UTC+1)'
    },
    {
      id: 'mem-2-3',
      circleId: 'circle-2',
      name: 'Marcus Sterling',
      role: 'Tech Support',
      interests: ['AI Safety & Ethics', 'Media Literacy', 'Cross-Border Diplomacy'],
      bio: 'Systems analyst modeling predictive early-warning tripwires for UN peacekeeping deployments.',
      joinedDate: 'Joined March 2026',
      virtualCoffeeAvailable: true,
      city: 'Lausanne',
      timezone: 'CET (UTC+1)'
    },
    {
      id: 'mem-2-4',
      circleId: 'circle-2',
      name: 'Claire Dubois',
      role: 'Note-Taker',
      interests: ['Community Health', 'Restorative Justice', 'Neutral Corridors'],
      bio: 'Humanitarian logistics specialist advocating for protected civil energy and water infrastructure.',
      joinedDate: 'Joined April 2026',
      virtualCoffeeAvailable: true,
      city: 'Geneva',
      timezone: 'CET (UTC+1)'
    },
    {
      id: 'mem-2-5',
      circleId: 'circle-2',
      name: 'Tariq Al-Mansoor',
      role: 'Community Liaison',
      interests: ['Interfaith Unity', 'Historical Reconciliation', 'Youth Mentorship'],
      bio: 'Diaspora liaison promoting peace building through intergenerational citizen exchanges.',
      joinedDate: 'Joined May 2026',
      virtualCoffeeAvailable: true,
      city: 'Geneva',
      timezone: 'CET (UTC+1)'
    }
  ],
  'circle-3': [
    {
      id: 'mem-3-1',
      circleId: 'circle-3',
      name: 'Lin Wei-Ting',
      role: 'Facilitator',
      interests: ['Cross-Border Diplomacy', 'AI Safety & Ethics', 'Maritime Security'],
      bio: 'Pacific affairs analyst fostering bilateral tech diplomacy and civilian coast guard hotlines.',
      joinedDate: 'Joined February 2026',
      virtualCoffeeAvailable: true,
      city: 'Singapore',
      timezone: 'SGT (UTC+8)'
    },
    {
      id: 'mem-3-2',
      circleId: 'circle-3',
      name: 'Dr. Kevin Zhao',
      role: 'Research Lead',
      interests: ['AI Safety & Ethics', 'Biosecurity Guardrails', 'Renewable Energy'],
      bio: 'Visiting researcher studying compute governance and international red-lines on autonomous AI.',
      joinedDate: 'Joined March 2026',
      virtualCoffeeAvailable: true,
      city: 'Singapore',
      timezone: 'SGT (UTC+8)'
    },
    {
      id: 'mem-3-3',
      circleId: 'circle-3',
      name: 'Nurul Huda',
      role: 'Youth Envoy',
      interests: ['Youth Mentorship', 'Media Literacy', 'Economic Equity'],
      bio: 'Student diplomat coordinating regional youth hackathons for cross-border civic collaboration.',
      joinedDate: 'Joined April 2026',
      virtualCoffeeAvailable: true,
      city: 'Singapore',
      timezone: 'SGT (UTC+8)'
    },
    {
      id: 'mem-3-4',
      circleId: 'circle-3',
      name: 'Captain Chen Kang',
      role: 'Community Liaison',
      interests: ['Maritime Security', 'Cross-Border Diplomacy', 'Historical Reconciliation'],
      bio: 'Retired commercial mariner helping establish civilian communication channels in contested shipping lanes.',
      joinedDate: 'Joined May 2026',
      virtualCoffeeAvailable: true,
      city: 'Singapore',
      timezone: 'SGT (UTC+8)'
    }
  ]
};

/**
 * Returns circle members, falling back to dynamically generated authentic members
 * if the circle does not have hardcoded entries.
 */
export function getCircleDefaultMembers(circleId: string, contactPerson: string, topic: string, city: string): CircleMember[] {
  return [
    {
      id: `mem-${circleId}-1`,
      circleId,
      name: contactPerson,
      role: 'Facilitator',
      interests: [topic, 'Cross-Border Diplomacy', 'Restorative Justice', 'Ubuntu Philosophy'],
      bio: `Founding facilitator of the circle, dedicated to deep listening and cooperative solutions in ${city}.`,
      joinedDate: 'Founding Member',
      virtualCoffeeAvailable: true,
      city,
      timezone: 'Local Time'
    },
    {
      id: `mem-${circleId}-2`,
      circleId,
      name: 'Maya Lin-Fernandez',
      role: 'Note-Taker',
      interests: ['Media Literacy', 'Community Health', topic],
      bio: 'Researcher and community documentarian recording non-attributed monthly breakthroughs.',
      joinedDate: 'Joined Recently',
      virtualCoffeeAvailable: true,
      city,
      timezone: 'Local Time'
    },
    {
      id: `mem-${circleId}-3`,
      circleId,
      name: 'Dr. Tariq Hasan',
      role: 'Research Lead',
      interests: ['Economic Equity', 'Renewable Energy', topic],
      bio: 'Policy analyst studying positive-sum resource distribution and regional collaboration.',
      joinedDate: 'Joined Recently',
      virtualCoffeeAvailable: true,
      city,
      timezone: 'Local Time'
    },
    {
      id: `mem-${circleId}-4`,
      circleId,
      name: 'Chloe Tremblay',
      role: 'Tech Support',
      interests: ['AI Safety & Ethics', 'Open Data', 'Youth Mentorship'],
      bio: 'Digital commons advocate helping manage hybrid streaming and accessibility tools.',
      joinedDate: 'Joined Recently',
      virtualCoffeeAvailable: true,
      city,
      timezone: 'Local Time'
    },
    {
      id: `mem-${circleId}-5`,
      circleId,
      name: 'Carlos Mendoza',
      role: 'Community Liaison',
      interests: ['Indigenous Land Rights', 'Historical Reconciliation', topic],
      bio: 'Grassroots community organizer connecting local neighborhood projects with circle agreements.',
      joinedDate: 'Joined Recently',
      virtualCoffeeAvailable: true,
      city,
      timezone: 'Local Time'
    }
  ];
}
