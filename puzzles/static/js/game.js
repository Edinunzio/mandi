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

	this.isWinner = function(currentBoard){
		if(String(this.solution) == String(currentBoard)){
			this.is_solved = true;
			// do something to show they won
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
		zeroIndexPlusOne = zero_location + 1;
		return this.legalMovesMap[zeroIndexPlusOne];
	};

	this.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	this.shufflesBoard = function(solution, grid_size){
		this.setupMoves.push(solution);
		zeroLocation = solution.length - 1;
		iterations = this.getRandomInt(zeroLocation, zeroLocation*2);
		//console.log(iterations);
		var board = solution;

		for(i=0; i<iterations; i++){
			choices = this.getsLegalMoves(zeroLocation);
			random_choice = choices[this.getRandomInt(0, choices.length-1)];
			
			swapabble = board.indexOf(random_choice);
			var b = board[zeroLocation];
			board[zeroLocation] = board[swapabble];
			board[swapabble] = b;			
			//console.log(board);
			
			//var _board = board.swap(zeroLocation, swapabble);
			
			this.setupMoves.push(board);
			zeroLocation = swapabble;
		}
		console.log(this.setupMoves);
		return board;
	};
}

// uncomment below for jasmine tests. comment out for prod
module.exports = Game;