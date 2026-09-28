import React, { useEffect } from 'react';
import { CircleToastNotification } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Archive, 
  Info, 
  X,
  Lightbulb,
  CalendarCheck,
  ThumbsUp,
  Coffee,
  Sparkles,
  UserCheck,
  Film,
  Radio
} from 'lucide-react';

interface NotificationToastProps {
  toasts: CircleToastNotification[];
  onDismiss: (id: string) => void;
}

export const NotificationToastContainer: React.FC<NotificationToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{
  toast: CircleToastNotification;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'join':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'meeting_update':
        return <Clock className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'calendar_export':
        return <Calendar className="w-5 h-5 text-blue-500 shrink-0" />;
      case 'chat':
        return <MessageSquare className="w-5 h-5 text-indigo-500 shrink-0" />;
      case 'archive':
        return <Archive className="w-5 h-5 text-purple-500 shrink-0" />;
      case 'agenda_suggest':
        return <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'agenda_update':
        return <CalendarCheck className="w-5 h-5 text-blue-600 shrink-0" />;
      case 'coffee_match':
        return <Coffee className="w-5 h-5 text-amber-700 shrink-0" />;
      case 'profile_update':
        return <UserCheck className="w-5 h-5 text-blue-600 shrink-0" />;
      case 'icebreaker_generated':
        return <Sparkles className="w-5 h-5 text-[#D4A017] shrink-0" />;
      case 'recording_started':
        return <Radio className="w-5 h-5 text-rose-500 animate-pulse shrink-0" />;
      case 'recording_saved':
        return <Film className="w-5 h-5 text-[#0A2463] shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'join':
        return 'border-emerald-200 bg-emerald-50/95';
      case 'meeting_update':
        return 'border-amber-200 bg-amber-50/95';
      case 'calendar_export':
        return 'border-blue-200 bg-blue-50/95';
      case 'chat':
        return 'border-indigo-200 bg-indigo-50/95';
      case 'archive':
        return 'border-purple-200 bg-purple-50/95';
      case 'agenda_suggest':
        return 'border-amber-300 bg-amber-50/95 ring-1 ring-amber-400/30';
      case 'agenda_update':
        return 'border-blue-300 bg-blue-50/95 ring-1 ring-blue-400/30';
      case 'coffee_match':
        return 'border-amber-300 bg-amber-50/95 ring-2 ring-amber-400/40';
      case 'profile_update':
        return 'border-blue-300 bg-blue-50/95 ring-1 ring-blue-400/30';
      case 'icebreaker_generated':
        return 'border-yellow-300 bg-amber-50/95 ring-2 ring-yellow-400/50';
      case 'recording_started':
        return 'border-rose-300 bg-rose-50/95 ring-2 ring-rose-400/50';
      case 'recording_saved':
        return 'border-blue-300 bg-blue-50/95 ring-2 ring-blue-400/50';
      default:
        return 'border-gray-200 bg-white/95';
    }
  };

  return (
    <div
      role="alert"
      className={`pointer-events-auto p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 animate-in slide-in-from-bottom-3 flex items-start gap-3 text-xs font-sans ${getBorderColor()}`}
    >
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <h5 className="font-bold text-gray-900 truncate">{toast.title}</h5>
          <span className="text-[10px] text-gray-400 shrink-0">{toast.timestamp}</span>
        </div>
        <p className="text-gray-700 leading-relaxed">{toast.message}</p>
        {toast.circleName && (
          <div className="mt-1 text-[10px] font-semibold text-gray-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span>{toast.circleName}</span>
          </div>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-gray-400 hover:text-gray-700 p-0.5 rounded transition-colors shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
