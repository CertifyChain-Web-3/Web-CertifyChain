"use client";

import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { WagmiProvider } from "wagmi";
import type { Chain } from "wagmi/chains";
import { AuthProvider } from "../context/AuthContext";

// Localhost Anvil Chain
const anvilLocalhost: Chain = {
  id: 31337,
  name: "Anvil",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
  blockExplorers: {
    default: { name: "Etherscan (local)", url: "http://localhost:8545" },
  },
  testnet: true,
};

const projectId = "anvil-local-dev";

const { connectors } = getDefaultWallets({
  appName: "certify",
  projectId,
});

export const config = getDefaultConfig({
  appName: "certify",
  projectId,
  chains: [anvilLocalhost],
  ssr: true,
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AuthProvider>{children}</AuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
