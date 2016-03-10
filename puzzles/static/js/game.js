
	var Game = function(problem, solution, grid_size){
		this.problem = problem;
		this.solution = solution;
		this.grid_size = grid_size;
		this.blank_html = '<div class="tile blank_tile disabled"><p>0</p></div>';

		this.is_winner = function(container, solution){
			if(solution === container){
				alert('You win!');
			}else{
				console.log(container);
				console.log(solution);
			}
		};
	};

	$('.tile_container').on('click', '.tile:not(.disabled)', function(e){
		var blank_html = '<div class="tile blank_tile disabled"><p>0</p></div>';
		var empty_tile = $('.blank_tile');
		
		var num = this.textContent;
		var swap_html = '<div class="tile tile_'+num+'"><p>'+ num +'</p></div>'
		$('.tile_'+num).replaceWith(blank_html);
		$(empty_tile).replaceWith(swap_html);
		var containers = $('.tile_container p');
		var container = [];
		$(containers).each(function(i){
			container.push(containers[i].textContent);
		});
	});
