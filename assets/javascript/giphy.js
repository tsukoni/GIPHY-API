var topics = ["kfc", "taco bell", "pizza hut", "mcdonalds", "burger king", "jack in the box", "arbys", "wendys", "white castle", "in n out"];
var api = "qKI9o7vmxHqMSJ5umVXCxbCWPxN8HFxj";
function callButtons() {
	$("#button-collection").empty();
	for (var i = 0; i < topics.length; i++) {
	var newButton = $("<button>").text(topics[i]);
	newButton.attr("class", "thingie");
	newButton.attr("value", topics[i]);
	$("#button-collection").append(newButton);	
	}
}
callButtons();
function callGIFS() {

}

$(document.body).on("click", ".thingie", function() {
	event.preventDefault();

	var search = $(this).val();
	var search2 = search.replace(/\ /g, '+');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search2 + "&api_key=" + api + "&limit=10";
	$.ajax({
		url: queryURL,
   		method: "GET"
  	}).done(function(GIPHYData) {
  		var results = GIPHYData.data;	
  		console.log(results);
  		
  		

	});
});
$(document.body).on("click", ".gif", function() {
	var state = $(this).attr("data-state");
	if (state === "still") {
    	$(this).attr("src", $(this).attr("data-animate"));
   		$(this).attr("data-state", "animate");
  	}
  	else {
    	$(this).attr("src", $(this).attr("data-still"));
    	$(this).attr("data-state", "still");
  	}
});
$(document.body).on("click", ".submit", function() {
	event.preventDefault();
	var searchTerm = $("#query").val();
	var search2 = searchTerm.replace(/\ /g, '+');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search2 + "&api_key=" + api + "&limit=10&rating=pg-13";
	$.ajax({
		url: queryURL,
   		method: "GET"
  	}).done(function(GIPHYData) {
  		var results = GIPHYData.data;	
  		topics.push(searchTerm);
  		console.log(topics);
  		callButtons();
  		for (var i = 0; i < results.length; i++) {

  			var newDiv = $("<div>");
  			var newGIF = $("<img>");
  		
  			newGIF.attr("src", results[i].images.fixed_height_still.url);
  			newGIF.addClass("gif");
  			newGIF.attr("data-state", "still");
			newGIF.attr("data-still", results[i].images.fixed_height.url);
			newGIF.attr("data-animate", results[i].images.fixed_height_still.url);
			newDiv.append(newGIF);
			newDiv.append("<h3>Rated: " + results[i].rating + "</h3>");
  			$("#current-gifs").prepend(newDiv);
  		}

	});
});