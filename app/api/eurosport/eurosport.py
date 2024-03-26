

# On fait une requete à cette URL sous réserve que le token soit toujours valide

# User agent à mettre : User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148

# curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVU0VSSUQ6ZXVyb3Nwb3J0OmVlYWRlNTcxLTQzOGYtNDUwNC1hMDJmLWIwYzc2ZGY2YWNmZSIsImp0aSI6InRva2VuLWZiNmRiYzc5LTUzMGEtNGM5OC05MzJiLTYyYjZmMGE0ZDFkZCIsImFub255bW91cyI6ZmFsc2UsImlhdCI6MTcxMDE2MzM1Mn0.t45-tK2OotOLWViUk7xYauFRd7G1rO3vaCfPq3iksM4" -d '{ "sourceSystemId" : "eurosport-e15341917c0ch3",  "deviceInfo" : {    "adBlocker" : false  }}' -H "Content-Type: application/json" -X POST https://eu3-prod.disco-api.com/playback/v3/videoPlaybackInfo



from flask import render_template, request, jsonify
from ..functions.functions import json_return, facebookNotification
import requests
from flask import current_app
from .. import api
from bs4 import BeautifulSoup
from datetime import datetime
import base64
import time



# Permet de récupérer les chaînes en live d'eurosport
@api.route('/eurosport/livechannel', methods=['GET'])
def getLiveTV():

	# https://i.eurosport.com/taiga/Specifique/Crop/16_9/3_3_15327465_20240318-101508.jpeg
	# https://i.eurosport.com/taiga/Specifique/Crop/3_4/3_3_15327465_20240318-101508.jpeg

	error = ""

	date_now = datetime.now()
	year = date_now.year
	month = date_now.month
	day = date_now.day

	headers = {
		'Host' : 'netsport.eurosport.io',
		'Accept' : '*/*',
		'apollographql-client-version' : '8.3.1-2402211605',
		'x-device' : 'MOBILE',
		'domain' : 'www.eurosport.fr+mobile',
		'Accept-Language' : 'fr-FR,fr;q=0.9',
		'Accept-Encoding' : 'gzip, deflate',
		'Content-Type' : 'application/json',
		'X-APOLLO-OPERATION-ID' : 'a59a5be2ea13e2055a5dc9c13c44635c942d27bd521eb3b44c52379eafb746dd',
		'X-APOLLO-OPERATION-TYPE' : 'query',
		'premium-country-code' : 'FR',
		'apollographql-client-name' : 'com.eurosport.EurosportNews-apollo-ios',
		'User-Agent' : 'EurosportNews/2402211605 CFNetwork/1492.0.1 Darwin/23.3.0',
		'Connection' : 'close',
		'x-insert-ads' : 'true',
		'X-APOLLO-OPERATION-NAME' : 'ProgramsAt'
	}

	url = "https://netsport.eurosport.io/?extensions=%7B%22persistedQuery%22:%7B%22sha256Hash%22:%22a59a5be2ea13e2055a5dc9c13c44635c942d27bd521eb3b44c52379eafb746dd%22,%22version%22:1%7D%7D&operationName=ProgramsAt&variables=%7B%22date%22:%22" + str(year) + "-" + str('%02d' % month) + "-"+str('%02d' % (int(day) - 1))+"T23:00:00.000Z%22,%22first%22:30,%22includesOnAirPrograms%22:true%7D"

	r = requests.get(url, headers=headers)
	# print(r.text)

	if r.status_code == 200:
		data_json = r.json()
		if "data" in data_json:
			if "programsByDate" in data_json["data"]:
				if "edges" in data_json["data"]["programsByDate"]:

					# On retourne la liste des replays
					data_output = data_json["data"]["programsByDate"]["edges"]

				else:
					error = "No edges"

			else:
				error = "No programsByDate"

		else:
			error = "No data."
	else:
		error = "Can't connect"

	# # error = ""
	# # data_output = []

	# # headers = {
	# # 	"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
	# # }

	# # # On fait une requête vers eurosport
	# # req = requests.get("https://www.eurosport.fr/watch/", headers=headers)

	# # if req.status_code == 200:
	# # 	soup = BeautifulSoup(req.text, 'html.parser')
	# # 	# On récupère les résultats 

	# # 	list_data = soup.find('div', {"class": "sliderTray___-vHFQ sliderAnimation___300FY carousel__slider-tray carousel__slider-tray--horizontal"})

	# # 	# print(list_data)

	# # 	caroussel = list_data.findAll('div', {"class": "slideInner___2mfX9 carousel__inner-slide"})

	# # 	for card in caroussel:

	# # 		# print(card)

	# # 		min_title = None
	# # 		data_min_title = card.find('div', {"class": "font-bold caps-s7-fx lines-1 text-onDark-03"})
	# # 		if data_min_title:
	# # 			min_title = data_min_title.getText()

	# # 		title = None
	# # 		data_title = card.find('h3', {"class": "card-hover-underline"})
	# # 		if data_title:
	# # 			title = data_title.getText()


	# # 		sub_title = None
	# # 		data_sub_title = card.find('p', {"class": "caption-s4-fx lines-1 text-onDark-05"})
	# # 		if data_sub_title:
	# # 			sub_title = data_sub_title.getText()


	# # 		id_channel = None
	# # 		link = card.find('a', {"class": "HybridCard card-hover card-hover relative mx-auto flex"})
	# # 		if link:
	# # 			id_channel = "eurosport-" + link['href'].split("/")[-2].split("-")[-1]

	# # 		progress = card.find('span', {"data-testid": "atom-progress-bar-inside"})
	# # 		if progress:
	# # 			progress = progress["style"].split(":")[1].replace("%","")
	# # 		else:
	# # 			progress = 0

	# # 		# On récupère les images
	# # 		img = card.find('source')
	# # 		if img:
	# # 			img = img.get("srcset")
	# # 			if img:
	# # 				# img = img.replace("https://imgresizer.eurosport.com/", "https://netflux.fun:2087/tv/eurosport/img/")
	# # 				# On récupère l'image en base64
	# # 				response = requests.get(img)
	# # 				img = base64.b64encode(response.content).decode('utf-8')

	# # 	# table_result = soup.findAll('a', {"class": "HybridCard card-hover card-hover relative mx-auto flex"})
	# # 	# for link in table_result:
	# # 	# 	# On récupère le nom de la chaine
	# # 	# 	title = link.find('h3', {"class": "card-hover-underline"}).getText()
	# # 	# 	# On récupère l'ID de la chaine
	# # 	# 	id_channel = "eurosport-" + link['href'].split("/")[-2].split("-")[-1]

	# 		data_output.append({
	# 			"type_tv" : "eurosport", # On set le type de chaine (tnt, canal, etc ...)
	# 			"min_title" : min_title,
	# 			"sub_title" : sub_title,
	# 			"progress": progress,
	# 			"name" : title, # On positionne le nom de la chaine
	# 			"url" : id_channel, # On set son id
	# 			"img": img,
	# 			"status" : 1 # On set la chaine active
	# 		})


	# Si on a pas d'erreur 
	if not error:
		d = json_return("",200,data_output)
	else:
		d = json_return(error,400,"")

	return jsonify(d),200


