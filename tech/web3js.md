---
title: Web3js note
date: '2024-01-31'
tags: ['code']
draft: true
---

- https://docs.web3js.org/#initialize-web3-with-a-provider

## web3-eth-abi
- ABI：软件包简化了对日志和参数的解码、对函数调用和签名的编码以及对类型的推断，从而实现高效的以太坊合约交互。

## web3-eth-accounts
- 账户：软件包提供了创建以太坊账户/钱包以及确保交易和数据安全签名的工具。

## web3-eth-Contract 
- 合约：与智能合约进行交互。该功能允许通过 JavaScript 或 TypeScript 对象与合约进行通信，从而简化了开发和交互流程。
实例化智能合约。智能合约会有很多种，可以参考 [https://github.com/jordon0329/Next.js-Metamask-Vault-Contract],写成一个个json文件。
```ts 
//Uniswap token address in mainnet
const address = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
//you can find the complete ABI in etherscan.io
const ABI = 
[
    {
    name: 'symbol',
    outputs: [{ type: 'string' }],
    type: 'function',
    },
    {
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    type: 'function',
    },
];

//instantiate the contract
const uniswapToken = new web3.eth.Contract(ABI, address);
console.log(`uniswapToken:`, uniswapToken);
```

## web3-eth-ens 
- ENS:与区块链上的以太坊名称服务（ENS）进行通信。

## web3-eth-iban
- Iban：在以太坊地址和类似银行的特殊地址（IBAN 或 BBAN）之间切换。

## web3-net
- 网络。讨论和处理以太坊节点的网络细节

## web3-eth-personal
- 个人账户：与以太坊节点直接交流账户信息，简化开发工作流程中的账户管理。注意：为增强与公共节点交互时的安全性，请考虑使用 `web3-eth-accounts` 进行本地签名操作，以确保您的私钥和敏感信息在本地机器上的安全。

## web3-utils 
- 工具包。执行一系列以太坊开发中的基本任务，包括转换数据格式、检查地址、编码和解码、散列、处理数字等。

## Web3-eth
- Web3Eth：与以太坊区块链交互的主要工具。管理你与以太坊互动的控制中心。

附加支持软件包
Web3 Types：类型。该软件包包含常用的类型脚本类型。

Web3 Validator：验证器。该软件包提供使用所提供的模式进行验证的功能。

Web3 Core：Web3 Core 具有其他 Web3 软件包所使用的配置、订阅和请求管理功能。

Web3 Errors：Web3 Errors 包含其他 Web3 软件包使用的错误代码和常见错误类。

Web3 RPC 方法：这是用于构建更轻量级应用程序的高级用途。它具有使用给定提供程序向以太坊发出 RPC 请求的功能。

```ts
const web3 = new Web3(`https://opbnb-mainnet-rpc.bnbchain.org`);
// 获取最后一个区块编号
web3.eth.getBlockNumber().then(console.log);
// 获取地址余额
web3.eth.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045').then(console.log);
// 获取当前提供商的链ID
web3.eth.getChainId().then(console.log);
// get the nonce of an address
web3.eth.getTransactionCount('0x37826D8B5F4B175517A0f42c886f8Fca38C55Fe7').then(console.log);
// 获取当前gas价
web3.eth.getGasPrice().then(console.log);

// 数字钱包：存放多个以太坊账户的数组，管理账户集合并与之交互。用来存储和组织各种以太坊地址。
const wallet = web3.eth.accounts.wallet.create(1); // 随机创建一个钱包

// 添加私人密钥以创建钱包 the private key must start with the '0x' prefix
const account = web3.eth.accounts.wallet.add('0x50d349f5cf627d44858d6fcb6fbf15d27457d35c58ba2d5cfeaf455f25db5bec');
console.log(account[0].address);// 0xcE6A5235d6033341972782a15289277E85E5b305
console.log(account[0].privateKey);

const tx =
{
    from: account[0].address, // 地址必须与之前通过 wallet.add 添加的地址一致
    to: '0xa3286628134bad128faeef82f44e99aa64085c94',
    value: web3.utils.toWei('1', 'ether')
};
send the transaction
async function demo() {
    const txReceipt = await web3.eth.sendTransaction(tx);
    console.log('Tx hash:', txReceipt.transactionHash)
}

```