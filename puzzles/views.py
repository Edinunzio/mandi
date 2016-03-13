from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ValidationError
from puzzles.models import Puzzle


def home_page(request, grid_size=3):
	puzzle = Puzzle()
	try:
		#request.POST['grid_size']
		grid_size = request.POST['grid_size']
	except ValidationError:
		pass
	finally:
		grid_size = int(grid_size)
		
		tiles = puzzle.generate_tiles(grid_size)
		tile_size = 100/grid_size
		legal_moves_map = puzzle.legal_moves_map(grid_size, tiles)
		content = {'grid_size': grid_size, 'tiles': tiles, 'tile_size': tile_size, 'legal_moves_map': legal_moves_map}
		return render(request, 'home.html', content)
	