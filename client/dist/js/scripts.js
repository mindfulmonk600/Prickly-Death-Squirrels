// Gets the user location
var searchButton = document.getElementById("searchbutton");

searchButton.addEventListener("click", getLocation)

var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));

var input = document.getElementById('searchTextField');
var options = {
  bounds: defaultBounds,
};

autocomplete = new google.maps.places.Autocomplete(input, options);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    searchButton.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  searchButton.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      searchButton.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      searchButton.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      searchButton.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      searchButton.innerHTML = "An unknown error occurred."
      break;
  }
}

