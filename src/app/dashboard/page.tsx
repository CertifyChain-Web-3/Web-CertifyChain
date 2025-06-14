"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  FileText,
  RefreshCcw,
  Search,
  Loader2,
  ExternalLink,
  Download,
  LogOut,
  User,
  BookOpen,
  School,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useUser } from "../context/UserContext";

// Mock data for certificates
const mockCertificates = [
  {
    id: "1",
    title: "Bachelor of Computer Science",
    university: "University of Technology",
    recipient: "0x1234...5678",
    issueDate: "2025-05-15",
    tokenId: "42",
  },
  {
    id: "2",
    title: "Master of Business Administration",
    university: "Business School International",
    recipient: "0x8765...4321",
    issueDate: "2025-04-20",
    tokenId: "43",
  },
  {
    id: "3",
    title: "Bachelor of Engineering",
    university: "Technical Institute",
    recipient: "0x9876...1234",
    issueDate: "2025-06-01",
    tokenId: "44",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { isAuthenticated, userRole, userName, logout } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [certificates, setCertificates] = useState(mockCertificates);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Redirect to login if not authenticated
    // if (!isAuthenticated) {
    //   router.push('/auth/login');
    //   return;
    // }

    // Fetch certificates based on user role
    const fetchCertificates = async () => {
      try {
        // In a real application, you would fetch from the blockchain or your backend
        // Here we're simulating API call latency
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Filter certificates based on role - universities see certificates they issued,
        // students see certificates they own
        // For now using mock data
        setCertificates(mockCertificates);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        toast.error("Failed to load certificates data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, [isAuthenticated, userRole, router]);

  // Filter certificates based on search query
  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.tokenId.includes(searchQuery)
  );

  // Function to refresh certificates list
  const refreshCertificates = async () => {
    setIsLoading(true);
    try {
      // In a real application, you would fetch from blockchain
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Certificates refreshed");
    } catch (error) {
      console.error("Error refreshing certificates:", error);
      toast.error("Failed to refresh certificates");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {userRole === "university" ? (
              <School className="h-8 w-8 text-blue-600 mr-3" />
            ) : (
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userRole === "university"
                  ? "University Dashboard"
                  : "Certificate Dashboard"}
              </h1>
              {userName && <p className="text-sm text-gray-500">{userName}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-mono text-gray-500">
                {address?.substring(0, 6)}...
                {address?.substring(address?.length - 4)}
              </span>
            </div>

            <button
              onClick={() => logout()}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Logout"
            >
              <LogOut className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <h2 className="text-xl font-semibold text-gray-700">
              {userRole === "university"
                ? "Issued Certificates"
                : "Your Certificates"}
            </h2>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full text-gray-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <button
                onClick={refreshCertificates}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <RefreshCcw size={18} className="mr" />
              </button>

              {/* {userRole === "university" && ( */}
              <Link
                href="/dashboard/certificate/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Issue New Certificate
              </Link>
              {/* )} */}
            </div>
          </div>

          {filteredCertificates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      University
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issue Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Token ID
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCertificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cert.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cert.university}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {cert.recipient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cert.issueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {cert.tokenId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/dashboard/certificate/${cert.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <ExternalLink size={18} />
                          </Link>
                          <button
                            onClick={() => toast.success("Download started")}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No certificates found
              </h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "No certificates match your search criteria."
                  : userRole === "university"
                  ? "You have not issued any certificates yet."
                  : "You do not have any certificates yet."}
              </p>

              {userRole === "university" && !searchQuery && (
                <Link
                  href="/dashboard/certificate/new"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus size={18} className="mr-2" />
                  Issue Your First Certificate
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
