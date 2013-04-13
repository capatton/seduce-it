// Additional JS functions here
var responseData;
var userID;
clickedObject = {};
window.fbAsyncInit = function() {
    FB.init({
          appId      : '452746094806213', // App ID
          channelUrl : '//localhost:8080/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
      });
};

function postChoiceClick(event) {
    if (!jQuery.isEmptyObject(clickedObject)) {
      $('#'+clickedObject.attr('id')).toggleClass('post_choice_clicked');
    }
    clickedObject = $(this);
    $(this).toggleClass('post_choice_clicked');
};

$(document).ready(function() {
  $("div.post_choice").click(postChoiceClick);
});

function PostXContent(typeOfContent) {
  FB.getLoginStatus(function(response){       
    //not logged in upon opening the page
    if (response.status === 'connected') {
      userID = response.authResponse.userID;
      //grab funny content
      $.getJSON("http://www.reddit.com/r/" + typeOfContent + "/.json?jsonp=?", function(data) { 
          // Grab one random number (representing one of the top ten stories).
          var randomNumber=Math.floor(Math.random()*12);
          // Keep grabbing nums until NOT a self post
          while (data.data.children[randomNumber].data.is_self
                || (data.data.children[randomNumber].data.title).search("Reddit") != -1
                || (data.data.children[randomNumber].data.title).search("reddit") != -1
                || (data.data.children[randomNumber].data.title).search("My") != -1
                || (data.data.children[randomNumber].data.title).search("my") != -1
                || (data.data.children[randomNumber].data.title).search("Family") != -1
                || (data.data.children[randomNumber].data.title).search("family") != -1)
          {
            randomNumber = Math.floor(Math.random()*12) + 3 * 27 % 15;
          }
          var postURL = data.data.children[randomNumber].data.url;
          var postTitle = data.data.children[randomNumber].data.title;


          FB.api('/me/feed', 'post', {message: postTitle, link: postURL, picture: postURL }, function(response) {
          if (!response || response.error) {
            alert('Error');
          } else {
            window.location = "/dashboard/" + userID;
        }
      });


      });
    }
  });
};

function PostContent() {
  if(!jQuery.isEmptyObject(clickedObject)) {
    PostXContent(clickedObject.attr('id'));
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