from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ValidationError
from puzzles.models import Puzzle


def home_page(request, grid_size=3):
	puzzle = Puzzle()
	if request.method == 'POST':
		grid_size = request.POST['grid_size']
	try:
		grid_size = int(grid_size)
		
		sorted_tiles = puzzle.generate_tiles(grid_size)
		tiles = puzzle.shuffle_tiles(grid_size, sorted_tiles)
		
		while puzzle.check_solvable(tiles) == False:
			tiles = puzzle.shuffle_tiles(grid_size, sorted_tiles)
		
		tile_size = 100/grid_size
		legal_moves_map = puzzle.legal_moves_map(grid_size, sorted_tiles)
		content = {'grid_size': grid_size, 'sorted_tiles': sorted_tiles, 'tiles': tiles, 'tile_size': tile_size, 'legal_moves_map': legal_moves_map}
		return render(request, 'home.html', content)
	except ValidationError:
		pass