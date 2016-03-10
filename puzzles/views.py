from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ValidationError
from puzzles.models import Puzzle


def home_page(request, n=3):
	puzzle = Puzzle()
	if request.method == 'POST':
		try:
			grid_size = int(request.POST['grid_size'])
			sorted_tiles, tiles = puzzle.generate_tiles(grid_size)
			tile_size = 100/grid_size
			content = {'grid_size': grid_size, 'sorted_tiles': sorted_tiles, 'tiles': tiles, 'tile_size': tile_size}
			return render(request, 'home.html', content)
		except ValidationError:
			pass

	sorted_tiles, tiles = puzzle.generate_tiles(n)
	tile_size = 100/n
	content = {'grid_size': n, 'sorted_tiles': sorted_tiles, 'tiles': tiles, 'tile_size': tile_size}
	return render(request, 'home.html', content)