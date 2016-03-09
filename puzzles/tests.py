from django.core.urlresolvers import resolve
from django.template.loader import render_to_string
from django.test import TestCase
from django.http import HttpRequest

from puzzles.views import home_page

class HomePageTest(TestCase):

	def test_root_url_resolves_to_home_page_view(self):
		found = resolve('/')
		self.assertEqual(found.func, home_page)

	def test_home_page_returns_correct_grid_size(self):
		request = HttpRequest()
		response = home_page(request, 4)
		expected_html = render_to_string('home.html', {'grid_size': 4, 'tiles': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]})
		self.assertEqual(response.content.decode(), expected_html)
