import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { supabase } from '@/integrations/supabase/client';

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const sessionId = location.state?.sessionId;
  const isVoice = location.state?.isVoice ?? false;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
