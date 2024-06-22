from hie_models.hie_db.db_storage import DBStorage
from hie_models.patient import Patient
from hie_models.doctor import Doctor, patients_doctors
from hie_models.hospital import Hospital
from hie_models.consent import Consent
import hie_models
from hie_models.medical_records import MedicalRecords
import pdb

"""
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

patients = [
    Patient(
        _password="password123",
        firstName=f"FirstName{i}",
        lastName=f"LastName{i}",
        otherName=f"OtherName{i}",
        email=f"patient{i}@example.com",
        phoneNumber=f"123-456-789{i}",
        address=f"Address {i}",
        city=f"City{i}",
        state=f"State{i}",
        zipCode=f"ZipCode{i}",
        country=f"Country{i}",
        emergencyContactName=f"EmergencyContactName{i}",
        emergencyContactPhone=f"987-654-321{i}",
        next_of_kin=f"NextOfKin{i}",
    )
    for i in range(10)
]
for i in patients:
    hie_models.storage.new(i)
hie_models.storage.save()

for i in p.values():


    print(i.to_dict())"""


"""
import os
from hie_models.hie_db.db_storage import DBStorage
from hie_models.hospital import Hospital
from hie_models.patient import Patient
from hie_models.doctor import Doctor
from hie_models.consent import Consent
from hie_models.medical_records import MedicalRecords

# Set environment variables (adjust as necessary)
os.environ['HIE_USER'] = 'root'
os.environ['HIE_PWD'] = 'root'
os.environ['HIE_HOST'] = 'localhost'
os.environ['HIE_DB'] = 'hbnb_dev_db'
os.environ['HIE_ENV'] = 'dev'

# Initialize DBStorage
storage = DBStorage()
storage.reload()

# Create records
hospital = Hospital(name="General Hospital")
patient = Patient(name="John Doe", age=30)
doctor = Doctor(name="Dr. Smith", specialty="Cardiology")
consent = Consent(patient_id=patient.id, doctor_id=doctor.id, consent_given=True)
medical_record = MedicalRecords(patient_id=patient.id, doctor_id=doctor.id, diagnosis="Hypertension")

# Add records to the session
storage.new(hospital)
storage.new(patient)
storage.new(doctor)
storage.new(consent)
storage.new(medical_record)

# Save records to the database
storage.save()

# Read records
all_hospitals = storage.all(Hospital)
all_patients = storage.all(Patient)
all_doctors = storage.all(Doctor)
all_consents = storage.all(Consent)
all_medical_records = storage.all(MedicalRecords)

# Print values
print("Hospitals:", all_hospitals)
print("Patients:", all_patients)
print("Doctors:", all_doctors)
print("Consents:", all_consents)
print("Medical Records:", all_medical_records)

# Update a record
patient.name = "John A. Doe"
storage.save()

# Verify update
updated_patient = storage.all(Patient)
print("Updated Patients:", updated_patient)

# Clean up (optional)
storage.delete(hospital)
storage.delete(patient)
storage.delete(doctor)
storage.delete(consent)
storage.delete(medical_record)
storage.save()

# Close the session
storage.close()"""


patient_ids = [
    "b5336626-12f5-42e1-9fea-b658f74ec4c9",
    "95d32647-8a1b-4c01-87e3-8a2dc8402194",
    "0ce18f08-8158-47be-8602-c0278d8eb4fe",
    "89265495-9e42-49b5-a955-97e92f357087",
    "62bb4ce6-9a59-4141-bdba-82328df9296d",
    "1a0dd930-820f-43d4-be1a-9c314dfa905f",
    "4d657f08-f53c-4e82-9eb5-4799f0c285aa",
    "5569e9fb-c7ad-4b87-849d-b056b52d55e2",
    "7632ef66-c4a9-4c16-92d5-f85bc40c9384",
    "30611523-da20-48fc-9161-c0987ad8abe8",
]
doctor_ids = [
    "7a5d6381-07c5-40a0-a75f-cf1115a527f4",
    "d23d2a58-fabb-4cef-8cb5-3e5de8235cfa",
    "9d080b40-ab0c-4e1c-b552-f2288cf0c15d",
    "ec1fe508-080b-47f8-bbff-a31ed455bfcd",
    "d288b7ad-0415-4364-a3ae-5e87a1cddad4",
    "d3a3b614-26ce-4624-998e-f6fb8625494a",
    "80ef2888-84db-45c5-9889-3056181ca2d5",
    "768a74f9-4a6d-48b3-b399-77d18b741692",
    "150b8aee-77de-49cd-b082-81c66d94425f",
    "44d53189-eafb-4366-9766-373255de1bf1",
    "2137f56c-9181-499f-8fba-7df2f8f02271",
    "719aa5dd-b0ad-4abd-808f-d5225df6578a",
]
hospital_ids = [
    "f6d87cd7-b76d-4879-857d-613c937af1f8",
    "c87867bf-98d2-4a90-be9b-df17be292c4c",
]

# Sample FHIR resource
fhir_resource = {
    "resourceType": "Patient",
    "id": "example",
    "text": {"status": "generated", "div": "<div>John Doe</div>"},
    "identifier": [
        {
            "use": "usual",
            "type": {
                "coding": [{"system": "http://hl7.org/fhir/v2/0203", "code": "MR"}]
            },
            "system": "http://hospital.smarthealthit.org",
            "value": "12345",
        }
    ],
    "name": [{"use": "official", "family": "Doe", "given": ["John"]}],
    "gender": "male",
    "birthDate": "1974-12-25",
}
"""
# Create multiple medical records
for patient_id in patient_ids:
    for doctor_id in doctor_ids:
        for hospital_id in hospital_ids:
            record = MedicalRecords(
                PatientID=patient_id,
                DoctorID=doctor_id,
                HospitalID=hospital_id,
                RecordType="Medical History",
                FHIRResource=fhir_resource,
            )
            hie_models.storage.new(record)
hie_models.storage.save()"""

# Print the created records
ps = hie_models.storage.all(Patient)
for p in ps.values():
    for md in p.medical_records:
        if md.PatientID == "30611523-da20-48fc-9161-c0987ad8abe8":
            print(f"{md.FHIRResource}  {p.email}")
