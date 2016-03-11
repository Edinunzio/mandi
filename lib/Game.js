function Game(problem, solution, grid_size){

this.problem = problem;
this.solution = solution;
this.grid_size = grid_size;
this.blank_html = '<div class="tile blank_tile disabled"><p>0</p></div>';

this.is_winner = function(container, solution){
	if(String(solution) === String(container)){
		//alert('You win!');
		return true;
		}else{
			console.log(container);
			console.log(solution);
			return false;
			}
	};


}
// uncomment below to run jasmine unit tests
// module.exports = Game;
