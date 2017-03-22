const fs = require('fs');
const path = require('path');


const handlers = {};

handlers.serveLanding = (req, res) => {
  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', 'index.html'));

  readStream.on('open', () => {
    res.writeHead(200, {'Content-Type':'text/html'});
    readStream.pipe(res);
  });
  
};

module.exports = handlers;

//
// handler.serveStatic = (req, res, page) => {
//
//   const filePath = path.join(__dirname, '..', 'public', page);
//   const pageContents = fs.createReadStream(filePath);
//
//   pageContents.on('error', (err) => {
//     handler.serveError(req, res, err);
//   });
//
//   pageContents.on('open', () => {
//     res.writeHead(200, {'content-type':'text/html'});
//     pageContents.pipe(res);
//   });
//
// };
