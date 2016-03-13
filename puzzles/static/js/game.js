function Game(problem, solution, grid_size, legal_moves_map){
	this.problem = problem;
	this.solution = solution;
	this.gridSize = grid_size;
	this.blankHtml = '<div class="tile blank_tile disabled"><p>0</p></div>';
	this.legalMovesMap = legal_moves_map;
	this.currentBoard = problem;

	this.locatesEmptySpace = function(problem){
		this.empty_space = problem.indexOf(0);
		return this.empty_space;
	};

	this.isWinner = function(currentBoard){
		if(String(this.solution) == String(currentBoard)){
			return true;
		}else{
			return false;
		}
	};
	this.readBoard = function(tiles){
		board = [];
		for(i=0; i<tiles.length; i++){
			board.push(parseInt(tiles[i]));
		}
		currentBoard = board;
		return board;
	};
	this.enablesLegalMoves = function(zero_location){
		zeroIndexPlusOne = zero_location + 1;
		alert(this.legalMovesMap[zeroIndexPlusOne]);
		return this.legalMovesMap[zeroIndexPlusOne];
	};
}

// uncomment below for jasmine tests. comment out for prod
module.exports = Game;