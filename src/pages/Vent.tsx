import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import { supabase } from '@/integrations/supabase/client';

const MAX_LENGTH = 500;

const Vent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const wantsResponse = location.state?.wantsResponse ?? false;
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('sad');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create the session in the database
      const { data, error: insertError } = await supabase
        .from('vent_sessions')
        .insert({
          content: content.trim(),
          wants_response: wantsResponse,
        })
        .select()
        .single();
      
      if (insertError) {
        throw insertError;
      }
      
      // Navigate to thank you page with session info AND mood AND content for AI
      navigate('/thank-you', { 
        state: { 
          sessionId: data.id, 
          isVoice: false,
          mood: mood,
          content: content.trim() // Pass content for AI response
        } 
      });
    } catch (err) {
      console.error('Error submitting vent:', err);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const canSubmit = content.trim().length > 0;

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

        {/* Mood selector */}
        <div className="pt-2 calm-fade-in">
          <label className="block text-sm text-muted-foreground mb-2">
            How are you feeling right now?
          </label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="calm-input"
          >
            <option value="sad">😔 Sad</option>
            <option value="angry">😡 Angry</option>
            <option value="anxious">😰 Anxious</option>
            <option value="relieved">😌 Relieved</option>
            <option value="numb">😶 Numb</option>
          </select>
        </div>

        {/* Text area */}
        <div className="pt-4 calm-fade-in" style={{ animationDelay: '0.2s' }}>
          <textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= MAX_LENGTH) {
                setContent(e.target.value);
              }
            }}
            placeholder="Start typing... Whatever is on your mind. It's okay to ramble. It's okay to be messy. This is your space."
            className="calm-input min-h-[280px] md:min-h-[320px] text-base leading-relaxed"
            autoFocus
          />
        </div>

        {/* Character count (subtle) */}
        <div className="flex justify-end">
          <span className="text-xs text-muted-foreground/50">
            {content.length}/{MAX_LENGTH} characters
          </span>
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
            Your message will be stored securely and anonymously.
            You can delete it at any time.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Vent;
