var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('loading');
  res.render('index',{
    title:'Favorite Albums',
    subtitle:'Add and Edit Your Favorite Albums of All Time:'
  });
});
router.get('/edit_albums', function(req, res, next) {
  res.render('edit_albums');
});

module.exports = router;
