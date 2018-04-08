//
// guessmode 
//
//  User is guessing 


function guessmode() {
	// Setup - constants
	var guessTimeLimitMs = 15000;
	var guessTimeRefreshRateMs = 1000;
	
	// variables
	var guessTimeLeftMs;
	var guessTimer;

	function onGuessEnded(inTime,guessLatLng) {}

	function EndGuess(inTime,guessLatLng)
	{
      displayTimeLeft();       
      clearInterval(guessTimer);
		onGuessEnded(inTime,guessLatLng);	
	}

	function init() {
		guessTimeLeftMs = guessTimeLimitMs;
		guessTimer = setInterval(onGuessTimer, guessTimeRefreshRateMs);
	}

	function onGuessTimer(){
     guessTimeLeftMs = guessTimeLeftMs - guessTimeRefreshRateMs;
     
     if (guessTimeLeftMs <= 0) {
		 guessTimeLeftMs = 0;
       console.log('Time is up');
		 EndGuess(false,null,null);
     }
     displayTimeLeft();
	}
	
	function displayTimeLeft() {
		var secondsLeft = guessTimeLeftMs / 1000;		
		$("#timer").html(secondsLeft);
	}
}