import React, { useState, useEffect } from 'react';
import { 
  DialogueCircle, 
  CircleMeetingAgenda, 
  AgendaDiscussionPoint, 
  RecurringAgendaTemplate, 
  AgendaCategory 
} from '../types';
import { RECURRING_AGENDA_TEMPLATES, INITIAL_CIRCLE_AGENDAS, getCircleDefaultAgenda } from '../data/circleAgendaData';
import { exportCircleToICS } from '../utils/calendarExport';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ThumbsUp, 
  Sparkles, 
  Tag, 
  User, 
  Edit2, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Copy, 
  Download, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Layers, 
  Check, 
  AlertCircle,
  FileText,
  SlidersHorizontal,
  Lightbulb
} from 'lucide-react';

interface CircleAgendaViewProps {
  circle: DialogueCircle;
  isJoined: boolean;
  onJoinCircle: () => void;
  onShowToast: (toast: {
    type: 'join' | 'meeting_update' | 'calendar_export' | 'chat' | 'archive' | 'info' | 'agenda_suggest' | 'agenda_update';
    title: string;
    message: string;
    circleName?: string;
  }) => void;
}

const CATEGORY_STYLES: Record<AgendaCategory, { bg: string; text: string; border: string; label: string }> = {
  dialogue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'Dialogue Inquiry' },
  action: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Action & Covenants' },
  healing: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', label: 'Historical Healing' },
  creative: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Creative Commons' },
  logistics: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', label: 'Logistics & Tech' }
};

