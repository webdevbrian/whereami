//
// guessMode 
//
//  User is guessing 


function guessMode() {
	// Setup - constants
	var guessTimeLimitMs = 15000;
	var guessTimeRefreshRateMs = 1000;
	
	// variables
	var guessTimeLeftMs;
	var guessTimer;

	function onGuessEnded(inTime,guessLatLng) {}

	function endGuess(inTime,guessLatLng)
	{
		$("#guessButton").off("click");
      displayTimeLeft();       
      clearInterval(guessTimer);
		onGuessEnded(inTime,guessLatLng);	
	}
	
	function onGuessButtonClicked() {
			endGuess(true,window.guessLatLng);
	}

	function init() {
		// Guess Button
	   $('#guessButton').click(function() {
   		onGuessButtonClicked();
   	});

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
}