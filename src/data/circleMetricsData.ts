export interface CircleMonthlyMetric {
  month: string;
  attendanceCount: number;
  attendanceRate: number; // percentage e.g. 90%
  expectedAttendees: number;
  activeContributors: number;
  agendaItemsProposed: number;
  virtualCoffeeSessions: number;
  resourcesShared: number;
  cumulativeResources: number;
  resourceDownloads: number;
}

export interface CircleMetricsProfile {
  circleId: string;
  circleName: string;
  overallAttendanceRate: number;
  totalSessionsHeld: number;
  totalResourcesShared: number;
  activeParticipationIndex: number;
  virtualCoffeesCompleted: number;
  monthlyData: CircleMonthlyMetric[];
  participationByRole: {
    role: string;
    count: number;
    activityPercent: number;
  }[];
  resourceTypeBreakdown: {
    type: string;
    count: number;
    fill: string;
  }[];
  keyHighlights: string[];
}

export const CIRCLE_METRICS_DATA: Record<string, CircleMetricsProfile> = {
  'circle-1': {
    circleId: 'circle-1',
    circleName: 'Nairobi Peace Builders',
    overallAttendanceRate: 94.2,
    totalSessionsHeld: 8,
    totalResourcesShared: 14,
    activeParticipationIndex: 96,
    virtualCoffeesCompleted: 12,
    monthlyData: [
      {
        month: 'Apr',
        attendanceCount: 6,
        attendanceRate: 85,
        expectedAttendees: 7,
        activeContributors: 5,
        agendaItemsProposed: 3,
        virtualCoffeeSessions: 2,
        resourcesShared: 1,
        cumulativeResources: 3,
        resourceDownloads: 14
      },
      {
        month: 'May',
        attendanceCount: 7,
        attendanceRate: 88,
        expectedAttendees: 8,
        activeContributors: 6,
        agendaItemsProposed: 4,
        virtualCoffeeSessions: 3,
        resourcesShared: 2,
        cumulativeResources: 5,
        resourceDownloads: 28
      },
      {
        month: 'Jun',
        attendanceCount: 8,
        attendanceRate: 100,
        expectedAttendees: 8,
        activeContributors: 8,
        agendaItemsProposed: 6,
        virtualCoffeeSessions: 5,
        resourcesShared: 3,
        cumulativeResources: 8,
        resourceDownloads: 46
      },
      {
        month: 'Jul',
        attendanceCount: 7,
        attendanceRate: 88,
        expectedAttendees: 8,
        activeContributors: 7,
        agendaItemsProposed: 5,
        virtualCoffeeSessions: 6,
        resourcesShared: 2,
        cumulativeResources: 10,
        resourceDownloads: 62
      },
      {
        month: 'Aug',
        attendanceCount: 8,
        attendanceRate: 100,
        expectedAttendees: 8,
        activeContributors: 8,
        agendaItemsProposed: 7,
        virtualCoffeeSessions: 8,
        resourcesShared: 2,
        cumulativeResources: 12,
        resourceDownloads: 85
      },
      {
        month: 'Sep',
        attendanceCount: 8,
        attendanceRate: 100,
        expectedAttendees: 8,
        activeContributors: 8,
        agendaItemsProposed: 8,
        virtualCoffeeSessions: 9,
        resourcesShared: 2,
        cumulativeResources: 14,
        resourceDownloads: 110
      }
    ],
    participationByRole: [
      { role: 'Facilitators', count: 2, activityPercent: 98 },
      { role: 'Elders & Liaisons', count: 2, activityPercent: 95 },
      { role: 'Youth Envoys', count: 2, activityPercent: 94 },
      { role: 'Note-Takers & Tech', count: 2, activityPercent: 92 }
    ],
    resourceTypeBreakdown: [
      { type: 'Policy Briefs & Frameworks', count: 5, fill: '#0A2463' },
      { type: 'Hydrological Field Guides', count: 4, fill: '#1E6091' },
      { type: 'Academic Peace Research', count: 3, fill: '#D4A017' },
      { type: 'Customary Case Studies', count: 2, fill: '#059669' }
    ],
    keyHighlights: [
      '100% meeting attendance recorded in 3 out of last 4 monthly gatherings.',
      'Shared resources doubled from June to September following installation of community borehole sensors.',
      'Virtual coffee 1-on-1 pairings achieved a 96% connection satisfaction rating across clan lines.'
    ]
  },
  'circle-2': {
    circleId: 'circle-2',
    circleName: 'Geneva Diplomatic Bridge',
    overallAttendanceRate: 91.5,
    totalSessionsHeld: 7,
    totalResourcesShared: 11,
    activeParticipationIndex: 93,
    virtualCoffeesCompleted: 9,
    monthlyData: [
      {
        month: 'Apr',
        attendanceCount: 5,
        attendanceRate: 83,
        expectedAttendees: 6,
        activeContributors: 4,
        agendaItemsProposed: 2,
        virtualCoffeeSessions: 1,
        resourcesShared: 1,
        cumulativeResources: 2,
        resourceDownloads: 18
      },
      {
        month: 'May',
        attendanceCount: 5,
        attendanceRate: 83,
        expectedAttendees: 6,
        activeContributors: 5,
        agendaItemsProposed: 3,
        virtualCoffeeSessions: 2,
        resourcesShared: 2,
        cumulativeResources: 4,
        resourceDownloads: 34
      },
      {
        month: 'Jun',
        attendanceCount: 6,
        attendanceRate: 100,
        expectedAttendees: 6,
        activeContributors: 6,
        agendaItemsProposed: 5,
        virtualCoffeeSessions: 4,
        resourcesShared: 2,
        cumulativeResources: 6,
        resourceDownloads: 52
      },
      {
        month: 'Jul',
        attendanceCount: 6,
        attendanceRate: 100,
        expectedAttendees: 6,
        activeContributors: 6,
        agendaItemsProposed: 4,
        virtualCoffeeSessions: 5,
        resourcesShared: 2,
        cumulativeResources: 8,
        resourceDownloads: 76
      },
      {
        month: 'Aug',
        attendanceCount: 5,
        attendanceRate: 83,
        expectedAttendees: 6,
        activeContributors: 5,
        agendaItemsProposed: 4,
        virtualCoffeeSessions: 6,
        resourcesShared: 1,
        cumulativeResources: 9,
        resourceDownloads: 94
      },
      {
        month: 'Sep',
        attendanceCount: 6,
        attendanceRate: 100,
        expectedAttendees: 6,
        activeContributors: 6,
        agendaItemsProposed: 6,
        virtualCoffeeSessions: 7,
        resourcesShared: 2,
        cumulativeResources: 11,
        resourceDownloads: 125
      }
    ],
    participationByRole: [
      { role: 'Diplomatic Envoys', count: 2, activityPercent: 96 },
      { role: 'International Law Fellows', count: 2, activityPercent: 92 },
      { role: 'Civil Society Observers', count: 1, activityPercent: 90 },
      { role: 'Research Leads', count: 1, activityPercent: 95 }
    ],
    resourceTypeBreakdown: [
      { type: 'Treaty Drafts & Accords', count: 4, fill: '#0A2463' },
      { type: 'Legal Comparatives', count: 3, fill: '#1E6091' },
      { type: 'De-escalation Case Studies', count: 2, fill: '#7C3AED' },
      { type: 'Chatham Memoranda', count: 2, fill: '#D4A017' }
    ],
    keyHighlights: [
      'High attendance stability across complex diplomatic tracks with 91.5% retention.',
      'Over 125 research downloads of confidential de-escalation frameworks.',
      'Virtual coffee connections initiated 3 cross-embassy joint working papers.'
    ]
  },
  'circle-3': {
    circleId: 'circle-3',
    circleName: 'Singapore Pacific Dialogue',
    overallAttendanceRate: 96.0,
    totalSessionsHeld: 9,
    totalResourcesShared: 16,
    activeParticipationIndex: 98,
    virtualCoffeesCompleted: 15,
    monthlyData: [
      {
        month: 'Apr',
        attendanceCount: 8,
        attendanceRate: 89,
        expectedAttendees: 9,
        activeContributors: 7,
        agendaItemsProposed: 4,
        virtualCoffeeSessions: 3,
        resourcesShared: 2,
        cumulativeResources: 4,
        resourceDownloads: 32
      },
      {
        month: 'May',
        attendanceCount: 9,
        attendanceRate: 100,
        expectedAttendees: 9,
        activeContributors: 8,
        agendaItemsProposed: 6,
        virtualCoffeeSessions: 4,
        resourcesShared: 3,
        cumulativeResources: 7,
        resourceDownloads: 68
      },
      {
        month: 'Jun',
        attendanceCount: 9,
        attendanceRate: 100,
        expectedAttendees: 9,
        activeContributors: 9,
        agendaItemsProposed: 7,
        virtualCoffeeSessions: 6,
        resourcesShared: 2,
        cumulativeResources: 9,
        resourceDownloads: 110
      },
      {
        month: 'Jul',
        attendanceCount: 9,
        attendanceRate: 100,
        expectedAttendees: 9,
        activeContributors: 9,
        agendaItemsProposed: 8,
        virtualCoffeeSessions: 7,
        resourcesShared: 3,
        cumulativeResources: 12,
        resourceDownloads: 160
      },
      {
        month: 'Aug',
        attendanceCount: 8,
        attendanceRate: 89,
        expectedAttendees: 9,
        activeContributors: 8,
        agendaItemsProposed: 6,
        virtualCoffeeSessions: 9,
        resourcesShared: 2,
        cumulativeResources: 14,
        resourceDownloads: 210
      },
      {
        month: 'Sep',
        attendanceCount: 9,
        attendanceRate: 100,
        expectedAttendees: 9,
        activeContributors: 9,
        agendaItemsProposed: 9,
        virtualCoffeeSessions: 11,
        resourcesShared: 2,
        cumulativeResources: 16,
        resourceDownloads: 275
      }
    ],
    participationByRole: [
      { role: 'AI Safety Researchers', count: 3, activityPercent: 99 },
      { role: 'Maritime Policy Analysts', count: 2, activityPercent: 96 },
      { role: 'Cross-Strait Mediators', count: 2, activityPercent: 94 },
      { role: 'Tech Ethics Fellows', count: 2, activityPercent: 97 }
    ],
    resourceTypeBreakdown: [
      { type: 'Autonomous Safety Red-Lines', count: 6, fill: '#0A2463' },
      { type: 'Maritime Incident Protocols', count: 4, fill: '#1E6091' },
      { type: 'Silicon Commons Papers', count: 3, fill: '#059669' },
      { type: 'Bilateral Standards', count: 3, fill: '#D4A017' }
    ],
    keyHighlights: [
      'Pioneered AI bio-safety technical consensus across Stanford & Tsinghua fellows.',
      'Highest resource download volume across all active global circles (275 downloads).',
      '15 bilateral virtual coffee pairings completed across time zones.'
    ]
  }
};

