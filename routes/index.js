var express = require('express');
var router = express.Router();

let controllers = require('../controllers/index')

router.get('/favicon.ico', (req, res) => res.status(204).end());

/* GET home page - API documentation */
router.get('/', function(req, res, next) {
  res.json({
    message: "Welcome to the URL Shortener API",
    endpoints: [
      {
        method: "GET",
        path: "/",
        description: "Displays API documentation (this message).",
      },
      {
        method: "POST",
        path: "/",
        description: "Creates a shortened URL for the provided original URL.",
      },
      {
        method: "GET",
        path: "/:shortCode",
        description: "Redirects to the original URL based on the short code.",
      },
      {
        method: "GET",
        path: "/qr/:shortCode",
        description: "Generates a QR code for the shortened URL.",
      },
      {
        method: "GET",
        path: "/urls/list",
        description: "Retrieves a list of all shortened URLs stored in the database.",
      }
    ]
  });
});

router.post('/', controllers.createNew)

router.get('/urls/list', controllers.getUrls)

router.get('/:shortened', controllers.goWebsite)

router.get('/qr/:shortened', controllers.getQrCode)

module.exports = router;
