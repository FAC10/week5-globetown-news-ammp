const fs = require('fs');
const path = require('path');
const urlModule = require('url');


require('env2')('.env');
console.log('newsKey', process.env.newsKey);
console.log('tflKey', process.env.tflKey);


const handlers = {};


handlers.serveLanding = (req, res) => {
  res.writeHead(200, {'Content-Type':'text/html'});
  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', 'index.html'));
  readStream.pipe(res);
};


function getContentType(url) {
  const extension = path.extname(url);
  const extensionType = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.ico': 'image/x-icon'
  };
  return extensionType[extension];
}


handlers.serveAssets = (req, res) => {
  res.writeHead(200, {'Content-Type': getContentType(req.url)});
  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', req.url));
  readStream.pipe(res);
};


module.exports = handlers;
