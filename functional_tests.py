from selenium import webdriver
import unittest

class NewPlayerTest(unittest.TestCase):

	def setUp(self):
		self.browser = webdriver.Firefox()

	def tearDown(self):
		self.browser.quit()

	def test_can_show_puzzle_and_win(self):
		# Barry's ready to take a chance at sliding tiles.
		# He visits the home page.
		self.browser.get('http://localhost:8000')

		# He sees the page title mentioning the name
		self.assertIn('Sliding Tiles', self.browser.title)
		self.fail('Finish the test!')

		# He sees a puzzle loaded on the page

		# He clicks a tile touching the blank space.

		# He sees the tiles switch place upon click.

		# He solves the puzzle and sees the congratulations message

if __name__ == '__main__':
	unittest.main(warnings='ignore')