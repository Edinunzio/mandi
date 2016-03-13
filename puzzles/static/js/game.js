function Game(solution, grid_size, legal_moves_map){
	this.solution = solution;
	this.gridSize = grid_size;
	this.blankHtml = '<div class="tile blank_tile disabled"><p>0</p></div>';
	this.legalMovesMap = legal_moves_map;
	this.currentBoard = solution;

	this.locatesEmptySpace = function(currentBoard){
		this.empty_space = currentBoard.indexOf(0);
		alert(this.empty_space);
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
	this.getsLegalMoves = function(zero_location){
		zeroIndexPlusOne = zero_location + 1;
		return this.legalMovesMap[zeroIndexPlusOne];
	};
}

// uncomment below for jasmine tests. comment out for prod
module.exports = Game;