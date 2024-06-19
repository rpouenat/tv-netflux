

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
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException
import time
import os


# Vérifier si la chaine est déjà diffusé sur un DISPLAY

# Si oui rediriger l'utilisateur sur le bon ID sinon ouvrir un nouveau DISPLAY : 8af8a0c5-3f8e-4425-9927-b8322f711853

# Récupérer tous les numéro de display en place
def findAvailableDISPLAY():
	# On démarre les numéro de display à 3
	num_display = 3
	max_display = 99
	find_available = False

	stream = os.popen('(cd /tmp/.X11-unix && for x in X*; do echo "${x#X}"; done)')
	all_display = stream.read().replace("").strip().split("\n")
	# Si on a pas de display
	if len(all_display) == 0:
		num_display = 3
	else:
		
		# On parcourt les display actuel
		for current_display in all_display:
			if num_display != int(current_display):
				# On arrête la boucle
				break
			else:
				num_display += 1

		# # On parcourt tant qu'on est inférieur à 99 et qu'on a pas trouvé
		# while num_display < max_display and (not find_available):
		# 	for 

		# print(all_display)
	print(num_display)
	return num_display

# Permet de créer un DISPLAY
def createDISPLAY(DISPLAY):
	stream = os.popen('Xvfb '+DISPLAY+' -screen 0 1920x1080x24 &')



# Permet de kill un display
def stopDISPLAY(DISPLAY):
	# ps aux | grep "Xvfb :4"
	pass


# On récupère le numéro de display que l'on doit créer
# DISPLAY_NUM = findAvailableDISPLAY()
# # Numéro de l'écran pris en charge
DISPLAY_NUM=4

DISPLAY=":" + str(DISPLAY_NUM)

# On créer le display
# createDISPLAY(DISPLAY)

# Assurez-vous que le display virtuel est configuré
os.environ['DISPLAY'] = DISPLAY

# Chemin vers le profil Chrome 
# BYPASS LE NOMBRE DE LICENCE DRM
# utilisation du même profil
# OU 
# Injection de cookies
chrome_profile_path = '/home/netflux/tv/vnc_test/google_profile'


# Permet d'envoyer des touches dans un display
def send_command(list_command):
    # On exécute les commandes
    for command in list_command:
    	os.system('xdotool key ' + command)

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument(f'user-data-dir={chrome_profile_path}')
# chrome_options.add_argument('--headless')
# chrome_options.add_argument('--disable-dev-shm-usage')
# chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--window-size=1920,1080')
chrome_options.add_argument("--start-maximized")
# chrome_options.add_argument('--enable-usermedia-screen-capturing')
# chrome_options.add_argument('--auto-select-desktop-capture-source=myCANAL : tv, sports, séries, films en streaming en direct live ou replay | myCANAL')


# Accélération matérielle et WebGL
# chrome_options.add_argument('--disable-gpu')  # Désactiver l'accélération matérielle GPU
# chrome_options.add_argument('--enable-webgl')  # Activer WebGL

# Options pour améliorer les performances de capture multimédia
# chrome_options.add_argument('--disable-features=AudioServiceSandbox')
# chrome_options.add_argument('--use-fake-ui-for-media-stream')
# chrome_options.add_argument('--use-fake-device-for-media-stream')



# chrome_options.add_argument("--disable-user-media-security")
# chrome_options.add_argument("--disable-gpu")  # Disable GPU hardware acceleration
# chrome_options.add_argument("--enable-webgl")  # Enable WebGL


service = Service(executable_path="/usr/bin/chromedriver")
driver = webdriver.Chrome(service=service, options=chrome_options)


# driver.add_cookie({‘name’ : ‘foo’, ‘value’ : ‘bar’})

# On se rends sur la page canal
driver.get('https://www.canalplus.com/')

# driver.get("https://www.twitch.tv/otplol_")

# https://www.canalplus.com/live/tab/direct/sport?channel=823



time.sleep(1)

#
# Netflux share
#


print("Parent window title: " + driver.title)

