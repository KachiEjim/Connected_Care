#!/usr/bin/python3
from flask import Flask, render_template, request, redirect, url_for, flash
from hie_models import storage
from hie_models.patient import Patient

from hie_flask.patient import patient_bp

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config["SECRET_KEY"] = "CONNECTED_CARE"

app.register_blueprint(patient_bp)

@app.route('/', strict_slashes=False)
def landing_page():
    """ Displays the landing page """
    return render_template('landing_page_html/index.html')

@app.route('/about', strict_slashes=False)
def about_page():
    """ Displays the landing page """
    return render_template('landing_page_html/about_us.html')

@app.route('/features', strict_slashes=False)
def features_page():
    """ Displays the landing page """
    return render_template('landing_page_html/features.html')

@app.route('/t', strict_slashes=False)
def test():
    """ Displays the landing page """
    return render_template('patient_html/signup.html')


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000, debug=True)
