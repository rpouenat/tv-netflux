from .. import db

class TvShowToDownload(db.Model):

    idTvShow = db.Column(db.Integer, primary_key=True) # id de la série
    id_imdb = db.Column(db.Integer, nullable=False) # ID imdb de la série
    current_season = db.Column(db.Integer, nullable=True) # Saison en cours
    current_episode = db.Column(db.Integer, nullable=True) # Episode en cours
    downloaded = db.Column(db.Integer, nullable=True) # Permet de savoir si l'épisode a été téléchargé ou non