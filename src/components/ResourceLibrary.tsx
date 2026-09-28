import React, { useState, useEffect } from 'react';
import { CircleResource, ResourceFormat, ResourceCategory, DialogueCircle } from '../types';
import { INITIAL_RESOURCES } from '../data/circleResourceData';
import { 
  Search, 
  Filter, 
  Upload, 
  FileText, 
  Download, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  ExternalLink, 
  Eye, 
  Plus, 
  Sparkles, 
  Check, 
  BookOpen, 
  ShieldCheck, 
  Calendar, 
  Tag, 
  Users, 
  X, 
  Layers, 
  SlidersHorizontal,
  FileCheck,
  AlertCircle,
  Clock,
  ArrowUpDown,
  Lock,
  ChevronRight
} from 'lucide-react';

interface ResourceLibraryProps {
  circle?: DialogueCircle; // If provided, library is scoped or defaults to this circle
  isJoined?: boolean;
  onJoinCircle?: () => void;
  onShowToast?: (toast: {
    type: 'join' | 'meeting_update' | 'calendar_export' | 'chat' | 'archive' | 'info' | 'agenda_suggest' | 'agenda_update' | 'resource_upload' | 'resource_bookmark';
    title: string;
    message: string;
    circleName?: string;
  }) => void;
  isModalView?: boolean;
}

const FORMAT_CONFIG: Record<ResourceFormat, { label: string; badgeBg: string; badgeText: string; iconBg: string }> = {
  pdf: { label: 'PDF Document', badgeBg: 'bg-red-50 border-red-200', badgeText: 'text-red-700', iconBg: 'bg-red-600' },
  research_paper: { label: 'Research Paper', badgeBg: 'bg-indigo-50 border-indigo-200', badgeText: 'text-indigo-700', iconBg: 'bg-indigo-600' },
  policy_brief: { label: 'Policy Brief & Accord', badgeBg: 'bg-blue-50 border-blue-200', badgeText: 'text-blue-700', iconBg: 'bg-blue-600' },
  field_guide: { label: 'Field Guide & Playbook', badgeBg: 'bg-emerald-50 border-emerald-200', badgeText: 'text-emerald-700', iconBg: 'bg-emerald-600' },
  case_study: { label: 'Case Study', badgeBg: 'bg-amber-50 border-amber-200', badgeText: 'text-amber-700', iconBg: 'bg-amber-600' },
  article: { label: 'Article / Dispatch', badgeBg: 'bg-purple-50 border-purple-200', badgeText: 'text-purple-700', iconBg: 'bg-purple-600' }
};

const CATEGORIES: ResourceCategory[] = [
  'Climate & Commons',
  'Peace & Disarmament',
  'AI & Tech Ethics',
  'Historical Healing',
  'Economic Justice',
  'Water & Agriculture',
  'Global Governance'
];

