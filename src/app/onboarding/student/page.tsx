"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Wallet, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function StudentOnboardingPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "student", // 'student' or 'company'
    studentId: "",
    companyName: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit user information
  const handleSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.type === "student" && !formData.studentId) {
      toast.error("Please enter your student ID");
      return;
    }

    if (formData.type === "company" && !formData.companyName) {
      toast.error("Please enter your company name");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to submit user information
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Information submitted successfully");
      setStep(2);
    } catch (error) {
      console.error("Error submitting information:", error);
      toast.error("Failed to submit information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Connect wallet for student/company
  const handleConnectWallet = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call to register wallet
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Wallet connected successfully");
      setStep(3);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          {formData.type === "student" ? "Student" : "Company"} Onboarding
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
            <span>Personal Info</span>
            <span>Connect Wallet</span>
            <span>Complete</span>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmitInfo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-500"
              >
                <option value="student">Student</option>
                <option value="company">Company/Employer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-500"
                required
              />
            </div>

            {formData.type === "student" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID / Registration Number
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Enter your student ID"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-500"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-500"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors disabled:bg-purple-300 mt-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
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
                Information Recorded
              </h2>
              <p className="text-center">
                Your personal information has been recorded. Please connect your
                wallet to continue.
              </p>
            </div>

            {isConnected ? (
              <div className="space-y-6">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-500">
                      Connected Wallet
                    </span>
                    <button
                      onClick={() => disconnect()}
                      className="text-sm underline text-red-600 hover:text-red-800"
                    >
                      Disconnect
                    </button>
                  </div>
                  <div className="font-mono text-sm break-all bg-gray-100 p-3 rounded text-gray-500">
                    {address}
                  </div>
                </div>

                <button
                  onClick={handleConnectWallet}
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors disabled:bg-purple-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Wallet Connection
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
                Connect Wallet
              </button>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="p-6 border rounded-lg bg-green-50 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Registration Complete
            </h2>
            <p className="text-gray-700 mb-6">
              {formData.type === "student"
                ? "Your student account has been set up successfully! You can now view and share your academic credentials."
                : "Your company account has been set up successfully! You can now verify academic credentials of candidates."}
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
    </div>
  );
}
