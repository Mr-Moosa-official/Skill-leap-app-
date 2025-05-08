'use client';

import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronRight, Bell, Palette, LanguagesIcon, ShieldQuestion, LogOut, UserCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useLanguage, LanguageProvider } from "@/contexts/language-context"; // Ensure LanguageProvider is available for LanguageSwitcher
import { LanguageSwitcherButton } from "@/components/common/language-switcher-button";

// Wrapper for LanguageSwitcherButton if it needs LanguageContext and this page doesn't have it higher up.
// However, LanguageProvider is in Providers.tsx, so this should work directly.

export default function SettingsPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  return (
    <>
      <AppHeader title="Settings" showBackButton={true} />
      <div className="container mx-auto px-4 py-6 space-y-6">
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Account</CardTitle>
            <CardDescription>Manage your account settings and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/profile/edit" passHref>
              <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md cursor-pointer">
                <div className="flex items-center gap-3">
                  <UserCircle className="h-5 w-5 text-primary" />
                  <span className="text-base">Edit Profile</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
            <Separator />
             <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <LanguagesIcon className="h-5 w-5 text-primary" />
                <Label htmlFor="language-select" className="text-base">App Language</Label>
              </div>
              {/* The LanguageSwitcherButton uses its own Dropdown, so it's not a direct switch */}
              <LanguageSwitcherButton variant="outline" size="default"/>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Notifications</CardTitle>
             <CardDescription>Control how you receive notifications from SkillLeap.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
              </div>
              <Switch id="push-notifications" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                 <Bell className="h-5 w-5 text-primary" />
                <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
              </div>
              <Switch id="email-notifications" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-primary" />
                <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
              </div>
              {/* Basic dark mode toggle. More robust solution would use theme context. */}
              <Switch id="dark-mode" onCheckedChange={(checked) => {
                  if (checked) document.documentElement.classList.add('dark');
                  else document.documentElement.classList.remove('dark');
              }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">About &amp; Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <Link href="/terms" passHref>
              <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md cursor-pointer">
                <span className="text-base">Terms of Service</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
            <Separator />
             <Link href="/privacy" passHref>
              <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md cursor-pointer">
                <span className="text-base">Privacy Policy</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
             <Link href="/support" passHref> {/* Placeholder support page */}
              <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md cursor-pointer">
                <div className="flex items-center gap-3">
                  <ShieldQuestion className="h-5 w-5 text-primary" />
                  <span className="text-base">Help &amp; Support</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          </CardContent>
        </Card>

        <Button variant="destructive" size="lg" className="w-full btn-lg" onClick={handleLogout}>
          <LogOut className="mr-2 h-5 w-5" /> Log Out
        </Button>
        
        <p className="text-center text-xs text-muted-foreground mt-4">App Version: 1.0.0</p>
      </div>
    </>
  );
}
