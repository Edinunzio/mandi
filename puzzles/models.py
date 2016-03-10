import random
from django.db import models

class Puzzle(models.Model):
	
	def generate_tiles(self, n):
		n = int(n)
		tiles = list(range(0,(n*n)))
		return random.sample(tiles, (n*n))

		
