var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  const samples = [1, 2, 3, 4, 5];

  res.render('index', { title: 'Deluge kit generator', samples: samples, upload: false });
});

module.exports = router;
