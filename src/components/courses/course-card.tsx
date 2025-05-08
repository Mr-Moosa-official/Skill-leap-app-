import type { Course } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, ArrowRight, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CourseCardProps {
  course: Course;
  isFeatured?: boolean;
  className?: string;
}

export const CourseCard = ({ course, isFeatured = false, className }: CourseCardProps) => {
  return (
    <Card className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col ${className}`}>
      <CardHeader className="p-0 relative">
        <Link href={`/courses/${course.id}`} legacyBehavior>
          <a className="block">
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              width={isFeatured ? 600 : 400}
              height={isFeatured ? 400 : 225}
              className="w-full object-cover aspect-[16/9]"
              data-ai-hint="course education"
            />
          </a>
        </Link>
        {isFeatured && course.rating && (
          <Badge variant="secondary" className="absolute top-3 right-3 flex items-center gap-1 py-1 px-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{course.rating.toFixed(1)}</span>
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/courses/${course.id}`} legacyBehavior>
          <a className="hover:text-primary">
            <CardTitle className="text-lg md:text-xl font-semibold mb-2 leading-tight line-clamp-2">
              {course.title}
            </CardTitle>
          </a>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{course.description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
          <div className="flex items-center">
            <BookOpen className="h-3.5 w-3.5 mr-1 text-primary" />
            <span>{course.category}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1 text-primary" />
            <span>{course.duration}</span>
          </div>
          {course.studentsEnrolled && (
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1 text-primary" />
              <span>{course.studentsEnrolled.toLocaleString()} learners</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/courses/${course.id}`} legacyBehavior passHref>
          <Button className="w-full text-base py-2.5" size="lg">
            View Course
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
