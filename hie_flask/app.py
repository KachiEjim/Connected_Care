#!/usr/bin/python3

from flask import Flask, render_template, request, redirect, url_for, flash
from hie_models import storage
from hie_models.patient import Patient
from hie_flask import app_views

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)

@app.route('/', strict_slashes=False)
def landing_page():
    """ Displays the landing page """
    return render_template('landing_page.html')




if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000, debug=True)
