'use client';

import { useAuth } from '@/contexts/auth-context';
import { MOCK_USER_PROFILE, MOCK_COURSES, getCourseById } from '@/data/mock';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit3, LogOut, BookOpen, Award, ShieldCheck, Star, Percent, CalendarDays, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppHeader } from '@/components/layout/app-header';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress'; // For course progress (optional here)
import { format } from 'date-fns';


export default function ProfilePage() {
  const { user, logout, isGuest } = useAuth();
  const router = useRouter();

  // If guest, redirect or show limited profile
  if (isGuest) {
    // Option 1: Redirect to login
    // useEffect(() => { router.push('/auth'); }, [router]);
    // return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin"/></div>;
    
    // Option 2: Show a limited guest profile encouraging signup
    return (
      <>
        <AppHeader title="Profile" showBackButton={false} />
        <div className="container mx-auto px-4 py-6 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="https://picsum.photos/seed/guest-avatar/200/200" alt="Guest User" data-ai-hint="guest avatar placeholder"/>
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">Guest User</CardTitle>
              <CardDescription>You are currently exploring as a guest.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                To save your progress, earn certificates, and access all features, please sign up or log in.
              </p>
              <Link href="/auth" legacyBehavior>
                <Button size="lg" className="w-full btn-lg">Sign Up / Log In</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }


  const profile = user || MOCK_USER_PROFILE; // Use logged-in user or fallback to mock for structure

  const completedCoursesDetails = profile.completedCourses
    .map(id => getCourseById(id))
    .filter(Boolean) as typeof MOCK_COURSES;

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  };


  return (
    <>
    <AppHeader title="My Profile" showBackButton={false} />
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Profile Header */}
      <Card className="shadow-lg">
        <CardContent className="pt-6 flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-primary/50 shadow-md">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint="profile avatar"/>
            <AvatarFallback className="text-4xl">{getInitials(profile.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground">{profile.email || profile.mobile}</p>
            <p className="text-sm text-primary mt-1">Learning Streak: {profile.learningStreak} days <Star className="inline h-4 w-4 mb-0.5 text-yellow-400 fill-yellow-400" /></p>
            <div className="mt-4 flex gap-2 justify-center md:justify-start">
              <Button variant="outline">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
               <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
          <Link href="/settings" passHref>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Courses Completed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-primary" /> Courses Completed ({completedCoursesDetails.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completedCoursesDetails.length > 0 ? (
            <ul className="space-y-3">
              {completedCoursesDetails.map(course => (
                <li key={course.id} className="p-3 bg-secondary/10 rounded-md flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-md">{course.title}</h3>
                    <p className="text-xs text-muted-foreground">{course.category}</p>
                  </div>
                  <Link href={`/courses/${course.id}`} legacyBehavior>
                    <Button variant="outline" size="sm">View Course</Button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No courses completed yet. <Link href="/courses" className="text-primary hover:underline">Start learning!</Link></p>
          )}
        </CardContent>
      </Card>

      {/* Certificates Earned */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Award className="mr-2 h-6 w-6 text-accent" /> Certificates Earned ({profile.earnedCertificates.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile.earnedCertificates.length > 0 ? (
            <ul className="space-y-3">
              {profile.earnedCertificates.map(cert => (
                <li key={cert.id} className="p-3 bg-accent/10 rounded-md flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-md">{cert.courseName}</h3>
                    <p className="text-xs text-muted-foreground">Issued: {format(new Date(cert.issuedDate), "dd MMM yyyy")}</p>
                  </div>
                  <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    View Certificate
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No certificates earned yet. Complete courses to earn them!</p>
          )}
        </CardContent>
      </Card>
    </div>
    </>
  );
}
