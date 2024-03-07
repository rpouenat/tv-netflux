from marshmallow import fields
from .. import ma

# Ce que je retourne
class SportsToDownloadSchema(ma.SQLAlchemyAutoSchema):

    idYgg = fields.Int() # id du film
    downloaded = fields.Int() # Permet de savoir si le sport a été téléchargé

sportstodownload_schema = SportsToDownloadSchema()
sportstodownloads_schema = SportsToDownloadSchema(many=True)