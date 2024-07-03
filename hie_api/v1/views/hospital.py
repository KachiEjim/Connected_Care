#!/usr/bin/python3

"""
This module defines the routes and views for handling Hospital data in the HIE (Health Information Exchange) system.
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
    "/hospital",
    methods=["GET", "POST", "PUT"],
    strict_slashes=False,
)
@login_required
@swag_from("documentation/hospital/get_all.yml")
def handle_hospital_data():
    session_key, session_id = get_session_details()

    if session_key != "hospital_id":
        return make_response(jsonify({"error": "Not a Valid Hospital Session"}), 400)

    if request.method == "GET":
        hospital = storage.get(Hospital, session_id)
        if hospital:
            return jsonify(hospital.to_dict()), 200
        else:
            return jsonify({"Error": "Hospital not found"}), 404

    if request.method == "POST":
        data = request.get_json()
        if not data:
            return make_response(jsonify({"error": "No data provided"}), 400)

        hospital = storage.get(Hospital, session_id)
        if not hospital:
            return jsonify({"Error": "Hospital not found"}), 404

        # Update hospital information
        hospital.name = data.get("name", hospital.name)
        hospital.address = data.get("address", hospital.address)
        hospital.contactNumber = data.get("contactNumber", hospital.contactNumber)
        hospital.email = data.get("email", hospital.email)
        hospital.services = data.get("services", hospital.services)
        hospital.departments = data.get("departments", hospital.departments)
        hospital.key_staffs = data.get("key_staffs", hospital.key_staffs)
        hospital.recent_achievements = data.get(
            "recent_achievements", hospital.recent_achievements
        )

        # Save changes to the storage
        storage.save()

        return jsonify(hospital.to_dict()), 200

    if request.method == "PUT":
        data = request.get_json()
        if not data:
            return make_response(jsonify({"error": "No data provided"}), 400)

        hospital = storage.get(Hospital, session_id)
        if not hospital:
            return jsonify({"Error": "Hospital not found"}), 404

        # Update hospital information
        if "name" in data:
            hospital.name = data["name"]
        if "address" in data:
            hospital.address = data["address"]
        if "contactNumber" in data:
            hospital.contactNumber = data["contactNumber"]
        if "email" in data:
            hospital.email = data["email"]

        # Append to JSON fields
        if "services" in data:
            if hospital.services:
                hospital.services.extend(data["services"])
            else:
                hospital.services = data["services"]
        if "departments" in data:
            if hospital.departments:
                hospital.departments.extend(data["departments"])
            else:
                hospital.departments = data["departments"]
        if "key_staffs" in data:
            if hospital.key_staffs:
                hospital.key_staffs.extend(data["key_staffs"])
            else:
                hospital.key_staffs = data["key_staffs"]
        if "recent_achievements" in data:
            if hospital.recent_achievements:
                hospital.recent_achievements.extend(data["recent_achievements"])
            else:
                hospital.recent_achievements = data["recent_achievements"]

        # Save changes to the storage
        storage.save()

        return jsonify(hospital.to_dict()), 200
