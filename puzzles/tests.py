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
		sorted_tiles, tiles = puzzle.generate_tiles(3)
		self.assertEqual(type(tiles), list)

	def test_puzzle_generates_tiles_returns_shuffled_array(self):
		puzzle = Puzzle()
		sorted_tiles, tiles = puzzle.generate_tiles(3)
		self.assertNotEqual(tiles, [0,1,2,3,4,5,6,7,8])

	def test_puzzle_raises_exception_upon_non_integer_grid_submission(self):
		puzzle = Puzzle()
		with self.assertRaises(ValidationError):
			puzzle.generate_tiles('should be an integer')

	def test_puzzle_rejects_too_small_integer_grid_submission(self):
		puzzle = Puzzle()
		with self.assertRaises(ValidationError):
			exc1, exc2 = puzzle.generate_tiles(1)
			self.assertEqual(ValidationError, exc2)
		
