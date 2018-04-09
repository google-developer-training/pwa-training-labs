const http = require('http');
const port = 5001;

http.createServer((req, res) => {

  req.on('data', message => {
    // echo back request with headers
    const responseWithHeaders = JSON.stringify(req.headers, null, 1) +
                              '\n\n' +
                              message.toString();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(responseWithHeaders);
    res.end();
    console.log(responseWithHeaders);
  });

  req.on('end', () => {
    res.end();
  });

}).listen(port);

console.log('Server listening on localhost port', port);
