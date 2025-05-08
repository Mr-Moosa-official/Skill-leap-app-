'use client';

import { AppHeader } from "@/components/layout/app-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { MOCK_USER_PROFILE } from "@/data/mock";
import { UploadCloud, User, Mail, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function EditProfilePage() {
  const { user, login } = useAuth(); // Use login to update user details
  const router = useRouter();
  const { toast } = useToast();

  const currentUser = user || MOCK_USER_PROFILE; // Fallback for initial load or guest (though guests shouldn't reach here ideally)

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email || '');
  const [mobile, setMobile] = useState(currentUser.mobile || '');
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatarUrl);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email || '');
      setMobile(user.mobile || '');
      setAvatarPreview(user.avatarUrl);
    }
  }, [user]);


  const getInitials = (nameStr: string) => {
    const names = nameStr.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
      // In a real app, you would upload this file to a server
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update
    const updatedUser = {
      ...currentUser,
      name,
      email,
      mobile,
      avatarUrl: avatarPreview, // In real app, this would be URL from server
    };
    login('otp', updatedUser); // Re-use login to update context and localStorage
    toast({ title: "Profile Updated", description: "Your profile details have been saved." });
    router.push('/profile');
  };

  return (
    <>
      <AppHeader title="Edit Profile" showBackButton={true} />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Update Your Information</CardTitle>
            <CardDescription>Keep your profile details current.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="w-32 h-32 border-4 border-primary/50 shadow-md">
                  <AvatarImage src={avatarPreview} alt={name} data-ai-hint="profile avatar edit"/>
                  <AvatarFallback className="text-4xl">{getInitials(name)}</AvatarFallback>
                </Avatar>
                <Input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                <Button type="button" variant="outline" onClick={() => document.getElementById('avatar-upload')?.click()}>
                  <UploadCloud className="mr-2 h-4 w-4" /> Change Photo
                </Button>
              </div>

              <div>
                <Label htmlFor="name" className="text-base flex items-center mb-1"><User className="mr-2 h-4 w-4 text-primary"/>Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-11 text-base" />
              </div>

              <div>
                <Label htmlFor="email" className="text-base flex items-center mb-1"><Mail className="mr-2 h-4 w-4 text-primary"/>Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 text-base" />
              </div>
              
              <div>
                <Label htmlFor="mobile" className="text-base flex items-center mb-1"><Smartphone className="mr-2 h-4 w-4 text-primary"/>Mobile Number</Label>
                <Input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} className="h-11 text-base" maxLength={10} />
              </div>
              
              <Button type="submit" size="lg" className="w-full btn-lg">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
