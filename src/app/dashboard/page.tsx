"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  ExternalLink,
  Download,
  BookOpen,
  Wallet,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Certificate {
  id: number;
  title: string;
  university: string;
  recipient: string;
  issueDate: string;
  tokenId: number;
  // status: "verified" | "pending" | "expired";
}

const mockCertificates: Certificate[] = [
  {
    id: 1,
    title: "Bachelor of Computer Science",
    university: "University of Technology",
    recipient: "0x1234...5678",
    issueDate: "2025-05-15",
    tokenId: 42,
    // status: "verified",
  },
  {
    id: 2,
    title: "Master of Business Administration",
    university: "Business School International",
    recipient: "0x8765...4321",
    issueDate: "2025-04-20",
    tokenId: 43,
    // status: "verified",
  },
  {
    id: 3,
    title: "Bachelor of Engineering",
    university: "Technical Institute",
    recipient: "0x9876...1234",
    issueDate: "2025-06-01",
    tokenId: 44,
    // status: "pending",
  },
  {
    id: 4,
    title: "Certificate in Data Science",
    university: "Digital Learning Academy",
    recipient: "0x5432...8765",
    issueDate: "2025-03-10",
    tokenId: 45,
    // status: "verified",
  },
];

export default function CertificateDashboard() {
  const router = useRouter();
  const [certificates] = useState<Certificate[]>(mockCertificates);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "verified":
  //       return "bg-green-100 text-green-800 border-green-200";
  //     case "pending":
  //       return "bg-yellow-100 text-yellow-800 border-yellow-200";
  //     case "expired":
  //       return "bg-red-100 text-red-800 border-red-200";
  //     default:
  //       return "bg-gray-100 text-gray-800 border-gray-200";
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-white" />
              <h1 className="text-xl font-bold text-white">
                Certificate Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80 text-sm">0x71AF...7FB1</span>
              <Button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              >
                <LogOut className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-4">
              Your Certificates
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Button
              onClick={() => router.push("/upload")}
              className="bg-white text-purple-700 hover:bg-white/90 font-medium px-6"
            >
              <Plus className="h-4 w-4 mr-2" />
              Issue New Certificate
            </Button>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate) => (
            <Card
              key={certificate.id}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-white text-lg font-semibold leading-tight">
                    {certificate.title}
                  </CardTitle>
                  {/* <Badge
                    className={`${getStatusColor(
                      certificate.status
                    )} text-xs font-medium`}
                  >
                    {certificate.status}
                  </Badge> */}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide font-medium">
                      University
                    </p>
                    <p className="text-white text-sm">
                      {certificate.university}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide font-medium">
                      Recipient
                    </p>
                    <p className="text-white text-sm font-mono">
                      {certificate.recipient}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide font-medium">
                        Issue Date
                      </p>
                      <p className="text-white text-sm">
                        {certificate.issueDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide font-medium">
                        Certificate ID
                      </p>
                      <p className="text-white text-sm font-mono">
                        #{certificate.tokenId}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      router.push(`/dashboard/certificate/${certificate.id}`)
                    }
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    // onClick={() => router.push(`/dashboard/certificate/${certificate.id}`)}
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No certificates found</p>
            <p className="text-white/40 text-sm">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm bg-white">
            <CardHeader>
              <CardTitle>Confirm Logout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to log out from your account?
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowLogoutConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload Modal Placeholder */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle>Issue New Certificate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Certificate upload form would go here...
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowUploadModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
