import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import VoiceRecorder from '@/components/VoiceRecorder';
import { supabase } from '@/integrations/supabase/client';

const VoiceVent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const wantsResponse = location.state?.wantsResponse ?? false;
  
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
    setError(null);
  };

  const handleClear = () => {
    setAudioBlob(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!audioBlob) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Generate unique filename
      const filename = `${crypto.randomUUID()}.webm`;
      
      // Upload audio to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('voice-notes')
        .upload(filename, audioBlob, {
          contentType: 'audio/webm',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Create vent session with audio URL
      const { data: sessionData, error: sessionError } = await supabase
        .from('vent_sessions')
        .insert({
          audio_url: uploadData.path,
          wants_response: wantsResponse,
        })
        .select()
        .single();

      if (sessionError) {
        throw sessionError;
      }

      // Navigate to thank you page with session info
      navigate('/thank-you', { state: { sessionId: sessionData.id, isVoice: true } });
      
    } catch (err) {
      console.error('Error submitting voice note:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = audioBlob !== null;

  return (
    <PageWrapper showFooter={false}>
      <div className="space-y-6 w-full">
        {/* Header */}
        <div className="text-center space-y-2 calm-slide-up">
          <h1 className="calm-headline text-foreground text-xl md:text-2xl">
            Say what you need to say.
          </h1>
          <p className="text-sm text-muted-foreground">
            Take your time. There's no rush.
          </p>
        </div>

        {/* Voice recorder */}
        <div className="pt-4 calm-fade-in" style={{ animationDelay: '0.2s' }}>
          <VoiceRecorder
            onRecordingComplete={handleRecordingComplete}
            onClear={handleClear}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Submit button */}
        <div className="pt-4 flex flex-col items-center gap-4 calm-fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className={`calm-button-primary ${
              !canSubmit || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'I\'m done'}
          </button>
          
          <button
            onClick={() => navigate('/choose-response')}
            className="calm-button-ghost"
          >
            Go back
          </button>
        </div>

        {/* Reassurance */}
        <div className="pt-6 text-center">
          <p className="text-xs text-muted-foreground/60 max-w-sm mx-auto">
            Your voice note is stored securely and privately.
            You can delete it at any time.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default VoiceVent;
