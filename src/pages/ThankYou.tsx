import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { supabase } from '@/integrations/supabase/client';

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
   
  const mood = location.state?.mood;
  const content = location.state?.content;
  const sessionId = location.state?.sessionId;
  const isVoice = location.state?.isVoice ?? false;
  
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fallback messages if AI fails or for voice notes
  const moodMessages: Record<string, string> = {
    sad: "It sounds like things have been heavy. You didn't do anything wrong by feeling this way. Take a breath — you're allowed to go gently.",
    angry: "What you're feeling matters. Anger often shows us that something important was crossed. You're not bad for feeling this.",
    anxious: "Your mind might be racing right now, and that's okay. You're here, you showed up, and that already counts for something.",
    relieved: "It's okay to let yourself feel lighter for a moment. You released something — that took courage.",
    numb: "Feeling numb doesn't mean you're broken. It usually means you've been strong for too long. You're not alone in this.",
  };

  // Generate AI response when component loads
  useEffect(() => {
    const generateAIResponse = async () => {
      // Only generate AI response for text vents with content
      if (!content || isVoice) return;
      
      setIsLoadingAI(true);
      
      try {
        // Call Netlify Function
        const response = await fetch('/.netlify/functions/generate-supportive-response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content, mood }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate response');
        }
        
        const data = await response.json();
        
        if (data?.response) {
          setAiMessage(data.response);
        } else {
          setAiError(true);
        }
      } catch (error) {
        console.error('Error generating AI response:', error);
        setAiError(true);
      } finally {
        setIsLoadingAI(false);
      }
    };

    generateAIResponse();
  }, [content, mood, isVoice]);

  const handleDelete = async () => {
    if (!sessionId) return;
    
    setIsDeleting(true);
    
    try {
      // If it's a voice note, we need to delete the audio file too
      if (isVoice) {
        // First get the session to find the audio URL
        const { data: session } = await supabase
          .from('vent_sessions')
          .select('audio_url')
          .eq('id', sessionId)
          .single();
        
        if (session?.audio_url) {
          // Delete the audio file from storage
          await supabase.storage
            .from('voice-notes')
            .remove([session.audio_url]);
        }
      }
      
      // Mark session as deleted and clear content
      await supabase
        .from('vent_sessions')
        .update({ 
          deleted: true, 
          content: null, 
          audio_url: null 
        })
        .eq('id', sessionId);
      
      setIsDeleted(true);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting session:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStartOver = () => {
    navigate('/');
  };

  const messageType = isVoice ? 'voice note' : 'message';

  return (
    <PageWrapper>
      <div className="text-center space-y-8">
        {/* Main message */}
        <div className="space-y-4 calm-slide-up">
          <div className="text-5xl mb-6">🌿</div>
          <h1 className="calm-headline text-foreground text-2xl md:text-3xl">
            Thank you for sharing.
          </h1>
          <p className="calm-body max-w-md mx-auto">
            Whatever you're carrying, it's okay to put it down sometimes.
            You did something brave today.
          </p>
        </div>

        {/* AI or Mood Response */}
        {mood && (
          <div className="mt-6 p-6 rounded-lg bg-muted/40 calm-fade-in border border-border/50">
            <p className="text-xs text-muted-foreground text-center mb-3 uppercase tracking-wide">
              A gentle response
            </p>
            
            {isLoadingAI ? (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="animate-pulse flex space-x-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animation-delay-200"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animation-delay-400"></div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Taking a moment with you…
                </p>
              </div>
            ) : (
              <p className="text-sm text-foreground leading-relaxed text-center">
                {aiMessage || moodMessages[mood] || "You're not alone in what you're feeling."}
              </p>
            )}
          </div>
        )}

        {/* Check-in question */}
        <div className="calm-card max-w-sm mx-auto calm-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-foreground font-medium mb-2">
            Do you feel a little lighter?
          </p>
          <p className="text-sm text-muted-foreground">
            Even if it's just a tiny bit, that's enough.
          </p>
        </div>

        {/* Delete option */}
        {!isDeleted ? (
          <div className="pt-4 calm-fade-in" style={{ animationDelay: '0.5s' }}>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="calm-button-ghost inline-flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete my {messageType} forever
              </button>
            ) : (
              <div className="space-y-4 p-4 bg-muted/30 rounded-2xl max-w-sm mx-auto">
                <p className="text-sm text-foreground">
                  Are you sure? This cannot be undone.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="calm-button-secondary text-sm px-4 py-2"
                  >
                    {isDeleting ? 'Deleting...' : 'Yes, delete it'}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="calm-button-ghost text-sm"
                  >
                    Keep it
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="pt-4 calm-fade-in">
            <p className="text-sm text-primary">
              ✓ Your {messageType} has been permanently deleted.
            </p>
          </div>
        )}

        {/* Return home */}
        <div className="pt-8 calm-fade-in" style={{ animationDelay: '0.7s' }}>
          <button
            onClick={handleStartOver}
            className="calm-button-primary"
          >
            Return home
          </button>
        </div>

        {/* Closing note */}
        <div className="pt-4">
          <p className="text-xs text-muted-foreground/60 max-w-xs mx-auto">
            Come back whenever you need to. 
            This space will always be here.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ThankYou;
