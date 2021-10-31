const SHA256 = require('crypto-js/sha256');

class Block {
    constructor() {
        this.timestamp = Date.now();
        this.nonce = 0;
    }
    
    hash() {
        return BigInt('0x' + SHA256(this.timestamp + "" + this.nonce).toString());
    }
}

module.exports = Block;