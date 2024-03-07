from .. import db

class SportsToDownload(db.Model):

    idYgg = db.Column(db.Integer, primary_key=True) # id du film
    downloaded = db.Column(db.Integer, nullable=False) # Permet de savoir si le sport a été téléchargé