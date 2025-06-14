'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export type UserRole = 'university' | 'student' | null;
export type VerificationStatus = 'pending' | 'verified' | 'rejected' | null;

interface UseAddressVerificationReturn {
  checkAddressRole: (address: string) => Promise<{
    isRegistered: boolean;
    role: UserRole;
  }>;
  checkWhitelistStatus: (address: string) => Promise<{
    isWhitelisted: boolean;
    role: UserRole;
  }>;
  registerAddress: (address: string, role: UserRole, metadata: any) => Promise<boolean>;
  verificationStatus: VerificationStatus;
  userRole: UserRole;
  isLoading: boolean;
}

export default function useAddressVerification(): UseAddressVerificationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);

  /**
   * Check if an address is registered and get its role
   */
  const checkAddressRole = async (address: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to your backend
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, randomly determine if registered
      const isRegistered = Math.random() > 0.3;
      const role: UserRole = isRegistered ? (Math.random() > 0.5 ? 'university' : 'student') : null;
      
      if (isRegistered) {
        setUserRole(role);
        setVerificationStatus('verified');
      }
      
      return { isRegistered, role };
    } catch (error) {
      console.error('Error checking address:', error);
      toast.error('Failed to verify wallet address');
      return { isRegistered: false, role: null };
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Check if an address is whitelisted
   */
  const checkWhitelistStatus = async (address: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to check whitelist status
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, randomly determine if whitelisted
      const isWhitelisted = Math.random() > 0.3;
      const role: UserRole = isWhitelisted ? (Math.random() > 0.5 ? 'university' : 'student') : null;
      
      if (isWhitelisted) {
        setUserRole(role);
        setVerificationStatus('verified');
      }
      
      return { isWhitelisted, role };
    } catch (error) {
      console.error('Error checking whitelist status:', error);
      toast.error('Failed to check whitelist status');
      return { isWhitelisted: false, role: null };
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Register a new address with specified role and metadata
   */
  const registerAddress = async (address: string, role: UserRole, metadata: any) => {
    if (!address || !role) {
      toast.error('Address and role are required');
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to register the address
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUserRole(role);
      
      if (role === 'university') {
        // For universities, set status to pending as they need manual verification
        setVerificationStatus('pending');
        toast.success('University registration submitted for verification');
      } else {
        // For students/companies, verification is automatic
        setVerificationStatus('verified');
        toast.success('Registration successful!');
      }
      
      return true;
    } catch (error) {
      console.error('Error registering address:', error);
      toast.error('Failed to register address');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    checkAddressRole,
    checkWhitelistStatus,
    registerAddress,
    verificationStatus,
    userRole,
    isLoading
  };
}
