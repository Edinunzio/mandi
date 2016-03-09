from django.shortcuts import render
from django.http import HttpResponse


def home_page(request, n=3):
	#tile_count = n*n
	tiles = list(range(n))
	content = {'grid_size': n, 'tiles': tiles}
	return render(request, 'home.html', content)
