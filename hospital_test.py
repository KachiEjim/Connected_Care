import hie_models
from hie_models.basemodel import BaseModel
from hie_models.doctor import Doctor
from hie_models.hie_db.db_storage import DBStorage
from hie_models.hospital import Hospital
from Connected_Care.hie_models.patient_fhir import Patient  # Import the Patients class

"""
# Test BaseModel functionality
base_model_instance = BaseModel()
model_dict = base_model_instance.to_dict()
print("BaseModel instance dictionary:", model_dict)

# Test DBStorage functionality

# Test Hospital functionality
hospital = Hospital(
    name="Sample Hospital",
    location="City A",
    email="ejimo@gmail.om",
    _password="Onyedikachi1",
)

print(hospital.to_dict())

print(hospital._password)
is_correct = hospital.check_password("Onyedikachi1")
if is_correct:
    print("Password for Dr. Smith is correct.")
else:
    print("Incorrect password for Dr. Smith")
hie_models.storage.new(hospital)

hie_models.storage.save()
# Close the DBStorage session
hie_models.storage.close()"""

"""# Test Patients functionality
patient = Patient(
    Username="patient1",
    _password="password123",
    FirstName="John",
    LastName="Doe",
    Email="john.doe@example.com",
    DateOfBirth="1990-01-01",
    PhoneNumber="1234567890",
    AddressLine1="123 Street",
    City="City B",
    State="State X",
    ZipCode="12345",
    Country="Country Y",
    EmergencyContactName="Emergency Contact",
    EmergencyContactPhone="9876543210",
)

print(patient.to_dict())  # Assuming you have a to_dict method in Patients class
hie_models.storage.new(patient)
hie_models.storage.save()
hie_models.storage.close()"""

import pdb

# Create an engine and establish a session

# Create 3 hospitals
# pdb.set_trace()
for i in range(1, 15):
    hospital_data = {
        "name": f"Hospital {i}",
        "location": f"Location {i}",
        "_password": f"password{i * 15}",
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
hie_models.storage.close()

"""
    # Create 5 doctors in each hospital
    for j in range(1, 7):
        doctor_data = {
            "hospitalId": hospital.id,
            "firstName": f"Doctor{j}",
            "lastName": f"Last{j}",
            "email": f"doctor{j}@hospital{i}.com",
            "contactNumber": f"1234567890{j}",
            "specialty": f"Specialty{j}",
        }

        doctor = Doctor(**doctor_data)
        hie_models.storage.new(doctor)

    # Create 10 patients in each hospital
    for k in range(1, 12):
        patient_data = {

            "firstName": f"Patient{k}",
            "lastName": f"Last{k}",
            "email": f"patient{k}@hospital{i}.com",
            "phoneNumber": f"9876543210{k}",
            "address": f"123 Street{k}",
            "city": f"City{k}",
            "state": f"State{k}",
            "zipCode": f"12345{k}",
            "country": f"Country{k}",
            "emergencyContactName": f"Emergency Contact{k}",
            "emergencyContactPhone": f"9876543210{k}",
            "next_of_kin": f"Next of Kin{k}",
        }
        patient = Patient(**patient_data)
        hie_models.storage.new(patient)

"""
