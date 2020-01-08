function init() {
    console.log("ready!")
}

function makeMap() {
    mapArea = document.getElementById("map");       // for whatever reason, having "var" makes it not global in Chrome
    var myMap = new google.maps.Map(mapArea);
    // myMap.panTo({lat: -34, lng: 151});
    var sw = new google.maps.LatLng(-34, 151);
    var ne = new google.maps.LatLng(-33, 152);
    // TODO: calculate bounds based on user coors and coors of all listed printers
    myMap.panToBounds(new google.maps.LatLngBounds([sw, ne]));

    // TODO: make user + printer locations appear on map (??)
}