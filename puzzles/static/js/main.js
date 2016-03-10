//(function() {
	//alert('Hello World');
	$('.tile_container').on('click', '.tile', function(e){
		var tile_clicked = this;
		var swap_content = tile_clicked.innerHTML;
		var blank_html = '<div class="tile blank_tile"><p></p></div>';
		var empty_tile = $('.blank_tile');
		
		var num = tile_clicked.textContent;
		var swap_html = '<div class="tile tile_'+num+'"><p>'+ num +'</p></div>'

		//$('.tile_'+num).clear;

		$('.tile_'+num).replaceWith(blank_html);
		//$('.tile_'+num).removeClass('blank_html');
		$(empty_tile).replaceWith(swap_html);
	});
//})();