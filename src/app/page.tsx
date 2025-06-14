"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  // References for GSAP animations
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // const featuresRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    // Ensure elements exist before animating
    if (
      !titleRef.current ||
      !subtitleRef.current ||
      !cardRef.current
      // !featuresRef.current
    ) {
      console.error("Some refs are not available");
      return;
    }

    // Make sure features section is visible before animating
    document
      .getElementById("features-section")
      ?.scrollIntoView({ behavior: "auto", block: "end" });

    // Initial animations when the page loads
    const tl = gsap.timeline({ defaults: { opacity: 0, ease: "power2.out" } });

    // Fade in and slight y movement for title and subtitle
    tl.from(titleRef.current, {
      y: -30,
      duration: 0.8,
    });

    tl.from(
      subtitleRef.current,
      {
        y: -20,
        duration: 0.8,
      },
      "-=0.4"
    );

    // Card animation with slight bounce
    tl.from(
      cardRef.current,
      {
        y: 40,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.4"
    );

    // First animate the features container
    // tl.from(
    //   featuresRef.current,
    //   {
    //     y: 20,
    //     duration: 0.8,
    //     onComplete: () => {
    //       console.log("Features animation complete", featuresRef.current);
    //     },
    //   },
    //   "-=0.2"
    // );

    // Then do staggered animation for feature cards
    // tl.from(
    //   ".feature-card",
    //   {
    //     y: 30,
    //     stagger: 0.2,
    //     duration: 0.7,
    //   },
    //   "-=0.6"
    // );
  }, []);
  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black text-black dark:text-white">
      <main className="flex flex-col items-center max-w-4xl mx-auto text-center w-full">
        <div className="mb-4">
          <h1
            ref={titleRef}
            className="text-4xl font-bold mb-4 text-black dark:text-white flex items-center justify-center"
          >
            <ShieldCheck className="mr-2 text-yellow-500" size={28} />
            CertifyChain
          </h1>
          <p
            ref={subtitleRef}
            className="text-3xl mb-4 text-gray-800 dark:text-gray-200"
          >
            Verify Authentic Certificates on The Blockchain
          </p>
          <p className="text-gray-600 max-w-xl mx-auto dark:text-gray-300 mb-12">
            Ensure the authenticity of diplomas and certificates with MONADS
            secure and transparent blockchain network
          </p>

          <div
            ref={cardRef}
            className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6 mb-8 border border-gray-200 dark:border-gray-700"
          >
            {/* <Image
              src="/next.svg"
              alt="Ijazah NFT"
              width={200}
              height={100}
              className="mx-auto mb-4"
              priority
            /> */}
            <p className="text-white text-center text-2xl mb-6">
              Get started with CertifyChain!
            </p>

            <div className="flex flex-col space-y-4">
              <Link
                href="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-full flex items-center justify-center transition-all transform hover:scale-105 duration-300"
              >
                Continue with Wallet
                <ArrowRight className="ml-2" size={18} />
              </Link>

              <Link
                href="/auth/sign-up"
                className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white py-3 px-6 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 duration-300"
              >
                Sign Up
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>

        <section id="features-section" className="py-8 w-full">
          <h2 className="text-2xl font-bold mb-6">Our Features</h2>
          <div
            // ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
          >
            <div className="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1 duration-300">
              <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
                For Universities
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Issue and manage digital certificates for your graduates
                securely on the blockchain.
              </p>
            </div>

            <div className="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1 duration-300">
              <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
                For Students
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access and share your academic credentials with potential
                employers easily.
              </p>
            </div>

            <div className="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1 duration-300">
              <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
                For Employers
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Verify academic credentials of candidates instantly with
                complete assurance.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} by CertifyChain. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
