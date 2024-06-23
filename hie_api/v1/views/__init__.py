#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint


app_views = Blueprint("app_views", __name__, url_prefix="/hie_api/v1")
from hie_api.v1.views.doctor import *
from hie_api.v1.views.hospital import *
from hie_api.v1.views.patient import *
from hie_api.v1.views.validation import *
