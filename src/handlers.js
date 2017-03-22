const fs = require('fs');
const path = require('path');


const env = require ('env2')('../.env');
console.log('newsKey', process.env.newsKey);
console.log('tflKey', process.env.tflKey);


const handlers = {};

handlers.serveLanding = (req, res) => {
  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', 'index.html'));

  readStream.on('open', () => {
    res.writeHead(200, {'Content-Type':'text/html'});
    readStream.pipe(res);
  });
  
};

module.exports = handlers;
