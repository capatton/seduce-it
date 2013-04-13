var eventIds = new Array();
var zzz = 0;

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
   // var getNamesQuery = 'SELECT name, music FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me() LIMIT 100) AND music <>""';
   // //put the music likes into a hash table and grab the most popular (max num of people listed it)
   
   
   //Note: query only works for attending events or not replied events, limited at 4
   var eventListQuery = 'SELECT eid, rsvp_status FROM event_member WHERE uid = me() AND (rsvp_status="attending" OR rsvp_status="not_replied") AND start_time > now() LIMIT 4';
   //get event list
   FB.api('/fql', 'GET', {q: eventListQuery}, function(response) {
    if (response && response.data) {
      document.getElementById("eventIds").innerHTML = "Events: " + "</br></br>";
      for (var i = 0; i < response.data.length; ++i) {
        document.getElementById("eventIds").innerHTML += "Event id: " + response.data[i].eid + " --- " + "Event status: " + response.data[i].rsvp_status + "</br>";
        eventIds[i] = response.data[i].eid;
    } 
}
});


  //  FB.api('/fql', 'GET', {q: 'SELECT * FROM like WHERE user_id = me()'}, function(response){
  //    if (response && response.data) {
  //     document.getElementById("test").innerHTML += "Likes: \n";
  //     for (j = 0; j < response.data.length; ++j) {
  //       document.getElementById("test").innerHTML += (response.data[i]);
  //     }
  //   }
  // });
}  
else {
    alert("ERROR! User should not be on this screen");
}

});
};

function getNumMales(event_id) {
}

function buttonclick(index)
{
    var id = eventIds[index];
    var getNameQuery = 'SELECT name, attending_count FROM event WHERE eid=' + id;
    var attending_count = 0;
    FB.api('/fql', 'GET', {q: getNameQuery}, function(response) {
        if (response && response.data) {
          attending_count = response.data[0].attending_count;
          document.getElementById("eventInfo").innerHTML = "Name: " + response.data[0].name + "</br>Num members: " + attending_count;
          var getMalesQuery = 'SELECT name FROM user WHERE uid in (SELECT uid FROM event_member WHERE eid=' + id + ' AND rsvp_status="attending") AND sex="male"';
          FB.api('/fql', 'GET', {q: getMalesQuery}, function(response) {
            if (response && response.data) {
             var numMales = response.data.length;
             var numFemales =  attending_count - numMales;
             document.getElementById("eventInfo").innerHTML += "</br>Males: " + numMales + "</br>Females: " + numFemales + "</br>Percent Male: " + numMales/(numMales + numFemales).toFixed(2) + "</br>Percent Female: " + numFemales/(numMales + numFemales); 
         }
     })
      }
  })  
}


// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));