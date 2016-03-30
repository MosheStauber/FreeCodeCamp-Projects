var lat;
var lon;

var showCel = false;
var degFarSym = "&#8457";
var degCelSym = "&#8451";
var tempCel;
var tempFar;
var forecasts;

var getWeather = function() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      //console.log("Geolocation found:\nlat: " + lat + "\nlon: " + lon);

      $.ajax({
        headers: {
          "X-Mashape-Key": "IpEJGZJhTSmshUEvEAodY1fyeQG9p1DacEujsn9YHbFpVFIHJx",
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://simple-weather.p.mashape.com/weatherdata?lat=' + lat + "&lng=" + lon,
        success: function(data) {
          var json = JSON.parse(data);

          var d = new Date();
          var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];

          $("#city-country").html(json.query.results.channel.location.region + ", " + json.query.results.channel.location.country);
          // $("#time").html(d.getHours()+":"+d.getMinutes() + "\t" + days[d.getDay()] + ', ' + months[d.getMonth()] +' '+d.getDate() + ' '+ d.getFullYear() );
          tempCel = json.query.results.channel.item.condition.temp;
          tempFar = (tempCel * 9 / 5) + 32;

          $("#date").html(json.query.results.channel.item.condition.date);
          $("#temp").html(Math.round(tempFar) + " " + degFarSym);

          var cond = json.query.results.channel.item.condition.text;
          $("#conditions").html(cond);

          var sunrise = json.query.results.channel.astronomy.sunrise;
          var sunset = json.query.results.channel.astronomy.sunset;

          $("#sunrise").html("Sunrise: " + sunrise);
          $("#sunset").html("Sunset: " + sunset);

          forecasts = json.query.results.channel.item.forecast;

          for (var i = 1; i < forecasts.length; i++) {
            var tag = "#day" + i;
            $(tag).children("p").html(forecasts[i].day);
            $(tag).children("div").html(forecasts[i].text);
            $(tag).children("span").html("High:" + Math.round((forecasts[i].high * 9 / 5) + 32) + " Low:" + Math.round((forecasts[i].low * 9 / 5) + 32));
          }

          var date = new Date();

          //Change background images depending on time/conditions
          if (date.getHours() >= parseInt(sunset[0]) + 12) { //night time 
            if(cond.indexOf("cloud") >= 0){
              $("#page").css('background-image', 'url(http://cdn.desktopwallpapers4.me/wallpapers/artistic/1920x1080/2/13615-dark-sky-1920x1080-artistic-wallpaper.jpg)');              
            }else if(cond.indexOf("rain") >=0){ //rainy skies
              $("#page").css('background-image', 'url(http://cdn.desktopwallpapers4.me/wallpapers/digital-art/1920x1080/4/40891-raindrops-1920x1080-digital-art-wallpaper.jpg)');
            }else{//default clear skies
              $("#page").css('background-image', 'url(http://cdn.desktopwallpapers4.me/wallpapers/digital-art/1920x1080/4/39441-clear-night-sky-1920x1080-digital-art-wallpaper.jpg)');            
            }
          } else {//daytime
            if (cond.indexOf("cloud") >= 0) {//if conditions are cloudy
              $("#page").css('background-image', 'url(http://cdn.desktopwallpapers4.me/wallpapers/nature/1920x1080/5/52054-late-autumn-tree-rising-to-the-dark-sky-1920x1080-nature-wallpaper.jpg)');
            }else if(cond.indexOf("rain") >=0){//rainy conditions
              $("#page").css('background-image', 'url(http://cdn.desktopwallpapers4.me/wallpapers/digital-art/1920x1080/4/40891-raindrops-1920x1080-digital-art-wallpaper.jpg)');
            }else { //default clear skies
              $("#page").css('background-image', 'url(http://cdn.desktopwallpapers4.me/wallpapers/world/1920x1080/5/51926-windmill-on-the-lake-side-1920x1080-world-wallpaper.jpg)', 'fixed');
            }
          }
        }
      });

    });
  } else {
    alert("no geolocation");
  }

};

