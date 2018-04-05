'use strict';

const _ = require('lodash');
const http = require('http');
const redis = require('redis');
const assert = require('assert');
const client = redis.createClient('redis://redis:6379');

client.multi()
  .dbsize()
  .keys('*')
  .exec((err, replies) => {
    if (err) throw err;
    assert.equal(replies[0], 500, 'Expected 500 keys in DB');
    for (const key of replies[1]) {
      assert(/^[0-9a-f]{64}$/.test(key), `Key is not a 64-char hexadecimal: ${key}`);
    }
    console.log('DB has been verified!');
    client.quit();
  });

http.get('http://answer:3000/123456789', res => {
  assert.equal(res.statusCode, 400, 'Status code should have been 400');
})
