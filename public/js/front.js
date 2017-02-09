// Add smooth scrolling to all links

    $(function() {
        console.log ("loaded scroll finction");
      // Select link by id and add click event
      $('#scroll').click(function() {

        // Animate Scroll to #bottom
        $('html,body').animate({
          scrollTop: $("#mapdiv").offset().top }, // Tell it to scroll to the top #bottom
          '3000' // How long scroll will take in milliseconds
        );

        // Prevent default behavior of link
        return false;
      });
    });

// Modal function for login/registration 

// switched between login / logout button in the nav bar
if (userInfo.id!==undefined){
   $('#logBtn').attr('href','/logout').html('Logout');
} 

// Javscript for Slider
    var el, newPoint, newPlace, offset;
    // Select all range inputs, watch for change
    $("input[type='range']").change(function() {
            // Cache this for efficiency
            el = $(this);
            // Measure width of range input
            width = el.width();
            // Figure out placement percentage between left and right of input
            newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
            offset = -1;
            // Prevent bubble from going beyond left or right (unsupported browsers)
            if (newPoint < 0) {
                newPlace = 0;
            } else if (newPoint > 1) {
                newPlace = width;
            } else {
                newPlace = width * newPoint + offset;
                offset -= newPoint;
            }

            // Move bubble
            el
                .next("output")
                .css({
                    left: newPlace,
                    marginLeft: offset + "%"
                })
                .text(el.val());
        })
        // Fake a change to position bubble at page load
        .trigger('change');




// Google Map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {
            lat: 16,
            lng: -35
        },
        styles: [{
            "featureType": "all",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#5b6571"
            }, {
                "lightness": "35"
            }]
        }, {
            "featureType": "administrative.neighborhood",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#f3f4f4"
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [{
                "weight": 0.9
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#83cead"
            }]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#fee379"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#7fc8ed"
            }]
        }]
    });
    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        if (markers.length == 1) {
            clearMarkers();
        } else {
            addMarker(event.latLng);
        }
    });
    // Adds a marker to the map and push to the array.
    var markers = [];
    var nLatArr = [];
    var nLngArr = [];

    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true,
            icon: "../views/images/pin.png"
        });
        nLat = marker.getPosition().lat(); // initial pin drop
        nLng = marker.getPosition().lng();
        map.setZoom(10);
        map.setCenter(marker.getPosition());
        marker.setMap(map);
        markers.push(marker);
        localStorage.setItem('nLat', JSON.stringify(nLat));  // sents gps to local storage to be used by the controllers
        localStorage.setItem('nLng', JSON.stringify(nLng));  
        // postFunc(nLat,nLng)


        marker.addListener('dragend', function() {  //drag pin drop gps
        map.setZoom(8);
        nLat = marker.getPosition().lat();
        nLng = marker.getPosition().lng();
        map.setCenter(marker.getPosition());
        marker.setMap(map);
        markers.push(marker);
        console.log(nLat, nLng);
        nLatArr.push(nLat);
        nLatArr.push(nLng);
        console.log(nLatArr[0], nLatArr[1]);
        localStorage.setItem('nLat', JSON.stringify(nLat));
        localStorage.setItem('nLng', JSON.stringify(nLng));

  
  });
}


    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }
        // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
        markers = [];
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

}
