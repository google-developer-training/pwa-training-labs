var http = require('http');
var port = 5001;

http.createServer(function(request, response) {

  request.on('data', function(message) {
    // echo back request with headers
    var responseWithHeaders = JSON.stringify(request.headers, null, 1) +
                              '\n' +
                              message.toString();
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(responseWithHeaders);
    response.end();
    console.log(responseWithHeaders);
  });

  request.on('end', function() {
    response.end();
  });

}).listen(port);

console.log('Server listening on localhost port', port);
