import { useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
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
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: February 13, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 calm-fade-in text-foreground/80" style={{ animationDelay: '0.2s' }}>
          
          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">Welcome</h2>
            <p className="leading-relaxed">
              These terms are simple because SayItHere is simple. This is a space for you to express 
              yourself freely, safely, and anonymously. By using this service, you're agreeing to use 
              it respectfully and responsibly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">What You Can Do</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Share your thoughts, feelings, and experiences anonymously</li>
              <li>Use this space to vent, process, or simply be heard</li>
              <li>Express yourself without fear of judgment</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">What We Ask of You</h2>
            <p className="leading-relaxed">
              We trust you to use this space responsibly. Please don't share content that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Threatens, harasses, or incites violence against others</li>
              <li>Contains illegal content or promotes illegal activities</li>
              <li>Exploits or harms children in any way</li>
              <li>Violates someone else's privacy or rights</li>
              <li>Is spam or attempts to manipulate the system</li>
            </ul>
            <p className="leading-relaxed mt-3">
              We're here to provide a safe outlet for difficult emotions—not a platform for harm.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">Your Anonymity</h2>
            <p className="leading-relaxed">
              SayItHere is designed to keep you anonymous. We don't collect personal information, 
              and we can't identify you from your messages. However, please be mindful not to share 
              identifying details about yourself if you want to stay anonymous.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">Content Moderation</h2>
            <p className="leading-relaxed">
              While we respect your privacy, we reserve the right to remove content that violates 
              these terms or could cause harm. We do this to keep the space safe for everyone.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">No Guarantees</h2>
            <p className="leading-relaxed">
              SayItHere is provided "as is." We work hard to keep the service running smoothly, 
              but we can't guarantee it will always be available or error-free. We're not liable 
              for any issues that arise from using the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">This Is Not Therapy</h2>
            <p className="leading-relaxed">
              SayItHere is a space to vent and be heard, but it's not a replacement for professional 
              mental health support. If you're in crisis or need immediate help, please reach out to 
              a mental health professional or crisis hotline.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">Changes to These Terms</h2>
            <p className="leading-relaxed">
              We may update these terms from time to time. If we make significant changes, 
              we'll update the date at the top of this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-foreground">Questions or Concerns?</h2>
            <p className="leading-relaxed">
              If you have any questions about these terms or how we operate, please don't hesitate 
              to reach out. We're here to help.
            </p>
          </section>

        </div>
      </div>
    </PageWrapper>
  );
};

export default Terms;