export const ResourceLibrary: React.FC<ResourceLibraryProps> = ({
  circle,
  isJoined = true,
  onJoinCircle,
  onShowToast,
  isModalView = false
}) => {
  // Load resources from localStorage or initialize with seed data
  const [resources, setResources] = useState<CircleResource[]>(() => {
    const saved = localStorage.getItem('shared_future_resource_library');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_RESOURCES;
  });

  const saveResources = (updated: CircleResource[]) => {
    setResources(updated);
    localStorage.setItem('shared_future_resource_library', JSON.stringify(updated));
  };

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [circleFilterMode, setCircleFilterMode] = useState<'this_circle' | 'all'>(circle ? 'this_circle' : 'all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'downloads' | 'bookmarks' | 'alpha'>('recent');

  // Modal / Preview / Upload states
  const [previewResource, setPreviewResource] = useState<CircleResource | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadAuthor, setUploadAuthor] = useState('');
  const [uploadOrganization, setUploadOrganization] = useState('');
  const [uploadFormat, setUploadFormat] = useState<ResourceFormat>('pdf');
  const [uploadCategory, setUploadCategory] = useState<ResourceCategory>('Climate & Commons');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadAbstract, setUploadAbstract] = useState('');
  const [uploadKeyTakeaways, setUploadKeyTakeaways] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadPageCount, setUploadPageCount] = useState<number>(18);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // Handle bookmark toggle
  const handleToggleBookmark = (resourceId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = resources.map(r => {
      if (r.id === resourceId) {
        const nextState = !r.isBookmarked;
        return {
          ...r,
          isBookmarked: nextState,
          bookmarksCount: nextState ? r.bookmarksCount + 1 : Math.max(0, r.bookmarksCount - 1)
        };
      }
      return r;
    });
    saveResources(updated);

    const target = updated.find(r => r.id === resourceId);
    if (target && onShowToast) {
      onShowToast({
        type: 'resource_bookmark',
        title: target.isBookmarked ? 'Saved to Bookmarks' : 'Removed from Bookmarks',
        message: target.isBookmarked ? `"${target.title}" added to your saved reading list.` : `"${target.title}" removed from saved list.`,
        circleName: circle?.name || target.circleName
      });
    }
  };

  // Handle resource download
  const handleDownloadResource = (resource: CircleResource, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Increment download count
    const updated = resources.map(r => {
      if (r.id === resource.id) {
        return { ...r, downloadsCount: r.downloadsCount + 1 };
      }
      return r;
    });
    saveResources(updated);

    // Generate downloadable text representation of the research paper
    const fileContent = `================================================================================
THE SHARED FUTURE PROJECT · CIRCLE RESOURCE LIBRARY
================================================================================
TITLE: ${resource.title}
AUTHOR(S): ${resource.author}
ORGANIZATION: ${resource.organization || 'Independent Research'}
YEAR: ${resource.publishedYear}
FORMAT: ${resource.format.toUpperCase()} (${resource.fileSize || 'Standard Document'})
CATEGORY: ${resource.category}
CIRCLE: ${resource.circleName || 'Global Commons'}
================================================================================

ABSTRACT & CONTEXT:
${resource.abstract || resource.description}

KEY TAKEAWAYS & FINDINGS:
${resource.keyTakeaways.map((t, idx) => `${idx + 1}. ${t}`).join('\n')}

TAGS & INDEX TERMS:
${resource.tags.join(', ')}

--------------------------------------------------------------------------------
DOCUMENT CONTENT PREVIEW:
--------------------------------------------------------------------------------
${resource.contentPreview || resource.description}

================================================================================
Uploaded to The Shared Future Project by: ${resource.uploadedBy} on ${resource.uploadedAt}.
Chatham House Rule Dialogue Material · Shared under Creative Commons Attribution.
================================================================================
`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Research.txt`;
    link.click();
    URL.revokeObjectURL(url);

    if (onShowToast) {
      onShowToast({
        type: 'calendar_export',
        title: 'Document Downloaded',
        message: `Saved "${resource.title}" (${resource.fileSize || 'Research Paper'}).`,
        circleName: circle?.name || resource.circleName
      });
    }
  };

  // Handle Share link
  const handleShareResource = (resource: CircleResource, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const citation = `"${resource.title}" by ${resource.author} (${resource.publishedYear}) — Shared Future Dialogue Circle Research: https://sharedfuture.org/resources/${resource.id}`;
    navigator.clipboard.writeText(citation);

    if (onShowToast) {
      onShowToast({
        type: 'info',
        title: 'Resource Citation Copied',
        message: 'Citation and document details copied to clipboard.',
        circleName: circle?.name || resource.circleName
      });
    }
  };

  // Handle File Input or Drop
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setUploadFile(file);
    if (!uploadTitle) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setUploadTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
    if (file.name.toLowerCase().endsWith('.pdf')) {
      setUploadFormat('pdf');
    } else if (file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx')) {
      setUploadFormat('policy_brief');
    }
  };

  // Submit Upload Form
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const takeawaysArray = uploadKeyTakeaways
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const tagsArray = uploadTags
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const computedSize = uploadFile 
      ? `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB ${uploadFormat.toUpperCase()}`
      : `2.4 MB ${uploadFormat.toUpperCase()}`;

    const newResource: CircleResource = {
      id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: uploadTitle.trim(),
      author: uploadAuthor.trim() || 'You (Circle Member)',
      organization: uploadOrganization.trim() || circle?.name || 'Shared Future Working Group',
      format: uploadFormat,
      category: uploadCategory,
      circleId: circle ? circle.id : 'global',
      circleName: circle ? circle.name : 'Global Commons Library',
      description: uploadDescription.trim() || 'Research paper uploaded by verified circle member for collaborative study.',
      abstract: uploadAbstract.trim() || uploadDescription.trim() || 'No extended abstract provided.',
      keyTakeaways: takeawaysArray.length ? takeawaysArray : [
        'Promotes positive-sum cooperative policy design.',
        'Provides empirical grounding for community dialogue.',
        'Actionable recommendations for regional stakeholders.'
      ],
      fileSize: computedSize,
      pageCount: uploadPageCount || 20,
      publishedYear: new Date().getFullYear().toString(),
      uploadedBy: uploadAuthor.trim() || 'You (Circle Member)',
      uploadedAt: 'Just now',
      downloadsCount: 1,
      bookmarksCount: 1,
      isBookmarked: true,
      isMemberOnly: false,
      tags: tagsArray.length ? tagsArray : ['Shared Future', 'Community Dialogue', uploadCategory],
      contentPreview: `EXECUTIVE SUMMARY: ${uploadTitle.trim().toUpperCase()}
Author: ${uploadAuthor.trim() || 'Circle Member'}
Affiliation: ${uploadOrganization.trim() || circle?.name || 'Dialogue Circles Network'}

${uploadAbstract.trim() || uploadDescription.trim()}

MAIN FINDINGS:
${takeawaysArray.map((t, idx) => `Point ${idx + 1}: ${t}`).join('\n')}
`
    };

    const updated = [newResource, ...resources];
    saveResources(updated);

    // Reset Form
    setIsUploadModalOpen(false);
    setUploadTitle('');
    setUploadAuthor('');
    setUploadOrganization('');
    setUploadDescription('');
    setUploadAbstract('');
    setUploadKeyTakeaways('');
    setUploadTags('');
    setUploadFile(null);

    if (onShowToast) {
      onShowToast({
        type: 'resource_upload',
        title: 'Resource Shared with Circle!',
        message: `"${newResource.title}" is now available in the Resource Library.`,
        circleName: circle?.name || newResource.circleName
      });
    }

    // Automatically preview newly added item
    setPreviewResource(newResource);
  };

  // Filter and sort items
  const filteredResources = resources.filter(res => {
    // Circle filter
    if (circle && circleFilterMode === 'this_circle') {
      if (res.circleId !== circle.id && res.circleId !== 'global') {
        return false;
      }
    }

    // Format filter
    if (selectedFormat !== 'all' && res.format !== selectedFormat) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && res.category !== selectedCategory) {
      return false;
    }

    // Bookmarks only
    if (onlyBookmarked && !res.isBookmarked) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchAuthor = res.author.toLowerCase().includes(q);
      const matchOrg = res.organization?.toLowerCase().includes(q);
      const matchDesc = res.description.toLowerCase().includes(q);
      const matchTags = res.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchAuthor || matchOrg || matchDesc || matchTags;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'downloads') return b.downloadsCount - a.downloadsCount;
    if (sortBy === 'bookmarks') return b.bookmarksCount - a.bookmarksCount;
    if (sortBy === 'alpha') return a.title.localeCompare(b.title);
    return 0; // default recent
  });

  const totalDownloads = resources.reduce((acc, r) => acc + r.downloadsCount, 0);
  const myBookmarksCount = resources.filter(r => r.isBookmarked).length;

  return (
    <div className={`space-y-6 text-gray-800 ${isModalView ? '' : 'py-8'}`}>
      
      {/* 1. Header Banner & Stats Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0A2463] via-[#1E6091] to-[#0A2463] text-white shadow-md border border-blue-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/15 text-[#A8DADC] border border-white/20 flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-[#D4A017]" />
                  Knowledge &amp; Research Commons
                </span>
                {circle && (
                  <span className="text-xs text-blue-200">
                    Scoped to <strong>{circle.name}</strong>
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Circle Resource Library
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
                Shared PDFs, peer-reviewed articles, model treaties, and grassroots field guides collaboratively curated by dialogue members.
              </p>
            </div>

            {/* Action button */}
            <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
              <button
                onClick={() => {
                  if (!isJoined && onJoinCircle) {
                    onJoinCircle();
                    return;
                  }
                  setIsUploadModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#D4A017] hover:bg-[#b8890f] text-black font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Upload className="w-4 h-4 text-black" />
                <span>Upload Material</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-5 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
              <span className="text-[10px] text-blue-200 block uppercase font-bold">Total Materials</span>
              <span className="text-lg font-bold text-white mt-0.5 block">{resources.length} Docs &amp; Papers</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
              <span className="text-[10px] text-blue-200 block uppercase font-bold">Total Downloads</span>
              <span className="text-lg font-bold text-[#A8DADC] mt-0.5 block">{totalDownloads.toLocaleString()} Studies</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
              <span className="text-[10px] text-blue-200 block uppercase font-bold">My Saved Reading List</span>
              <span className="text-lg font-bold text-[#D4A017] mt-0.5 block">{myBookmarksCount} Bookmarked</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
              <span className="text-[10px] text-blue-200 block uppercase font-bold">Access License</span>
              <span className="text-lg font-bold text-emerald-300 mt-0.5 block">Open Commons CC-BY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Non-Member Banner (if circle scoped and user not joined) */}
      {!isJoined && circle && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-xs text-amber-900">
                You are viewing public materials in read-only mode
              </h5>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Join <strong>{circle.name}</strong> to upload PDFs, share research articles, and access circle-exclusive field notes.
              </p>
            </div>
          </div>
          {onJoinCircle && (
            <button
              onClick={onJoinCircle}
              className="px-4 py-2 bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all shrink-0 active:scale-95"
            >
              <Check className="w-3.5 h-3.5 text-[#D4A017]" />
              Join Circle to Share Materials
            </button>
          )}
        </div>
      )}

      {/* 2. Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by paper title, author, keyword, or tag (e.g. water, AI, satellite, Amazon)..."
              className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2463] bg-gray-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Scope & Bookmarks Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {circle && (
              <div className="inline-flex bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setCircleFilterMode('this_circle')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    circleFilterMode === 'this_circle'
                      ? 'bg-[#0A2463] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  This Circle Only
                </button>
                <button
                  onClick={() => setCircleFilterMode('all')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    circleFilterMode === 'all'
                      ? 'bg-[#0A2463] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Global Library
                </button>
              </div>
            )}

            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                onlyBookmarked
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'text-amber-700 fill-amber-700' : 'text-gray-400'}`} />
              <span>Saved ({myBookmarksCount})</span>
            </button>

            {/* Sort Menu */}
            <div className="flex items-center gap-1 text-xs text-gray-500 border-l border-gray-200 pl-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-medium text-gray-700 bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                <option value="recent">Recently Added</option>
                <option value="downloads">Most Downloaded</option>
                <option value="bookmarks">Most Saved</option>
                <option value="alpha">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category & Format Chips */}
        <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 text-xs">
            <span className="font-bold text-gray-400 uppercase text-[10px] shrink-0 mr-1">Topic:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#0A2463] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Topics
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0A2463] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Format Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <span className="font-bold text-gray-400 uppercase text-[10px] shrink-0 mr-1">Format:</span>
            <button
              onClick={() => setSelectedFormat('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold shrink-0 transition-colors ${
                selectedFormat === 'all'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Formats
            </button>
            {(Object.keys(FORMAT_CONFIG) as ResourceFormat[]).map(fmt => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold shrink-0 transition-colors ${
                  selectedFormat === fmt
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {FORMAT_CONFIG[fmt].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Materials List / Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Showing <strong>{filteredResources.length}</strong> of {resources.length} resources</span>
          {(selectedCategory !== 'all' || selectedFormat !== 'all' || searchQuery || onlyBookmarked) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFormat('all');
                setSearchQuery('');
                setOnlyBookmarked(false);
              }}
              className="text-[#0A2463] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredResources.length === 0 ? (
          <div className="p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-500">
            <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <h5 className="font-bold text-gray-800 text-sm">No materials match your filter criteria</h5>
            <p className="text-xs mt-1 max-w-sm mx-auto">
              Try adjusting your search query, selecting &quot;All Topics&quot;, or uploading a new research paper.
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-4 px-4 py-2 bg-[#0A2463] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Upload Document</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => {
              const formatConfig = FORMAT_CONFIG[resource.format] || FORMAT_CONFIG.pdf;

              return (
                <div
                  key={resource.id}
                  className="bg-white border border-gray-200 hover:border-blue-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Format, Category & Bookmark Button */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${formatConfig.badgeBg} ${formatConfig.badgeText}`}>
                          {formatConfig.label}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700">
                          {resource.category}
                        </span>
                        {resource.circleName && (
                          <span className="text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                            {resource.circleName}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleToggleBookmark(resource.id, e)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          resource.isBookmarked
                            ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                            : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                        title={resource.isBookmarked ? 'Remove bookmark' : 'Bookmark this research'}
                      >
                        <Bookmark className={`w-4 h-4 ${resource.isBookmarked ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Title */}
                    <h4
                      onClick={() => setPreviewResource(resource)}
                      className="font-serif font-bold text-base text-[#0A2463] group-hover:text-blue-700 cursor-pointer transition-colors leading-snug"
                    >
                      {resource.title}
                    </h4>

                    {/* Authors & Year */}
                    <div className="text-xs text-gray-500 mt-1 flex flex-wrap items-center gap-1.5 font-medium">
                      <span>By <strong>{resource.author}</strong></span>
                      {resource.organization && (
                        <>
                          <span>•</span>
                          <span className="truncate max-w-[220px]">{resource.organization}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{resource.publishedYear}</span>
                    </div>

                    {/* Abstract snippet */}
                    <p className="text-xs text-gray-600 mt-2.5 leading-relaxed line-clamp-3 font-normal">
                      {resource.description}
                    </p>

                    {/* Key takeaways pills */}
                    {resource.keyTakeaways && resource.keyTakeaways.length > 0 && (
                      <div className="mt-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                          Key Insight / Finding:
                        </span>
                        <p className="text-[11px] text-gray-700 font-medium line-clamp-2">
                          &quot;{resource.keyTakeaways[0]}&quot;
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1 mt-3">
                      {resource.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div className="text-[11px] text-gray-400 flex items-center gap-2">
                      <span>{resource.fileSize || 'PDF'}</span>
                      <span>•</span>
                      <span>{resource.downloadsCount} downloads</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setPreviewResource(resource)}
                        className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold flex items-center gap-1 text-xs transition-colors"
                        title="Read document abstract & takeaways"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={(e) => handleDownloadResource(resource, e)}
                        className="px-3 py-1.5 rounded-lg bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold flex items-center gap-1 text-xs transition-all shadow-2xs active:scale-95"
                        title="Download paper file"
                      >
                        <Download className="w-3.5 h-3.5 text-[#D4A017]" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Document Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden font-sans">
            
            {/* Modal Header */}
            <div className="bg-[#0A2463] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-[#A8DADC] border border-white/20">
                    {FORMAT_CONFIG[previewResource.format]?.label || 'Research Paper'}
                  </span>
                  <span className="text-xs text-blue-200">
                    {previewResource.category}
                  </span>
                  {previewResource.fileSize && (
                    <span className="text-xs text-white/70">
                      • {previewResource.fileSize} ({previewResource.pageCount || 24} pages)
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                  {previewResource.title}
                </h3>
                <p className="text-xs text-blue-200 mt-1">
                  By {previewResource.author} • {previewResource.organization} ({previewResource.publishedYear})
                </p>
              </div>

              <button
                onClick={() => setPreviewResource(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs text-gray-700 leading-relaxed bg-white">
              
              {/* Executive Abstract */}
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#0A2463] mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#0A2463]" />
                  Executive Abstract &amp; Background
                </h5>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-xs leading-relaxed space-y-2">
                  <p>{previewResource.abstract || previewResource.description}</p>
                </div>
              </div>

              {/* Key Takeaways */}
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Key Research Findings &amp; Core Recommendations
                </h5>
                <div className="grid grid-cols-1 gap-2">
                  {previewResource.keyTakeaways.map((takeaway, i) => (
                    <div key={i} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-emerald-950 font-medium">
                        {takeaway}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Excerpt / Content Preview */}
              {previewResource.contentPreview && (
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-700" />
                    Document Excerpt &amp; Field Notes
                  </h5>
                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800">
                    {previewResource.contentPreview}
                  </pre>
                </div>
              )}

              {/* Metadata strip */}
              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                <div>
                  <span className="text-gray-500 block">Uploaded By:</span>
                  <span className="font-semibold text-gray-900">{previewResource.uploadedBy}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Upload Date:</span>
                  <span className="font-semibold text-gray-900">{previewResource.uploadedAt}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Total Downloads:</span>
                  <span className="font-semibold text-gray-900">{previewResource.downloadsCount}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Affiliated Circle:</span>
                  <span className="font-semibold text-gray-900">{previewResource.circleName || 'Global'}</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleBookmark(previewResource.id)}
                  className={`px-3 py-2 rounded-xl font-semibold flex items-center gap-1.5 text-xs transition-colors border ${
                    previewResource.isBookmarked
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${previewResource.isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                  <span>{previewResource.isBookmarked ? 'Bookmarked' : 'Save Bookmark'}</span>
                </button>

                <button
                  onClick={() => handleShareResource(previewResource)}
                  className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 flex items-center gap-1.5 text-xs transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-gray-500" />
                  <span>Copy Citation</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewResource(null)}
                  className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadResource(previewResource)}
                  className="px-4 py-2 rounded-xl bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4A017]" />
                  <span>Download Full Document</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. Upload Material Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden font-sans">
            
            {/* Header */}
            <div className="bg-[#0A2463] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D4A017]/20 flex items-center justify-center text-[#D4A017]">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Upload Material to Circle Library
                  </h4>
                  <p className="text-[11px] text-blue-200">
                    Share research, PDFs, policy briefs, or field guides with {circle ? circle.name : 'the community'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-white/70 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUploadSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
              
              {/* File Dropzone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
                onDragLeave={() => setIsDraggingFile(false)}
                onDrop={handleFileDrop}
                className={`p-5 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
                  isDraggingFile
                    ? 'border-blue-500 bg-blue-50'
                    : uploadFile
                    ? 'border-emerald-400 bg-emerald-50/50'
                    : 'border-gray-300 hover:border-[#0A2463] bg-gray-50'
                }`}
                onClick={() => document.getElementById('resource-file-input')?.click()}
              >
                <input
                  id="resource-file-input"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                {uploadFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div className="text-left">
                      <span className="font-bold text-gray-900 block text-sm">{uploadFile.name}</span>
                      <span className="text-[11px] text-emerald-700">
                        {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to attach
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-1.5" />
                    <p className="font-bold text-gray-800 text-xs">
                      Drop your PDF, Word, or Markdown document here, or <span className="text-[#0A2463] underline">browse files</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Supported: .pdf, .docx, .txt, .md (Max 50MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-gray-700 block mb-1">
                    Document Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Grassroots Aquifer Sharing Protocol & Telemetry Blueprint"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-medium focus:ring-2 focus:ring-[#0A2463]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Format Type
                  </label>
                  <select
                    value={uploadFormat}
                    onChange={(e) => setUploadFormat(e.target.value as ResourceFormat)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-medium focus:ring-2 focus:ring-[#0A2463]"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="research_paper">Academic Research Paper</option>
                    <option value="policy_brief">Policy Brief &amp; Accord</option>
                    <option value="field_guide">Field Guide &amp; Playbook</option>
                    <option value="case_study">Case Study</option>
                    <option value="article">Article / Dispatch</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Thematic Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as ResourceCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-medium focus:ring-2 focus:ring-[#0A2463]"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Primary Author(s)
                  </label>
                  <input
                    type="text"
                    value={uploadAuthor}
                    onChange={(e) => setUploadAuthor(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe, Elder David"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-medium focus:ring-2 focus:ring-[#0A2463]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Organization / University
                  </label>
                  <input
                    type="text"
                    value={uploadOrganization}
                    onChange={(e) => setUploadOrganization(e.target.value)}
                    placeholder="e.g. Institute of Development Studies"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-medium focus:ring-2 focus:ring-[#0A2463]"
                  />
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Executive Summary / Description
                </label>
                <textarea
                  rows={3}
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="Provide a concise 2-3 sentence overview of this material and how it serves dialogue members..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A2463]"
                />
              </div>

              {/* Key Takeaways */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Key Takeaways (1 per line)
                </label>
                <textarea
                  rows={2}
                  value={uploadKeyTakeaways}
                  onChange={(e) => setUploadKeyTakeaways(e.target.value)}
                  placeholder="Takeaway 1: Telemetry prevents 70% of groundwater disputes.&#10;Takeaway 2: Bilateral council model can be replicated in ASAL regions."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A2463]"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  placeholder="Water Rights, Solar, Mediation, East Africa"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 font-medium focus:ring-2 focus:ring-[#0A2463]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!uploadTitle.trim()}
                  className="px-5 py-2.5 bg-[#0A2463] hover:bg-[#1E6091] disabled:opacity-40 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Check className="w-4 h-4 text-[#D4A017]" />
                  <span>Publish to Resource Library</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
