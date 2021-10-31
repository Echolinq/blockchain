const jayson = require('jayson');
const { PORT, PUBLIC_KEY } = require('../config');

// create a client
const client = jayson.Client.http({
  port: PORT
});

// invoke "add"
client.request('getBalance', [  PUBLIC_KEY], function(err, response) {
  if(err) throw err;
  console.log(response.result);
});