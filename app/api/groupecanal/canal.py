
from ..functions.functions import json_return
from .. import api
import requests
from flask import render_template, request, jsonify


# Permet de récupérer tous les commentaires pour un media
@api.route('/groupeCanal/Canal', methods=['GET'])
# Permet de récupérer tous les commentaires pour un media
def launchCanal():
	error = ""
	data_return = {}

	# https://secure-webtv-static.canal-plus.com/metadata/cpfra/FR/all/v2.2/globalchannels.json

	# On charge la page contenant tous les liens vers les boutons
	url = "https://hodor.canalplus.pro/api/v2/mycanal/authenticate.json/iphone/6.0?featureToggles=showcasev5&appLocation=FR&collectUserData=1&isAuthenticated=1&language=fr-FR&macros=ALD_CNL%2CALD_CP%2CALD_CS%2CALD_TVGRAT%2COFFER%2CSERVICES%2CTV_CP&micros=ALD_CNL%3A%5BRALD_CNL_ACC_TV%5D%2CALD_CP%3A%5B%5D%2CALD_CS%3A%5BRALD_CS_ACC_TV%2CR_N_PANO%2CRGCMD%2CRBOR%2CRESP%2CRGPOL%2CRGCI%2CRGPWI%2CRGPLA%2CRGPLAE%2CRGPLCI%2CRGTLT%2CRGOCS%2CRBEI%2CRGSEA%2CRC8%2CRCST%2CRGOLY%2CRCNW%2CRIFS%2CRCPS%2CRALD_CP_ACC_TV%2CRBFM%2CRCPFT%2CRCPFC%2CRGCPP%2CRGCPC%2CRGCPE%2CRGPAP%2CRPUS%2CRGCPST%2CRGCPK%2CRGCPG%2CRGCPD%2CRCPPC%2CRCPEC%2CRCPSTC%2CRCPGC%2CRCBC%2CRCPDC%2CRCPKC%2CRGCB%2CRDAZ%5D%2CALD_TVGRAT%3A%5BRALD_TNT_GRAT%2CRGLI%2CRTF1%2CRHD1%2CRNT1%2CRTMC%2CRM6%2CRW9%2CR6TER%2CRART%2CRMCD%2CRFR2%2CRFR3%2CRFR4%2CRFR5%2CRMCS%2CROKO%2CRFTV%2CRSLA%2CRCBX%2CRNRJ%2CRCHR%2CRFR24%2CREQP%5D%2CAPP_PARTNER%3A%5BMAUG%5D%2CCATCHUP%3A%5B-1%5D%2CCPL_INF%3A%5BRCPL_TVOD%2CRFPL%5D%2CEAD_TR%3A%5B-1%5D%2CLIVE%3A%5B-1%5D%2CL_GRAT%3A%5B-1%5D%2CMYCANAL%3A%5BRMC_FLX2%2CRMC_D2G%2CRMC_TV%2CRMC_DEV10%5D%2COFFER%3A%5BOSE%2CO_ABO%2CCP%2CTV%2CBEIN%2CNNO%2CCPSP%2CLDC%2CPDE%2CALDC%5D%2CPARTNER%3A%5BCAN%5D%2CPRESSE%3A%5BMIDIO%2CPRSMA%5D%2CSERVICES%3A%5BRMULTI_ECR_CP%2CRMULTI_ECR_CS%2CU_CNL%5D%2CTV_CP%3A%5B%5D%2CTV_CS%3A%5B-1%5D%2CVOD%3A%5B-1%5D%2CV_GRAT%3A%5B-1%5D%2CZONE%3A%5B%5D&offerZone=cpfra&pdsNormal=%5B19%2C26%2C30%2C47%2C64%2C83%2C101%2C154%2C177%2C228%2C252%2C259%2C289%2C296%2C301%2C310%2C311%2C312%2C313%2C324%2C362%2C378%2C381%2C384%2C436%2C440%2C450%2C451%2C480%2C481%2C513%2C516%2C520%2C521%2C526%2C543%2C544%2C545%2C549%2C551%2C553%2C554%2C562%2C563%2C564%2C565%2C566%2C567%2C568%2C570%2C571%2C584%2C589%2C595%2C596%2C597%2C598%2C599%2C603%2C604%2C605%2C632%2C633%2C635%2C636%2C637%2C638%2C645%2C650%2C651%2C652%2C653%2C654%2C670%2C675%2C696%2C726%2C728%2C815%2C816%2C823%2C824%2C872%2C894%2C899%2C900%2C920%2C921%2C922%2C923%2C924%2C925%2C926%2C927%2C928%2C929%2C930%2C931%2C932%2C933%2C934%2C935%2C936%2C937%2C938%2C939%2C940%2C941%2C942%2C943%2C970%2C971%2C972%2C973%2C974%2C975%2C998%2C1051%2C1067%2C1068%2C1069%2C1070%2C1071%2C1074%2C1076%2C1077%2C1079%2C1080%2C1092%2C1093%2C21120%5D"
	r = requests.get(url)

	if r.status_code == 200:

		if "arborescence" in r.json():
			# On parcourt les données
			for data in r.json()["arborescence"]:
				if data["onClick"]["path"] == "/live/":
					
					request_all_programm = requests.get(data["onClick"]["URLPage"])
					if request_all_programm.status_code == 200:
						if "rubriques" in request_all_programm.json():
							# On parcourt les rubriques
							for rubrique in request_all_programm.json()["rubriques"]:
								if rubrique["displayName"] == "Toutes les chaînes":
									# On fait la requete pour toutes les chaines
									request_all_chaine = requests.get(rubrique["URLPage"])
									if request_all_chaine.status_code == 200:
										if "channels" in request_all_chaine.json():
											data_return = request_all_chaine.json()["channels"]

									# On stop la boucle
									break


					# On stop la boucle
					break

	# Si on a pas d'erreur 
	if not error and data_return:
		d = json_return("",200,data_return)
	else:
		d = json_return(error,400,"")

	return jsonify(d),200
