#!/usr/bin/python3
from flask import (
    render_template,
    request,
    redirect,
    url_for,
    flash,
    session,
    Blueprint,
    jsonify,
)
from hie_models import storage
from hie_models.hospital import Hospital
from functools import wraps

# Create a Blueprint for hospital-related routes
hospital_bp = Blueprint("hospital_bp", __name__)


def login_required(f):
    """
    Decorator function to check if a hospital is logged in.
    If the hospital is not logged in, it redirects to the hospital login page.

    Parameters:
        f (function): The function to be decorated

    Returns:
        function: The decorated function
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "hospital_id" not in session:
            return redirect(url_for("hospital_bp.hospital_login"))
        return f(*args, **kwargs)

    return decorated_function


@hospital_bp.route("/hospital/signup", methods=["GET", "POST"], strict_slashes=False)
def hospital_signup():
    """
    Route: /hospital/signup
    Methods: GET, POST

    Handles the hospital signup process. If the request method is POST, it checks if the hospital
    already exists in the database based on the provided email. If the hospital does not exist, it
    creates a new hospital instance, hashes the password, saves it to the database, and returns a
    success message with the login template. If the hospital already exists, it flashes a message
    to prompt the user to login instead. If the request method is GET, it renders the hospital
    signup page for the user to fill in their details.

    Returns:
        - If the request method is POST:
            - Renders the login template with a success message and the created hospital details.
        - If the request method is GET:
            - Renders the signup page for the hospital.
    """
    if request.method == "POST":
        hospital_data = dict(request.form)

        # Check if hospital already exists in database
        email = hospital_data.get("email")
        existing_hospital = storage.all(Hospital).values()

        for hospital in existing_hospital:
            if email == getattr(hospital, "email"):
                flash(
                    f"Hospital with email {email} already exists in database. Please login instead."
                )
                return render_template("hospital_html/login.html")

        # Create new hospital and save to database
        hospital = Hospital(**hospital_data)
        hospital.hash_password()
        storage.new(hospital)
        storage.save()
        hospital = hospital.to_dict()
        return render_template(
            "hospital_html/login.html",
            message="Account successfully created, Login",
            user=hospital,
        )

    else:
        # Display signup page
        return render_template("hospital_html/signup.html")


@hospital_bp.route("/hospital/join", methods=["GET"], strict_slashes=False)
def hospital_join():
    """
    Route: /hospital/join
    Method: GET

    Renders the 'join.html' template for hospital registration.

    Returns:
        render_template: HTML template for hospital registration form.
    """
    return render_template("hospital_html/join.html")


@hospital_bp.route("/hospital/login", methods=["GET", "POST"], strict_slashes=False)
def hospital_login():
    """
    Route to handle hospital login.

    Methods:
        GET: Render the hospital login page.
        POST: Check if the hospital exists in the database and if the password is correct. If successful,
        set the hospital_id in the session and redirect to the hospital dashboard page.

    Parameters:
        None

    Returns:
        GET: Render the hospital login page.
        POST: Redirect to the hospital dashboard page if login is successful, otherwise render the login page again.
    """
    if request.method == "POST":
        # Check if hospital exists in database
        email = request.form.get("email")
        password = request.form.get("_password")
        existing_hospital = storage.all(Hospital).values()

        for hospital in existing_hospital:
            if email == getattr(hospital, "email"):
                # Check password
                if hospital.check_password(password):
                    session["hospital_id"] = getattr(hospital, "id")
                    hospital = hospital.to_dict()
                    return redirect(url_for("hospital_bp.dashboard"))
    # If request method is GET
    return render_template("hospital_html/login.html")


@hospital_bp.route("/hospital/logout")
def hospital_logout():
    """
    Route: /hospital/logout
    Method: GET

    Logs out the current hospital by removing the 'hospital_id' from the session.
    Flashes a success message to the user indicating successful logout.
    Redirects the user to the hospital login page.

    Returns:
        redirect: Redirects the user to the hospital login page.
    """
    session.pop("hospital_id", None)  # Remove hospital_id from session
    flash("You have been logged out.", "success")
    return redirect(url_for("hospital_bp.hospital_login"))


@hospital_bp.route("/hospital/dashboard")
def dashboard():
    """
    Route: /hospital/dashboard
    Method: GET

    Displays the hospital dashboard. Requires the hospital to be logged in.

    Returns:
        render_template: HTML template for the hospital dashboard.
    """
    hospital_id = session.get("hospital_id")
    """if not hospital_id:
        return jsonify({"error": "No hospital_id in session"}), 400
"""
    # Retrieve the hospital with the specific hospital_id from storage
    hospital = storage.get(Hospital, hospital_id)

    # Convert hospital to dictionary
    """    hospital_dict = hospital.to_dict()
    """
    return render_template("hospital_html/dashboard.html")
