from django.core.urlresolvers import resolve
from django.template.loader import render_to_string
from django.test import TestCase
from django.http import HttpRequest
from django.core.exceptions import ValidationError

from puzzles.views import home_page
from puzzles.models import Puzzle

class HomePageTest(TestCase):

	def test_root_url_resolves_to_home_page_view(self):
		found = resolve('/')
		self.assertEqual(found.func, home_page)

	def test_uses_home_template(self):
		response = self.client.get('/')
		self.assertTemplateUsed(response, 'home.html')

	def test_home_page_displays_correct_number_of_tiles(self):
		request = HttpRequest()
		response = home_page(request, 4)
		expected_html = render_to_string('home.html', {'grid_size': 4, 'tiles': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]})
		self.assertContains(response, '<div class="tile tile_15"><p>15</p></div>')


class PuzzleModelTest(TestCase):

	def test_puzzle_generates_tiles_returns_array(self):
		puzzle = Puzzle()
		sorted_tiles = puzzle.generate_tiles(3)
		tiles = puzzle.shuffle_tiles(3, sorted_tiles)
		self.assertEqual(type(tiles), list)
		self.assertEqual(len(tiles), 9)

	def test_puzzle_shuffle_tiles(self):
		puzzle = Puzzle()
		sorted_tiles = puzzle.generate_tiles(3)
		tiles = puzzle.shuffle_tiles(3, sorted_tiles)
		self.assertNotEqual(tiles, [1,2,3,4,5,6,7,8,0])

	def test_puzzle_checks_solvable(self):
		puzzle = Puzzle()
		unsolvable_puzzle = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,0]
		self.assertEqual(puzzle.check_solvable(unsolvable_puzzle), False)
		solvable_puzzle = [1,2,3,0,4,5,7,8,6]
		self.assertEqual(puzzle.check_solvable(solvable_puzzle), True)

	def test_puzzle_generates_legal_moves_map(self):
		puzzle = Puzzle()
		tiles = puzzle.generate_tiles(3)
		moves_map1 = puzzle.legal_moves_map(3, tiles)
		moves_map2 = {1:[2,4], 2:[1,3,5], 3:[2,6], 4:[1,5,7], 5:[2,4,6,8], 6:[3,5,9], 7:[4,8], 8:[5,7,9], 9:[6,8]}
		self.assertEqual(moves_map1, moves_map2)

	def test_puzzle_raises_exception_upon_non_integer_grid_submission(self):
		puzzle = Puzzle()
		with self.assertRaises(ValidationError):
			puzzle.generate_tiles('should be an integer')

	def test_puzzle_rejects_too_small_integer_grid_submission(self):
		puzzle = Puzzle()
		with self.assertRaises(ValidationError):
			exc1, exc2 = puzzle.generate_tiles(1)
			self.assertEqual(ValidationError, exc2)
		
