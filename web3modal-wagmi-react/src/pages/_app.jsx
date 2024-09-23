import { useEffect, useState } from "react";
import "../styles.css";

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    async function initializeApp() {
      const ETHAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
      const USDTAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    }

    // Call the async initialization function
    initializeApp();
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
          <Component {...pageProps} />
      ) : null}

    </>
  );
}
