import { Logo } from '@/components/common/logo';
import { LoginForm } from '@/components/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AudioIconButton } from '@/components/common/audio-icon-button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4 sm:p-6">
      <Link href="/" className="absolute top-4 left-4 z-20">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back to Welcome</span>
        </Button>
      </Link>
      <AudioIconButton className="absolute top-4 right-4 z-20" />
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <CardTitle className="text-3xl">Welcome Back!</CardTitle>
          <CardDescription className="text-lg">
            Sign in to continue your learning journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
       <p className="mt-8 text-sm text-center text-muted-foreground max-w-md">
        By continuing, you agree to SkillLeap's <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </div>
  );
}
