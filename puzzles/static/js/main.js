(function() {
	var enableTiles = function(tiles){
		$('.tile').addClass('disabled');
		var empty_start = game.locatesEmptySpace(tiles);
		var to_enable = game.getsLegalMoves(empty_start);
		for (i=0; i<to_enable.length; i++){
			$('.placeholder_'+ to_enable[i]+ ' .tile').removeClass('disabled');
		}
	};
	$('.tile_container').on('click', '.tile:not(.disabled)', function(e){
		var blank_html = '<div class="tile blank_tile disabled"><p>0</p></div>';
		var empty_tile = $('.blank_tile');
		
		var num = this.textContent;
		var swap_html = '<div class="tile disabled tile_'+num+'"><p>'+ num +'</p></div>'
		$('.tile_'+num).replaceWith(blank_html);
		$(empty_tile).replaceWith(swap_html);
		var board_tiles = $('#puzzle .tile p').text();
		var tiles = game.readBoard(board_tiles);
		game.isWinner(tiles);
		enableTiles(tiles);
	});
	$('#hint').on('click', function(e){
		console.log(e);
		alert('good luck, sucker! HA HA HA!');
	});
})();