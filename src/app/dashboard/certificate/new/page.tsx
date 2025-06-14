"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export default function NewCertificatePage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [certificateData, setCertificateData] = useState({
    title: "",
    studentName: "",
    studentWallet: "",
    issueDate: "",
    expiryDate: "",
    certificateId: "",
    description: "",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCertificateData({
      ...certificateData,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !certificateData.title ||
      !certificateData.studentWallet ||
      !certificateData.issueDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!fileName) {
      toast.error("Please upload a certificate file");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API/blockchain interaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Certificate successfully minted as NFT!");
      setCurrentStep(2);
    } catch (error) {
      console.error("Error minting certificate:", error);
      toast.error("Failed to mint certificate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-blue-600 flex items-center hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg">
          <div className="border-b border-gray-200">
            <div className="px-6 py-5">
              <h1 className="text-2xl font-bold text-gray-900">
                Issue New Certificate
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Create a new NFT certificate for a student
              </p>
            </div>
          </div>

          {currentStep === 1 ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={certificateData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Bachelor of Computer Science"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={certificateData.studentName}
                    onChange={handleInputChange}
                    placeholder="Full name of the recipient"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Wallet Address{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentWallet"
                    value={certificateData.studentWallet}
                    onChange={handleInputChange}
                    placeholder="0x..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    value={certificateData.issueDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date (if applicable)
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={certificateData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate ID/Number
                  </label>
                  <input
                    type="text"
                    name="certificateId"
                    value={certificateData.certificateId}
                    onChange={handleInputChange}
                    placeholder="e.g. 2025-CS-001"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description/Achievements
                </label>
                <textarea
                  name="description"
                  value={certificateData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Additional details about the certificate or student achievements"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate File <span className="text-red-500">*</span>
                </label>
                <div
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
                  onClick={() =>
                    document.getElementById("certificateFile")?.click()
                  }
                >
                  <div className="space-y-1 text-center">
                    <input
                      id="certificateFile"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="certificateFile"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, JPG, PNG up to 10MB
                    </p>

                    {fileName && (
                      <div className="mt-3 text-center sm:mt-5">
                        <div className="p-2 bg-blue-50 text-blue-700 rounded-lg inline-flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>{fileName}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Minting Certificate...
                    </>
                  ) : (
                    "Mint Certificate as NFT"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Certificate Minted Successfully!
              </h3>
              <p className="text-gray-600 mb-8">
                The certificate has been issued as an NFT and will be visible to
                the recipient.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-8 inline-block">
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-1">Transaction Hash</p>
                  <p className="font-mono text-sm break-all">
                    0x8fb1356e2c9c1a9c25d368f1944c1a9cd2bd4d1ac122b0fb8263f3a948826324
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
                <Link
                  href="/dashboard"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  Return to Dashboard
                </Link>
                <button
                  onClick={() => {
                    setCertificateData({
                      title: "",
                      studentName: "",
                      studentWallet: "",
                      issueDate: "",
                      expiryDate: "",
                      certificateId: "",
                      description: "",
                    });
                    setFileName("");
                    setCurrentStep(1);
                  }}
                  className="border border-blue-600 text-blue-600 py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  Issue Another Certificate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
