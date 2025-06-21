import axios from 'axios';

const PINATA_API = 'https://api.pinata.cloud/pinning';

const headers = {
  pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY!,
  pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET!,
};

export async function uploadFileToPinata(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(`${PINATA_API}/pinFileToIPFS`, formData, {
    maxContentLength: Infinity,
    headers: {
      ...headers,
      'Content-Type': 'multipart/form-data',
    },
  });

  const hash = res.data.IpfsHash;
  return `ipfs://${hash}`;
}

export async function uploadMetadataToPinata(metadata: object): Promise<string> {
  const res = await axios.post(`${PINATA_API}/pinJSONToIPFS`, metadata, {
    headers,
  });

  const hash = res.data.IpfsHash;
  return `ipfs://${hash}`;
}
