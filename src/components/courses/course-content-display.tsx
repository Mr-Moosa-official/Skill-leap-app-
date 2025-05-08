'use client';

import type { Lesson, TranslatedContent } from '@/types';
import { autoTranslateCourseContent } from '@/ai/flows/course-content-translator';
import { useLanguage } from '@/contexts/language-context';
import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, PlayCircle, FileText, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LanguageSwitcherButton } from '@/components/common/language-switcher-button';
import { Progress } from "@/components/ui/progress";

interface CourseContentDisplayProps {
  lesson: Lesson;
  originalLanguage: string; // e.g., 'en'
  courseProgress: number; // 0-100
}

export const CourseContentDisplay = ({ lesson, originalLanguage, courseProgress }: CourseContentDisplayProps) => {
  const { selectedLanguage } = useLanguage();
  const [translatedLesson, setTranslatedLesson] = useState<TranslatedContent | null>(null);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const contentToTranslate = useMemo(() => {
    return lesson.textContent || lesson.title; // Prioritize textContent, fallback to title
  }, [lesson.textContent, lesson.title]);

  useEffect(() => {
    const translateContent = async () => {
      if (selectedLanguage.code === originalLanguage || !contentToTranslate) {
        setTranslatedLesson(null); // No translation needed or no content
        return;
      }

      setIsLoadingTranslation(true);
      setError(null);
      try {
        const result = await autoTranslateCourseContent({
          text: contentToTranslate,
          language: selectedLanguage.name, // AI model might prefer full language name
        });
        setTranslatedLesson({
          original: contentToTranslate,
          translated: result.translatedText,
          targetLanguage: selectedLanguage.code,
        });
      } catch (err) {
        console.error('Translation error:', err);
        setError('Failed to translate content. Please try again.');
        setTranslatedLesson(null);
      } finally {
        setIsLoadingTranslation(false);
      }
    };

    translateContent();
  }, [selectedLanguage, originalLanguage, contentToTranslate]);

  const displayTitle = translatedLesson?.targetLanguage === selectedLanguage.code && lesson.title === translatedLesson.original
    ? translatedLesson.translated
    : lesson.title;
  
  const displayTextContent = translatedLesson?.targetLanguage === selectedLanguage.code && lesson.textContent === translatedLesson.original
    ? translatedLesson.translated
    : lesson.textContent;


  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-2xl md:text-3xl mb-1">{displayTitle}</CardTitle>
          {lesson.contentType === 'video' && lesson.durationMinutes && (
            <CardDescription>Video lesson: {lesson.durationMinutes} minutes</CardDescription>
          )}
           {lesson.contentType === 'text' && (
            <CardDescription>Reading material</CardDescription>
          )}
           {lesson.contentType === 'quiz' && (
            <CardDescription>Test your knowledge!</CardDescription>
          )}
        </div>
        <LanguageSwitcherButton size="sm" />
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoadingTranslation && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Translating...</p>
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Translation Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoadingTranslation && !error && (
          <>
            {lesson.contentType === 'video' && (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                {/* Placeholder for video player */}
                <PlayCircle className="h-24 w-24 text-primary/50" />
                {/* In a real app, you'd use a video player component here */}
                {/* <video src={lesson.contentUrl} controls className="w-full rounded-lg"></video> */}
                <p className="absolute text-foreground p-2 bg-background/50 rounded">Video player placeholder</p>
              </div>
            )}
            {lesson.contentType === 'text' && displayTextContent && (
              <div className="prose prose-lg max-w-none dark:prose-invert bg-secondary/5 p-4 rounded-md">
                <p className="whitespace-pre-wrap text-lg leading-relaxed">{displayTextContent}</p>
              </div>
            )}
            {lesson.contentType === 'quiz' && (
              <div className="p-6 bg-secondary/5 rounded-lg text-center">
                <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quiz Time!</h3>
                <p className="text-muted-foreground mb-4">
                  Ready to test what you've learned in "{lesson.title}"?
                </p>
                <Button size="lg" className="btn-lg">Start Quiz</Button>
              </div>
            )}
          </>
        )}

        {selectedLanguage.code !== originalLanguage && translatedLesson && !isLoadingTranslation && (
          <Alert variant="default" className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Translated Content</AlertTitle>
            <AlertDescription>
              This content has been automatically translated into {selectedLanguage.name}.
              The original language is {supportedLanguages.find(l => l.code === originalLanguage)?.name || originalLanguage}.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{courseProgress.toFixed(0)}%</span>
          </div>
          <Progress value={courseProgress} aria-label={`${courseProgress.toFixed(0)}% course completed`} className="h-3" />
        </div>

      </CardContent>
    </Card>
  );
};
