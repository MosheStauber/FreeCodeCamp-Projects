var quote = "";
var author = "";
var credit = "\n\nsourced by: http://codepen.io/moosa/pen/zqoyMB";

function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "zTqaYDgVvwmshLU9NlYlEhAHiTaop1KEXLnjsnBMNvi7tHp4Cf",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
    success: function(data) {
      var post = JSON.parse(data);
      //console.log(JSON.stringify(data));
      
      author = post.author;
      quote = post.quote;
      
      $('#quote_author').text(author);
      $('#quote_text').html(quote);
    }
  });
};

$(document).ready(function() {
  getQuote();

  $('#tweet_btn').click(function(e) {
    var textToTweet = quote + "\n--" + author + credit;
    if (textToTweet.length > 140) {
      alert("Tweet length more than 140 characters!");
    } else{
      var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(textToTweet);
      window.open(twtLink, '_blank');
    }
  });

});
$("#new_quote_btn").on("click", getQuote);