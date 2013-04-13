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

function PostXContent(typeOfContent) {
  FB.getLoginStatus(function(response){       
    //not logged in upon opening the page
    if (response.status === 'connected') {
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


          //Post it to the user's wall
           FB.ui(
           {
               method: 'feed',               
               picture: postURL,
               link: postURL,
               description: postTitle,
           },
           function(response) {
             if (response && response.post_id) {
               alert('Post was published.');
             } else {
               alert('Post was not published.');
             }
           } 
           );


      });
    }
  });
}

function PostContent() {
  var typeOfContent = $("#content_drop_down").val();
  if (typeOfContent == "funny")
  {
    PostXContent("funny");
  }
  else if (typeOfContent == "world_news")
  {
    PostXContent("worldnews");
  }
  else if (typeOfContent == "scientific")
  {
    PostXContent("science");
  }
  else if (typeOfContent == "music")
  {
    PostXContent("music");
  }
  else if (typeOfContent == "movies")
  {
    PostXContent("movies");
  }
  else
  {
    PostXContent("atheism");
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