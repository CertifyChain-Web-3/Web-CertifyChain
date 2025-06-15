"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
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
import html2canvas from "html2canvas";

// Define Certificate type to avoid 'any'
interface Certificate {
  id: string;
  title: string;
  university: string;
  universityWallet: string;
  recipientName: string;
  recipientWallet: string;
  issueDate: string;
  expiryDate?: string;
  description: string;
  certificateId: string;
  tokenId: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
}

// Mock certificate data
const mockCertificateData = {
  id: "1",
  title: "Bachelor of Computer Science",
  university: "University of Technology",
  universityWallet: "0xabcd1234abcd1234abcd1234abcd1234abcd1234",
  recipientName: "Satoshi Nakamoto",
  recipientWallet: "0x1234abcd1234abcd1234abcd1234abcd1234abcd",
  issueDate: "2025-05-15",
  // expiryDate: "2045-05-15",
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
  const params = useParams();
  // We're keeping the useAccount hook to maintain component functionality
  // even though we're not directly using the address
  useAccount();
  const certificateRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
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

  const handleDownload = async () => {
    try {
      // Make sure we have the certificate element to capture
      if (!certificateRef.current) {
        throw new Error("Certificate element not found");
      }

      // Show loading toast
      const loadingToast = toast.loading("Generating certificate image...");

      // Get the certificate ID for the filename
      const certId = certificate?.certificateId || params.id;
      const filename = `certificate-${certId}.png`;

      try {
        // First attempt: Try to use domtoimage as a fallback if available
        // Create a drawing of the certificate using the canvas API directly
        const element = certificateRef.current;
        const rect = element.getBoundingClientRect();

        // Create a canvas element with the same dimensions
        const canvas = document.createElement("canvas");
        canvas.width = rect.width * 2; // 2x for better quality
        canvas.height = rect.height * 2;

        // Get canvas context and set background
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get canvas context");

        // Fill with white background
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Scale up for higher quality
        ctx.scale(2, 2);

        // Draw border similar to the one in the certificate
        ctx.strokeStyle = "#1e40af"; // blue-800 equivalent
        ctx.lineWidth = 4;
        const padding = 8; // Similar to the p-8 in the original
        ctx.strokeRect(
          padding,
          padding,
          rect.width - padding * 2,
          rect.height - padding * 2
        );

        // Draw certificate content
        ctx.textAlign = "center";
        const centerX = rect.width / 2;

        // University name
        ctx.font = "bold 16px serif";
        ctx.fillStyle = "#511eaf"; // blue-800 equivalent
        ctx.fillText("UNIVERSITY OF TECHNOLOGY", centerX, 40);

        // This certifies that
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#6b7280"; // gray-500 equivalent
        ctx.fillText("This certifies that", centerX, 60);

        // Recipient name
        ctx.font = "bold 16px sans-serif";
        ctx.fillStyle = "#4b5563"; // gray-600 equivalent
        if (certificate?.recipientName) {
          ctx.fillText(certificate.recipientName, centerX, 85);
        } else {
          ctx.fillText("Recipient Name", centerX, 85);
        }

        // has successfully completed
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#6b7280"; // gray-500 equivalent
        ctx.fillText(
          "has successfully completed the requirements for the degree of",
          centerX,
          110
        );

        // Degree title
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "#6b7280"; // gray-500 equivalent
        if (certificate?.title) {
          ctx.fillText(certificate.title, centerX, 140);
        } else {
          ctx.fillText("Certificate Title", centerX, 140);
        }

        // Award date
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#6b7280"; // gray-500 equivalent
        ctx.fillText(
          `Awarded on ${
            certificate?.issueDate
              ? new Date(certificate.issueDate).toLocaleDateString()
              : "Date"
          }`,
          centerX,
          170
        );

        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), "image/png", 1.0);
        });

        // Create download link
        const blobUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = filename;
        downloadLink.style.display = "none";

        // Add to DOM, click and remove
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Clean up
        URL.revokeObjectURL(blobUrl);
      } catch (canvasError) {
        console.error("Canvas approach failed:", canvasError);
        // If canvas approach fails, try html2canvas with safeguards

        // Create a clone of the element and modify its styles to avoid oklch
        const clone = certificateRef.current.cloneNode(true) as HTMLElement;
        clone.style.visibility = "hidden";
        clone.style.position = "absolute";
        clone.style.top = "-9999px";
        document.body.appendChild(clone);

        // Replace any potential oklch colors with safe alternatives
        const allElements = clone.querySelectorAll("*");
        allElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            // Set safe colors that won't use oklch
            if (el.style.color && el.style.color.includes("oklch")) {
              el.style.color = "#000000";
            }
            if (
              el.style.backgroundColor &&
              el.style.backgroundColor.includes("oklch")
            ) {
              el.style.backgroundColor = "#FFFFFF";
            }
            if (
              el.style.borderColor &&
              el.style.borderColor.includes("oklch")
            ) {
              el.style.borderColor = "#1e40af"; // Standard hex for blue
            }
          }
        });

        try {
          // Now try html2canvas on the sanitized clone
          const canvas = await html2canvas(clone, {
            scale: 2,
            backgroundColor: "#FFFFFF",
            logging: false,
          });

          // Remove the clone
          document.body.removeChild(clone);

          // Convert to blob and download
          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob(
              (blob) => {
                resolve(blob!);
              },
              "image/png",
              0.95
            );
          });

          const blobUrl = window.URL.createObjectURL(blob);
          const downloadLink = document.createElement("a");
          downloadLink.href = blobUrl;
          downloadLink.download = filename;
          downloadLink.style.display = "none";

          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          window.URL.revokeObjectURL(blobUrl);
        } catch (html2canvasError) {
          console.error("HTML2Canvas approach also failed:", html2canvasError);
          throw html2canvasError;
        }
      }

      // Clear loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Certificate downloaded successfully");
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast.error("Failed to download certificate");
    }
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
      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
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
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-white flex items-center hover:text-slate-100"
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
                <div
                  ref={certificateRef}
                  className="relative h-80 w-full border-b bg-gray-50 flex items-center justify-center p-6"
                >
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
                <h2 className="text-lg font-semibold mb-4 text-gray-900">
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
                  </div>
                  <p className="text-sm text-gray-900">
                    {certificate.description}
                  </p>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                  Blockchain Details
                </h2>
                <dl className="space-y-2">
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                      Certificate ID
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
                className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
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
