$("#search-term").on("keypress",function(e) {
  if (e.keyCode == 13) { //detect if enter key was pressed
    e.preventDefault();
    $("#options").animate({
      'padding-top': '0'
    }, 'fast');
    findArticles();
  }
});

function getRandomWiki() {
  var win = window.open("http://en.wikipedia.org/wiki/Special:Random", '_blank');
  win.focus();
}

function findArticles() {
  var wikiEndpoint = "https://en.wikipedia.org/w/api.php?";
  var search = $("#search-term").val().split(' ').join("%20");
  
  $("#results").empty();

  $.ajax({
    type: "GET",
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&callback=?&srsearch="+search,
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      console.log(data);
      var resArr = data.query.search;
      
      resArr.forEach(function(item){
        var wikiHomeUrl = "https://en.wikipedia.org/wiki/";
        var pageTitle = item.title;
        var linkToPage = wikiHomeUrl + pageTitle.split(" ").join('_');
        $("#results").append("<a href='" + linkToPage + "' target='_blank'>" + "<div class='well shadow' style='margin:15px;'><h3>" + pageTitle + "</h3>" + item.snippet + "</div>" + "</a>");
      })
      
    },
    error: function(errorMessage) {}
  });

}