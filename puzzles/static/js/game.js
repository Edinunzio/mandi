function Game(problem, solution, grid_size, legal_moves_map){

this.problem = problem;
this.solution = solution;
this.gridSize = grid_size;
this.blankHtml = '<div class="tile blank_tile disabled"><p>0</p></div>';
this.legalMovesMap = legal_moves_map;
this.currentBoard = problem;

this.isWinner = function(currentBoard){
	if(solution == currentBoard){
		//alert('You win!');
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
	this.currentBoard = board;
	console.log(board);
	return board;
};

}

// uncomment below for jasmine tests. comment out for prod
module.exports = Game;