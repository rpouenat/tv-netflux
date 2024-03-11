

# On fait une requete à cette URL sous réserve que le token soit toujours valide

# User agent à mettre : User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148

# curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVU0VSSUQ6ZXVyb3Nwb3J0OmVlYWRlNTcxLTQzOGYtNDUwNC1hMDJmLWIwYzc2ZGY2YWNmZSIsImp0aSI6InRva2VuLTFiYWExNmEwLWFkZTctNDU0NS05Y2YxLWZhM2UzMjg4MmY5NiIsImFub255bW91cyI6ZmFsc2UsImlhdCI6MTcxMDA5NTM4M30.mN2px4Zu_4QjwnC_L0E_O1080U0Wt4N6dkGIs2XOt8U" -d '{ "sourceSystemId" : "eurosport-e15341917c0ch3",  "deviceInfo" : {    "adBlocker" : false  }}' -H "Content-Type: application/json" -X POST https://eu3-prod.disco-api.com/playback/v3/videoPlaybackInfo