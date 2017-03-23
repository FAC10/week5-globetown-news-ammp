const fs = require('fs');
const path = require('path');
const prettyjson = require('prettyjson');
const request = require('request');



var env = require('env2');
env('.env');



const handlers = {};

/**
 * This handler makes a request to the guardian API
 *
 * @param {Stream} req This is the request object
 * @param {stream} res This is the response object
 * @returns {Object} Outputs JSON data to front end
 */
handlers.serveNews = (req, res) => {
  var newsObj = {};
  request(`https://content.guardianapis.com/search?q=travel,transport,tube&api-key=${process.env.newsKey}&show-fields=thumbnail,headline,trailText,shortUrl,wordcount`,
    (err, response, body) => {

      var ourResults = JSON.parse(body);
      var newsObj = ourResults.response.results.map((story) => {
        return story.fields;
      });
      newsObj.error = err;
      // ourResults.response.results.forEach((story) => {
      //   newsObj.articles.push(story.fields);
      // });
      console.log('newsObj', prettyjson.render(newsObj));
      res.writeHead(200, {
        'content-type': 'application/json'
      });
      res.end(JSON.stringify(newsObj));
    });
};

/**
 * Serves the landing page
 *
 * @param {Stream Object} req The request object
 * @param {Stream Object} res The response object
 * @returns {HTML} Pipes the response to the front end
 */
handlers.serveLanding = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', 'index.html'));
  readStream.pipe(res);
};


/**
 * Takes a URL that splits off the extension and returns and extension type
 *
 * @param {string} url the url string
 * @returns {Object} Content type
 */
function getContentType(url) {
  const extension = path.extname(url);
  const extensionType = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.ico': 'image/x-icon'
  };
  return extensionType[extension];
}


/**
 * Serves our assets
 *
 * @param {} req Stream object
 * @param {Stream object} res The response object
 * @returns {content type and asset} pipes asset to the front end
 */
handlers.serveAssets = (req, res) => {
  res.writeHead(200, {
    'Content-Type': getContentType(req.url)
  });
  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', req.url));
  readStream.pipe(res);
};


module.exports = handlers;
