$(document).ready(function () {
	$("#redslide, #greenslide, #blueslide").slider({
	orientation: "horizontal",
	range: "min",
	max: 255,
	value: 127,
	slide: showOutput,
	change: showOutput
	});
	newGame();

});

//global variables to store reference colors, counts, and time
var hexColor;
var count;
var turns;
var time;
var difficulty = 1;

function evaluateSolution(){
	var timeTemp = new Date().getTime();
	var timeDiff = timeTemp-time;
	count++;
	if (count>turns) {
		tryAgain();
		return;
	}
	
	//calculate difference percentages
	var redPercentage = Math.floor((( $("#redslide").slider("value") - referenceRed ) / 255) *100);
	var greenPercentage = Math.floor((( $("#greenslide").slider("value") - referenceGreen ) / 255) *100);
	var bluePercentage = Math.floor((( $("#blueslide").slider("value") - referenceBlue ) / 255) *100);

	console.log(Math.abs(redPercentage+greenPercentage+bluePercentage));
	console.log(15 - difficulty - Math.abs(redPercentage+greenPercentage+bluePercentage));

	var score = 15 - difficulty - (Math.abs(redPercentage+greenPercentage+bluePercentage)) / ((15 - difficulty) * (15000-timeDiff));


	document.getElementById("#hexAnswer").innerHTML = "Reference hex: #" + hexColor; //reveal hexcolor
	document.getElementById("#redAnswer").innerHTML = "Red difference: " + redPercentage + "%";
	document.getElementById("#greenAnswer").innerHTML = "Green difference: " + greenPercentage + "%";
	document.getElementById("#blueAnswer").innerHTML = "Blue difference: " + bluePercentage + "%";
	document.getElementById("#score").innerHTML = "Score: " + Math.round(score*100)/100;
	
	if (count>turns-1) {
		tryAgain();
	}
}

function tryAgain(){
	document.getElementById("submit").style.visibility = "hidden";
	document.getElementById("newGame").innerHTML = "You lost! Try again!";

}

function newGame(){
	//reset solution values 
	document.getElementById("#hexAnswer").innerHTML = "Reference hex: ? "; //reveal hexcolor
	document.getElementById("#redAnswer").innerHTML = "Red difference: ?%";
	document.getElementById("#greenAnswer").innerHTML = "Green difference: ?%";
	document.getElementById("#blueAnswer").innerHTML = "Blue difference: ?%";
	document.getElementById("#score").innerHTML = "Score: ?";

	///reset button styles
	document.getElementById("submit").style.visibility = "visible";
	document.getElementById("newGame").innerHTML = "Next";

	//reset swatches
	referenceRed = Math.floor((Math.random() * 255) + 0);
	referenceGreen = Math.floor((Math.random() * 255) + 0);
	referenceBlue = Math.floor((Math.random() * 255) + 0);
	$("#reference").css("background-color", "#" + RGBToHex(referenceRed,referenceGreen,referenceBlue));

	$("#redslide").slider("value", Math.floor((Math.random() * 255) + 0));
	$("#greenslide").slider("value", Math.floor((Math.random() * 255) + 0));
	$("#blueslide").slider("value", Math.floor((Math.random() * 255) + 0));

	//reset variables
	count = 0;
	time = new Date().getTime();
	turns=5;
}

//update square color based on slider position
function showOutput() {
	var hexa = hexToRGB($("#redslide").slider("value"),
	$("#greenslide").slider("value"),
	$("#blueslide").slider("value"));
	$("#output").css("background-color", "#" + hexa);

}

// generate hex color value from slider position
function hexToRGB(r, g, b) {
	var hexa = [r.toString(16), g.toString(16), b.toString(16)];
	$.each(hexa, function (nr, val) {
	if (val.length === 1) {
	hexa[nr] = "0" + val;
	}
	});
	return hexa.join("").toUpperCase();
}


function RGBToHex(referenceRed,referenceGreen,referenceBlue) {

	//turn values into a hex code
	var referenceHex = [referenceRed.toString(16), referenceGreen.toString(16), referenceBlue.toString(16)];
	$.each(referenceHex, function (nr, val) {
	if (val.length === 1) {
		referenceHex[nr] = "0" + val;
		}
	});

	hexColor = referenceHex.join("").toUpperCase();

	return hexColor;
}