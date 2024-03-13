
from flask import render_template, request, jsonify
from ..functions.functions import json_return, facebookNotification
import requests


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
						data_output["url"] = data["adswitched"][0]["src"]
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

