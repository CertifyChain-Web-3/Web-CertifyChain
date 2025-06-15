"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Wallet, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function UniversityOnboardingPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "verified" | null
  >(null);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // Submit university documents for verification
  const handleSubmitDocuments = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileName) {
      toast.error("Please upload your university official letter");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to upload documents
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Documents uploaded successfully");
      setStep(2);
    } catch (error) {
      console.error("Error uploading documents:", error);
      toast.error("Failed to upload documents. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Connect campus wallet for university
  const handleConnectCampusWallet = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call to connect campus wallet
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Campus wallet connected successfully");
      setStep(3);
      // Set verification status to pending after connecting wallet
      setVerificationStatus("pending");

      // Simulate API verification process (would happen on backend)
      simulateVerificationProcess();
    } catch (error) {
      console.error("Error connecting campus wallet:", error);
      toast.error("Failed to connect campus wallet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulate university verification process (in a real app, this would be a backend process)
  const simulateVerificationProcess = () => {
    setTimeout(() => {
      setVerificationStatus("verified");
      toast.success("Your university has been verified!");
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          University Onboarding
        </h1>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div
              className={`h-1 flex-1 mx-2 ${
                step >= 2 ? "bg-purple-600" : "bg-gray-200"
              }`}
            />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <div
              className={`h-1 flex-1 mx-2 ${
                step >= 3 ? "bg-purple-600" : "bg-gray-200"
              }`}
            />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Upload Documents</span>
            <span>Connect Wallet</span>
            <span>Verification</span>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmitDocuments} className="space-y-6">
            <div className="p-4 border-2 border-dashed rounded-lg bg-gray-50 text-center cursor-pointer">
              <input
                type="file"
                id="universityDocument"
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <label
                htmlFor="universityDocument"
                className="cursor-pointer block p-4"
              >
                <Upload className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                <h3 className="font-medium mb-1 text-gray-700">
                  Upload official university letter
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  PDF, DOC, or image files up to 10MB
                </p>
                {fileName ? (
                  <div className="mt-2 p-2 bg-purple-50 text-purple-700 rounded-lg">
                    <p className="font-medium text-sm break-all">{fileName}</p>
                  </div>
                ) : (
                  <div className="mt-2 bg-purple-600 text-white py-2 px-4 rounded-lg inline-block">
                    Choose File
                  </div>
                )}
              </label>
            </div>

            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> We require an official university letter
                or documentation to verify your institution. This will be
                manually reviewed by our team.
              </p>
            </div>

            <button
              type="submit"
              disabled={!fileName || isSubmitting}
              className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors disabled:bg-purple-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="p-4 border rounded-lg bg-green-50 text-green-800">
              <CheckCircle className="mx-auto h-10 w-10 text-green-600 mb-4" />
              <h2 className="text-xl font-semibold text-center mb-2">
                Documents Uploaded
              </h2>
              <p className="text-center">
                Your university documents have been uploaded successfully.
                Please connect your campus wallet to continue.
              </p>
            </div>

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
                  <div className="font-mono text-sm break-all bg-gray-100 p-3 rounded text-gray-600">
                    {address}
                  </div>
                </div>

                <button
                  onClick={handleConnectCampusWallet}
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors disabled:bg-purple-300 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Use as Campus Wallet
                      <ArrowRight className="ml-2" size={18} />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={openConnectModal}
                className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors"
              >
                <Wallet className="mr-2" size={18} />
                Connect Campus Wallet
              </button>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {verificationStatus === "pending" ? (
              <div className="p-6 border rounded-lg bg-purple-50 text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-purple-600 mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  Verification in Progress
                </h2>
                <p className="text-gray-700 mb-6">
                  Our team is currently reviewing your university documents.
                  This process typically takes 1-2 business days.
                </p>
                <div className="p-4 bg-white rounded-lg border">
                  <h3 className="font-medium mb-2 text-gray-700">
                    What happens next?
                  </h3>
                  <ol className="text-sm text-left list-decimal pl-5 space-y-2 text-gray-600">
                    <li>Our team reviews your official university letter</li>
                    <li>Your wallet address is added to our whitelist</li>
                    <li>
                      You'll receive a notification when verification is
                      complete
                    </li>
                    <li>
                      Once verified, you can start issuing NFT certificates
                    </li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="p-6 border rounded-lg bg-green-50 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  Verification Successful
                </h2>
                <p className="text-gray-700 mb-6">
                  Your university has been verified! You can now issue NFT
                  certificates for your students.
                </p>

                <Link
                  href="/dashboard"
                  className="bg-purple-600 text-white py-3 px-6 rounded-lg flex items-center justify-center w-full hover:bg-purple-700 transition-colors"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
