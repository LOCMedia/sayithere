import { useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: February 13, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 calm-fade-in text-foreground/80" style={{ animationDelay: '0.2s' }}>
          
          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">Our Commitment to You</h2>
            <p className="leading-relaxed">
              SayItHere was created as a safe space for you to express yourself without fear of judgment. 
              Your privacy is not just important to us—it's the foundation of what we do.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">What We Collect</h2>
            <p className="leading-relaxed">
              <strong>Absolutely nothing that identifies you.</strong> We don't ask for your name, email, 
              phone number, or any personal information. We don't use cookies to track you across the internet.
            </p>
            <p className="leading-relaxed">
              The only data we collect is:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your anonymous message or voice recording (stored securely)</li>
              <li>The date and time you shared it (for our records only)</li>
              <li>Basic, aggregated analytics (like total number of messages per day—nothing personal)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">How We Protect Your Data</h2>
            <p className="leading-relaxed">
              Your messages are stored securely in an encrypted database. We use industry-standard 
              security practices to ensure your words stay private and safe.
            </p>
            <p className="leading-relaxed">
              There are no user accounts, no login credentials, and no way to trace a message back to you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">What We Don't Do</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We don't sell your data to anyone. Ever.</li>
              <li>We don't share your messages with third parties.</li>
              <li>We don't use your words for advertising or marketing.</li>
              <li>We don't try to figure out who you are.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">Your Rights</h2>
            <p className="leading-relaxed">
              Because we don't collect personal information, there's nothing to request, delete, or modify. 
              Your anonymity is built into the system from the ground up.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">Changes to This Policy</h2>
            <p className="leading-relaxed">
              If we ever need to update this policy, we'll post the changes here with a new date at the top. 
              We'll never make changes that compromise your privacy or anonymity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">Questions?</h2>
            <p className="leading-relaxed">
              If you have any concerns about your privacy on SayItHere, please reach out to us. 
              Your peace of mind matters.
            </p>
          </section>

        </div>
      </div>
    </PageWrapper>
  );
};

export default Privacy;
