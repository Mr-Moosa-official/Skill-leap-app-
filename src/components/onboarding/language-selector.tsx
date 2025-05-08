'use client';

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { CheckCircle, Languages } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const LanguageSelector = () => {
  const { selectedLanguage, setSelectedLanguage, supportedLanguages } = useLanguage();

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Languages className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-semibold text-center">Choose Your Language</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {supportedLanguages.map((lang) => (
          <Button
            key={lang.code}
            variant={selectedLanguage.code === lang.code ? 'default' : 'outline'}
            className="h-20 text-lg flex flex-col items-center justify-center relative"
            onClick={() => setSelectedLanguage(lang)}
          >
            <span>{lang.localName}</span>
            <span className="text-sm text-muted-foreground">{lang.name}</span>
            {selectedLanguage.code === lang.code && (
              <CheckCircle className="h-5 w-5 text-accent-foreground absolute top-2 right-2 bg-accent rounded-full p-0.5" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
