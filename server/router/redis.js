const redis = require("redis");
const client = redis.createClient({port: 6379, host: '172.31.57.40'}); // creates new client
const { promisify } = require("util");

client.on("error", function(error) {
  console.error(error);
});

client.on('connect', function() {
  console.log('Connected to Redis!');
});

module.exports = client;
// client.set("key", "value", redis.print);
// client.get("key", redis.print);