var latt;
var long;

//get coordinates from the url
function getCoords() {
    var urlParams = new URLSearchParams(window.location.search)
    latt = urlParams.get("latt");
    long = urlParams.get("long");
}


//get waterfalls from api
function getNearbyWaterfalls(latt, long) {
    var url = "api/waterfalls/?latt=" + latt + "&long=" + long;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (waterfallJSON) {
        console.log(JSON.stringify(waterfallJSON));
    })
}


getCoords();
