from fhirclient import client
from fhirclient.models.patient import Patient as FHIRPatient, PatientContact
from fhirclient.models.humanname import HumanName
from fhirclient.models.contactpoint import ContactPoint
from fhirclient.models.address import Address
from fhirclient.models.fhirdate import FHIRDate

# FHIR server configuration
settings = {
    "app_id": "my_web_app",
    "api_base": "http://localhost:5008/fhir",  # Replace with your FHIR server base URL
}

smart = client.FHIRClient(settings=settings)

# Create a Patient resource
patient = FHIRPatient()

# Name
name = HumanName()
name.given = ["John"]
name.family = "Doe"
patient.name = [name]

# Telecom
email = ContactPoint()
email.system = "email"
email.value = "johndoe@example.com"

phone = ContactPoint()
phone.system = "phone"
phone.value = "555-555-5555"

patient.telecom = [email, phone]

# Birth Date
patient.birthDate = FHIRDate("1980-01-01")

# Address
address = Address()
address.line = ["123 Main St"]
address.city = "Anytown"
address.state = "CA"
address.postalCode = "12345"
address.country = "USA"
patient.address = [address]

# Emergency Contact
contact = PatientContact()
contact_name = HumanName()
contact_name.text = "Jane Doe"
contact.name = contact_name

contact_telecom = ContactPoint()
contact_telecom.system = "phone"
contact_telecom.value = "555-555-1234"

contact.telecom = [contact_telecom]
patient.contact = [contact]

# Create the patient resource on the FHIR server
created_patient = patient.create(smart.server)

if created_patient:
    print("Data posted successfully!")
else:
    print("Failed to post data.")
