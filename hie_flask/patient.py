#!/usr/bin/python3
from flask import (
    render_template,
    request,
    redirect,
    url_for,
    flash,
    session,
    Blueprint,
)
from hie_models import storage
from hie_models.patient import Patient

patient_bp = Blueprint("patient_bp", __name__)


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
                return redirect(url_for("patient_login"))

        # Create new patient and save to database
        patient = Patient(**patient_data)
        patient.hash_password()
        storage.new(patient)
        storage.save()
        return redirect(url_for("patient_login"))

    else:
        # Display signup page
        return render_template("patient_html/signup.html")


@patient_bp.route("/patient/login", methods=["GET", "POST"], strict_slashes=False)
def patient_login():
    """Displays the login page"""
    if request.method == "POST":
        # Check if patient exists in database
        email = request.form.get("email")
        password = request.form.get("password")
        existing_patient = storage.all(Patient).values()

        for patient in existing_patient:
            if email == getattr(patient, "email"):
                # Check password
                if patient.check_password(password):
                    session["patient_id"] = getattr(patient, "id")
                    return redirect(url_for("patient_dashboard"))
                else:
                    flash("Incorrect password, please try again.")
                    return redirect(url_for("patient_login"))

        # If patient does not exist in database
        flash("Patient does not exist, please sign up.")
        return redirect(url_for("patient_signup"))

    # If request method is GET
    return render_template("login.html")


@patient_bp.route("/logout")
def logout():
    session.pop("patient_id", None)  # Remove patient_id from session
    flash("You have been logged out.", "success")
    return redirect(url_for("patient_login"))
