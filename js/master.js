// Additional JS functions here
window.fbAsyncInit = function() {
    FB.init({
          appId      : '452746094806213', // App ID
          channelUrl : '//localhost:8080/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
      });

    FB.getLoginStatus(function(response){       
            //not logged in upon opening the page
            if (response.status === 'connected') {
                var userIdString = response.authResponse.userID;
                $.post('/update', {user_id: '744778013', user_name: 'Nick Van Hoogenstyn'})
                var getNameQuery = 'SELECT name FROM user WHERE uid=' + userIdString;
                FB.api('/fql', 'GET', {q: getNameQuery}, function(response) {
                  if (response && response.data) {
                      console.log("CONNECTED");
                      window.location = "check/" + userIdString;
                  }     
              }); 
            }
            else {
                console.log("NOT CONNECTED");
                window.location = "fblogin";
            }
        });       
};

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));