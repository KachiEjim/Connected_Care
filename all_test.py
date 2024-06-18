from hie_models.hie_db.db_storage import DBStorage
from hie_models.patient import Patient
from hie_models.doctor import Doctor, patients_doctors
from hie_models.hospital import Hospital
from hie_models.consent import Consents
import hie_models
import pdb

for i in range(1, 3):
    hospital_data = {
        "name": f"Hospital {i}",
        "location": f"Location {i}",
        "_password": f"password{i * 15}",
        "email": f"hospital{i * 3}@hospital{i}.com",
        "contactNumber": f"{i}1234567890{i * 9}",
        "address": f"{i}user_street{i + 10}",
    }

    hospital = Hospital(**hospital_data)

    for j in range(1, 7):
        doctor_data = {
            "_password": f"{j}password{i * 15}",
            "firstName": f"{i}Doctor{j}",
            "lastName": f"{i}Last{j}",
            "email": f"doctor{j}@hospital{i}.com",
            "contactNumber": f"{i}1234567890{j}",
            "specialty": f"{i}Specialty{j}",
        }

        doctor = Doctor(**doctor_data)
        hie_models.storage.new(doctor)
        hospital.doctors.append(doctor)
    hie_models.storage.new(hospital)
hie_models.storage.save()
d = hie_models.storage.all()

p = hie_models.storage.all()

for i in d.values():
    print(i.to_dict())
