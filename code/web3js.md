# Web3js

- https://docs.web3js.org/#initialize-web3-with-a-provider

## web3-eth-abi

- ABI：軟體包簡化了對日誌和引數的解碼、對函式呼叫和簽名的編碼以及對型別的推斷，從而實現高效的以太坊合約互動。

## web3-eth-accounts

- 賬戶：軟體包提供了建立以太坊賬戶/錢包以及確保交易和資料安全簽名的工具。

## web3-eth-Contract

- 合約：與智慧合約進行互動。該功能允許透過 JavaScript 或 TypeScript 物件與合約進行通訊，從而簡化了開發和互動流程。
  例項化智慧合約。智慧合約會有很多種，可以參考 [https://github.com/jordon0329/Next.js-Metamask-Vault-Contract],寫成一個個 json 檔案。

```ts
//Uniswap token address in mainnet
const address = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
//you can find the complete ABI in etherscan.io
const ABI = [
  {
    name: "symbol",
    outputs: [{ type: "string" }],
    type: "function",
  },
  {
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
    type: "function",
  },
];

//instantiate the contract
const uniswapToken = new web3.eth.Contract(ABI, address);
console.log(`uniswapToken:`, uniswapToken);
```

## web3-eth-ens

- ENS:與區塊鏈上的以太坊名稱服務（ENS）進行通訊。

## web3-eth-iban

- Iban：在以太坊地址和類似銀行的特殊地址（IBAN 或 BBAN）之間切換。

## web3-net

- 網路。討論和處理以太坊節點的網路細節

## web3-eth-personal

- 個人賬戶：與以太坊節點直接交流賬戶資訊，簡化開發工作流程中的賬戶管理。注意：為增強與公共節點互動時的安全性，請考慮使用 `web3-eth-accounts` 進行本地簽名操作，以確保您的私鑰和敏感資訊在本地機器上的安全。

## web3-utils

- 工具包。執行一系列以太坊開發中的基本任務，包括轉換資料格式、檢查地址、編碼和解碼、雜湊、處理數字等。

## Web3-eth

- Web3Eth：與以太坊區塊鏈互動的主要工具。管理你與以太坊互動的控制中心。

附加支援軟體包
Web3 Types：型別。該軟體包包含常用的型別指令碼型別。

Web3 Validator：驗證器。該軟體包提供使用所提供的模式進行驗證的功能。

Web3 Core：Web3 Core 具有其他 Web3 軟體包所使用的配置、訂閱和請求管理功能。

Web3 Errors：Web3 Errors 包含其他 Web3 軟體包使用的錯誤程式碼和常見錯誤類。

Web3 RPC 方法：這是用於構建更輕量級應用程式的高階用途。它具有使用給定提供程式向以太坊發出 RPC 請求的功能。

```ts
const web3 = new Web3(`https://opbnb-mainnet-rpc.bnbchain.org`);
// 獲取最後一個區塊編號
web3.eth.getBlockNumber().then(console.log);
// 獲取地址餘額
web3.eth.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045').then(console.log);
// 獲取當前提供商的鏈ID
web3.eth.getChainId().then(console.log);
// get the nonce of an address
web3.eth.getTransactionCount('0x37826D8B5F4B175517A0f42c886f8Fca38C55Fe7').then(console.log);
// 獲取當前gas價
web3.eth.getGasPrice().then(console.log);

// 數字錢包：存放多個以太坊賬戶的陣列，管理賬戶集合並與之互動。用來儲存和組織各種以太坊地址。
const wallet = web3.eth.accounts.wallet.create(1); // 隨機建立一個錢包

// 新增私人金鑰以建立錢包 the private key must start with the '0x' prefix
const account = web3.eth.accounts.wallet.add('0x50d349f5cf627d44858d6fcb6fbf15d27457d35c58ba2d5cfeaf455f25db5bec');
console.log(account[0].address);// 0xcE6A5235d6033341972782a15289277E85E5b305
console.log(account[0].privateKey);

const tx =
{
    from: account[0].address, // 地址必須與之前透過 wallet.add 新增的地址一致
    to: '0xa3286628134bad128faeef82f44e99aa64085c94',
    value: web3.utils.toWei('1', 'ether')
};
send the transaction
async function demo() {
    const txReceipt = await web3.eth.sendTransaction(tx);
    console.log('Tx hash:', txReceipt.transactionHash)
}

```
