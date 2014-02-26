//
// Minimap
//

function mminitialize() {

  var guessMarker;

  // Mini map setup
  var mapOptions = {
    center: new google.maps.LatLng(0, 0, true),
    zoom: 1,
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var mMap = new google.maps.Map(document.getElementById('miniMap'), mapOptions);

  // Marker selection setup
  var guessMarkerOptions = new google.maps.Marker({
      map: mMap,
      visible: true,
      title: 'Your guess',
      draggable: false
      //icon: '/img/googleMapsMarkers/red_MarkerB.png'
  });

  // Mini map marker setup
  function setGuessMarker(guess) {
    if (guessMarker) {
      guessMarker.setPosition(guess);
    } else {
      guessMarker = new google.maps.Marker(guessMarkerOptions);
      guessMarker.setPosition(guess);
    };
  };

  // Mini map click
  google.maps.event.addListener(mMap, 'click', function(event) {
    window.guessLatLng = event.latLng;
    setGuessMarker(window.guessLatLng);
  });

};