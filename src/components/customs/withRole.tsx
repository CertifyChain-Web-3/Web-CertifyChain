// components/withRole.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withRole(
  Component: React.FC,
  allowedRole: "admin" | "student"
) {
  return function ProtectedPage() {
    const { role } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (role && role !== allowedRole) {
        router.push("/student");
      }
    }, [role]);

    if (!role || role !== allowedRole) return null;

    return <Component />;
  };
}
