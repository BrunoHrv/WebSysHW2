$(document).ready(function () {
	$("#redslide, #greenslide, #blueslide").slider({
	orientation: "horizontal",
	range: "min",
	max: 255,
	value: 127,
	slide: showOutput,
	change: showOutput
	});
	$("#redslide").slider("value", 150);
	$("#greenslide").slider("value", 50);
	$("#blueslide").slider("value", 100);
	generateReferenceRGB();
});

		//global variables to store reference colors
var referenceRed;
var referenceGreen;
var referenceBlue;
var hexColor;

function evaluateSolution(){
	
	//calculate difference percentages
	var redPercentage = (Math.abs( $("#redslide").slider("value") - referenceRed ) / 255) *100;
	var greenPercentage = (Math.abs( $("#greenslide").slider("value") - referenceGreen ) / 255) *100;
	var bluePercentage = (Math.abs( $("#blueslide").slider("value") - referenceBlue ) / 255) *100;
	
	document.getElementById("#hexAnswer").innerHTML = "Reference hex: #" + hexColor; //reveal hexcolor
	document.getElementById("#redAnswer").innerHTML = "Red difference %: " + redPercentage;
	document.getElementById("#greenAnswer").innerHTML = "Green difference %: " + greenPercentage;
	document.getElementById("#blueAnswer").innerHTML = "Blue difference %: " + bluePercentage;
	
}
		
function newGame(){

	//reset solution values 
	document.getElementById("#hexAnswer").innerHTML = "Reference hex: ? "; //reveal hexcolor
	document.getElementById("#redAnswer").innerHTML = "Red difference %: ?";
	document.getElementById("#greenAnswer").innerHTML = "Green difference %: ?";
	document.getElementById("#blueAnswer").innerHTML = "Blue difference %: ?";
	
	//change reference color
	generateReferenceRGB();

}

//update square color based on slider position
function showOutput() {
	var hexa = getHexaFromRGB($("#redslide").slider("value"),
	$("#greenslide").slider("value"),
	$("#blueslide").slider("value"));
	$("#output").css("background-color", "#" + hexa);
}

// generate hex color value from slider position
function getHexaFromRGB(r, g, b) {
	var hexa = [r.toString(16), g.toString(16), b.toString(16)];
	$.each(hexa, function (nr, val) {
	if (val.length === 1) {
	hexa[nr] = "0" + val;
	}
	});
	return hexa.join("").toUpperCase();
}


function generateReferenceRGB() {
	// randomize rgb reference values
	referenceRed = Math.floor((Math.random() * 255) + 0);
	referenceGreen = Math.floor((Math.random() * 255) + 0);
	referenceBlue = Math.floor((Math.random() * 255) + 0);

	//turn values into a hex code
	var referenceHex = [referenceRed.toString(16), referenceGreen.toString(16), referenceBlue.toString(16)];
	$.each(referenceHex, function (nr, val) {
		if (val.length === 1) {
			referenceHex[nr] = "0" + val;
		}
	});

	hexColor = referenceHex.join("").toUpperCase();

	 //change reference block color
	$("#reference").css("background-color", "#" + hexColor);

}