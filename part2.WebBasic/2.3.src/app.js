const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Node.js!\n');
});

server.listen(port, hostname, () => {
  console.log(`서버 실행 중: http://${hostname}:${port}/`);
});
