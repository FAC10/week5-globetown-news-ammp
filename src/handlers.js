const fs = require('fs');
const path = require('path');
// const prettyjson = require('prettyjson');
const request = require('request');

require('env2')('.env');


const handlers = {};


/**
  * Serves the landing page
  *
  * @param {Stream Object} req The request object
  * @param {Stream Object} res The response object
  * @returns {HTML} Pipes the response to the front end
  */
handlers.serveLanding = (req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html'
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
handlers.getContentType = (url) => {
  const extension = path.extname(url);
  const extensionType = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.ico': 'image/x-icon'
  };
  return extensionType[extension];
};


/**
  * Serves our assets
  *
  * @param {Stream object} req Stream object
  * @param {Stream object} res The response object
  * @returns {content type and asset} pipes asset to the front end
  */
handlers.serveAssets = (req, res) => {
  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', req.url));

  readStream.on('open', () => {
    res.writeHead(200, {
      'content-type': handlers.getContentType(req.url)
    });
    readStream.pipe(res);
  });

  readStream.on('error', () => {
    handlers.serveNotFound(req, res);
  });
};


/**
  * This handler makes a request to the TfL API
  *
  * @param {Stream} req This is the request object
  * @param {stream} res This is the response object
  * @returns {Object} Outputs JSON data to front end
  */
handlers.serveTravel = (req, res) => {
  request(`https://api.tfl.gov.uk/StopPoint/940GZZLUBLG/Arrivals`, (err, apiResponse, body) => {
    const travelObj = {};

    if (err) {
      travelObj.error = err;

    } else {
      const travelResults = JSON.parse(body);

      travelObj.arrivals = travelResults.map((train) => {
        return {
          'platform': train.platformName,
          'destination': train.towards,
          'line': train.lineName,
          'secondsToStation': train.timeToStation
        };
      });

      travelObj.error = null;
    }

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(travelObj));
  });
};


/**
  * This handler makes a request to the guardian API
  *
  * @param {Stream} req This is the request object
  * @param {stream} res This is the response object
  * @returns {Object} Outputs JSON data to front end
  */
handlers.serveNews = (req, res) => {
  request(`https://content.guardianapis.com/search?q=travel,transport,tube&api-key=${process.env.newsKey}&show-fields=thumbnail,headline,trailText,shortUrl,wordcount`,
    (err, apiResponse, body) => {
      const newsObj = {};

      const apiResponseBody = JSON.parse(body);

      if (err || apiResponseBody.message) {
        newsObj.error = err || 'News Api Error';

      } else {
        newsObj.articles = apiResponseBody.response.results.map((story) => {
          return story.fields;
        });
        newsObj.error = null;

      }

      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(newsObj));
    });
};


handlers.serveNotFound = (req, res) => {
  res.writeHead(404, {
    'content-type': 'text/html'
  });
  res.end('<h1>404 Page Not Found 😩</h1>');
};


module.exports = handlers;
