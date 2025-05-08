import type { Language } from '@/types';
import { Languages, MessageCircle, NotebookPen } from 'lucide-react'; // Example, replace with actual icons or remove if not used

export const APP_NAME = 'SkillLeap';
export const APP_TAGLINE = 'Empowering Rural India with Skills';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', localName: 'English' },
  { code: 'hi', name: 'Hindi', localName: 'हिन्दी' },
  { code: 'te', name: 'Telugu', localName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', localName: 'தமிழ்' },
  { code: 'bn', name: 'Bengali', localName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', localName: 'मराठी' },
];

export const DEFAULT_LANGUAGE_CODE = 'en';

export const OTP_LENGTH = 6;
