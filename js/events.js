var eventDataArray = [];
window.fbAsyncInit = function() {
  FB.init({
          appId      : '452746094806213', // App ID
          channelUrl : '//localhost:8080/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
        });
  FB.getLoginStatus(function(response){
    if (response.status === 'connected') {
      //name, date, friends attending, link
    var getEventsOfCrush = 'SELECT name, privacy, start_time, eid FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid = 744778013 AND rsvp_status = "attending" AND start_time > now()) AND privacy="OPEN" LIMIT 3';
    FB.api('/fql', 'GET', {q: getEventsOfCrush}, function(response) {
    if (response && response.data) {
        for (var i = 0; i < response.data.length; ++i)
        {
          eventDataArray.push([response.data[i].name, response.data[i].start_time, response.data[i].eid]);
        }
    }
    //NICK: At this point, eventDataArray has the data stored as tuples - {name, start_time, eid}

  })}});     

};

// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));


