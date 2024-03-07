

# On installe python
sudo apt-get install -y python3
# On install pip
sudo apt-get install -y python3-pip
sudo apt-get install -y python3-venv
# On install virtualenv
pip3 install virtualenv
# On initialise un environnnement virtuel
python3 -m venv venv
# On se positionne dans l'environnement
source venv/bin/activate
# On installe les paquets nécessaires
pip install -r requirements.txt
deactivate

sudo mkdir /var/log/tv-netflux
sudo chmod 777 /var/log/tv-netflux

echo "[Unit]" > /etc/systemd/system/tv-netflux.service
echo "Description=Gunicorn instance to serve api-torrent" >> /etc/systemd/system/tv-netflux.service
echo "After=network.target" >> /etc/systemd/system/tv-netflux.service
echo "" >> /etc/systemd/system/tv-netflux.service
echo "[Service]" >> /etc/systemd/system/tv-netflux.service
echo "User=download" >> /etc/systemd/system/tv-netflux.service
echo "Group=www-data" >> /etc/systemd/system/tv-netflux.service
echo "WorkingDirectory=/home/download/Scripts/tv-netflux" >> /etc/systemd/system/tv-netflux.service
echo "ExecStart=/home/download/Scripts/tv-netflux/venv/bin/gunicorn --preload --workers 12 --bind 0.0.0.0:5001 -m 007 wsgi:app --access-logfile /var/log/tv-netflux/access.log --error-logfile /var/log/tv-netflux/error.log --timeout 18000" >> /etc/systemd/system/tv-netflux.service
echo "" >> /etc/systemd/system/tv-netflux.service
echo "[Install]" >> /etc/systemd/system/tv-netflux.service
echo "WantedBy=multi-user.target" >> /etc/systemd/system/tv-netflux.service

sudo systemctl daemon-reload
sudo systemctl start tv-netflux
sudo systemctl enable tv-netflux

sudo systemctl status tv-netflux

echo "Environment=\"PATH=/home/download/Scripts/tv-netflux/venv/bin:\$PATH\"" >> /etc/systemd/system/tv-netflux.service



echo "alias updatetv-netflux='cd ~/Scripts/tv-netflux ; git pull ; sudo service tv-netflux restart'" >> ~/.bashrc ; source ~/.bashrc



DEBUG :

	Conf: 

		"flareSolverr": [ 
		        {
		            "ip": "192.168.1.24",
		            "password": "Monordinateur",
		            "url": "http://127.0.0.1:8191",
		            "username": "download"
		        }
		    ],


	main.py :

		headers  = ' --user-agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36" -H "cookie: account_created=true; v9_promo_details=eyJjb3VudGRvd25fZGF0ZSI6IjA3LzI4LzIwMjMgMjM6NTk6NTkiLCJ0cyI6MTY5MDU4MTU5OX0=; hide_side_menu=true; cf_clearance=1OXWDK2fjaNq.ADF6yMeOvmgTcJET5VhlC6uXCZVzTs-1690824979-0-160.0.0; ygg_=gu71s5qbap19ecrg7b9445er8j7tg44h "'
		docker = True
		proxies = {}
		ssh = None




