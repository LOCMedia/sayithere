import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircleOff, Heart } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { ResponsePreference } from '@/types/vent';

const ChooseResponse = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ResponsePreference | null>(null);

  const handleContinue = () => {
    if (selected) {
      // Pass the preference to the vent page
      navigate('/vent', { state: { wantsResponse: selected === 'gentle-response' } });
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 calm-slide-up">
          <h1 className="calm-headline text-foreground text-2xl md:text-3xl">
            Would you like a response?
          </h1>
          <p className="calm-body text-base">
            There's no wrong answer here.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4 pt-4">
          {/* No response option */}
          <button
            onClick={() => setSelected('no-response')}
            className={`calm-choice-card w-full text-left flex items-start gap-4 ${
              selected === 'no-response' ? 'selected' : ''
            }`}
          >
            <div className="p-3 rounded-full bg-calm-warm">
              <MessageCircleOff className="w-5 h-5 text-calm-text-soft" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">Just let me say it</h3>
              <p className="text-sm text-muted-foreground">
                I don't need a response. I just need to get it out.
              </p>
            </div>
          </button>

          {/* Gentle response option */}
          <button
            onClick={() => setSelected('gentle-response')}
            className={`calm-choice-card w-full text-left flex items-start gap-4 ${
              selected === 'gentle-response' ? 'selected' : ''
            }`}
          >
            <div className="p-3 rounded-full bg-calm-rose">
              <Heart className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">A gentle response</h3>
              <p className="text-sm text-muted-foreground">
                A soft, supportive note would be nice.
              </p>
            </div>
          </button>
        </div>

        {/* Continue button */}
        <div className="pt-6 flex flex-col items-center gap-4">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`calm-button-primary ${!selected ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Continue
          </button>
          
          <button
            onClick={() => navigate('/choose-method')}
            className="calm-button-ghost"
          >
            Go back
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ChooseResponse;
