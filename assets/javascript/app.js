var topics = ["Joan Crawford", "Bette Davis", "Mae West", "Marlene Dietrich", "Rita Hayworth", "Greta Garbo"];

  // Function for dumping the JSON content for each button into the div
  function displayGifInfo() {

    var search = topics[0]; //$(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=caRg3WZm2q4HA0mBSohCihWnaI5DcBMv&limit=10";
        console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#gif-view").text(JSON.stringify(response));
      console.log(response);
    });
  }

  displayGifInfo();