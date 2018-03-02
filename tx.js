const ethTx = require('ethereumjs-tx');
const ethUtil = require("ethereumjs-util");
const wanUtil = require("wanchain-util");

const ethTxParams = {
    nonce: '0x06',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x30000',
    to: '0x2c8c1d4E69A521900b4Cb77769171cD29054c98f',
    value: 1,
    data: "",
    chainId:1
};

const wanTxParams = {
    Txtype: '0x01',
    nonce: '0x06',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x30000',
    to: '0x2c8c1d4E69A521900b4Cb77769171cD29054c98f',
    value: 1,
    data: "",
    chainId:1
};

const privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex');
const fromAddr = 'be862ad9abfe6f22bcb087716c7d89a26051f74c'

function ethEncode(){
    let tx = new ethTx(ethTxParams);
    tx.sign(privateKey);

    let serializedTx = tx.serialize();
    let rawTx = '0x' + serializedTx.toString('hex');

    console.log('ETH encode:' + rawTx);
    return rawTx;
}

function wanEncode(){
    let tx = new wanUtil.wanchainTx(wanTxParams);
    tx.sign(privateKey);

    let serializedTx = tx.serialize();
    let rawTx = '0x' + serializedTx.toString('hex');

    console.log('WAN encode:' + rawTx);
    return rawTx;
}

function ethDecode(rawTx){
    let decodedTx = ethUtil.rlp.decode(rawTx);
    console.log(decodedTx);

    let tx = new ethTx(decodedTx);
    console.log ('ETH Sender:' + tx.getSenderAddress().toString('hex'));
 }

function wanDecode(rawTx){
    let decodedTx = ethUtil.rlp.decode(rawTx);
    console.log(decodedTx);

    let tx = new wanUtil.wanchainTx(decodedTx);
    //console.log ('WAN Sender:' + tx.getSenderAddress().toString('hex'));
    console.log('WAN Sender:' + wanUtil.toChecksumAddress(tx.from.toString('hex')));
}

let ethRawTx = ethEncode();
ethDecode(ethRawTx);

let wanRawTx = wanEncode();
wanDecode(wanRawTx);

//Test the transaction hash - https://explorer.wanchain.org/block/trans/0xd4526e647ab086688de40c9e6d460dba3aa02763f5ebd40e3084deab5c5a7538
const testJson = {
    "Txtype":"0x01",
    "nonce":"0x01",
    "gasPrice":"0x2a600b9c00",
    "gas":"0x5208",
    "to":"0xF386c66627e80117CBD20D76Bd2489Da78Aa7430",
    "value":"0x016345785d8a0000",
    "data":"",
    "chainId":1,
    "v":"0x26",
    "r":"0x6420bf8aa4e07867e02507c9f6e16efd3c7dd9cfa642cb10b4498ccecf1e44c2",
    "s":"0x2ec4705f6a3167dd3e857d542d5ee91429b0e585729276791cb7423def885ec1"
};

const testSignature = '0xf86d0101852a600b9c0082520894f386c66627e80117cbd20d76bd2489da78aa743088016345785d8a00008026a06420bf8aa4e07867e02507c9f6e16efd3c7dd9cfa642cb10b4498ccecf1e44c2a02ec4705f6a3167dd3e857d542d5ee91429b0e585729276791cb7423def885ec1';
const testSenderAddress = '0x2c8c1d4E69A521900b4Cb77769171cD29054c98f';


console.log ("Test the transaction 0xd4526e647ab086688de40c9e6d460dba3aa02763f5ebd40e3084deab5c5a7538");
wanDecode(testSignature);



