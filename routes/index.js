var express = require('express');
var router = express.Router();


const { getIndexData } = require('../controllers/index');


/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/


router.get('/', getIndexData);


module.exports = router;
