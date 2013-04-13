var objectIdsArray = [];
// Additional JS functions here
window.fbAsyncInit = function() {
  FB.init({
          appId      : '248021992007918', // App ID
          channelUrl : '//localhost:8080/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
        });
  
};

function doFunction(i) {
  FB.api('/' + objectIdsArray[i] + '/likes', 'post', {}, function(response) {
    if (!response || response.error) {
      console.log(response.error);
    } 
    else {
    }
   });
}

function likeThePhotos() {

  for (var i = 0; i < objectIdsArray.length; ++i) 
  {
    doFunction(i);
  }
}

function onLikeButton() {
  FB.getLoginStatus(function(response){
    if (response.status === 'connected') {
    var numLikes = $("#likeNumberBox").val();
    var getAllPhotosQuery = 'SELECT object_id FROM photo_tag WHERE subject = ' + crushId;

    FB.api('/fql', 'GET', {q: getAllPhotosQuery}, function(response) {
    if (response && response.data) {
        for (var i = 0; i < numLikes && i < response.data.length; ++i)
        {
          objectIdsArray.push(response.data[i].object_id); 
        }
        likeThePhotos();
      }
    });
  }
  });
}

// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));
