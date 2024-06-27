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

        # Check if patient already exists in database
        email = patient_data.get("email")
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
        email = request.form.get("email")
        password = request.form.get("_password")
        existing_patient = storage.all(Patient).values()

        for patient in existing_patient:
            if email == getattr(patient, "email"):
                # Check password
                if patient.check_password(password):
                    session["patient_id"] = getattr(patient, "id")
                    patient = patient.to_dict()
                    return redirect(url_for("patient_bp.dashboard"))
    # If request method is GET
    return render_template("patient_html/login.html")


@patient_bp.route("/patient/logout")
def patient_logout():
    session.pop("patient_id", None)  # Remove patient_id from session
    flash("You have been logged out.", "success")
    return redirect(url_for("patient_bp.patient_login"))


@patient_bp.route("/patient/dashboard")
@login_required
def dashboard():
    patient_id = session.get("patient_id")
    if not patient_id:
        return jsonify({"error": "No patient_id in session"}), 400

    # Retrieve the patient with the specific patient_id from storage
    patient = storage.get(Patient, patient_id)

    # Convert patient to dictionary
    patient_dict = patient.to_dict()

    return render_template("patient_html/dashboard.html", patiemt=patient_dict)
