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
		# Barry goes to the home page and sees the simple clean layout
		self.browser.get(self.live_server_url)
		self.browser.set_window_size(1024, 768)
		puzzlebox = self.browser.find_element_by_id('puzzle')
		self.assertAlmostEqual(
			puzzlebox.location['x'] + puzzlebox.size['width'] / 2,
			512,
			delta=5
		)

	def test_can_show_puzzle_and_win(self):
		# Barry visits the home page.
		self.browser.get(self.live_server_url)

		# He sees the puzzle loaded on the page
		puzzle_container = self.browser.find_element_by_id('puzzle')

		# He sees the number of tiles is the grid size ^2 which defaults to 3
		grid_size_display_3 = self.browser.find_element_by_name('grid_size_display')
		self.assertEqual(grid_size_display_3.text, '3')
		tiles_3 = self.browser.find_elements_by_class_name('tile')
		self.assertEqual(len(tiles_3), 9)

		# He decides to try a different size puzzle and enters a 
		# new grid size in the input box and a new game is loaded
		# according to the number he entered into the input box
		inputgridbox = self.browser.find_element_by_id('grid_size')
		inputgridbox.send_keys(5)
		inputgridbox.send_keys(Keys.ENTER)
		grid_size_display_5 = self.browser.find_element_by_name('grid_size_display')
		self.assertEqual(grid_size_display_5.text, '5')
		tiles_5 = self.browser.find_elements_by_class_name('tile')
		self.assertEqual(len(tiles_5), 25)

		# Barry scares quickly and decides to try an easier game with only 4 tiles
		# He feels absolutely no shame as he enters "2" into the input box and hits enter
		inputgridbox = self.browser.find_element_by_id('grid_size')
		inputgridbox.send_keys(2)
		inputgridbox.send_keys(Keys.ENTER)
		grid_size_display_2 = self.browser.find_element_by_name('grid_size_display')
		self.assertEqual(grid_size_display_2.text, '2')

		# Barry's ready to take a chance again so he clicks swappable tile.
		# He sees the tiles switch place upon click.
		self.fail('Finish the test!')

		# He solves the puzzle and sees the congratulations message
