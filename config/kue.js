const kue = require("kue");

const queue = kue.createQueue({
  prefix: "queue",
  redis: {
    port: 6380,
    host: "127.0.0.1",
  },
});

module.exports = queue;
