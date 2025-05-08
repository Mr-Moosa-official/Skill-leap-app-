'use client';

import type { JobOpportunity, TranslatedContent } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Building, CalendarDays, ExternalLink, Info, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/contexts/language-context';
import { translateJobDescription } from '@/ai/flows/job-description-translator';
import { useEffect, useState, useMemo } from 'react';
import { LanguageSwitcherButton } from '@/components/common/language-switcher-button';
import { Alert, AlertDescription } from '@/components/ui/alert';


interface JobCardProps {
  job: JobOpportunity;
}

export const JobCard = ({ job }: JobCardProps) => {
  const { selectedLanguage } = useLanguage();
  const [translatedContent, setTranslatedContent] = useState<TranslatedContent | null>(null);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);

  const contentToTranslate = useMemo(() => {
    return `${job.title}\n\n${job.description}`; // Combine title and description for translation
  }, [job.title, job.description]);

  useEffect(() => {
    const translate = async () => {
      // Assuming original job descriptions are in English ('en')
      if (selectedLanguage.code === 'en' || !contentToTranslate) {
        setTranslatedContent(null);
        return;
      }

      setIsLoadingTranslation(true);
      setTranslationError(null);
      try {
        const result = await translateJobDescription({
          jobDescription: contentToTranslate,
          language: selectedLanguage.name, // AI model might prefer full language name
        });
        const [translatedTitle, ...translatedDescParts] = result.translatedDescription.split('\n\n');
        const translatedDescription = translatedDescParts.join('\n\n');
        
        setTranslatedContent({
          original: contentToTranslate, // Store the original combined content
          translated: result.translatedDescription, // Store the full translated content
          targetLanguage: selectedLanguage.code,
        });
      } catch (err) {
        console.error("Job translation error:", err);
        setTranslationError("Failed to translate job details.");
        setTranslatedContent(null);
      } finally {
        setIsLoadingTranslation(false);
      }
    };
    translate();
  }, [selectedLanguage, contentToTranslate]);

  const displayTitle = translatedContent ? translatedContent.translated.split('\n\n')[0] : job.title;
  const displayDescription = translatedContent ? translatedContent.translated.split('\n\n').slice(1).join('\n\n') : job.description;

  const postedDate = formatDistanceToNow(new Date(job.postedDate), { addSuffix: true });

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl md:text-2xl font-semibold mb-1 line-clamp-2">
            {isLoadingTranslation ? <Loader2 className="h-5 w-5 animate-spin inline-block mr-2" /> : null}
            {displayTitle}
          </CardTitle>
          <Badge variant={job.category === 'Online' ? 'secondary' : 'outline'} className="text-sm whitespace-nowrap ml-2">
            {job.category}
          </Badge>
        </div>
        {job.company && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Building className="h-4 w-4 mr-1.5 text-primary" />
            {job.company}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1.5 text-primary" />
          {job.location}
        </div>
        <p className="text-sm text-foreground line-clamp-3">
          {isLoadingTranslation ? "Translating description..." : displayDescription}
        </p>
        {translationError && (
          <Alert variant="destructive" className="p-2 text-xs">
            <Info className="h-3 w-3 mr-1" />
            <AlertDescription>{translationError}</AlertDescription>
          </Alert>
        )}
        {job.requirements && job.requirements.length > 0 && (
           <div>
             <h4 className="text-xs font-medium text-muted-foreground mb-1">Requirements:</h4>
             <div className="flex flex-wrap gap-1">
              {job.requirements.map((req, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">{req}</Badge>
              ))}
             </div>
           </div>
        )}
         {job.salaryRange && (
           <p className="text-sm font-medium text-primary">{job.salaryRange}</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-0 p-4">
         <div className="flex items-center text-xs text-muted-foreground self-start sm:self-center">
            <CalendarDays className="h-3.5 w-3.5 mr-1"/>
            Posted {postedDate}
          </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <LanguageSwitcherButton size="sm" variant="ghost" />
          <Button 
            className="w-full sm:w-auto text-base py-2.5" 
            size="lg"
            onClick={() => job.applyUrl && window.open(job.applyUrl, '_blank')}
            disabled={!job.applyUrl}
          >
            {job.applyUrl ? 'Apply Now' : 'Details'}
            {job.applyUrl && <ExternalLink className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
