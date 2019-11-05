// YELP BELOW

function yelp(city, category = "Dining", yelpDisplay = "#yelp-display-1") {

    // var categors = ["Outdoor Dining", "Museums", "Nature"];

    // for (i = 0; i < categors.length; i++) {}

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

            console.log("Ajax Response below");
            console.log(response);

            $(yelpDisplay).empty();

            // var results = response.data;
            // console.log(results);

            for (var j = 0; j < 5; j++) {

                var yelpResult = $("<div>");
                yelpResult.attr("class", "card-panel hoverable");

                var bName = response.businesses[j].name;
                var bImage = response.businesses[j].image_url;
                var bRating = response.businesses[j].rating;
                var bPhone = response.businesses[j].phone;
                var bLocation = response.businesses[j].location.display_address;
                var lat = response.businesses[j].coordinates.latitude;
                var lng = response.businesses[j].coordinates.longitude;
                var myLatlng = { lat, lng };
                var addBtn = $("<button>").addClass("btn btn-info add-to-map-btn").text("Map It");
                addBtn.attr("data-lng", lng);
                addBtn.attr("data-lat", lat);

                // console.log("Business Name = " + bName);
                // console.log("Image URL = " + bImage);
                // console.log("Phone = " + bPhone);
                // console.log("Address = " + bLocation);
                // console.log("Rating = " + bRating);
                console.log("Latitude, longitute = " + lat, lng);
                console.log(myLatlng);

                var imageRender = $("<img>")
                imageRender.attr("src", bImage);
                imageRender.attr("class", "responsive-img", bImage);
                yelpResult.append(imageRender);
                yelpResult.append("<b>" + bName + "</b>");
                yelpResult.append("</br><i class=\"fas fa-star\"></i> " + bRating + " Stars");
                yelpResult.append("</br><i class=\"fas fa-map-marker-alt\"></i> " + bLocation);
                yelpResult.append("</br><i class=\"fas fa-phone-alt\"></i> " + bPhone);
                yelpResult.append(addBtn);

                $(yelpDisplay).append(yelpResult);
                console.log(yelpResult)
            }

        })
}

// On page load, 
// display top 5 search results for 
// 3 pre-selected categories for 1 pre-selected city 
$(document).ready(function () {

    console.log("Page load function works");

    // figure out how to get city input to render in displays 2 and 3. Works on 1. WHY?????!!!!
    // yelp("Amsterdam", "Best Restaurants", "#yelp-display-1"); 
    // yelp("Amsterdam", "Best Museums", "#yelp-display-2");
    // yelp("Amsterdam", "Best Gardens", "#yelp-display-3");


    var cityName = $(this).val() || "Amsterdam";
    var category1 = $("#yelp-search-1").val() || "Best Restaurants";
    var category2 = $("#yelp-search-2").val() || "Best Museums";
    var category3 = $("#yelp-search-3").val() || "Best Gardens";

    yelp(cityName, category1, "#yelp-display-1");
    yelp(cityName, category2, "#yelp-display-2");
    yelp(cityName, category3, "#yelp-display-3")

    $("#city-name").on("keyup", function (event) {
        event.preventDefault();
        cityName = $(this).val();

        yelp(cityName, category1, "#yelp-display-1");
        yelp(cityName, category2, "#yelp-display-2");
        yelp(cityName, category3, "#yelp-display-3");
        console.log(cityName);
    })

    $("#yelp-search-1").on("keyup", function (event) {
        event.preventDefault();
        category1 = $("#yelp-search-1").val();

        yelp(cityName, category1, "#yelp-display-1");
        console.log(category1);
        // console.log("city1 " + cityName)
    })

    $("#yelp-search-2").on("keyup", function (event) {
        event.preventDefault();
        category2 = $("#yelp-search-2").val()

        yelp(cityName, category2, "#yelp-display-2");
        console.log(category2)
        //console.log("city2 " + cityName)
    })

    $("#yelp-search-3").on("keyup", function (event) {
        event.preventDefault();
        category3 = $("#yelp-search-3").val()

        yelp(cityName, category3, "#yelp-display-3");
        console.log(category3)
        //console.log("city3 " + cityName)
    })
});

// GOOGLE MAPS BELOW

var map;
var geocoder;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 52.366, lng: 4.895 }
    });
    geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });
}

$(document).on("click", ".add-to-map-btn", function () {
    deleteMarkers();
    var lat = parseFloat($(this).attr("data-lat"));
    var lng = parseFloat($(this).attr("data-lng"));
    map.setCenter({ lat, lng });
    console.log({ lat, lng });
    var marker = new google.maps.Marker({
        map: map,
        position: { lat, lng }
    });
    markers.push(marker);

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#map").offset().top
    }, 1000);
});

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
        markers.push(marker);
    });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}