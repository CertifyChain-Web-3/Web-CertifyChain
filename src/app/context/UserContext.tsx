'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { UserRole, VerificationStatus } from '../hooks/useAddressVerification';

interface UserContextType {
  userRole: UserRole;
  verificationStatus: VerificationStatus;
  userAddress: string | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  userName: string | null;
  login: () => Promise<void>;
  logout: () => void;
  updateUserInfo: (info: Partial<UserInfo>) => void;
}

interface UserInfo {
  role: UserRole;
  status: VerificationStatus;
  name: string | null;
  address: string | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    role: null,
    status: null,
    name: null,
    address: undefined,
  });
  
  // Effect to check local storage for saved user info on initial load
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      try {
        const parsedInfo = JSON.parse(savedUserInfo);
        setUserInfo(parsedInfo);
      } catch (error) {
        console.error('Failed to parse saved user info:', error);
        localStorage.removeItem('userInfo');
      }
    }
  }, []);
  
  // Effect to update user info when wallet connection changes
  useEffect(() => {
    if (isConnected && address) {
      if (userInfo.address && userInfo.address !== address) {
        // Wallet address changed, we need to reset user info
        logout();
      } else if (!userInfo.address) {
        // Set address but keep other info
        setUserInfo(prev => ({
          ...prev,
          address
        }));
      }
    } else if (!isConnected && userInfo.address) {
      // Wallet disconnected, reset user info
      logout();
    }
  }, [isConnected, address]);
  
  // Save user info to local storage when it changes
  useEffect(() => {
    if (userInfo.address) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }, [userInfo]);
  
  // Login function - in a real app would verify address with backend
  const login = async () => {
    if (!address) {
      toast.error('Wallet not connected');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call to check address registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, randomly assign role
      const role: UserRole = Math.random() > 0.5 ? 'university' : 'student';
      const name = role === 'university' ? 'Demo University' : 'Demo Student';
      
      setUserInfo({
        role,
        status: 'verified',
        name,
        address,
      });
      
      toast.success('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUserInfo({
      role: null,
      status: null,
      name: null,
      address: undefined,
    });
    localStorage.removeItem('userInfo');
    toast.success('Logged out successfully');
    router.push('/');
  };
  
  // Update user info
  const updateUserInfo = (info: Partial<UserInfo>) => {
    setUserInfo(prev => ({
      ...prev,
      ...info
    }));
  };
  
  const value = {
    userRole: userInfo.role,
    verificationStatus: userInfo.status,
    userAddress: userInfo.address,
    isAuthenticated: !!userInfo.role && !!userInfo.address,
    isLoading,
    userName: userInfo.name,
    login,
    logout,
    updateUserInfo
  };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
