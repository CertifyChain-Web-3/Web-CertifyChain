"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  ArrowRight,
  Wallet,
  Loader2,
  UserPlus,
  Building2,
  User,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const [userType, setUserType] = useState<"university" | "student" | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSignUp = async (type: "university" | "student") => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setUserType(type);
    setIsProcessing(true);

    try {
      // Simulate API call to register the address
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to appropriate onboarding page based on user type
      if (type === "university") {
        router.push("/onboarding/university");
      } else {
        router.push("/onboarding/student");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("Failed to sign up. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Sign Up
        </h1>

        {isConnected ? (
          <div className="space-y-6">
            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-gray-700">
                  Connected Wallet
                </span>
                <button
                  onClick={() => disconnect()}
                  className="text-sm text-red-600 underline cursor-pointer hover:text-red-800"
                >
                  Disconnect
                </button>
              </div>
              <div className="font-mono text-sm break-all bg-gray-100 text-gray-600 p-3 rounded">
                {address}
              </div>
            </div>

            {!userType ? (
              <div className="space-y-4">
                <p className="text-gray-700">I am registering as:</p>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => handleSignUp("university")}
                    disabled={isProcessing}
                    className="flex items-center p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-700">
                        University
                      </h3>
                      <p className="text-sm text-gray-500">
                        Issue NFT certificates to graduates
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSignUp("student")}
                    disabled={isProcessing}
                    className="flex items-center p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-700">
                        Student / Employer
                      </h3>
                      <p className="text-sm text-gray-500">
                        View and verify certificates
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-gray-600">
                  Setting up your account...
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-6 border rounded-lg bg-gray-50 text-center">
              <UserPlus className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-gray-600">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 mb-4">
                Connect your blockchain wallet to register your account. This
                will be used to sign and verify transactions.
              </p>

              <button
                onClick={openConnectModal}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center mx-auto hover:bg-blue-700 transition-colors"
              >
                <Wallet className="mr-2" size={18} />
                Connect Wallet
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
