from app import create_app
from flask import request
import traceback
import requests
from datetime import datetime
from requests.auth import HTTPBasicAuth
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

    data = {
        "type" : "system",
        "application" : "tv",
        "title" : "Crash de l'application TV",
        "comment" : string_error
    }

    # A REFAIRE CAR PAS AUTORIZE, NECESSITE UN TOKEN JWT

    machine = "192.168.1.32:5000"
    r = requests.post("http://"+machine + "/admin/ticket/create", auth=HTTPBasicAuth("ronan", "mdp"), json=data)
    print(r.status_code)
    print(r.text)




