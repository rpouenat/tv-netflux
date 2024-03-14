from flask import Flask
import json
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from flask_cors import CORS


# from flask_bcrypt import Bcrypt
import os

db = SQLAlchemy()
ma = Marshmallow()


# Permet de récupérer la configuration
def getConf():
    with open(os.path.dirname(os.path.realpath(__file__)) + '/conf/config.json') as json_file:
        data = json.load(json_file)
        return data

def create_app():
    app = Flask(__name__)
    CORS(app)

    # On positionne la configuration de l'application
    configuration = getConf()
    for conf in configuration:
        app.config[conf] = configuration[conf]

    db.init_app(app)
    ma.init_app(app)
    # bcrypt.init_app(app)

    if os.environ.get('debug','') != '':
        app.debug = debug

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint)

    with app.app_context():
        # db.drop_all() # a enlever
        db.create_all()

    return app
