'use client';

import { MOCK_COURSES, getCourseById, MOCK_USER_PROFILE } from '@/data/mock';
import { useParams, useRouter } from 'next/navigation'; // Use next/navigation for App Router
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, PlayCircle, FileText, Award, Share2, Download, ChevronLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import type { Course, Lesson, UserProfile, CourseModule } from '@/types';
import { CourseContentDisplay } from '@/components/courses/course-content-display';
import { AppHeader } from '@/components/layout/app-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth(); // Get current user
  const currentUser = user || MOCK_USER_PROFILE; // Fallback for guest or loading

  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProgress, setUserProgress] = useState(0); // 0-100
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (params.id) {
      const courseId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundCourse = getCourseById(courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        // Set first lesson of first module as current lesson by default
        if (foundCourse.modules && foundCourse.modules.length > 0 && foundCourse.modules[0].lessons.length > 0) {
          setCurrentLesson(foundCourse.modules[0].lessons[0]);
        }
        // Simulate fetching user progress
        const completed = currentUser.completedCourses.includes(courseId);
        setIsCompleted(completed);
        setUserProgress(completed ? 100 : Math.floor(Math.random() * 60) + 20); // Random progress if not completed
      } else {
        toast({ title: "Course not found", description: "This course does not exist or is unavailable.", variant: "destructive" });
        router.push('/courses');
      }
      setIsLoading(false);
    }
  }, [params.id, router, toast, currentUser.completedCourses]);

  const handleStartLearning = () => {
    if (course && course.modules && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      setCurrentLesson(course.modules[0].lessons[0]);
      toast({ title: "Let's Learn!", description: `Starting ${course.title}` });
    }
  };

  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    // Simulate progress update
    if (!isCompleted) {
      setUserProgress(prev => Math.min(100, prev + Math.floor(Math.random()*10) + 5));
    }
  };
  
  const completeCourse = () => {
    setIsCompleted(true);
    setUserProgress(100);
    toast({
      title: "Congratulations!",
      description: `You've completed ${course?.title}! Your certificate is now available.`,
      className: "bg-accent text-accent-foreground"
    });
    // In a real app, you'd update the backend here
    // MOCK_USER_PROFILE.completedCourses.push(course!.id); 
    // MOCK_USER_PROFILE.earnedCertificates.push({ id: `cert-${course!.id}`, courseId: course!.id, courseName: course!.title, issuedDate: new Date().toISOString(), certificateUrl: '#'});
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center p-4">
        <h2 className="text-2xl font-semibold mb-4">Course Not Found</h2>
        <p className="text-muted-foreground mb-6">The course you are looking for might have been removed or is temporarily unavailable.</p>
        <Button onClick={() => router.push('/courses')}>Explore Other Courses</Button>
      </div>
    );
  }
  
  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = Math.floor((userProgress / 100) * totalLessons);


  return (
    <>
    <AppHeader title={course.title} showBackButton={true} />
    <div className="container mx-auto px-0 md:px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content Area (Lesson Display) */}
        <div className="md:col-span-2">
          {currentLesson ? (
            <CourseContentDisplay lesson={currentLesson} originalLanguage={course.language} courseProgress={userProgress} />
          ) : (
            <Card className="h-full flex flex-col items-center justify-center text-center p-8 shadow-lg bg-gradient-to-br from-background to-secondary/10">
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                width={400}
                height={225}
                className="rounded-lg mb-6 shadow-md aspect-video object-cover"
                data-ai-hint="course education content"
              />
              <h2 className="text-2xl font-semibold mb-3">{course.title}</h2>
              <p className="text-muted-foreground mb-6">{course.description}</p>
              <Button size="lg" onClick={handleStartLearning} className="btn-lg text-xl">
                <PlayCircle className="mr-2 h-6 w-6" />
                Start Learning
              </Button>
            </Card>
          )}
          
          {!isCompleted && userProgress > 95 && userProgress < 100 && (
             <Button onClick={completeCourse} size="lg" className="w-full mt-6 btn-lg bg-accent text-accent-foreground hover:bg-accent/90">
              Mark as Completed &amp; Get Certificate
            </Button>
          )}

          {isCompleted && (
            <Card className="mt-6 bg-accent/10 border-accent">
              <CardHeader className="flex flex-row items-center gap-4">
                <Award className="h-10 w-10 text-accent" />
                <div>
                  <CardTitle className="text-2xl text-accent-foreground">Course Completed!</CardTitle>
                  <CardDescription className="text-accent-foreground/80">Congratulations on finishing {course.title}.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">You have successfully completed this course. Your certificate is ready.</p>
                <div className="flex gap-2">
                  <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Download className="mr-2 h-4 w-4" /> Download Certificate
                  </Button>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" /> Share Achievement
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar (Modules &amp; Progress) */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Course Outline</CardTitle>
              <CardDescription>
                {completedLessons} / {totalLessons} lessons completed.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Progress value={userProgress} className="mb-4 h-3" aria-label={`${userProgress.toFixed(0)}% course progress`} />
              <Accordion type="single" collapsible defaultValue={course.modules[0]?.id} className="w-full">
                {course.modules.map((module, moduleIndex) => (
                  <AccordionItem value={module.id} key={module.id}>
                    <AccordionTrigger className="text-base hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <span className="truncate font-medium">Module {moduleIndex + 1}: {module.title}</span>
                        {/* Add module completion status if available */}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pl-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lesson.id}>
                            <Button
                              variant={currentLesson?.id === lesson.id ? "secondary" : "ghost"}
                              className="w-full justify-start text-left h-auto py-2 px-2 text-sm"
                              onClick={() => selectLesson(lesson)}
                            >
                              {lesson.contentType === 'video' ? <PlayCircle className="h-4 w-4 mr-2 shrink-0" /> : <FileText className="h-4 w-4 mr-2 shrink-0" />}
                              <span className="truncate flex-1">{lesson.title}</span>
                               {/* Add lesson completion check icon */}
                               {/* {isLessonCompleted(lesson.id) && <CheckCircle className="h-4 w-4 ml-2 text-accent" />} */}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="text-xl">Instructor</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
                <Image src={`https://picsum.photos/seed/${course.instructor?.replace(/\s+/g, '') || 'instructor'}/80/80`} alt={course.instructor || "Instructor"} width={60} height={60} className="rounded-full" data-ai-hint="instructor person"/>
                <div>
                    <p className="font-semibold">{course.instructor || "Expert Instructor"}</p>
                    <p className="text-sm text-muted-foreground">Experienced Professional</p>
                </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
    </>
  );
}
