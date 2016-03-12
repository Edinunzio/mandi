import random, math
from django.db import models
from django.core.exceptions import ValidationError

class Puzzle(models.Model):
	
	def generate_tiles(self, n):
		try:
			n = int(n)
			if n > 1:
				tiles = list(range(0,(n*n)))
				sorted_tiles = tiles[1:]
				sorted_tiles.append(0)
				return sorted_tiles
			else:
				raise ValidationError(('%(n)s must be larger than 1.'), params={'n': n})
		except ValueError:
			raise ValidationError(('%(n)s is not a number'), params={'n': n})

	def shuffle_tiles(self, n, tiles):
		return random.sample(tiles, (n*n))

	def as_rows(self, n, tiles):
		length = len(tiles)
		return [tiles[i*length // n: (i+1)*length // n] for i in range(n)]

	def as_columns(self, n, rows):
		return [[row[i] for row in rows] for i in range(n)]

	def check_solvable(self, tiles):
		length = len(tiles)
		sum_container = []
		for i in range(length):
			count = 0
			for tile in tiles[i:]:
				if tiles[i] > tile and tile != 0:
					count += 1
			sum_container.append(count)
		if sum(sum_container) % 2 == 0:
			return True
		else:
			return False

	def legal_moves_map(self, rows, cols):
		return {1:[2,4], 2:[1,3,5], 3:[2,6], 4:[1,5,7], 5:[2,4,6,8], 6:[3,5,9], 7:[4,8], 8:[5,7,9], 9:[6,8]}
