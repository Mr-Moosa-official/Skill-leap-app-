import { AppHeader } from '@/components/layout/app-header';
import { BottomNavigationBar } from '@/components/layout/bottom-navigation-bar';
import type { ReactNode } from 'react';

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader showLogo={true} />
      <main className="flex-1 pb-20 md:pb-0"> {/* Padding bottom for nav bar on mobile */}
        {children}
      </main>
      <BottomNavigationBar />
    </div>
  );
}
