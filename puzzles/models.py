import random
from django.db import models
from django.core.exceptions import ValidationError

class Puzzle(models.Model):
	
	def generate_tiles(self, n):
		try:
			n = int(n)
			tiles = list(range(0,(n*n)))
			return random.sample(tiles, (n*n))
		except ValueError:
			raise ValidationError(('%(n)s is not a number'), params={'n': n})