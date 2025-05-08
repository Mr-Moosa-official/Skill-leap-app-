'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use next/navigation for App Router
import { Home, BookOpen, Briefcase, UserCircle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AudioIconButton } from '@/components/common/audio-icon-button';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/gamification', label: 'Rewards', icon: Award },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export const BottomNavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-top z-50 md:hidden">
      <div className="flex justify-around items-center h-16 max-w-screen-sm mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href));
          return (
            <Link key={item.label} href={item.href} legacyBehavior>
              <a
                className={cn(
                  'flex flex-col items-center justify-center text-center p-2 rounded-lg transition-colors duration-200 w-1/5',
                  isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className={cn('h-6 w-6 mb-0.5', isActive ? 'text-primary' : '')} />
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            </Link>
          );
        })}
        {/* Removed AudioIconButton from here to avoid clutter. Can be placed in AppHeader or per-screen. */}
      </div>
    </nav>
  );
};