# Ouverte du second onglet
# driver.find_element(By.TAG_NAME, "body").send_keys(Keys.CONTROL + 't')

# On ouvre la seconde page
driver.execute_script('''window.open("https://netflux.fun:2087/amelkamlekalekmazlkemlakemalkemalkemlkaemalke/canal","_blank");''')
# driver.get('https://netflux.fun:2087/amelkamlekalekmazlkemlakemalkemalkemlkaemalke/canal')

time.sleep(1)

# On sélectionne l'onglet à partager
# Envoyer une tabulation au display :1
send_command(["Tab", "Tab", "Right", "KP_Enter"])

time.sleep(1)

# print(driver.window_handles)

driver.switch_to.window(driver.window_handles[0]) #switch to new tab


print("Parent window title: " + driver.title)


# On set les cookies d'authentification

# https://data.canalplus.com/production/v2/cookie-sync.html?
# driver.add_cookie({'name' : 'passId', 'value' : 'FR=AAAAEBZDD9NXQ1N6eHEljVmn4fFoujnlDchFYAyx42hKytDqHn3OLfAo8sMLrORnXyF4JnnGB/wfk4t4z8daJmb/kAstrKDyxCIXw7XnTXDOjl0p+AVDhWdOBai4eZ9a6ozbIYEIEBSZH9smi5LBhdtGcTtUuCaUSGV9um4KAvRgY4eH', 'domain' : '.canalplus.com'})
# driver.add_cookie({'name' : 'p_pass_token', 'value' : 'FR=AAAAEBZDD9NXQ1N6eHEljVmn4fFoujnlDchFYAyx42hKytDqHn3OLfAo8sMLrORnXyF4JnnGB/wfk4t4z8daJmb/kAstrKDyxCIXw7XnTXDOjl0p+AVDhWdOBai4eZ9a6ozbIYEIEBSZH9smi5LBhdtGcTtUuCaUSGV9um4KAvRgY4eH', 'domain' : '.canalplus.com'})
# driver.add_cookie({'name' : '_cs_id', 'value' : 'complete', 'domain' : '.canalplus.com'})
# driver.add_cookie({'name' : 'didomi_token', 'value' : 'eyJ1c2VyX2lkIjoiMTkwMzAyN2MtZDUxMy02Y2VlLWFhZWItOGU3MmU1NjRjNzU4IiwiY3JlYXRlZCI6IjIwMjQtMDYtMTlUMTE6MDA6MzMuMjMzWiIsInVwZGF0ZWQiOiIyMDI0LTA2LTE5VDExOjAwOjM1LjIzNloiLCJ2ZW5kb3JzIjp7ImVuYWJsZWQiOlsidHdpdHRlciIsImdvb2dsZSIsImM6bWVldHJpY3NnLU5kRU44V3hUIiwiYzp0aWt0b2stWmtYUWhlQXIiLCJjOmxlcGFyaXNpZW4tZnJEamtlN0oiLCJjOm1ldGEtWDNxTGE0VGsiLCJjOnNuYXBjaGF0LXhhSHlwR0t3IiwiYzpsZWZpZ2Fyby1mV3RXWTQ4OCIsImM6YW1hdXJ5bWVkLXFtSnA4WjN6IiwiYzphZHZlcnNwb3J0LXp0Z0NUWVJaIiwiYzpvdWVzdGZyYW4tN0Q2UjZpVloiLCJjOndlYmVkaWEtS3hMcVhyV0UiLCJjOmFsbGlhbmNlZy1DaGRBZDlHOCIsImM6ZXVyb3Nwb3J0LUZaalRxVVZRIiwiYzpvcmFuZ2UtQkY4YWtMaGEiLCJjOnJld29ybGRtZS1VRVdEZGE2eCIsImM6aG9yeXpvbm1lLWJ6d3g4N0JjIiwiYzoyMG1pbnV0ZXMtd2ZnOFFQWEMiLCJjOm5ld2NvbW1lLVFycGdCdE50IiwiYzp0d2l0Y2gtS0phTUZEZUQiLCJjOmxpbmtlZGluLXdFaW1BUHhWIiwiYzozNjYtR21Oa1ZhcEoiLCJjOmNhcmFkaXNpYWMtOXpXaVVFTHIiLCJjOmFkMzYwbWVkLVhMVU1iWHBKIiwiYzplY3JhbmxhcmctVzNDNnhVWWgiLCJjOnNlcmllb3VzbHktWUh4TTNCUjgiLCJjOnVuaWZ5LWJaODdMRGdkIiwiYzptcHVibGljaXQtTTJZaEJWckYiLCJjOnNwb3J0bG9jYS03UmV4R25DZiIsImM6c2hvd3Jvb21wLTJIUXllWTJBIiwiYzptYXRjaGVuZC13aFhhVTg0YiIsImM6dmlvdXNseS1WWktnZ3hDTiIsImM6b25lZm9vdGJhLXo4VmRLeExmIiwiYzpsZXR1ZGlhbnQtNHFBNlBWWnciLCJjOm1vbnBldGl0LVJyWm1aalBDIiwiYzp0b25zc2VyLXdmTTZQdHluIiwiYzpzcG9ydGVhc3ktTGFreEVqY3ciLCJjOnZlZXBlZS1uRGNpVVhxciIsImM6c25jZmNvbm5lLXE4bU1uUEozIiwiYzpzZW5zY3JpdGktamhHbUVnYnkiLCJjOm02cHVibGljaS14bmdHamtFeiIsImM6Zmlyc3RpZC15OEtyNFVnViIsImM6emV0YS1mZVhUemRLZyIsImM6YnJ1dC1QWFJBRHJZNCIsImM6YWx0aWNlbWVkLVpDMnRBUXFVIiwiYzpmcmFuY2V0di1pUnBQRlkyUCIsImM6YWJ0YXN0eS1DWlRXMjNyMyIsImM6Y29udGVudHNxdS1YR1pNUWN5YSIsImM6cmV0YWlsaW5rLVlwNmk2RzNaIiwiYzpiZXRhc2VyaWVzLWdQYUdlWVkzIiwiYzptaWNyb3NvZnQtRGNnQ3hXUWoiLCJjOnZlcml6b25tZS1QamM5ckVHbSIsImM6cXdhcnJ5LVRlVmZITU02IiwiYzptYW5pdG9iYS05eGhpUGRGRyIsImM6cG93ZXJzcGFjZS14eXlwUjRqTiJdfSwicHVycG9zZXMiOnsiZW5hYmxlZCI6WyJhZHZlcnRpc2luZyIsImFuYWx5dGljcyJdfSwidmVyc2lvbiI6MiwiYWMiOiJCeUdBR0FGa0E4d0hJUUFBLkFBQUEifQ==', 'domain' : '.canalplus.com'})
# driver.add_cookie({'name' : 'euconsent-v2', 'value' : 'CQAdTsAQAdTsAAHABBENA5EgAPKAAAAAAAqIJ2kB7CLMAWFgQXBEAMMECAAcxBAAqEAgBAIIgQAAABAAMIwAkGAAIABAAAAKAAAEIAIAAAAAAADAAAAAAAAAAAAIAAAQABAAICAAAAARAAAACAABGQBAEAAQAAAAAAAAgAIAAAgAAEAAAAAAAQAAAAIAAIAAAAAAAAAgAAAAAAAAACwACAAAAAAAAAAAAFAAEABAAAEAAAAAAAAKBAAAIAAACSAAGAAIKRDAAMAAQUiFAAYAAgpEWAAwABBSIoABgACCkQ6ADAAEFIgwAGAAIKRBIAMAAQUiJQAYAAgpEAAA.flAAAAAAAAAA', 'domain' : '.canalplus.com'})
# driver.add_cookie({'name' : '_abck', 'value' : '8104D8DBD0039409CE9107A38E925742~-1~YAAQuJHdWD8I3ySQAQAAcg4nMAxGSg6IvPaH/cbKnlbznbeqdT0GAkOBPqutDjjOmofjW0TuqIHCsCHwKl1jhNe0lh+v7zzXWvnC66Ql3HPmjbbxjTdUkZIjhXPp6RrampEKolDtbz2pFEFB0rVFJwSrrKklVlUeiTk5OINQZ6OZTKm0SHe4s6q7Ls7OCeLajoc4Sqglsz7VaL8v9f1S4AgRxxQFUhttw8bxFIRDqKE1QtagDbWNPEeKfkmbvmit1FjF7tM4cTiiMrdJVVZqFGYcfTgt0AOZY9SFn7h6PB4j/5gwUq+mEZR/3yotQfn5o2uq2syZQ4/P55Y/dO3UtRoMIOZ7w4P9t14niyCXBaxwIN3WJuigtS5iBGOtZUcp93JeA3jWKoe/odp3kZD9~-1~-1~-1', 'domain' : '.canalplus.com'})

