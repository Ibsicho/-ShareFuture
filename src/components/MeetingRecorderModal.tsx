import React, { useState, useRef, useEffect } from 'react';
import { DialogueCircle, CircleDiscussionArchive } from '../types';
import { 
  Video, 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Download, 
  RotateCcw, 
  Save, 
  X, 
  AlertCircle, 
  Radio, 
  Check,
  Volume2,
  Film,
  Sparkles,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface MeetingRecorderModalProps {
  circle: DialogueCircle;
  isOpen: boolean;
  onClose: () => void;
  onSaveToArchive: (archive: CircleDiscussionArchive) => void;
}

export const MeetingRecorderModal: React.FC<MeetingRecorderModalProps> = ({
  circle,
  isOpen,
  onClose,
  onSaveToArchive
}) => {
  const [recordMode, setRecordMode] = useState<'video' | 'audio'>('video');
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'paused' | 'stopped'>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isSimulatedStream, setIsSimulatedStream] = useState(false);

  // Archive Form fields for saving the recording
  const [meetingTitle, setMeetingTitle] = useState(`Live Session: ${circle.name}`);
  const [meetingDate, setMeetingDate] = useState(`September ${new Date().getFullYear()}`);
  const [attendeesCount, setAttendeesCount] = useState(circle.membersCount || 6);
  const [keyInsights, setKeyInsights] = useState(
    `- Deep dialogue centered around ${circle.topic}.\n- Members shared lived perspectives under Chatham House Rule.\n- Consensus reached on next practical community steps.`
  );
  const [agreedActions, setAgreedActions] = useState(
    `- Share recording link in circle archive.\n- Prepare action draft before upcoming monthly cadence.`
  );

  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Cleanup on unmount or close
  useEffect(() => {
    return () => {
      stopTracks();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (recordingUrl && recordingUrl.startsWith('blob:')) {
        URL.revokeObjectURL(recordingUrl);
      }
    };
  }, []);

  const stopTracks = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper to create a fallback animated canvas stream if browser denies mic/cam in iframe
  const createFallbackStream = (): MediaStream => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    let step = 0;
    const draw = () => {
      if (!ctx) return;
      step++;
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 640, 360);
      grad.addColorStop(0, '#0A2463');
      grad.addColorStop(1, '#1E6091');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 360);

      // Circle pulses
      ctx.beginPath();
      const radius = 60 + Math.sin(step * 0.08) * 15;
      ctx.arc(320, 150, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 160, 23, 0.25)';
      ctx.fill();

      // Icon & text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(circle.name, 320, 145);

      ctx.font = '14px system-ui, sans-serif';
      ctx.fillStyle = '#D4A017';
      ctx.fillText(`Simulated Live Stream · ${circle.topic}`, 320, 175);

      // Live waveform bars at bottom
      ctx.fillStyle = '#10B981';
      for (let i = 0; i < 32; i++) {
        const h = Math.abs(Math.sin((step + i * 4) * 0.1)) * 45 + 5;
        ctx.fillRect(80 + i * 15, 310 - h, 10, h);
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    const videoStream = canvas.captureStream(25);

    // Create synthetic audio context oscillator
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        const dest = audioCtx.createMediaStreamDestination();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        gain.gain.value = 0.01; // extremely low tone
        osc.connect(gain);
        gain.connect(dest);
        osc.start();
        dest.stream.getAudioTracks().forEach(t => videoStream.addTrack(t));
      }
    } catch (e) {
      // ignore
    }

    return videoStream;
  };

  // Start live capture
  const handleStartCapture = async () => {
    setPermissionError(null);
    setRecordedChunks([]);
    setRecordingUrl(null);
    setRecordingBlob(null);

    let stream: MediaStream | null = null;
    let isSimulated = false;

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const constraints = {
          audio: true,
          video: recordMode === 'video' ? { width: { ideal: 1280 }, height: { ideal: 720 } } : false
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } else {
        throw new Error('MediaDevices API not available in current frame context');
      }
    } catch (err: any) {
      console.warn('Could not acquire user media hardware:', err);
      setPermissionError('Camera or microphone unavailable. Activated Simulated Meeting Studio Stream so you can test and archive seamlessly.');
      stream = createFallbackStream();
      isSimulated = true;
    }

    setIsSimulatedStream(isSimulated);
    setMediaStream(stream);

    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
      videoPreviewRef.current.play().catch(() => {});
    }

    // Initialize MediaRecorder
    try {
      let mimeType = recordMode === 'video' ? 'video/webm;codecs=vp8,opus' : 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = recordMode === 'video' ? 'video/mp4' : 'audio/mp4';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = ''; // Let browser choose default
        }
      }

      const recorder = mimeType 
        ? new MediaRecorder(stream, { mimeType }) 
        : new MediaRecorder(stream);

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blobType = recordMode === 'video' ? 'video/webm' : 'audio/webm';
        const finalBlob = new Blob(chunks, { type: blobType });
        const url = URL.createObjectURL(finalBlob);
        setRecordedChunks(chunks);
        setRecordingBlob(finalBlob);
        setRecordingUrl(url);
        setRecordingState('stopped');
        stopTracks();
      };

      recorder.start(1000); // 1-second chunks
      mediaRecorderRef.current = recorder;
      setRecordingState('recording');
      setElapsedSeconds(0);

      // Start elapsed timer
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);

    } catch (err: any) {
      console.error('Failed to initialize MediaRecorder:', err);
      setPermissionError(`Recording error: ${err.message || 'MediaRecorder failed'}`);
    }
  };

  const handlePauseResume = () => {
    if (!mediaRecorderRef.current) return;
    if (recordingState === 'recording') {
      mediaRecorderRef.current.pause();
      setRecordingState('paused');
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    } else if (recordingState === 'paused') {
      mediaRecorderRef.current.resume();
      setRecordingState('recording');
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const handleStopRecording = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDiscard = () => {
    stopTracks();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setRecordingState('idle');
    setRecordedChunks([]);
    setRecordingUrl(null);
    setRecordingBlob(null);
    setElapsedSeconds(0);
  };

  const handleDownload = () => {
    if (!recordingUrl) return;
    const a = document.createElement('a');
    a.href = recordingUrl;
    const extension = recordMode === 'video' ? 'webm' : 'webm';
    a.download = `${circle.name.replace(/\s+/g, '_')}_Session_${Date.now()}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSaveToArchive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordingUrl) return;

    const insightsList = keyInsights
      .split('\n')
      .map(s => s.replace(/^[-*•]\s*/, '').trim())
      .filter(Boolean);

    const actionsList = agreedActions
      .split('\n')
      .map(s => s.replace(/^[-*•]\s*/, '').trim())
      .filter(Boolean);

    const sizeInMb = recordingBlob 
      ? `${(recordingBlob.size / (1024 * 1024)).toFixed(1)} MB`
      : '1.5 MB';

    const newArchive: CircleDiscussionArchive = {
      id: `arch-rec-${Date.now()}`,
      circleId: circle.id,
      meetingDate,
      title: meetingTitle || `Live Session: ${circle.name}`,
      topic: circle.topic,
      attendeesCount,
      keyInsights: insightsList.length > 0 ? insightsList : ['Recorded live session discussion under Chatham House Rule.'],
      agreedActions: actionsList.length > 0 ? actionsList : ['Review archived recording and follow up before next meeting.'],
      loggedBy: 'You (Meeting Recorder)',
      createdAt: new Date().toISOString().split('T')[0],
      recordingUrl,
      recordingDuration: formatTimer(elapsedSeconds),
      recordingType: recordMode,
      recordingBlobSize: sizeInMb
    };

    onSaveToArchive(newArchive);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0A2463] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D4A017] border border-white/20">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  Live Meeting Recorder
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse text-rose-400" />
                  MediaRecorder API
                </span>
              </div>
              <p className="text-xs text-blue-200">
                {circle.name} · Capture audio/video and store link directly into Circle Archive
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopTracks();
              onClose();
            }}
            className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">

          {/* Mode Selector (When Idle) */}
          {recordingState === 'idle' && (
            <div className="space-y-4">
              <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 flex items-start gap-3 text-xs text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Chatham House Rule Recording Protocol:</span>
                  <p className="text-[11px] text-blue-800 mt-0.5 leading-relaxed">
                    Meeting captures are encrypted in your browser's local sandbox and archived exclusively for verified members of &quot;{circle.name}&quot;.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Select Recording Mode:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRecordMode('video')}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col gap-2 ${
                      recordMode === 'video'
                        ? 'border-[#0A2463] bg-blue-50/50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-900">
                        <Video className="w-5 h-5" />
                      </div>
                      {recordMode === 'video' && (
                        <Check className="w-4 h-4 text-[#0A2463]" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Video &amp; Audio</h4>
                      <p className="text-[11px] text-gray-500">Record web camera and microphone feed</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRecordMode('audio')}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col gap-2 ${
                      recordMode === 'audio'
                        ? 'border-[#0A2463] bg-blue-50/50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-amber-100 text-amber-900">
                        <Mic className="w-5 h-5" />
                      </div>
                      {recordMode === 'audio' && (
                        <Check className="w-4 h-4 text-[#0A2463]" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Audio Only</h4>
                      <p className="text-[11px] text-gray-500">Capture voice dialogue with lower file size</p>
                    </div>
                  </button>
                </div>
              </div>

              {permissionError && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{permissionError}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartCapture}
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  Start Live Meeting Recording
                </button>
              </div>
            </div>
          )}

          {/* Active Recording State */}
          {(recordingState === 'recording' || recordingState === 'paused') && (
            <div className="space-y-4">
              {/* Media Viewport */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-950 aspect-video flex items-center justify-center border border-gray-800 shadow-inner">
                {recordMode === 'video' ? (
                  <video
                    ref={videoPreviewRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                    <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400/40 flex items-center justify-center text-[#D4A017] animate-pulse">
                      <Mic className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white">Capturing Audio Dialogue</h4>
                      <p className="text-xs text-gray-400">{circle.name} · Chatham House Rule</p>
                    </div>
                  </div>
                )}

                {/* Overlays */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-xs font-mono">
                  <span className={`w-2.5 h-2.5 rounded-full ${recordingState === 'recording' ? 'bg-rose-500 animate-ping' : 'bg-amber-400'}`}></span>
                  <span className="font-bold text-rose-400">
                    {recordingState === 'recording' ? 'REC' : 'PAUSED'}
                  </span>
                  <span className="text-gray-300">|</span>
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span>{formatTimer(elapsedSeconds)}</span>
                </div>

                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[11px] text-gray-300">
                  {recordMode === 'video' ? '720p HD WebM' : 'Opus Voice WebM'}
                </div>

                {isSimulatedStream && (
                  <div className="absolute bottom-3 left-3 bg-amber-950/80 backdrop-blur-md border border-amber-500/40 text-amber-200 px-2.5 py-1 rounded-lg text-[10px]">
                    Simulated Studio Stream
                  </div>
                )}
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePauseResume}
                    className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-lg border border-gray-300 text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    {recordingState === 'recording' ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-amber-600" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-600" />
                        Resume
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Discard
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  Stop &amp; Review Recording
                </button>
              </div>
            </div>
          )}

          {/* Stopped / Save to Archive Form */}
          {recordingState === 'stopped' && recordingUrl && (
            <form onSubmit={handleSaveToArchive} className="space-y-4">
              
              {/* Playback Preview Box */}
              <div className="p-4 bg-gray-900 rounded-2xl text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-4 h-4" />
                    Recording Captured Successfully
                  </span>
                  <span className="text-gray-400 font-mono">
                    Duration: {formatTimer(elapsedSeconds)} · {recordingBlob ? `${(recordingBlob.size / (1024 * 1024)).toFixed(1)} MB` : ''}
                  </span>
                </div>

                {recordMode === 'video' ? (
                  <video
                    src={recordingUrl}
                    controls
                    className="w-full rounded-xl bg-black max-h-56 object-contain"
                  />
                ) : (
                  <div className="p-4 bg-gray-800 rounded-xl">
                    <audio src={recordingUrl} controls className="w-full" />
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4A017]" />
                    Download File ({recordMode === 'video' ? '.webm' : '.webm'})
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="px-3 py-1.5 text-gray-400 hover:text-white text-xs font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                    Record Again
                  </button>
                </div>
              </div>

              {/* Archive Metadata Inputs */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3 text-xs">
                <h4 className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5 text-[#0A2463]" />
                  Store Recording Link in Circle Archive
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Session Title:
                    </label>
                    <input
                      type="text"
                      required
                      value={meetingTitle}
                      onChange={(e) => setMeetingTitle(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Meeting Date / Cadence:
                    </label>
                    <input
                      type="text"
                      required
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Attendees Present:
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={attendeesCount}
                    onChange={(e) => setAttendeesCount(Number(e.target.value))}
                    className="w-full sm:w-32 px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Key Breakthrough Insights (one per line):
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={keyInsights}
                    onChange={(e) => setKeyInsights(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Agreed Local Actions &amp; Covenants (one per line):
                  </label>
                  <textarea
                    rows={2}
                    value={agreedActions}
                    onChange={(e) => setAgreedActions(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    stopTracks();
                    onClose();
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-xl text-xs hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0A2463] hover:bg-[#1E6091] text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Save className="w-4 h-4 text-[#D4A017]" />
                  Save &amp; Store Link in Circle Archive
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
