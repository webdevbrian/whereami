<!DOCTYPE html> 
<html lang='en-us'>
<head>
  <meta charset='utf-8'>
  <title>Whereami</title>
  <link rel='stylesheet' href='reset.css' /> 
  <link rel='stylesheet' href='normalize.css' />
  <link rel='stylesheet' href='style.css' /> 
  <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script>
  <script type='text/javascript' src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCZOXlIZdfYBcn_W8UrY-JYrE3eueQq4_k&sensor=false&libraries=geometry'></script>
  <script type='text/javascript' src='js/rnd.js'></script>
  <script type='text/javascript'>
  $(document).ready(function() {
      //
      // Setup
      //

      var round = 1;
      var points = 0;
      var roundScore = 0;
      var totalScore = 0;


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

      //
      // Streetview Map
      //

      function svinitialize() {

        // Get Coords
        var coordArray = ['41.386151,-72.594942','41.143598,-79.850821','39.953833,-82.459817','31.710572,-81.731586','54.730097,-113.322859','18.204668,98.688083','41.716861,-73.444118','49.773504,18.443298','49.760865,18.540459','45.441826,-76.482697','45.048785,-81.364746','46.487874,-87.341824','40.48642,-8.67229','-51.235402,-48.632042','-30.060433,-51.235402','48.462939,-122.57806','41.089282,-112.153015','39.607942,-104.037314','43.01766,-70.832514','44.636013,-63.56979','46.12368,-60.178324','58.154715,-6.503611','56.527054,-2.715433','52.381691,4.842191','52.323185,5.077737','48.627318,2.414361','22.158751,113.568383','50.443452,30.368872','46.102489,0.489836','40.32928,-8.843704','47.506302,-52.878399'];
        var randCoord = coordArray[Math.floor(Math.random() * coordArray.length)];
        coordArrayLatLongs = randCoord.replace(/[\])}[{(]/g,'').split(',');

        window.locLL = coordArrayLatLongs[0]+","+coordArrayLatLongs[1];

        console.log(coordArrayLatLongs[0]+","+coordArrayLatLongs[1]);

        // Do streetview
        var whoamiLocation = new google.maps.LatLng(coordArrayLatLongs[0],coordArrayLatLongs[1]);
        var streetViewService = new google.maps.StreetViewService();
        var STREETVIEW_MAX_DISTANCE = 100;

        streetViewService.getPanoramaByLocation(whoamiLocation, STREETVIEW_MAX_DISTANCE, function (streetViewPanoramaData, status) {
            if (status === google.maps.StreetViewStatus.OK) {

              // We have a streetview pano for this location, so let's roll
              var panoramaOptions = {
                position: whoamiLocation,
                addressControl: false,
                linksControl: false,
                pov: {
                  heading: 270,
                  pitch: -10
                },
                visible: true
              };
              var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);

            } else {
                // no street view available in this range, or some error occurred
                alert('Streetview is not available for this location :(');
            }
        });

      }

    //
    //  Init maps
    //

    //google.maps.event.addDomListener(window, 'load', svinitialize);
    //google.maps.event.addDomListener(window, 'load', mminitialize);

    svinitialize();
    mminitialize();

  	//
  	// Scoreboard & Guess button event
  	//
  	
    $('#guessButton').click(function (){

      if (window.guessLatLng){

      	// Calculate distance between points function
      	function calcDistance (fromLat, fromLng, toLat, toLng) {
       		return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));
      	};

        // Reset marker function
        function resetMarker() {
            //Reset marker
            if (guessMarker != null) {
                guessMarker.setMap(null);
            }
        };

      	// Explode latLng variables into separate variables for calcDistance function
      	locLatLongs = window.locLL.toString();
      	guessLatLongs = window.guessLatLng.toString();
      	
        // Make arrays and clean from (){} characters
      	locArray = locLatLongs.replace(/[\])}[{(]/g,'').split(',');
      	guessArray = guessLatLongs.replace(/[\])}[{(]/g,'').split(',');

        // Calculate distance between points, and convert to kilometers
        distance = Math.ceil(calcDistance(locArray[0], locArray[1], guessArray[0], guessArray[1]) / 1000);
        console.log(distance);

        // Calculate points awarded via guess proximity
        function inRange(x, min, max) {
            return (min <= x && x <= max);
        };

        if(inRange(distance, 1, 10)) {
          points = 7000;
        } else if(inRange(distance, 11, 50)) {
          points = 4000;
        } else if(inRange(distance, 51, 200)) {
          points = 3000;
        } else if(inRange(distance, 201, 500)) {
          points = 2000;
        } else if(inRange(distance, 501, 800)) {
          points = 1000;
        } else if(inRange(distance, 801, 1300)) {
          points = 500;
        } else if(inRange(distance, 1301, 1600)) {
          points = 400;
        } else if(inRange(distance, 1601, 2300)) {
          points = 300;
        } else if(inRange(distance, 2301, 2800)) {
          points = 200;
        } else if(inRange(distance, 2801, 3200)) {
          points = 100;
        } else if(inRange(distance, 3200, 4500)) {
          points = 50;
        } else if(inRange(distance, 4501, 6000)) {
          points = 25;
        } else {
          points = 0;
        };

        if (round < 5){
          round++
          roundScore = points;
          totalScore = totalScore + points;

          $('.round').html('Current Round: <b>'+round+'/5</b>');
          $('.roundScore').html('Round Score: <b>'+roundScore+'</b>');
          $('.totalScore').html('Total Score: <b>'+totalScore+'</b>');

          // Reload maps to refresh coords
          svinitialize();
          mminitialize();
        }

        if (round == 5){

          if (window.finished) {
            
            $('#miniMap, #pano, #guessButton, #scoreBoard').hide();
            $('#endGame').html("Congrats! Your final score was "+totalScore);
            $('#endGame').fadeIn(500);

          }

          roundScore = points;
          totalScore = totalScore + points;

          $('.round').html('Current Round: <b>'+round+'/5</b>');
          $('.roundScore').html('Round Score: <b>'+roundScore+'</b>');
          $('.totalScore').html('Total Score: <b>'+totalScore+'</b>');

          // Reload maps to refresh coords
          svinitialize();
          mminitialize();

          // We're done with the game
          window.finished = true;

        }

      } else {
        alert('You need to make a guess first!');
      }

    });

  });
  </script>
</head> 
<body>
  <div id='content'>
  <div id="endGame"></div>
	<div id='scoreBoard'>
		<span class='round'>Current Round: <b>1/5</b></span><br/>
    <span class='roundScore'>Round Score: <b>0</b></span><br/>
		<span class='totalScore'>Total Score: <b>0</b></span>
	</div>
    <div id='miniMap'></div>
	<div id='guessButton'>Make Your Guess</div>
    <div id='pano'></div>
  </div>
</body>
</html>