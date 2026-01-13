import { useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="text-center space-y-8">
        {/* Main headline */}
        <div className="space-y-4 calm-slide-up">
          <h1 className="calm-headline text-foreground">
            Talk without guilt.
          </h1>
          <p className="calm-body max-w-md mx-auto">
            Sometimes you just need to say it. No judgement, no fixing, 
            no one you have to worry about burdening.
          </p>
        </div>

        {/* Reassurance */}
        <div className="calm-fade-in space-y-3" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-muted-foreground">
            Completely anonymous. Your words, your space.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-6 calm-fade-in" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={() => navigate('/choose-method')}
            className="calm-button-primary"
          >
            Start talking
          </button>
        </div>

        {/* Subtle message */}
        <div className="pt-8 calm-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-xs text-muted-foreground/60 max-w-sm mx-auto leading-relaxed">
            No sign-up required. No data shared. 
            Just a quiet space to let it out.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Landing;
