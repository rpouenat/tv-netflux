
from . import api
import time
from flask import render_template, request, jsonify
from .functions.functions import json_return, facebookNotification
from .groupetf1.groupetf1 import getUrlGroupeTF1
from .francetv.francetv import getUrlFranceTV
from .arte.arte import getArteURL
from .eurosport.eurosport import getEurosportURL
from .canal.canal import getC8URL, getCNewsURL



# Permet de récupérer tous les commentaires pour un media
@api.route('/tv/<string:chaine_name>', methods=['GET'])
def getTVURL(chaine_name):

	error = ""
	data_output = {}
	data_output["url"] = ""
	start = time.time()

	# Si la chaine appartient au groupe tf1
	if chaine_name in [ "tf1", "tmc", "tfx", "lci", "tf1sf" ]:
		error, data_output = getUrlGroupeTF1(chaine_name)

	# Chaine du groupe france télévision
	elif chaine_name in [ "france-2", "france-3", "france-4", "france-5", "franceinfo" ]:
		error, data_output = getUrlFranceTV(chaine_name)

	# Arte
	elif chaine_name == "arte":
		error, data_output = getArteURL()

	# C8
	elif chaine_name == "c8":
		error, data_output = getC8URL()

	# C8
	elif chaine_name == "cnews":
		error, data_output = getCNewsURL()

	# Eurosport
	elif "eurosport" in chaine_name:
		error, data_output = getEurosportURL(chaine_name)

	# Tout tout autre chaine
	else:
		error = "Unknown TV"

	end = time.time()
	time_exec = end - start
	data_output["time_exec"] = time_exec
	print("[+] Temps : " + str(time_exec))


	# Si on a pas d'erreur 
	if not error and data_output["url"]:
		d = json_return("",200,data_output)
	else:
		d = json_return(error,400,"")

	return jsonify(d),200