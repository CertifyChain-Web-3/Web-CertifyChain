"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Wallet, UserPlus, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

export default function ChooseTypePage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Refs for GSAP animations
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const loginCardRef = useRef<HTMLDivElement>(null);
  const registerCardRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const registerButtonRef = useRef<HTMLButtonElement>(null);

  // Set isClient to true after component mounts to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle navigation to login page
  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  // Handle navigation to sign-up page
  const handleRegisterClick = () => {
    router.push("/auth/sign-up");
  };

  // Ensure buttons are visible on initial render
  useEffect(() => {
    // Force buttons to be visible
    const forceElementsVisibility = () => {
      // Ensure all buttons are visible
      const allButtons = document.querySelectorAll("button");
      allButtons.forEach((button) => {
        button.style.opacity = "1";
        button.style.visibility = "visible";
        button.style.display = "flex";
      });

      // Specifically target our button refs
      if (loginButtonRef.current) {
        loginButtonRef.current.style.opacity = "1";
        loginButtonRef.current.style.visibility = "visible";
        loginButtonRef.current.style.display = "flex";
      }

      if (registerButtonRef.current) {
        registerButtonRef.current.style.opacity = "1";
        registerButtonRef.current.style.visibility = "visible";
        registerButtonRef.current.style.display = "flex";
      }
    };

    // Call immediately
    forceElementsVisibility();

    // And again after a short delay to ensure DOM is fully rendered
    setTimeout(forceElementsVisibility, 100);

    // And again after animations should be complete
    setTimeout(forceElementsVisibility, 2000);
  }, [isClient]);

  // GSAP animations - only execute when we are on the client
  useEffect(() => {
    // Don't run animations if not on the client
    if (!isClient) return;

    // Create main timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Ensure all elements are visible at the end of animation
        if (pageRef.current) pageRef.current.style.opacity = "1";
        if (titleRef.current) titleRef.current.style.opacity = "1";
        if (subtitleRef.current) subtitleRef.current.style.opacity = "1";
        if (loginCardRef.current) loginCardRef.current.style.opacity = "1";
        if (registerCardRef.current)
          registerCardRef.current.style.opacity = "1";
        if (loginButtonRef.current) {
          loginButtonRef.current.style.opacity = "1";
          loginButtonRef.current.style.visibility = "visible";
          loginButtonRef.current.style.display = "flex";
        }
        if (registerButtonRef.current) {
          registerButtonRef.current.style.opacity = "1";
          registerButtonRef.current.style.visibility = "visible";
          registerButtonRef.current.style.display = "flex";
        }
      },
    });

    // Page fade in
    tl.from(pageRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      clearProps: "all",
    });

    // Title animation
    tl.from(
      titleRef.current,
      {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        clearProps: "all",
      },
      "-=0.3"
    );

    // Subtitle animation
    tl.from(
      subtitleRef.current,
      {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all",
      },
      "-=0.4"
    );

    // Login card animation
    tl.from(
      loginCardRef.current,
      {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.4)",
        clearProps: "all",
      },
      "-=0.2"
    );

    // Register card animation
    tl.from(
      registerCardRef.current,
      {
        x: 40,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.4)",
        clearProps: "all",
      },
      "-=0.6"
    );

    // Add hover animations for cards
    if (loginCardRef.current) {
      loginCardRef.current.addEventListener("mouseenter", () => {
        gsap.to(loginCardRef.current, {
          y: -10,
          scale: 1.03,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      loginCardRef.current.addEventListener("mouseleave", () => {
        gsap.to(loginCardRef.current, {
          y: 0,
          scale: 1,
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

    if (registerCardRef.current) {
      registerCardRef.current.addEventListener("mouseenter", () => {
        gsap.to(registerCardRef.current, {
          y: -10,
          scale: 1.03,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      registerCardRef.current.addEventListener("mouseleave", () => {
        gsap.to(registerCardRef.current, {
          y: 0,
          scale: 1,
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }
  }, [isClient]);

  return (
    <div
      ref={pageRef}
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900"
    >
      <div className="w-full max-w-4xl mx-auto text-center mb-12">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
        >
          Welcome to CertifyChain
        </h1>
        <p ref={subtitleRef} className="text-xl text-white">
          Choose how you want to access the platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Login Card */}
        <div
          ref={loginCardRef}
          onClick={handleLoginClick}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-purple-500"
        >
          <div className="h-20 w-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="h-10 w-10 text-purple-600 dark:text-purple-400" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
            Login with Wallet
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
            Access your existing account by connecting your blockchain wallet
          </p>

          <button
            ref={loginButtonRef}
            className="w-full bg-purple-600 dark:bg-purple-700 text-white py-3 rounded-lg flex items-center justify-center hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
            style={{ opacity: 1, visibility: "visible", display: "flex" }}
          >
            <Wallet className="mr-2" size={18} />
            Login
            <ArrowRight className="ml-2" size={18} />
          </button>
        </div>

        {/* Register Card */}
        <div
          ref={registerCardRef}
          onClick={handleRegisterClick}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-purple-500"
        >
          <div className="h-20 w-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserPlus className="h-10 w-10 text-purple-600 dark:text-purple-400" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
            Register with Wallet
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
            Create a new account by connecting your blockchain wallet
          </p>

          <button
            ref={registerButtonRef}
            className="w-full bg-purple-600 dark:bg-purple-700 text-white py-3 rounded-lg flex items-center justify-center hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
            style={{ opacity: 1, visibility: "visible", display: "flex" }}
          >
            <UserPlus className="mr-2" size={18} />
            Register
            <ArrowRight className="ml-2" size={18} />
          </button>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-10 text-center">
        <Link
          href="/"
          className="hover:text-purple-400 text-purple-300 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
