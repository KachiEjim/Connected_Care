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
from hie_models.doctor import Doctor

doctor_bp = Blueprint("doctor_bp", __name__)


def login_required(f):
    print(f)

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "doctor_id" not in session:
            return redirect(url_for("doctor_bp.doctor_login"))
        return f(*args, **kwargs)

    return decorated_function


@doctor_bp.route("/doctor/signup", methods=["GET", "POST"], strict_slashes=False)
def doctor_signup():
    """Displays the signup page"""
    if request.method == "POST":
        doctor_data = dict(request.form)

        # Check if doctor already exists in database
        email = doctor_data.get("email")
        if not doctor_data.get("_password", None):
            return jsonify({"error": "No password"})
        existing_patient = storage.all(Doctor).values()
        for doctor in existing_patient:
            if email == getattr(doctor, "email"):
                flash(
                    f"Doctor with email {email} already exists in database. Please login instead."
                )
                return render_template("doctor_html/login.html")

        # Create new doctor and save to database
        doctor = Doctor(**doctor_data)
        doctor.hash_password()
        storage.new(doctor)
        storage.save()
        doctor = doctor.to_dict()
        return render_template(
            "doctor_html/login.html",
            message="Account successfully created, Login",
            user=doctor,
        )

    else:
        # Display signup page
        return render_template("doctor_html/signup.html")


@doctor_bp.route("/doctor/login", methods=["GET", "POST"], strict_slashes=False)
def doctor_login():
    """Displays the login page"""
    if request.method == "POST":
        # Check if doctor exists in database
        email = request.form.get("email")
        password = request.form.get("_password")
        existing_patient = storage.all(Doctor).values()

        for doctor in existing_patient:
            if email == getattr(doctor, "email"):
                # Check password
                if doctor.check_password(password):
                    session["doctor_id"] = getattr(doctor, "id")
                    doctor = doctor.to_dict()
                    return redirect(url_for("doctor_bp.dashboard"))
    # If request method is GET
    return render_template("doctor_html/login.html")


@doctor_bp.route("/doctor/logout")
def doctor_logout():
    session.pop("doctor_id", None)  # Remove doctor_id from session
    flash("You have been logged out.", "success")
    return redirect(url_for("doctor_bp.doctor_login"))


@doctor_bp.route("/doctor/dashboard")
@login_required
def dashboard():
    doctor_id = session.get("doctor_id")
    if not doctor_id:
        return jsonify({"error": "No doctor_id in session"}), 400

    # Retrieve the doctor with the specific doctor_id from storage
    doctor = storage.get(Doctor, doctor_id)

    # Convert doctor to dictionary
    doctor_dict = doctor.to_dict()

    return render_template("doctor_html/dashboard.html", doctor=doctor_dict)
