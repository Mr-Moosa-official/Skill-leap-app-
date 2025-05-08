'use client';

import { Logo } from '@/components/common/logo';
import { LanguageSelector } from '@/components/onboarding/language-selector';
import { Button } from '@/components/ui/button';
import { APP_TAGLINE } from '@/lib/constants';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6 text-center">
      <Image
        src="https://picsum.photos/seed/skillbridge-hero/1200/800"
        alt="Rural youth learning"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
        data-ai-hint="education learning students"
      />
      <main className="z-10 flex flex-col items-center bg-card/80 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl max-w-xl w-full">
        <Logo size="lg" className="mb-6" />
        <p className="text-xl text-foreground/80 mb-10">{APP_TAGLINE}</p>

        <div className="mb-10 w-full">
          <LanguageSelector />
        </div>

        <Link href="/auth" legacyBehavior>
          <Button size="lg" className="w-full md:w-auto btn-lg text-xl rounded-full shadow-lg hover:shadow-xl transition-shadow">
            Get Started
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
         <p className="mt-8 text-sm text-muted-foreground">
          Learn new skills, find jobs, and grow your career.
        </p>
      </main>
    </div>
  );
}
