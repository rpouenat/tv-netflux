from flask import Blueprint

api = Blueprint('api', __name__)

# Import any endpoints here to make them available
from .francetv import francetv
from .groupetf1 import groupetf1
from .arte import arte
