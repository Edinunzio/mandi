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

    def test_home_page_contains_web_components(self):
        request = HttpRequest()
        response_4 = home_page(request, 4)
        response_3 = home_page(request, 3)
        self.assertContains(response_4, 'id="puzzle"')
        self.assertContains(response_3, 'id="puzzle"')
        self.assertContains(response_4, 'id="grid_size"')
        self.assertContains(response_3, 'id="grid_size"')
        self.assertContains(response_4, 'id="hint"')
        self.assertContains(response_3, 'id="hint"')

    def test_home_page_contains_legal_moves_map(self):
        request = HttpRequest()
        response_3 = home_page(request, 3)
        response_4 = home_page(request, 4)
        self.assertContains(response_3, '{1: [2, 4], 2: [1, 3, 5], 3: [2, 6], 4: [1, 5, 7], 5: [2, 4, 6, 8], 6: [3, 5, 9], 7: [4, 8], 8: [5, 7, 9], 9: [6, 8]}')
        self.assertContains(response_4, '{1: [2, 5], 2: [1, 3, 6], 3: [2, 4, 7], 4: [3, 8], 5: [1, 6, 9], 6: [2, 5, 7, 10], 7: [3, 6, 8, 11], 8: [4, 7, 12], 9: [5, 10, 13], 10: [6, 9, 11, 14], 11: [7, 10, 12, 15], 12: [8, 11, 16], 13: [9, 14], 14: [10, 13, 15], 15: [11, 14, 16], 16: [12, 15]}')


class PuzzleModelTest(TestCase):

    def test_puzzle_generates_tiles_returns_array(self):
        puzzle = Puzzle()
        tiles_3 = puzzle.generate_tiles(3)
        tiles_4 = puzzle.generate_tiles(4)
        self.assertEqual(type(tiles_3), list)
        self.assertEqual(len(tiles_3), 9)
        self.assertEqual(len(tiles_4), 16)

    def test_puzzle_checks_solvable(self):
        puzzle = Puzzle()
        unsolvable_puzzle_2 = [2,1,3,0]
        unsolvable_puzzle_4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,0]
        solvable_puzzle_3 = [1,2,3,0,4,5,7,8,6]
        solvable_puzzle_2 = [1,2,0,3]

        self.assertEqual(puzzle.check_solvable(unsolvable_puzzle_2), False)
        self.assertEqual(puzzle.check_solvable(unsolvable_puzzle_4), False)
        self.assertEqual(puzzle.check_solvable(solvable_puzzle_2), True)
        self.assertEqual(puzzle.check_solvable(solvable_puzzle_3), True)

    def test_puzzle_generates_legal_moves_map(self):
        puzzle = Puzzle()
        tiles_3 = puzzle.generate_tiles(3)
        moves_map3a = puzzle.legal_moves_map(3, tiles_3)
        moves_map3b = {1:[2,4], 2:[1,3,5], 3:[2,6], 4:[1,5,7], 5:[2,4,6,8], 6:[3,5,9], 7:[4,8], 8:[5,7,9], 9:[6,8]}

        tiles_4 = puzzle.generate_tiles(4)
        moves_map4a = puzzle.legal_moves_map(4, tiles_4)
        moves_map4b = {1: [2, 5], 2: [1, 3, 6], 3: [2, 4, 7], 4: [3, 8], 5: [1, 6, 9], 6: [2, 5, 7, 10], 7: [3, 6, 8, 11], 8: [4, 7, 12], 9: [5, 10, 13], 10: [6, 9, 11, 14], 11: [7, 10, 12, 15], 12: [8, 11, 16], 13: [9, 14], 14: [10, 13, 15], 15: [11, 14, 16], 16: [12, 15]}
        
        self.assertEqual(moves_map3a, moves_map3b)
        self.assertEqual(moves_map4a, moves_map4b)

    def test_puzzle_raises_exception_upon_non_integer_grid_submission(self):
        puzzle = Puzzle()
        with self.assertRaises(ValidationError):
            puzzle.generate_tiles('should be an integer')

    def test_puzzle_rejects_too_small_integer_grid_submission(self):
        puzzle = Puzzle()
        with self.assertRaises(ValidationError):
            exc1, exc2 = puzzle.generate_tiles(1)
            self.assertEqual(ValidationError, exc2)
        
