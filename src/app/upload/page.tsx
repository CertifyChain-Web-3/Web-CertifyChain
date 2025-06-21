"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Static assets in the public directory are accessed from the root URL
import Image from "next/image";
import {
  Shield,
  Zap,
  Network,
  Upload,
  Blocks,
  CheckCircle,
  Star,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import toast from "react-hot-toast";
import ButtonDirectAuth from "@/components/customs/ButtonDirectAuth";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-certificate",
        { opacity: 0, x: 50, rotation: -5 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 1.2,
          delay: 0.6,
          ease: "power3.out",
        }
      );

      // Feature badges animation
      gsap.fromTo(
        ".feature-badge",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      // Scroll-triggered animations
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        }
      );

      gsap.fromTo(
        ".step-item",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".certificate-showcase",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: certificateRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleVerifyCertificate = () => {
    router.push("/dashboard");
  };

  const handleGetStarted = () => {
    router.push("/auth/sign-up");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-purple-900/90 backdrop-blur-sm border-b border-purple-700/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/logo-long.png"
              alt="Logo"
              height={60}
              width={120}
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-white hover:text-purple-200 transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-white hover:text-purple-200 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-white hover:text-purple-200 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#contact"
              className="text-white hover:text-purple-200 transition-colors"
            >
              Contact Us
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <ButtonDirectAuth />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="hero-title text-5xl lg:text-6xl font-bold text-white mb-6">
                Secure Certificate
                <br />
                <span className="text-purple-200">Verification</span>
              </h1>

              <p className="hero-subtitle text-xl text-purple-100 mb-8 max-w-2xl">
                Verify diplomas, degrees, and certifications instantly using
                MONAD Network blockchain technology
              </p>

              <div className="hero-cta">
                {/* <Button
                  onClick={handleVerifyCertificate}
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-3 text-lg font-semibold rounded-full"
                >
                  Verify Certificates Now
                </Button> */}
                <ConnectButton />
                {isConnected && (
                  <div className="flex items-end">
                    <Button
                      onClick={handleVerifyCertificate}
                      size="lg"
                      className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-3 text-lg font-semibold rounded-full"
                    >
                      Verify Certificates Now
                    </Button>
                  </div>
                )}
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12">
                <div className="feature-badge flex items-center space-x-2 text-purple-200">
                  <Shield className="w-5 h-5" />
                  <span>Blockchain Secured</span>
                </div>
                <div className="feature-badge flex items-center space-x-2 text-purple-200">
                  <Blocks className="w-5 h-5" />
                  <span>Immutable Records</span>
                </div>
                <div className="feature-badge flex items-center space-x-2 text-purple-200">
                  <CheckCircle className="w-5 h-5" />
                  <span>Instant Verification</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="hero-certificate relative">
                <Card className="w-96 h-[510px] bg-gradient-to-b from-amber-50 to-amber-100 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 border-2 border-amber-200">
                  <CardContent className="p-2 h-full flex flex-col justify-between text-center relative">
                    {/* Document Number */}
                    <div className="absolute -top-4 left-2 border border-red-600 px-1 py-0.5">
                      <span className="text-[8px] font-bold text-red-600">
                        Nomor: 1180943/H1.9/LT.01/2024/011/2003
                      </span>
                    </div>

                    {/* University Logo */}
                    <div className="mt-6">
                      <div className="w-12 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Shield className="w-7 h-7 text-yellow-900" />
                      </div>

                      {/* Institution Header */}
                      <div className="mb-3">
                        <h3 className="text-[9px] font-bold text-gray-800 mb-1">
                          DEPARTEMEN PENDIDIKAN NASIONAL
                        </h3>
                        <h2 className="text-[11px] font-bold text-gray-900 mb-1">
                          UNIVERSITAS GAJAH MADA
                        </h2>
                        <p className="text-[8px] text-gray-600 italic">
                          dengan ini menyatakan bahwa
                        </p>
                      </div>

                      {/* Student Photo Placeholder */}
                      <div className="w-16 h-20 bg-gray-800 border border-gray-600 mx-auto mb-3"></div>
                      <p className="text-[11px] font-bold text-gray-700 mb-2">
                        Satoshi Nakamoto
                      </p>

                      {/* Birth Information */}
                      <p className="text-[8px] text-gray-700 mb-2">
                        Lahir di <strong>Jakarta</strong> tanggal{" "}
                        <strong>15 Juni 1995</strong>
                      </p>

                      {/* Academic Text */}
                      <p className="text-[7px] text-gray-700 leading-tight mb-2">
                        Telah menyelesaikan dengan baik dan memenuhi segala
                        syarat pendidikan Sarjana (S1)
                        <br />
                        pada Program Studi Teknik Elektro Fakultas Teknik
                        <br />
                        Oleh sebab itu kepadanya diberikan gelar dan sebutan
                      </p>

                      {/* Degree Title */}
                      <h3 className="text-sm font-bold text-gray-900 mb-2 italic">
                        Sarjana Teknik (S.T.)
                      </h3>

                      <p className="text-[7px] text-gray-700 mb-2">
                        beserta segala hak dan kewajiban yang melekat pada gelar
                        tersebut.
                      </p>

                      {/* Graduation Date */}
                      <div className="border border-red-600 px-1 py-0.5 inline-block mb-3">
                        <span className="text-[8px] font-bold text-red-600">
                          Diwisuda di Makassar pada tanggal 14 Mei 2024
                        </span>
                      </div>
                    </div>

                    {/* Bottom Section with Signatures */}
                    <div className="flex justify-between items-end">
                      {/* Dean Section */}
                      <div className="text-left">
                        <p className="text-[8px] font-bold text-gray-800 mb-1">
                          DEKAN
                        </p>
                        <div className="w-16 h-8 mb-1">
                          <div className="text-[6px] italic text-gray-600">
                            Prof.Dr.Ir. H.Muh. Saleh Pallu, M.Eng
                          </div>
                          <div className="text-[6px] text-gray-600">
                            NIP: 196109051986031002
                          </div>
                        </div>
                      </div>

                      {/* Official Seal */}
                      <div className="flex-1 flex justify-center">
                        <div className="w-12 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-700">
                          <Shield className="w-6 h-6 text-yellow-900" />
                        </div>
                      </div>

                      {/* Rector Section */}
                      <div className="text-right">
                        <p className="text-[8px] font-bold text-gray-800 mb-1">
                          REKTOR
                        </p>
                        <div className="w-16 h-8 mb-1">
                          <div className="text-[6px] italic text-gray-600">
                            Prof.Dr.dr.Idrus A. Paturusi
                          </div>
                          <div className="text-[6px] text-gray-600">
                            NIP: 196208291987031002
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="features" ref={featuresRef} className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose CertifyChain?
            </h2>
            <p className="text-xl text-purple-200">
              Powered by MONAD Network for unparalleled security and
              transparency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card bg-white/10 backdrop-blur-sm border-purple-500/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Guaranteed Security
                </h3>
                <p className="text-purple-200">
                  MONAD Network blockchain ensures your certificates are
                  tamper-proof and permanently verified
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card bg-white/10 backdrop-blur-sm border-purple-500/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Easy Access
                </h3>
                <p className="text-purple-200">
                  Simple one-click verification process accessible from
                  anywhere, anytime
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card bg-white/10 backdrop-blur-sm border-purple-500/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  MONAD Network
                </h3>
                <p className="text-purple-200">
                  Built on cutting-edge blockchain technology for maximum
                  reliability and transparency
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" ref={stepsRef} className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-purple-200">
              Simple 3-step process for secure certificate verification
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="step-item text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-purple-900">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Upload Certificate
              </h3>
              <p className="text-purple-200 mb-6">
                Upload your certificate to the MONAD Network blockchain via
                smart contracts
              </p>
              <Upload className="w-12 h-12 text-purple-300 mx-auto" />
            </div>

            <div className="step-item text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-purple-900">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Blockchain Processing
              </h3>
              <p className="text-purple-200 mb-6">
                Smart contracts process and permanently store the blockchain
                network
              </p>
              <Blocks className="w-12 h-12 text-purple-300 mx-auto" />
            </div>

            <div className="step-item text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-purple-900">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Instant Verification
              </h3>
              <p className="text-purple-200 mb-6">
                Users can instantly verify the authenticity with a simple search
              </p>
              <CheckCircle className="w-12 h-12 text-purple-300 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Web3 Powered Certificates */}
      <section ref={certificateRef} className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Web3 Powered Certificates
            </h2>
            <p className="text-xl text-purple-200">
              Blockchain-verified credentials with immutable proof of
              authenticity
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="certificate-showcase">
              <Card className="w-full max-w-md mx-auto bg-purple-400 shadow-2xl flex items-center justify-center">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  height={180}
                  width={180}
                />
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Next-Generation Credentials
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-purple-300 mt-1" />
                  <div>
                    <p className="text-white font-semibold">
                      Unique blockchain hash for each certificate ensures
                      authenticity
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-purple-300 mt-1" />
                  <div>
                    <p className="text-white font-semibold">
                      Immutable timestamps prevent backdating
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-purple-300 mt-1" />
                  <div>
                    <p className="text-white font-semibold">
                      Tamper-proof design with cryptographic signatures
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-purple-200">
              Trusted by educators, students, and HR professionals worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/assets/sarah.jpg"
                    alt="Logo"
                    height={40}
                    width={40}
                    className="w-12 h-12 rounded-full mr-4 object-cover center"
                  />
                  <div>
                    <h4 className="text-white font-semibold">Sarah Johnson</h4>
                    <p className="text-purple-200 text-sm">
                      University Registrar
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-purple-100">
                  "CertifyChain has revolutionized how we verify our digital
                  credentials. The blockchain technology gives us complete
                  confidence in authenticity."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/assets/michael.jpg"
                    alt="Logo"
                    height={40}
                    width={40}
                    className="w-12 h-12 rounded-full mr-4 object-cover center"
                  />
                  <div>
                    <h4 className="text-white font-semibold">Michael Chen</h4>
                    <p className="text-purple-200 text-sm">HR Director</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-purple-100">
                  "Instant verification saves us hours of manual checking.
                  CertifyChain has streamlined our entire hiring process."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/assets/emily.jpg"
                    alt="Logo"
                    height={40}
                    width={40}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">
                      Dr. Emily Rodriguez
                    </h4>
                    <p className="text-purple-200 text-sm">Academic Dean</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-purple-100">
                  "The security and transparency of blockchain technology makes
                  CertifyChain the perfect solution for academic credentials."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-purple-950 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/assets/logo-long.png"
                alt="Logo"
                height={70}
                width={120}
                className="mb-2"
              />
              <p className="text-purple-200 text-sm">
                Next-generation certificate powered by MONAD Network blockchain
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Get Started</h4>
              <Button
                onClick={handleGetStarted}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4"
              >
                Sign Up Now
              </Button>
              <div className="flex space-x-4">
                <Twitter className="w-5 h-5 text-purple-200 hover:text-white cursor-pointer transition-colors" />
                <Github className="w-5 h-5 text-purple-200 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-purple-200 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          <div className="border-t border-purple-800 mt-8 pt-8 text-center">
            <p className="text-purple-300 text-sm">
              © 2025 CertifyChain. All rights reserved. Powered by MONAD Network
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
