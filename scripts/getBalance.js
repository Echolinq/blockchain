const jayson = require('jayson');
const { PORT, PUBLIC_KEY } = require('../config');
const {argv} = require('yargs');
const {address} = argv;

// create a client
const client = jayson.Client.http({
  port: PORT
});

client.request('getBalance', [address], function(err, response) {
  if(err) throw err;
  console.log(response.result);
});