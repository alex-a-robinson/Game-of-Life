// add grid + famous rule sets look at http://www.ovaltech.ca/Javascript_Life/life.htm
// Add interactivity e.g. can add and take away cells
// make 2 player e.g. reds vs blues

window.addEventListener('load', function() {
	var density = 0.2;
	var frameRate = 15;
	var worldSize = [200, 200];
	var cellSize = [5, 5];
	var colour = ['#FFFFFF', '#000000', '#FFFFFF']; // dead, live, background
	var rule = ['23', '3'];	// Survive/Born
	
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