const redis = require("redis");
const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
  // password: '0'
});


client.on((`connected`), () => {
  console.log('client connected to redis')
});

client.on((`ready`), () => {
  console.log('client connected to redis and ready to use')
});

client.on('error', (err) => {
  console.log(`error connecting to redis database\n${err}`)
});

client.on('end', () => {
  console.log(`Client disconnected from redis`)
});

process.on('SIGINT', () => {
  client.quit()
});

module.exports = client;