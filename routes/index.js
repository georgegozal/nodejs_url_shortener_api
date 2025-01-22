var express = require('express');
var router = express.Router();

let controllers = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:shortened', controllers.go_website)

router.post('/', controllers.create_new)



module.exports = router;
