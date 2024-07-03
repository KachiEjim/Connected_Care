#!/usr/bin/python3

"""
This module defines the routes and views for handling patient data in the HIE (Health Information Exchange) system.
It includes functionalities for retrieving patient data based on session details and user roles.
"""

from hie_models import storage
from hie_api.v1.views import app_views
from flask import jsonify, make_response, session, request
from flasgger.utils import swag_from
from hie_models.patient import Patient
from hie_models.doctor import Doctor
from hie_models.hospital import Hospital
from hie_api.v1.views.validation import login_required
from hie_api.v1.views.validation import get_session_details


@app_views.route(
    "/patients",
    defaults={"id_email": None, "data": None},
    methods=["GET"],
    strict_slashes=False,
)
@app_views.route(
    "/patients/<string:id_email>",
    defaults={"data": None},
    methods=["GET"],
    strict_slashes=False,
)
@app_views.route(
    "/patients/<string:id_email>/<string:data>", methods=["GET"], strict_slashes=False
)
@login_required
@swag_from("documentation/patient/get_all.yml")
def get_patient_data(id_email, data):
    """
    Retrieve patient data based on session details and user roles.

    Args:
        id_email (str): The ID or email of the patient.
        data (str): Specific data field to retrieve for the patient.

    Returns:
        Response: A Flask response object containing the requested patient data or an error message.
    """
    session_key, session_id = get_session_details()

    # Handle case where no specific patient ID or data field is provided
    if id_email is None and data is None:
        if session_key not in ["doctor_id", "hospital_id"]:
            return make_response(
                jsonify({"error": "Not a Valid Doctor/Hospital Session"}), 400
            )

        if session_key == "doctor_id":
            doctor = storage.get(Doctor, session_id)
            if doctor:
                patients_data = []
                for patient in doctor.patients:
                    patient_dict = patient.to_dict()
                    patients_data.append(patient_dict)
                return jsonify(patients_data), 200

        if session_key == "hospital_id":
            hospital = storage.get(Hospital, session_id)
            if hospital:
                patients_data = []
                for patient in hospital.patients:
                    patient_dict = patient.to_dict()
                    patients_data.append(patient_dict)
                return jsonify(patients_data), 200

        if session_key == "admin":
            patients = storage.all(Patient)
            for patient in patients:
                patient_dict = patient.to_dict()
                patients_data.append(patient_dict)
            return jsonify(patients_data), 200

    # Handle case where a specific patient ID is provided
    elif id_email is not None:
        if session_key not in ["doctor_id", "hospital_id", "patient_id"]:
            return make_response(jsonify({"error": "Not a Valid User Session"}), 401)

        cls_name = {
            "doctor_id": Doctor,
            "hospital_id": Hospital,
            "patient_id": Patient,
        }.get(session_key)

        user = storage.get(cls_name, id_email)
        if user is None:
            return jsonify({"error": f"User with details {id_email} Not found"}), 404
        user = user.to_dict()
        if data is not None:
            try:
                user_value = user[data]
            except KeyError:
                return jsonify({"error": f"{data} for user {id_email}, not found"}), 404
            return jsonify(user_value), 200
        print(user)
        return jsonify(user), 200


@app_views.route("/patients/advanced_search", methods=["POST"], strict_slashes=False)
@login_required
@swag_from("documentation/patient/advanced_search.yml")
def advanced_search():
    """
    Advanced search for patients based on provided search criteria.

    ---
    tags:
      - "Patients"
    parameters:
      - in: "body"
        name: "body"
        description: "Search criteria"
        required: True
        schema:
          type: "object"
          properties:
            count:
              type: "integer"
              description: "The number of users to return"
            search_params:
              type: "object"
              description: "The search criteria"
              properties:
                firstName:
                  type: "string"
                lastName:
                  type: "string"
                otherName:
                  type: "string"
                gender:
                  type: "string"
                email:
                  type: "string"
                dateOfBirth:
                  type: "string"
                city:
                  type: "string"
                state:
                  type: "string"
                country:
                  type: "string"
    responses:
      200:
        description: "A list of patients matching the search criteria"
        schema:
          type: "array"
          items:
            $ref: "#/definitions/Patient"
      400:
        description: "Missing or invalid search criteria"
      404:
        description: "No patients found matching the search criteria"
    """
    session_key, session_id = get_session_details()
    try:
        data = request.get_json()
    except Exception:
        return jsonify({"error": "Parameter not A Json"}), 401
    if not data or "search_params" not in data:
        return make_response(jsonify({"error": "Missing search parameters"}), 400)

    search_params = data.get("search_params", {})
    count = data.get("count", None)

    if not search_params:
        return make_response(jsonify({"error": "No search parameters provided"}), 400)

    cls_name = {
        "doctor_id": Doctor,
        "hospital_id": Hospital,
    }.get(session_key)

    user = storage.get(cls_name, session_id)

    if not user:
        return make_response(jsonify({"error": "Invalid session"}), 401)

    matching_patients = []

    for patient in user.patients:
        match_score = sum(
            str(getattr(patient, field, "")).lower() == value.lower()
            for field, value in search_params.items()
        )
        if match_score > 0:
            matching_patients.append((patient, match_score))

    if not matching_patients:
        return make_response(
            jsonify({"error": "No patients found matching the search criteria"}), 404
        )

    # Sort patients by match score in descending order
    matching_patients.sort(key=lambda x: x[1], reverse=True)

    # If count is None, 0, or 1, return the best match
    if count in [None, 0, 1]:
        matching_patients = matching_patients[:1]

    # If count is specified, return the top 'count' matches
    elif count:
        matching_patients = matching_patients[:count]

    return jsonify([patient.to_dict() for patient, score in matching_patients]), 200
