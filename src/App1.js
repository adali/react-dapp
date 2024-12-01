import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
  const [greeting, setGreetingValue] = useState(""); // Greeting状态
  const [userAccount, setUserAccount] = useState(""); // 用户账户地址
  const [amount, setAmount] = useState(""); // 发送的金额
  const [provider, setProvider] = useState(null); // 以太坊提供器
  const [signer, setSigner] = useState(null); // 签名者

  // 初始化以太坊提供器和签名者
  useEffect(() => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        console.log('Ethereum provider detected.');
        
        // 初始化 ethers.js 提供器和签名者
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider);
        setSigner(_provider.getSigner());

        // 监听账户变化
        window.ethereum.on('accountsChanged', (accounts) => {
          console.log('Accounts changed:', accounts);
          setUserAccount(accounts[0] || "");
        });

        // 监听网络变化
        window.ethereum.on('chainChanged', (chainId) => {
          console.log('Chain changed to:', chainId);
          window.location.reload(); // 重新加载页面
        });
      } else {
        console.error('No Ethereum provider detected. Please install MetaMask.');
      }
    } catch (error) {
      console.error('Error initializing Ethereum provider:', error);
    }
  }, []);

  // 获取 Greeting 示例
  const fetchGreeting = async () => {
    try {
      if (!signer) {
        console.error('Signer is not initialized.');
        return;
      }
      // 示例：模拟从合约获取Greeting
      console.log('Fetching greeting...');
      const greeting = "Hello, Blockchain!"; // 示例静态值
      setGreetingValue(greeting);
    } catch (error) {
      console.error('Error fetching greeting:', error);
    }
  };

  // 设置 Greeting 示例
  const setGreeting = async () => {
    try {
      if (!signer) {
        console.error('Signer is not initialized.');
        return;
      }
      // 示例：模拟调用合约的设置方法
      console.log('Setting greeting...');
      // 调用智能合约方法示例
    } catch (error) {
      console.error('Error setting greeting:', error);
    }
  };

  // 获取账户余额
  const getBalance = async () => {
    try {
      if (!provider || !userAccount) {
        console.error('Provider or account not initialized.');
        return;
      }
      const balance = await provider.getBalance(userAccount);
      console.log('Account balance:', ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  // 发送币示例
  const sendCoins = async () => {
    try {
      if (!signer || !userAccount || !amount) {
        console.error('Signer, account, or amount not set.');
        return;
      }
      const tx = await signer.sendTransaction({
        to: userAccount,
        value: ethers.utils.parseEther(amount),
      });
      console.log('Transaction sent:', tx);
    } catch (error) {
      console.error('Error sending coins:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
        />
        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </header>
    </div>
  );
}

export default App;
