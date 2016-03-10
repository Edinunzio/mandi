(function() {

	function sortIncr(a, b){
		return a - b;
	}
	var solution = function(arr){
		var containers = $('.tile_container p');
		var container = []
		$(containers).each(function(i){
			container.push(parseInt(containers[i].textContent));
		});
		sorted_containers = container.sort(sortIncr)
		sorted_container = []
		$(sorted_containers).each(function(i){
			s = String(sorted_containers[i]);
			sorted_container.push(s);
		});
		sorted_container.shift();
		sorted_container.push('0');

		console.log(sorted_container);
		return sorted_container;
	}();
	var is_solved = function(arr1, arr2){
		if (arr1 === arr2){
			alert('You win!');
		}
	}();
	$('.tile_container').on('click', '.tile:not(.blank_tile)', function(e){
		var blank_html = '<div class="tile blank_tile"><p>0</p></div>';
		var empty_tile = $('.blank_tile');
		
		var num = this.textContent;
		var swap_html = '<div class="tile tile_'+num+'"><p>'+ num +'</p></div>'
		$('.tile_'+num).replaceWith(blank_html);
		$(empty_tile).replaceWith(swap_html);
		var containers = $('.tile_container p');
		var container = []
		$(containers).each(function(i){
			container.push(containers[i].textContent);
		});
		is_solved(solution, container);
		console.log(container);
	});

	
})();