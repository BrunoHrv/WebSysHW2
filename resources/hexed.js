/*$(document).ready(function () {
	$("#redslide, #greenslide, #blueslide").slider({
	orientation: "horizontal",
	range: "min",
	max: 255,
	value: 127,
	slide: showOutput,
	change: showOutput
	});
	newGame();

});*/

(function($) {  //wrapper function to localize the scope of the plugin so global variables don't fuck it up

	//the requisite elements for the game
	var refColor = $("<div></div>").attr("id", "reference");
  var outputColor = $("<div></div>").attr("id", "output");

  var rSlider = $("<div></div>").attr("id", "redSlide");
  var bSlider = $("<div></div>").attr("id", "blueSlide");
  var gSlider = $("<div></div>").attr("id", "greenSlide");

  var hAnswer = $("<p></p>").attr("id", "hexAnswer").text("Reference hex: ?");
  var rAnswer = $("<p></p>").attr("id", "redAnswer").text("Red Difference: ?");
  var bAnswer = $("<p></p>").attr("id", "blueAnswer").text("Blue Difference: ?");
  var gAnswer = $("<p></p>").attr("id", "greenAnswer").text("Green Difference: ?");
  var scoreDisplay = $("<p></p>").attr("id", "score").text("Score: ?");

  var submitButton = $("<button></button>").attr("id", "submit").text("Submit Answer");
  var newGameButton = $("<button></button>").attr("id", "newGame").text("Next");



  //global variables to store reference colors, counts, and time
  var hexColor;
  var count;
  var turns;
  var time;
  var difficulty;
  var referenceRed = Math.floor((Math.random() * 255) + 0);
  var referenceGreen = Math.floor((Math.random() * 255) + 0);
  var referenceBlue = Math.floor((Math.random() * 255) + 0);

  function newGame() {
    //reset solution values
    hAnswer.text("Reference hex: ? ");
    rAnswer.text("Red difference: ?%");
    bAnswer.text("Blue difference: ?%");
    gAnswer.text("Green difference: ?%");
    scoreDisplay.text("Score: ?");

    ///reset button styles
    submitButton.css("visibility", "visible");
    newGameButton.text("Next");

    //reset swatches
    referenceRed = Math.floor((Math.random() * 255) + 0);
    referenceGreen = Math.floor((Math.random() * 255) + 0);
    referenceBlue = Math.floor((Math.random() * 255) + 0);
    $("#reference").css("background-color", "#" + RGBToHex(referenceRed, referenceGreen, referenceBlue));

		//reset sliders
    rSlider.slider("value", Math.floor((Math.random() * 255) + 0));
    gSlider.slider("value", Math.floor((Math.random() * 255) + 0));
    bSlider.slider("value", Math.floor((Math.random() * 255) + 0));

    //reset variables
    count = 0;
    time = new Date().getTime();
  }


  function evaluateSolution() {
    var timeTemp = new Date().getTime();
    var timeDiff = timeTemp - time;
    count++;
    if (count > turns) {
      tryAgain();
      return;
    }

    //calculate difference percentages
    var redPercentage = Math.floor(((rSlider.slider("value") - referenceRed) / 255) * 100);
    var greenPercentage = Math.floor(((gSlider.slider("value") - referenceGreen) / 255) * 100);
    var bluePercentage = Math.floor(((bSlider.slider("value") - referenceBlue) / 255) * 100);

    console.log(Math.abs(redPercentage + greenPercentage + bluePercentage));
    console.log(15 - difficulty - Math.abs(redPercentage + greenPercentage + bluePercentage));

    var score = 15 - difficulty - (Math.abs(redPercentage + greenPercentage + bluePercentage)) / ((15 - difficulty) * (15000 - timeDiff));

    hAnswer.text("Reference hex: #" + hexColor);
    rAnswer.text("Red difference: " + redPercentage + "%");
    bAnswer.text("Blue difference: " + bluePercentage + "%");
    gAnswer.text("Green difference: " + greenPercentage + "%");
    scoreDisplay.text("Score: " + Math.round(score * 100) / 100);

    if (count > turns - 1) {
      tryAgain();
    }
  }

  function tryAgain() {
		submitButton.css("visibility", "hidden");
		newGameButton.text("You lost! Try again!");
  }


  //update square color based on slider position
  function showOutput() {
    var hexa = hexToRGB(rSlider.slider("value"),
      gSlider.slider("value"),
      bSlider.slider("value")
    );
    outputColor.css("background-color", "#" + hexa);

  }

  // generate hex color value from slider position
  function hexToRGB(r, g, b) {
    var hexa = [r.toString(16), g.toString(16), b.toString(16)];
    $.each(hexa, function(nr, val) {
      if (val.length === 1) {
        hexa[nr] = "0" + val;
      }
    });
    return hexa.join("").toUpperCase();
  }


  function RGBToHex(referenceRed, referenceGreen, referenceBlue) {

    //turn values into a hex code
    var referenceHex = [referenceRed.toString(16), referenceGreen.toString(16), referenceBlue.toString(16)];
    $.each(referenceHex, function(nr, val) {
      if (val.length === 1) {
        referenceHex[nr] = "0" + val;
      }
    });

    hexColor = referenceHex.join("").toUpperCase();

    return hexColor;
  }

  $.fn.hexGame = function(args) {  //the plugin definition, sets all unset variables and inserts the requisite elements into the page
    submitButton.click(evaluateSolution);
    newGameButton.click(newGame);
		var settings = $.extend({
			turns: 10,
			difficulty: 5
		},args);
		turns = settings.turns;
		difficulty = settings.difficulty;
    this.append(refColor, outputColor, rSlider, bSlider, gSlider, hAnswer, rAnswer, bAnswer, gAnswer, scoreDisplay, submitButton, newGameButton);
    $("#redslide, #greenslide, #blueslide").slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 127,
      slide: showOutput,
      change: showOutput
    });
    newGame();
  }
  $("body").hexGame(); //initiates the plugin
}(jQuery));
