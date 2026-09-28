import React, { useState, useEffect, useRef } from 'react';
import { DialogueCircle, CircleChatMessage, CircleDiscussionArchive, CircleToastNotification } from '../types';
import { INITIAL_CIRCLE_CHATS, INITIAL_CIRCLE_ARCHIVES } from '../data/circleChatArchiveData';
import { exportCircleToICS } from '../utils/calendarExport';
import { CircleAgendaView } from './CircleAgendaView';
import { ResourceLibrary } from './ResourceLibrary';
import { CircleMembersView } from './CircleMembersView';
import { CircleMetricsSection } from './CircleMetricsSection';
import { MeetingRecorderModal } from './MeetingRecorderModal';
import { 
  X, 
  Users, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Archive, 
  Send, 
  Check, 
  Lock, 
  Plus, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  FileText,
  Download,
  AlertCircle,
  Edit3,
  CalendarCheck,
  BookOpen,
  Coffee,
  BarChart3,
  Radio,
  Film
} from 'lucide-react';

interface CircleDetailsModalProps {
  circle: DialogueCircle;
  isJoined: boolean;
  onClose: () => void;
  onJoinToggle: (circleId: string) => void;
  onMeetingTimeUpdated: (circleId: string, newTime: string) => void;
  onShowToast: (toast: {
    type: 'join' | 'meeting_update' | 'calendar_export' | 'chat' | 'archive' | 'info' | 'agenda_suggest' | 'agenda_update' | 'resource_upload' | 'resource_bookmark' | 'coffee_match' | 'profile_update' | 'icebreaker_generated' | 'recording_started' | 'recording_saved';
    title: string;
    message: string;
    circleName?: string;
  }) => void;
  initialTab?: 'overview' | 'agenda' | 'resources' | 'members' | 'metrics' | 'chat' | 'archive';
}