# driver.add_cookie({"name": "our new cookie!", "value": "some random text!"})

# # On set les cookies
# Domaine : .canalplus.com
# Nom : passId
# Valeur : 
# Expire : 19-06-2026 12:54:40

# Domaine : .canalplus.com
# Nom : p_pass_token
# Valeur : 
# Expire : 19-06-2026 12:54:40

# Domaine : .canalplus.com
# Nom : _cs_id
# Valeur : 
# Expire : 

# Domaine : .canalplus.com
# Nom : didomi_token
# Valeur : 
# Expire : 19-12-2024 12:54:09

# Domaine : .canalplus.com
# Nom : euconsent-v2 (pour accepter les cookies)
# Valeur : 
# Expire : 19-12-2024 12:54:09

# Domaine : .canalplus.com
# Nom : _abck (pour les cookies)
# Valeur : 
# Expire : 19-06-2025 12:54:39


# # On recharge la page pour prendre en compte les cookies
# driver.execute_script("location.reload()")

# time.sleep(2)


# https://www.canalplus.com/live/tab/direct/sport?channel=101




# On va sur la page des sports
driver.get('https://www.canalplus.com/live/tab/direct/sport')

# On attends le chargement de la page
time.sleep(3)





# On clique sur la chaine que l'on veut
tv_click = driver.find_element(By.ID, "101_onclick")
tv_click.click()


