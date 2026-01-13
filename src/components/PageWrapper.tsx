import { ReactNode } from 'react';
import CrisisFooter from './CrisisFooter';

interface PageWrapperProps {
  children: ReactNode;
  showFooter?: boolean;
}

const PageWrapper = ({ children, showFooter = true }: PageWrapperProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 page-transition">
        <div className="w-full max-w-xl">
          {children}
        </div>
      </main>
      {showFooter && <CrisisFooter />}
    </div>
  );
};

export default PageWrapper;
