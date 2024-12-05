import React, { useState } from "react";
import { Contract } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { parseEther } from "ethers";

function TokenForm() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [decimals, setDecimals] = useState(18);
  const [totalSupply, setTotalSupply] = useState(0);
  const [account, setAccount] = useState(null); // Track the connected wallet
  const [loading, setLoading] = useState(false); // Track loading state

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address); // Set the account address
      } else {
        alert("Please install MetaMask to interact with this application.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  // Submit Token Creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    setLoading(true); // Set loading to true when submitting
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contractAddress = "0x18936488A1d358a5C46dE8FF6Ef528Ce91346b6C"; // Example contract address
    const abi = [
      {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
      {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},
      {"indexed":true,"internalType":"address","name":"creator","type":"address"},
      {"indexed":false,"internalType":"string","name":"name","type":"string"},
      {"indexed":false,"internalType":"string","name":"symbol","type":"string"}],"name":"TokenCreated","type":"event"},
      {"inputs":[{"internalType":"string","name":"name","type":"string"},
      {"internalType":"string","name":"symbol","type":"string"},
      {"internalType":"uint8","name":"decimals","type":"uint8"},
      {"internalType":"uint256","name":"totalSupply","type":"uint256"}],"name":"createMemeToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"payable","type":"function"},
      {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
      {"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"updateServiceFee","outputs":[],"stateMutability":"nonpayable","type":"function"},
      {"inputs":[],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}
    ];

    const contract = new Contract(contractAddress, abi, signer);

    try {
      console.log("Sending transaction...");
      const tx = await contract.createMemeToken(tokenName, tokenSymbol, decimals, totalSupply, {
        value: parseEther("0.01"), // Adjusted fee to 0.01 ETH
      });

      console.log("Waiting for transaction to be mined...");
      const receipt = await tx.wait(); // Wait for transaction confirmation

      console.log("Transaction successful:", receipt);
      alert(`Token created successfully! Transaction hash: ${tx.hash}`);
    } catch (error) {
      console.error("Error creating token:", error.message);
      alert("Failed to create token. Please ensure your wallet has sufficient funds and try again.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div>
      {/* Wallet connection button */}
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected Wallet: {account}</p>
      )}

      <form className="TokenForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Decimals (e.g., 18)"
          value={decimals}
          onChange={(e) => setDecimals(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Total Supply"
          value={totalSupply}
          onChange={(e) => setTotalSupply(Number(e.target.value))}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating Token..." : "Create Token"}
        </button>
      </form>
    </div>
  );
}

export default TokenForm;