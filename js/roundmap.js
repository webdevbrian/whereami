//
// End of round map
//

function rminitialize() {
  console.log('End of round called');

  //
  // If locLatLongs or guessLatLongs are undefined, they didn't make a guess and there is no
  // round map for people who run out of time, so don't show it at all
  //
    var mapOptions = {
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map($('#roundMap')[0], mapOptions);

    var bounds = new google.maps.LatLngBounds();
    bounds.extend(window.locLL);
    bounds.extend(window.guessLatLng);
    map.fitBounds(bounds);

    var actualMarker = new google.maps.Marker({
        position: window.locLL,
        title:"Actual Location",
        icon: 'img/actual.png'
    });

    var guessMarker = new google.maps.Marker({
        position: window.guessLatLng,
        title:"Your Guess",
        icon: 'img/guess.png'
    });

    // To add the marker to the map, call setMap();
    actualMarker.setMap(map);
    guessMarker.setMap(map);

};