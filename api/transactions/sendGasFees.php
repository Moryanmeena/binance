<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// 🔒 Replace with your BNB private key
define("PRIVATE_KEY", "c2687de63c0c3097914850e9cb168e5517d44d024ff064889e26ede9ec6a1a7c);  // ⚠️ Keep this secure
define("RPC_URL", "https://bsc-dataseed.binance.org/"); // ✅ BSC Mainnet RPC

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

// Get JSON request body
$input = json_decode(file_get_contents("php://input"), true);
$userAddress = $input['userAddress'] ?? null;
$amountWei = $input['amount'] ?? null; // ✅ Already in Wei (No conversion needed)

if (!$userAddress || !$amountWei) {
    echo json_encode(["success" => false, "message" => "Missing parameters"]);
    exit;
}

// ✅ Step 1: Get sender address from private key
$senderAddress = getAddressFromPrivateKey(PRIVATE_KEY);

// ✅ Step 2: Get nonce & gas price
$nonce = getNonce($senderAddress);
$gasPrice = getGasPrice();
$gasLimit = "0x5208"; // Standard gas limit (21,000)

// ✅ Step 3: Create transaction
$rawTx = createRawTransaction($nonce, $gasPrice, $gasLimit, $userAddress, $amountWei);

// ✅ Step 4: Sign transaction (Replace with your signing method)
$signedTx = signTransaction($rawTx, PRIVATE_KEY); 

// ✅ Step 5: Send transaction to BSC
$txHash = sendTransaction($signedTx);

if ($txHash) {
    echo json_encode(["success" => true, "hash" => $txHash, "message" => "Gas fees sent successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Transaction failed"]);
}

// 🎯 Step 1: Get nonce (Transaction Count)
function getNonce($address) {
    $response = jsonRPC(['jsonrpc' => '2.0', 'method' => 'eth_getTransactionCount', 'params' => [$address, 'latest'], 'id' => 1]);
    return $response['result'] ?? "0x0";
}

// 🎯 Step 2: Get current gas price
function getGasPrice() {
    $response = jsonRPC(['jsonrpc' => '2.0', 'method' => 'eth_gasPrice', 'params' => [], 'id' => 1]);
    return $response['result'] ?? "0x3b9aca00"; // Default 1 Gwei
}

// 🎯 Step 3: Create raw transaction
function createRawTransaction($nonce, $gasPrice, $gasLimit, $to, $valueWei) {
    return [
        'nonce' => $nonce,
        'gasPrice' => $gasPrice,
        'gasLimit' => $gasLimit,
        'to' => $to,
        'value' => "0x" . dechex($valueWei),
        'chainId' => 56 // BSC Mainnet
    ];
}

// 🎯 Step 4: Sign transaction (🔴 REQUIRES an External API)
function signTransaction($tx, $privateKey) {
    return externalSignTransaction($tx, $privateKey);
}

// 🎯 Step 5: Send signed transaction to BSC
function sendTransaction($signedTx) {
    $response = jsonRPC(['jsonrpc' => '2.0', 'method' => 'eth_sendRawTransaction', 'params' => [$signedTx], 'id' => 1]);
    return $response['result'] ?? null;
}

// 🛰️ Helper: JSON-RPC Request
function jsonRPC($data) {
    $ch = curl_init(RPC_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}

// 🏦 Get BNB Wallet Address from Private Key (🔴 REQUIRES External API)
function getAddressFromPrivateKey($privateKey) {
    return externalGetAddress($privateKey);
}

// 🔴 SIGN TRANSACTIONS USING AN API (Example: Alchemy, QuickNode)
function externalSignTransaction($tx, $privateKey) {
    return "0xSignedTransactionData"; // 🔴 Replace with API Call
}

// 🔴 GET WALLET ADDRESS FROM PRIVATE KEY (Example: BSCScan API)
function externalGetAddress($privateKey) {
    return "0xYourWalletAddress"; // 🔴 Replace with API Call
}
?>