

# /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXAiOiI4Mi42Ni44Mi41NyIsImNtY2QiOiIiLCJleHAiOjE3MDk4OTk5MjAsImdpZCI6ImZmNGFmZDBhNDQxNTQyYjk4MWZkZmJhNmRjYmU5MzExIiwiaWF0IjoxNzA5ODg1NTIwLCJpc3MiOiJkZWxpdmVyeSIsIm1heGIiOjAsInN0ZW0iOiIvb3V0L3YxL2RmZTM2ZjkwOTY0OTQ3MTI5OTAyYjg0MmI4M2U2NWI0Iiwic3ViIjoiZmY0YWZkMGE0NDE1NDJiOTgxZmRmYmE2ZGNiZTkzMTEifQ.fKWTjOdLRpln3S6jNJC4zEOzsfbwpSn0pr1k_S1Du3A/out/v1/dfe36f90964947129902b842b83e65b4/index.mpd


# live-tf1-das.cdn-0.diff.tf1.fr

from flask import render_template, request, jsonify
from ..functions.functions import json_return, facebookNotification
from flask import current_app

from seleniumwire import webdriver
from seleniumwire.utils import decode as sw_decode
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
import json
import time


# Permet de récupérer tous les commentaires pour un media
def getUrlGroupeTF1(chaine_name):

	# Possibilité de chaine 
	# france-2
	# france-3
	# france-4
	# france-5
	# franceinfo

	error = ""
	user_groupetf1 = "georgesdupont2128@protonmail.com"
	password_groupetf1 = "YS;=MYiUL:2wmL7"
	data_output = {}
	data_output["url"] = ""
	# On set le type de vidéo récupéré
	data_output["type"] = "application/dash+xml"

	# https://www.tf1.fr/tf1/direct
	# https://www.tf1.fr/tmc/direct
	# https://www.tf1.fr/tfx/direct
	# https://www.tf1.fr/lci/direct
	# https://www.tf1.fr/notre-planete-98498093/direct ?

	# Si on a choisi la bonne chaine
	if chaine_name in [ "tf1", "tmc", "tfx", "lci", "tf1sf" ]:

		# Si c'est tf1sf (Pour TF1 série Films) on remplace
		if chaine_name == "tf1sf":
			chaine_name = "tsf"

		chrome_options = webdriver.ChromeOptions()
		chrome_options.add_argument('--headless')
		chrome_options.add_argument('--disable-dev-shm-usage')
		chrome_options.add_argument('--no-sandbox')
		# chrome_options.add_argument('--window-size=1920,1080')

		# svc    = webdriver.ChromeService(executable_path="/usr/bin/chromium")
		driver = webdriver.Chrome(options=chrome_options)

		driver.get('https://www.tf1.fr/compte/connexion')

		try:
			# On attends que la page ait chargée
			elem = WebDriverWait(driver, 3).until(
				EC.presence_of_element_located((By.ID, "popin_tc_privacy_button_3")) #This is a dummy element
			)
		except TimeoutException:
			# On attends que la page ait chargée
			elem = WebDriverWait(driver, 3).until(
				EC.presence_of_element_located((By.ID, "popin_tc_privacy_button_3")) #This is a dummy element
			)
		# driver.save_screenshot('connexion_page.png')

		# On valide les cookies
		button_cookie = driver.find_element(By.ID, "popin_tc_privacy_button_3")
		button_cookie.click()

		# driver.save_screenshot('connexion_cookie.png')


		# On rentre identifiant et mot de passe
		email = driver.find_element(By.ID, "email")
		email.send_keys(user_groupetf1)

		password = driver.find_element(By.ID, "password")
		password.send_keys(password_groupetf1)
		# driver.save_screenshot('connexion_mpd.png')

		# On appuie 3 fois sur tab pour aller sur le bouton de connexion
		password.send_keys(Keys.TAB * 3)
		# On appuie sur entré
		password.send_keys(Keys.RETURN)

		time.sleep(2)

		# On va sur le direct
		driver.get('https://www.tf1.fr/'+chaine_name+'/direct')

		# driver.save_screenshot('direct.png')

		time.sleep(8)

		# driver.save_screenshot('direct.png')


		# live-tf1-das.cdn-0.diff.tf1.fr/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXAiOiI4Mi42Ni44Mi41NyIsImNtY2QiOiIiLCJleHAiOjE3MDk4OTk5MjAsImdpZCI6ImZmNGFmZDBhNDQxNTQyYjk4MWZkZmJhNmRjYmU5MzExIiwiaWF0IjoxNzA5ODg1NTIwLCJpc3MiOiJkZWxpdmVyeSIsIm1heGIiOjAsInN0ZW0iOiIvb3V0L3YxL2RmZTM2ZjkwOTY0OTQ3MTI5OTAyYjg0MmI4M2U2NWI0Iiwic3ViIjoiZmY0YWZkMGE0NDE1NDJiOTgxZmRmYmE2ZGNiZTkzMTEifQ.fKWTjOdLRpln3S6jNJC4zEOzsfbwpSn0pr1k_S1Du3A/out/v1/dfe36f90964947129902b842b83e65b4/index.mpd
		# On parcourt les requêtes du navigateur
		for req in driver.requests:
			if ("out/v1".lower() in req.url.lower()) and ("index.mpd" in req.url.lower()):
				print("[+] URL : " + req.url)

				# On remplace l'url
				# Si on est en production
				if current_app.config.get('env') == "production":
					data_output["url"] = req.url.replace("https://live-"+chaine_name+"-das.cdn-0.diff.tf1.fr/", "https://netflux.fun:2083/tv/" + chaine_name + "/")
				else:
					data_output["url"] = req.url.replace("https://live-"+chaine_name+"-das.cdn-0.diff.tf1.fr/", "https://netflux.fun:2087/tv/" + chaine_name + "/")

				# On vérifie qu'on a bien netflux.fun dans l'url
				if "netflux.fun" not in data_output["url"]:
					data_output["url"] = ""
					error = "Bad Link"
					# On envoie un message facebook
					message = "BUG Application TV : \n\n"
					message += "Impossibilité de mettre netflux.fun dans le lien : \n\n"
					message += "\t- " + req.url
					facebookNotification(message)

	else:
		error = "Unknown TV"

	return error, data_output




