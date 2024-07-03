#!/usr/bin/python3
""" Flask Application for CONNECTED CARE Restful API """

from hie_models import storage
from hie_api.v1.views import app_views
from os import environ
from flask import Flask, make_response, jsonify, session
from flask_cors import CORS
from flasgger import Swagger
from flasgger.utils import swag_from
from datetime import timedelta

app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
app.config["SECRET_KEY"] = "CONNECTED_CARE"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30000)
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True

app.register_blueprint(app_views)
CORS(app, supports_credentials=True, resources={r"/hie_api/v1/*": {"origins": "*"}})

@app.teardown_appcontext
def close_db(error):
    """
    Close the storage session.
    
    Args:
        error (Exception): The exception that caused the teardown, if any.
    """
    storage.close()

@app.errorhandler(404)
def not_found(error):
    """
    Handle 404 errors with Swagger documentation.
    
    ---
    responses:
      404:
        description: A resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)

@app.before_request
def make_session_permanent():
    """
    Set the session to be permanent before each request.
    This ensures that the session lifetime is extended to the configured duration.
    """
    print(f'Before {session}')
    session.permanent = True

@app.after_request
def after(response):
    print(f'After {session}')
    return response

app.config['SWAGGER'] = {
    'title': 'CONNECTED CARE Restful API',
    'uiversion': 3
}

Swagger(app)

if __name__ == "__main__":
    """ Main Function """
    host = environ.get('HIE_API_HOST', '0.0.0.0')
    port = environ.get('HIE_API_PORT', '5001')
    app.run(host=host, port=port, threaded=True, debug=True)
