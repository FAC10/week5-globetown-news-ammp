const handlers = require('./handlers');

const router = (req, res) => {
  const url = req.url;

  if (url ==='/') {

    handlers.serveLanding(req, res);

  }
  
};


module.exports = router;
