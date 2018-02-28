const ethTx = require('ethereumjs-tx');
const ethUtil = require("ethereumjs-util");
const wanUtil = require("wanchain-util");

const ethTxParams = {
    nonce: '0x06',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x30000',
    to: '0x2c8c1d4E69A521900b4Cb77769171cD29054c98f',
    value: '1'
};

const wanTxParams = {
    Txtype: '0x01',
    nonce: '0x06',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x30000',
    to: '0x2c8c1d4E69A521900b4Cb77769171cD29054c98f',
    value: '1'
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
    return rawTx
}

function ethDecode(rawTx){
    let decodedTx = ethUtil.rlp.decode(rawTx);
    console.log(decodedTx)

    let tx = new ethTx(decodedTx);
    console.log ('ETH Sender:' + tx.getSenderAddress().toString('hex'));
 }

function wanDecode(rawTx){
    let decodedTx = ethUtil.rlp.decode(rawTx);
    console.log(decodedTx)

    let tx = new wanUtil.wanchainTx(decodedTx);
    console.log ('WAN Sender:' + tx.getSenderAddress().toString('hex'));
}

let ethRawTx = ethEncode()
ethDecode(ethRawTx)

let wanRawTx = wanEncode()
wanDecode(wanRawTx)







