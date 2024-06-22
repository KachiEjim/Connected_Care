#!/usr/bin/python3
"""
Contains consent class, blueprint for creating a consent
"""
from hie_models.basemodel import Base, BaseModel
from sqlalchemy import (
    Column,
    String,
    Date,
    Boolean,
    ForeignKey,
)
from sqlalchemy.orm import relationship


class Consent(BaseModel, Base):
    """
    The Consent class represents a model for storing consent information in the database.

    Attributes:
        PatientID (Column): A string column with a length of 60 characters, representing the foreign key to the 'patients' table.
        DoctorID (Column): A string column with a length of 60 characters, representing the foreign key to the 'doctors' table.
        HospitalID (Column): A string column with a length of 60 characters, representing the foreign key to the 'hospitals' table.
        ConsentGiven (Column): A boolean column indicating whether consent has been given, with a default value of False.
        ExpirationDate (Column): A Date column representing the expiration date of the consent, if applicable.

    Relationships:
        patient (relationship): A relationship to the 'Patient' model, establishing a back-reference named 'consents'.
        doctor (relationship): A relationship to the 'Doctor' model, establishing a back-reference named 'consents'.
        hospital (relationship): A relationship to the 'Hospital' model, establishing a back-reference named 'consents'.

    Inherits from:
        BaseModel: A base model class providing common functionality and attributes for database models.
        Base: The declarative base class from SQLAlchemy for defining database models.
    """

    __tablename__ = "consents"

    PatientID = Column(String(60), ForeignKey("patients.id"), nullable=False)
    DoctorID = Column(String(60), ForeignKey("doctors.id"), nullable=True)
    HospitalID = Column(String(60), ForeignKey("hospitals.id"), nullable=True)
    ConsentGiven = Column(Boolean, nullable=False, default=False)
    ExpirationDate = Column(Date, nullable=True)

    patient = relationship("Patient", backref="consents")
    doctor = relationship("Doctor", backref="consents")
    hospital = relationship("Hospital", backref="consents")

    def __init__(self, *args, **kwargs):
        """
        Initializes a new instance of the Doctor class.

        Parameters:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            None
        """
        super().__init__(*args, **kwargs)
