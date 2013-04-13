// Additional JS functions here
var responseData;
window.fbAsyncInit = function() {
    FB.init({
          appId      : '452746094806213', // App ID
          channelUrl : '//localhost:8080/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
      });
};

function PostMusicCompliment() {
  // FB.api({ method:'post',from:'1351800775',to:'744778013' ,
  //           message: 'Really missing you'},
  // function(response) {
  //     if (response && response.post_id) {
         
  //     } else {
         
  //     }
  //   }
  // );
FB.getLoginStatus(function(response){
    if (response.status === 'connected') {
      FB.api('/744778013/feed', 'post', {message: "Hi dude" }, function(response) {
        if (!response || response.error) {
          alert('Error occured');
        } else {
          alert('Post ID: ' + response.id);
        }
      });
    }
  });
  // FB.ui({
  //       app_id:'452746094806213',
  //       method: 'send',
  //       name: "this is the name",
  //       to:744778013,
  //       link: 'https://myspace.com',
  //       message: 'HOW ARE YOU',
  //       description:'hey dude '
  //   });
}

function PostCompliment() {
  var typeOfContent = $("#tastes_dropdown").val();
  if (typeOfContent == "music")
  {
    PostMusicCompliment();
  }
  else if (typeOfContent == "movies")
  {
    PostMoviesCompliment();
  }
  else if (typeOfContent == "books")
  {
    PostBooksCompliment();
  }
};

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));