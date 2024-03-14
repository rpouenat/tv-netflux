from .. import api
import time
from flask import render_template, request, jsonify
from flask import Response
import base64
import requests
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

# Permet de récupérer tous les commentaires pour un media
@api.route('/m6/license', methods=['OPTIONS'])
def getM6OptionsLicense():

	# Date: Wed, 13 Mar 2024 16:54:03 GMT
	# Content-Length: 0
	# Connection: close
	# X-AxDRM-Identity: Axinom DRM - Widevine API
	# X-AxDRM-Version: 6.24.1
	# X-AxDRM-Server: widevine-testing-68f88bb687-57q4v
	# Access-Control-Allow-Origin: *
	# Access-Control-Expose-Headers: X-AxDrm-ErrorMessage,X-AxDRM-Message,X-AxDRM-Identity,X-AxDRM-Server,X-AxDRM-Version,X-Powered-By,WWW-Authenticate
	# Access-Control-Allow-Headers: Content-Type, X-AxDRM-Message
	# Access-Control-Allow-Methods: POST
	# Access-Control-Max-Age: 86400
	# Strict-Transport-Security: max-age=15724800; includeSubDomains
	resp = Response("")
	return resp

# Permet de récupérer tous les commentaires pour un media
@api.route('/m6/license', methods=['POST'])
def getM6POSTLICENCE():

	proxies = { 
      "http"  : "http://127.0.0.1:8082", 
      "https" : "http://127.0.0.1:8082"
    }


	input_data = request.get_data(parse_form_data=True)
	print(input_data)

	# license = ""

	if input_data == bytes(b'\x08\x04'):

		req = requests.get("https://lic.drmtoday.com/license-server-fairplay/cert/m6", proxies=proxies, verify=False)
		print(req.status_code)
		print(req.content)
		license = req.content

	else:

		headers = {
			"x-dt-auth-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcHREYXRhIjoie1widXNlcklkXCI6XCIyMDZhMmJkNDE2MTU0ZWNkYTk4ZTYwOGNiNmQ3MzU4YlwiLFwibWVyY2hhbnRcIjpcIm02XCIsXCJzZXNzaW9uSWRcIjpcIjZwbGF5XCJ9IiwiY3J0IjoiW3tcImFjY291bnRpbmdJZFwiOlwiXCIsXCJhc3NldElkXCI6XCJobHNmcF9NNlwiLFwicHJvZmlsZVwiOntcInB1cmNoYXNlXCI6e319LFwib3V0cHV0UHJvdGVjdGlvblwiOntcImRpZ2l0YWxcIjpmYWxzZSxcImFuYWxvZ3VlXCI6ZmFsc2UsXCJlbmZvcmNlXCI6ZmFsc2V9LFwib3BcIjp7XCJjb25maWdcIjp7XCJIRFwiOntcIlBsYXlSZWFkeVwiOntcIm1pblNMXCI6MzAwMCxcImFuYWxvZ1ZpZGVvT1BMXCI6MTUwLFwiY29tcHJlc3NlZERpZ2l0YWxWaWRlb09QTFwiOjUwMCxcInVuY29tcHJlc3NlZERpZ2l0YWxWaWRlb09QTFwiOjMwMH0sXCJXaWRldmluZU1cIjp7XCJtaW5TTFwiOjUsXCJyZXF1aXJlSERDUFwiOlwiSERDUF9WMVwifX0sXCJTRFwiOntcIlBsYXlSZWFkeVwiOntcIm1pblNMXCI6MjAwMCxcImFuYWxvZ1ZpZGVvT1BMXCI6MTAwLFwiY29tcHJlc3NlZERpZ2l0YWxWaWRlb09QTFwiOjUwMCxcInVuY29tcHJlc3NlZERpZ2l0YWxWaWRlb09QTFwiOjI1MH0sXCJXaWRldmluZU1cIjp7XCJtaW5TTFwiOjEsXCJyZXF1aXJlSERDUFwiOlwiSERDUF9OT05FXCJ9fSxcIlZJREVPX0FVRElPXCI6e1wiUGxheVJlYWR5XCI6e1wibWluU0xcIjoyMDAwLFwiYW5hbG9nVmlkZW9PUExcIjoxMDAsXCJjb21wcmVzc2VkRGlnaXRhbFZpZGVvT1BMXCI6NTAwLFwidW5jb21wcmVzc2VkRGlnaXRhbFZpZGVvT1BMXCI6MjUwfSxcIldpZGV2aW5lTVwiOntcIm1pblNMXCI6MSxcInJlcXVpcmVIRENQXCI6XCJIRENQX05PTkVcIn19fX19XSIsImlhdCI6MTcxMDQwMzk3OCwianRpIjoiYWppRmlWaUxCM3RLbFdFWVlXZnR5Zz09In0.kWG1RIGY8G8DJVIRE5nZRAQ3chqcxohFiw3ULwrjpyfYlsjQIKU6BN8inkCh1MdXCnX3ezwjTTLdklneIAeqEg"
		}


		print(input_data)
		req = requests.get("https://lic.drmtoday.com/license-server-fairplay/", data=data, proxies=proxies, verify=False, headers=headers)
		print(req.status_code)
		print(req.content)
		license = req.content



	# resp = Response(base64.b64decode(license), mimetype='application/octet-stream')
	resp = Response(license, mimetype='application/octet-stream')
	resp.headers['Content-Type'] = 'application/octet-stream'
	resp.headers['X-AxDRM-Server'] = 'widevine-testing-68f88bb687-57q4v'
	resp.headers['Access-Control-Allow-Origin'] = '*'

	

	return resp








