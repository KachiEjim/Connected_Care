#!/usr/bin/python3
"""
Contains medicalrecords class, blueprint for creating a medicalrecords
"""
from hie_models.basemodel import Base, BaseModel
from sqlalchemy import Column, String, ForeignKey, JSON
from sqlalchemy.orm import relationship


class MedicalRecords(BaseModel, Base):
    """
    The MedicalRecords class represents medical records stored in the database.

    Attributes:
        PatientID (Column): A string column with a length of 60 characters, representing the foreign key to the 'patients' table.
        DoctorID (Column): A string column with a length of 60 characters, representing the foreign key to the 'doctors' table.
        HospitalID (Column): A string column with a length of 60 characters, representing the foreign key to the 'hospitals' table.
        RecordType (Column): A string column with a length of 255 characters, representing the type of medical record.
        FHIRResource (Column): A JSON column storing the FHIR (Fast Healthcare Interoperability Resources) representation of the medical record.

    Relationships:
        patient (relationship): Relationship to the 'Patient' class, establishing a back-reference named 'medical_records'.
        doctor (relationship): Relationship to the 'Doctor' class, establishing a back-reference named 'medical_records'.
        hospital (relationship): Relationship to the 'Hospital' class, establishing a back-reference named 'medical_records'.

    Inherits:
        BaseModel: A base model class providing common functionality and attributes for database models.
        Base: The declarative base class from SQLAlchemy for table definitions.

    Note:
        The MedicalRecords class stores medical records with references to patients, doctors, and hospitals, along with the FHIR representation of the record.
    """

    __tablename__ = "medical_records"

    PatientID = Column(String(60), ForeignKey("patients.id"), nullable=False)
    DoctorID = Column(String(60), ForeignKey("doctors.id"), nullable=True)
    HospitalID = Column(String(60), ForeignKey("hospitals.id"), nullable=True)
    RecordType = Column(String(255), nullable=False)
    FHIRResource = Column(JSON, nullable=False)

    patient = relationship("Patient", backref="medical_records")
    doctor = relationship("Doctor", backref="medical_records")
    hospital = relationship("Hospital", backref="medical_records")

    def __init__(self, *args, **kwargs):
        """
        Initializes a new instance of the MedicalRecords class.

        Parameters:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            None
        """
        super().__init__(*args, **kwargs)
