from flask import Blueprint

api = Blueprint('api', __name__)

# Import any endpoints here to make them available
from . import main
from .eurosport import eurosport
from .test_drm import sample
from .groupem6 import m6