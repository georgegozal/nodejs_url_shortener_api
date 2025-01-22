var express = require('express');
var router = express.Router();

let controllers = require('../controllers/index')

router.get('/favicon.ico', (req, res) => res.status(204).end());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:shortened', controllers.goWebsite)

router.post('/', controllers.createNew)

router.get('/urls/list', controllers.getUrls)

router.get('/qr/:shortened', controllers.getQrCode)

module.exports = router;
