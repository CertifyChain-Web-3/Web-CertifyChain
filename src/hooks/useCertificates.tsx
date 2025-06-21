'use client';

import { useReadContract } from 'wagmi';
import { ABI } from '../constants/ABI';
import { CONTRACT_ADDRESS } from '../constants/index';

export function useCertificates() {
  const { data, isLoading, error } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'getAllCertificae',
    args: []
  });

  

  return {
    certificates: data as any[] | undefined,
    isLoading,
    error,
  };
}
