// Additional JS functions here
var responseData;
var userId;
window.fbAsyncInit = function() {
    FB.init({
          appId      : '248021992007918', // App ID
          channelUrl : '//localhost:8080/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
      });

FB.getLoginStatus(function(response){
    if (response.status === 'connected') {
    var GetAllFriends = "SELECT name, uid, pic_big, sex FROM user WHERE uid IN (SELECT uid1 FROM friend WHERE uid2=me()) ORDER BY name"
    FB.api('/fql', 'GET', {q: GetAllFriends}, function(response) {
    if (response && response.data) {
        responseData = response.data;
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

function ClickFunction() {
    FB.getLoginStatus(function(response){
     var crushName = $("#friendNames").val();
     var crushId = 0;
     var crushSex;
     var userName;
      if (response.status === 'connected') {
        userId = response.authResponse.userID;
         var getUserName = "SELECT name FROM user WHERE uid = me()"
         FB.api('/fql', 'GET', {q: getUserName}, function(response) {
          userName = response.data[0].name;

          for (var j = 0; j < responseData.length; ++j)
          {
              if (responseData[j].name == crushName)
              {
                  crushId = responseData[j].uid;
                  crushPicLink = responseData[j].pic_big;
                  crushSex = responseData[j].sex;
              }
              if (responseData[j].uid === userId)
              {
                userName = responseData[j].name;
              }
          }

          $.post('/update', {user_id: userId, user_name: userName, crush_id: crushId, crush_name: crushName, crush_pic: crushPicLink, crush_sex: crushSex});
          setTimeout(function() { window.location = "/dashboard/" + userId; }, 1000);
          //window.location = "/dashboard/" + userId;

     });
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