
from flask import render_template, request, jsonify
from ..functions.functions import json_return, facebookNotification
import requests


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

