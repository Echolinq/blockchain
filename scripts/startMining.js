const jayson = require('jayson');
const { PORT } = require('../config');

// create a client
const client = jayson.Client.http({
  port: PORT
});

// invoke "add"
client.request('startMining', [], function(err, response) {
  if(err) throw err;
  console.log(response.result); // 2
});