# On mets en plein écran
# send_command(["f"])



# driver.get('https://www.canalplus.com/live/tab/direct/sport?channel=101')

# user_canal = "georgesdupont2128@protonmail.com"
# password_canal = "kLvK5&t6XuT2/Qp"

# # On se connecte 
# # On rentre identifiant et mot de passe
# email = driver.find_element(By.ID, "input28")
# email.send_keys(user_canal)

# password = driver.find_element(By.ID, "input36")
# password.send_keys(password_canal)

# o-form-button-bar

# On appuie sur se connecter
# button_connect = driver.find_element(By.ID, "login_validate")
# button_connect.click()






# On clique sur les cookies
# button_cookie = driver.find_element(By.ID, "didomi-notice-agree-button")
# button_cookie.click()

# On se connecte 
# time.sleep(1)
# button_cookie = driver.find_element(By.CLASS_NAME, "UserMenuMyCanalExtended__buttons__button___Fieue UserMenuMyCanalExtended__buttons__button--primary___pJxu4")
# button_cookie.click()










# print("[+] ESCAPE")

# actions = ActionChains(driver) 
# # actions.send_keys(Keys.TAB * 5)
# # actions.send_keys(Keys.ARROW_RIGHT)
# actions.send_keys(Keys.ENTER)
# actions.perform()


# alert = driver.switch_to.alert
# alert.accept()

# # On fait TAB TAB puis on sélectionne le premier onglet
# driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
# driver.find_element(By.TAG_NAME, "body").send_keys(Keys.TAB * 5)
# # On appuie 3 fois sur tab pour aller sur le bouton de connexion
# # password.send_keys(Keys.TAB * 3)
# # On appuie sur entré
# driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ARROW_RIGHT)
# driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ENTER)
# # password.send_keys(Keys.RETURN)

# print("[+] Enter")


while True:
	pass