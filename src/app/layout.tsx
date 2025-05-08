import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Using Geist as it's already configured
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  // Removed Geist_Mono as it's not explicitly needed for this app and to simplify.
  // If specific mono font sections are needed later, it can be re-added.
});

export const metadata: Metadata = {
  title: 'SkillLeap - Empowering Rural India',
  description: 'Short, job-ready micro-courses in local languages for rural youth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
