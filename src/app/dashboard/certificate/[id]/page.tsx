"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Share2,
  ExternalLink,
  Shield,
  FileText,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import Image from "next/image";

// Mock certificate data
const mockCertificateData = {
  id: "1",
  title: "Bachelor of Computer Science",
  university: "University of Technology",
  universityWallet: "0xabcd1234abcd1234abcd1234abcd1234abcd1234",
  recipientName: "John Doe",
  recipientWallet: "0x1234abcd1234abcd1234abcd1234abcd1234abcd",
  issueDate: "2025-05-15",
  expiryDate: "2045-05-15",
  description:
    "This certificate is awarded for successful completion of the Bachelor of Computer Science program with honors, specializing in Artificial Intelligence and Machine Learning.",
  certificateId: "2025-CS-001",
  tokenId: "42",
  transactionHash:
    "0x8fb1356e2c9c1a9c25d368f1944c1a9cd2bd4d1ac122b0fb8263f3a948826324",
  blockNumber: 12345678,
  timestamp: "2025-05-15T09:30:45Z",
};

export default function CertificateViewPage() {
  const router = useRouter();
  const params = useParams();
  const { address } = useAccount();

  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<any>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    "verified" | "pending" | "failed" | null
  >(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        // In a real application, you would fetch the certificate from blockchain or API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock data for demonstration
        setCertificate(mockCertificateData);

        // Mock verification (would be done against the blockchain in a real app)
        setVerificationStatus("verified");
      } catch (error) {
        console.error("Error fetching certificate:", error);
        toast.error("Failed to load certificate details");
        setVerificationStatus("failed");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [params.id]);

  const handleDownload = () => {
    // In a real app, this would generate and download the certificate
    toast.success("Certificate downloaded");
  };

  const handleShare = () => {
    // In a real app, this would copy a shareable link or open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast.success("Certificate link copied to clipboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Loading certificate...</h2>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-blue-600 flex items-center hover:text-blue-800"
            >
              <ArrowLeft className="mr-2" size={18} />
              Back to Dashboard
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Certificate Not Found</h1>
            <p className="text-gray-600 mb-6">
              The certificate you are looking for does not exist or has been
              revoked.
            </p>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg inline-flex items-center hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-blue-600 flex items-center hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {certificate.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Certificate ID: {certificate.certificateId}
                </p>
              </div>

              <div className="flex items-center mt-4 md:mt-0 space-x-2">
                {verificationStatus === "verified" && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-1" />
                    Verified
                  </div>
                )}

                {verificationStatus === "pending" && (
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center text-sm">
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Verifying
                  </div>
                )}

                {verificationStatus === "failed" && (
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-1" />
                    Not Verified
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8 flex justify-center">
              <div className="border rounded-lg overflow-hidden w-full max-w-lg">
                {/* Mock certificate image - in a real app, this would be the actual certificate */}
                <div className="relative h-80 w-full border-b bg-gray-50 flex items-center justify-center p-6">
                  <div className="text-center border-4 border-blue-800 p-8 w-full h-full flex flex-col items-center justify-center">
                    <div className="text-xl font-serif mb-2 text-blue-800">
                      UNIVERSITY OF TECHNOLOGY
                    </div>
                    <div className="text-sm mb-4 text-gray-500">
                      This certifies that
                    </div>
                    <div className="text-xl font-bold mb-2 text-gray-600">
                      {certificate.recipientName}
                    </div>
                    <div className="text-sm mb-4 text-gray-500">
                      has successfully completed the requirements for the degree
                      of
                    </div>
                    <div className="text-2xl font-bold mb-4 text-gray-500">
                      {certificate.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      Awarded on{" "}
                      {new Date(certificate.issueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Certificate Details
                </h2>
                <dl className="space-y-2">
                  <div className="flex flex-col sm:flex-row">
                    <dt className="text-sm font-medium text-gray-500 sm:w-40">
                      Recipient
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {certificate.recipientName}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <dt className="text-sm font-medium text-gray-500 sm:w-40">
                      Issuing University
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {certificate.university}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <dt className="text-sm font-medium text-gray-500 sm:w-40">
                      Issue Date
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(certificate.issueDate).toLocaleDateString()}
                    </dd>
                  </div>
                  {certificate.expiryDate && (
                    <div className="flex flex-col sm:flex-row">
                      <dt className="text-sm font-medium text-gray-500 sm:w-40">
                        Expiry Date
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {new Date(certificate.expiryDate).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row">
                    <dt className="text-sm font-medium text-gray-500 sm:w-40">
                      Description
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {certificate.description}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Blockchain Details
                </h2>
                <dl className="space-y-2">
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                      Token ID
                    </dt>
                    <dd className="text-sm text-gray-900 font-mono">
                      {certificate.tokenId}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                      University Wallet
                    </dt>
                    <dd className="text-sm text-gray-900 font-mono overflow-hidden text-ellipsis">
                      {certificate.universityWallet}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                      Recipient Wallet
                    </dt>
                    <dd className="text-sm text-gray-900 font-mono overflow-hidden text-ellipsis">
                      {certificate.recipientWallet}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                      Transaction Hash
                    </dt>
                    <dd className="text-sm text-gray-900 font-mono overflow-hidden text-ellipsis">
                      <a
                        href={`https://sepolia.etherscan.io/tx/${certificate.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {certificate.transactionHash.substring(0, 18)}...
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                      Block Number
                    </dt>
                    <dd className="text-sm text-gray-900 font-mono">
                      {certificate.blockNumber}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 border-t pt-6">
              <button
                onClick={handleShare}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Certificate
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
