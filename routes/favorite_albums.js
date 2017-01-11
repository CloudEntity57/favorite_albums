var express = require('express');
var router = express.Router();
var AlbumModel = require('../models/albumpost');

router.get('/', function(req, res){
  AlbumModel.find({},function(err,albums){
    if(err) console.error("Error: ",err);
    res.json(albums);
  });

});

router.post('/', function(req,res){
  console.log(req.body);
  var postInfo = {
    artist: req.body.artist,
    title: req.body.title,
    img: req.body.img
  };
  var newPost = new AlbumModel(postInfo);

  newPost.save(function(err,success){
    res.redirect('/');
  });


});

router.put('/', function(req,res){
    var id = req.body.id;
    var updateInfo = {
      title: req.body.title,
      artist: req.body.artist,
      img: req.body.img
    };
    AlbumModel.findByIdAndUpdate(id,updateInfo,function(err,post){
      if(err) console.error("error: ",err);
      console.log('updated!');
      res.send('SUCCESS');
    });
});

router.delete('/', function(req,res){
  var id = req.body.id;
  console.log(id);
  AlbumModel.findByIdAndRemove(id,function(err,post){
    if(err) console.error("error: ",err);
    res.send('SUCCESS');
  });
});

module.exports = router;
