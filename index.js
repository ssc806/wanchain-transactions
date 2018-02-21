/*
Showing the difference between getting the from address in a WAN transaction vs a Non-WAN transaction...

TX Sent:
{"Txtype":"0x01","nonce":"0x00","gasPrice":"0x2a600b9c00","gas":"0x5208","to":"0x514CC192b9d55493009b985C8177b2d2d8a7F98D","from":"0xa843db05ec3c0f152734d510d46a188847c636a3","value":"0x016345785d8a0000","data":"","v":"0x1c","r":"0x8afd0beb42b846357931cf62ef197f3945a6e04dc33eea49f43ebd21e156c4b1","s":"0x6cdfbe6c25c37b6224e5c9fbaac4afd1e68a15fa87a5299e93a3ab6d35b65a61"}

Raw TX:
0xf86d0180852a600b9c0082520894514cc192b9d55493009b985c8177b2d2d8a7f98d88016345785d8a0000801ca08afd0beb42b846357931cf62ef197f3945a6e04dc33eea49f43ebd21e156c4b1a06cdfbe6c25c37b6224e5c9fbaac4afd1e68a15fa87a5299e93a3ab6d35b65a61
*/

// Normal Ether transaction
var Transaction = require("./node_modules/ethereumjs-tx/index.js");
// utils
var ethUtil = require("ethereumjs-util");
// Wan transaction (in util package)
var wanUtil = require("wanchain-util");

// Signed TX
signedTx = "0xf86d0180852a600b9c0082520894514cc192b9d55493009b985c8177b2d2d8a7f98d88016345785d8a0000801ca08afd0beb42b846357931cf62ef197f3945a6e04dc33eea49f43ebd21e156c4b1a06cdfbe6c25c37b6224e5c9fbaac4afd1e68a15fa87a5299e93a3ab6d35b65a61";

// Decode the TX to get all the fields as an array of Buffers
decodedtx=ethUtil.rlp.decode(signedTx);
// Shift to remove the first field (Txtype, since ether doesn't know that
var txtype = decodedtx.shift();
//console.log("txtype: " + txtype.toString('hex'));
//console.log(decodedtx);

// Create new ether tx based on decoded TX
var ethertx = new Transaction(decodedtx);
// Print from address
console.log('from address ethereum: ' + ethertx.getSenderAddress().toString('hex'))

// Create new wanchain tx
var wtxData = new wanUtil.wanchainTx(signedTx);
// Print from address
console.log('from address wanchain: ' + wtxData.getSenderAddress().toString('hex'));
console.log('from address wanchain checksum: ' + wanUtil.toChecksumAddress(wtxData.from.toString('hex')))
