function makeMap(center) {
    universalAccessToken = ''
    domainSpecificAccessToken = 'pk.eyJ1IjoiZXNmaW5rZWwiLCJhIjoiY2tkeGRyNGF1MG8xbTJzbnd5anBrM3JpNCJ9.Nk0QSvXDX_aSEUjQb-Iovg';

    var mymap = L.map('map').setView([center.lat, center.lng], 18);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        minZoom: 8,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: domainSpecificAccessToken
    }).addTo(mymap);

    return mymap;
}
