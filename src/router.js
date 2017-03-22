const handlers = require('./handlers');

const router = (req, res) => {
  const url = req.url;

  if (url ==='/') {

    handlers.serveLanding(req, res);

  } else if (url.indexOf('/assets') === 0) {

    handlers.serveAssets(req, res);

  }

};


module.exports = router;
