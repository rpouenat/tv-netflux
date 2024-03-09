
from flask import render_template, request, jsonify
from ..functions.functions import json_return, facebookNotification
import requests
from .. import api


# Permet de récupérer tous les commentaires pour un media
@api.route('/arte', methods=['GET'])
def getArteURL():

	error = ""
	data_output = {}
	data_output["url"] = ""
	# On set le type de vidéo récupéré
	data_output["type"] = "application/x-mpegURL"

	r = requests.get("https://api.arte.tv/api/player/v2/config/fr/LIVE")
	if r.status_code == 200:
		# On récupère l'URL
		# print(r.json()["data"])

		# On parcourt les stream
		for stream in r.json()["data"]["attributes"]["streams"]:
			if stream["versions"][0]["code"] == "liveFR":
				data_output["url"] = stream["url"]
				break

	else:
		error = "Error status."

	# Si on a pas d'erreur 
	if not error and data_output["url"]:
		d = json_return("",200,data_output)
	else:
		d = json_return(error,400,"")

	return jsonify(d),200

