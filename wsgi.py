from app import create_app
from flask import request
import traceback
import requests
import base64
from datetime import datetime
import requests

app = create_app()

if __name__ == "__main__":
	app.run(debug=True)


# register the error handler
@app.errorhandler(Exception)
def handle_exception(e):
	# handleException(request)
	print("[+] ERROR")
	print(traceback.format_exc())
	f = open("/var/log/tv-netflux/error.log", "a")
	# {
	#   "type" : ""
	#   "application" : ""
	#   "title" : ""
	#   "comment" : ""
	# }

	now = datetime.now()
	date_info = now.strftime("%Y-%m-%d %H:%M:%S")
	# [2023-03-23 17:32:09,421] ERROR in app: Exception on /user/setcurrentmedia [POST]
	url = request.url.replace("http://localhost:8080", "").replace("https://netflux.fun:2083", "").replace("http://127.0.0.1:5000", "")
	
	string_error = "[" + date_info + "] ERROR in app: Exception on " + url + " [" + request.method + "]\n"
	string_error += "[" + date_info + "] Headers : " + str(request.headers) + "\n"
	string_error += "\n" + traceback.format_exc()
	f.write(string_error)
	f.close()


	data = {
		"type" : "system",
		"application" : "tv",
		"title" : "Crash de l'application TV",
		"comment" : string_error
	}
	
	# # A REFAIRE CAR PAS AUTORIZE, NECESSITE UN TOKEN JWT

	# machine = "192.168.1.32:5000"
	# r = requests.post("http://"+machine + "/admin/ticket/create", auth=HTTPBasicAuth("ronan", "mdp"), json=data)
	# print(r.status_code)
	# print(r.text)

	machine = "192.168.1.32:5000"

	# A REFAIRE NON AUTORISE, NECESSITE UN TOKEN JWT
	password_ssh = base64.b64decode("TW9ub3JkaW5hdGV1cg==").decode('utf-8').strip()
	# On se connecte au compte
	r = requests.post("http://"+machine + "/account/login", json={"account" : "ronan","password" : password_ssh})
	# Si on a le bon code retour
	if r.status_code == 200:
		if r.json()["code"] == 200:
			print(r.cookies.get_dict())
			# r = requests.get("http://"+machine + "/scan", cookies=r.cookies.get_dict())
			# print(r.status_code)
			# print(r.text)

			r = requests.post("http://"+machine + "/admin/ticket/create", headers={"X-CSRF-TOKEN" : r.cookies.get_dict().get('csrf_access_token')}, cookies=r.cookies.get_dict(), json=data)
			print(r.status_code)
			print(r.text)


