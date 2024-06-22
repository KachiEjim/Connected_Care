#!/usr/bin/python3
"""
Contains BaseModel class, blueprint for building other classes
"""

from datetime import datetime
from uuid import uuid4
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
import bcrypt


time = "%Y-%m-%dT%H:%M:%S.%f"
Base = declarative_base()


class BaseModel:
    """
    The BaseModel class from which future classes will be derived.

    Attributes:
        id (Column): A string column with a length of 40 characters, representing the primary key with a default value generated using uuid4().
        created_at (Column): A DateTime column representing the creation timestamp with a default value of the current datetime.
        updated_at (Column): A DateTime column representing the last update timestamp with a default value of the current datetime and automatically updated on each change.

    Methods:
        __init__: Initializes the base model instance with optional keyword arguments for attribute assignment.
        __str__: Returns a string representation of the BaseModel instance.
        to_dict: Returns a dictionary containing all keys and values of the instance, with datetime values formatted as per the 'time' format.
        check_password: Method to check if a provided password matches the stored hashed password using bcrypt.
        hash_password: Method to hash the password using bcrypt.
    Note:
        The BaseModel class provides common functionality and attributes that can be inherited by other classes in the application.
    """

    id = Column(String(60), primary_key=True, default=str(uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """
        Initialization of the base model

        Parameters:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Behavior:
            - If kwargs are provided, set the attributes based on the key-value pairs.
            - If 'created_at' or 'updated_at' are provided as strings, convert them to datetime objects using the 'time' format.
            - If 'id' is not provided, generate a new uuid4 value.
            - If no kwargs are provided, set default values for 'id', 'created_at', and 'updated_at'.

        Returns:
            None
        """
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)
            if kwargs.get("created_at", None) and type(self.created_at) is str:
                self.created_at = datetime.strptime(kwargs["created_at"], time)
            else:
                self.created_at = datetime.utcnow()
            if kwargs.get("updated_at", None) and type(self.updated_at) is str:
                self.updated_at = datetime.strptime(kwargs["updated_at"], time)
            else:
                self.updated_at = datetime.utcnow()
            if kwargs.get("id", None) is None:
                self.id = str(uuid4())
        else:
            self.id = str(uuid4())
            self.created_at = datetime.utcnow()
            self.updated_at = self.created_at

    def __str__(self):
        """
        Method to return a string representation of the BaseModel instance.

        This method generates a formatted string that includes essential information about the BaseModel instance. It includes the class name, unique identifier (id), and a dictionary representation of all instance attributes. The purpose of this method is to provide a concise yet comprehensive overview of the BaseModel instance for debugging, logging, or any other informational purposes.

        Returns:
            str: A formatted string containing the class name, unique identifier (id), and a dictionary of all instance attributes.
        """
        return "[{:s}] ({:s}) {}".format(
            self.__class__.__name__, self.id, self.__dict__
        )

    def to_dict(self):
        """
        Method to convert the instance attributes to a dictionary.

        Behavior:
            - If the '_password' attribute is present, it hashes the password using bcrypt.
            - Converts 'created_at' and 'updated_at' attributes to a formatted string based on the 'time' format.
            - Adds the class name to the dictionary.
            - Removes the '_sa_instance_state' attribute if present.

        Returns:
            dict: A dictionary containing all keys and values of the instance.
        """

        new_dict = self.__dict__.copy()
        if "created_at" in new_dict:
            new_dict["created_at"] = new_dict["created_at"].strftime(time)
        if "updated_at" in new_dict:
            new_dict["updated_at"] = new_dict["updated_at"].strftime(time)
        new_dict["__class__"] = self.__class__.__name__
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]

        return new_dict

    def check_password(self, text):
        """
        Method to check if a password is correct
        """
        return bcrypt.checkpw(text.encode("utf-8"), self._password)

    def hash_password(self):
        """
        Method to hash the password using bcrypt.

        Behavior:
            - Checks if the '_password' attribute is present in the instance dictionary.
            - If '_password' is present, hashes the password using bcrypt's hashpw method with utf-8 encoding and a generated salt.

        Returns:
            None
        """
        if "_password" in self.__dict__:
            self._password = bcrypt.hashpw(
                self._password.encode("utf-8"), bcrypt.gensalt()
            )
