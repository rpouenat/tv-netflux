from marshmallow import fields
from .. import ma

# Ce que je retourne
class MovieToDownloadSchema(ma.SQLAlchemyAutoSchema):


    idMovie = fields.Int() # id du film
    id_imdb = fields.Int() # ID imdb du film
    username = fields.String() # Nom de l'utilisateur
    downloaded = fields.Int() # Permet de savoir si le film a été téléchargé
    date_release = fields.DateTime() # Date de sortie du film

movietodownload_schema = MovieToDownloadSchema()
movietodownloads_schema = MovieToDownloadSchema(many=True)
