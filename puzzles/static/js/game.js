function Game(solution, grid_size, legal_moves_map){
	this.solution = solution;
	this.gridSize = grid_size;
	this.blankHtml = '<div class="tile blank_tile disabled"><p>0</p></div>';
	this.legalMovesMap = legal_moves_map;
	this.currentBoard;
	this.sessionMoves = [];
	this.setupMoves = [];
	this.is_solved = false;

	this.locatesEmptySpace = function(currentBoard){
		this.empty_space = currentBoard.indexOf(0);
		return this.empty_space;
	};

	this.isWinner = function(arr1, arr2){
		if(String(arr1) == String(arr2)){
			this.is_solved = true;
			return true;
		}
	};

	this.recordsMove = function(currentBoard){
		this.sessionMoves.push(currentBoard)
		return currentBoard;
	}

	this.readBoard = function(tiles){
		var board = [];
		for(i=0; i<tiles.length; i++){
			board.push(parseInt(tiles[i]));
		}
		this.currentBoard = board;
		return board;
	};

	this.getsLegalMoves = function(zero_location){
		var zeroIndexPlusOne = zero_location + 1;
		return this.legalMovesMap[zeroIndexPlusOne];
	};

	this.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};


	this.shufflesBoard = function(sorted, solution, grid_size){
		var zeroLocation = sorted.indexOf(0);
		console.log(zeroLocation)
		var iterations = this.getRandomInt(zeroLocation, zeroLocation*2);
		var board = this.solution;

		for(i=0; i<iterations; i++){
			console.log('**************************')
			console.log('loop begins')
			console.log('---------------------------------')
			console.log(board);
			console.log('---------------------------------')
			var choices = this.getsLegalMoves(zeroLocation);
			console.log('choices below')
			console.log(choices);
			var random_choice = choices[this.getRandomInt(0, choices.length-1)];
			
			console.log('random_choice');
			console.log(random_choice);
			
			console.log('index of random_choice below');
			console.log(board.indexOf(random_choice))
			
			// something has gone wrong here algo wise. should not be generating 
			// impossible layouts like I'm seeing. shouldn't even need to filter this
			var swapabble = board.indexOf(random_choice);

			var b = board[zeroLocation];
			console.log(b);
			console.log('should be b=0')

			board[zeroLocation] = board[swapabble];
			console.log('board[zeroLocation] should equal random_choice');
			console.log(board[zeroLocation]);
			console.log(random_choice);

			board[swapabble] = b;
			console.log('board[swapabble] should equal 0');
			console.log(board[swapabble]);

			// i think the algo is a little off here, presenting impossible layouts

			var _board = board.slice(0);
			this.setupMoves.push(_board);
			zeroLocation = swapabble;
		}
		return board;
	};
}

// uncomment below for jasmine tests. comment out for prod
module.exports = Game;