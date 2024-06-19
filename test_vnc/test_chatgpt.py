



# cd /home/download/tv/vnc_test
# source venv/bin/activate
# python test.py

from seleniumwire import webdriver
from seleniumwire.utils import decode as sw_decode
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
import time



chrome_options = webdriver.ChromeOptions()
# chrome_options.add_argument('--headless')
# chrome_options.add_argument('--disable-dev-shm-usage')
# chrome_options.add_argument('--no-sandbox')
# chrome_options.add_argument("--use-fake-ui-for-media-stream")
# chrome_options.add_argument("--use-fake-device-for-media-stream")
# chrome_options.add_argument("--auto-select-desktop-capture-source=Entire screen")
# chrome_options.add_argument("--disable-user-media-security")
# chrome_options.add_argument("--allow-file-access-from-files")
# chrome_options.add_argument("--allow-http-screen-capture")
# chrome_options.add_argument('--window-size=1920,1080')
# chrome_options.add_argument('--display=:3')


# chrome_options.add_argument("--use-fake-ui-for-media-stream")
# chrome_options.add_argument("--use-fake-device-for-media-stream")
# chrome_options.add_argument("--allow-http-screen-capture")
# chrome_options.add_argument('--use-fake-ui-for-media-stream')
chrome_options.add_argument('--enable-usermedia-screen-capturing')
chrome_options.add_argument('--auto-select-desktop-capture-source=Entire screen')
chrome_options.add_argument('--window-size=1920,1080')


service = Service(executable_path="/usr/bin/chromedriver")
driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get('https://netflux.fun:2087/amelkamlekalekmazlkemlakemalkemalkemlkaemalke/canal')

# https://www.canalplus.com/live/tab/direct/sport?channel=823


# time.sleep(3)

# # Simuler les interactions nécessaires pour démarrer le partage d'écran
# start_sharing_button = driver.find_element(By.ID, "btn-stream-canal")
# start_sharing_button.click()

# # Attendre le démarrage du partage d'écran
# time.sleep(5)

# Maintenir le script en cours d'exécution pour le partage d'écran
try:
	while True:
		time.sleep(1)
except KeyboardInterrupt:
	pass