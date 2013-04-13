// Additional JS functions here
window.fbAsyncInit = function() {
    FB.init({
          appId      : '148310075327662', // App ID
          channelUrl : '//localhost:8080/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
      });

FB.getLoginStatus(function(response){
    if (response.status === 'connected') {
    var GetAllFriends = "SELECT name, uid, pic_small FROM user WHERE uid IN (SELECT uid1 FROM friend WHERE uid2=me()) ORDER BY name"
    FB.api('/fql', 'GET', {q: GetAllFriends}, function(response) {
    if (response && response.data) {
        console.log("HI");
        var listOfFriends = [""];
        for (var i = 0; i < response.data.length; ++i)
        {
            listOfFriends.push(response.data[i].name);
        }

        $("#friendNames").autocomplete({
          source: listOfFriends
        });
    }});     
}
else {
    console.log("NOT CONNECTED");
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