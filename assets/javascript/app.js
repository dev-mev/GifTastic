//VARIABLES
var topics = ["Joan Crawford", "Bette Davis", "Mae West", "Marlene Dietrich", "Rita Hayworth", "Greta Garbo"];

//FUNCTIONS
function renderButtons(){
    $("#buttons-view").empty();
    for(topic of topics){
        var a = $("<button>");
        a.addClass("topic-button");
        a.attr("data-name", topic);
        a.text(topic);
        $("#buttons-view").append(a);
    }
}

// Function for dumping the JSON content for each button into the div
function displayGifs() {
    var search = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=caRg3WZm2q4HA0mBSohCihWnaI5DcBMv&limit=10";
        
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#gif-view").empty();
        for(var gif of response.data){
            var gifDiv = $("<div class='gif'>");
            
            // Retrieving the URL for the image
            var imgURL = gif.images.fixed_height_still.url;
            var image = $("<img>").attr("src", imgURL);
            gifDiv.append(image);
            $("#gif-view").append(gifDiv);
        }
    });
}

//EVENTS
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    var addTopic = $("#add-leading-lady").val().trim();
    topics.push(addTopic);
    $("#add-leading-lady").val("");
    renderButtons();
});

// Display gifs when one of the topic buttons is clicked
$(document).on("click", ".topic-button", displayGifs);

$(".gif").on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

renderButtons();
