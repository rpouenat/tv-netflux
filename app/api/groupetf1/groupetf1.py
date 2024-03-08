

# /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXAiOiI4Mi42Ni44Mi41NyIsImNtY2QiOiIiLCJleHAiOjE3MDk4OTk5MjAsImdpZCI6ImZmNGFmZDBhNDQxNTQyYjk4MWZkZmJhNmRjYmU5MzExIiwiaWF0IjoxNzA5ODg1NTIwLCJpc3MiOiJkZWxpdmVyeSIsIm1heGIiOjAsInN0ZW0iOiIvb3V0L3YxL2RmZTM2ZjkwOTY0OTQ3MTI5OTAyYjg0MmI4M2U2NWI0Iiwic3ViIjoiZmY0YWZkMGE0NDE1NDJiOTgxZmRmYmE2ZGNiZTkzMTEifQ.fKWTjOdLRpln3S6jNJC4zEOzsfbwpSn0pr1k_S1Du3A/out/v1/dfe36f90964947129902b842b83e65b4/index.mpd


# live-tf1-das.cdn-0.diff.tf1.fr

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
from selenium.common.exceptions import TimeoutException
import json
import time


# Permet de récupérer tous les commentaires pour un media
@api.route('/groupetf1/<string:chaine_name>', methods=['GET'])
def getUrlGroupeTF1(chaine_name):

	# Possibilité de chaine 
	# france-2
	# france-3
	# france-4
	# france-5
	# franceinfo

	start = time.time()

	user_groupetf1 = "georgesdupont2128@protonmail.com"
	password_groupetf1 = "YS;=MYiUL:2wmL7"

	error = ""
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
	if chaine_name in [ "tf1", "tmc", "tfx", "lci" ]:

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




# Permet de récupérer tous les commentaires pour un media
@api.route('/licenceM6', methods=['POST'])
def getLicenceM6():
	data_output = {"service_version_info":{"license_sdk_version":"18.1.2","license_service_version":"DRMtoday"},"supported_tracks":[{"type":"SD","key_id":"RH1/SvCfPkiV5JYOU22ZWg=="},{"type":"SD","key_id":"k0vHxqApPVueJhpzJHd1Aw=="},{"type":"HD","key_id":"Qz/7pnCWPnCFeFmp3/S+BA=="},{"type":"AUDIO","key_id":"MwzwlmZlPtm2IaHMLv9ReA=="},{"type":"HD","key_id":"bhCH7zD3NmG+tfqL16SIUg=="},{"type":"AUDIO","key_id":"kdlGe9eVMYugfEhn/0OB5w=="}],"message_type":"LICENSE_REQUEST","status":"OK","license":"CAIStwYKPgoQRl79npEeIxVv2BF60UJKKxImChCQb8MTgABBXKrqaqide+SoEAEyEDpWYnQ1/KD+H/r5o7xPE/AgASgAEh0IARABGAAgACgAOABCAEgAUABYAGABcAB4AYABABpWEhDqoH/h8F3fvSVws+r87UEAGkAoJCcoUd78K3yKKsPD8PUibYQFThvBmD/+tkTwHZceJ6de5Rl5T2a2QJYIeQZ44tOz5wfPXRaqXriKW8dm/V4nIAEaZgoQRH1/SvCfPkiV5JYOU22ZWhIQfhYKlQaXGfmk7izMUmBpkhoQ9DO7FGCHTInda12qWPMxCiACKAEyCAgAECoYACAAOggIABAqGAAgAEISChBrYzE2AAAAAKynB4WgAAAIYgJTRBpmChCTS8fGoCk9W54mGnMkd3UDEhATYzQtFSulV3ZoGhjZZe2GGhAAxRGauhFtMmhFE1lSJ613IAIoATIICAAQKhgAIAA6CAgAECoYACAAQhIKEGtjMTYAAAAArKcHhaAAAAhiAlNEGmYKEEM/+6Zwlj5whXhZqd/0vgQSEA9FN3HMPn66EZg6f9Hxq2IaEHsDNY3Q2arRjz/HgzQP+IMgAigBMggIABAqGAAgADoICAAQKhgAIABCEgoQa2MxNgAAAACspweFoAAACGICSEQaaQoQMwzwlmZlPtm2IaHMLv9ReBIQmbmlZVh4vn8+4LOdf1DoRhoQxw80YJCJaKH5UROpRMyEaSACKAEyCAgAECoYACAAOggIABAqGAAgAEISChBrYzE2AAAAAKynB4WgAAAIYgVBVURJTxpmChBuEIfvMPc2Yb61+ovXpIhSEhDF+Zj7FhPfqb6FlJPPTWgcGhAm1kjpDLUvi8bHJsJA/Bl2IAIoATIICAAQKhgAIAA6CAgAECoYACAAQhIKEGtjMTYAAAAArKcHhaAAAAhiAkhEGmkKEJHZRnvXlTGLoHxIZ/9DgecSEAL2jSdjufqxPwrnNjLxKqcaEPDqQ7oLPg10oaPvcmK8/aIgAigBMggIABAqGAAgADoICAAQKhgAIABCEgoQa2MxNgAAAACspweFoAAACGIFQVVESU8gpI2urwY4AFACGiBHEg4OkLvlgwTH3gluvbXXBin8OZGnhq3PH+1ROaJJ6CKAAUtkZ1qGwaDtHMpxzmr3nKOieq6ykBr1qmcVGDjBR+tsyyplO9uRVVsDRkVVh0AT6xVI1Zo9n+w6M9mNkN7oJPFjZaqFyilnvaDbVu9QqKVcZtdrbtDdi9XbMgtG8BFBho+mangOlOCBTwTKGlDBrkPXfnYiLa0DnSIwdwG4k7UWOggKBjE4LjEuMkABSvgCAAAAAgAAAXgABQAQrKcHha6hgikAAABjAAAAEAAAAHUAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAC7AAAAEAAAAM0AAAAQAAAA3wAAABAAAAAAAAAAAAAAAQsAAAAQAAABIwAAABAAAAE1AAAAEAAAAUcAAAAQAAAAAAAAAAAAAAELAAAAEAAAAYsAAAAQAAABnQAAABAAAAGvAAAAEAAAAAAAAAAAAAABCwAAABAAAAHzAAAAEAAAAgUAAAAQAAACFwAAABAAAAAAAAAAAAAAAQsAAAAQAAACXgAAABAAAAJwAAAAEAAAAoIAAAAQAAAAAAAAAAAAAAELAAAAEAAAAsYAAAAQAAAC2AAAABAAAALqAAAAEAAAAAAAAAAAAAABCwAAABDn5Q5f7ax39aFVVYbXge/RtYrGKdOm5fkKRV6sbpj7VFgB","platform":"macos"}
	d = json_return("",200,data_output)
	return jsonify(d),200




