from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest

class NewPlayerTest(unittest.TestCase):

	def setUp(self):
		self.browser = webdriver.Firefox()
		self.browser.implicitly_wait(3)

	def tearDown(self):
		self.browser.quit()

	def test_can_show_puzzle_and_win(self):
		# Barry's ready to take a chance at sliding tiles.
		# He visits the home page.
		self.browser.get('http://localhost:8000')

		# He sees the page title mentioning the name
		self.assertIn('Sliding Tiles', self.browser.title)
		header = self.browser.find_element_by_tag_name('h1').text
		self.assertIn('Sliding Tiles', header)

		# He sees the puzzle loaded on the page

		# He clicks a tile touching the blank space.
		self.fail('Finish the test!')

		# He sees the tiles switch place upon click.

		# He solves the puzzle and sees the congratulations message

if __name__ == '__main__':
	unittest.main(warnings='ignore')