import { useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import { ArrowLeft, Heart, Shield, Users } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Back button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors calm-fade-in"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </button>

        {/* Header */}
        <div className="space-y-4 calm-slide-up">
          <h1 className="text-3xl font-light text-foreground">
            About SayItHere
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A safe, anonymous space to say what's on your mind—without judgment, 
            without burden, without guilt.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 calm-fade-in" style={{ animationDelay: '0.2s' }}>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">Why We Exist</h2>
            <p className="leading-relaxed text-foreground/80">
              Sometimes you just need to say it out loud. But the people in your life—the ones you 
              love—already have their own struggles. You don't want to burden them. You don't want 
              to be "that person" who's always venting. You don't want to worry them or make them 
              feel responsible for fixing you.
            </p>
            <p className="leading-relaxed text-foreground/80">
              So you hold it in. And it builds. And builds.
            </p>
            <p className="leading-relaxed text-foreground/80">
              <strong>SayItHere exists because you deserve a place to let it out.</strong> Without 
              guilt. Without consequences. Without anyone knowing it was you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">Our Values</h2>
            
            <div className="space-y-6">
              {/* Anonymity */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-light text-foreground">Complete Anonymity</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    We don't ask for your name, email, or any information about you. We don't use 
                    tracking cookies. We can't identify you, and we never will. Your words are yours alone.
                  </p>
                </div>
              </div>

              {/* No Judgment */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-light text-foreground">Zero Judgment</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    This isn't a place for fixing, advising, or analyzing. It's simply a place to be heard. 
                    Your feelings are valid. Your struggles are real. You don't need to justify them here.
                  </p>
                </div>
              </div>

              {/* Community */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-light text-foreground">Gentle Support</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    While your messages are private and anonymous, you're not alone in what you're feeling. 
                    Many others have walked similar paths and understand the weight you carry.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">What SayItHere Is Not</h2>
            <p className="leading-relaxed text-foreground/80">
              We're not a replacement for therapy, counseling, or professional mental health support. 
              If you're in crisis or struggling with serious mental health issues, please reach out to 
              a qualified professional or crisis hotline.
            </p>
            <p className="leading-relaxed text-foreground/80">
              Think of us as a release valve—a place to let out the pressure when you need it, 
              so you can breathe a little easier.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">You're Not Alone</h2>
            <p className="leading-relaxed text-foreground/80">
              Whatever you're carrying, whatever you need to say—it matters. You matter. 
              And you deserve a space where you can just... let it out.
            </p>
            <p className="leading-relaxed text-foreground/80">
              Thank you for trusting us with your words.
            </p>
          </section>

          {/* CTA */}
          <div className="pt-6 border-t border-border">
            <button 
              onClick={() => navigate('/choose-method')}
              className="calm-button-primary"
            >
              Start talking
            </button>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
