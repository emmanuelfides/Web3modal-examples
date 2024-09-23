import { useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

export default function CustomButton() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount()
  const label = isConnected ? "Disconnect" : "Connect";

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  function onClick() {
    if (isConnected) {
      console.log('dis');
    } else {
      onOpen();
    }
  }

  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : label}
    </button>
  );
}
