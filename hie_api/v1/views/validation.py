#!/usr/bin/python3
"""
Flask Application for CONNECTED CARE Restful API
"""

from hie_models import storage
from hie_api.v1.views import app_views
from flask import abort, jsonify, make_response, request, session, url_for, redirect
from flasgger.utils import swag_from
from hie_models.patient import Patient
from hie_models.doctor import Doctor
from hie_models.hospital import Hospital
from functools import wraps


def get_session_details():
    """
    Retrieve session details to identify the current user session.

    Returns:
        tuple: A tuple containing the session key and session value.
               If no relevant session key is found, returns (None, None).

    Example:
        >>> session['doctor_id'] = '123'
        >>> get_session_details()
        ('doctor_id', '123')
    """
    for key, value in session.items():
        if key in ["doctor_id", "hospital_id", "patient_id"]:
            return key, value
    return None, None


def login_required(f):
    """
    Decorator to ensure that the user is logged in.

    Args:
        f (function): The function to be decorated.

    Returns:
        function: The decorated function.
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if (
            "patient_id" in session
            or "doctor_id" in session
            or "hospital_id" in session
            or "admin_id" in session
        ):
            return f(*args, **kwargs)
        return redirect(url_for("app_views.validate"))

    return decorated_function


@app_views.route("/validate", methods=["POST"], strict_slashes=False)
@swag_from("documentation/validation/validate.yml", methods=["POST"])
def validate():
    """
    Validates a user's email and password for login or signup.

    ---
    tags:
      - "Validation"
    parameters:
      - in: "body"
        name: "body"
        description: "User credentials"
        required: True
        schema:
          type: "object"
          properties:
            email:
              type: "string"
            password:
              type: "string"
            user:
              type: "string"
            opp:
              type: "string"
    responses:
      200:
        description: "Validation successful"
      400:
        description: "Data Not a JSON or Missing required fields"
      401:
        description: "Invalid credentials"
    """
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        user_type = data.get("user")
        opp = data.get("opp")
    except:
        return make_response(jsonify({"error": "Data Not a JSON"}), 400)

    if user_type == "admin":
        session["admin_id"] = "CONNECTED_CARE_ADMIN"
        return jsonify({"success": "Admin successfully added"}), 201

    if not user_type:
        return make_response(jsonify({"error": "Missing user type"}), 400)

    user_class = {"patient": Patient, "doctor": Doctor, "hospital": Hospital}.get(
        user_type
    )

    if not user_class:
        return make_response(jsonify({"error": "Invalid user type"}), 400)

    if not email:
        return make_response(jsonify({"error": "Missing email"}), 400)

    if not password:
        return make_response(jsonify({"error": "Missing password"}), 400)

    existing_users = storage.all(user_class).values()

    if opp == "signup":
        for user in existing_users:
            if email == getattr(user, "email"):
                return make_response(jsonify({"email": True}), 200)
        return make_response(jsonify({"email": False}), 200)

    if opp == "login":
        for user in existing_users:
            if email == getattr(user, "email"):
                if user.check_password(password):
                    session[f"{user_type}_id"] = user.id
                    return make_response(
                        jsonify({"email": True, "password": True}), 200
                    )
                else:
                    return make_response(jsonify({"email": True, "password": False}))
        return make_response(jsonify({"email": False, "password": False}), 200)

    return make_response(jsonify({"error": "Invalid operation"}), 200)


@app_views.route("/logout", methods=["POST"], strict_slashes=False)
@swag_from("documentation/validation/logout.yml", methods=["POST"])
@login_required
def patient_logout():
    """
    Logs out a user session.

    ---
    tags:
      - "Validation"
    responses:
      200:
        description: "Logout successful"
      401:
        description: "User not logged in"
    """
    session.clear()
    return jsonify({"success": "Logout successful"}), 200