# Permet de récupérer les chaînes en live d'eurosport
@api.route('/eurosport/replay/', methods=['POST'])
def getEurosportReplay():

	# curl --header "Content-Type: application/json" --request POST --data '{"year":"2024","month":"03","day":"16"}' http://localhost:5001/eurosport/replay/

	# Si on a bien toutes les données
	datas = request.get_json()
	error = ""
	data_output = {}

	# Si on a des données
	if datas:
		year = datas.get('year',None)
		month = datas.get('month',None)
		day = datas.get('day',None)

		if (year is not None) and (month is not None) and (day is not None):

			headers = {
				'Host' : 'netsport.eurosport.io',
				'Accept' : '*/*',
				'apollographql-client-version' : '8.3.1-2402211605',
				'x-device' : 'MOBILE',
				'domain' : 'www.eurosport.fr+mobile',
				'Accept-Language' : 'fr-FR,fr;q=0.9',
				'Accept-Encoding' : 'gzip, deflate',
				'Content-Type' : 'application/json',
				'X-APOLLO-OPERATION-ID' : 'a59a5be2ea13e2055a5dc9c13c44635c942d27bd521eb3b44c52379eafb746dd',
				'X-APOLLO-OPERATION-TYPE' : 'query',
				'premium-country-code' : 'FR',
				'apollographql-client-name' : 'com.eurosport.EurosportNews-apollo-ios',
				'User-Agent' : 'EurosportNews/2402211605 CFNetwork/1492.0.1 Darwin/23.3.0',
				'Connection' : 'close',
				'x-insert-ads' : 'true',
				'X-APOLLO-OPERATION-NAME' : 'ProgramsAt'
			}

			url = "https://netsport.eurosport.io/?extensions=%7B%22persistedQuery%22:%7B%22sha256Hash%22:%22a59a5be2ea13e2055a5dc9c13c44635c942d27bd521eb3b44c52379eafb746dd%22,%22version%22:1%7D%7D&operationName=ProgramsAt&variables=%7B%22date%22:%22" + str(year) + "-" + str(month) + "-"+str(int(day) - 1)+"T23:00:00.000Z%22,%22first%22:30,%22includesOnAirPrograms%22:false%7D"

			r = requests.get(url, headers=headers)

			if r.status_code == 200:
				data_json = r.json()
				if "data" in data_json:
					if "programsByDate" in data_json["data"]:
						if "edges" in data_json["data"]["programsByDate"]:

							# On retourne la liste des replays
							data_output = data_json["data"]["programsByDate"]["edges"]

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
	while ("eurosport-" not in data_output["url"]) and (i < max_try) and not error:
		# print("[+] Try : " + str(i))

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
										# print(stream)
										if stream["type"] == "hls":
											# On récupère l'URL
											
											# https://dplus-eu-cloudfront.prod-live.h264.io/
											# https://eurosport-live-prod.akamai.prod-live.h264.io/

											url = stream["url"]
											data_output["url"] = url

											if current_app.config.get('env') == "production":
												if "dplus-eu-cloudfront.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://dplus-eu-cloudfront.prod-live.h264.io/", "https://tv.netflux.fun:2083/tv/eurosport/dplus-eu-cloudfront/")
												elif "eurosport-live-prod.akamai.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://eurosport-live-prod.akamai.prod-live.h264.io/", "https://tv.netflux.fun:2083/tv/eurosport/eurosport-live-prod/")
												elif "eurosport-vod.akamai.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://eurosport-vod.akamai.prod-live.h264.io/", "https://tv.netflux.fun:2083/tv/eurosport/eurosport-vod/")
											else:
												if "dplus-eu-cloudfront.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://dplus-eu-cloudfront.prod-live.h264.io/", "https://tv.netflux.fun:2087/tv/eurosport/dplus-eu-cloudfront/")
												elif "eurosport-live-prod.akamai.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://eurosport-live-prod.akamai.prod-live.h264.io/", "https://tv.netflux.fun:2087/tv/eurosport/eurosport-live-prod/")
												elif "eurosport-vod.akamai.prod-live.h264.io" in url:
													data_output["url"] = url.replace("https://eurosport-vod.akamai.prod-live.h264.io/", "https://tv.netflux.fun:2087/tv/eurosport/eurosport-vod/")



											# On vérifie qu'on a bien tv.netflux.fun dans l'url
											if ("tv.netflux.fun" not in data_output["url"]):
												data_output["url"] = ""
												error = "Bad Link"
												# On envoie un message facebook
												message = "BUG Application TV : \n\n"
												message += "Impossibilité de mettre tv.netflux.fun dans le lien : \n\n"
												message += "\t- " + stream["url"]
												facebookNotification(message)

											# On arrête la boucle
											break

			# print(error)
			if ("eurosport-" not in data_output["url"]) and not error:
				# On reset l'url
				data_output["url"] = ""
				# On ajoute une tentative
				i += 1
				time.sleep(1)
		
				# https://tv.netflux.fun:2087/tv/eurosport/eurosport-live-prod/index_3.m3u8



		else:
			# print(r.status_code)
			# print(r.text)
			error = "Error status."

	return error, data_output
