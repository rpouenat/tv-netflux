from flask import current_app
import json
import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
# import simplejson


def json_return(error,code,data):
	d = {
		"error": error,
		"code": code,
		"data": data
	}
	return d



# Permet de notifier l'administrateur de la demande de film
def facebookNotification(string):
	headers={
		'Content-Type': 'application/json'
	}
	data = {
		"messaging_type": "MESSAGE_TAG", 
		"tag": "POST_PURCHASE_UPDATE",
		"recipient": {"id": "3945100138839605"},
		"message": {"text": string}
	}
	url_send_notification = current_app.config.get('facebook')['url_facebook'] + "access_token=" + current_app.config.get('facebook')['access_token']
	r = requests.post(url_send_notification,json=data, headers=headers)

