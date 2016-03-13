import random, math
from django.db import models
from django.core.exceptions import ValidationError

class Puzzle(models.Model):
	
	def generate_tiles(self, n):
		try:
			n = int(n)
			if n > 2:
				tiles = list(range(0,(n*n)))
				sorted_tiles = tiles[1:]
				sorted_tiles.append(0)
				return sorted_tiles
			else:
				raise ValidationError(('%(n)s must be larger than 2.'), params={'n': n})
		except ValueError:
			raise ValidationError(('%(n)s is not a number'), params={'n': n})

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

	def legal_moves_map(self, n, tiles):
		tiles = [n**2 if x==0 else x for x in tiles] # Swapping 0 with n**2
		length = len(tiles)
		rows = [tiles[i*length // n: (i+1)*length // n] for i in range(n)]
		columns = [[row[i] for row in rows] for i in range(n)]
		blocks = rows + columns

		legal_moves = {}
		for i in range(1,length+1):
			moves = []
			for block in blocks:
				limit = len(block) - 1
				if i in block:
					pos = block.index(i)
					if pos == 0:
						moves.append(block[1])
					elif pos == limit:
						moves.append(block[-2])
					else:
						moves.append(block[pos-1])
						moves.append(block[pos+1])
				moves.sort()
			legal_moves.update({i:moves})
		return legal_moves
