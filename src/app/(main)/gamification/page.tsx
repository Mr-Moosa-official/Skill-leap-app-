'use client';

import { useAuth } from '@/contexts/auth-context';
import { MOCK_USER_PROFILE, getBadgeIcon } from '@/data/mock';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, CalendarDays, CheckCircle, ChevronRight, Star, Zap } from 'lucide-react';
import { AppHeader } from '@/components/layout/app-header';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GamificationPage() {
  const { user, isGuest } = useAuth();
  // Fallback to MOCK_USER_PROFILE if user is null (e.g., guest or loading), but restrict features for guests
  const profile = user || MOCK_USER_PROFILE;

  if (isGuest) {
    return (
      <>
        <AppHeader title="Rewards" showBackButton={false} />
        <div className="container mx-auto px-4 py-6 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <Award className="h-16 w-16 mx-auto mb-4 text-primary" />
              <CardTitle className="text-2xl">Rewards &amp; Achievements</CardTitle>
              <CardDescription>Unlock badges and track your progress!</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Sign up or log in to start earning rewards and track your learning journey.
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

  const dailyStreakProgress = (profile.learningStreak % 7) / 7 * 100; // Example: progress towards a 7-day streak badge

  return (
    <>
    <AppHeader title="My Rewards" showBackButton={false} />
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Learning Streak Card */}
      <Card className="shadow-lg bg-gradient-to-r from-primary/10 to-primary/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-primary mr-3" />
            <div>
              <CardTitle className="text-2xl">Daily Learning Streak</CardTitle>
              <CardDescription className="text-primary/80">Keep it up to unlock more rewards!</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-primary">{profile.learningStreak}</p>
            <p className="text-sm text-primary/90">Days</p>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={dailyStreakProgress} aria-label={`${profile.learningStreak} day learning streak`} className="h-3 mb-1"/>
          <p className="text-xs text-muted-foreground text-center">
            {profile.learningStreak % 7} / 7 days to next streak badge
          </p>
        </CardContent>
      </Card>

      {/* Badges Earned Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Award className="mr-2 h-6 w-6 text-accent" /> Badges Earned ({profile.badges.length})
          </CardTitle>
          <CardDescription>Collect badges as you learn and achieve milestones.</CardDescription>
        </CardHeader>
        <CardContent>
          {profile.badges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {profile.badges.slice().sort((a,b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime()).map(badge => {
                const BadgeIcon = getBadgeIcon(badge.name);
                return (
                <div key={badge.id} className="flex flex-col items-center text-center p-3 bg-secondary/10 rounded-lg aspect-square justify-center hover:bg-secondary/20 transition-colors">
                  <div className="relative w-16 h-16 mb-2">
                    <Image src={badge.iconUrl} alt={badge.name} layout="fill" objectFit="contain" data-ai-hint="badge award achievement" />
                  </div>
                  {/* <BadgeIcon className="w-12 h-12 text-accent mb-2" /> */}
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">Earned: {format(new Date(badge.earnedDate), "dd MMM")}</p>
                </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No badges earned yet. Start learning to collect them!</p>
              <Link href="/courses" legacyBehavior>
                <Button variant="link" className="mt-2">Explore Courses</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Future Rewards Teaser */}
      <Card className="border-dashed border-2">
         <CardHeader>
            <CardTitle className="text-xl flex items-center">
                <Star className="mr-2 h-6 w-6 text-yellow-500" /> More Rewards Coming Soon!
            </CardTitle>
            <CardDescription>We're always adding new ways to celebrate your achievements.</CardDescription>
         </CardHeader>
         <CardContent>
            <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary/50"/> Leaderboards</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary/50"/> Weekly Challenges</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary/50"/> Skill Mastery Badges</li>
            </ul>
         </CardContent>
      </Card>

    </div>
    </>
  );
}
