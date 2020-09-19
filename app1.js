// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 520;
canvas.height = 575;
var mspeed=10000;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var monster = {};
var monstersCaught = 0;

// Reset the game when the player catches a monster
function reset () {
	// Throw the monster somewhere on the screen randomly
	monster.x = 40 + (Math.random() * (canvas.width - 80 ));
	monster.y = 130 + (Math.random() * (canvas.height - 170));
};

var clicks = 0; // counter 
var a = document.getElementsByClassName('img'); // element
a.onclick = function(b) { // onclick not onClick
   console.log(++clicks); // increment it
}

// Update game objects
var update = function (modifier) {
}
	
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 90);
	}
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	// Score
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 10, 32);

	// Reset Score, Speed button
	//Button Collor
    ctx.fillStyle = "rgb(0, 250, 0)";
	
    // Button position
	ctx.fillRect(230, 45, 125, 30); // Reset Score
	ctx.fillRect(360, 45, 130, 30); // Reset Speed
	
	// Button Text Color and Font Style
    ctx.fillStyle = "rgb(51, 51, 51)";
    ctx.font = "bold 25px Terminal";
    
	//Buttons text position
	ctx.fillText("Reset Score", 230, 45);
    ctx.fillText("Reset Speed", 360, 45);

};

//Function for positioning
function getClickPosition(k) {
    var xPosition = k.clientX;
	var yPosition = k.clientY;
	
	//to show user position monster speed in console
	console.log("UserX " + xPosition+ " , UserY " +yPosition);
	if (xPosition <= (monster.x + 32)
	&& monster.x <= (xPosition + 32)
	&& yPosition <= (monster.y + 32)
	&& monster.y <= (yPosition + 32))
	{
		console.log("User Click X Position: " + xPosition + '\n' +"User Click Y Position: " + yPosition + '\n'+"Monster  X Position: " + monster.x +'\n'+"Monster  Y Position: " +monster.y)
		mspeed=mspeed/2;
		console.log("Monster speed after current click: "+ mspeed);
		ctx.clearRect(10,32,220,30)
		++monstersCaught;
		reset();

	}

	if(xPosition<=360 && xPosition>240 && yPosition>55 && yPosition<85)
	{
		monstersCaught=0;
		location.reload();
	}

	if (xPosition<500 && xPosition>370 && yPosition>55 && yPosition<85)
	{
		mspeed=10000;
	}

}

//setInterval(reset,mspeed);

var myFunction = function() {
    setTimeout(myFunction, mspeed);
	reset();
}
setTimeout(myFunction, mspeed);

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	then = now;
};

// Let's play this game!
reset();

//shows starting speed of monster
console.log("Initial monster speed "+ mspeed);

var then = Date.now();
setInterval(main, 1); // Execute as fast as possible

window.addEventListener("click", getClickPosition, false);
