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
      console.log('crush: ' + crushId);
    var getEventsOfCrush = 'SELECT name, privacy, start_time, eid FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid = ' + crushId + ' AND rsvp_status = "attending" AND start_time > now()) LIMIT 3';
    FB.api('/fql', 'GET', {q: getEventsOfCrush}, function(response) {
    if (response && response.data) {
        for (var i = 0; i < response.data.length; ++i)
        {
          var date = new Date(response.data[i].start_time);
          eventDataArray.push([response.data[i].name, date.toDateString(), response.data[i].eid]);
        }
    }

    console.log('event length:' + eventDataArray.length);
    //NICK: At this point, eventDataArray has the data stored as tuples - {name, start_time, eid}
    // need to set each of the event IDs
    eventIDs = ["event1", "event2", "event3"];
    eventLinkIDs = ["event_link1", "event_link2", "event_link3"];
    for (var i = 0; i < eventIDs.length; i++) {
      eventObj = $("#" + eventIDs[i]);
      eventObj.children(".event_title").text(eventDataArray[i][0]);
      eventObj.children(".event_date").text(eventDataArray[i][1]);
      eventLinkObj = $("#" + eventLinkIDs[i]);
      eventLinkObj.attr("href", "http://www.facebook.com/events/" + eventDataArray[i][2]);
    }

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


