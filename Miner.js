const Block = require('./models/Block');
const db = require('./db');
const { blockTime, TARGET_DIFFICULTY } = require('./config');

class Miner {
    constructor(){
        this.mining = false;
    }

    startMining() {
        this.mining = true;
        this.mine();
    }

    stopMining() {
        this.mining = false;
    }

    mine() {
        if(!this.mining) return;

        const block = new Block();

        while(block.hash() >= TARGET_DIFFICULTY) {
            block.nonce++;
        }

        db.blockchain.addBlock(new Block);
        console.log(`Block has Been Mined
        Number: ${db.blockchain.blockHeight()}
        Nonce: ${block.nonce}
        Hash: ${block.hash()}
        `);

        setTimeout(this.mine.bind(this), blockTime);
    }
}


module.exports = Miner;