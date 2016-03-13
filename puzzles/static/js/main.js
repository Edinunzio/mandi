(function() {

	$('.tile_container').on('click', '.tile:not(.disabled)', function(e){
		var blank_html = '<div class="tile blank_tile disabled"><p>0</p></div>';
		var empty_tile = $('.blank_tile');
		
		var num = this.textContent;
		var swap_html = '<div class="tile disabled tile_'+num+'"><p>'+ num +'</p></div>'
		$('.tile_'+num).replaceWith(blank_html);
		$(empty_tile).replaceWith(swap_html);
		var board_tiles = $('#puzzle .tile p');
		var tiles = []
		for (i=0;i<board_tiles.length; i++){
			tiles.push(board_tiles[i].textContent);
		}
		tiles = game.readBoard(tiles);
		game.recordsMove(tiles);
		game.isWinner(solution, game.currentBoard);
		if (game.is_solved){
			alert('Congratulations!');
		} else {
			enableTiles(tiles);
		}
	});
	$('#hint').on('click', function(e){
		alert('good luck, sucker! HA HA HA!');
	});
})();