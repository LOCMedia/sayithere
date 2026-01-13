import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import { useVentSession } from '@/hooks/useVentSession';

const Vent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createSession } = useVentSession();
  
  const wantsResponse = location.state?.wantsResponse ?? false;
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    // Create the session
    const session = createSession(content.trim(), wantsResponse);
    
    // Small delay for a gentle transition
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Navigate to thank you page with session info
    navigate('/thank-you', { state: { sessionId: session.id } });
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

        {/* Text area */}
        <div className="pt-4 calm-fade-in" style={{ animationDelay: '0.2s' }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing... Whatever is on your mind. It's okay to ramble. It's okay to be messy. This is your space."
            className="calm-input min-h-[280px] md:min-h-[320px] text-base leading-relaxed"
            autoFocus
          />
        </div>

        {/* Character count (subtle) */}
        <div className="flex justify-end">
          <span className="text-xs text-muted-foreground/50">
            {content.length > 0 && `${content.length} characters`}
          </span>
        </div>

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
