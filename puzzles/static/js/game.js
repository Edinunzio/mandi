function Game(solution, grid_size, legal_moves_map){
	this.solution = solution;
	this.gridSize = grid_size;
	this.blankHtml = '<div class="tile blank_tile disabled"><p>0</p></div>';
	this.legalMovesMap = legal_moves_map;
	this.currentBoard = solution;
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
		board = [];
		for(i=0; i<tiles.length; i++){
			board.push(parseInt(tiles[i]));
		}
		currentBoard = board;
		return board;
	};

	this.getsLegalMoves = function(zero_location){
		zeroIndexPlusOne = zero_location + 1;
		return this.legalMovesMap[zeroIndexPlusOne];
	};

	this.shufflesBoard = function(solution, grid_size){
		zeroLocation = solution.length - 1;
		console.log(solution);
		console.log(zeroLocation);
		lmm = this.legalMovesMap;
		console.log(lmm);
		choices = this.getsLegalMoves(zeroLocation);
		console.log(choices);
		return choices;
	};
}

// uncomment below for jasmine tests. comment out for prod
module.exports = Game;