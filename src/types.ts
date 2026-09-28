export type ViewTab = 
  | 'overview' 
  | 'manifesto' 
  | 'crises' 
  | 'solutions' 
  | 'roadmap' 
  | 'dashboard' 
  | 'circles' 
  | 'resources'
  | 'actions' 
  | 'dialogue-guide' 
  | 'healing' 
  | 'un-resolution'
  | 'campaign'
  | 'speech'
  | 'press-release'
  | 'governance'
  | 'funding'
  | 'execution-innovation';

export interface CrisisItem {
  id: number;
  title: string;
  category: 'Geopolitical' | 'Economic' | 'Environmental' | 'Technological' | 'Social';
  status: string;
  trend: 'worsening' | 'accelerating' | 'widening' | 'rising' | 'spreading' | 'deepening';
  severity: 'critical' | 'high';
  description: string;
  keyStat: string;
  worseScenario2050: string;
}

export interface SolutionItem {
  id: number;
  number: number;
  title: string;
  category: 'Political & Diplomatic' | 'Economic' | 'Climate & Environment' | 'Technology & AI' | 'Social & Cultural';
  summary: string;
  what: string;
  why: string;
  how: string;
  when: string;
  kpi: string;
  actors: string;
  investmentNeeded: string;
  tag: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  name: string;
  years: string;
  goal: string;
  tagline: string;
  progressPercent: number;
  actions: {
    title: string;
    actor: string;
    kpi: string;
    details: string;
  }[];
}

export interface ProgressMetric {
  id: string;
  name: string;
  category: 'Peace & Security' | 'Prosperity & Equality' | 'Planetary Health' | 'Governance & Trust';
  current2025: string;
  target2030: string;
  target2040: string;
  currentVal: number;
  target2030Val: number;
  target2040Val: number;
  unit: string;
  higherIsBetter: boolean;
  status: 'critical' | 'needs-work' | 'on-track';
  description: string;
  source: string;
}

export interface DialogueCircle {
  id: string;
  name: string;
  city: string;
  country: string;
  region: string;
  membersCount: number;
  maxMembers: number;
  languages: string[];
  meetingTime: string;
  topic: string;
  format: 'in-person' | 'online' | 'hybrid';
  contactPerson: string;
  description: string;
  coordinates?: { lat: number; lng: number };
}

export interface CircleChatMessage {
  id: string;
  circleId: string;
  senderName: string;
  senderRole?: string;
  content: string;
  timestamp: string;
  isSelf?: boolean;
}

export interface CircleDiscussionArchive {
  id: string;
  circleId: string;
  meetingDate: string;
  title: string;
  topic: string;
  attendeesCount: number;
  keyInsights: string[];
  agreedActions: string[];
  loggedBy: string;
  createdAt: string;
  recordingUrl?: string;
  recordingDuration?: string;
  recordingType?: 'video' | 'audio';
  recordingBlobSize?: string;
}

export interface CircleToastNotification {
  id: string;
  type: 'join' | 'meeting_update' | 'calendar_export' | 'chat' | 'archive' | 'info' | 'agenda_suggest' | 'agenda_update' | 'resource_upload' | 'resource_bookmark' | 'coffee_match' | 'profile_update' | 'icebreaker_generated' | 'recording_started' | 'recording_saved';
  title: string;
  message: string;
  timestamp: string;
  circleName?: string;
}

export type CircleMemberRole = 
  | 'Facilitator' 
  | 'Co-Facilitator' 
  | 'Note-Taker' 
  | 'Tech Support' 
  | 'Timekeeper' 
  | 'Community Liaison' 
  | 'Youth Envoy' 
  | 'Research Lead' 
  | 'Participant';

export interface CircleMember {
  id: string;
  circleId: string;
  name: string;
  avatarUrl?: string;
  role: CircleMemberRole;
  interests: string[];
  bio?: string;
  joinedDate: string;
  isSelf?: boolean;
  virtualCoffeeAvailable?: boolean;
  city?: string;
  timezone?: string;
}

export interface VirtualCoffeePairing {
  id: string;
  circleId: string;
  memberA: CircleMember;
  memberB: CircleMember;
  matchedAt: string;
  scheduledTime?: string;
  icebreakerTopic?: string;
  icebreakerQuestions?: string[];
  sharedInterests: string[];
  status: 'matched' | 'scheduled' | 'in_call' | 'completed';
  meetingRoomUrl: string;
}

export type ResourceFormat = 'pdf' | 'article' | 'research_paper' | 'policy_brief' | 'case_study' | 'field_guide';

export type ResourceCategory = 
  | 'Climate & Commons' 
  | 'Peace & Disarmament' 
  | 'AI & Tech Ethics' 
  | 'Historical Healing' 
  | 'Economic Justice' 
  | 'Water & Agriculture' 
  | 'Global Governance';

export interface CircleResource {
  id: string;
  title: string;
  author: string;
  organization?: string;
  format: ResourceFormat;
  category: ResourceCategory;
  circleId?: string; // specific circle ID, or 'global'
  circleName?: string;
  description: string;
  abstract?: string;
  keyTakeaways: string[];
  fileSize?: string; // e.g. "2.4 MB PDF"
  pageCount?: number;
  publishedYear: string;
  downloadUrl?: string;
  externalUrl?: string;
  uploadedBy: string;
  uploadedAt: string;
  downloadsCount: number;
  bookmarksCount: number;
  isBookmarked?: boolean;
  isMemberOnly?: boolean;
  tags: string[];
  contentPreview?: string;
}

