const Block = require('./models/Block');
const db = require('./db');
const { blockTime, PUBLIC_KEY, TARGET_DIFFICULTY, BLOCK_REWARD } = require('./config');
const Tx = require('./models/Tx');
const UTXO = require('./models/UTXO');

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
        let hash = block.hash()

        const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
        const coinbaseTx = new Tx([], [coinbaseUTXO])
        block.addTransaction(coinbaseTx)

        while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
            block.nonce++;
        }

        block.execute();

        console.log(block.transactions[0])

        db.blockchain.addBlock(new Block);
        console.log(`Block has Been Mined
        Number: ${db.blockchain.blockHeight()}
        Nonce: ${block.nonce}
        Hash: 0x${block.hash().toString(16)}
        `);

        setTimeout(this.mine.bind(this), blockTime);
    }
}


module.exports = Miner;