const jayson = require('jayson');
const Miner = require('./Miner');
const { PORT } = require('./config');
const { utxos } = require('./db');

const miner = new Miner() 
// json rpc server
const server = new jayson.Server({
  startMining: function(_, callback) {
    callback(null, 'success!');
    miner.startMining();
  },
  stopMining: function(_, callback) {
    callback(null, 'success!');
    miner.stopMining();
  },
  getBalance: function([address], callback) {
    const ourUTXOs = utxos.filter(x => {
      return x.owner === address && !x.spent;
    });
    const sum = ourUTXOs.reduce((p,c) => p + c.amount, 0);
    callback(null, sum);
  }
});

server.http().listen(PORT);
