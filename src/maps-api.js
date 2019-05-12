var map, geocoder, service, infowindow;
var markers = [];
var mapsEmbedSrcRoot = "https://www.google.com/maps/embed/v1/place?key=AIzaSyD6-rOeIyOT0SDVyM3LzqVrG2AS9HhnGi0&q=";
var currentEmbeddedMap = null;
var embeddedMapHolder, apiMapHolder, mapCase;
// src="https://www.google.com/maps/embed/v1/place?q=Keraniganj%2C%20Bangladesh&key=AIzaSyD6-rOeIyOT0SDVyM3LzqVrG2AS9HhnGi0"

createEmbeddedMapElement = (place) => {
    clearAllMarkers();
    let iFrameElement = document.createElement('iframe');
    iFrameElement.setAttribute('width', "100%");
    iFrameElement.setAttribute('height', "100%");
    iFrameElement.setAttribute('frameborder', "0");
    iFrameElement.setAttribute('style', "border:0");
    srcString = mapsEmbedSrcRoot + place;
    iFrameElement.setAttribute('src', srcString);
    setMapToEmbed(true);
    if (currentEmbeddedMap != null) document.getElementById('embedded-map-holder').removeChild(currentEmbeddedMap);
    currentEmbeddedMap = iFrameElement;
    document.getElementById('embedded-map-holder').appendChild(iFrameElement);
};

function initMap() {
    embeddedMapHolder = document.getElementById('embedded-map-holder');
    apiMapHolder = document.getElementById('api-map-holder');
    mapCase = document.getElementById('map-case');
    map = new google.maps.Map(document.getElementById('actual-map'), {
        center: {lat: 47.50, lng: 19.05},
        zoom: 14
    });
    geocoder = new google.maps.Geocoder();
    service = new google.maps.places.PlacesService(map);
    setMapToEmbed(false);
}

setMapToEmbed = (yes) => {
    if (yes) {
        if (mapCase.querySelector("#embedded-map-holder") == null) mapCase.appendChild(embeddedMapHolder);
        if (mapCase.querySelector("#api-map-holder") != null) mapCase.removeChild(apiMapHolder);
    } else {
        if (mapCase.querySelector("#api-map-holder") == null) mapCase.appendChild(apiMapHolder);
        if (mapCase.querySelector("#embedded-map-holder") != null) mapCase.removeChild(embeddedMapHolder);
    }
};

function codeAddress(address) {
    clearAllMarkers();
    //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
            clearAllMarkers();
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            markers.push(marker);
            setMapToEmbed(false);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

clearAllMarkers = () => {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
};

