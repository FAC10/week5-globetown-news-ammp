const fs = require('fs');
const path = require('path');
const urlModule = require('url');
const request = require('request');



var env = require('env2');
env('.env');
console.log('newsKey', process.env.newsKey);
// console.log('tflKey', process.env.tflKey);



const handlers = {};

handlers.serveNews = (req, res) => {
  var newsObj = {};
  request(`https://content.guardianapis.com/search?api-key=${process.env.newsKey}&show-fields=thumbnail,headline,trailText`,
    (err, response, body) => {
      // console.log('error', err);
      // console.log('response', response && response.statusCode);
      var ourResults = JSON.parse(body);
      newsObj.error = err;
      newsObj.articles = [];
      ourResults.response.results.forEach((story) => {
        newsObj.articles.push(story.fields);
      });
      console.log('newsObj', newsObj);
      res.writeHead(200, {
        'content-type': 'application/json'
      });
      res.end(JSON.stringify(newsObj));
    });
};


handlers.serveLanding = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
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
  res.writeHead(200, {
    'Content-Type': getContentType(req.url)
  });
  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', req.url));
  readStream.pipe(res);
};


module.exports = handlers;
