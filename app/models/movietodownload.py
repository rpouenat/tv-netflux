from .. import db

class MovieToDownload(db.Model):

    idMovie = db.Column(db.Integer, primary_key=True) # id du film
    id_imdb = db.Column(db.Integer, nullable=False) # ID imdb du film
    downloaded = db.Column(db.Integer, nullable=False) # Permet de savoir si le film a été téléchargé
    date_release = db.Column(db.DateTime, nullable=True) # Date de sortie du média