var mongoose = require('mongoose');

var AlbumPost = new mongoose.Schema({
  artist: String,
  title: String,
  img: String
});

var AlbumModel = mongoose.model('albums',AlbumPost);

module.exports = AlbumModel;
