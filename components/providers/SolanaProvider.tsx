"use client";
import React, { PropsWithChildren, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { registerMoonGateWallet } from "@moongate/moongate-adapter";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";

const SolanaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  registerMoonGateWallet({
    authMode: "Ethereum",
    position: "top-left",
  });
  registerMoonGateWallet({
    authMode: "Google",
    position: "top-right",
  });
  registerMoonGateWallet({
    authMode: "Twitter",
    position: "top-right",
  });
  registerMoonGateWallet({
    authMode: "Apple",
    position: "top-right",
  });
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaProvider;
