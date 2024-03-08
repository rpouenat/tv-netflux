from flask import render_template, request, jsonify
from ..functions.functions import json_return, facebookNotification
from flask import current_app
from .. import api

from seleniumwire import webdriver
from seleniumwire.utils import decode as sw_decode
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import json
import time


# Permet de récupérer tous les commentaires pour un media
@api.route('/franceTV/<string:chaine_name>', methods=['GET'])
def getUrlFranceTV(chaine_name):

	# Possibilité de chaine 
	# france-2
	# france-3
	# france-4
	# france-5
	# franceinfo

	start = time.time()

	user_francetv = "georgesdupont2128@protonmail.com"
	password_francetv = "YS;=MYiUL:2wmL7"

	error = ""
	data_output = {}
	data_output["url"] = ""
	# On set le type de vidéo récupéré
	data_output["type"] = "application/x-mpegURL"

	# Si on a choisi la bonne chaine
	if chaine_name in [ "france-2", "france-3", "france-4", "france-5", "franceinfo" ]:

		chrome_options = webdriver.ChromeOptions()
		chrome_options.add_argument('--headless')
		chrome_options.add_argument('--disable-dev-shm-usage')
		chrome_options.add_argument('--no-sandbox')
		chrome_options.add_argument('--window-size=1920,1080')

		# svc    = webdriver.ChromeService(executable_path="/usr/bin/chromium")
		driver = webdriver.Chrome(options=chrome_options)

		driver.get('https://www.france.tv/connexion/')
		# driver.save_screenshot('connexion_page.png')

		# On rentre identifiant et mot de passe
		email = driver.find_element(By.ID, "login_email")
		email.send_keys(user_francetv)

		password = driver.find_element(By.ID, "login_password")
		password.send_keys(password_francetv)

		# On appuie sur se connecter
		button_connect = driver.find_element(By.ID, "login_validate")
		button_connect.click()

		time.sleep(1)

		# driver.save_screenshot('connected.png')


		# On va sur la page de la TV
		# driver.get('https://www.france.tv/france-2/direct.html')
		driver.get('https://www.france.tv/'+chaine_name+'/direct.html')

		time.sleep(3)

		# driver.save_screenshot('direct.png')

		# On parcourt les requêtes du navigateur
		for req in driver.requests:
			if ("esi/TA".lower() in req.url.lower()) and ("format=json" in req.url.lower()):
				# print("[+] URL : " + req.url)
				data = sw_decode(req.response.body, req.response.headers.get('Content-Encoding', 'identity'))
				json_data = json.loads(data.decode("utf8"))

				# Si on est en production
				if current_app.config.get('env') == "production":
					data_output["url"] = json_data["url"].replace("https://live-ssai.ftven.fr/", "https://netflux.fun:2083/tv/francetv/")
				else:
					data_output["url"] = json_data["url"].replace("https://live-ssai.ftven.fr/", "https://netflux.fun:2087/tv/francetv/")

				# On vérifie qu'on a bien netflux.fun dans l'url
				if "netflux.fun" not in data_output["url"]:
					data_output["url"] = ""
					error = "Bad Link"
					# On envoie un message facebook
					message = "BUG Application TV : \n\n"
					message += "Impossibilité de mettre netflux.fun dans le lien : \n\n"
					message += "\t- " + json_data["url"]
					facebookNotification(message)

				end = time.time()
				time_exec = end - start
				data_output["time_exec"] = time_exec
				print("[+] Temps : " + str(time_exec))

	else:
		error = "Unknown TV"


	# Si on a pas d'erreur 
	if not error and data_output["url"]:
		d = json_return("",200,data_output)
	else:
		d = json_return(error,400,"")

	return jsonify(d),200

