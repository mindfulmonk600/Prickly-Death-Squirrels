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
    var url = "http://localhost:5000/api/waterfalls/?latt=" + lattitude + "&long=" + longitude + "&radius=" + 500000;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (waterfallJSON) {
        console.log(JSON.stringify(waterfallJSON));
        return waterfallJSON;
    })
}


function populateWaterfallDetails(waterfallDetails) {
    var waterfallName = document.getElementById("waterfallName");
    var waterfallDistance = document.getElementById("waterfallDistance");
    var waterfallHeight = document.getElementById("waterfallHeight")

    waterfallName.innerHTML = waterfallDetails[0].Name;
    waterfallDistance.innerText = waterfallDetails[0].distance/1000;
    waterfallHeight.innerText = waterfallDetails[0].height;

}

getCoords();
getNearbyWaterfalls(latt, long).then(function (response) {
    populateWaterfallDetails(response);
});
