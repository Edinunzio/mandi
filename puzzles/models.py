import random, math
from django.db import models
from django.core.exceptions import ValidationError

class Puzzle(models.Model):
	
	def generate_tiles(self, n):
		try:
			n = int(n)
			if n >1:
				tiles = list(range(0,(n*n)))
				sorted_tiles = tiles[1:]
				sorted_tiles.append(0)
				return sorted_tiles, random.sample(tiles, (n*n))
			else:
				raise ValidationError(('%(n)s must be larger than 1.'), params={'n': n})
		except ValueError:
			raise ValidationError(('%(n)s is not a number'), params={'n': n})

	def as_columns(self, random_tiles):
		columns = [random_tiles[0]]
		length = len(random_tiles)
		root = math.sqrt(length)
		#first_row = random_tiles[0:root]
		#last_row = random_tiles[length-root:length]
		return [[1,5,9,13], [2,6,10,14], [3,7,11,15], [4,8,12,0]]

	def as_rows(self, random_tiles):
		length = len(random_tiles)
		root = math.sqrt(length)
		return [[1,2,3], [4,5,6], [7,8,0]]

	
	def check_solvable(self, random_tiles):
		length = len(random_tiles)
		return False

	def legal_moves_map(self, random_tiles):
		pass
