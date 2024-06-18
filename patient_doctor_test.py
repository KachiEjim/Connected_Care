# Import necessary classes
from hie_models.hie_db.db_storage import DBStorage
from hie_models.patient import Patient
from hie_models.doctor import Doctor, patients_doctors
from hie_models.consent import Consent
import hie_models

# Initialize DBStorage

# Reload data from the database

# Create 100 patients


"""for j in range(1, 100):
    doctor_data = {
        "firstName": f"Doctor{j}",
        "lastName": f"Last{j}",
        "email": f"name{j}@name{j + 10}.com",
        "contactNumber": f"1234567890{j}",
        "specialty": f"Specialty{j}",
        "_password": f"{j}password{j * 10}",
    }
    doctor = Doctor(**doctor_data)
    for k in range(1, 300):
        patient_data = {
            "_password": f"{k}password{j}",
            "firstName": f"{k}Patient{j}",
            "lastName": f"{k}Last{j}",
            "email": f"patient{k}@hopospital{j + 109}.com",
            "phoneNumber": f"{k}9876543210{j}",
            "address": f"{k}123 Street{j}",
            "city": f"{k}City{j}",
            "state": f"{k}State{j}",
            "zipCode": f"{k}12345{j}",
            "country": f"{k}Country{j}",
            "emergencyContactName": f"{j}Emergency Contact{k}",
            "emergencyContactPhone": f"{j}9876543210{k}",
            "next_of_kin": f"{j}Next of Kin{k}",
        }
        patient = Patient(**patient_data)
        doctor.users.append(patient)
        hie_models.storage.new(patient)
    hie_models.storage.new(doctor)
"""

patient = [
    "8bcd99f4-aced-45d9-b821-32bf620e44b5",
    "a68b582f-f98d-45cd-8aa7-ca74d12c2c29",
    "3c33fd95-5759-40b0-b370-d3c71d2d3c8e",
    "85e732ba-dbac-4748-a9b8-1de2f88365d4",
    "0546a58d-dcca-4669-b386-3a8f6e2f0f83",
]

doctors = [
    "a1e42748-f570-446e-87d2-7460e7dd6d71",
    "28fade51-61d3-466f-9afd-b6155a94a96d",
    "aaba91f7-ae61-4b07-ba85-725c72b0a12d",
    "4c1ed7fd-df9b-4140-b2dc-6c789df5e7b1",
    "529af144-a1a8-4001-ac81-23ec75871256",
]

hospitals = [
    "8ee4dc04-d979-4dbe-9fb6-bd6811e46681",
    "901d46ce-027c-4bd1-9567-a762cd99feee",
    "a33a8192-896f-4915-ab04-577a3ddf962f",
    "b5c28b95-7d30-427a-84ab-aa91b857e069",
    "d000a454-4fd5-4b92-b6bc-06f87f227981",
]
"""
for i in range(4):
    consent_data = {
        "PatientID": patient[i],
        "DoctorID": doctors[i],
        "HospitalID": hospitals[i],
        "ConsentGiven": True,
    }
    consent = Consent(**consent_data)
    hie_models.storage.new(consent)

hie_models.storage.save()
# Save all changes to the database
hie_models.storage.save()
"""
d = hie_models.storage.all(Doctor)
p = hie_models.storage.all(Patient)


for i in p.values():
    if i.id == "3c33fd95-5759-40b0-b370-d3c71d2d3c8e":
        i.consents[0].ConsentGiven = False
        print(i.consents[0])
