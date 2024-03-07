from marshmallow import fields
from .. import ma

# Ce que je retourne
class TvshowToDownloadSchema(ma.SQLAlchemyAutoSchema):

    idTvShow = fields.Int() # id de la série
    id_imdb = fields.Int() # ID imdb de la série
    current_season = fields.Int() # Saison en cours
    current_episode = fields.Int() # Episode en cours
    downloaded = fields.Int() # Permet de savoir si l'épisode a été téléchargé ou non

tvshowtodownload_schema = TvshowToDownloadSchema()
tvshowtodownloads_schema = TvshowToDownloadSchema(many=True)
