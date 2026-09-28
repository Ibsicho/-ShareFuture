import { CircleChatMessage, CircleDiscussionArchive } from '../types';

export const INITIAL_CIRCLE_CHATS: Record<string, CircleChatMessage[]> = {
  'circle-1': [
    {
      id: 'msg-1-1',
      circleId: 'circle-1',
      senderName: 'Amara Okafor',
      senderRole: 'Circle Facilitator',
      content: 'Jambo everyone! Welcome to the Nairobi Peace Builders space. Our next session explores shared water management between agricultural and pastoralist representatives in Kajiado.',
      timestamp: 'Yesterday at 3:15 PM',
      isSelf: false
    },
    {
      id: 'msg-1-2',
      circleId: 'circle-1',
      senderName: 'David Kiprono',
      senderRole: 'Community Elder',
      content: 'Thank you Amara. I will be bringing elders from both sides. We have prepared traditional mediation reflections to start our gathering.',
      timestamp: 'Yesterday at 4:40 PM',
      isSelf: false
    },
    {
      id: 'msg-1-3',
      circleId: 'circle-1',
      senderName: 'Wanjiru Njeri',
      senderRole: 'Youth Organizer',
      content: 'I uploaded the solar bore-hole hydrological data to our community drive. Looking forward to Saturday!',
      timestamp: 'Today at 9:12 AM',
      isSelf: false
    }
  ],
  'circle-2': [
    {
      id: 'msg-2-1',
      circleId: 'circle-2',
      senderName: 'Jean-Luc Meyer',
      senderRole: 'Circle Facilitator',
      content: 'Welcome delegates and advocates to the Geneva Diplomatic Bridge. Next Tuesday we will review backchannel proposals for de-escalation corridors.',
      timestamp: '2 days ago',
      isSelf: false
    },
    {
      id: 'msg-2-2',
      circleId: 'circle-2',
      senderName: 'Elena Rostova',
      senderRole: 'Legal Fellow',
      content: 'I have prepared a comparative table analyzing 1975 Helsinki Accords confidence-building measures versus present European frameworks.',
      timestamp: 'Yesterday at 11:05 AM',
      isSelf: false
    }
  ],
  'circle-3': [
    {
      id: 'msg-3-1',
      circleId: 'circle-3',
      senderName: 'Lin Wei-Ting',
      senderRole: 'Circle Facilitator',
      content: 'Greetings everyone. For this Thursday’s hybrid session, our guest researcher from Tsinghua will join our Stanford colleagues to discuss AI safety red-lines.',
      timestamp: '3 days ago',
      isSelf: false
    }
  ]
};

export const INITIAL_CIRCLE_ARCHIVES: Record<string, CircleDiscussionArchive[]> = {
  'circle-1': [
    {
      id: 'arch-1-1',
      circleId: 'circle-1',
      meetingDate: 'August 2026',
      title: 'Transboundary Borehole Stewardship & Grazing Accords',
      topic: 'Historical Healing & Resource Cooperation',
      attendeesCount: 6,
      keyInsights: [
        'Divergent historical land narratives must be voiced completely without interruption before technical water quotas can be negotiated.',
        'Youth pastoralists and sedentary farmers both identified climate change and prolonged droughts—not each other—as the primary stressor.',
        'Shared spiritual reverence for water sources bridges generational and tribal divides.'
      ],
      agreedActions: [
        'Co-install open IoT solar groundwater meters at 3 disputed boundary points.',
        'Host a joint inter-clan planting festival before the short rains.',
        'Draft a bilingual community charter (Swahili & Maa) for dry-season access.'
      ],
      loggedBy: 'Amara Okafor',
      createdAt: '2026-08-08',
      recordingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      recordingDuration: '00:15',
      recordingType: 'video',
      recordingBlobSize: '3.8 MB'
    },
    {
      id: 'arch-1-2',
      circleId: 'circle-1',
      meetingDate: 'July 2026',
      title: 'Breaking the Cycle of Preemptive Retaliation',
      topic: 'Restorative Truth & Nonviolent Communication',
      attendeesCount: 7,
      keyInsights: [
        'Rumors on social messaging apps ignite 80% of local ethnic skirmishes before facts are confirmed.',
        'A verified circle WhatsApp emergency hotline can debunk fabricated livestock theft rumors within 15 minutes.'
      ],
      agreedActions: [
        'Establish 4 designated youth rumor-checkers across clan border towns.',
        'Conduct joint peer mediation training with local chiefs.'
      ],
      loggedBy: 'David Kiprono',
      createdAt: '2026-07-06'
    }
  ],
  'circle-2': [
    {
      id: 'arch-2-1',
      circleId: 'circle-2',
      meetingDate: 'August 2026',
      title: 'Citizen Track-II Diplomacy: Nuclear Risk Reduction',
      topic: 'Great Power Dialogue & Ceasefire Protocols',
      attendeesCount: 7,
      keyInsights: [
        'Informal Track-II channels allow diplomats to explore compromise language without public political posturing.',
        'Early-warning hotline verification protocols can prevent algorithmic escalation in satellite surveillance.'
      ],
      agreedActions: [
        'Submit a joint citizen memo on bilateral crisis communication to the Swiss Federal Department of Foreign Affairs.',
        'Prepare briefing packet for the UN General Assembly sidelines.'
      ],
      loggedBy: 'Jean-Luc Meyer',
      createdAt: '2026-08-14'
    }
  ],
  'circle-3': [
    {
      id: 'arch-3-1',
      circleId: 'circle-3',
      meetingDate: 'August 2026',
      title: 'Open Scientific Alignment Protocols for Frontier AI',
      topic: 'US–China Positive Competition & Tech Governance',
      attendeesCount: 8,
      keyInsights: [
        'Both Chinese and Western labs face identical mathematical containment challenges regarding autonomous agent self-replication.',
        'Neutral verification regimes located in Singapore or Switzerland offer the highest mutual credibility.'
      ],
      agreedActions: [
        'Co-author an open-source technical benchmark paper on autonomous escalation prevention.',
        'Organize next month’s bilateral young researchers symposium.'
      ],
      loggedBy: 'Lin Wei-Ting',
      createdAt: '2026-08-22'
    }
  ]
};
