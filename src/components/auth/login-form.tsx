'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context';
import { OTP_LENGTH } from '@/lib/constants';
import { AtSign, Smartphone, LogIn, Users, ShieldQuestion } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Simple Google icon SVG
const GoogleIcon = () => (
  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);


export const LoginForm = () => {
  const { login, continueAsGuest } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleGoogleSignIn = () => {
    // Mock Google Sign-In
    login('google');
    toast({ title: "Signed in with Google", description: "Welcome to SkillLeap!" });
    router.push('/home');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length === 10 && /^\d+$/.test(mobileNumber)) {
      setOtpSent(true);
      setTimeLeft(60); // 60 seconds OTP timer
      toast({ title: "OTP Sent", description: `OTP sent to ${mobileNumber}. (Mock OTP: 123456)`});
    } else {
      toast({ title: "Invalid Mobile Number", description: "Please enter a valid 10-digit mobile number.", variant: "destructive" });
    }
  };

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock OTP verification
    if (otp === '123456' || otp.length === OTP_LENGTH) { // Allow any OTP_LENGTH digit OTP for testing if not '123456'
      login('otp', { mobile: mobileNumber });
      toast({ title: "Signed in with Mobile OTP", description: "Welcome to SkillLeap!" });
      router.push('/home');
    } else {
      toast({ title: "Invalid OTP", description: "The OTP entered is incorrect.", variant: "destructive" });
    }
  };

  const handleContinueAsGuest = () => {
    continueAsGuest();
    toast({ title: "Continuing as Guest", description: "Explore SkillLeap as a guest." });
    router.push('/home');
  };

  const handleResendOtp = () => {
    setTimeLeft(60);
    toast({ title: "OTP Resent", description: `New OTP sent to ${mobileNumber}. (Mock OTP: 123456)`});
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <Button variant="outline" className="w-full btn-lg text-lg" onClick={handleGoogleSignIn}>
        <GoogleIcon />
        Sign in with Google
      </Button>

      <div className="relative my-6">
        <Separator className="absolute inset-0 flex items-center" />
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <Label htmlFor="mobile" className="text-base flex items-center mb-1">
              <Smartphone className="mr-2 h-5 w-5" />
              Mobile Number
            </Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="text-lg p-3 h-12"
              maxLength={10}
            />
          </div>
          <Button type="submit" className="w-full btn-lg text-lg">
            <LogIn className="mr-2 h-5 w-5" />
            Send OTP
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpLogin} className="space-y-4">
          <div>
            <Label htmlFor="otp" className="text-base flex items-center mb-1">
              <ShieldQuestion className="mr-2 h-5 w-5" />
              Enter OTP
            </Label>
            <Input
              id="otp"
              type="text" // Changed to text to allow for potential non-numeric OTPs, but styled for numbers
              placeholder={`Enter ${OTP_LENGTH}-digit OTP`}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH))}
              className="text-lg p-3 h-12 tracking-[0.5em] text-center" // Letter spacing for OTP feel
              maxLength={OTP_LENGTH}
            />
             <p className="text-sm text-muted-foreground mt-2">
              OTP sent to {mobileNumber}. <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => setOtpSent(false)}>Change?</Button>
            </p>
          </div>
          <Button type="submit" className="w-full btn-lg text-lg">
            <LogIn className="mr-2 h-5 w-5" />
            Verify OTP
          </Button>
          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-muted-foreground">Resend OTP in {timeLeft}s</p>
            ) : (
              <Button variant="link" onClick={handleResendOtp} className="text-base">
                Resend OTP
              </Button>
            )}
          </div>
        </form>
      )}

      <Separator />

      <Button variant="secondary" className="w-full btn-lg text-lg" onClick={handleContinueAsGuest}>
        <Users className="mr-2 h-5 w-5" />
        Continue as Guest
      </Button>
    </div>
  );
};
