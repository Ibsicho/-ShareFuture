import React, { useState, useEffect } from 'react';
import { INITIAL_CIRCLES } from '../data/frameworkData';
import { DialogueCircle, ViewTab, CircleToastNotification } from '../types';
import { DialogueCirclesMap } from './DialogueCirclesMap';
import { CircleDetailsModal } from './CircleDetailsModal';
import { NotificationToastContainer } from './NotificationToast';
import { exportCircleToICS } from '../utils/calendarExport';
import { 
  Users, 
  MapPin, 
  Globe, 
  Calendar, 
  MessageSquare, 
  Plus, 
  Search, 
  Check, 
  Sparkles,
  BookOpen,
  ArrowRight,
  Download,
  Archive,
  Map as MapIcon,
  LayoutGrid,
  Bell,
  Clock,
  Layers,
  CalendarCheck,
  Coffee,
  BarChart3,
  Radio
} from 'lucide-react';

interface DialogueCirclesAppProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const DialogueCirclesApp: React.FC<DialogueCirclesAppProps> = ({ onSelectTab }) => {
  const [circles, setCircles] = useState<DialogueCircle[]>(() => {
    const saved = localStorage.getItem('shared_future_circles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CIRCLES;
  });

  const [joinedCircleIds, setJoinedCircleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('shared_future_joined_circles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['circle-1', 'circle-2'];
  });

  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'both' | 'map' | 'grid'>('both');
  const [selectedCircleForModal, setSelectedCircleForModal] = useState<DialogueCircle | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'overview' | 'agenda' | 'resources' | 'members' | 'metrics' | 'chat' | 'archive'>('overview');
  const [highlightedCircleId, setHighlightedCircleId] = useState<string | null>('circle-1');
  const [isCreatingCircle, setIsCreatingCircle] = useState<boolean>(false);

  // Notification Toasts State
  const [toasts, setToasts] = useState<CircleToastNotification[]>([]);

  const addToast = (toast: {
    type: 'join' | 'meeting_update' | 'calendar_export' | 'chat' | 'archive' | 'info' | 'agenda_suggest' | 'agenda_update' | 'resource_upload' | 'resource_bookmark' | 'coffee_match' | 'profile_update' | 'icebreaker_generated' | 'recording_started' | 'recording_saved';
    title: string;
    message: string;
    circleName?: string;
  }) => {
    const newToast: CircleToastNotification = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: toast.type,
      title: toast.title,
      message: toast.message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      circleName: toast.circleName
    };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]); // Keep max 5 active toasts
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Welcome demonstration toast on first mount if none yet
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('shared_future_toast_welcome');
    if (!hasSeenWelcome) {
      sessionStorage.setItem('shared_future_toast_welcome', 'true');
      const timer = setTimeout(() => {
        addToast({
          type: 'join',
          title: 'Active Circle Membership',
          message: 'You are an active member of Nairobi Peace Builders and Geneva Diplomatic Bridge.',
          circleName: 'Dialogue Circles Network'
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // New Circle Form State
  const [newCircleName, setNewCircleName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newTopic, setNewTopic] = useState('Healing Historical Wounds');
  const [newFormat, setNewFormat] = useState<'in-person' | 'online' | 'hybrid'>('hybrid');
  const [newLanguage, setNewLanguage] = useState('English');
  const [newMeetingTime, setNewMeetingTime] = useState('1st Sunday monthly · 5:00 PM');
  const [newOrganizer, setNewOrganizer] = useState('');

  const handleJoinToggle = (id: string) => {
    const targetCircle = circles.find(c => c.id === id);
    const circleName = targetCircle ? targetCircle.name : 'Dialogue Circle';

    if (joinedCircleIds.includes(id)) {
      const updated = joinedCircleIds.filter(item => item !== id);
      setJoinedCircleIds(updated);
      localStorage.setItem('shared_future_joined_circles', JSON.stringify(updated));

      // Decrement members count
      setCircles(prev => {
        const next = prev.map(c => c.id === id ? { ...c, membersCount: Math.max(1, c.membersCount - 1) } : c);
        localStorage.setItem('shared_future_circles', JSON.stringify(next));
        return next;
      });

      addToast({
        type: 'info',
        title: 'Circle Left',
        message: `You are no longer a registered member of ${circleName}.`,
        circleName
      });
    } else {
      const updated = [...joinedCircleIds, id];
      setJoinedCircleIds(updated);
      localStorage.setItem('shared_future_joined_circles', JSON.stringify(updated));

      // Increment members count
      setCircles(prev => {
        const next = prev.map(c => c.id === id ? { ...c, membersCount: Math.min(c.maxMembers, c.membersCount + 1) } : c);
        localStorage.setItem('shared_future_circles', JSON.stringify(next));
        return next;
      });

      addToast({
        type: 'join',
        title: 'Welcome to the Circle!',
        message: `You joined ${circleName}. Member chat and monthly discussion archives are now unlocked.`,
        circleName
      });
    }
  };

  const handleExportCalendar = (circle: DialogueCircle) => {
    exportCircleToICS(circle);
    addToast({
      type: 'calendar_export',
      title: 'Exported to Calendar (.ics)',
      message: `Downloaded recurring calendar invite for ${circle.name}.`,
      circleName: circle.name
    });
  };

  const handleMeetingTimeUpdated = (circleId: string, newTime: string) => {
    const updated = circles.map(c => c.id === circleId ? { ...c, meetingTime: newTime } : c);
    setCircles(updated);
    localStorage.setItem('shared_future_circles', JSON.stringify(updated));

    // Update selected modal circle state as well
    if (selectedCircleForModal && selectedCircleForModal.id === circleId) {
      setSelectedCircleForModal(prev => prev ? { ...prev, meetingTime: newTime } : null);
    }
  };

  // Simulate a live update notification (new member joining or host rescheduling)
  const handleSimulateNotification = () => {
    const simulatedEvents = [
      {
        type: 'join' as const,
        title: 'New Member Joined!',
        message: 'Amara Okafor welcomed Dr. Kofi Mensah to Nairobi Peace Builders.',
        circleName: 'Nairobi Peace Builders'
      },
      {
        type: 'agenda_suggest' as const,
        title: 'New Discussion Point Proposed',
        message: 'Wanjiru Njeri proposed "Solar Bore-hole Hydrological Telemetry" for upcoming meeting.',
        circleName: 'Nairobi Peace Builders'
      },
      {
        type: 'meeting_update' as const,
        title: 'Meeting Time Updated',
        message: 'Host Jean-Luc Meyer updated session time to Tuesday at 7:00 PM CET.',
        circleName: 'Geneva Diplomatic Bridge'
      },
      {
        type: 'agenda_update' as const,
        title: 'Agenda Priority Supported',
        message: 'Elena Rostova upvoted "1975 Helsinki CBMs vs Satellite Verification" (+1).',
        circleName: 'Geneva Diplomatic Bridge'
      },
      {
        type: 'join' as const,
        title: 'New Member Joined!',
        message: 'Beatriz Da Silva welcomed Maria Santos to São Paulo Eco-Solidarity.',
        circleName: 'São Paulo Eco-Solidarity'
      },
      {
        type: 'chat' as const,
        title: 'New Circle Chat Message',
        message: 'David Kiprono: "I have confirmed attendance for Saturday\'s dialogue."',
        circleName: 'Nairobi Peace Builders'
      }
    ];

    const randomEvent = simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)];
    addToast(randomEvent);
  };

  const handleCreateCircleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCircleName.trim()) return;

    // Approximate coordinates based on general region or seed
    const defaultCoords = {
      lat: (Math.random() * 60) - 20,
      lng: (Math.random() * 120) - 60
    };

    const newCircle: DialogueCircle = {
      id: `circle-${Date.now()}`,
      name: newCircleName.trim(),
      city: newCity.trim() || 'Community',
      country: newCountry.trim() || 'Global',
      region: 'Global Network',
      membersCount: 1,
      maxMembers: 8,
      languages: [newLanguage.trim() || 'English'],
      meetingTime: newMeetingTime.trim() || 'Monthly',
      topic: newTopic,
      format: newFormat,
      contactPerson: newOrganizer.trim() || 'You (Founding Facilitator)',
      description: `A dialogue circle founded to practice deep listening, cross-boundary perspective taking, and joint local community healing.`,
      coordinates: defaultCoords
    };

    const updatedCircles = [newCircle, ...circles];
    setCircles(updatedCircles);
    localStorage.setItem('shared_future_circles', JSON.stringify(updatedCircles));

    // Automatically join the newly created circle
    const updatedJoined = [...joinedCircleIds, newCircle.id];
    setJoinedCircleIds(updatedJoined);
    localStorage.setItem('shared_future_joined_circles', JSON.stringify(updatedJoined));

    setIsCreatingCircle(false);
    setNewCircleName('');
    setNewCity('');
    setNewCountry('');
    setNewOrganizer('');

    // Highlight and notify
    setHighlightedCircleId(newCircle.id);
    addToast({
      type: 'join',
      title: 'New Circle Established!',
      message: `${newCircle.name} registered and pinned to the global map.`,
      circleName: newCircle.name
    });
  };

  const filteredCircles = circles.filter(c => {
    const matchesFormat = filterFormat === 'all' || c.format === filterFormat;
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  const openCircleModal = (circle: DialogueCircle, tab: 'overview' | 'agenda' | 'resources' | 'members' | 'metrics' | 'chat' | 'archive' = 'overview') => {
    setSelectedCircleForModal(circle);
    setModalInitialTab(tab);
    setHighlightedCircleId(circle.id);
  };

  return (
    <section className="py-16 bg-[#F5F6F8] text-[#1E2530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0A2463]/10 text-[#0A2463] text-xs font-sans font-bold uppercase tracking-wider mb-2 border border-[#0A2463]/20">
              <Users className="w-3.5 h-3.5 text-[#0A2463]" />
              The Movement Infrastructure
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2463]">
              Dialogue Circles: Transforming Rivals into Partners
            </h2>
            <p className="text-sm text-[#6C757D] font-sans mt-2 max-w-2xl leading-relaxed">
              Circles of 6 to 8 people meeting monthly across opposing political, cultural, or national identities. Grounded in deep listening, mutual respect, and collaborative local projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSimulateNotification}
              title="Test notification toast alerts"
              className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-3 py-2 rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>Simulate Activity</span>
            </button>
            <button
              onClick={() => onSelectTab('dialogue-guide')}
              className="bg-white hover:bg-gray-50 border border-gray-300 text-[#0A2463] px-3.5 py-2 rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#1E6091]" />
              Preparation Guide
            </button>
            <button
              onClick={() => setIsCreatingCircle(true)}
              className="bg-[#0A2463] hover:bg-[#1E6091] text-white px-4 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 text-[#D4A017]" />
              Start a Circle
            </button>
          </div>
        </div>

        {/* 6-Person Rule & Stats Callout Banner */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A2463] text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
              6
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-[#0A2463]">
                The Rule of Six: Intimate, Safe, Accountable
              </h4>
              <p className="text-xs text-[#6C757D] font-sans">
                Six people with differing worldviews meeting monthly. Big enough for authentic diversity, small enough for genuine friendship and trust.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-sans font-semibold text-[#1E6091] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>{circles.length} Verified Circles Across 6 Continents</span>
            </div>
            <div className="text-xs font-sans font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{joinedCircleIds.length} Joined by You</span>
            </div>
          </div>
        </div>

        {/* View Mode Switch & Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
          
          {/* Format Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-sans font-bold text-[#6C757D] mr-2">Format:</span>
            {(['all', 'in-person', 'online', 'hybrid'] as const).map(fmt => (
              <button
                key={fmt}
                onClick={() => setFilterFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold capitalize transition-all ${
                  filterFormat === fmt
                    ? 'bg-[#0A2463] text-white shadow-xs'
                    : 'bg-white text-[#6C757D] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {fmt === 'all' ? 'All Formats' : fmt}
              </button>
            ))}
          </div>

          {/* Search & View Mode Switch */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search city, country, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs font-sans bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex bg-white p-1 rounded-xl border border-gray-200 shadow-2xs">
              <button
                onClick={() => setViewMode('both')}
                title="Combined Map & Cards View"
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'both' ? 'bg-[#0A2463] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Split</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                title="Global Interactive Map Only"
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'map' ? 'bg-[#0A2463] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Map</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Directory Cards Only"
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'grid' ? 'bg-[#0A2463] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Directory</span>
              </button>
            </div>
          </div>
        </div>

        {/* LEAFLET MAP VIEW */}
        {(viewMode === 'both' || viewMode === 'map') && (
          <div className="mb-10">
            <DialogueCirclesMap
              circles={filteredCircles}
              selectedCircleId={highlightedCircleId}
              joinedCircleIds={joinedCircleIds}
              onSelectCircle={(circle) => openCircleModal(circle, 'overview')}
              onJoinCircle={handleJoinToggle}
              onExportCalendar={handleExportCalendar}
            />
          </div>
        )}

        {/* CIRCLES DIRECTORY GRID */}
        {(viewMode === 'both' || viewMode === 'grid') && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-[#0A2463]">
                Registered Community Circles ({filteredCircles.length})
              </h3>
              <span className="text-xs text-gray-500">
                Click any circle to access member chat, discussion archive, or calendar sync
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCircles.map((circle) => {
                const isJoined = joinedCircleIds.includes(circle.id);
                const isHighlighted = highlightedCircleId === circle.id;

                return (
                  <div
                    key={circle.id}
                    id={`circle-${circle.id}`}
                    className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                      isHighlighted ? 'border-[#0A2463] ring-2 ring-[#0A2463]/10' : 'border-gray-200'
                    }`}
                  >
                    <div>
                      {/* Card Header & Badges */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[11px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            circle.format === 'in-person'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : circle.format === 'online'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-teal-50 text-teal-800 border-teal-200'
                          }`}>
                            {circle.format}
                          </span>
                          {isJoined && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300">
                              Joined
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-sans font-semibold text-gray-500">
                          {circle.membersCount}/{circle.maxMembers} Members
                        </span>
                      </div>

                      {/* Circle Title */}
                      <h4 
                        onClick={() => openCircleModal(circle, 'overview')}
                        className="font-serif font-bold text-lg text-[#0A2463] hover:text-[#1E6091] cursor-pointer transition-colors"
                      >
                        {circle.name}
                      </h4>

                      {/* Location & Languages */}
                      <div className="flex items-center gap-1.5 text-xs font-sans text-gray-600 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-[#1E6091] shrink-0" />
                        <span>{circle.city}, {circle.country}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500 truncate">{circle.languages.join(', ')}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#6C757D] font-sans mt-3 leading-relaxed line-clamp-3">
                        {circle.description}
                      </p>

                      {/* Meeting Cadence & Topic Box */}
                      <div className="mt-4 p-3 rounded-xl bg-[#FBFBFA] border border-gray-100 space-y-1.5 text-xs font-sans">
                        <div className="flex items-center justify-between gap-1 text-[#0A2463] font-semibold">
                          <div className="flex items-center gap-1.5 truncate">
                            <Calendar className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
                            <span className="truncate">{circle.meetingTime}</span>
                          </div>
                          {/* Calendar Export Button right on the card */}
                          <button
                            onClick={() => handleExportCalendar(circle)}
                            title="Export meeting time to personal calendar (.ics)"
                            className="p-1 text-gray-400 hover:text-[#0A2463] hover:bg-gray-100 rounded transition-colors"
                          >
                            <Download className="w-3.5 h-3.5 text-blue-600" />
                          </button>
                        </div>
                        <div className="text-[11px] text-[#2D6A4F] font-medium truncate">
                          Focus: {circle.topic}
                        </div>
                      </div>

                      {/* Member Feature Shortcuts: Agenda, Chat & Archive */}
                      <div className="mt-3 space-y-1.5 pt-2 border-t border-gray-100 text-xs">
                        <button
                          onClick={() => openCircleModal(circle, 'agenda')}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-blue-50/90 hover:bg-blue-100 text-blue-900 font-semibold flex items-center justify-center gap-1.5 text-[11px] transition-colors border border-blue-200/70"
                        >
                          <CalendarCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>Upcoming Agenda &amp; Points</span>
                        </button>
                        <div className="grid grid-cols-5 gap-1">
                          <button
                            onClick={() => openCircleModal(circle, 'members')}
                            className="px-1 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold flex items-center justify-center gap-0.5 text-[10px] transition-colors border border-amber-200/60"
                            title="Circle members & 1-on-1 virtual coffee"
                          >
                            <Coffee className="w-3 h-3 text-amber-700" />
                            <span>Coffee</span>
                          </button>
                          <button
                            onClick={() => openCircleModal(circle, 'resources')}
                            className="px-1 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold flex items-center justify-center gap-0.5 text-[10px] transition-colors border border-emerald-200/60"
                            title="Open circle resource library"
                          >
                            <BookOpen className="w-3 h-3 text-emerald-600" />
                            <span>Library</span>
                          </button>
                          <button
                            onClick={() => openCircleModal(circle, 'metrics')}
                            className="px-1 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold flex items-center justify-center gap-0.5 text-[10px] transition-colors border border-blue-200/60"
                            title="Circle metrics & attendance frequency"
                          >
                            <BarChart3 className="w-3 h-3 text-blue-700" />
                            <span>Metrics</span>
                          </button>
                          <button
                            onClick={() => openCircleModal(circle, 'chat')}
                            className="px-1 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold flex items-center justify-center gap-0.5 text-[10px] transition-colors"
                          >
                            <MessageSquare className="w-3 h-3 text-indigo-600" />
                            <span>Chat</span>
                          </button>
                          <button
                            onClick={() => openCircleModal(circle, 'archive')}
                            className="px-1 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 font-semibold flex items-center justify-center gap-0.5 text-[10px] transition-colors"
                          >
                            <Archive className="w-3 h-3 text-purple-600" />
                            <span>Logs</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Host & Join Button & Calendar Export */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleExportCalendar(circle)}
                        title="Export to Calendar (.ics)"
                        className="px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-semibold flex items-center gap-1 transition-colors hover:bg-gray-50"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#D4A017]" />
                        <span>.ics</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openCircleModal(circle, 'overview')}
                          className="text-xs text-gray-500 hover:text-[#0A2463] font-semibold px-2 py-1"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleJoinToggle(circle.id)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-all flex items-center gap-1.5 ${
                            isJoined
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                              : 'bg-[#0A2463] text-white hover:bg-[#1E6091]'
                          }`}
                        >
                          {isJoined ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              Joined
                            </>
                          ) : (
                            'Join Circle'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Start a Circle Modal */}
        {isCreatingCircle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-200">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#0A2463]" />
                  <h3 className="font-serif font-bold text-xl text-[#0A2463]">
                    Start a New Dialogue Circle
                  </h3>
                </div>
                <button
                  onClick={() => setIsCreatingCircle(false)}
                  className="text-gray-400 hover:text-gray-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateCircleSubmit} className="py-4 space-y-4 font-sans text-xs">
                <div>
                  <label className="block font-bold text-[#0A2463] mb-1">Circle Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Chicago Unity Circle"
                    value={newCircleName}
                    onChange={(e) => setNewCircleName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#0A2463] mb-1">City / Region:</label>
                    <input
                      type="text"
                      placeholder="e.g., Chicago"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0A2463] mb-1">Country:</label>
                    <input
                      type="text"
                      placeholder="e.g., USA"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#0A2463] mb-1">Format:</label>
                    <select
                      value={newFormat}
                      onChange={(e: any) => setNewFormat(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
                    >
                      <option value="in-person">In-Person</option>
                      <option value="online">Online</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#0A2463] mb-1">Primary Language:</label>
                    <input
                      type="text"
                      placeholder="e.g., English, Spanish"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#0A2463] mb-1">Core Dialogue Focus:</label>
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
                  >
                    <option value="Healing Historical Wounds">Healing Historical Wounds</option>
                    <option value="Bridging Political Polarization">Bridging Political Polarization</option>
                    <option value="Climate Justice & Resource Sharing">Climate Justice &amp; Resource Sharing</option>
                    <option value="AI Safety & Digital Human Rights">AI Safety &amp; Digital Human Rights</option>
                    <option value="Interfaith & Intercivilizational Unity">Interfaith &amp; Intercivilizational Unity</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0A2463] mb-1">Meeting Time / Cadence:</label>
                  <input
                    type="text"
                    placeholder="e.g., 1st Sunday monthly · 5:00 PM"
                    value={newMeetingTime}
                    onChange={(e) => setNewMeetingTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0A2463] mb-1">Your Name (Organizer):</label>
                  <input
                    type="text"
                    placeholder="e.g., Jordan Miller"
                    value={newOrganizer}
                    onChange={(e) => setNewOrganizer(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingCircle(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold shadow transition-all"
                  >
                    Create &amp; Register Circle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Circle Details, Chat & Archive Modal */}
        {selectedCircleForModal && (
          <CircleDetailsModal
            circle={selectedCircleForModal}
            isJoined={joinedCircleIds.includes(selectedCircleForModal.id)}
            initialTab={modalInitialTab}
            onClose={() => setSelectedCircleForModal(null)}
            onJoinToggle={handleJoinToggle}
            onMeetingTimeUpdated={handleMeetingTimeUpdated}
            onShowToast={addToast}
          />
        )}

        {/* Floating Notification Toast System */}
        <NotificationToastContainer toasts={toasts} onDismiss={dismissToast} />

      </div>
    </section>
  );
};
