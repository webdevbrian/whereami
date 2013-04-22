      //
      // Streetview Map
      //

      function svinitialize() {

        // Get Coords
        var coordArray = ['41.386151,-72.594942','41.143598,-79.850821','39.953833,-82.459817','31.710572,-81.731586','54.730097,-113.322859','18.204668,98.688083','41.716861,-73.444118','49.773504,18.443298','49.760865,18.540459','45.441826,-76.482697','45.048785,-81.364746','46.487874,-87.341824','40.48642,-8.67229','-30.060433,-51.235402','48.462939,-122.57806','41.089282,-112.153015','39.607942,-104.037314','43.01766,-70.832514','44.636013,-63.56979','46.12368,-60.178324','58.154715,-6.503611','56.527054,-2.715433','52.381691,4.842191','52.323185,5.077737','48.627318,2.414361','22.158751,113.568383','50.443452,30.368872','46.102489,0.489836','40.32928,-8.843704','47.506302,-52.878399'];
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

      };