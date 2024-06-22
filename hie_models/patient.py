#!/usr/bin/python3
"""
Contains patient class, blueprint for creating a patient
"""

from hie_models.basemodel import Base, BaseModel
from sqlalchemy import Column, String, Date


class Patient(BaseModel, Base):
    """
    Class representing a patient.

    Attributes:
        _password (str): The password of the patient.
        firstName (str): The first name of the patient.
        lastName (str): The last name of the patient.
        otherName (str): The other name of the patient.
        email (str): The email address of the patient.
        dateOfBirth (Date): The date of birth of the patient.
        phoneNumber (str): The phone number of the patient.
        address (str): The address of the patient.
        city (str): The city of the patient.
        state (str): The state of the patient.
        zipCode (str): The zip code of the patient.
        country (str): The country of the patient.
        emergencyContactName (str): The name of the emergency contact for the patient.
        emergencyContactPhone (str): The phone number of the emergency contact for the patient.
        next_of_kin (str): The next of kin for the patient.

    Methods:
        __init__: Initializes a new instance of the Patient class.
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

        Behavior:
            - If kwargs are provided, set the attributes based on the key-value pairs.
            - If 'dateOfBirth' is provided as a string, convert it to a datetime object using the '%Y-%m-%d' format.
            - If 'id' is not provided, generate a new uuid4 value.
        """

        super().__init__(*args, **kwargs)
