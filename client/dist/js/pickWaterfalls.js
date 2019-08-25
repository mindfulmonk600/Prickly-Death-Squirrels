var latt;
var long;
var waterfallDetails;
var n = 1;

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


function populateWaterfallDetails(waterfallInfo) {
    var waterfallName = document.getElementById("waterfallName");
    var waterfallDistance = document.getElementById("waterfallDistance");
    var waterfallHeight = document.getElementById("waterfallHeight");
    var waterfallImage = document.getElementById("waterfallImage");

    waterfallName.innerHTML = waterfallInfo.Name;
    waterfallDistance.innerText = waterfallInfo.distance/1000;
    waterfallHeight.innerText = waterfallInfo.height;
    waterfallImage.src = waterfallInfo.link;

}

var likeWaterfall = document.getElementById("likeWaterfall");
likeWaterfall.addEventListener("click", function () {
    populateWaterfallDetails(waterfallDetails[n++])
})

getCoords();
getNearbyWaterfalls(latt, long).then(function (response) {
    waterfallDetails = response;
    populateWaterfallDetails(response[0]);
});
