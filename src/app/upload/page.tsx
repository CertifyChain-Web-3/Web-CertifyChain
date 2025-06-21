"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ABI } from "../../constants/ABI";
import { useRouter } from "next/navigation";
import {
  uploadFileToPinata,
  uploadMetadataToPinata,
} from "../../lib/uploadtopinata";
import { toast } from "sonner";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function UploadPage() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const router = useRouter();

  const [formData, setFormData] = useState({
    to: "",
    id: "",
    title: "",
    studentName: "",
    desc: "",
    issuedDate: "",
    file: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.file) return toast.error("📁 Upload gambar dulu!");
    if (!isConnected) return toast.error("💡 Wallet belum terhubung");
    if (!formData.to.startsWith("0x") || formData.to.length !== 42) {
      return toast.error("❌ Alamat wallet tidak valid!");
    }

    try {
      setLoading(true);

      // 1. Upload image
      const imageUri = await uploadFileToPinata(formData.file);

      // 2. Create metadata
      const metadata = {
        name: formData.title,
        description: formData.desc,
        image: imageUri,
        attributes: [
          { trait_type: "Student Name", value: formData.studentName },
        ],
      };

      // 3. Upload metadata.json
      const tokenUri = await uploadMetadataToPinata(metadata);
      console.log("tokenUri:", tokenUri);

      // 4. Mint NFT via smart contract
      await writeContractAsync({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: "mintCertificate",
        args: [
          formData.to,
          formData.id,
          formData.title,
          formData.studentName,
          formData.issuedDate,
          formData.desc,
          tokenUri,
        ],
      });

      toast.success("✅ NFT berhasil dimint!");
      router.push("/");
    } catch (err: any) {
      console.error(err);
      toast.error("❌ Gagal mint NFT: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 border-2 border-purple-300 rounded-lg shadow-lg bg-white space-y-6">
      <h1 className="text-2xl font-bold text-purple-800 text-center mb-4">Mint Sertifikat NFT</h1>
      <div className="h-1 w-32 bg-purple-600 mx-auto mb-6 rounded"></div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-700">Alamat Wallet Tujuan</label>
          <input
            type="text"
            name="to"
            placeholder="contoh: 0x123..."
            className="w-full border border-purple-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-700">ID Sertifikat</label>
          <input
            type="text"
            name="id"
            placeholder="Masukkan ID unik"
            className="w-full border border-purple-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-700">Judul Sertifikat</label>
          <input
            type="text"
            name="title"
            placeholder="contoh: Sertifikat Kelulusan"
            className="w-full border border-purple-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-700">Nama Penerima</label>
          <input
            type="text"
            name="studentName"
            placeholder="Nama lengkap penerima"
            className="w-full border border-purple-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-700">Tanggal Penerbitan</label>
          <input
            type="text"
            name="issuedDate"
            placeholder="contoh: 21 Juni 2025"
            className="w-full border border-purple-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={formData.issuedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-700">Deskripsi</label>
          <textarea
            name="desc"
            placeholder="Deskripsi detail sertifikat..."
            className="w-full border border-purple-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-[100px]"
            value={formData.desc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-700">Unggah Gambar Sertifikat</label>
          <div className="border-2 border-dashed border-purple-300 rounded-md p-4 hover:bg-purple-50 transition-all cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="w-full cursor-pointer text-sm text-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-medium px-4 py-3 rounded-md hover:bg-purple-700 disabled:opacity-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="animate-pulse">⏳</span> Memproses...
              </>
            ) : (
              <>
                <span>✨</span> Mint Sertifikat NFT
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}