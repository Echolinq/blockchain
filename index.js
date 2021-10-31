const jayson = require('jayson');
const Miner = require('./Miner');
const { PORT } = require('./config');

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
  }
});

server.http().listen(PORT);
