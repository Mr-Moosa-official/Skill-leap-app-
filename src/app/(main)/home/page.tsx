'use client';

import { CourseCard } from '@/components/courses/course-card';
import { Button } from '@/components/ui/button';
import { MOCK_COURSES, MOCK_USER_PROFILE } from '@/data/mock';
import { ArrowRight, Briefcase, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAuth } from '@/contexts/auth-context';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const { user } = useAuth();
  const currentUser = user || MOCK_USER_PROFILE; // Fallback to mock if no user (guest mode)

  const featuredCourses = MOCK_COURSES.slice(0, 3); // Take first 3 as featured
  const continueLearningCourses = MOCK_COURSES.filter(course => currentUser.completedCourses.includes(course.id) === false).slice(0,2);


  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Hello, {currentUser.name.split(' ')[0]}!
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Ready to learn something new today?
            </p>
          </div>
          <Image
            src="https://picsum.photos/seed/learn-skill/300/200"
            alt="Learning illustration"
            width={200}
            height={133}
            className="rounded-lg shadow-md hidden md:block"
            data-ai-hint="learning study illustration"
          />
        </div>
      </section>


      {/* Featured Courses */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured Courses</h2>
          <Link href="/courses" legacyBehavior>
            <Button variant="link" className="text-primary">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} isFeatured className="w-[300px] md:w-[350px] flex-shrink-0" />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      {/* Continue Learning */}
      {continueLearningCourses.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {continueLearningCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}
      
      {/* Explore Job Opportunities */}
      <section className="text-center py-6">
         <Card className="bg-accent/20 border-accent shadow-lg">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Briefcase className="h-12 w-12 text-accent" />
            </div>
            <CardTitle className="text-2xl text-accent-foreground">Find Your Next Opportunity</CardTitle>
            <CardDescription className="text-muted-foreground">
              Explore local and digital jobs that match your new skills.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/jobs" legacyBehavior>
              <Button size="lg" variant="default" className="btn-lg text-lg bg-accent text-accent-foreground hover:bg-accent/90">
                Explore Job Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
