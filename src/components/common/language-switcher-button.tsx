'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-context";
import { Languages } from "lucide-react";

interface LanguageSwitcherButtonProps {
  onLanguageChange?: (langCode: string) => void;
  size?: 'sm' | 'default' | 'lg' | 'icon';
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}

export function LanguageSwitcherButton({ onLanguageChange, size = 'default', variant = 'outline' }: LanguageSwitcherButtonProps) {
  const { selectedLanguage, setSelectedLanguage, supportedLanguages } = useLanguage();

  const handleLanguageSelect = (langCode: string) => {
    const lang = supportedLanguages.find(l => l.code === langCode);
    if (lang) {
      setSelectedLanguage(lang);
      if (onLanguageChange) {
        onLanguageChange(lang.code);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          {size !== 'icon' && <span className="hidden sm:inline">{selectedLanguage.name}</span>}
          {size !== 'icon' && <span className="sm:hidden">{selectedLanguage.code.toUpperCase()}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Translate to</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedLanguage.code} onValueChange={handleLanguageSelect}>
          {supportedLanguages.map((lang) => (
            <DropdownMenuRadioItem key={lang.code} value={lang.code}>
              {lang.localName} ({lang.name})
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
