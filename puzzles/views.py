from django.shortcuts import render
from django.http import HttpResponse
from puzzles.models import Puzzle


def home_page(request, n=3):
	puzzle = Puzzle()
	if request.method == 'POST':
		tiles = puzzle.generate_tiles(request.POST['grid_size'])
		tile_size = 100/int(request.POST['grid_size'])
		content = {'grid_size': request.POST['grid_size'], 'tiles': tiles, 'tile_size': tile_size}
		return render(request, 'home.html', content)
	
	tiles = puzzle.generate_tiles(n)
	tile_size = 100/n
	content = {'grid_size': n, 'tiles': tiles, 'tile_size': tile_size}
	return render(request, 'home.html', content)