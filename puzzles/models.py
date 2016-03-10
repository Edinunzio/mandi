from django.db import models

class Puzzle(models.Model):
	
	def generate_tiles(self, n):
		return list(range(0,(n*n)))
