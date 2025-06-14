"use client";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";

// WalletConnect Project ID
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

// Define chains for the application - explicitly converting to array with as const
const chains = [sepolia, mainnet] as const;

// Configure wallets
const { connectors } = getDefaultWallets({
  appName: "CertifyChain",
  projectId,
});

// Create Wagmi config
const config = createConfig({
  chains,
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
  connectors,
});

export function Providers({ children }: { children: ReactNode }) {
  // Create a client for React Query
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <UserProvider>
            {children}
            <Toaster position="bottom-right" />
          </UserProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
