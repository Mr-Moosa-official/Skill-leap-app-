'use client';

import type { ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';
// Import other providers here if needed, e.g., QueryClientProvider for React Query

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LanguageProvider>
      <AuthProvider>
        {/* <QueryClientProvider client={queryClient}> */}
          {children}
        {/* </QueryClientProvider> */}
      </AuthProvider>
    </LanguageProvider>
  );
};
