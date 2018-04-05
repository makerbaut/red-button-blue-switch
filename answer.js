'use strict';

const http = require('http');
const bcrypt = require('bcryptjs');

const server = http.createServer((req, res) => {
  const input = req.url.replace(/[^\d]/g, '');
  if (bcrypt.compareSync(input, '$2a$15$O5lGy0TmwRVIBxzdujuMb.EvLowbVQn7p1T6PPHHKKBeAnHiWxH2i')) {
    console.log(`Correct answer submitted: ${input}`);
    return res.end('This is correct, nice job!');
  }
  res.statusCode = 400;
  res.end('Sorry, that is not correct.');
  console.log(`Incorrect answer submitted: ${input}`);
});

server.listen(3000, err => {
  if (err) throw err;
  console.log('Answer server listening on port 3000');
});
