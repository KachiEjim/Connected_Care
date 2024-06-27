#!/usr/bin/python3
"""
Contains doctor class, blueprint for creating a doctors
"""

from hie_models.basemodel import Base, BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship


patients_doctors = Table(
    "patients_doctors",
    Base.metadata,
    Column("patient_id", String(60), ForeignKey("patients.id")),
    Column("doctors_id", String(60), ForeignKey("doctors.id")),
)


class Doctor(BaseModel, Base):
    """
    The Doctor class represents a doctor entity in the application.

    Attributes:
        id (Column): A string column with a length of 60 characters, representing the primary key with a default value generated using uuid4().
        created_at (Column): A DateTime column representing the creation timestamp with a default value of the current datetime.
        updated_at (Column): A DateTime column representing the last update timestamp with a default value of the current datetime and automatically updated on each change.
        firstName (Column): A string column with a length of 255 characters, representing the first name of the doctor.
        lastName (Column): A string column with a length of 255 characters, representing the last name of the doctor.
        email (Column): A string column with a length of 255 characters, representing the email address of the doctor with a unique constraint.
        contactNumber (Column): A string column with a length of 50 characters, representing the contact number of the doctor.
        specialty (Column): A string column with a length of 255 characters, representing the specialty of the doctor.
        _password (Column): A string column with a length of 255 characters, representing the hashed password of the doctor.
        users (relationship): A relationship attribute defining the association of doctors with patients through the 'patients_doctors' table.

    Methods:
        __init__: Initializes a new instance of the Doctor class with optional keyword arguments for attribute assignment.

    Inherits:
        BaseModel: The base model class providing common functionality and attributes for database models.

    Note:
        The Doctor class extends the BaseModel class and adds specific attributes related to doctors in the application. It also establishes a relationship with patients through the 'patients_doctors' table.
    """

    __tablename__ = "doctors"

    firstName = Column(String(255), nullable=False)
    lastName = Column(String(255), nullable=False)
    email = Column(String(255), unique=True)
    gender = Column(String(50))
    contactNumber = Column(String(50))
    specialty = Column(String(255))
    _password = Column(String(255), nullable=False)
    patients = relationship("Patient", secondary=patients_doctors, backref="doctors")

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
