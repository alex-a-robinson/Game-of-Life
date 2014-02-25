// Add interactivity e.g. can add and take away cells
// make 2 player e.g. reds vs blues

window.addEventListener('load', function() {
	var density = 0.2;
	var frameRate = 15;
	var worldSize = [400, 400];
	var cellSize = [4, 4];
	var colour = ['#FFFFFF', '#000000', '#FF0000']; // dead, live, background
	var rule = ['23', '3'];	// Survive/Born  B
	
	var canvas = document.getElementById('grid');
	var world = canvas.getContext('2d');
	
	var life = {};
		
	function setup() {
		// Formtas the canvas and populates life
		canvas.width = worldSize[0];
		canvas.height = worldSize[1];
		
		world.fillStyle = colour[2];
		world.fillRect(0, 0, worldSize[0], worldSize[1]);
	
		for (var x = 0; x < worldSize[0]/cellSize[0]; x++) {
			for (var y = 0; y < worldSize[1]/cellSize[1]; y++) { 
				life[[x, y]] = (Math.random() <= density)?2:-1;
			}				
		}
	}
	
	function neighbours(x, y) {
		// Returns sum of the states of the 8 sourounding cells
		var check = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
		var alive = 0;
		for (var i = 0; i < check.length; i++) {
			var nx = x + check[i][0];
			var ny = y + check[i][1];
			
			if (nx > worldSize[0]/cellSize[0] - 1) {
				nx = 0;
			}
			if (nx < 0) {
				nx = worldSize[0]/cellSize[0] - 1;
			}
			if (ny > worldSize[1]/cellSize[1] - 1) {
				ny = 0;
			}
			if (ny < 0) {
				ny = worldSize[1]/cellSize[1] - 1;
			}
			
			state = life[[nx, ny]]
			
			if (state == -1) {
				state = 1;
			}
			else if (state == 2) {
				state = 0;
			}
			
			alive += state;
		}
		return alive
	}
	
	function draw() {
		// Updates world with states of cells who have changed
		for (key in life) {
			if (life[key] == 1 || life[key] == 0)
				continue
			else if (life[key] == -1) {
				life[key] = 0;
				world.fillStyle = colour[0];
			} 
			else if (life[key] == 2) {
				life[key] = 1;
				world.fillStyle = colour[1];
			}
			world.fillRect(key.split(',')[0] * cellSize[0], key.split(',')[1] * cellSize[1], cellSize[0], cellSize[1]);
			
		}
	}
	
	function live() {
		// Updates state of cells depending on rules
		draw();
		for (key in life) {
			var n = neighbours(parseInt(key.split(',')[0]), parseInt(key.split(',')[1]));	// Key is a string so must parse
			if (rule[1].indexOf(n) != -1 && life[key] == 0) {
				life[key] = 2;
			}
			else if ((rule[0].indexOf(n) == -1) && life[key] == 1) {
				life[key] = -1;
			}
		}
		setTimeout(live, (1000/frameRate));
	}
	
	setup();
	live();
}, false);


/* Some famous rules:

"Replicator" - given enough room, this will copy the starting cells repeatedly. S1357 B1357
"Lines" - will spread lines from any lving cells over the entire game area. S8 B123.
"Crystal" - a rule which produces explosive growth of fractal like images with symetrical starting cells. S23 B345678
"Life" - the original Conway's Game of Life. S23 B3.
"High Life" - a slight variation on life with an increased chance for a cells to be born. S23 B36.
"Long Life" - another minor variation on the original. S5 B345.
"34 Life" - A slightly different version of Life, which can grow explosivly if it gets too big. S35 B34.
"2x2" - a simpler version with smaller still lifes at the end. S125 B36
"Amoeba" - Amoeba like structures move around the game. S1358 B357
"Bacteria" - Bacteria like patterns move around the game. S456 B34
"Seeds" - small groups of cells spread over the game area. S0 B2
"Move" - A game that dies off quickly but can still produce interesting patterns. S245 B368
"Day and Night" - can form life like dead patterns in large patches of living cells. S34678 B3678
"Coral" - forms coral like structures and patterns. S45678 B3
"Stains" - Will generate solid stains from initial conditions. S235678 B3678
"Diamoeba" - Will create diamond shaped forms. S5678 B35678
"Walled Cities" - Can form solid boundaries with chaotic interiors. S23567 B3678
"Maze" - Builds a semi solvable maze. S1234 B3
"The Charlie" - Crazy patterns which flash.  S123456 B123567
*/