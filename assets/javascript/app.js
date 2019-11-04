// YELP BELOW

// On page load, 
    // display top 5 search results for 
        // 3 pre-selected categories for 1 pre-selected city 
$(document).ready(function () {

    console.log("Page load function works");

    var city = "Amsterdam";
    var category = "Outdoor Dining";
    // var categors = ["Outdoor Dining", "Museums", "Nature"];

    // for (i = 0; i < categors.length; i++) {}

    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + category + "&location=" + city

    // console.log(categors);
    // console.log("categor[0] = " + categors[0]);
    // console.log("categor[1] = " + categors[1]);
    // console.log("categor[2] = " + categors[2]);

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            Authorization: "Bearer f_OWbSivdwPfDyl30viNm1pnNTDjKRkxJILe56UtQARE0RCvNNOoDY11kZPHD3XBxpDDsHLcQ4gUlUfE_-CxM89He8J5bEgGByTO56_pk-LILybh25BE7NgrRLQsXXYx",
        },
        dataType: 'json',
    })

        .then(function (response) {

            // console.log("Ajax Response below");
            // console.log(response);

            // var results = response.data;
            // console.log(results);

            for (j = 0; j < 5; j++) {

                var yelpResult = $("<div>");
                yelpResult.attr("class", "card-panel hoverable");

                var bName = response.businesses[j].name;
                var bImage = response.businesses[j].image_url;
                var bRating = response.businesses[j].rating;
                var bPhone = response.businesses[j].phone;
                var bLocation = response.businesses[j].location.display_address;
                var lat = response.businesses[j].coordinates.latitude;
                var lon = response.businesses[j].coordinates.longitude;

                // console.log("Business Name = " + bName);
                // console.log("Image URL = " + bImage);
                // console.log("Phone = " + bPhone);
                // console.log("Address = " + bLocation);
                // console.log("Rating = " + bRating);
                // console.log("Latitude, longitute = " + lat, lon);

                var imageRender = $("<img>")
                imageRender.attr("src", bImage);
                imageRender.attr("class", "responsive-img", bImage);
                yelpResult.append(imageRender);
                yelpResult.append("<b>" + bName + "</b>");
                yelpResult.append("</br><i class=\"fas fa-star\"></i> " + bRating + " Stars");
                yelpResult.append("</br><i class=\"fas fa-map-marker-alt\"></i> " + bLocation);
                yelpResult.append("</br><i class=\"fas fa-phone-alt\"></i> " + bPhone);

                $("#yelp-display-1").append(yelpResult);
            }
        })

});

// On click of search button,
    // empty the divs under yelp-display-1 (or 2 or 3)
    // and display top 5 search results for 
        // each user input category for user input city 
$("#search-btn-1").on("click", function (event) {

    event.preventDefault();

    var city = $("#city-name").val().trim();
    var category = $("#yelp-search-1").val().trim();
    console.log("City = " + city + ", Search = " + category);

    $("#yelp-display-1").empty(); // empty yelp-display div

    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + category + "&location=" + city

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            Authorization: "Bearer f_OWbSivdwPfDyl30viNm1pnNTDjKRkxJILe56UtQARE0RCvNNOoDY11kZPHD3XBxpDDsHLcQ4gUlUfE_-CxM89He8J5bEgGByTO56_pk-LILybh25BE7NgrRLQsXXYx",
        },
        dataType: 'json',

    })
        .then(function (response) {

            console.log("Ajax Response from user input below");
            console.log(response);
            // var testDiv = $("#test");
            // var results = response.data

            for (j = 0; j < 5; j++) {

                var yelpResult = $("<div>");
                yelpResult.attr("class", "card-panel hoverable");

                var bName = response.businesses[j].name;
                var bImage = response.businesses[j].image_url;
                var bRating = response.businesses[j].rating;
                var bPhone = response.businesses[j].phone;
                var bLocation = response.businesses[j].location.display_address;
                var lat = response.businesses[j].coordinates.latitude;
                var lon = response.businesses[j].coordinates.longitude;

                console.log("Business Name = " + bName);
                console.log("Image URL = " + bImage);
                console.log("Phone = " + bPhone);
                console.log("Address = " + bLocation);
                console.log("Rating = " + bRating);
                console.log("Latitude, longitute = " + lat, lon);

                var imageRender = $("<img>")
                imageRender.attr("src", bImage);
                imageRender.attr("class", "responsive-img", bImage);
                yelpResult.append(imageRender);
                yelpResult.append("<b>" + bName + "</b>");
                yelpResult.append("</br><i class=\"fas fa-star\"></i> " + bRating + " Stars");
                yelpResult.append("</br><i class=\"fas fa-map-marker-alt\"></i> " + bLocation);
                yelpResult.append("</br><i class=\"fas fa-phone-alt\"></i> " + bPhone);

                $("#yelp-display-1").append(yelpResult);
            }
        })
})

// GOOGLE MAPS BELOW

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 39.9526, lng: -75.165 }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });
}

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            console.log(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

