from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class NewPlayerTest(LiveServerTestCase):

	def setUp(self):
		self.browser = webdriver.Firefox()
		self.browser.implicitly_wait(3)

	def tearDown(self):
		self.browser.quit()

	def test_layout_and_styling(self):
		# Barry goes to the home page
		self.browser.get(self.live_server_url)
		self.browser.set_window_size(1024, 768)

		# The beautiful layout reminds him of Mandi
		# Even balanced, centered
		puzzlebox = self.browser.find_element_by_id('puzzle')
		self.browser.implicitly_wait(3)
		self.assertAlmostEqual(
			puzzlebox.location['x'] + puzzlebox.size['width'] / 2,
			512,
			delta=5
		)

	def test_can_show_puzzle_and_win(self):
		# Barry's ready to take a chance at sliding tiles.
		# He visits the home page.
		self.browser.get(self.live_server_url)

		# He sees the puzzle loaded on the page

		# He decides to try a different size puzzle and enters a 
		# new grid size in the input box and a new game is loaded
		# according to the number he entered into the input box
		inputgridbox = self.browser.find_element_by_id('grid_size')
		inputgridbox.send_keys(5)
		inputgridbox.send_keys(Keys.ENTER)

		# He clicks a tile touching the blank space.
		self.fail('Finish the test!')

		# He sees the tiles switch place upon click.

		# He solves the puzzle and sees the congratulations message