export const getCircleDefaultMetrics = (circleId: string, circleName: string): CircleMetricsProfile => {
  if (CIRCLE_METRICS_DATA[circleId]) {
    return CIRCLE_METRICS_DATA[circleId];
  }

  // Dynamic profile for any custom or created circle
  return {
    circleId,
    circleName,
    overallAttendanceRate: 92.0,
    totalSessionsHeld: 6,
    totalResourcesShared: 8,
    activeParticipationIndex: 91,
    virtualCoffeesCompleted: 7,
    monthlyData: [
      {
        month: 'Apr',
        attendanceCount: 5,
        attendanceRate: 83,
        expectedAttendees: 6,
        activeContributors: 4,
        agendaItemsProposed: 2,
        virtualCoffeeSessions: 1,
        resourcesShared: 1,
        cumulativeResources: 2,
        resourceDownloads: 12
      },
      {
        month: 'May',
        attendanceCount: 5,
        attendanceRate: 83,
        expectedAttendees: 6,
        activeContributors: 5,
        agendaItemsProposed: 3,
        virtualCoffeeSessions: 2,
        resourcesShared: 1,
        cumulativeResources: 3,
        resourceDownloads: 24
      },
      {
        month: 'Jun',
        attendanceCount: 6,
        attendanceRate: 100,
        expectedAttendees: 6,
        activeContributors: 6,
        agendaItemsProposed: 4,
        virtualCoffeeSessions: 3,
        resourcesShared: 2,
        cumulativeResources: 5,
        resourceDownloads: 41
      },
      {
        month: 'Jul',
        attendanceCount: 5,
        attendanceRate: 83,
        expectedAttendees: 6,
        activeContributors: 5,
        agendaItemsProposed: 4,
        virtualCoffeeSessions: 4,
        resourcesShared: 1,
        cumulativeResources: 6,
        resourceDownloads: 58
      },
      {
        month: 'Aug',
        attendanceCount: 6,
        attendanceRate: 100,
        expectedAttendees: 6,
        activeContributors: 6,
        agendaItemsProposed: 5,
        virtualCoffeeSessions: 5,
        resourcesShared: 1,
        cumulativeResources: 7,
        resourceDownloads: 75
      },
      {
        month: 'Sep',
        attendanceCount: 6,
        attendanceRate: 100,
        expectedAttendees: 6,
        activeContributors: 6,
        agendaItemsProposed: 5,
        virtualCoffeeSessions: 6,
        resourcesShared: 1,
        cumulativeResources: 8,
        resourceDownloads: 92
      }
    ],
    participationByRole: [
      { role: 'Facilitators', count: 2, activityPercent: 96 },
      { role: 'Community Organizers', count: 2, activityPercent: 92 },
      { role: 'Active Participants', count: 2, activityPercent: 88 }
    ],
    resourceTypeBreakdown: [
      { type: 'Discussion Guides', count: 3, fill: '#0A2463' },
      { type: 'Field Notes', count: 3, fill: '#1E6091' },
      { type: 'Action Charters', count: 2, fill: '#D4A017' }
    ],
    keyHighlights: [
      'Steady 92% attendance adherence throughout previous quarters.',
      'Active resource sharing culture with ongoing cross-member contributions.',
      'Growing engagement with 1-on-1 coffee dialogues.'
    ]
  };
};
