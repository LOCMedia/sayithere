import { useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import { ArrowLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
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
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground">
            Everything you need to know about using SayItHere
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="calm-fade-in" style={{ animationDelay: '0.2s' }}>
          <Accordion type="single" collapsible className="space-y-4">
            
            <AccordionItem value="item-1" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Is this really anonymous?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                Yes, completely. We don't collect any personal information—no name, email, phone number, 
                or IP tracking. There's no way to trace a message back to you. We can't identify you, 
                and we never will.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Do I need to create an account?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                Nope! There are no accounts, no sign-ups, and no passwords. Just come here, 
                say what you need to say, and leave whenever you're ready.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                What happens to my message after I submit it?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                Your message is stored securely in an encrypted database. Depending on your choice, 
                it may be kept private or shared anonymously with the community. Either way, 
                there's no way to connect it back to you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Can I delete my message after posting?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                Because everything is anonymous, there's no way to identify which message is "yours" 
                to delete it. Please be thoughtful about what you share, but know that your anonymity 
                is always protected.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Will anyone respond to my message?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                SayItHere is primarily a space for you to vent and be heard—not necessarily for back-and-forth 
                conversation. We may add gentle community support features in the future, but the focus 
                will always be on providing a judgment-free outlet, not advice or fixing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Is this a replacement for therapy?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                No. SayItHere is a space to release emotions and feel heard, but it's not professional 
                mental health support. If you're struggling with serious issues or in crisis, please 
                reach out to a therapist, counselor, or crisis hotline.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                What if someone posts something harmful?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                We reserve the right to remove content that threatens harm, is illegal, or violates 
                our terms of service. Our goal is to maintain a safe, respectful space for everyone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Can I use this on my phone?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                Yes! SayItHere works on any device with a web browser—desktop, tablet, or mobile.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                How do you make money?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                Right now, we don't. SayItHere is a passion project created to provide a safe space 
                for people who need it. We may explore ethical, privacy-respecting ways to sustain 
                the service in the future, but we'll never sell your data or compromise your anonymity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                I have more questions. How can I contact you?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                We're here to help! You can reach out with any questions or concerns, and we'll do 
                our best to respond thoughtfully and quickly.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

        {/* CTA */}
        <div className="pt-6 calm-fade-in" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={() => navigate('/choose-method')}
            className="calm-button-primary"
          >
            Ready to talk?
          </button>
        </div>

      </div>
    </PageWrapper>
  );
};

export default FAQ;
