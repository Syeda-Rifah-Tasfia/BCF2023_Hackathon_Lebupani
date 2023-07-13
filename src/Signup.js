import { ethers } from 'ethers';
import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Connect to Ethereum network using Metamask or another provider
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
  
      // Connect to the contract deployed on Ethereum network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; // Replace with the actual contract address
      const contractABI = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "string","name": "name","type": "string"},{"indexed": false,"internalType": "address","name": "userAddress","type": "address"}],"name": "NewUserRegistered","type": "event"},{"inputs": [{"internalType": "string","name": "name","type": "string"}],"name": "signUp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "users","outputs": [{"internalType": "string","name": "name","type": "string"},{"internalType": "address","name": "userAddress","type": "address"},{"internalType": "uint256","name": "timestamp","type": "uint256"}],"stateMutability": "view","type": "function"},]
      ; // Replace with the actual contract ABI
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      // Call the signUp function in the contract
      const transaction = await contract.signUp(username);
      await transaction.wait();
  
      console.log('User signed up successfully!');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
