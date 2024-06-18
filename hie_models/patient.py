#!/usr/bin/python3
"""
Contains patient class, blueprint for creating a patient
"""

from hie_models.basemodel import Base, BaseModel
from sqlalchemy import Column, String, Date


class Patient(BaseModel, Base):
    """
    The Patient class represents a patient entity in the system.

    Attributes:
        Username (str): The username of the patient.
        _password (str): The hashed password of the patient.
        FirstName (str): The first name of the patient.
        LastName (str): The last name of the patient.
        OtherName (str): The other name of the patient.
        Email (str): The email address of the patient.
        DateOfBirth (Date): The date of birth of the patient.
        PhoneNumber (str): The phone number of the patient.
        AddressLine1 (str): The first line of the address of the patient.
        AddressLine2 (str): The second line of the address of the patient.
        City (str): The city of the patient.
        State (str): The state of the patient.
        ZipCode (str): The zip code of the patient.
        Country (str): The country of the patient.
        EmergencyContactName (str): The name of the emergency contact person for the patient.
        EmergencyContactPhone (str): The phone number of the emergency contact person.
        Next_of_kin (str): The next of kin of the patient.
    """

    from uuid import uuid4

    __tablename__ = "patients"
    _password = Column(String(255), nullable=False)
    firstName = Column(String(255), nullable=False)
    lastName = Column(String(255), nullable=False)
    otherName = Column(String(255))
    email = Column(String(255), unique=True)
    dateOfBirth = Column(Date)
    phoneNumber = Column(String(50))
    address = Column(String(255))
    city = Column(String(100))
    state = Column(String(100))
    zipCode = Column(String(20))
    country = Column(String(100))
    emergencyContactName = Column(String(255))
    emergencyContactPhone = Column(String(50))
    next_of_kin = Column(String(100))

    def __init__(self, *args, **kwargs):
        """
        Initializes a new instance of the Patient class.

        Parameters:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            None
        """
        super().__init__(*args, **kwargs)
