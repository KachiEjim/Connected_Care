#!/usr/bin/python3
"""
Contains the class DBStorage

"""
from hie_models.basemodel import BaseModel, Base
from hie_models.hospital import Hospital
from hie_models.patient import Patient
from hie_models.doctor import Doctor
from hie_models.consent import Consent
from hie_models.medical_records import MedicalRecords
from os import getenv
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import create_engine


classes = {
    "Patient": Patient,
    "Doctor": Doctor,
    "Hospital": Hospital,
    "Consent": Consent,
    "MedicalRecords": MedicalRecords,
}


class DBStorage:
    """
    Interacts with the MySQL database.

    Attributes:
        __engine (sqlalchemy.engine.Engine): The engine to connect to the database.
        __session (sqlalchemy.orm.Session): The current database session.

    Methods:
        __init__: Instantiate a DBStorage object.
        reload: Reloads data from the database.
        all: Query on the current database session.
        new: Add the object to the current database session.
        save: Commit all changes of the current database session.
        delete: Delete from the current database session obj if not None.
        close: Call remove() method on the private session attribute.
    """

    __engine = None
    __session = None

    def __init__(self):
        """
        Instantiate a DBStorage object.

        This method initializes a DBStorage object by setting up the engine to connect to the MySQL database using the environment variables for the user, password, host, and database name. It creates the engine with the provided connection details.

        Parameters:
            None

        Returns:
            None

        Behavior:
        - Sets up the engine to connect to the MySQL database.
        - Uses environment variables for user, password, host, and database name.
        """
        HIE_USER = getenv("HIE_USER", default="root")
        HIE_PWD = getenv("HIE_PWD", default="root")
        HIE_HOST = getenv("HIE_HOST", default="localhost")
        HIE_DB = getenv("HIE_DB", default="hbnb_dev_db")
        HIE_ENV = getenv("HIE_ENV")
        self.__engine = create_engine(
            "mysql+mysqldb://{}:{}@{}/{}".format(HIE_USER, HIE_PWD, HIE_HOST, HIE_DB)
        )

    def reload(self):
        """
        Reloads data from the database.

        This method reloads the data from the MySQL database by creating all the necessary tables defined in the Base metadata. It sets up a session factory and scoped session to interact with the database. The current session is then assigned to the private session attribute of the DBStorage object.

        Behavior:
        - Creates tables in the database based on the Base metadata.
        - Sets up a session factory and scoped session for database interaction.
        - Assigns the current session to the private session attribute of the DBStorage object.

        Parameters:
            None

        Returns:
            None
        """
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def all(self, cls=None):
        """
        This method reloads the data from the MySQL database by creating all the necessary tables defined in the Base metadata. It sets up a session factory and scoped session to interact with the database. The current session is then assigned to the private session attribute of the DBStorage object.

        Behavior:
        - Creates tables in the database based on the Base metadata.
        - Sets up a session factory and scoped session for database interaction.
        - Assigns the current session to the private session attribute of the DBStorage object.

        Parameters:
            None
        """
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + "." + obj.id
                    new_dict[key] = obj
        return new_dict

    def new(self, obj):
        """
        Add the object to the current database session.

        This method takes an object as a parameter and adds it to the current database session. This means that
            the object will be staged for insertion into the database upon calling the save method.

        Parameters:
            obj: An object to be added to the current database session.

        Returns:
            None
        """
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()
