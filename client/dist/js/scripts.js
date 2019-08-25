

// Gets the user location
var currentLocation = document.getElementById("currentLocation");
currentLocation.addEventListener("click", getLocation)

//search for user's location
var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));

var input = document.getElementById('searchTextField');
var options = {
  bounds: defaultBounds,
};
autocomplete = new google.maps.places.Autocomplete(input, options);

//translate location to coordinates when search button is pressed
var searchLocation = document.getElementById("searchLocation")
searchLocation.addEventListener("click", translateLocation)

function translateLocation() {
  var place = autocomplete.getPlace();
  var latt = place.geometry.location.lat();
  var long = place.geometry.location.long();

  window.location="/pickWaterfalls.html?latt=" + latt + "&long=" + long;
}

function getNearbyWaterfalls(latt, long) {
    var url = "api/waterfalls/?latt=" + latt + "&long=" + long;
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (waterfallJSON) {
      console.log(JSON.stringify(waterfallJSON));
    })
}

//get user's location logic
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    currentLocation.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  currentLocation.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
  window.location="/pickWaterfalls.html?latt=" + position.coords.latitude + "&long=" + position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      currentLocation.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      currentLocation.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      currentLocation.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      currentLocation.innerHTML = "An unknown error occurred."
      break;
  }
}