$(document).ready(function() {
  getWeather();

  $("#temp").on("click", function() {

    if (showCel) {
      $("#temp").html(Math.round(tempFar) + " " + degFarSym);
      for (var i = 1; i < forecasts.length; i++) {
        var tag = "#day" + i;
        $(tag).children("span").html("High:" + Math.round((forecasts[i].high * 9 / 5) + 32) + " Low:" + Math.round((forecasts[i].low * 9 / 5) + 32));
      }
      showCel = false;
    } else {
      $("#temp").html(Math.round(tempCel) + " " + degCelSym);
      for (var i = 1; i < forecasts.length; i++) {
        var tag = "#day" + i;
        $(tag).children("span").html("High:" + forecasts[i].high + " Low:" + forecasts[i].low);
      }
      showCel = true;
    }
  });
});

/*
{
  "query": {
    "count": 1,
    "created": "2016-03-17T22:45:22Z",
    "lang": "en-US",
    "results": {
      "channel": {
        "title": "Yahoo! Weather - Midwood, NY",
        "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Midwood__NY/*http://weather.yahoo.com/forecast/USNY0176_c.html",
        "description": "Yahoo! Weather for Midwood, NY",
        "language": "en-us",
        "lastBuildDate": "Thu, 17 Mar 2016 6:13 pm EDT",
        "ttl": "60",
        "location": {
          "city": "Midwood",
          "country": "United States",
          "region": "NY"
        },
        "units": {
          "distance": "km",
          "pressure": "mb",
          "speed": "km/h",
          "temperature": "C"
        },
        "wind": {
          "chill": "12",
          "direction": "170",
          "speed": "4.83"
        },
        "atmosphere": {
          "humidity": "58",
          "pressure": "982.05",
          "rising": "0",
          "visibility": "16.09"
        },
        "astronomy": {
          "sunrise": "7:01 am",
          "sunset": "7:04 pm"
        },
        "image": {
          "title": "Yahoo! Weather",
          "width": "142",
          "height": "18",
          "link": "http://weather.yahoo.com",
          "url": "http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif"
        },
        "item": {
          "title": "Conditions for Midwood, NY at 6:13 pm EDT",
          "lat": "40.62",
          "long": "-73.96",
          "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Midwood__NY/*http://weather.yahoo.com/forecast/USNY0176_c.html",
          "pubDate": "Thu, 17 Mar 2016 6:13 pm EDT",
          "condition": {
            "code": "28",
            "date": "Thu, 17 Mar 2016 6:13 pm EDT",
            "temp": "12",
            "text": "Mostly Cloudy"
          },
          "description": "\n<img src=\"http://l.yimg.com/a/i/us/we/52/28.gif\"/><br />\n<b>Current Conditions:</b><br />\nMostly Cloudy, 12 C<BR />\n<BR /><b>Forecast:</b><BR />\nThu - Partly Cloudy. High: 17 Low: 7<br />\nFri - Mostly Sunny. High: 14 Low: 1<br />\nSat - Mostly Sunny. High: 8 Low: 1<br />\nSun - Snow. High: 3 Low: -1<br />\nMon - AM Snow. High: 6 Low: -2<br />\n<br />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Midwood__NY/*http://weather.yahoo.com/forecast/USNY0176_c.html\">Full Forecast at Yahoo! Weather</a><BR/><BR/>\n(provided by <a href=\"http://www.weather.com\" >The Weather Channel</a>)<br/>\n",
          "forecast": [{
            "code": "29",
            "date": "17 Mar 2016",
            "day": "Thu",
            "high": "17",
            "low": "7",
            "text": "Partly Cloudy"
          }, {
            "code": "34",
            "date": "18 Mar 2016",
            "day": "Fri",
            "high": "14",
            "low": "1",
            "text": "Mostly Sunny"
          }, {
            "code": "34",
            "date": "19 Mar 2016",
            "day": "Sat",
            "high": "8",
            "low": "1",
            "text": "Mostly Sunny"
          }, {
            "code": "16",
            "date": "20 Mar 2016",
            "day": "Sun",
            "high": "3",
            "low": "-1",
            "text": "Snow"
          }, {
            "code": "16",
            "date": "21 Mar 2016",
            "day": "Mon",
            "high": "6",
            "low": "-2",
            "text": "AM Snow"
          }],
          "guid": {
            "isPermaLink": "false",
            "content": "USNY0176_2016_03_21_7_00_EDT"
          }
        }
      }
    }
  }
} */