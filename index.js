/*
Showing the difference between getting the from address in a WAN transaction vs a Non-WAN transaction...

TX Sent 1:
{"Txtype":"0x01","nonce":"0x01","gasPrice":"0x2a600b9c00","gas":"0x5208","to":"0x2c8c1d4E69A521900b4Cb77769171cD29054c98f","value":"0x016345785d8a0000","data":"","chainId":1,"v":"0x25","r":"0xbd249bcc212fb7b0fbd00ac25436f03d12813b8613ee74a5dc2de4ba78dc5c8f","s":"0x2c4dedc068a31b3d837f48e47553758531033e74bcd21a40fc766529f756606f"}

Raw TX 1:
0xf86d0101852a600b9c00825208942c8c1d4e69a521900b4cb77769171cd29054c98f88016345785d8a00008025a0bd249bcc212fb7b0fbd00ac25436f03d12813b8613ee74a5dc2de4ba78dc5c8fa02c4dedc068a31b3d837f48e47553758531033e74bcd21a40fc766529f756606f

*/

// Decode TX 1
decode("0xf86d0180852a600b9c0082520894f386c66627e80117cbd20d76bd2489da78aa743088016345785d8a00008025a0c11942490fb144f38a0bdcbe935f0cf3fc561b9373b04016c6f44f1dfdf4e089a00a9dbef562709306776622e632648ca269f0d38cf15b0b02a95cd0ab916b3fb0", "TX1");

function decode(signedTx, desc) {
    // Normal Ether transaction
    var Transaction = require("./node_modules/ethereumjs-tx/index.js");
    // utils
    var ethUtil = require("ethereumjs-util");
    // Wan transaction (in util package)
    var wanUtil = require("wanchain-util");
    
    // Decode the TX to get all the fields as an array of Buffers
    decodedtx=ethUtil.rlp.decode(signedTx);
console.log(decodedtx)
    // Shift to remove the first field (Txtype, since ether doesn't know that
    var txtype = decodedtx.shift();
    //console.log("txtype: " + txtype.toString('hex'));
    //console.log(decodedtx);
    
    // Create new ether tx based on decoded TX
    var ethertx = new Transaction(decodedtx);
    // Print from address
    console.log('from address ethereum ' + desc + " : " + ethertx.getSenderAddress().toString('hex'))
    
    // Create new wanchain tx
    var wtxData = new wanUtil.wanchainTx(signedTx);
    // Print from address
    console.log('from address wanchain ' + desc + " : " + wtxData.getSenderAddress().toString('hex'));
    console.log('from address wanchain checksum ' + desc + " : " + wanUtil.toChecksumAddress(wtxData.from.toString('hex')))
}
