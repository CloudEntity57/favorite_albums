$(function(){  

  function loadFavorites(){

    $.get('/favorite_albums',function(res){

      //Fisher-Yates shuffle algorithm:
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

      return array;
    }
    shuffle(res);
    res.forEach(function(post,index){
      var title = post.title;
      var artist = post.artist;
      var img = post.img;
      var id = post._id;

      var albumpost = [
        '<li>',
        '<div class="post" data-postid=',id, '>',
          '<section class="title">',title,'</section>',
          '<section class="artist">',artist,'</section>',
          '<img class="img img-responsive" src="',img,'" alt="album image">',
          '<section>',
          '<a class="edit-post" href="#">Edit</a>',
          '<a class="delete-post" href="#">Delete</a>',
          '</section>',
        '</div>',
        '</li>'
      ].join('');
      $('.album_list').prepend(albumpost);
    });
  });


}
function addEventListeners(){

  $('body').on('click','a.edit-post',function(event){
    event.preventDefault();
    console.log('working');
    var $post = $(this).closest('.post');
    var postId = $post.data('postid');
    var postTitle = $post.find('.title').text();
    var postArtist = $post.find('.artist').text();
    var postImg = $post.find('.img').attr('src');
    // console.log('post: ',postTitle);
    // console.log('post: ',postArtist);
    // console.log('post: ',postImg);
    // console.log('post: ',postId);
    $post.addClass('unusual');
    $post.html([
      '<input type = "text" class="edit-title" name = "title" value ="',postTitle,'"/>',
      '<input class="edit-artist" name = "artist" value ="',postArtist,'"/>',
      '<div class="edit-box" style="background-image:url(',postImg,')">',
      '<input class="edit-img" name = "img" value ="',postImg,'"/>',
      '</div>',
      '<a href = "#" class = "send-update">Update</a>',
      '<a href ="#" class = "cancel-update">Cancel</a>'
    ].join(''));

  });

  $('body').on('click','a.cancel-update',function(event){
    event.preventDefault();
    var $post = $(this).closest('.post');
    var title = $post.find('.edit-title').val();
    var artist = $post.find('.edit-artist').val();
    var img = $post.find('.edit-img').val();
    $post.removeClass('unusual');
    $post.html(['<section class="title">',title,'</section>',
    '<section class="artist">',artist,'</section>',
    '<img class="img img-responsive" src="',img,'" alt="album image">',
    '<section>',
    '<a class="edit-post" href="#">Edit</a>',
    '<a class="delete-post" href="#">Delete</a>'].join(''));
});
  $('body').on('click','a.send-update',function(event){
    event.preventDefault();

    var $post = $(this).closest('.post');
    var title = $post.find('.edit-title').val();
    var artist = $post.find('.edit-artist').val();
    var img = $post.find('.edit-img').val();
    var id = $(this).closest('.post').data('postid');
    $post.removeClass('unusual');
    console.log('post: ',$post);
    console.log('artist: ',artist);
    console.log('title: ',title);
    console.log('img: ',img);
    console.log('title: ',title);

    var updatePost = $.ajax({
      url:'/favorite_albums',
      method: 'PUT',
      data: {
        title: title,
        artist: artist,
        img: img,
        id:id
      }
    });
    updatePost.done(function(res){
      $post.html([
        '<section class="title">',title,'</section>',
        '<section class="artist">',artist,'</section>',
        '<img class="img img-responsive" src="',img,'" alt="album image">',
        '<section>',
        '<a class="edit-post" href="#">Edit</a>',
        '<a class="delete-post" href="#">Delete</a>',
        '</section>'
      ].join(''));
    });

    updatePost.fail(function(err){
      console.log('There was an error:',err);
    });


  });
  $('body').on('click','a.delete-post',function(e){
    e.preventDefault();
    var list = $('ul');
    var $post = $(this).closest('.post').closest('li');
    var id = $(this).closest('.post').data('postid');
    if(window.confirm('Are you sure?')){
      var deletePost = $.ajax({
        url:'/favorite_albums',
        method:'DELETE',
        data:{
          id: id
        }
      });
      deletePost.done(function(){
        $post.remove();
        if($('ul li').length === 0){
          var message = "YOU HAVE NO FAVORITES!";
          $('.album-list').prepend(message);
          return;
        }
      })
    }

  });
  // $('body').on('click','.post', function(){
  //   $(this).toggleClass('unusual');
  // });
}
// function addEventListeners(){
//   $('body').on('click',)
// }
function main(){
  loadFavorites();
  addEventListeners();
}
main();
});
