  var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin"];
  var online = [];
  var offline = [];

  $(document).ready(function() {
    
    getStreamInfo();
    
    $("#show-all").click(function(){
      $('button').each(function() {
        $(this).removeClass("selected");
      });
      $(this).addClass("selected");
      $("#streamers").empty();
      showOnline();
      showOffline();
      
    });
    
    $("#show-online").click(function(){
      $('button').each(function() {
        $(this).removeClass("selected");
      });
      $(this).addClass("selected");
      $("#streamers").empty();
      showOnline();
    });
    
    $("#show-offline").click(function(){
      $('button').each(function() {
        $(this).removeClass("selected");
      });
      $(this).addClass("selected");
      $("#streamers").empty();
      showOffline();
    });
    
  });

$(document).ajaxStop(function(){
  showOnline();
});

 function getStreamInfo(){
     var url = "https://api.twitch.tv/kraken/channels/";

    streamers.forEach(function(channel) {

      $.getJSON(url + channel + '?callback=?', function(data) {
        console.log(data);
        if(data.hasOwnProperty('error')){
          data["status"] = data.message;
          data["display_name"] = channel;
          data["logo"] = "http://i141.photobucket.com/albums/r80/Kebove/f-spot-question-mark.png";
          offline.push(data);
        }else{
          data.logo ? null : data.logo = "http://i141.photobucket.com/albums/r80/Kebove/f-spot-question-mark.png";
          data.status ? online.push(data) : offline.push(data);
        }
      });
    });
    
    return true;
  }

  function showOnline() {
    online.forEach(function(data) {     
      var status = data.status;

      var userUrl = "http://www.twitch.tv/" + data.display_name.toLowerCase();      
      $("#streamers").append("<a href='" + userUrl + "' target='_blank'>" + "<div class='well' style='background:rgba(0,200,0,.3)'><img class='img-responsive' style='width:50px;height:50px;display:inline;margin-right:5px;' src='" + data.logo + "'/>" + "<h3 style='display:inline'>" + data.display_name + "</h3><h4>" + status + "</h4></div>" + "</a>");
    });
  }

  function showOffline() {
    offline.forEach(function(data) {
      
      var status = data.status ? data.status: "offline";

      var userUrl = "http://www.twitch.tv/" + data.display_name.toLowerCase();
      $("#streamers").append("<a href='" + userUrl + "' target='_blank'>" + "<div class='well' style='background:rgba(200,200,200,.5)'><img class='img-responsive' style='width:50px;height:50px;display:inline;margin-right:5px;'src='" + data.logo + "'/>" + "<h3 style='display:inline'>" + data.display_name + "</h3><h4>" + status + "</h4></div>" + "</a>");
    });
  }