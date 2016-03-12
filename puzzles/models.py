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
		tiles = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]#[n**2 if x==0 else x for x in tiles] # Normalizing 0 for last int
		length = len(tiles)
		rows = [tiles[i*length // n: (i+1)*length // n] for i in range(n)]
		columns = [[row[i] for row in rows] for i in range(n)]
		blocks = rows + columns
		print('blocks_length:')
		print(blocks)

		legal_moves = {}
		for i in range(1,length+1):
			moves = []
			for block in blocks:
				block_length = len(block)
				#print('block_length:')
				#print(block_length)
				if i in block:
					i_pos = block.index(i)
					if i_pos == 0:
						moves.append(block[1])
					if i_pos == block_length+1:
						moves.append(block[(block_length - 1)])
					if i_pos >0 < block_length +1:
						try:
							moves.append(block[i_pos + 1])
							moves.append(block[i_pos - 1])
						except IndexError as e:
							#print('Index error begins')
							print(e)
							print(block_length)
			legal_moves[i] = moves
			#print('i ends')
			#print(legal_moves)
			"""for chunk in chunks:
				moves = []
				if i in chunk:
					i_position = chunk.index(i)
					if i_position == 0:
						moves.append(chunk[1])
						print(chunk[1])
					elif i_position == -1:
						moves.append(chunk[-2])
					else:
						pass
						#moves.append(chunk[i_position+1])
						#moves.append(chunk[i_position-1])
				legal_moves.update({i:moves})
				"""
		print(legal_moves)
		#legal_moves = {1:[2,4], 2:[1,3,5], 3:[2,6], 4:[1,5,7], 5:[2,4,6,8], 6:[3,5,9], 7:[4,8], 8:[5,7,9], 9:[6,8]}
		"""for i in range(1,length):
			moveable_tiles = []
			for chunk in chunks:
				if i in chunk:
					i_position = chunk.index(i)
					if i_position == 0:
						moveable_tiles.append(chunk[i+1])
					elif i_position == -1:
						moveable_tiles.append(chunk[i-1])
					else:
						moveable_tiles.append(chunk[i-1])
						moveable_tiles.append(chunk[i+1])
			legal_moves.append({i:moveable_tiles})"""
		#return {1:[2,4], 2:[1,3,5], 3:[2,6], 4:[1,5,7], 5:[2,4,6,8], 6:[3,5,9], 7:[4,8], 8:[5,7,9], 9:[6,8]}
		return legal_moves
