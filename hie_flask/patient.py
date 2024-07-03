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
from functools import wraps
from hie_models import storage
from hie_models.patient import Patient
from datetime import datetime

patient_bp = Blueprint("patient_bp", __name__)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "patient_id" not in session:
            return redirect(url_for("patient_bp.patient_login"))
        return f(*args, **kwargs)

    return decorated_function


@patient_bp.route("/patient/signup", methods=["GET", "POST"], strict_slashes=False)
def patient_signup():
    """Displays the signup page"""
    if request.method == "POST":
        patient_data = dict(request.form)

        if patient_data.get("dateOfBirth", None):
            try:
                # Convert date of birth to datetime object using the '%Y-%m-%d' format
                patient_data["dateOfBirth"] = datetime.strptime(
                    patient_data.get("dateOfBirth"), "%Y-%m-%d"
                ).date()
            except ValueError:
                return jsonify({"error": "Invalid date format"}), 400

        # Check if patient already exists in database
        email = patient_data.get("email")
        if not patient_data.get("_password", None):
            return jsonify({"error": "No password"}), 400

        existing_patient = storage.all(Patient).values()
        for patient in existing_patient:
            if email == getattr(patient, "email"):
                flash(
                    f"Patient with email {email} already exists in database. Please login instead."
                )
                return render_template("patient_html/login.html")

        # Create new patient and save to database
        patient = Patient(**patient_data)
        patient.hash_password()
        storage.new(patient)
        storage.save()
        patient = patient.to_dict()
        return render_template(
            "patient_html/login.html",
            message="Account successfully created, Login",
            user=patient,
        )
    else:
        # Display signup page
        return render_template("patient_html/signup.html")


@patient_bp.route("/patient/login", methods=["GET", "POST"], strict_slashes=False)
def patient_login():
    """Displays the login page"""
    if request.method == "POST":
        # Check if patient exists in database
        try:
            email = request.form.get("email")
            password = request.form.get("_password")
        except Exception:
            return render_template("patient_html/login.html", message="Invalid input")
        existing_patient = storage.all(Patient).values()

        for patient in existing_patient:
            if email == getattr(patient, "email"):
                # Check password
                if patient.check_password(password):
                    session["patient_id"] = getattr(patient, "id")
                    session.modified = True
                    return redirect(url_for("patient_bp.dashboard"))
        flash("Invalid email or password", "error")
    # If request method is GET or login fails
    return render_template("patient_html/login.html")


@patient_bp.route("/patient/logout")
def patient_logout():
    session.pop("patient_id", None)  # Remove patient_id from session
    flash("You have been logged out.", "success")
    return redirect(url_for("patient_bp.patient_login"))


@patient_bp.route("/patient/join", methods=["GET"], strict_slashes=False)
def patient_join():
    return render_template("patient_html/join.html")


@patient_bp.route("/patient/dashboard")
@login_required
def dashboard():
    patient_id = session.get("patient_id")
    if not patient_id:
        return jsonify({"error": "No patient_id in session"}), 400

    # Retrieve the patient with the specific patient_id from storage
    patient = storage.get(Patient, patient_id)
    if not patient:
        return jsonify({"error": "Patient not found"}), 404

    # Convert patient to dictionary
    patient_dict = patient.to_dict()

    # Create a datetime object for the current date and time
    now = datetime.now()

    # Extract the year
    year = now.year
    age = "N/A"
    date_of_birth_str = patient_dict.get("dateOfBirth", None)

    if date_of_birth_str:
        try:
            # Convert the date string to a date object if it's a string
            if isinstance(date_of_birth_str, str):
                date_of_birth = datetime.strptime(date_of_birth_str, "%Y-%m-%d").date()
            else:
                date_of_birth = date_of_birth_str
            age = year - date_of_birth.year
        except ValueError:
            age = "Invalid date format"

    # Ensure default values for other fields
    name = f'{patient_dict.get("firstName", "")} {patient_dict.get("lastName", "")}'
    email = patient_dict.get("email", "N/A")
    phoneNumber = patient_dict.get("phoneNumber", "N/A")

    # Explicitly check for None and set default values if necessary
    if not name.strip():
        name = "N/A"
    if not email:
        email = "N/A"
    if not phoneNumber:
        phoneNumber = "N/A"

    return render_template(
        "patient_html/dashboard.html",
        email=email,
        phoneNumber=phoneNumber,
        age=age,
        name=name,
        patient=patient_dict,
    )
