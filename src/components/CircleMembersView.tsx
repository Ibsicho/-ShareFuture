import React, { useState, useEffect } from 'react';
import { DialogueCircle, CircleMember, CircleMemberRole, VirtualCoffeePairing } from '../types';
import { AVAILABLE_ROLES, POPULAR_INTEREST_TAGS, INITIAL_CIRCLE_MEMBERS, getCircleDefaultMembers } from '../data/circleMembersData';
import { generateAIIcebreaker, IcebreakerResult } from '../utils/aiIcebreakerGenerator';
import { 
  Users, 
  Coffee, 
  Sparkles, 
  Tag, 
  Edit3, 
  Check, 
  Plus, 
  X, 
  Search, 
  Filter, 
  Video, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  HelpCircle, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  PhoneOff, 
  Clock, 
  Heart,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface CircleMembersViewProps {
  circle: DialogueCircle;
  isJoined: boolean;
  onJoinCircle: () => void;
  onShowToast: (toast: {
    type: 'join' | 'meeting_update' | 'calendar_export' | 'chat' | 'archive' | 'info' | 'agenda_suggest' | 'agenda_update' | 'resource_upload' | 'resource_bookmark' | 'coffee_match' | 'profile_update' | 'icebreaker_generated';
    title: string;
    message: string;
    circleName?: string;
  }) => void;
  onOpenChatWithMember?: (memberName: string) => void;
}

const ROLE_COLORS: Record<CircleMemberRole, { badgeBg: string; text: string; border: string }> = {
  'Facilitator': { badgeBg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300' },
  'Co-Facilitator': { badgeBg: 'bg-orange-100', text: 'text-orange-900', border: 'border-orange-300' },
  'Note-Taker': { badgeBg: 'bg-blue-100', text: 'text-blue-900', border: 'border-blue-300' },
  'Tech Support': { badgeBg: 'bg-indigo-100', text: 'text-indigo-900', border: 'border-indigo-300' },
  'Timekeeper': { badgeBg: 'bg-purple-100', text: 'text-purple-900', border: 'border-purple-300' },
  'Community Liaison': { badgeBg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300' },
  'Youth Envoy': { badgeBg: 'bg-teal-100', text: 'text-teal-900', border: 'border-teal-300' },
  'Research Lead': { badgeBg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300' },
  'Participant': { badgeBg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' }
};

export const CircleMembersView: React.FC<CircleMembersViewProps> = ({
  circle,
  isJoined,
  onJoinCircle,
  onShowToast,
  onOpenChatWithMember
}) => {
  // Load members from localStorage or initial seed
  const [members, setMembers] = useState<CircleMember[]>(() => {
    const saved = localStorage.getItem(`shared_future_members_${circle.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    const initial = INITIAL_CIRCLE_MEMBERS[circle.id] || getCircleDefaultMembers(circle.id, circle.contactPerson, circle.topic, circle.city);
    
    // Check if self profile already exists
    const selfSaved = localStorage.getItem('shared_future_my_circle_profile');
    if (selfSaved) {
      try {
        const selfData = JSON.parse(selfSaved);
        return [
          {
            id: `self-${circle.id}`,
            circleId: circle.id,
            name: selfData.name || 'You (Circle Member)',
            role: selfData.role || 'Participant',
            interests: selfData.interests || ['Community Dialogue', circle.topic],
            bio: selfData.bio || 'Active circle member committed to mutual understanding.',
            joinedDate: 'Joined recently',
            isSelf: true,
            virtualCoffeeAvailable: selfData.virtualCoffeeAvailable ?? true,
            city: circle.city,
            timezone: 'Local'
          },
          ...initial
        ];
      } catch (e) {
        // ignore
      }
    }

    // Default self member when joined
    return [
      {
        id: `self-${circle.id}`,
        circleId: circle.id,
        name: 'You (Circle Member)',
        role: 'Participant',
        interests: ['Community Dialogue', circle.topic, 'Active Listening'],
        bio: 'Active participant exploring shared solutions and local covenants.',
        joinedDate: 'Joined recently',
        isSelf: true,
        virtualCoffeeAvailable: true,
        city: circle.city,
        timezone: 'Local'
      },
      ...initial
    ];
  });

  const saveMembers = (updated: CircleMember[]) => {
    setMembers(updated);
    localStorage.setItem(`shared_future_members_${circle.id}`, JSON.stringify(updated));
  };

  // Self Profile Editing State
  const selfMember = members.find(m => m.isSelf) || members[0];
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [myRole, setMyRole] = useState<CircleMemberRole>(selfMember?.role || 'Participant');
  const [myInterests, setMyInterests] = useState<string[]>(selfMember?.interests || ['Community Dialogue', circle.topic]);
  const [myBio, setMyBio] = useState(selfMember?.bio || '');
  const [myCoffeeAvailable, setMyCoffeeAvailable] = useState(selfMember?.virtualCoffeeAvailable ?? true);
  const [customInterestInput, setCustomInterestInput] = useState('');

  // Search & Filter State
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [coffeeOnlyFilter, setCoffeeOnlyFilter] = useState(false);

  // 1-on-1 Virtual Coffee Pairing State
  const [currentPairing, setCurrentPairing] = useState<VirtualCoffeePairing | null>(() => {
    const saved = localStorage.getItem(`shared_future_coffee_pair_${circle.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return null;
  });

  const [isGeneratingIcebreaker, setIsGeneratingIcebreaker] = useState(false);
  const [aiIcebreakerData, setAiIcebreakerData] = useState<IcebreakerResult | null>(null);
  const [isPairingSpinning, setIsPairingSpinning] = useState(false);
  const [isInVideoCall, setIsInVideoCall] = useState(false);

  // Video call controls state
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callTimerSeconds, setCallTimerSeconds] = useState(0);

  // Video call timer
  useEffect(() => {
    let interval: any;
    if (isInVideoCall) {
      interval = setInterval(() => {
        setCallTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setCallTimerSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isInVideoCall]);

  // Handle Save Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = members.map(m => {
      if (m.isSelf) {
        return {
          ...m,
          role: myRole,
          interests: myInterests,
          bio: myBio.trim() || m.bio,
          virtualCoffeeAvailable: myCoffeeAvailable
        };
      }
      return m;
    });

    saveMembers(updated);
    localStorage.setItem('shared_future_my_circle_profile', JSON.stringify({
      role: myRole,
      interests: myInterests,
      bio: myBio,
      virtualCoffeeAvailable: myCoffeeAvailable
    }));

    setIsEditingProfile(false);

    onShowToast({
      type: 'profile_update',
      title: 'Circle Profile & Badges Updated',
      message: `Your role is set to "${myRole}" with ${myInterests.length} interest tags.`,
      circleName: circle.name
    });
  };

  // Add / Remove interest tag
  const handleToggleInterest = (tag: string) => {
    if (myInterests.includes(tag)) {
      setMyInterests(myInterests.filter(t => t !== tag));
    } else {
      if (myInterests.length >= 8) return;
      setMyInterests([...myInterests, tag]);
    }
  };

  const handleAddCustomInterest = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (!customInterestInput.trim()) return;
    const clean = customInterestInput.trim();
    if (!myInterests.includes(clean)) {
      setMyInterests([...myInterests, clean]);
    }
    setCustomInterestInput('');
  };

  // Random 1-on-1 Virtual Coffee Pairing
  const handleRandomPairing = () => {
    if (members.length < 2) return;

    setIsPairingSpinning(true);
    setAiIcebreakerData(null);

    // Simulate animated pairing shuffle
    setTimeout(() => {
      // Pick two distinct members
      const shuffled = [...members].sort(() => 0.5 - Math.random());
      const memberA = shuffled[0];
      const memberB = shuffled[1];

      // Find shared interests
      const shared = memberA.interests.filter(item => 
        memberB.interests.some(bItem => bItem.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(bItem.toLowerCase()))
      );

      const pairing: VirtualCoffeePairing = {
        id: `pair-${Date.now()}`,
        circleId: circle.id,
        memberA,
        memberB,
        matchedAt: 'Just now',
        scheduledTime: 'This Week · Open Video Room',
        sharedInterests: shared.length > 0 ? shared : [memberA.interests[0] || circle.topic, memberB.interests[0] || 'Dialogue'],
        status: 'matched',
        meetingRoomUrl: `https://meet.sharedfuture.org/coffee-${circle.id.replace('circle-', '')}-${Math.floor(100 + Math.random() * 900)}`
      };

      setCurrentPairing(pairing);
      localStorage.setItem(`shared_future_coffee_pair_${circle.id}`, JSON.stringify(pairing));
      setIsPairingSpinning(false);

      onShowToast({
        type: 'coffee_match',
        title: '☕ Virtual Coffee Match Created!',
        message: `Paired ${memberA.name} and ${memberB.name} for 1-on-1 dialogue.`,
        circleName: circle.name
      });
    }, 600);
  };

  // Pair specific member with self
  const handlePairWithMember = (targetMember: CircleMember) => {
    if (!selfMember || targetMember.id === selfMember.id) return;

    const shared = selfMember.interests.filter(item => 
      targetMember.interests.some(bItem => bItem.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(bItem.toLowerCase()))
    );

    const pairing: VirtualCoffeePairing = {
      id: `pair-${Date.now()}`,
      circleId: circle.id,
      memberA: selfMember,
      memberB: targetMember,
      matchedAt: 'Just now',
      scheduledTime: 'This Week · Open Video Room',
      sharedInterests: shared.length > 0 ? shared : [selfMember.interests[0] || circle.topic, targetMember.interests[0] || 'Dialogue'],
      status: 'matched',
      meetingRoomUrl: `https://meet.sharedfuture.org/coffee-${circle.id.replace('circle-', '')}-${Math.floor(100 + Math.random() * 900)}`
    };

    setCurrentPairing(pairing);
    setAiIcebreakerData(null);
    localStorage.setItem(`shared_future_coffee_pair_${circle.id}`, JSON.stringify(pairing));

    onShowToast({
      type: 'coffee_match',
      title: '☕ 1-on-1 Coffee Scheduled',
      message: `You are paired with ${targetMember.name} (${targetMember.role}).`,
      circleName: circle.name
    });
  };

  // Generate AI Icebreaker
  const handleGenerateAIIcebreaker = async () => {
    if (!currentPairing) return;
    setIsGeneratingIcebreaker(true);

    try {
      const result = await generateAIIcebreaker(
        currentPairing.memberA,
        currentPairing.memberB,
        circle.name,
        circle.topic
      );
      setAiIcebreakerData(result);

      onShowToast({
        type: 'icebreaker_generated',
        title: '✨ AI Icebreaker Generated',
        message: `Tailored conversation starters ready for ${currentPairing.memberA.name} & ${currentPairing.memberB.name}.`,
        circleName: circle.name
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingIcebreaker(false);
    }
  };

  // Filter members
  const filteredMembers = members.filter(m => {
    if (roleFilter !== 'all' && m.role !== roleFilter) return false;
    if (coffeeOnlyFilter && !m.virtualCoffeeAvailable) return false;
    if (memberSearchQuery.trim()) {
      const q = memberSearchQuery.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchBio = m.bio?.toLowerCase().includes(q);
      const matchRole = m.role.toLowerCase().includes(q);
      const matchInterests = m.interests.some(i => i.toLowerCase().includes(q));
      return matchName || matchBio || matchRole || matchInterests;
    }
    return true;
  });

  return (
    <div className="space-y-6 text-gray-800 font-sans">

      {/* 1. Header & Coffee Pairing Highlight Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0A2463] via-[#1E6091] to-[#0A2463] text-white shadow-md border border-blue-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/15 text-[#A8DADC] border border-white/20 flex items-center gap-1.5">
                <Users className="w-3 h-3 text-[#D4A017]" />
                Circle Roster &amp; Community
              </span>
              <span className="text-xs text-blue-200">
                {circle.name} • {members.length} Members
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Member Roles &amp; 1-on-1 Virtual Coffee
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-xl leading-relaxed">
              Tag your skills and interests, discover fellow circle members, and pair for casual 20-minute video coffees powered by AI icebreakers.
            </p>
          </div>

          {/* Quick Match Action */}
          <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
            <button
              onClick={handleRandomPairing}
              disabled={isPairingSpinning}
              className="px-4 py-2.5 bg-[#D4A017] hover:bg-[#b8890f] text-black font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <Coffee className={`w-4 h-4 text-black ${isPairingSpinning ? 'animate-spin' : ''}`} />
              <span>{isPairingSpinning ? 'Matching...' : 'Randomly Pair 1-on-1 Coffee'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Non-Member Gate Banner */}
      {!isJoined && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-xs text-amber-900">
                Join this circle to customize your profile and unlock 1-on-1 Coffee chats
              </h5>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Select your circle role (Facilitator, Note-Taker, Tech Support), highlight your passions, and connect 1-on-1 with peers.
              </p>
            </div>
          </div>
          <button
            onClick={onJoinCircle}
            className="px-4 py-2 bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all shrink-0 active:scale-95"
          >
            <Check className="w-3.5 h-3.5 text-[#D4A017]" />
            Join Circle to Select Role
          </button>
        </div>
      )}

      {/* 2. My Circle Profile & Role Customizer */}
      {isJoined && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-blue-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-sm">
                You
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0A2463] flex items-center gap-2">
                  <span>My Circle Profile &amp; Role</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${ROLE_COLORS[selfMember?.role || 'Participant'].badgeBg} ${ROLE_COLORS[selfMember?.role || 'Participant'].text} ${ROLE_COLORS[selfMember?.role || 'Participant'].border}`}>
                    {selfMember?.role || 'Participant'}
                  </span>
                </h4>
                <p className="text-[11px] text-gray-500">
                  Visible to circle members on the roster and during 1-on-1 pairings.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-600" />
              <span>{isEditingProfile ? 'Cancel' : 'Edit My Role & Interests'}</span>
            </button>
          </div>

          {/* Current Profile Preview (when not editing) */}
          {!isEditingProfile && (
            <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-gray-500 text-[11px] mr-1">Interests:</span>
                {selfMember?.interests.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-medium text-[11px]">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-500 shrink-0">
                <Coffee className="w-3.5 h-3.5 text-amber-600" />
                <span>{selfMember?.virtualCoffeeAvailable ? 'Open for 1-on-1 Coffee' : 'Not taking coffee chats'}</span>
              </div>
            </div>
          )}

          {/* Inline Profile Edit Form */}
          {isEditingProfile && (
            <form onSubmit={handleSaveProfile} className="pt-3 border-t border-gray-100 space-y-4 text-xs animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Role Selector */}
                <div>
                  <label className="font-bold text-gray-800 block mb-1">
                    Select Your Circle Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={myRole}
                    onChange={(e) => setMyRole(e.target.value as CircleMemberRole)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-medium focus:ring-2 focus:ring-[#0A2463]"
                  >
                    {AVAILABLE_ROLES.map(r => (
                      <option key={r.role} value={r.role}>
                        {r.role} — {r.description}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Each circle functions smoothly when members share roles like Note-Taker, Timekeeper, or Facilitator.
                  </p>
                </div>

                {/* Virtual Coffee Availability */}
                <div>
                  <label className="font-bold text-gray-800 block mb-1">
                    1-on-1 Virtual Coffee Availability
                  </label>
                  <label className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100/70 transition-colors">
                    <input
                      type="checkbox"
                      checked={myCoffeeAvailable}
                      onChange={(e) => setMyCoffeeAvailable(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <span className="text-xs text-gray-800 font-medium">
                      ☕ Yes, count me in for random 20-minute coffee pairings!
                    </span>
                  </label>
                </div>
              </div>

              {/* Interests Multi-Select */}
              <div>
                <label className="font-bold text-gray-800 block mb-1.5">
                  Member Interests &amp; Passions (Choose up to 8)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {POPULAR_INTEREST_TAGS.map(tag => {
                    const selected = myInterests.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => handleToggleInterest(tag)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          selected
                            ? 'bg-[#0A2463] text-white shadow-2xs'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '} {tag}
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Interest */}
                <div className="flex items-center gap-2 max-w-md">
                  <input
                    type="text"
                    value={customInterestInput}
                    onChange={(e) => setCustomInterestInput(e.target.value)}
                    onKeyDown={handleAddCustomInterest}
                    placeholder="Type custom interest and press Enter..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A2463]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomInterest}
                    className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-semibold"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Save & Cancel */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-3.5 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-[#D4A017]" />
                  <span>Save Profile &amp; Badges</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* 3. Virtual Coffee Pairing Card (Active Match) */}
      {currentPairing && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/90 to-orange-50/70 border-2 border-amber-300 shadow-sm space-y-4 animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  Active 1-on-1 Coffee Match
                </span>
                <h4 className="font-serif font-bold text-base sm:text-lg text-amber-950">
                  {currentPairing.memberA.name} &amp; {currentPairing.memberB.name}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsInVideoCall(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <Video className="w-4 h-4 text-emerald-200" />
                <span>Start Video Coffee</span>
              </button>
              <button
                onClick={handleRandomPairing}
                title="Shuffle and pair two other members"
                className="p-2 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Members Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Member A */}
            <div className="p-3.5 rounded-xl bg-white/90 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900">{currentPairing.memberA.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${ROLE_COLORS[currentPairing.memberA.role]?.badgeBg} ${ROLE_COLORS[currentPairing.memberA.role]?.text} ${ROLE_COLORS[currentPairing.memberA.role]?.border}`}>
                  {currentPairing.memberA.role}
                </span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{currentPairing.memberA.bio || 'Active circle member.'}</p>
              <div className="flex flex-wrap gap-1">
                {currentPairing.memberA.interests.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Member B */}
            <div className="p-3.5 rounded-xl bg-white/90 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900">{currentPairing.memberB.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${ROLE_COLORS[currentPairing.memberB.role]?.badgeBg} ${ROLE_COLORS[currentPairing.memberB.role]?.text} ${ROLE_COLORS[currentPairing.memberB.role]?.border}`}>
                  {currentPairing.memberB.role}
                </span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{currentPairing.memberB.bio || 'Active circle member.'}</p>
              <div className="flex flex-wrap gap-1">
                {currentPairing.memberB.interests.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* AI Icebreaker Generator Callout & Output */}
          <div className="p-4 rounded-xl bg-white border border-amber-300 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4A017]" />
                  AI Introduction &amp; Dialogue Icebreaker
                </h5>
                <p className="text-[11px] text-gray-500">
                  Bridges their specific roles and common interests into deep, positive-sum inquiries.
                </p>
              </div>

              <button
                onClick={handleGenerateAIIcebreaker}
                disabled={isGeneratingIcebreaker}
                className="px-3.5 py-2 rounded-xl bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0 disabled:opacity-50 active:scale-95"
              >
                <Sparkles className={`w-3.5 h-3.5 text-[#D4A017] ${isGeneratingIcebreaker ? 'animate-spin' : ''}`} />
                <span>{isGeneratingIcebreaker ? 'Crafting Icebreaker...' : aiIcebreakerData ? 'Regenerate Icebreaker' : 'Generate Introduction Icebreaker'}</span>
              </button>
            </div>

            {/* Generated Icebreaker Output */}
            {aiIcebreakerData ? (
              <div className="mt-3 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-3 text-xs animate-in fade-in">
                
                {/* Icebreaker Opening */}
                <div className="italic text-amber-950 font-serif text-sm leading-relaxed border-l-4 border-[#D4A017] pl-3 py-1">
                  {aiIcebreakerData.icebreaker}
                </div>

                {/* Connection Note */}
                <p className="text-[11px] text-amber-900 font-semibold flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{aiIcebreakerData.sharedConnectionNote}</span>
                </p>

                {/* 3 Starter Questions */}
                <div>
                  <span className="font-bold text-gray-800 text-[11px] block uppercase mb-1.5">
                    3 Deep Conversation Starters:
                  </span>
                  <div className="space-y-1.5">
                    {aiIcebreakerData.starterQuestions.map((q, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white border border-amber-200 flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-gray-800 font-medium">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro Activity */}
                {aiIcebreakerData.suggestedActivity && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>2-Minute Micro-Activity:</strong> {aiIcebreakerData.suggestedActivity}</span>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-4 rounded-xl bg-gray-50 border border-dashed border-gray-300 text-center text-xs text-gray-500">
                Click <strong>&quot;Generate Introduction Icebreaker&quot;</strong> to craft questions bridging {currentPairing.memberA.name}&apos;s and {currentPairing.memberB.name}&apos;s shared passions.
              </div>
            )}
          </div>

        </div>
      )}

      {/* 4. Members List & Role Filters */}
      <div className="space-y-4">
        
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
          
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={memberSearchQuery}
              onChange={(e) => setMemberSearchQuery(e.target.value)}
              placeholder="Search members by name, role (Note-Taker, Facilitator), or interest..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A2463] focus:outline-none bg-gray-50/50"
            />
          </div>

          {/* Role Filter & Coffee Toggle */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-500 text-[11px]">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl border border-gray-300 font-medium bg-white text-gray-700 focus:ring-2 focus:ring-[#0A2463]"
              >
                <option value="all">All Circle Roles ({members.length})</option>
                {AVAILABLE_ROLES.map(r => (
                  <option key={r.role} value={r.role}>
                    {r.role}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setCoffeeOnlyFilter(!coffeeOnlyFilter)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all ${
                coffeeOnlyFilter
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent'
              }`}
            >
              <Coffee className="w-3.5 h-3.5 text-amber-600" />
              <span>☕ Open for Coffee</span>
            </button>
          </div>

        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMembers.map((member) => {
            const roleStyle = ROLE_COLORS[member.role] || ROLE_COLORS.Participant;

            return (
              <div
                key={member.id}
                className={`bg-white border rounded-2xl p-4 sm:p-5 shadow-xs transition-all flex flex-col justify-between ${
                  member.isSelf ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  {/* Top Bar: Name, Self Indicator & Role Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A2463] to-[#1E6091] text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm text-gray-900">{member.name}</h4>
                          {member.isSelf && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                              You
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 block">{member.city || circle.city} • {member.joinedDate}</span>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${roleStyle.badgeBg} ${roleStyle.text} ${roleStyle.border}`}>
                      {member.role}
                    </span>
                  </div>

                  {/* Bio */}
                  {member.bio && (
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      {member.bio}
                    </p>
                  )}

                  {/* Interests Badges */}
                  <div className="mt-3 pt-2.5 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Member Interests:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {member.interests.map(interest => (
                        <span
                          key={interest}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          #{interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    {member.virtualCoffeeAvailable ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        ☕ Coffee Ready
                      </span>
                    ) : (
                      <span className="text-gray-400">Coffee Busy</span>
                    )}
                  </div>

                  {!member.isSelf && isJoined && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handlePairWithMember(member)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold flex items-center gap-1 text-[11px] transition-colors border border-amber-200"
                        title={`Pair 1-on-1 virtual coffee with ${member.name}`}
                      >
                        <Coffee className="w-3.5 h-3.5 text-amber-700" />
                        <span>Pair 1-on-1</span>
                      </button>

                      {onOpenChatWithMember && (
                        <button
                          onClick={() => onOpenChatWithMember(member.name)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title={`Message ${member.name}`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 5. 1-on-1 Video Chat Room Modal */}
      {isInVideoCall && currentPairing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden text-white font-sans">
            
            {/* Call Header */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <span>1-on-1 Virtual Coffee: {currentPairing.memberA.name} &amp; {currentPairing.memberB.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                      {Math.floor(callTimerSeconds / 60)}:{(callTimerSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </h4>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    Chatham House Rule Protected Container • {circle.name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsInVideoCall(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg"
              >
                ✕
              </button>
            </div>

            {/* Video Streams Grid */}
            <div className="flex-1 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 overflow-y-auto">
              
              {/* Member A Video Screen */}
              <div className="relative rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden flex flex-col items-center justify-center min-h-[220px] shadow-inner">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-2xl shadow-lg mb-3">
                  {currentPairing.memberA.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-bold text-sm text-slate-200">{currentPairing.memberA.name}</span>
                <span className="text-[11px] text-blue-300 font-semibold">{currentPairing.memberA.role}</span>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Connected
                </div>
              </div>

              {/* Member B Video Screen */}
              <div className="relative rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden flex flex-col items-center justify-center min-h-[220px] shadow-inner">
                {isVideoOff ? (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-slate-700 text-slate-400 font-bold flex items-center justify-center text-2xl mb-3">
                      <CameraOff className="w-8 h-8" />
                    </div>
                    <span className="text-xs text-slate-400">Camera Paused</span>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 to-orange-600 text-white font-bold flex items-center justify-center text-2xl shadow-lg mb-3">
                      {currentPairing.memberB.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-bold text-sm text-slate-200">{currentPairing.memberB.name}</span>
                    <span className="text-[11px] text-amber-300 font-semibold">{currentPairing.memberB.role}</span>
                  </>
                )}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {isMicMuted ? 'Muted' : 'Mic Live'}
                </div>
              </div>

            </div>

            {/* In-Call Icebreaker Prompts Bar */}
            {aiIcebreakerData && (
              <div className="px-5 py-3 bg-slate-950/90 border-t border-slate-800 text-xs">
                <span className="text-[10px] font-bold text-[#D4A017] uppercase tracking-wider block mb-1">
                  Active AI Icebreaker Question:
                </span>
                <p className="text-slate-200 italic font-medium">
                  {aiIcebreakerData.starterQuestions[0]}
                </p>
              </div>
            )}

            {/* Call Controls Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-3 rounded-full transition-colors ${
                  isMicMuted ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
                title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
              >
                {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOff ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
                title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
              >
                {isVideoOff ? <CameraOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsInVideoCall(false)}
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Virtual Coffee</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
