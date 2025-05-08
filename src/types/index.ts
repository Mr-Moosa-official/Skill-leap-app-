import type { LucideIcon } from 'lucide-react';

export interface Language {
  code: string;
  name: string;
  localName?: string; // e.g., हिन्दी for Hindi
  icon?: LucideIcon; // Optional: if we want to show flags or language icons
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string; // e.g., "Spoken English", "Digital Skills"
  duration: string; // e.g., "2 Weeks", "10 Hours"
  modules: CourseModule[];
  language: string; // Original language of the course
  instructor?: string;
  rating?: number; // 1-5
  studentsEnrolled?: number;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  contentType: 'video' | 'text' | 'quiz';
  contentUrl?: string; // URL for video or quiz data
  textContent?: string; // For text-based lessons
  durationMinutes?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  avatarUrl: string;
  languagePreference: string; // Language code
  completedCourses: string[]; // Array of course IDs
  earnedCertificates: Certificate[];
  learningStreak: number;
  badges: Badge[];
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  issuedDate: string; // ISO date string
  certificateUrl: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string; // URL to badge image/icon
  earnedDate: string; // ISO date string
}

export interface JobOpportunity {
  id: string;
  title: string;
  company?: string;
  location: string;
  description: string;
  category: 'Online' | 'Offline';
  postedDate: string; // ISO date string
  applyUrl?: string; // Link to apply or contact info
  requirements?: string[];
  salaryRange?: string;
}

// For AI Translation
export interface TranslatedContent {
  original: string;
  translated: string;
  targetLanguage: string;
}
