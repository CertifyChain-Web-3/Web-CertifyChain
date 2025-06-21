// context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAccount } from "wagmi";
import { ADMIN_ADDRESSES } from "../lib/admin";

type Role = "admin" | "student" | null;

const AuthContext = createContext<{ role: Role }>({ role: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    if (address) {
      setRole(
        ADMIN_ADDRESSES.includes(address.toLowerCase()) ? "admin" : "student"
      );
    } else {
      setRole(null);
    }
  }, [address]);

  return (
    <AuthContext.Provider value={{ role }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
