#!/usr/bin/python3
"""
Contains hospital class, blueprint for creating a hospital
"""

from hie_models.basemodel import Base, BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey, Table, JSON
from sqlalchemy.orm import relationship


patients_hospitals = Table(
    "patients_hospitals",
    Base.metadata,
    Column("hospital_id", String(60), ForeignKey("hospitals.id")),
    Column("patient_id", String(60), ForeignKey("patients.id")),
)

doctors_hospitals = Table(
    "doctors_hospitals",
    Base.metadata,
    Column("hospital_id", String(60), ForeignKey("hospitals.id")),
    Column("doctor_id", String(60), ForeignKey("doctors.id")),
)


class Hospital(BaseModel, Base):
    """
    The Hospital class represents a hospital entity in the system.

    Attributes:
        name (Column): A string column with a maximum length of 100 characters, representing the name of the hospital. It is a required field.
        address (Column): A string column with a maximum length of 100 characters, representing the address of the hospital.
        contactNumber (Column): A string column with a maximum length of 50 characters, representing the contact number of the hospital.
        email (Column): A string column with a maximum length of 100 characters, representing the email address of the hospital. It must be unique.
        _password (Column): A string column with a maximum length of 255 characters, representing the hashed password of the hospital. It is a required field.
        doctors (relationship): A relationship with the Doctor class through the doctors_hospitals association table, allowing access to doctors associated with the hospital.
        patients (relationship): A relationship with the Patient class through the patients_hospitals association table, allowing access to patients associated with the hospital.

    Methods:
        __init__: Initializes a new instance of the Hospital class with optional keyword arguments for attribute assignment.

    Note:
        The Hospital class inherits attributes and methods from the BaseModel class and Base declarative base. It represents a hospital entity with essential information such as name, address, contact number, email, and associated doctors and patients.
    """

    __tablename__ = "hospitals"
    name = Column(String(100), nullable=False)
    address = Column(String(100))
    contactNumber = Column(String(50))
    email = Column(String(100), unique=True)
    _password = Column(String(255), nullable=False)
    services = Column(JSON)
    departments = Column(JSON)
    key_staffs = Column(JSON)
    recent_achievements = Column(JSON)
    doctors = relationship("Doctor", secondary=doctors_hospitals, backref="hospitals")
    patients = relationship(
        "Patient", secondary=patients_hospitals, backref="hospitals"
    )

    def __init__(self, *args, **kwargs):
        """
        Initializes a new instance of the Hospital class.

        Parameters:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            None
        """
        super().__init__(*args, **kwargs)
