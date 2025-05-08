'use client';

import { Logo } from '@/components/common/logo';
import { AudioIconButton } from '@/components/common/audio-icon-button';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Search, Bell } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showAudioIcon?: boolean;
}

export const AppHeader = ({
  title,
  showBackButton = false,
  showLogo = false,
  showSearch = true,
  showNotifications = true,
  showAudioIcon = true,
}: AppHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleBack = () => {
    router.back();
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  };

  // Determine if the current page is one where the logo should primarily be shown
  const isLogoCentricPage = ['/home'].includes(pathname);


  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {showBackButton && !isLogoCentricPage && (
            <Button variant="ghost" size="icon" onClick={handleBack} aria-label="Go back">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          {(showLogo || isLogoCentricPage) && !title && <Logo size="sm" />}
          {title && <h1 className="text-xl font-semibold truncate">{title}</h1>}
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          )}
          {showNotifications && (
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-5 w-5" />
              {/* Optional: Notification dot */}
              {/* <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-destructive ring-2 ring-background" /> */}
            </Button>
          )}
          {showAudioIcon && <AudioIconButton className="h-8 w-8"/>}

          {user && (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email || user.mobile}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile" passHref><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                <Link href="/settings" passHref><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};
