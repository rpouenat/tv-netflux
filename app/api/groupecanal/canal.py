
from .. import api
from seleniumwire import webdriver
from seleniumwire.utils import decode as sw_decode
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
import time


# Permet de récupérer tous les commentaires pour un media
@api.route('/groupeCanal/Canal', methods=['GET'])
# Permet de récupérer tous les commentaires pour un media
def launchCanal():

	chrome_options = webdriver.ChromeOptions()
	# chrome_options.add_argument('--headless')
	chrome_options.add_argument('--disable-dev-shm-usage')
	chrome_options.add_argument('--no-sandbox')
	chrome_options.add_argument('--window-size=1920,1080')
	chrome_options.add_argument('--display=:2')
	# chrome_options.add_argument('--user-data-dir=$(mktemp -d)')
	 

	# svc    = webdriver.ChromeService(executable_path="/usr/bin/chromium")
	driver = webdriver.Chrome(options=chrome_options)

	driver.get('https://www.twitch.tv/otplol_')
	# driver.save_screenshot('connexion_page.png')

	time.sleep(3)

	# driver.save_screenshot('connexion_page.png')

	# On désactive le bouton js-hide-adblock
	# button_player = driver.find_element(By.CLASS_NAME, "ScCoreButton-sc-ocjdkq-0 caieTg ScButtonIcon-sc-9yap0r-0 dOOPAe")
	# print(button_player)
	# button_bypassadblock.click()



	while True:
		pass


	# # On ferme le driver
	# driver.quit()

	else:
		error = "Unknown TV"

	return error, data_output