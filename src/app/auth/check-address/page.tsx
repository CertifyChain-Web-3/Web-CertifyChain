"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import gsap from "gsap";

export default function CheckAddressPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const address = searchParams.get("address");

  const [isChecking, setIsChecking] = useState(true);
  const [isWhitelisted, setIsWhitelisted] = useState<boolean | null>(null);
  const [userType, setUserType] = useState<"university" | "student" | null>(
    null
  );

  // Refs for GSAP animations
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);

  // GSAP animations
  useEffect(() => {
    // Initial page load animation
    const tl = gsap.timeline();

    // Fade in the page
    tl.from(pageRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    // Card entrance animation
    tl.from(
      cardRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.4)",
      },
      "-=0.2"
    );

    // Icon pulse animation
    tl.to(iconRef.current, {
      scale: 1.1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Address text animation
    if (addressRef.current) {
      tl.from(
        addressRef.current,
        {
          opacity: 0,
          x: -20,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=1"
      );
    }
  }, []);
  // States already defined above

  useEffect(() => {
    if (!address) {
      router.push("/auth/login");
      return;
    }

    // Simulate API check for whitelist status
    const checkWhitelistStatus = async () => {
      try {
        // In a real application, you would call your API here
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For demo purposes, randomly determine if address is whitelisted
        const whitelisted = Math.random() > 0.3;
        setIsWhitelisted(whitelisted);

        if (whitelisted) {
          // If whitelisted, randomly assign a user type for demo
          setUserType(Math.random() > 0.5 ? "university" : "student");
        }
      } catch (error) {
        console.error("Error checking whitelist status:", error);
        toast.error("Failed to check wallet status");
      } finally {
        setIsChecking(false);
      }
    };

    checkWhitelistStatus();
  }, [address, router]);

  return (
    <div
      ref={pageRef}
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black text-black dark:text-white"
    >
      <div
        ref={cardRef}
        className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Address Verification
        </h1>

        {isChecking ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div ref={iconRef}>
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400 mb-4" />
            </div>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Checking wallet address...
            </p>
            <p
              ref={addressRef}
              className="text-sm text-gray-500 dark:text-gray-400 mt-2 break-all"
            >
              {address}
            </p>
          </div>
        ) : isWhitelisted ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800">
              <div ref={iconRef}>
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mb-2" />
              </div>
              <h2 className="text-xl font-semibold mb-1">Verified Account</h2>
              <p className="text-center">
                Your wallet is verified as a{" "}
                <span className="font-bold">
                  {userType === "university" ? "University" : "Student/Company"}
                </span>
              </p>
            </div>

            <div
              ref={contentRef}
              className="p-4 border rounded-lg border-gray-200 dark:border-gray-700"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {userType === "university"
                  ? "You can now upload and manage academic certificates as NFTs."
                  : "You can now view and verify academic certificates."}
              </p>

              <Link
                href="/dashboard"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800">
              <div ref={iconRef}>
                <XCircle className="h-12 w-12 text-red-600 dark:text-red-400 mb-2" />
              </div>
              <h2 className="text-xl font-semibold mb-1">Not Verified</h2>
              <p className="text-center">
                Your wallet address is not recognized in our system.
              </p>
            </div>

            <div
              ref={contentRef}
              className="p-4 border rounded-lg border-gray-200 dark:border-gray-700"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To use our platform, please sign up with your wallet address.
              </p>

              <div className="flex flex-col space-y-3">
                <Link
                  href="/auth/sign-up"
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-all transform hover:scale-105 duration-300"
                >
                  Sign Up Now
                  <ArrowRight className="ml-2" size={18} />
                </Link>

                <Link
                  href="/"
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
