from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class NewPlayerTest(LiveServerTestCase):

	def setUp(self):
		self.browser = webdriver.Firefox()
		self.browser.implicitly_wait(3)

	def tearDown(self):
		self.browser.quit()

	def test_can_show_puzzle_and_win(self):
		# Barry's ready to take a chance at sliding tiles.
		# He visits the home page.
		self.browser.get(self.live_server_url)

		# He sees the puzzle loaded on the page

		# He clicks a tile touching the blank space.
		self.fail('Finish the test!')

		# He sees the tiles switch place upon click.

		# He solves the puzzle and sees the congratulations message
