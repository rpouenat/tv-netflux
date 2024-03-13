
from flask import render_template, request, jsonify
from ..functions.functions import json_return, facebookNotification
import requests
from flask import current_app


# Permet de récupérer tous les commentaires pour un media
def getCNewsURL():

	error = ""
	data_output = {}
	data_output["url"] = ""
	# On set le type de vidéo récupéré
	data_output["type"] = "application/dash+x-mpegURL"

	r = requests.get("https://routemeup.canalplus-bo.net/plfiles/v2/metr/dash-ssl/cnews-clair-hd.json")
	if r.status_code == 200:
		data = r.json()
		if "adswitched" in data:
			if data["adswitched"]:
				if data["adswitched"][0]:
					if "src" in data["adswitched"][0]:
						url = data["adswitched"][0]["src"]

						if current_app.config.get('env') == "production":
							if "dtd-pfsbo-nea-app-eu-west-1-prod-bo-canal.akamaized.net" in url:
								data_output["url"] = url.replace("https://dtd-pfsbo-nea-app-eu-west-1-prod-bo-canal.akamaized.net/", "https://tv.netflux.fun:2083/tv/cnews/")
						else:
							if "dtd-pfsbo-nea-app-eu-west-1-prod-bo-canal.akamaized.net" in url:
								data_output["url"] = url.replace("https://dtd-pfsbo-nea-app-eu-west-1-prod-bo-canal.akamaized.net/", "https://tv.netflux.fun:2087/tv/cnews/")

						# On vérifie qu'on a bien tv.netflux.fun dans l'url
						if ("tv.netflux.fun" not in data_output["url"]):
							data_output["url"] = ""
							error = "Bad Link"
							# On envoie un message facebook
							message = "BUG Application TV : \n\n"
							message += "Impossibilité de mettre tv.netflux.fun dans le lien : \n\n"
							message += "\t- " + json_data["url"]
							facebookNotification(message)
	else:
		error = "Error status."

	return error, data_output



# Permet de récupérer tous les commentaires pour un media
def getC8URL():

	error = ""
	data_output = {}
	data_output["url"] = ""
	# On set le type de vidéo récupéré
	data_output["type"] = "application/x-mpegURL"

	r = requests.get("https://www.dailymotion.com/player/metadata/video/x5gv5rr")
	if r.status_code == 200:
		data = r.json()
		if "qualities" in data:
			if "auto" in data["qualities"]:
				if data["qualities"]["auto"]:
					data_output["url"] = data["qualities"]["auto"][0]["url"]
	else:
		error = "Error status."

	return error, data_output

