//get waterfalls from api
function getNearbyWaterfalls(latt, long) {
    var url = "api/waterfalls/?latt=" + latt + "&long=" + long;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (waterfallJSON) {
        console.log(JSON.stringify(waterfallJSON));
    })
}
