'use client';

import type { UserProfile } from '@/types';
import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { MOCK_USER_PROFILE } from '@/data/mock'; // We will create this mock data file

interface AuthContextType {
  user: UserProfile | null;
  isGuest: boolean;
  login: (method: 'google' | 'otp', userData?: Partial<UserProfile>) => void;
  logout: () => void;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Basic persistence check (can be improved)
    const storedUser = localStorage.getItem('skillleap-user');
    const storedGuest = localStorage.getItem('skillleap-guest');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (storedGuest === 'true') {
      setIsGuest(true);
    }
  }, []);

  const login = (method: 'google' | 'otp', userData?: Partial<UserProfile>) => {
    // In a real app, this would involve API calls
    const fullUserData = { ...MOCK_USER_PROFILE, ...userData, id: userData?.id || MOCK_USER_PROFILE.id };
    setUser(fullUserData);
    setIsGuest(false);
    if (isMounted) {
      localStorage.setItem('skillleap-user', JSON.stringify(fullUserData));
      localStorage.removeItem('skillleap-guest');
    }
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    if (isMounted) {
      localStorage.removeItem('skillleap-user');
      localStorage.removeItem('skillleap-guest');
    }
  };

  const continueAsGuest = () => {
    setUser(null);
    setIsGuest(true);
    if (isMounted) {
      localStorage.setItem('skillleap-guest', 'true');
      localStorage.removeItem('skillleap-user');
    }
  };
  
  if (!isMounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isGuest, login, logout, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