export type AgendaCategory = 'dialogue' | 'action' | 'healing' | 'logistics' | 'creative';

export interface AgendaDiscussionPoint {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  category: AgendaCategory;
  suggestedBy: string;
  suggestedRole?: string;
  votes: number;
  votedByMe?: boolean;
  status: 'included' | 'suggested' | 'tabled';
  speakerLead?: string;
  createdAt?: string;
}

export interface AgendaTemplateSection {
  title: string;
  durationMinutes: number;
  description: string;
  category: AgendaCategory;
}

export interface RecurringAgendaTemplate {
  id: string;
  name: string;
  totalDurationMinutes: number;
  description: string;
  standardSections: AgendaTemplateSection[];
}

export interface CircleMeetingAgenda {
  circleId: string;
  upcomingMeetingDate: string;
  meetingCadence: string;
  themeTitle: string;
  templateId: string;
  templateName: string;
  groundingNorms: string;
  discussionPoints: AgendaDiscussionPoint[];
  lastEditedBy?: string;
  lastUpdatedAt?: string;
}

export interface DailyAction {
  id: string;
  title: string;
  category: 'connection' | 'learning' | 'healing' | 'advocacy' | 'service' | 'reflection' | 'physical' | 'digital';
  durationMinutes: number;
  points: number;
  description: string;
  suggestedPrompt: string;
}

export interface HistoricalHealingCase {
  id: string;
  country: string;
  title: string;
  period: string;
  conflict: string;
  mechanism: string;
  outcomes: string[];
  keyLesson: string;
}

// -------------------------------------------------------------
// EXECUTION & INNOVATION MODULE INTERFACES
// -------------------------------------------------------------
export type ExecutionModuleId =
  | 'accelerated-engine'
  | 'frontier-tech-commons'
  | 'catalytic-finance'
  | 'agile-policy-sandboxes'
  | 'grassroots-incubator'
  | 'collaborative-coalitions'
  | 'early-warning-radar'
  | 'rapid-deployment-pods';

export interface ShortenedActivityItem {
  id: string;
  phaseId: 'sprint-30' | 'sprint-60' | 'sprint-90' | 'horizon-6mo' | 'horizon-12mo' | 'horizon-24mo';
  phaseTitle: string;
  timingWindow: string; // e.g. "Weeks 1–4", "Days 31–60"
  originalDocTiming: string; // e.g. "Years 1–3" or "Years 2–5"
  title: string;
  leadTaskforce: string;
  deliverable: string;
  accountabilityGate: string;
  status: 'active' | 'scheduled' | 'fast-tracked' | 'completed';
  accelerationTechnique: string;
  kpiTarget: string;
}

export interface ExecutionInnovationModule {
  id: ExecutionModuleId;
  moduleNumber: number;
  title: string;
  tagline: string;
  category: 'Agile Acceleration' | 'Frontier Technology' | 'Innovative Finance' | 'Policy Innovation' | 'Grassroots Scale' | 'Multi-Stakeholder' | 'Predictive Intelligence' | 'Field Operations';
  icon: string;
  originalDocumentTimeframe: string;
  shortenedTimeframe: string;
  timeReductionPercent: number; // e.g. 70 means 70% faster
  executiveSummary: string;
  coreInnovations: string[];
  shortenedActivityPlan: ShortenedActivityItem[];
  highSpeedKPIs: { label: string; value: string; baselineDocValue: string; velocityGain: string }[];
  operationalToolkits: { name: string; type: string; description: string }[];
  cooperationImpact: string;
}

export interface TimelinePaceComparison {
  dimension: string;
  originalDocumentPace: string;
  acceleratedExecutionPace: string;
  accelerationFactor: string;
  mechanism: string;
}

export interface EarlyWarningHotspot {
  id: string;
  region: string;
  country: string;
  escalationRiskScore: number; // 0 - 100
  threatVector: 'Water Stress' | 'Border Buildup' | 'Disinformation Surge' | 'Resource Competition' | 'Civic Unrest';
  earlyWarningSignal: string;
  acceleratedDeescalationAction: string;
  deploymentTimeHours: number;
  status: 'monitoring' | 'active_intervention' | 'stabilized';
}

export interface TechCommonsPrototype {
  id: string;
  name: string;
  domain: 'AI Safety' | 'Earth Observation' | 'Decentralized Voting' | 'Clean Tech Transfer';
  readinessLevel: string;
  shortenedDeploymentWindow: string;
  openSourceLicense: string;
  description: string;
  technicalArchitecture: string;
}

export interface CivicInnovationGrant {
  id: string;
  title: string;
  region: string;
  applicant: string;
  requestedAmount: string;
  turnaroundTimeDays: number;
  focusArea: string;
  shortenedMilestoneGoal: string;
  status: 'funded' | 'under_rapid_review' | 'fast_tracked';
}

export interface RapidDeploymentPod {
  id: string;
  name: string;
  currentStation: string;
  readinessStatus: 'Standing By (24h)' | 'Active Deployment' | 'Maintenance';
  specialization: 'Border Mediation' | 'Climate Disaster Co-Op' | 'Youth Tech Hub' | 'Interfaith Council';
  deploymentWindowHours: number;
  equipmentProfile: string;
}

