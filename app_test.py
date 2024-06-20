from hie_models.hie_db.db_storage import DBStorage
from Connected_Care.hie_models.patient_fhir import Patient
from hie_models.doctor import Doctor, patients_doctors
from hie_models.hospital import Hospital
from hie_models.consent import Consents
import hie_models


d = hie_models.storage.all(Doctor)
p = hie_models.storage.all(Patient)
pd = hie_models.storage.all(patients_doctors)
# Query all users and their associated addresses from the association table
h = hie_models.storage.all(Hospital)

for i in p.values():
    print(i.id)
"""for i in h.values():
    print("----------")
    print(f"\t{i.id}")
    for j in i.doctors:
        print(j.id)
    print("----------")
"""
