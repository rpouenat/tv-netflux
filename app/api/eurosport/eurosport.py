

# On fait une requete à cette URL sous réserve que le token soit toujours valide

# User agent à mettre : User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148

# curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVU0VSSUQ6ZXVyb3Nwb3J0OmVlYWRlNTcxLTQzOGYtNDUwNC1hMDJmLWIwYzc2ZGY2YWNmZSIsImp0aSI6InRva2VuLWZiNmRiYzc5LTUzMGEtNGM5OC05MzJiLTYyYjZmMGE0ZDFkZCIsImFub255bW91cyI6ZmFsc2UsImlhdCI6MTcxMDE2MzM1Mn0.t45-tK2OotOLWViUk7xYauFRd7G1rO3vaCfPq3iksM4" -d '{ "sourceSystemId" : "eurosport-e15341917c0ch3",  "deviceInfo" : {    "adBlocker" : false  }}' -H "Content-Type: application/json" -X POST https://eu3-prod.disco-api.com/playback/v3/videoPlaybackInfo



from flask import render_template, request, jsonify
from ..functions.functions import json_return, facebookNotification
import requests
from flask import current_app
from .. import api
from bs4 import BeautifulSoup
import time



# Permet de récupérer les chaînes en live d'eurosport
@api.route('/eurosport/livechannel', methods=['GET'])
def getLiveTV():

	error = ""
	data_output = []

	headers = {
		"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
	}

	# On fait une requête vers eurosport
	req = requests.get("https://www.eurosport.fr/watch/", headers=headers)

	if req.status_code == 200:
		soup = BeautifulSoup(req.text, 'html.parser')
		# On récupère les résultats 
		table_result = soup.findAll('a', {"class": "HybridCard card-hover card-hover relative mx-auto flex"})
		for link in table_result:
			# On récupère le nom de la chaine
			title = link.find('h3', {"class": "card-hover-underline"}).getText()
			# On récupère l'ID de la chaine
			id_channel = "eurosport-" + link['href'].split("/")[-2].split("-")[-1]

			data_output.append({
				"type_tv" : "eurosport", # On set le type de chaine (tnt, canal, etc ...)
				"name" : title, # On positionne le nom de la chaine
				"url" : id_channel, # On set son id
				"status" : 1 # On set la chaine active
			})


	# Si on a pas d'erreur 
	if not error:
		d = json_return("",200,data_output)
	else:
		d = json_return(error,400,"")

	return jsonify(d),200


# Permet de récupérer tous les commentaires pour un media
def getEurosportURL(chaine_name):

	error = ""
	data_output = {}
	data_output["url"] = ""
	# On set le type de vidéo récupéré
	data_output["type"] = "application/x-mpegURL"

	token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVU0VSSUQ6ZXVyb3Nwb3J0OmVlYWRlNTcxLTQzOGYtNDUwNC1hMDJmLWIwYzc2ZGY2YWNmZSIsImp0aSI6InRva2VuLWZiNmRiYzc5LTUzMGEtNGM5OC05MzJiLTYyYjZmMGE0ZDFkZCIsImFub255bW91cyI6ZmFsc2UsImlhdCI6MTcxMDE2MzM1Mn0.t45-tK2OotOLWViUk7xYauFRd7G1rO3vaCfPq3iksM4"

	# On set les bons headers
	headers = {
		"User-Agent": "EurosportNews/2402211605 CFNetwork/1492.0.1 Darwin/23.3.0",
		"x-disco-client": "IOS:17.3.1:escom:8.3.1",
		"Authorization": "Bearer " + token,
		"Accept-Language": "fr-FR,fr;q=0.9",
		"Accept-Encoding": "gzip, deflate"
	}

	data_json = { 
		"sourceSystemId" : chaine_name,  
		"deviceInfo" : {    
			"adBlocker" : False  
		}
	}

	max_try = 10
	i = 0

	# tant que notre url ne contient pas eurosport-
	while ("eurosport-" not in data_output["url"]) and (i < max_try):

		r = requests.post("https://eu3-prod.disco-api.com/playback/v3/videoPlaybackInfo", json=data_json, headers=headers)
		if r.status_code == 200:
			data_return = r.json()
			if "data" in data_return:
				if data_return["data"]:
					if "attributes" in data_return["data"]:
						if data_return["data"]["attributes"]:
							if "streaming" in data_return["data"]["attributes"]:
								if data_return["data"]["attributes"]["streaming"]:
									streams = data_return["data"]["attributes"]["streaming"]

									# On parcourt les streams jusqu'à trouver la bonne URL
									for stream in streams:
										if stream["type"] == "hls":
											# On récupère l'URL
											
											# https://dplus-eu-cloudfront.prod-live.h264.io/
											# https://eurosport-live-prod.akamai.prod-live.h264.io/

											url = stream["url"]

											if current_app.config.get('env') == "production":
												if "dplus-eu-cloudfront.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://dplus-eu-cloudfront.prod-live.h264.io/", "https://netflux.fun:2083/tv/eurosport/dplus-eu-cloudfront/")
												elif "eurosport-live-prod.akamai.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://eurosport-live-prod.akamai.prod-live.h264.io/", "https://netflux.fun:2083/tv/eurosport/eurosport-live-prod/")
												elif "eurosport-vod.akamai.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://eurosport-vod.akamai.prod-live.h264.io/", "https://netflux.fun:2083/tv/eurosport/eurosport-vod/")
											else:
												if "dplus-eu-cloudfront.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://dplus-eu-cloudfront.prod-live.h264.io/", "https://netflux.fun:2087/tv/eurosport/dplus-eu-cloudfront/")
												elif "eurosport-live-prod.akamai.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://eurosport-live-prod.akamai.prod-live.h264.io/", "https://netflux.fun:2087/tv/eurosport/eurosport-live-prod/")
												elif "eurosport-vod.akamai.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://eurosport-vod.akamai.prod-live.h264.io/", "https://netflux.fun:2087/tv/eurosport/eurosport-vod/")



											# On vérifie qu'on a bien netflux.fun dans l'url
											if ("netflux.fun" not in data_output["url"]):
												data_output["url"] = ""
												error = "Bad Link"
												# On envoie un message facebook
												message = "BUG Application TV : \n\n"
												message += "Impossibilité de mettre netflux.fun dans le lien : \n\n"
												message += "\t- " + stream["url"]
												facebookNotification(message)

											# On arrête la boucle
											break

			if ("eurosport-" not in data_output["url"]) and not error:
				# On reset l'url
				data_output["url"] = ""
				# On ajoute une tentative
				i += 1
				time.sleep(1)
		
				# https://netflux.fun:2087/tv/eurosport/eurosport-live-prod/index_3.m3u8



		else:
			error = "Error status."

	return error, data_output
