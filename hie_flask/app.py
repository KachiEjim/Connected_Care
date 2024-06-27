#!/usr/bin/python3
from flask import Flask, render_template, request, redirect, url_for, flash, session
from hie_models import storage
from hie_flask.hospital import hospital_bp
from hie_flask.patient import patient_bp
from hie_flask.doctor import doctor_bp

from datetime import timedelta

# Initialize the Flask application
app = Flask(__name__)

# Configure the Flask application
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
app.config["SECRET_KEY"] = "CONNECTED_CARE"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30)

# Register Blueprints for hospital and patient routes
app.register_blueprint(patient_bp)
app.register_blueprint(hospital_bp)
app.register_blueprint(doctor_bp)


@app.before_request
def make_session_permanent():
    """
    Set the session to be permanent before each request.
    This ensures that the session lifetime is extended to the configured duration.
    """
    session.permanent = True


@app.route("/", strict_slashes=False)
def landing_page():
    """
    Route: /
    Method: GET

    Displays the landing page.

    Returns:
        render_template: HTML template for the landing page.
    """
    return render_template("landing_page_html/index.html")


@app.route("/about", strict_slashes=False)
def about_page():
    """
    Route: /about
    Method: GET

    Displays the about page.

    Returns:
        render_template: HTML template for the about page.
    """
    return render_template("landing_page_html/about_us.html")


@app.route("/features", strict_slashes=False)
def features_page():
    """
    Route: /features
    Method: GET

    Displays the features page.

    Returns:
        render_template: HTML template for the features page.
    """
    return render_template("landing_page_html/features.html")


@app.route("/contact", methods=["GET", "POST"], strict_slashes=False)
def contact_page():
    """
    Route: /contact
    Methods: GET, POST

    Displays the contact page.

    Returns:
        render_template: HTML template for the contact page.
    """
    return render_template("landing_page_html/contact.html")


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html", e=e), 404


@app.errorhandler(500)
def page_not_found(e):
    return render_template("404.html", e=e), 404


if __name__ == "__main__":
    """
    Main Function

    Runs the Flask application on the specified host and port.
    """
    app.run(host="0.0.0.0", port=5000, debug=True)
