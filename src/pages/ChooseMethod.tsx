import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenLine, Mic } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { TalkMethod } from '@/types/vent';

const ChooseMethod = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<TalkMethod | null>(null);

  const handleContinue = () => {
    if (selected === 'write') {
      navigate('/choose-response');
    }
    // Voice is coming soon, so we don't navigate anywhere for that option
  };

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 calm-slide-up">
          <h1 className="calm-headline text-foreground text-2xl md:text-3xl">
            How would you like to talk?
          </h1>
          <p className="calm-body text-base">
            Choose whatever feels right.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4 pt-4">
          {/* Write option */}
          <button
            onClick={() => setSelected('write')}
            className={`calm-choice-card w-full text-left flex items-start gap-4 ${
              selected === 'write' ? 'selected' : ''
            }`}
          >
            <div className="p-3 rounded-full bg-calm-sage-light">
              <PenLine className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">Write it out</h3>
              <p className="text-sm text-muted-foreground">
                Take your time. Type whatever comes to mind.
              </p>
            </div>
          </button>

          {/* Voice option (coming soon) */}
          <button
            onClick={() => setSelected('voice')}
            disabled
            className={`calm-choice-card w-full text-left flex items-start gap-4 opacity-60 cursor-not-allowed ${
              selected === 'voice' ? 'selected' : ''
            }`}
          >
            <div className="p-3 rounded-full bg-muted">
              <Mic className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">
                Say it out loud
                <span className="ml-2 text-xs text-muted-foreground font-normal">
                  Coming soon
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Record a voice note. Sometimes speaking helps.
              </p>
            </div>
          </button>
        </div>

        {/* Continue button */}
        <div className="pt-6 flex flex-col items-center gap-4">
          <button
            onClick={handleContinue}
            disabled={!selected || selected === 'voice'}
            className={`calm-button-primary ${
              !selected || selected === 'voice' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Continue
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="calm-button-ghost"
          >
            Go back
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ChooseMethod;
