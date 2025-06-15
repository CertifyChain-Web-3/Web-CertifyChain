"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  Wallet,
  ArrowRight,
  Loader2,
  CheckCircle,
  Shield,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import useAddressVerification from "../../hooks/useAddressVerification";
import gsap from "gsap";

// We're using the imported hook now

export default function LoginPage() {
  // Create a state to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after component mounts to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);
  // Refs for GSAP animations
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // GSAP animations - sólo ejecutar cuando estamos en el cliente
  useEffect(() => {
    // No ejecutar animaciones si no estamos en el cliente
    if (!isClient) return;

    // Forzar visibilidad del botón directamente si existe
    if (buttonRef.current) {
      buttonRef.current.style.opacity = "1";
      buttonRef.current.style.transform = "none";
      buttonRef.current.style.visibility = "visible";
      buttonRef.current.style.display = "flex";
    }

    // Verificar que todos los refs existan antes de animar
    if (
      !pageRef.current ||
      !cardRef.current ||
      !titleRef.current ||
      !contentRef.current
    ) {
      console.error("Some refs are not available");
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Asegurar que todo sea visible al final de la animación
        if (pageRef.current) pageRef.current.style.opacity = "1";
        if (cardRef.current) cardRef.current.style.opacity = "1";
        if (titleRef.current) titleRef.current.style.opacity = "1";
        if (contentRef.current) contentRef.current.style.opacity = "1";
        if (buttonRef.current) {
          buttonRef.current.style.opacity = "1";
          buttonRef.current.style.transform = "none";
          buttonRef.current.style.visibility = "visible";
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

    // Card entrance
    tl.from(
      cardRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.4)",
        clearProps: "all",
      },
      "-=0.2"
    );

    // Title animation
    tl.from(
      titleRef.current,
      {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all",
      },
      "-=0.4"
    );

    // Content fade in
    tl.from(
      contentRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        clearProps: "all",
      },
      "-=0.2"
    );

    // Button entrance animation - solo si existe
    if (buttonRef.current) {
      tl.from(
        buttonRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          clearProps: "all",
          onComplete: () => {
            // Doble verificación de visibilidad del botón
            if (buttonRef.current) {
              buttonRef.current.style.opacity = "1";
              buttonRef.current.style.transform = "none";
              buttonRef.current.style.visibility = "visible";
            }
          },
        },
        "-=0.2"
      );
    }
  }, [isClient]);
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const {
    login,
    isAuthenticated,
    isLoading: isAuthLoading,
    userRole,
  } = useUser();
  const { checkAddressRole, isLoading: isVerificationLoading } =
    useAddressVerification();
  const [isChecking, setIsChecking] = useState(false);
  const [loginStep, setLoginStep] = useState<
    "initial" | "checking" | "success" | "notRegistered"
  >("initial");

  // Check if user is already authenticated and redirect if needed
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Function to handle login process
  const handleLogin = async () => {
    if (!address) return;

    setIsChecking(true);
    setLoginStep("checking");

    try {
      // Check if the address is registered using our address verification hook
      const { isRegistered, role } = await checkAddressRole(address);

      if (isRegistered && role) {
        // If registered, use the login function from UserContext
        await login();
        setLoginStep("success");
        toast.success("Login successful!");

        // Brief delay before redirect to show success state
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        // If not registered, update UI state
        setLoginStep("notRegistered");

        // Brief delay before redirect to check-address page
        setTimeout(() => {
          router.push(`/auth/check-address?address=${address}`);
        }, 1500);
      }
    } catch (error) {
      toast.error("Error checking wallet address");
      console.error("Login error:", error);
      setLoginStep("initial");
    } finally {
      setIsChecking(false);
    }
  };

  // Animation effects for different states - sólo ejecutar cuando estamos en el cliente
  useEffect(() => {
    // No ejecutar animaciones si no estamos en el cliente
    if (!isClient) return;

    // Forzar visibilidad de los botones y elementos de UI
    const forceElementsVisibility = () => {
      const allButtons = document.querySelectorAll("button");
      allButtons.forEach((button) => {
        button.style.opacity = "1";
        button.style.visibility = "visible";
      });

      // Asegurarnos que elementos con clases específicas sean visibles
      const successElements = document.querySelectorAll(
        ".success-icon, .success-text, .progress-bar"
      );
      successElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = "1";
          el.style.visibility = "visible";
        }
      });

      const notRegisteredElements = document.querySelectorAll(
        ".not-registered-icon, .not-registered-text, .progress-bar-blue"
      );
      notRegisteredElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = "1";
          el.style.visibility = "visible";
        }
      });
    };

    // Primera ejecución para elementos que ya existen
    forceElementsVisibility();

    // Ejecutar nuevamente después de un breve retraso para asegurar que DOM esté completamente cargado
    setTimeout(forceElementsVisibility, 500);

    if (loginStep === "success") {
      // Success animation
      gsap.fromTo(
        ".success-icon",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          clearProps: "all",
          onComplete: forceElementsVisibility,
        }
      );

      gsap.fromTo(
        ".success-text",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.2,
          clearProps: "all",
          onComplete: forceElementsVisibility,
        }
      );

      gsap.fromTo(
        ".progress-bar",
        { width: 0 },
        {
          width: "100%",
          duration: 1.5,
          ease: "power1.inOut",
          clearProps: "width", // No limpiar width ya que es parte de la animación de progreso
          onComplete: forceElementsVisibility,
        }
      );
    } else if (loginStep === "notRegistered") {
      // Not registered animation
      gsap.fromTo(
        ".not-registered-icon",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          clearProps: "all",
          onComplete: forceElementsVisibility,
        }
      );

      gsap.fromTo(
        ".not-registered-text",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.2,
          clearProps: "all",
          onComplete: forceElementsVisibility,
        }
      );

      gsap.fromTo(
        ".progress-bar-blue",
        { width: 0 },
        {
          width: "100%",
          duration: 1.5,
          ease: "power1.inOut",
          clearProps: "width", // No limpiar width ya que es parte de la animación de progreso
          onComplete: forceElementsVisibility,
        }
      );
    } else if (loginStep === "initial") {
      // Asegurar que el botón siempre sea visible independientemente de la conexión
      const connectButton = document.querySelector("button");
      if (connectButton && connectButton instanceof HTMLElement) {
        connectButton.style.opacity = "1";
        connectButton.style.visibility = "visible";
        connectButton.style.display = "flex";
      }

      // Solo aplicar animación de pulso si hay conexión
      if (!isConnected && buttonRef.current) {
        // Add a subtle pulse animation to the connect button
        gsap.to(buttonRef.current, {
          scale: 1.03,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          onUpdate: function () {
            // Asegurar que el botón siempre sea visible durante la animación
            if (buttonRef.current) {
              buttonRef.current.style.opacity = "1";
              buttonRef.current.style.visibility = "visible";
            }
          },
        });
      }
    }

    // Asegurar visibilidad después de todas las animaciones
    return () => {
      forceElementsVisibility();
    };
  }, [loginStep, isConnected, isClient]);

  // Determine what to show based on login step
  const renderLoginContent = () => {
    if (loginStep === "success") {
      return (
        <div className="text-center p-6 rounded-lg border border-green-100 dark:border-green-900 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
          <CheckCircle className="success-icon w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h2 className="success-text text-xl font-bold mb-2 text-green-800 dark:text-green-300">
            Login Successful!
          </h2>
          <p className="success-text text-green-700 dark:text-green-400 mb-4">
            Redirecting to dashboard...
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="progress-bar bg-green-500 dark:bg-green-400 h-2 rounded-full"></div>
          </div>
        </div>
      );
    }

    if (loginStep === "notRegistered") {
      return (
        <div className="text-center p-6 rounded-lg border border-blue-100 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
          <XCircle className="not-registered-icon w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h2 className="not-registered-text text-xl font-bold mb-2 text-blue-800 dark:text-blue-300">
            Address Not Registered
          </h2>
          <p className="not-registered-text text-blue-700 dark:text-blue-400 mb-4">
            Redirecting to registration...
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="progress-bar-blue bg-blue-500 dark:bg-blue-400 h-2 rounded-full"></div>
          </div>
        </div>
      );
    }

    // Using a useEffect for client-side wallet connection status
    // For SSR, we'll always render the same initial structure to avoid hydration mismatch
    // Client will update the UI after hydration based on wallet connection
    return (
      <div className="space-y-4">
        {isConnected && (
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Connected Wallet
              </span>
              <button
                onClick={() => disconnect()}
                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                Disconnect
              </button>
            </div>
            <div className="font-mono text-sm break-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 p-3 rounded">
              {address}
            </div>
          </div>
        )}

        <div
          style={{
            display: "block",
            opacity: 1,
            visibility: "visible",
            minHeight: "44px",
          }}
        >
          {isConnected ? (
            <button
              ref={buttonRef}
              onClick={handleLogin}
              disabled={isChecking || isAuthLoading}
              style={{ opacity: 1, visibility: "visible" }}
              className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-600 transition-all transform hover:scale-105 duration-300 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:transform-none"
            >
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Checking Address...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>
          ) : (
            <button
              ref={buttonRef}
              onClick={openConnectModal}
              style={{ opacity: 1, visibility: "visible" }}
              className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-600 transition-all transform hover:scale-105 duration-300"
            >
              <Wallet className="mr-2" size={18} />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={pageRef}
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black"
    >
      <div
        ref={cardRef}
        className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700"
      >
        <h1
          ref={titleRef}
          className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-black dark:text-white"
        >
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Login
        </h1>

        <div ref={contentRef} className="space-y-6">
          {/* Renderizar contenido solo cuando estemos en el cliente para evitar errores de hidratación */}
          {isClient ? (
            renderLoginContent()
          ) : (
            <div className="space-y-6">
              <div className="min-h-[200px] flex items-center justify-center">
                <span className="text-gray-500">Loading...</span>
              </div>
              {/* Botón estático de respaldo para garantizar visibilidad */}
              <div
                style={{ display: "block", opacity: 1, visibility: "visible" }}
              >
                <button
                  style={{ opacity: 1, visibility: "visible" }}
                  className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center"
                >
                  <Wallet className="mr-2" size={18} />
                  Connect Wallet
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
