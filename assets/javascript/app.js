//FUNCTIONS
//function to create buttons that stay on the screen
function renderButtons(){
    var topics = [
        "Joan Crawford",
        "Bette Davis",
        "Mae West",
        "Marlene Dietrich",
        "Rita Hayworth",
        "Greta Garbo",
        "Ava Gardner",
        "Lana Turner"
    ];

    for(var topic of topics){
        renderNewButton(topic);
    }
}

//function to make new button
function renderNewButton(topic){
    var topicButton = $("<button class='topic-button lead'>")
        .attr("data-name", topic)
        .text(topic)
        .click(function(){
            $(".topic-button").removeClass("active");
            $(this).addClass("active");
    });
    $("#buttons-view").append(topicButton);
}

// Function for retrieving JSON content from the GIPHY API
function callGiphy() {
    var search = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + encodeURIComponent(search) + "&api_key=caRg3WZm2q4HA0mBSohCihWnaI5DcBMv&limit=10";
        
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(createGif);
}

//Function that takes the response from the API call and appends the gifs to #gif-view on the page
function createGif(response){
    var imgURL;
    var gifURL;
    $("#gif-view").empty();
    for(var gif of response.data){
        var gifDiv = $("<div class='gif'>");
        var ratingDiv = $("<div class='rating lead'>");
        
        // Retrieving the URLs for the image
        imgURL = gif.images.fixed_height_still.url;
        gifURL = gif.images.fixed_height.url;
        var rating = ratingDiv.text("Rating: " + gif.rating);

        //set image attributes and append image to page
        var image = $("<img>").attr("src", imgURL);
        image.attr("data-state", "still");
        image.attr("data-still", imgURL);
        image.attr("data-animate", gifURL);
        gifDiv.append(rating);
        gifDiv.append(image);
        $("#gif-view").append(gifDiv);

        //on click toggle state
        $(image).on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    }
}

//EVENTS
//takes input from user and passes it into function renderNewButton or if nothing was entered displays an alert
$("#submit-button").on("click", function(event) {
    if($("#add-dame").val().trim() != ""){
        event.preventDefault();
        var addTopic = $("#add-dame").val().trim();
        $("#add-dame").val("");
        renderNewButton(addTopic);
    }
    else{
        alert("Please enter a name.")
    }
});

// Display gifs when one of the topic buttons is clicked
$(document).on("click", ".topic-button", callGiphy);

renderButtons();
