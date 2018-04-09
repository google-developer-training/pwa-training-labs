/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const http = require('http');
const port = 5000;

http.createServer((req, res) => {

  // enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CUSTOM, Content-Type');

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
