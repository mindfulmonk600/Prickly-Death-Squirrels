var latt;
var long;

//get coordinates from the url
function getCoords() {
    var urlParams = new URLSearchParams(window.location.search)
    latt = urlParams.get("latt");
    long = urlParams.get("long");
}


//get waterfalls from api
function getNearbyWaterfalls(lattitude, longitude) {
    var url = "http://localhost:5000/api/waterfalls/?latt=" + lattitude + "&long=" + longitude ;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (waterfallJSON) {
        console.log(JSON.stringify(waterfallJSON));
    })
}


getCoords();
getNearbyWaterfalls(latt, long);