export const CircleAgendaView: React.FC<CircleAgendaViewProps> = ({
  circle,
  isJoined,
  onJoinCircle,
  onShowToast
}) => {
  // Load agenda from localStorage or initialize with template data
  const [agenda, setAgenda] = useState<CircleMeetingAgenda>(() => {
    const saved = localStorage.getItem(`shared_future_agenda_${circle.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_CIRCLE_AGENDAS[circle.id] || getCircleDefaultAgenda(
      circle.id,
      circle.name,
      circle.meetingTime,
      circle.topic,
      circle.contactPerson
    );
  });

  // Sync to localStorage on update
  const saveAgenda = (updatedAgenda: CircleMeetingAgenda) => {
    setAgenda(updatedAgenda);
    localStorage.setItem(`shared_future_agenda_${circle.id}`, JSON.stringify(updatedAgenda));
  };

  // UI state
  const [showAddPointForm, setShowAddPointForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'included' | 'suggested'>('all');
  const [sortBy, setSortBy] = useState<'sequence' | 'votes'>('sequence');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [editingPointId, setEditingPointId] = useState<string | null>(null);
  const [showGroundingRules, setShowGroundingRules] = useState(true);
  const [isEditingTheme, setIsEditingTheme] = useState(false);
  const [themeInput, setThemeInput] = useState(agenda.themeTitle);
  const [copiedAgenda, setCopiedAgenda] = useState(false);

  // New point form fields
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDuration, setNewDuration] = useState(15);
  const [newCategory, setNewCategory] = useState<AgendaCategory>('dialogue');
  const [newSubmitter, setNewSubmitter] = useState('You (Circle Member)');
  const [newSpeakerLead, setNewSpeakerLead] = useState('');

  // Editing existing point fields
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDuration, setEditDuration] = useState(15);
  const [editCategory, setEditCategory] = useState<AgendaCategory>('dialogue');
  const [editStatus, setEditStatus] = useState<'included' | 'suggested' | 'tabled'>('included');
  const [editSpeakerLead, setEditSpeakerLead] = useState('');

  // Calculate total minutes allocated
  const currentTemplate = RECURRING_AGENDA_TEMPLATES.find(t => t.id === agenda.templateId) || RECURRING_AGENDA_TEMPLATES[0];
  const includedPointsMinutes = agenda.discussionPoints
    .filter(p => p.status === 'included')
    .reduce((acc, p) => acc + (p.durationMinutes || 0), 0);
  
  // Standard opening and closing minutes
  const openingMinutes = 10;
  const closingMinutes = 15;
  const totalAllocatedMinutes = openingMinutes + closingMinutes + includedPointsMinutes;
  const targetMinutes = currentTemplate.totalDurationMinutes;

  // Handle voting
  const handleToggleVote = (pointId: string) => {
    if (!isJoined) {
      onShowToast({
        type: 'info',
        title: 'Membership Required',
        message: 'Join this circle to vote on agenda priorities!',
        circleName: circle.name
      });
      return;
    }

    const updatedPoints = agenda.discussionPoints.map(p => {
      if (p.id === pointId) {
        const currentlyVoted = !!p.votedByMe;
        const newVotes = currentlyVoted ? Math.max(0, p.votes - 1) : p.votes + 1;
        return {
          ...p,
          votes: newVotes,
          votedByMe: !currentlyVoted
        };
      }
      return p;
    });

    const target = updatedPoints.find(p => p.id === pointId);
    const updatedAgenda: CircleMeetingAgenda = {
      ...agenda,
      discussionPoints: updatedPoints,
      lastUpdatedAt: 'Just now'
    };

    saveAgenda(updatedAgenda);

    if (target) {
      onShowToast({
        type: 'agenda_update',
        title: target.votedByMe ? 'Priority Supported (+1)' : 'Vote Withdrawn',
        message: `"${target.title}" now has ${target.votes} member votes.`,
        circleName: circle.name
      });
    }
  };

  // Handle Add Point
  const handleAddPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPoint: AgendaDiscussionPoint = {
      id: `pt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: newTitle.trim(),
      description: newDescription.trim() || 'No detailed context provided yet. Open for collaborative framing.',
      durationMinutes: Number(newDuration) || 15,
      category: newCategory,
      suggestedBy: newSubmitter.trim() || 'You (Circle Member)',
      suggestedRole: 'Participant',
      votes: 1,
      votedByMe: true,
      status: 'included',
      speakerLead: newSpeakerLead.trim() || undefined,
      createdAt: 'Just now'
    };

    const updatedAgenda: CircleMeetingAgenda = {
      ...agenda,
      discussionPoints: [...agenda.discussionPoints, newPoint],
      lastEditedBy: newPoint.suggestedBy,
      lastUpdatedAt: 'Just now'
    };

    saveAgenda(updatedAgenda);
    setShowAddPointForm(false);
    setNewTitle('');
    setNewDescription('');
    setNewDuration(15);
    setNewCategory('dialogue');
    setNewSpeakerLead('');

    onShowToast({
      type: 'agenda_suggest',
      title: 'Discussion Point Added to Agenda',
      message: `"${newPoint.title}" scheduled for the upcoming gathering.`,
      circleName: circle.name
    });
  };

  // Start editing a point
  const handleStartEditPoint = (point: AgendaDiscussionPoint) => {
    setEditingPointId(point.id);
    setEditTitle(point.title);
    setEditDescription(point.description);
    setEditDuration(point.durationMinutes);
    setEditCategory(point.category);
    setEditStatus(point.status);
    setEditSpeakerLead(point.speakerLead || '');
  };

  // Save edit point
  const handleSaveEditPoint = (pointId: string) => {
    if (!editTitle.trim()) return;

    const updatedPoints = agenda.discussionPoints.map(p => {
      if (p.id === pointId) {
        return {
          ...p,
          title: editTitle.trim(),
          description: editDescription.trim(),
          durationMinutes: Number(editDuration) || 15,
          category: editCategory,
          status: editStatus,
          speakerLead: editSpeakerLead.trim() || undefined
        };
      }
      return p;
    });

    const updatedAgenda: CircleMeetingAgenda = {
      ...agenda,
      discussionPoints: updatedPoints,
      lastEditedBy: 'You (Circle Member)',
      lastUpdatedAt: 'Just now'
    };

    saveAgenda(updatedAgenda);
    setEditingPointId(null);

    onShowToast({
      type: 'agenda_update',
      title: 'Discussion Point Updated',
      message: `Modifications saved to "${editTitle.trim()}".`,
      circleName: circle.name
    });
  };

  // Delete point
  const handleDeletePoint = (pointId: string, pointTitle: string) => {
    const updatedPoints = agenda.discussionPoints.filter(p => p.id !== pointId);
    const updatedAgenda: CircleMeetingAgenda = {
      ...agenda,
      discussionPoints: updatedPoints,
      lastUpdatedAt: 'Just now'
    };
    saveAgenda(updatedAgenda);

    onShowToast({
      type: 'agenda_update',
      title: 'Discussion Point Removed',
      message: `"${pointTitle}" was removed from the agenda.`,
      circleName: circle.name
    });
  };

  // Move point up or down in sequence
  const handleMovePoint = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= agenda.discussionPoints.length) return;

    const newPoints = [...agenda.discussionPoints];
    const temp = newPoints[index];
    newPoints[index] = newPoints[targetIndex];
    newPoints[targetIndex] = temp;

    const updatedAgenda: CircleMeetingAgenda = {
      ...agenda,
      discussionPoints: newPoints,
      lastUpdatedAt: 'Just now'
    };
    saveAgenda(updatedAgenda);
  };

  // Change recurring agenda template
  const handleSelectTemplate = (template: RecurringAgendaTemplate) => {
    const updatedAgenda: CircleMeetingAgenda = {
      ...agenda,
      templateId: template.id,
      templateName: template.name,
      lastUpdatedAt: 'Just now'
    };
    saveAgenda(updatedAgenda);
    setShowTemplateSelector(false);

    onShowToast({
      type: 'agenda_update',
      title: 'Recurring Template Updated',
      message: `Circle agenda format switched to: ${template.name}`,
      circleName: circle.name
    });
  };

  // Save theme title
  const handleSaveTheme = () => {
    if (!themeInput.trim()) {
      setIsEditingTheme(false);
      return;
    }
    const updatedAgenda: CircleMeetingAgenda = {
      ...agenda,
      themeTitle: themeInput.trim(),
      lastUpdatedAt: 'Just now'
    };
    saveAgenda(updatedAgenda);
    setIsEditingTheme(false);

    onShowToast({
      type: 'agenda_update',
      title: 'Meeting Theme Updated',
      message: `Upcoming theme set to: "${themeInput.trim()}"`,
      circleName: circle.name
    });
  };

  // Simulate collaborative member suggestions
  const handleSimulatePeerSuggestion = () => {
    const peers = [
      { name: 'David Kiprono', role: 'Elder & Mediator' },
      { name: 'Dr. Kofi Mensah', role: 'Peace Researcher' },
      { name: 'Fatima Al-Hassan', role: 'Youth Envoy' },
      { name: 'Marcus Sterling', role: 'Tech Policy Fellow' },
      { name: 'Elena Rostova', role: 'Legal Advocate' }
    ];
    const suggestions = [
      {
        title: 'Shared Resource Data Verification via Open Telemetry',
        desc: 'Establishing joint community verification nodes so neither side questions groundwater extraction numbers.',
        cat: 'action' as AgendaCategory,
        dur: 15
      },
      {
        title: 'Inter-Generational Mentorship for Youth Land Stewards',
        desc: 'Pairing older agriculturalists with youth digital climate monitors for mutual skill exchange.',
        cat: 'creative' as AgendaCategory,
        dur: 20
      },
      {
        title: 'Reviewing UN Early-Warning Trigger Thresholds',
        desc: 'Aligning local community indicators with international mediation alert mechanisms.',
        cat: 'dialogue' as AgendaCategory,
        dur: 15
      }
    ];

    const randomPeer = peers[Math.floor(Math.random() * peers.length)];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    const simPoint: AgendaDiscussionPoint = {
      id: `pt-sim-${Date.now()}`,
      title: randomSuggestion.title,
      description: randomSuggestion.desc,
      durationMinutes: randomSuggestion.dur,
      category: randomSuggestion.cat,
      suggestedBy: randomPeer.name,
      suggestedRole: randomPeer.role,
      votes: Math.floor(Math.random() * 4) + 2,
      votedByMe: false,
      status: 'included',
      speakerLead: randomPeer.name,
      createdAt: 'Just now'
    };

    const updatedAgenda: CircleMeetingAgenda = {
      ...agenda,
      discussionPoints: [...agenda.discussionPoints, simPoint],
      lastEditedBy: randomPeer.name,
      lastUpdatedAt: 'Just now'
    };
    saveAgenda(updatedAgenda);

    onShowToast({
      type: 'agenda_suggest',
      title: `Suggestion from ${randomPeer.name}`,
      message: `Proposed: "${simPoint.title}" (${simPoint.durationMinutes} min)`,
      circleName: circle.name
    });
  };

  // Copy Markdown agenda to clipboard
  const handleCopyAgendaMarkdown = () => {
    let md = `# 🕊️ Dialogue Circle Agenda: ${circle.name}\n`;
    md += `**Upcoming Gathering:** ${agenda.upcomingMeetingDate || circle.meetingTime}\n`;
    md += `**Theme:** ${agenda.themeTitle}\n`;
    md += `**Template:** ${agenda.templateName} (${targetMinutes} min target)\n`;
    md += `**Grounding Norms:** ${agenda.groundingNorms}\n\n`;
    md += `## 🕒 Meeting Schedule & Discussion Points\n\n`;
    md += `- **00:00 – 00:10 (10m):** Opening, Mindful Grounding & Chatham House Rule Affirmation\n`;
    
    let currentMin = 10;
    const included = agenda.discussionPoints.filter(p => p.status === 'included');
    included.forEach((pt, i) => {
      const endMin = currentMin + pt.durationMinutes;
      md += `- **${currentMin}m – ${endMin}m (${pt.durationMinutes}m):** ${pt.title} [${CATEGORY_STYLES[pt.category].label}]\n`;
      md += `  *Context:* ${pt.description}\n`;
      if (pt.speakerLead) md += `  *Lead:* ${pt.speakerLead}\n`;
      md += `  *Suggested by:* ${pt.suggestedBy} (${pt.votes} member votes)\n\n`;
      currentMin = endMin;
    });

    md += `- **${currentMin}m – ${currentMin + 15}m (15m):** Shared Action Covenants, Next Steps & Closing Gratitude\n\n`;
    md += `*Generated via The Shared Future Project · Dialogue Circles Network*`;

    navigator.clipboard.writeText(md);
    setCopiedAgenda(true);
    setTimeout(() => setCopiedAgenda(false), 2500);

    onShowToast({
      type: 'info',
      title: 'Agenda Copied to Clipboard',
      message: 'Formatted Markdown meeting timeline ready to share with circle members.',
      circleName: circle.name
    });
  };

  // Download Agenda as Text
  const handleDownloadAgenda = () => {
    const textContent = `DIALOGUE CIRCLE UPCOMING MEETING AGENDA
Circle: ${circle.name} (${circle.city}, ${circle.country})
Cadence: ${circle.meetingTime}
Upcoming Date: ${agenda.upcomingMeetingDate}
Theme: ${agenda.themeTitle}
Template: ${agenda.templateName}
Facilitator: ${circle.contactPerson}

GROUNDING COVENANT:
${agenda.groundingNorms}

AGENDA TIMELINE:
[00:00 - 00:10] (10 min) Opening & Grounding (Chatham House Rule)
${agenda.discussionPoints
  .filter(p => p.status === 'included')
  .map((p, idx) => `[Point ${idx + 1}] (${p.durationMinutes} min) ${p.title}
   Category: ${CATEGORY_STYLES[p.category].label}
   Lead: ${p.speakerLead || p.suggestedBy} | Votes: ${p.votes}
   Summary: ${p.description}`)
  .join('\n\n')}
[Wrap-up] (15 min) Shared Covenant Commitments & Next Monthly Gathering Confirmation
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Agenda_${circle.name.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filter and sort points
  const displayedPoints = agenda.discussionPoints
    .filter(p => {
      if (filterCategory !== 'all' && p.category !== filterCategory) return false;
      if (filterStatus === 'included' && p.status !== 'included') return false;
      if (filterStatus === 'suggested' && p.status !== 'suggested') return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'votes') {
        return b.votes - a.votes;
      }
      return 0; // maintain sequence
    });

  return (
    <div className="space-y-6 text-gray-800">
      
      {/* 1. Header & Upcoming Theme Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-[#0A2463] text-white shadow-sm border border-blue-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/15 text-[#A8DADC] border border-white/20 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#D4A017]" />
                Upcoming Gathering
              </span>
              <span className="text-xs text-blue-200">
                {agenda.upcomingMeetingDate || circle.meetingTime}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold border border-white/20 transition-colors flex items-center gap-1"
                title="Select recurring agenda template"
              >
                <Layers className="w-3 h-3 text-[#D4A017]" />
                <span>Template: {currentTemplate.name.split('(')[0]}</span>
                <ChevronDown className="w-3 h-3 text-white/70" />
              </button>

              <button
                onClick={handleCopyAgendaMarkdown}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold border border-white/20 transition-colors flex items-center gap-1"
                title="Copy markdown agenda"
              >
                {copiedAgenda ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-blue-200" />}
                <span>{copiedAgenda ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadAgenda}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold border border-white/20 transition-colors flex items-center gap-1"
                title="Download formatted agenda file"
              >
                <Download className="w-3 h-3 text-blue-200" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Theme Title */}
          <div className="mt-2">
            {isEditingTheme ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1">
                <input
                  type="text"
                  value={themeInput}
                  onChange={(e) => setThemeInput(e.target.value)}
                  placeholder="Enter upcoming session theme..."
                  className="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-white text-gray-900 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveTheme}
                    className="px-3 py-1.5 bg-[#D4A017] hover:bg-[#b8890f] text-black font-bold rounded-lg text-xs transition-colors"
                  >
                    Save Theme
                  </button>
                  <button
                    onClick={() => {
                      setThemeInput(agenda.themeTitle);
                      setIsEditingTheme(false);
                    }}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                    {agenda.themeTitle}
                  </h4>
                  <p className="text-xs text-blue-200/90 mt-1 flex items-center gap-2">
                    <span>Facilitator: {circle.contactPerson}</span>
                    <span>•</span>
                    <span>Last updated: {agenda.lastUpdatedAt || 'Recently'}</span>
                  </p>
                </div>
                {isJoined && (
                  <button
                    onClick={() => {
                      setThemeInput(agenda.themeTitle);
                      setIsEditingTheme(true);
                    }}
                    className="text-xs text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg border border-white/15 transition-colors shrink-0"
                    title="Edit session theme"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Time Allocation Bar */}
          <div className="mt-4 pt-3.5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4A017]" />
              <span className="font-semibold text-white">
                Allocated: {totalAllocatedMinutes} min / {targetMinutes} min template
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                totalAllocatedMinutes <= targetMinutes
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'
                  : 'bg-amber-500/30 text-amber-200 border border-amber-400/40'
              }`}>
                {totalAllocatedMinutes <= targetMinutes ? `${targetMinutes - totalAllocatedMinutes} min remaining` : `+${totalAllocatedMinutes - targetMinutes} min over`}
              </span>
            </div>

            {/* Quick action: simulate suggestion */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulatePeerSuggestion}
                className="px-2.5 py-1 rounded-lg bg-[#D4A017]/20 hover:bg-[#D4A017]/30 text-[#D4A017] border border-[#D4A017]/40 text-[11px] font-bold flex items-center gap-1.5 transition-all active:scale-95"
                title="Simulate collaborative suggestions arriving from fellow members"
              >
                <Sparkles className="w-3 h-3 text-[#D4A017]" />
                <span>Simulate Peer Suggestion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selector Modal Dropdown */}
      {showTemplateSelector && (
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 animate-in fade-in space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#0A2463] flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#0A2463]" />
              Select Recurring Agenda Template for {circle.name}
            </h5>
            <button
              onClick={() => setShowTemplateSelector(false)}
              className="text-xs text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RECURRING_AGENDA_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  agenda.templateId === tmpl.id
                    ? 'border-[#0A2463] bg-white shadow-sm ring-1 ring-[#0A2463]'
                    : 'border-gray-200 bg-white/70 hover:bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-gray-900">{tmpl.name}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    {tmpl.totalDurationMinutes} min
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Non-Member Gate Callout */}
      {!isJoined && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-xs text-amber-900">
                You are previewing the recurring agenda in read-only mode
              </h5>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Join <strong>{circle.name}</strong> to collaboratively suggest new discussion topics, edit agenda priorities, and vote for the upcoming meeting schedule.
              </p>
            </div>
          </div>
          <button
            onClick={onJoinCircle}
            className="px-4 py-2 bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0 active:scale-95"
          >
            <Check className="w-3.5 h-3.5 text-[#D4A017]" />
            Join Circle to Collaborate
          </button>
        </div>
      )}

      {/* 2. Grounding Norms Accordion */}
      <div className="border border-gray-200 rounded-xl bg-gray-50/70 overflow-hidden">
        <button
          onClick={() => setShowGroundingRules(!showGroundingRules)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-100/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-xs text-gray-900">
              Recurring Dialogue Grounding Covenant &amp; Norms
            </span>
            <span className="text-[10px] text-gray-500 hidden sm:inline">
              (Chatham House Rule &amp; Ubuntu Dialogue Principles)
            </span>
          </div>
          {showGroundingRules ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>

        {showGroundingRules && (
          <div className="px-3.5 pb-3.5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-200/60">
            <p className="bg-white p-3 rounded-lg border border-gray-200 italic">
              &quot;{agenda.groundingNorms}&quot;
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2.5 text-[11px]">
              <div className="p-2 bg-white rounded border border-gray-200">
                <strong className="text-gray-900 block">1. Speak from Experience:</strong>
                Share personal observations, not generalizations or secondhand rumors.
              </div>
              <div className="p-2 bg-white rounded border border-gray-200">
                <strong className="text-gray-900 block">2. Chatham House Rule:</strong>
                Insights may be shared freely; speakers&apos; names and affiliations stay confidential.
              </div>
              <div className="p-2 bg-white rounded border border-gray-200">
                <strong className="text-gray-900 block">3. Positive-Sum Solutions:</strong>
                Every problem is examined through co-elevation: how do all parties win?
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Discussion Points Header & Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif font-bold text-base text-[#0A2463]">
                Upcoming Meeting Discussion Points
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900">
                {agenda.discussionPoints.length} Points
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Collaboratively proposed and prioritized by circle members for the monthly session.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isJoined && (
              <button
                onClick={() => setShowAddPointForm(!showAddPointForm)}
                className="px-3.5 py-2 bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>Suggest Discussion Point</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Status & Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                filterStatus === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({agenda.discussionPoints.length})
            </button>
            <button
              onClick={() => setFilterStatus('included')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
                filterStatus === 'included'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              Scheduled in Agenda ({agenda.discussionPoints.filter(p => p.status === 'included').length})
            </button>
            <button
              onClick={() => setFilterStatus('suggested')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
                filterStatus === 'suggested'
                  ? 'bg-amber-700 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Lightbulb className="w-3 h-3" />
              Member Suggestions ({agenda.discussionPoints.filter(p => p.status === 'suggested').length})
            </button>
          </div>

          {/* Sort Switcher */}
          <div className="flex items-center gap-1 text-[11px] text-gray-500">
            <span>Sort:</span>
            <button
              onClick={() => setSortBy('sequence')}
              className={`px-2 py-0.5 rounded font-semibold ${
                sortBy === 'sequence' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Timeline Order
            </button>
            <span>•</span>
            <button
              onClick={() => setSortBy('votes')}
              className={`px-2 py-0.5 rounded font-semibold ${
                sortBy === 'votes' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Member Votes (Priority)
            </button>
          </div>
        </div>
      </div>

      {/* 4. Suggest a Discussion Point Form */}
      {showAddPointForm && isJoined && (
        <form
          onSubmit={handleAddPoint}
          className="p-4 sm:p-5 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/40 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-xs text-[#0A2463] uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#D4A017]" />
              Propose a Discussion Point for Next Monthly Gathering
            </h5>
            <button
              type="button"
              onClick={() => setShowAddPointForm(false)}
              className="text-xs text-gray-500 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">
                Discussion Point Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Grassroots Water Monitoring Protocols or AI Defense Safeguards"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 bg-white font-medium focus:ring-2 focus:ring-[#0A2463] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">
                Context, Talking Points &amp; Desired Outcome
              </label>
              <textarea
                rows={2}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Why should our circle discuss this? What positive-sum outcome or next step can we achieve?"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 bg-white font-normal focus:ring-2 focus:ring-[#0A2463] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Proposed Duration
                </label>
                <select
                  value={newDuration}
                  onChange={(e) => setNewDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-medium focus:ring-2 focus:ring-[#0A2463]"
                >
                  <option value={10}>10 minutes (Quick Briefing)</option>
                  <option value={15}>15 minutes (Standard Discussion)</option>
                  <option value={20}>20 minutes (In-Depth Inquiry)</option>
                  <option value={30}>30 minutes (Deep Dive Workshop)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Category Tag
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as AgendaCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-medium focus:ring-2 focus:ring-[#0A2463]"
                >
                  <option value="dialogue">Dialogue Inquiry</option>
                  <option value="action">Action &amp; Covenants</option>
                  <option value="healing">Historical Healing</option>
                  <option value="creative">Creative Commons</option>
                  <option value="logistics">Logistics &amp; Tech</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Suggested Discussion Lead (Optional)
                </label>
                <input
                  type="text"
                  value={newSpeakerLead}
                  onChange={(e) => setNewSpeakerLead(e.target.value)}
                  placeholder="e.g. Yourself or Fellow Member"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 bg-white font-medium focus:ring-2 focus:ring-[#0A2463]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddPointForm(false)}
              className="px-3.5 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="px-4 py-2 bg-[#0A2463] hover:bg-[#1E6091] disabled:opacity-40 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Check className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Add to Upcoming Agenda</span>
            </button>
          </div>
        </form>
      )}

      {/* 5. Discussion Points List */}
      <div className="space-y-3">
        {displayedPoints.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500 text-xs">
            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="font-semibold text-gray-700">No discussion points match the selected filter.</p>
            <p className="mt-1">Suggest a new topic or change your filter criteria above.</p>
          </div>
        ) : (
          displayedPoints.map((point, index) => {
            const isEditing = editingPointId === point.id;
            const categoryStyle = CATEGORY_STYLES[point.category] || CATEGORY_STYLES.dialogue;

            if (isEditing) {
              return (
                <div
                  key={point.id}
                  className="p-4 rounded-xl border-2 border-blue-400 bg-white shadow-sm space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900 uppercase tracking-wider text-[11px]">
                      Editing Discussion Point #{index + 1}
                    </span>
                    <button
                      onClick={() => setEditingPointId(null)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Title</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white font-medium focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Duration (Min)</label>
                      <input
                        type="number"
                        value={editDuration}
                        onChange={(e) => setEditDuration(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Category</label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as AgendaCategory)}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="dialogue">Dialogue Inquiry</option>
                        <option value="action">Action &amp; Covenants</option>
                        <option value="healing">Historical Healing</option>
                        <option value="creative">Creative Commons</option>
                        <option value="logistics">Logistics &amp; Tech</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as 'included' | 'suggested' | 'tabled')}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="included">Scheduled in Agenda</option>
                        <option value="suggested">Member Suggestion (Under Review)</option>
                        <option value="tabled">Tabled for Next Month</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setEditingPointId(null)}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEditPoint(point.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={point.id}
                className={`p-4 rounded-xl border transition-all ${
                  point.status === 'included'
                    ? 'border-gray-200 bg-white hover:border-blue-300 shadow-xs'
                    : 'border-amber-200/80 bg-amber-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  
                  {/* Vote button & tally */}
                  <button
                    onClick={() => handleToggleVote(point.id)}
                    className={`flex flex-col items-center justify-center w-11 py-2 rounded-xl border transition-all shrink-0 ${
                      point.votedByMe
                        ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                    title={point.votedByMe ? 'Click to withdraw your vote' : 'Support this discussion point'}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${point.votedByMe ? 'text-white' : 'text-gray-500'}`} />
                    <span className="text-xs font-bold mt-1">{point.votes}</span>
                  </button>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}>
                        {categoryStyle.label}
                      </span>
                      
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {point.durationMinutes} min
                      </span>

                      {point.status === 'included' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          In Agenda
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                          <Lightbulb className="w-3 h-3 text-amber-600" />
                          Suggested
                        </span>
                      )}

                      {point.speakerLead && (
                        <span className="text-[11px] text-gray-500 flex items-center gap-1 ml-1">
                          <User className="w-3 h-3 text-[#D4A017]" />
                          Lead: <strong className="text-gray-700 font-semibold">{point.speakerLead}</strong>
                        </span>
                      )}
                    </div>

                    <h5 className="font-bold text-sm text-gray-900 leading-snug">
                      {point.title}
                    </h5>
                    
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {point.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>Proposed by: <strong className="text-gray-700">{point.suggestedBy}</strong> {point.suggestedRole ? `(${point.suggestedRole})` : ''}</span>
                        <span>•</span>
                        <span>{point.createdAt || 'Recently'}</span>
                      </div>

                      {/* Controls for reordering & editing */}
                      {isJoined && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMovePoint(index, 'up')}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded hover:bg-gray-100 transition-colors"
                            title="Move earlier in meeting agenda"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMovePoint(index, 'down')}
                            disabled={index === displayedPoints.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded hover:bg-gray-100 transition-colors"
                            title="Move later in meeting agenda"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleStartEditPoint(point)}
                            className="p-1 text-blue-600 hover:text-blue-800 rounded hover:bg-blue-50 transition-colors ml-1"
                            title="Edit this discussion point"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePoint(point.id, point.title)}
                            className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50 transition-colors"
                            title="Remove from agenda"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 6. Action Covenants & Calendar Integration Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50/40 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <h5 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#0A2463]" />
            Add Full Collaborative Agenda to Your Calendar
          </h5>
          <p className="text-gray-600 mt-0.5 leading-relaxed">
            Exports an RFC 5545 .ics file with the upcoming session timing, meeting room link, and all confirmed discussion topics embedded in the event description.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              exportCircleToICS(circle);
              onShowToast({
                type: 'calendar_export',
                title: 'Exported to Calendar (.ics)',
                message: `Agenda event downloaded for ${circle.name}.`,
                circleName: circle.name
              });
            }}
            className="px-4 py-2 rounded-xl bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-[#D4A017]" />
            <span>Export to Calendar</span>
          </button>
        </div>
      </div>

    </div>
  );
};
