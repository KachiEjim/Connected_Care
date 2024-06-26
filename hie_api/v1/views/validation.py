from hie_models import storage
from hie_api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from hie_models.patient import Patient
from hie_models.doctor import Doctor
from hie_models.hospital import Hospital
from hie_models.basemodel import BaseModel


@app_views.route("/validate", methods=["POST", "GET"], strict_slashes=False)
@swag_from("documentation/validation/validate.yml", methods=["POST"])
def validate():
    """Validates a user's email"""
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user = data.get("user")
    opp = data.get("opp")

    # Check if user type is provided
    if not user:
        abort(400, "Missing user type")
    if user == "patient":
        user = Patient
    elif user == "doctor":
        user = Doctor
    elif user == "hospital":
        user = Hospital
    else:
        abort(400, "Invalid user type")

    # Check if email and password are provided
    if not email:
        abort(400, "Missing email")

    if not password:
        abort(400, "Missing password")

    # Check if user exists in database
    existing_patient = storage.all(user).values()

    if opp == "signup":
        for patient in existing_patient:
            if email == getattr(patient, "email"):
                return jsonify({"email": True})
        return jsonify({"email": False})

    if opp == "login":
        for patient in existing_patient:
            if email == getattr(patient, "email"):
                valid_password = patient.check_password(password)
                if valid_password:
                    return jsonify({"email": True, "password": True})
                else:
                    return jsonify({"email": True, "password": False})

        return jsonify({"email": False, "password": False})

    return jsonify({"ERROR": 500}, 500)
