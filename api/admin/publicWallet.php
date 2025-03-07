<?phpheader("Content-Type: application/json");

// Hardcoded Wallet Address (Replace with Your Own)
$walletAddress = "0xd6B56E53b3C5e69C05ca5197D3DF4cB310a30fba"; 

echo json_encode(["walletAddress" => $walletAddress]);
?>