"use client";

// Import ini mungkin tidak diperlukan jika Anda tidak menggunakan `useCertificates`
// secara langsung di StudentPage, tetapi saya akan tetap menyertakannya untuk berjaga-jaga.
import { useCertificates } from "../../hooks/useCertificates";
import { useReadContract } from "wagmi";
import { ABI } from "../../constants/ABI";
import { CONTRACT_ADDRESS } from "../../constants/index";
import { withRole } from "@/components/customs/withRole";

type Props = {
  tokenId: bigint;
  idx: number;
};

export function Detail({ tokenId, idx }: Props) {
  // Asumsikan ABI 'certificates' mengembalikan [string, string, string, string, string]
  // sesuaikan jika ABI Anda berbeda (misalnya, ada number atau boolean)
  const { data: certificateDetails } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "certificates",
    args: [tokenId],
  }) as { data?: readonly [string, string, string, string, string] }; // Pastikan tipe ini sesuai dengan ABI Anda

  // Asumsikan ABI 'tokenURI' mengembalikan string
  const { data: tokenUri } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "tokenURI",
    args: [tokenId],
  }) as { data?: string }; // tokenURI biasanya mengembalikan satu string

  if (!certificateDetails) return <li key={idx}>Loading...</li>;

  return (
    <li key={idx} className="border border-purple-200 p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 hover:border-purple-400">
      {/* Pastikan indeks akses array sesuai dengan urutan di smart contract */}
      <div className="mb-2 pb-2 border-b border-purple-100">
        <h3 className="text-xl font-semibold text-purple-800 mb-1">{certificateDetails[1]}</h3>
        <p className="text-sm text-gray-500">ID: {certificateDetails[0]}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 mb-4">
        <div className="bg-purple-50 p-3 rounded-md">
          <p className="text-sm text-gray-600"><span className="font-medium text-purple-700">Student:</span> {certificateDetails[2]}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-md">
          <p className="text-sm text-gray-600"><span className="font-medium text-purple-700">Issued:</span> {certificateDetails[3]}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-md">
          <p className="text-sm text-gray-600"><span className="font-medium text-purple-700">Description:</span> {certificateDetails[4]}</p>
        </div>
      </div>
      <p>
        <strong>Token URI:</strong>{" "}
        {tokenUri ? ( // Cek apakah tokenUri ada sebelum menampilkan
          <a
            href={tokenUri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 underline inline-flex items-center"
          >
            {tokenUri}
          </a>
        ) : (
          "N/A"
        )}
      </p>
    </li>
  );
}

function StudentPage() {
  // `useCertificates` tidak digunakan secara langsung di sini untuk kondisi rendering `listToken`
  // Jika Anda ingin menggunakannya, pastikan ada logika yang tepat
  const { certificates, isLoading, error } = useCertificates(); // Biarkan ini jika diperlukan di tempat lain

  const {
    data: listToken,
    isLoading: isLoadingListToken,
    error: errorListToken,
  } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getListTokenId",
    args: [],
  }) as { data?: readonly bigint[]; isLoading: boolean; error: Error | null }; // Pastikan tipe data sesuai dengan ABI

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-900 border-b-2 border-purple-300 pb-2">Your Digital Certificates</h1>

      {/* Loading state with improved styling */}
      {isLoadingListToken && (
        <div className="flex items-center justify-center p-8 rounded-lg bg-white shadow-sm border border-purple-100">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mr-3"></div>
          <p className="text-purple-800 font-medium">Loading your certificates...</p>
        </div>
      )}
      {/* Error state with improved styling */}
      {errorListToken && (
        <div className="p-6 rounded-lg bg-red-50 border border-red-200 shadow-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 font-medium">
              Error fetching certificates: {errorListToken.message}
            </p>
          </div>
        </div>
      )}

      {/* Display certificates with improved styling */}
      {!isLoadingListToken && listToken && listToken.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {listToken.map((cert, idx) => (
            // `cert` di sini adalah `bigint` (tokenId), sesuai dengan props Detail
            <Detail key={cert.toString()} tokenId={cert} idx={idx} />
          ))}
        </ul>
      ) : (
        // Empty state with improved styling
        !isLoadingListToken &&
        !errorListToken && (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm border border-purple-100 mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-purple-800 font-medium mb-1">No Certificates Found</p>
            <p className="text-gray-500 text-sm text-center">Once certificates are issued to you, they will appear here.</p>
          </div>
        )
      )}
      </div>
    </div>
  );
}

export default withRole(StudentPage, "student");
