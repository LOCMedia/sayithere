import { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, Square, Play, Pause, Trash2, RotateCcw } from 'lucide-react';

type RecordingState = 'idle' | 'recording' | 'review';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  onClear: () => void;
  maxDurationSeconds?: number;
}

const VoiceRecorder = ({ 
  onRecordingComplete, 
  onClear,
  maxDurationSeconds = 300 // 5 minutes default
}: VoiceRecorderProps) => {
  const [state, setState] = useState<RecordingState>('idle');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioUrl]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setState('recording');
      setDuration(0);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setDuration(prev => {
          const newDuration = prev + 1;
          // Auto-stop at max duration
          if (newDuration >= maxDurationSeconds) {
            stopRecording();
          }
          return newDuration;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, [maxDurationSeconds, onRecordingComplete]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setState('review');
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current || !audioUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, audioUrl]);

  const handleDelete = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setDuration(0);
    setCurrentTime(0);
    setIsPlaying(false);
    setState('idle');
    onClear();
  }, [audioUrl, onClear]);

  const handleAudioTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Hidden audio element for playback */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleAudioTimeUpdate}
          onEnded={handleAudioEnded}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              // Use recorded duration since webm metadata can be unreliable
            }
          }}
        />
      )}

      {/* Idle State */}
      {state === 'idle' && (
        <div className="flex flex-col items-center gap-6 py-8 calm-fade-in">
          <div className="text-center space-y-2">
            <p className="calm-body text-base">
              You can speak freely. Take your time.
            </p>
            <p className="text-sm text-muted-foreground">
              Up to 5 minutes. Your voice stays private.
            </p>
          </div>
          
          <button
            onClick={startRecording}
            className="w-20 h-20 rounded-full bg-primary/10 hover:bg-primary/20 
                       flex items-center justify-center transition-all duration-300
                       hover:scale-105 active:scale-95 group"
            aria-label="Start recording"
          >
            <Mic className="w-8 h-8 text-primary group-hover:text-primary/80" />
          </button>
          
          <p className="text-xs text-muted-foreground">
            Tap to start recording
          </p>
        </div>
      )}

      {/* Recording State */}
      {state === 'recording' && (
        <div className="flex flex-col items-center gap-6 py-8 calm-fade-in">
          <div className="text-center space-y-2">
            <p className="calm-body text-base text-primary">
              Listening...
            </p>
            <p className="text-2xl font-light text-foreground tabular-nums">
              {formatTime(duration)}
            </p>
          </div>
          
          {/* Pulsing indicator */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" 
                 style={{ animationDuration: '1.5s' }} />
            <button
              onClick={stopRecording}
              className="relative w-20 h-20 rounded-full bg-primary/10 
                         flex items-center justify-center transition-all duration-300
                         hover:bg-primary/20"
              aria-label="Stop recording"
            >
              <Square className="w-6 h-6 text-primary fill-primary" />
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Tap to stop
          </p>
          
          {/* Progress bar */}
          <div className="w-full max-w-xs">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary/40 transition-all duration-1000"
                style={{ width: `${(duration / maxDurationSeconds) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground/60 text-right mt-1">
              {formatTime(maxDurationSeconds - duration)} remaining
            </p>
          </div>
        </div>
      )}

      {/* Review State */}
      {state === 'review' && audioUrl && (
        <div className="flex flex-col items-center gap-6 py-8 calm-fade-in">
          <div className="text-center space-y-2">
            <p className="calm-body text-base">
              Recording complete
            </p>
            <p className="text-sm text-muted-foreground">
              Listen back or record again
            </p>
          </div>

          {/* Playback controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-primary/10 hover:bg-primary/20 
                         flex items-center justify-center transition-all duration-300"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-primary" />
              ) : (
                <Play className="w-6 h-6 text-primary ml-1" />
              )}
            </button>
          </div>

          {/* Playback progress */}
          <div className="w-full max-w-xs space-y-1">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-100"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-full 
                         text-muted-foreground hover:text-foreground
                         bg-muted/50 hover:bg-muted transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Record again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
