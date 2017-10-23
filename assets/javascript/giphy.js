var topics = ["kfc", "taco bell", "pizza hut", "mcdonalds", "burger king", "jack in the box", "arbys", "wendys", "white castle", "in n out"];
var api = "qKI9o7vmxHqMSJ5umVXCxbCWPxN8HFxj";
for (var i = 0; i < topics.length; i++) {
	var newButton = $("<button>").text(topics[i]);
	newButton.attr("class", "thingie");
	newButton.attr("value", topics[i]);
	$("#button-collection").append(newButton);	
}
$(document.body).on("click", ".thingie", function() {
	var search = $(this).val();
	var search2 = search.replace(/\ /g, '+');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search2 + "&api_key=" + api + "&limit=5";
	$.ajax({
		url: queryURL,
   		method: "GET"
  	}).done(function(GIPHYData) {
  		console.log(GIPHYData);	
	});
});