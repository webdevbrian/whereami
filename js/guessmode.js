//
// guessMode 
//
//  User is guessing 

var guessMode = (function () {
	var myObject = {};	
	
	// Setup - constants
	var guessTimeLimitMs = 15000;
	var guessTimeRefreshRateMs = 1000;
	
	// variables
	var guessTimeLeftMs;
	var guessTimer;

	myObject.onGuessEnded = function (inTime,guessLatLng) {}

	function endGuess(inTime,guessLatLng)
	{
		$("#guessButton").off("click");
      displayTimeLeft();       
      clearInterval(guessTimer);
		myObject.onGuessEnded(inTime,guessLatLng);	
	}
	
	function onGuessButtonClicked() {
			endGuess(true,window.guessLatLng);
	}

	myObject.initGuess = function() {
		// Guess Button
	   $('#guessButton').click(function() {
   		onGuessButtonClicked();
   	});
      window.guessLatLng = '';
		guessTimeLeftMs = guessTimeLimitMs;
		guessTimer = setInterval(onGuessTimer, guessTimeRefreshRateMs);
	}

	function onGuessTimer(){
     guessTimeLeftMs = guessTimeLeftMs - guessTimeRefreshRateMs;
     
     if (guessTimeLeftMs <= 0) {
		 guessTimeLeftMs = 0;
       console.log('Time is up');
		 endGuess(false,null,null);
     }
     displayTimeLeft();
	}
	
	function displayTimeLeft() {
		var secondsLeft = guessTimeLeftMs / 1000;		
		$("#timer").html(secondsLeft);
	}
	return myObject;
})();