export const CircleDetailsModal: React.FC<CircleDetailsModalProps> = ({
  circle,
  isJoined,
  onClose,
  onJoinToggle,
  onMeetingTimeUpdated,
  onShowToast,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'resources' | 'members' | 'metrics' | 'chat' | 'archive'>(initialTab);
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<CircleChatMessage[]>(() => {
    const saved = localStorage.getItem(`shared_future_chat_${circle.id}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CIRCLE_CHATS[circle.id] || [
      {
        id: `welcome-${circle.id}`,
        circleId: circle.id,
        senderName: circle.contactPerson,
        senderRole: 'Circle Facilitator',
        content: `Welcome to the ${circle.name}! We look forward to deep listening and shared inquiry. Our upcoming gathering is scheduled for ${circle.meetingTime}.`,
        timestamp: 'Recently',
        isSelf: false
      }
    ];
  });

  const [inputMsg, setInputMsg] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Archive State
  const [archives, setArchives] = useState<CircleDiscussionArchive[]>(() => {
    const saved = localStorage.getItem(`shared_future_archives_${circle.id}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CIRCLE_ARCHIVES[circle.id] || [];
  });

  const [isLoggingArchive, setIsLoggingArchive] = useState(false);
  const [newMeetingDate, setNewMeetingDate] = useState('September 2026');
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState(circle.topic);
  const [newAttendees, setNewAttendees] = useState(circle.membersCount);
  const [newInsights, setNewInsights] = useState('');
  const [newActions, setNewActions] = useState('');

  // Meeting Time Edit State
  const [isEditingMeetingTime, setIsEditingMeetingTime] = useState(false);
  const [meetingTimeInput, setMeetingTimeInput] = useState(circle.meetingTime);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim()) return;

    const userMessage: CircleChatMessage = {
      id: `msg-${Date.now()}`,
      circleId: circle.id,
      senderName: 'You (Circle Member)',
      senderRole: 'Participant',
      content: inputMsg.trim(),
      timestamp: 'Just now',
      isSelf: true
    };

    const updated = [...messages, userMessage];
    setMessages(updated);
    localStorage.setItem(`shared_future_chat_${circle.id}`, JSON.stringify(updated));
    setInputMsg('');

    // Simulated warm member response after a short pause
    setTimeout(() => {
      const responses = [
        `Thank you for sharing this perspective. It highlights the exact nuance we need to explore in our next circle session.`,
        `I appreciate your thoughtful reflection. That aligns with our Chatham House commitment to candid yet respectful dialogue.`,
        `Great point! I will make sure we allocate 15 minutes of dedicated reflection time for this topic on our agenda.`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMsg: CircleChatMessage = {
        id: `reply-${Date.now()}`,
        circleId: circle.id,
        senderName: circle.contactPerson,
        senderRole: 'Circle Facilitator',
        content: randomResponse,
        timestamp: 'Just now',
        isSelf: false
      };

      setMessages(prev => {
        const next = [...prev, responseMsg];
        localStorage.setItem(`shared_future_chat_${circle.id}`, JSON.stringify(next));
        return next;
      });

      onShowToast({
        type: 'chat',
        title: `New message from ${circle.contactPerson}`,
        message: randomResponse.substring(0, 75) + '...',
        circleName: circle.name
      });
    }, 1400);
  };

  const handleSaveArchive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newInsights.trim()) return;

    const insightsArray = newInsights
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const actionsArray = newActions
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const newArchiveItem: CircleDiscussionArchive = {
      id: `arch-${Date.now()}`,
      circleId: circle.id,
      meetingDate: newMeetingDate.trim() || 'Current Month',
      title: newTitle.trim(),
      topic: newTopic.trim(),
      attendeesCount: Number(newAttendees) || circle.membersCount,
      keyInsights: insightsArray.length ? insightsArray : ['Constructive dialogue completed with shared consensus.'],
      agreedActions: actionsArray.length ? actionsArray : ['Continue neighborhood outreach before next assembly.'],
      loggedBy: 'You (Verified Member)',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newArchiveItem, ...archives];
    setArchives(updated);
    localStorage.setItem(`shared_future_archives_${circle.id}`, JSON.stringify(updated));

    setIsLoggingArchive(false);
    setNewTitle('');
    setNewInsights('');
    setNewActions('');

    onShowToast({
      type: 'archive',
      title: 'Discussion Summary Archived',
      message: `Monthly insights for "${newArchiveItem.title}" recorded to circle archive.`,
      circleName: circle.name
    });
  };

  const handleSaveMeetingTime = () => {
    if (!meetingTimeInput.trim() || meetingTimeInput === circle.meetingTime) {
      setIsEditingMeetingTime(false);
      return;
    }
    onMeetingTimeUpdated(circle.id, meetingTimeInput.trim());
    setIsEditingMeetingTime(false);

    onShowToast({
      type: 'meeting_update',
      title: 'Meeting Schedule Updated',
      message: `New meeting cadence set to: ${meetingTimeInput.trim()}`,
      circleName: circle.name
    });
  };

  const handleExportICS = () => {
    exportCircleToICS(circle);
    onShowToast({
      type: 'calendar_export',
      title: 'Exported to Calendar (.ics)',
      message: `Meeting recurring invite downloaded for ${circle.name}.`,
      circleName: circle.name
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden font-sans">
        
        {/* Modal Top Banner */}
        <div className="bg-[#0A2463] text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#A8DADC] border border-white/20">
                {circle.format} Circle
              </span>
              <span className="text-xs text-white/80 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#D4A017]" />
                {circle.membersCount}/{circle.maxMembers} Members
              </span>
              {isJoined && (
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-400/40 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  Active Member
                </span>
              )}
            </div>
            <h3 className="font-serif text-2xl font-bold text-white leading-tight">
              {circle.name}
            </h3>
            <p className="text-xs text-[#A8DADC] mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>{circle.city}, {circle.country}</span>
              <span>•</span>
              <span>Host: {circle.contactPerson}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setIsRecordingModalOpen(true)}
              title="Record meeting audio or video using MediaRecorder API"
              className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 border border-rose-500"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-rose-200" />
              <span>Record Meeting</span>
            </button>
            <button
              onClick={handleExportICS}
              title="Download iCalendar file"
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-white/20 transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Export .ics</span>
            </button>
            <button
              onClick={() => onJoinToggle(circle.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                isJoined
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-[#D4A017] hover:bg-[#b8890f] text-black shadow-sm'
              }`}
            >
              {isJoined ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  Joined Circle
                </>
              ) : (
                'Join Circle'
              )}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center text-lg transition-colors ml-1"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-gray-200 bg-gray-50 px-5 text-xs font-semibold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'overview'
                ? 'border-[#0A2463] text-[#0A2463] font-bold bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Overview &amp; Logistics
          </button>

          <button
            onClick={() => setActiveTab('agenda')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'agenda'
                ? 'border-[#0A2463] text-[#0A2463] font-bold bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5 text-blue-600" />
            Upcoming Agenda &amp; Points
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-800 font-bold">
              Collaborative
            </span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'resources'
                ? 'border-[#0A2463] text-[#0A2463] font-bold bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            Resource Library
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'members'
                ? 'border-[#0A2463] text-[#0A2463] font-bold bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-amber-600" />
            Members &amp; 1-on-1 Coffee
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
              AI Match
            </span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'metrics'
                ? 'border-[#0A2463] text-[#0A2463] font-bold bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            Circle Metrics
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-bold">
              Recharts
            </span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'chat'
                ? 'border-[#0A2463] text-[#0A2463] font-bold bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
            Member Chat
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-bold">
              {messages.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('archive')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'archive'
                ? 'border-[#0A2463] text-[#0A2463] font-bold bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Archive className="w-3.5 h-3.5 text-purple-600" />
            Discussion Archive
            {!isJoined && <Lock className="w-3 h-3 text-amber-500 ml-0.5" />}
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-white min-h-[360px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 text-xs text-gray-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-sm text-[#0A2463] mb-2">
                  Circle Charter &amp; Purpose
                </h4>
                <p className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  {circle.description}
                </p>
              </div>

              {/* Meeting Cadence & Update */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#0A2463]" />
                    Scheduled Meeting Time
                  </div>
                  {isEditingMeetingTime ? (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={meetingTimeInput}
                        onChange={(e) => setMeetingTimeInput(e.target.value)}
                        placeholder="e.g. 1st Saturday monthly · 10:00 AM"
                        className="px-2.5 py-1 text-xs border border-blue-300 rounded bg-white font-medium focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleSaveMeetingTime}
                        className="px-2.5 py-1 bg-[#0A2463] text-white rounded font-bold text-xs hover:bg-[#1E6091]"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingMeetingTime(false)}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="font-semibold text-gray-900 text-sm">
                      {circle.meetingTime}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!isEditingMeetingTime && (
                    <button
                      onClick={() => {
                        setMeetingTimeInput(circle.meetingTime);
                        setIsEditingMeetingTime(true);
                      }}
                      className="px-2.5 py-1.5 rounded-lg border border-blue-300 bg-white hover:bg-blue-100 text-blue-900 font-semibold flex items-center gap-1 text-[11px] transition-colors"
                    >
                      <Edit3 className="w-3 h-3 text-blue-700" />
                      Update Time
                    </button>
                  )}
                  <button
                    onClick={handleExportICS}
                    className="px-3 py-1.5 rounded-lg bg-[#0A2463] text-white hover:bg-[#1E6091] font-bold flex items-center gap-1 text-[11px] transition-all shadow-xs"
                  >
                    <Download className="w-3 h-3 text-[#D4A017]" />
                    Add to Calendar (.ics)
                  </button>
                </div>
              </div>

              {/* Collaborative Meeting Agenda Spotlight Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CalendarCheck className="w-5 h-5 text-[#D4A017]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#0A2463]">
                      Upcoming Monthly Meeting Agenda
                    </h5>
                    <p className="text-[11px] text-gray-600 mt-0.5">
                      Recurring template with collaborative discussion points submitted and prioritized by members.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('agenda')}
                  className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all shrink-0 active:scale-95"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-[#D4A017]" />
                  <span>View &amp; Edit Agenda</span>
                </button>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-3.5 rounded-xl bg-gray-50/50">
                  <span className="font-bold text-gray-500 text-[11px] block uppercase">Dialogue Focus</span>
                  <span className="font-semibold text-[#0A2463] text-sm mt-0.5 block">{circle.topic}</span>
                </div>
                <div className="border border-gray-200 p-3.5 rounded-xl bg-gray-50/50">
                  <span className="font-bold text-gray-500 text-[11px] block uppercase">Spoken Languages</span>
                  <span className="font-semibold text-gray-800 text-sm mt-0.5 block">{circle.languages.join(', ')}</span>
                </div>
              </div>

              {/* Chatham House Rule Callout */}
              <div className="border border-amber-200 bg-amber-50/60 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-amber-900 text-xs">
                    Protected Chatham House Dialogue Protocol
                  </h5>
                  <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5">
                    Participants are free to use information received in the circle, but neither the identity nor the affiliation of any speaker may be revealed outside this space.
                  </p>
                </div>
              </div>

              {/* Action buttons inside Overview */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-500">
                  Host: {circle.contactPerson}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveTab('agenda')}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold flex items-center gap-1.5 transition-colors text-xs"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-blue-600" />
                    Upcoming Agenda
                  </button>
                  <button
                    onClick={() => setActiveTab('resources')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold flex items-center gap-1.5 transition-colors text-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    Resource Library
                  </button>
                  <button
                    onClick={() => setActiveTab('members')}
                    className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold flex items-center gap-1.5 transition-colors text-xs"
                  >
                    <Coffee className="w-3.5 h-3.5 text-amber-600" />
                    Members &amp; Coffee
                  </button>
                  <button
                    onClick={() => setActiveTab('metrics')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold flex items-center gap-1.5 transition-colors text-xs"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
                    Circle Metrics
                  </button>
                  <button
                    onClick={() => setIsRecordingModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold flex items-center gap-1.5 transition-colors text-xs"
                  >
                    <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                    Record Meeting
                  </button>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold flex items-center gap-1.5 transition-colors text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    Open Chat
                  </button>
                  <button
                    onClick={() => setActiveTab('archive')}
                    className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold flex items-center gap-1.5 transition-colors text-xs"
                  >
                    <Archive className="w-3.5 h-3.5 text-purple-600" />
                    View Archives
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UPCOMING RECURRING AGENDA */}
          {activeTab === 'agenda' && (
            <CircleAgendaView
              circle={circle}
              isJoined={isJoined}
              onJoinCircle={() => {
                onJoinToggle(circle.id);
                onShowToast({
                  type: 'join',
                  title: 'Welcome to the Circle!',
                  message: `You can now propose agenda points and vote for ${circle.name}.`,
                  circleName: circle.name
                });
              }}
              onShowToast={onShowToast}
            />
          )}

          {/* TAB 3: RESOURCE LIBRARY */}
          {activeTab === 'resources' && (
            <ResourceLibrary
              circle={circle}
              isJoined={isJoined}
              onJoinCircle={() => {
                onJoinToggle(circle.id);
                onShowToast({
                  type: 'join',
                  title: 'Welcome to the Circle!',
                  message: `You can now upload research materials and access member field guides for ${circle.name}.`,
                  circleName: circle.name
                });
              }}
              onShowToast={onShowToast}
              isModalView={true}
            />
          )}

          {/* TAB 4: MEMBERS & 1-ON-1 VIRTUAL COFFEE */}
          {activeTab === 'members' && (
            <CircleMembersView
              circle={circle}
              isJoined={isJoined}
              onJoinCircle={() => {
                onJoinToggle(circle.id);
                onShowToast({
                  type: 'join',
                  title: 'Welcome to the Circle!',
                  message: `You can now customize your role and pair for 1-on-1 coffee in ${circle.name}.`,
                  circleName: circle.name
                });
              }}
              onShowToast={onShowToast}
              onOpenChatWithMember={() => {
                setActiveTab('chat');
              }}
            />
          )}

          {/* TAB 5: CIRCLE METRICS (RECHARTS VISUALIZATION) */}
          {activeTab === 'metrics' && (
            <CircleMetricsSection circle={circle} />
          )}

          {/* TAB 5: MEMBER CHAT */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[400px]">
              {!isJoined ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#0A2463] mb-1">
                    Member-Only Circle Chat
                  </h4>
                  <p className="text-xs text-gray-600 max-w-sm mb-4 leading-relaxed">
                    Join &quot;{circle.name}&quot; to converse with the circle facilitator ({circle.contactPerson}) and fellow members, ask preparation questions, and coordinate local projects.
                  </p>
                  <button
                    onClick={() => {
                      onJoinToggle(circle.id);
                      onShowToast({
                        type: 'join',
                        title: 'Welcome to the Circle!',
                        message: `You are now an active member of ${circle.name}. Real-time chat unlocked.`,
                        circleName: circle.name
                      });
                    }}
                    className="px-5 py-2.5 bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Users className="w-3.5 h-3.5 text-[#D4A017]" />
                    Join This Circle to Chat
                  </button>
                </div>
              ) : (
                <>
                  {/* Active Chat Header */}
                  <div className="pb-3 mb-2 border-b border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-bold text-gray-800">
                        {circle.name} · Peer Discussion Room
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500">
                      Chatham House Rule Active
                    </span>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5 text-[10px] text-gray-500">
                          <span className="font-bold text-gray-700">{msg.senderName}</span>
                          {msg.senderRole && (
                            <span className="px-1.5 py-0.2 rounded bg-gray-100 text-gray-600 font-semibold">
                              {msg.senderRole}
                            </span>
                          )}
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                            msg.isSelf
                              ? 'bg-[#0A2463] text-white rounded-tr-none'
                              : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Chat Input Bar */}
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <input
                      type="text"
                      value={inputMsg}
                      onChange={(e) => setInputMsg(e.target.value)}
                      placeholder={`Message ${circle.contactPerson} and fellow circle members...`}
                      className="flex-1 px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2463] bg-gray-50"
                    />
                    <button
                      type="submit"
                      disabled={!inputMsg.trim()}
                      className="px-4 py-2 bg-[#0A2463] hover:bg-[#1E6091] disabled:opacity-40 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          {/* TAB 3: MONTHLY DISCUSSION ARCHIVE */}
          {activeTab === 'archive' && (
            <div className="space-y-4">
              {!isJoined ? (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-purple-50/50 rounded-xl border border-purple-200">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-purple-950 mb-1">
                    Confidential Circle Archive
                  </h4>
                  <p className="text-xs text-purple-900/80 max-w-md mb-4 leading-relaxed">
                    Monthly discussion summaries, recorded breakthrough insights, and local action covenants are preserved exclusively for verified circle members under the Chatham House Rule.
                  </p>
                  <button
                    onClick={() => {
                      onJoinToggle(circle.id);
                      onShowToast({
                        type: 'join',
                        title: 'Welcome to the Circle!',
                        message: `Archive unlocked for ${circle.name}.`,
                        circleName: circle.name
                      });
                    }}
                    className="px-5 py-2.5 bg-purple-900 hover:bg-purple-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Check className="w-3.5 h-3.5 text-purple-300" />
                    Join Circle to Unlock Archive
                  </button>
                </div>
              ) : (
                <>
                  {/* Member Controls Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-bold text-sm text-[#0A2463]">
                        Monthly Discussion Summaries &amp; Recorded Sessions
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {archives.length} archived sessions recorded
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsRecordingModalOpen(true)}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
                      >
                        <Radio className="w-3.5 h-3.5 animate-pulse text-rose-200" />
                        Record Live Session
                      </button>
                      <button
                        onClick={() => setIsLoggingArchive(!isLoggingArchive)}
                        className="px-3 py-1.5 bg-[#0A2463] hover:bg-[#1E6091] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#D4A017]" />
                        {isLoggingArchive ? 'Cancel Logging' : 'Log Monthly Summary'}
                      </button>
                    </div>
                  </div>

                  {/* Log Summary Form */}
                  {isLoggingArchive && (
                    <form
                      onSubmit={handleSaveArchive}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 text-xs"
                    >
                      <h5 className="font-bold text-gray-900 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#0A2463]" />
                        Record Monthly Circle Gathering
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-gray-700 mb-1">
                            Meeting Month &amp; Year:
                          </label>
                          <input
                            type="text"
                            value={newMeetingDate}
                            onChange={(e) => setNewMeetingDate(e.target.value)}
                            placeholder="e.g., September 2026"
                            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-gray-700 mb-1">
                            Attendees Present:
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={12}
                            value={newAttendees}
                            onChange={(e) => setNewAttendees(Number(e.target.value))}
                            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          Session Title:
                        </label>
                        <input
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g., Water Access Mediation and Shared Planting"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          Key Insights &amp; Breakthrough Perspectives (one per line):
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={newInsights}
                          onChange={(e) => setNewInsights(e.target.value)}
                          placeholder="- Divergent land rights claims were heard completely before discussing solutions.&#10;- Both factions acknowledged drought as the primary driver."
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          Agreed Local Actions &amp; Covenants (one per line):
                        </label>
                        <textarea
                          rows={2}
                          value={newActions}
                          onChange={(e) => setNewActions(e.target.value)}
                          placeholder="- Install solar sensors at border well.&#10;- Host joint elders' breakfast next month."
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setIsLoggingArchive(false)}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold shadow-xs"
                        >
                          Archive Discussion Summary
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Archives List */}
                  {archives.length === 0 ? (
                    <div className="py-8 text-center text-gray-500 text-xs">
                      No monthly summaries logged yet. Click &quot;Log Monthly Summary&quot; to record your first circle gathering.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {archives.map((arch) => (
                        <div
                          key={arch.id}
                          className="p-4 rounded-xl border border-gray-200 bg-[#FBFBFA] space-y-3 text-xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-200/60 pb-2">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                                {arch.meetingDate}
                              </span>
                              <h5 className="font-serif font-bold text-base text-[#0A2463] mt-1">
                                {arch.title}
                              </h5>
                            </div>
                            <div className="text-[11px] text-gray-500 font-medium">
                              {arch.attendeesCount} participants · Logged by {arch.loggedBy}
                            </div>
                          </div>

                          {/* Live Recording Attachment if available */}
                          {arch.recordingUrl && (
                            <div className="p-3 bg-gray-900 rounded-xl text-white space-y-2.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold flex items-center gap-1.5 text-rose-400">
                                  <Film className="w-4 h-4 text-rose-400" />
                                  {arch.recordingType === 'video' ? 'Live Session Video Capture' : 'Live Audio Recording'}
                                </span>
                                <span className="text-gray-400 font-mono text-[11px]">
                                  {arch.recordingDuration ? `Duration: ${arch.recordingDuration}` : ''}
                                  {arch.recordingBlobSize ? ` · ${arch.recordingBlobSize}` : ''}
                                </span>
                              </div>

                              {arch.recordingType === 'video' ? (
                                <video
                                  src={arch.recordingUrl}
                                  controls
                                  className="w-full max-h-56 rounded-lg bg-black object-contain border border-gray-800"
                                />
                              ) : (
                                <audio
                                  src={arch.recordingUrl}
                                  controls
                                  className="w-full pt-1"
                                />
                              )}

                              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-1.5 border-t border-gray-800">
                                <span className="text-gray-400 flex items-center gap-1">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                  Chatham House encrypted link in Circle Archive
                                </span>
                                <a
                                  href={arch.recordingUrl}
                                  download={`${arch.title.replace(/\s+/g, '_')}_recording.webm`}
                                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded font-semibold flex items-center gap-1 transition-colors"
                                >
                                  <Download className="w-3 h-3 text-[#D4A017]" />
                                  Download Recording
                                </a>
                              </div>
                            </div>
                          )}

                          <div>
                            <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wide block mb-1">
                              💡 Breakthrough Insights:
                            </span>
                            <ul className="space-y-1 text-gray-700 list-disc list-inside">
                              {arch.keyInsights.map((ins, i) => (
                                <li key={i} className="leading-relaxed">{ins}</li>
                              ))}
                            </ul>
                          </div>

                          {arch.agreedActions.length > 0 && (
                            <div className="pt-2 border-t border-gray-100">
                              <span className="font-bold text-emerald-800 text-[11px] uppercase tracking-wide block mb-1">
                                🤝 Agreed Joint Actions:
                              </span>
                              <ul className="space-y-1 text-gray-700 list-disc list-inside">
                                {arch.agreedActions.map((act, i) => (
                                  <li key={i} className="leading-relaxed">{act}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

        </div>

      </div>

      {/* MediaRecorder Modal */}
      <MeetingRecorderModal
        circle={circle}
        isOpen={isRecordingModalOpen}
        onClose={() => setIsRecordingModalOpen(false)}
        onSaveToArchive={(newArchive) => {
          const updated = [newArchive, ...archives];
          setArchives(updated);
          localStorage.setItem(`shared_future_archives_${circle.id}`, JSON.stringify(updated));
          onShowToast({
            type: 'recording_saved',
            title: 'Meeting Recording Archived!',
            message: `Audio/video link stored in ${circle.name} Archive (${newArchive.recordingDuration || 'Live Session'}).`,
            circleName: circle.name
          });
          setActiveTab('archive');
        }}
      />
    </div>
  );
};
