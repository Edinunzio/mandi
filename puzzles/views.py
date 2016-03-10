from django.shortcuts import render
from django.http import HttpResponse
from puzzles.models import Puzzle


def home_page(request, n=3):
	puzzle = Puzzle()
	tiles = puzzle.generate_tiles(n)
	content = {'grid_size': n, 'tiles': tiles}
	return render(request, 'home.html', content)
